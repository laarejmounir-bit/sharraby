"use client";

import { useCartStore } from "@/lib/store";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Truck,
  ArrowRight,
  Lock,
  CheckCircle2,
  CreditCard,
  Star,
  Zap,
} from "lucide-react";
import { StripeWrapper } from "@/components/StripeWrapper";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import WebPageSchema from "@/components/WebPageSchema";

export default function CheckoutPage() {
  const { items, getCartTotal, clearCart } = useCartStore();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    district: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [phoneError, setPhoneError] = useState("");

  const validatePhone = (phone: string) => {
    const cleanPhone = phone.replace(/[^\d]/g, '');
    
    if (cleanPhone.length < 9) {
      return "رقم الجوال ناقص، يرجى التأكد من كتابته بشكل صحيح.";
    }
    if (cleanPhone.length > 14) {
      return "رقم الجوال زائد، يرجى التأكد من كتابته بشكل صحيح.";
    }
    
    if (cleanPhone.startsWith('05') && cleanPhone.length !== 10) {
      if (cleanPhone.length < 10) {
        return "رقم الجوال ناقص، يرجى التأكد من كتابته بشكل صحيح (مثال: 05XXXXXXXX).";
      } else {
        return "رقم الجوال زائد، يرجى التأكد من كتابته بشكل صحيح (مثال: 05XXXXXXXX).";
      }
    }

    return "";
  };

  const subtotal = getCartTotal();
  const shipping = subtotal >= 99 ? 0 : 25;
  const discountAmount = paymentMethod === "online" ? Number((subtotal * 0.1).toFixed(2)) : 0;
  const total = subtotal + shipping - discountAmount;

  useEffect(() => {
    if (items.length > 0 && typeof window !== 'undefined') {
      if ((window as any).snaptr) {
        (window as any).snaptr('track', 'START_CHECKOUT', {
          price: total,
          currency: 'SAR',
          number_items: items.reduce((sum, item) => sum + item.quantity, 0)
        });
      }
      if ((window as any).fbq) {
        (window as any).fbq('track', 'InitiateCheckout', {
          value: total,
          currency: 'SAR',
          num_items: items.reduce((sum, item) => sum + item.quantity, 0)
        });
      }
    }
  }, []);

  const createOrder = async (status = "New", stripePaymentIntentId?: string) => {
    const newOrderId = Math.floor(Math.random() * 1000000);
    setOrderId(newOrderId);
    
    try {
      const { collection, addDoc } = await import("firebase/firestore");
      const { db } = await import("@/lib/firebase");
      
      await addDoc(collection(db, "orders"), {
        orderNumber: `SHR-${newOrderId}`,
        customerName: formData.name,
        customerPhone: formData.phone,
        city: formData.city,
        district: formData.district,
        items: items,
        totalAmount: total,
        subtotal: subtotal,
        discountAmount: discountAmount,
        shippingCost: shipping,
        paymentMethod: paymentMethod === "online" ? "Online (Stripe)" : "COD",
        stripePaymentIntentId: stripePaymentIntentId || null,
        status: status,
        orderDate: new Date().toISOString(),
        notes: "",
        history: [{ status: status, date: new Date().toISOString() }]
      });

      await addDoc(collection(db, "customers"), {
        name: formData.name,
        phone: formData.phone,
        city: formData.city,
        totalOrders: 1,
        totalSpend: total,
        lastOrderDate: new Date().toISOString(),
        createdAt: new Date().toISOString()
      });

    } catch (error) {
      console.error("Error creating order: ", error);
      throw error;
    }
    
    if (typeof window !== 'undefined') {
      if ((window as any).snaptr) {
        (window as any).snaptr('track', 'PURCHASE', {
          price: total,
          currency: 'SAR',
          transaction_id: newOrderId.toString(),
          number_items: items.reduce((sum, item) => sum + item.quantity, 0)
        });
      }
      if ((window as any).fbq) {
        (window as any).fbq('track', 'Purchase', {
          value: total,
          currency: 'SAR',
          content_ids: items.map(item => item.id),
          num_items: items.reduce((sum, item) => sum + item.quantity, 0)
        });
      }
    }

    return newOrderId;
  };

  const sendOrderWebhook = async (currentOrderId: number, paymentStatus: string) => {
    try {
      const paymentText = paymentStatus === "Paid" ? "مدفوع" : "غير مدفوع";
      const payload = {
        orderId: currentOrderId,
        paymentStatus: paymentText,
        fullName: formData.name,
        phone: formData.phone,
        city: formData.city,
        neighborhood: formData.district,
        orderDetails: items.map(item => {
          let itemName = item.name;
          // Force 'بكج التوفير' for anything that is cotton-bundle or already has it
          if (item.id.includes("cotton-bundle") || itemName.includes("بكج التوفير")) {
            itemName = itemName.replace(/^(1 بكج|2 بكج|3 بكج)/, "بكج التوفير");
            if (!itemName.includes("بكج التوفير")) {
              itemName = "بكج التوفير - " + itemName;
            }
          }
          return `المنتج: ${itemName} | الكمية: ${item.quantity} | السعر: ${item.price}`;
        }).join('\n') + `\n\n--- تفاصيل إضافية ---\nرقم الطلب: ${currentOrderId}\nحالة الدفع: ${paymentText}`,
      };

      await fetch(
        "https://script.google.com/macros/s/AKfycbzA1po1RC0DtFC01Y9hYVQ6kCRLX9OPzMjbF2lXoZ7iZUptu8ve7jmOiGwWhgA8sXRo/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
    } catch (error) {
      console.error("Webhook failed", error);
    }
  };

  const handleStripeSuccess = async (paymentIntentId: string) => {
    try {
      const newOrderId = await createOrder("Paid", paymentIntentId);
      await sendOrderWebhook(newOrderId, "Paid");
      window.scrollTo(0, 0);
      setIsSuccess(true);
      clearCart();
    } catch (err) {
      console.error("Failed to save order after payment", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const phoneValidationError = validatePhone(formData.phone);
    if (phoneValidationError) {
      setPhoneError(phoneValidationError);
      return;
    }
    
    if (paymentMethod === "online") return; // Handled by StripeWrapper
    
    setIsSubmitting(true);
    try {
      const newOrderId = await createOrder("New");
      await sendOrderWebhook(newOrderId, "New");
      window.scrollTo(0, 0);
      setIsSuccess(true);
      clearCart();
    } catch (err) {
      console.error("Checkout failed", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 pt-10">
        <div className="bg-white p-10 md:p-14 rounded-[2rem] shadow-2xl shadow-gray-200 border border-gray-100 max-w-lg w-full text-center">
          <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 relative">
            <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20"></div>
            <CheckCircle2 className="w-12 h-12 text-green-500 relative z-10" />
          </div>
          <h1 className="text-3xl font-black mb-4 text-gray-900">
            تم تأكيد طلبك بنجاح!
          </h1>
          <p className="text-gray-600 mb-10 leading-relaxed text-lg">
            شكراً لك{" "}
            <span className="font-bold text-gray-900">{formData.name}</span>!
            رقم طلبك هو
            <span className="block font-black text-primary text-2xl my-3" dir="ltr">
              #{orderId}
            </span>
            سيتم التواصل معك قريباً لتأكيد موعد التوصيل.
          </p>
          <button
            onClick={() => router.push("/")}
            className="inline-block w-full py-5 bg-primary text-white font-black text-lg rounded-2xl hover:bg-primary-dark transition-all transform hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 shadow-lg shadow-primary/20"
          >
            العودة للرئيسية
          </button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
          <Truck className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="text-2xl font-black mb-4 text-gray-900">السلة فارغة</h2>
        <p className="text-gray-500 mb-8">لم تقم بإضافة أي منتجات حتى الآن.</p>
        <button
          onClick={() => router.push("/product/premium-socks")}
          className="px-8 py-4 bg-primary text-white font-bold rounded-xl flex items-center gap-3 hover:bg-primary/90 transition-transform active:scale-[0.98]"
        >
          تصفح المنتجات <ArrowRight className="w-5 h-5 rotate-180" />
        </button>
      </div>
    );
  }

  return (
    <div className="w-full pb-20 pt-10">
      <WebPageSchema
        name="إتمام الطلب | شرّابي"
        description="صفحة إتمام الطلب والدفع الآمن من متجر شرّابي."
        url="https://sharraby.com/checkout"
      />
      <BreadcrumbSchema
        items={[
          { name: "الرئيسية", item: "https://sharraby.com" },
          { name: "إتمام الطلب", item: "https://sharraby.me/checkout" }
        ]}
      />
      <div className="w-full max-w-6xl mx-auto px-4 md:px-6">
        <button
          className="flex items-center gap-3 mb-10 text-gray-600 hover:text-gray-900 transition-colors w-max focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg px-3 py-2 -ml-3"
          onClick={() => router.back()}
          aria-label="العودة للسلة"
        >
          <ArrowRight className="w-5 h-5" />
          <span className="font-bold">العودة للسلة</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-green-50 border border-green-200 rounded-2xl p-5 flex items-start gap-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex justify-center items-center shrink-0">
                <Truck className="w-5 h-5 text-green-700" />
              </div>
              <div>
                <h4 className="font-bold text-green-800 text-base">
                  التوصيل متاح داخل الرياض فقط
                </h4>
                <p className="text-green-700 text-sm mt-1 leading-relaxed">
                  للطلبات من خارج مدينة الرياض، يرجى الطلب عبر متجرنا الرئيسي: <a href="https://sharraby.me" className="underline font-bold" target="_blank" rel="noopener noreferrer">sharraby.me</a>
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-black mb-8 pb-6 border-b border-gray-100 flex items-center gap-3 text-gray-900">
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm">
                  1
                </span>
                بيانات التوصيل
              </h2>

              <form
                id="checkout-form"
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label
                      htmlFor="name"
                      className="text-sm font-bold text-gray-700"
                    >
                      الاسم الكامل
                    </label>
                    <input
                      id="name"
                      required
                      type="text"
                      placeholder="مثال: أحمد الدوسري"
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all font-sans text-gray-900 placeholder:text-gray-400"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-3">
                    <label
                      htmlFor="phone"
                      className="text-sm font-bold text-gray-700"
                    >
                      رقم الجوال
                    </label>
                    <input
                      id="phone"
                      required
                      type="tel"
                      placeholder="05XXXXXXXX"
                      className={`w-full p-4 bg-gray-50 border ${phoneError ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-left font-sans text-gray-900 placeholder:text-gray-400`}
                      dir="ltr"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (phoneError) setPhoneError("");
                      }}
                      onBlur={() => {
                        if (formData.phone) {
                          setPhoneError(validatePhone(formData.phone));
                        }
                      }}
                    />
                    {phoneError && (
                      <p className="text-red-500 text-sm font-bold mt-1">
                        {phoneError}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label
                      htmlFor="city"
                      className="text-sm font-bold text-gray-700"
                    >
                      المدينة
                    </label>
                    <div className="relative">
                      <select
                        id="city"
                        required
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-gray-900 appearance-none font-sans"
                        value={formData.city}
                        onChange={(e) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                      >
                        <option value="" disabled>اختيار</option>
                        <option value="الرياض">الرياض</option>
                        <option value="خارج الرياض">خارج الرياض</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-4 text-gray-500">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                    {formData.city === "خارج الرياض" && (
                      <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 col-span-1 md:col-span-2">
                        <p className="text-sm font-bold mb-3 leading-relaxed">
                          للعملاء من خارج الرياض يجب اتمام الطلب من المتجر الرئيسي ليتم شحن الطلب لك مع شركات الشحن هذا الموقع مخصص فقط لطلبات الرياض ويتم التوصيل عن طريق المناديب
                        </p>
                        <a href="https://sharraby.me" target="_blank" rel="noopener noreferrer" className="inline-block bg-red-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-red-700 transition-colors">
                          زيارة المتجر الرئيسي
                        </a>
                      </div>
                    )}
                  </div>
                  <div className="space-y-3">
                    <label
                      htmlFor="district"
                      className="text-sm font-bold text-gray-700"
                    >
                      الحي
                    </label>
                    <input
                      id="district"
                      required
                      type="text"
                      placeholder="مثال: حي الملقا"
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all font-sans text-gray-900 placeholder:text-gray-400"
                      value={formData.district}
                      onChange={(e) =>
                        setFormData({ ...formData, district: e.target.value })
                      }
                    />
                  </div>
                </div>
              </form>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-black mb-8 pb-6 border-b border-gray-100 flex items-center gap-3 text-gray-900">
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm">
                  2
                </span>
                طريقة الدفع
              </h2>

              <div role="radiogroup" aria-labelledby="payment-label" className="space-y-4">
                <div id="payment-label" className="sr-only">
                  اختر طريقة الدفع
                </div>
                
                {/* COD Option */}
                <label className={`border-2 rounded-2xl p-5 flex items-center justify-between cursor-pointer focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 transition-colors ${paymentMethod === 'cod' ? 'border-primary bg-primary/5' : 'border-gray-200 bg-white hover:border-primary/50'}`}>
                  <div className="flex items-center gap-4">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="sr-only"
                    />
                    <div className={`w-6 h-6 rounded-full border-4 flex items-center justify-center shadow-sm transition-colors ${paymentMethod === 'cod' ? 'border-primary bg-white' : 'border-gray-300 bg-gray-50'}`} />
                    <span className="font-bold text-gray-900 text-lg">
                      الدفع عند الاستلام
                    </span>
                  </div>
                  <ShieldCheck className={`w-8 h-8 ${paymentMethod === 'cod' ? 'text-primary' : 'text-gray-400'}`} />
                </label>

                <div className="text-sm text-gray-500 mt-2 mb-6 flex items-start md:items-center gap-2 bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <Lock className="w-4 h-4 shrink-0 text-gray-400" />
                  <span>
                    تسوق آمن ومريح 100%. لن تدفع أي مبلغ حتى تستلم منتجك بين يديك وتتأكد منه.
                  </span>
                </div>

                <div className="pt-4">
                  <h3 className="text-lg font-black text-gray-900 mb-4 text-center">أو ادفع الحين واحصل على 10% خصم اضافي فوري</h3>
                  {/* Pay Online Option */}
                  <label className={`relative border-2 rounded-2xl p-5 flex flex-col gap-4 cursor-pointer focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 transition-colors ${paymentMethod === 'online' ? 'border-primary bg-primary/5' : 'border-gray-200 bg-white hover:border-primary/50'}`}>
                    <div className="absolute -top-3 -right-3 bg-amber-400 text-amber-950 text-xs font-black px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" />
                      موصى به
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <input
                          type="radio"
                          name="payment"
                          value="online"
                          checked={paymentMethod === "online"}
                          onChange={() => setPaymentMethod("online")}
                          className="sr-only"
                        />
                        <div className={`w-6 h-6 rounded-full border-4 flex items-center justify-center shadow-sm transition-colors ${paymentMethod === 'online' ? 'border-primary bg-white' : 'border-gray-300 bg-gray-50'}`} />
                        <div>
                          <span className="font-black text-gray-900 text-lg flex items-center gap-2">
                            الدفع الإلكتروني
                            <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-md flex items-center gap-1">
                              <Zap className="w-3 h-3 fill-current" />
                              خصم 10%
                            </span>
                          </span>
                          <p className="text-sm text-gray-500 mt-1">Apple Pay • Google Pay • بطاقات مدى والائتمان</p>
                        </div>
                      </div>
                      <CreditCard className={`w-8 h-8 ${paymentMethod === 'online' ? 'text-primary' : 'text-gray-400'}`} />
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 sticky top-28">
              <h2 className="text-2xl font-black mb-8 pb-6 border-b border-gray-100 text-gray-900">
                المجموع النهائي
              </h2>

              <div className="space-y-5 mb-8">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-contain p-2"
                      />
                      <div className="absolute top-0 right-0 bg-primary/95 text-white text-[10px] w-6 h-6 flex items-center justify-center rounded-bl-xl font-bold z-10 shadow-sm backdrop-blur-sm">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex-1 py-1">
                      <h4 className="font-bold text-sm leading-relaxed text-gray-900 line-clamp-2">
                        {item.name}
                      </h4>
                      <p className="text-primary font-bold mt-2 text-base">
                        {item.price} ر.س
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-6 mb-6 space-y-4">
                <div className="flex justify-between text-base">
                  <span className="text-gray-500 font-medium">
                    المجموع الفرعي
                  </span>
                  <span className={`font-bold ${discountAmount > 0 ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                    {subtotal} ر.س
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-base text-green-600 font-bold bg-green-50 p-2 rounded-lg -mx-2 px-2">
                    <span className="flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      خصم الدفع الإلكتروني (10%)
                    </span>
                    <span>
                      -{discountAmount} ر.س
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-base">
                  <span className="text-gray-500 font-medium">تكلفة الشحن</span>
                  <span className="font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-md">
                    {shipping === 0 ? "مجاني 🚀" : `${shipping} ر.س`}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6 mb-8">
                <div className="flex justify-between items-center bg-gray-50 p-5 rounded-2xl border border-gray-200">
                  <span className="font-black text-xl text-gray-900">
                    الإجمالي
                  </span>
                  <div className="text-left">
                    <span className="font-black text-3xl text-primary block">
                      {total} <span className="text-xl">ر.س</span>
                    </span>
                    {discountAmount > 0 && (
                      <span className="text-xs text-green-600 font-bold">شامل الخصم</span>
                    )}
                  </div>
                </div>
              </div>

              {paymentMethod === "online" ? (
                <StripeWrapper 
                  total={total} 
                  disabled={formData.city === "خارج الرياض" || !!phoneError}
                  onSuccess={handleStripeSuccess}
                  buttonText={`دفع ${total} ر.س وتأكيد الطلب`}
                />
              ) : (
                <button
                  type="submit"
                  form="checkout-form"
                  disabled={isSubmitting || formData.city === "خارج الرياض"}
                  className="w-full bg-primary hover:bg-primary-dark text-white font-black py-6 rounded-2xl text-xl flex items-center justify-center gap-3 transition-all shadow-[0_15px_30px_rgba(26,83,92,0.25)] disabled:opacity-70 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] outline-none focus-visible:ring-4 focus-visible:ring-primary/50"
                >
                  {isSubmitting ? "جاري التأكيد..." : "تأكيد الطلب الآن"}
                  {!isSubmitting && <ArrowRight className="w-6 h-6 rotate-180" />}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
