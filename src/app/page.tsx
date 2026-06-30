"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useCartStore } from "@/lib/store";
import {
  ArrowLeft,
  CheckCircle2,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RefreshCcw,
  Star,
  ChevronDown,
  Award,
  Droplets,
  Wind,
  Package,
  HeartHandshake,
} from "lucide-react";

const BUNDLES = [
  {
    id: 10,
    name: "باقة 10 أزواج",
    pairs: 10,
    price: 99,
    originalPrice: 199,
    badge: null,
    image: "/joss.png",
  },
  {
    id: 20,
    name: "باقة 20 زوج",
    pairs: 20,
    price: 169,
    originalPrice: 299,
    badge: "الأكثر مبيعاً",
    isPopular: true,
    image: "/joss.png",
  },
  {
    id: 30,
    name: "باقة 30 زوج",
    pairs: 30,
    price: 249,
    originalPrice: 399,
    badge: "توفير أكبر",
    image: "/joss.png",
  },
];

const FAQS = [
  {
    q: "كم يستغرق التوصيل؟",
    a: "يستغرق التوصيل من 24 إلى 48 ساعة.",
  },
  {
    q: "هل يتوفر الدفع عند الاستلام؟",
    a: "نعم، خدمة الدفع عند الاستلام متاحة حصرياً لعملائنا في مدينة الرياض. للطلبات خارج الرياض يرجى الطلب عبر متجرنا الرئيسي https://sharraby.me حيث يتطلب الدفع مسبقاً.",
  },
  {
    q: "ما هي المقاسات المتوفرة؟",
    a: "نحن نستخدم نسيجاً مرناً وعالي الجودة يناسب جميع مقاسات القدم للبالغين من (40 إلى 45) بشكل ممتاز ومريح جداً.",
  },
  {
    q: "مما تصنع جوارب شرّابي؟",
    a: "تتكون جوارب القطن من 80% قطن و 20% spandex.",
  },
  {
    q: "هل تمنع جواربكم التعرق والروائح؟",
    a: "جوارب نانو الفضة فقط هي مقاومة للروائح والبكتيريا.",
  },
  {
    q: "ما هي سياسة الاسترجاع الخاصة بكم؟",
    a: "سياسة الاسترجاع متاحة فقط لجوارب نانو الفضة، يحق للعميل تجربة زوج واحد خلال 3 أيام من استلام الطلب. يرجى مراجعة صفحة سياسة الاسترجاع.",
  },
  {
    q: "هل الخامات مناسبة للصيف؟",
    a: "تم تصميم سُمك الجوارب ليكون مثالياً للاستخدام اليومي في أجواء الخليج؛ فهي ليست سميكة جداً للحر، ولا رقيقة للتمزق السريع، بل هي في نقطة التوازن المثالية.",
  },
  {
    q: "هل ألوان الجوارب تتغير مع الغسيل؟",
    a: "نستخدم أصباغاً ثابتة وعالية الجودة. للحفاظ عليها لفترة أطول نوصي بغسلها بماء بارد إلى دافئ وعدم استخدام المبيضات.",
  },
  {
    q: "كيف أحصل على الشحن المجاني؟",
    a: "يسعدنا تقديم شحن مجاني تماماً لأي طلب تتجاوز قيمته 99 ريال سعودي كهدية لعملائنا.",
  },
  {
    q: "هل تتوفر باقات للشركات أو الطلبات الكبيرة؟",
    a: "بالتأكيد، يمكنك التواصل مع فريق الدعم لدينا عبر البريد الإلكتروني للحصول على عروض وأسعار خاصة لطلبات الجملة.",
  },
];

import { REVIEWS } from "@/lib/reviews";
import WebPageSchema from "@/components/WebPageSchema";

export default function Home() {
  const { addItem, openCart } = useCartStore();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const mockProduct = {
    id: `premium-socks-10-black`,
    name: "باقة 10 أزواج - نانو فضة (أسود)",
    price: 99,
    originalPrice: 199,
    image: "/joss.png",
    bundleQuantity: 10,
  };

  const handleQuickAdd = () => {
    addItem(mockProduct, 1);
    openCart();
  };

  const handleAddBundle = (bundle: { id: number, name: string, pairs: number, price: number, originalPrice: number, badge: string | null, image: string }) => {
    addItem(
      {
        id: `premium-socks-${bundle.pairs}-black`,
        name: `باقة ${bundle.name} - جوارب نانو الفضة (أسود)`,
        price: bundle.price,
        originalPrice: bundle.originalPrice,
        image: bundle.image,
        bundleQuantity: bundle.pairs,
      },
      1,
    );
    openCart();
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a,
      },
    })),
  };

  return (
    <div className="flex flex-col w-full pb-20 md:pb-0 overflow-x-hidden">
      <WebPageSchema
        name="شرّابي | Sharraby - متجر الجوارب والشرابات الفاخرة"
        description="المتجر الأول في السعودية لشراء جوارب وشرابات مريحة، قطنية، وضد الروائح. تسوق أفضل شرابات نانو الفضة وجوارب القطن المريحة الآن."
        url="https://sharraby.com"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* 1. Hero Section */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-visible bg-white pt-10 pb-40 md:pb-10 md:overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-l from-white via-white/95 to-transparent z-10" />
        </div>

        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 text-center md:text-right">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6 border border-primary/20">
              <CheckCircle2 className="w-4 h-4" /> الجودة والتوفير بأقل سعر بالمملكة
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-tight mb-6 tracking-tight">
              الراحة تبدأ من <br />
              <span className="text-primary relative inline-block">
                قدميك
                <svg
                  className="absolute w-full h-3 -bottom-2 right-0 text-primary/30"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 5 Q 50 10 100 5"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                </svg>
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl leading-relaxed font-medium mx-auto md:mx-0">
              اختر بين جوارب قطن او شرابات نانو الفضة مصممة خصيصاً لتحمل ضغط الاستخدام اليومي في أجواء المملكة. قطن طبيعي يسمح بالتهوية ويمتص العرق، مدعم ليدوم طويلاً.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
              <Link
                href="/products"
                className="w-full sm:w-auto px-8 py-4 bg-primary text-white font-bold rounded-xl text-lg flex items-center justify-center gap-3 hover:bg-primary/90 transition-transform active:scale-[0.98] shadow-lg shadow-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                اطلب الآن، الدفع عند الاستلام
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </div>

            <div className="flex items-center gap-6 mt-10 justify-center md:justify-start text-sm font-bold text-gray-500">
              <div className="flex -space-x-4 -space-x-reverse">
                <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-bold shrink-0">
                  SA
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs font-bold shrink-0">
                  FA
                </div>
                <div className="w-10 h-10 rounded-full bg-primary/20 border-2 border-white flex items-center justify-center text-primary font-bold shrink-0">
                  +1k
                </div>
              </div>
              <div>
                <div className="flex text-amber-400 mb-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span>4.9/5 من العملاء الراضين</span>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full max-w-lg lg:max-w-none relative mt-12 md:mt-0">
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="transform translate-y-8 md:translate-y-12 block"
              >
                <Link href="/product/premium-socks">
                  <Image
                    src="/nano-black.jpeg"
                    alt="جوارب نانو الفضة"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto' }}
                    className="rounded-[2rem] shadow-2xl shadow-gray-900/10 border-4 border-primary transition-transform duration-700 hover:scale-105"
                    priority
                  />
                </Link>
              </motion.div>
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="block"
              >
                <Link href="/product/cotton-bundle">
                  <Image
                    src="/joss.png"
                    alt="بكج التوفير قطن"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto' }}
                    className="rounded-[2rem] shadow-2xl shadow-gray-900/10 border-4 border-primary transition-transform duration-700 hover:scale-105"
                    priority
                  />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 2 & 4. Why Choose Sharrabi & Benefits (Merged) */}
      <section className="bg-[#F8F9FA] py-20 lg:py-32 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black mb-6 text-gray-900 tracking-tight">
              لماذا بكج شرّابي هوخيارك الأول؟
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              لأننا نعلم أن راحتك طوال اليوم تبدأ من قدميك. صممنا جواربنا لتلبي
              أعلى معايير الجودة والتصميم بما يتناسب مع طبيعة الحياة اليومية في السعودية.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mb-6">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                قطن اصلي
              </h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                أفضل أنواع القطن النقي لضمان ملمس ناعم جداً على الجلد لا يسبب
                الحساسية أو التهيج.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mb-6">
                <Wind className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                تهوية مستمرة
              </h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                نسيج دقيق المسام يسمح بتنفس القدم، مما يحد من تكون الروائح
                البكتيرية حتى أثناء المشي الطويل.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mb-6">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                متانة تدوم
              </h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                تدعيم مضاعف في منطقة الكعب وأصابع القدم لحماية الجورب من التمزق
                وإطالة عمره الافتراضي.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mb-6">
                <Droplets className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                امتصاص الرطوبة
              </h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                يمتص العرق بسرعة بفضل تقنية مزج القطن مع ألياف البوليستر
                المتطورة، لتحتفظ بجفاف قدميك.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Before & After Lifestyle Section */}
      <section className="bg-white py-20 lg:py-32 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1">
              <h2 className="text-3xl md:text-5xl font-black mb-6 text-gray-900 tracking-tight leading-tight">
                وداعاً للإحراج. مرحباً بالثقة.
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                بكج نانو الفضة من شرّابي ليس مجرد اي جوارب عادية، بل هو إحساس بالراحة يدوم معك طوال اليوم. لا مزيد من التعرق المفرط، ولا روائح غير مستحبة، ولا تمزقات مفاجئة في أوقات حرجة.
              </p>
              <ul className="space-y-4 mb-10 text-gray-700 font-medium">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />{" "}
                  مدعم بتقنية نانو الفضة
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />{" "}
                  ثبات للون لا يتأثر بتكرار الغسيل
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />{" "}
                  تصميم يلائم الأحذية الرياضية والرسمية معاً
                </li>
              </ul>
              <Link
                href="/products"
                className="inline-flex w-full sm:w-auto px-8 py-4 bg-gray-900 text-white font-bold rounded-xl text-lg items-center justify-center gap-3 hover:bg-gray-800 transition-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
              >
                ارفع مستوى أناقتك اليوم
              </Link>
            </div>
            <div className="flex-1 w-full max-w-lg lg:max-w-none relative mt-12 md:mt-0">
              <div className="hidden md:grid grid-cols-2 gap-4 md:gap-6">
                <Link href="/product/premium-socks" className="flex flex-col gap-4 transform translate-y-8 md:translate-y-12 block group">
                  <Image
                    src="/nano-black.jpeg"
                    alt="بكج نانو الفضة"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto' }}
                    className="rounded-[2rem] shadow-2xl shadow-gray-900/10 border-4 border-primary transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="text-gray-900 font-bold text-lg md:text-xl text-center px-2">
                    تقنية نانو الفضة
                  </span>
                </Link>
                <Link href="/product/cotton-bundle" className="flex flex-col gap-4 block group">
                  <Image
                    src="/joss.png"
                    alt="بكج التوفير شرابات قطن"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto' }}
                    className="rounded-[2rem] shadow-2xl shadow-gray-900/10 border-4 border-primary transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="text-gray-900 font-bold text-lg md:text-xl text-center px-2">
                    كمية تكفيك شهور
                  </span>
                </Link>
              </div>

              {/* Mobile Only: Hero03 Image */}
              <div className="md:hidden relative aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl bg-white w-full">
                <Image
                  src="/hero03.jpeg?v=new"
                  alt="راحة يومية تبدأ من خطواتك"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 11. Statistics Section */}
      <section className="bg-white py-16 border-b border-gray-100 hidden md:block">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y-2 md:divide-y-0 md:divide-x-2 md:divide-x-reverse divide-gray-100 text-center">
            <div className="py-6">
              <p className="text-4xl lg:text-5xl font-black text-primary mb-2">
                15,000+
              </p>
              <p className="text-gray-500 font-medium">طلب تم توصيله بنجاح</p>
            </div>
            <div className="py-6">
              <p className="text-4xl lg:text-5xl font-black text-primary mb-2">
                %98
              </p>
              <p className="text-gray-500 font-medium">معدل رضا العملاء</p>
            </div>
            <div className="py-6">
              <p className="text-4xl lg:text-5xl font-black text-primary mb-2">
                %45
              </p>
              <p className="text-gray-500 font-medium">
                من عملائنا يكررون الشراء
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Customer Reviews Section */}
      <section id="reviews" className="bg-[#F8F9FA] py-20 lg:py-32 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black mb-6 text-gray-900 tracking-tight">
              تجارب عملائنا مع جوارب شرّابي
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              نفخر في شرّابي بمجتمع من العملاء الراضين الذين اختاروا أفضل شرابات مريحة في السعودية.
            </p>
            <div className="flex items-center justify-center gap-2">
              <div className="flex text-amber-400">
                <Star className="w-6 h-6 fill-current" />
                <Star className="w-6 h-6 fill-current" />
                <Star className="w-6 h-6 fill-current" />
                <Star className="w-6 h-6 fill-current" />
                <Star className="w-6 h-6 fill-current" />
              </div>
              <span className="font-bold text-gray-900 text-lg">
                4.9 / 5 تقييم عام
              </span>
            </div>
          </div>

          <div className="relative overflow-hidden w-[100vw] left-1/2 -translate-x-1/2 py-4" dir="ltr">
            <div className="absolute top-0 left-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-[#F8F9FA] to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 right-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-[#F8F9FA] to-transparent z-10 pointer-events-none" />
            
            <div
              className="flex gap-6 w-max px-6 animate-infinite-scroll hover:[animation-play-state:paused]"
            >
              {[...REVIEWS, ...REVIEWS].map((review, idx) => (
                <div
                  key={`${review.id}-${idx}`}
                  className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col relative w-[320px] md:w-[380px] shrink-0"
                  dir="rtl"
                >
                  <div className="flex text-amber-400 mb-4">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                  <p className="text-gray-700 leading-relaxed font-medium mb-6 flex-1 text-sm md:text-base whitespace-normal">
                    &quot;{review.text}&quot;
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-black text-sm shrink-0">
                      {review.initial}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm leading-tight">
                        {review.name}
                      </h4>
                      <span className="text-xs text-gray-500 font-medium">
                        {review.city} • {review.date}
                      </span>
                    </div>
                  </div>
                  {review.verified && (
                    <span className="absolute top-6 left-6 text-[10px] text-emerald-600 font-bold flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded-full">
                      <ShieldCheck className="w-3 h-3" /> مشتري موثوق
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 10. Brand Story Section */}
      <section className="bg-white py-20 lg:py-32 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="bg-primary/5 rounded-[3rem] p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 lg:gap-24 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />

            <div className="flex-1 w-full max-w-lg relative z-10">
              <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl hidden md:block bg-white">
                <Image
                  src="/hero03.jpeg?v=new"
                  alt="مميزات جوارب شرابي"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>

            <div className="flex-1 relative z-10 text-center md:text-right">
              <span className="text-primary font-bold tracking-wider mb-2 flex flex-row items-center gap-2 justify-center md:justify-start text-sm">
                <HeartHandshake className="w-5 h-5" /> قصتنا
              </span>
              <h2 className="text-3xl md:text-5xl font-black mb-6 text-gray-900 tracking-tight leading-tight">
                لأن الجودة لا تتجزأ
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                بدأت &quot;شرّابي&quot; من حاجة شخصية بسيطة: البحث عن جوارب مريحة، متينة، ولا
                تسبب الروائح في بيئة العمل الطويلة. لاحظنا أن السوق يمتلئ
                بالمنتجات الرديئة التي تستهلك بسرعة أو تلك الباهظة بشكل مبالغ
                فيه.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                لذا، وضعنا على عاتقنا مهمة صناعة الخيار الأذكى: جودة تليق بأجواء
                المملكة الحارة، بسعر معقول، وخدمة تصلك لبيتك مع خيار الدفع عند
                الاستلام.
              </p>
              <Link
                href="/products"
                className="inline-flex px-8 py-4 bg-primary text-white font-bold rounded-xl text-lg items-center justify-center gap-3 hover:bg-primary-dark transition-transform active:scale-[0.98] shadow-lg shadow-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                اكتشف فرق شرّابي اليوم
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQ Section */}
      <section id="faq" className="bg-[#F8F9FA] py-20 lg:py-32 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-6 text-gray-900 tracking-tight">
              الأسئلة الشائعة
            </h2>
            <p className="text-lg text-gray-600">
              كل ما تود معرفته عن منتجاتنا وخدماتنا
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full text-right p-6 flex items-center justify-between font-bold text-gray-900 hover:text-primary transition-colors focus-visible:outline-none focus-visible:bg-gray-50"
                  aria-expanded={openFaq === index}
                >
                  <span className="text-lg">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 shrink-0 ${openFaq === index ? "rotate-180 text-primary" : ""}`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <div className="p-6 pt-0">
                    <p className="border-t border-gray-100 mt-2 text-gray-600 leading-relaxed font-medium pt-4">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. Final CTA Section */}
      <section className="bg-white py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5"></div>
        <div className="relative max-w-4xl mx-auto px-4 text-center z-10">
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-gray-900 tracking-tight leading-tight">
            جاهز لتجربة راحة حقيقية مع أفضل شرابات؟
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-10 max-w-2xl mx-auto">
            لا تدع الجوارب الرديئة تفسد يومك. انضم إلى آلاف العملاء في السعودية الذين اختاروا شرابات قطن وجوارب نانو الفضة. اطلب الآن، وتأكد بنفسك.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/products"
              className="w-full sm:w-auto px-10 py-5 bg-primary text-white font-black rounded-2xl text-xl flex items-center justify-center gap-3 hover:bg-primary-dark transition-all transform hover:scale-105 active:scale-95 shadow-2xl shadow-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              تسوق باقات شرّابي
              <ArrowLeft className="w-6 h-6" />
            </Link>
          </div>
          <p className=" mt-6 text-sm font-bold text-gray-500 flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" /> توصيل داخل الرياض -
            الدفع عند الاستلام
          </p>
        </div>
      </section>

      {/* 8. Trust Bar Section (Duplicated for bottom of page reassurance) */}
      <section className="bg-gray-900 text-white py-10 w-full border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x divide-x-reverse divide-gray-800">
          <div className="flex flex-col items-center text-center px-4">
            <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mb-4 text-primary">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm mb-1">دفع آمن أو عند الاستلام</h3>
            <p className="text-xs text-gray-400">
              لن تدفع أي مبلغ حتى تستلم منتجك بين يديك
            </p>
          </div>
          <div className="flex flex-col items-center text-center px-4">
            <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mb-4 text-primary">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm mb-1">توصيل سريع للرياض</h3>
            <p className="text-xs text-gray-400">
              توصيل داخل الرياض فقط. وللمدن الأخرى الطلب عبر متجرنا الرئيسي
            </p>
          </div>
          <div className="flex flex-col items-center text-center px-4">
            <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mb-4 text-primary">
              <RefreshCcw className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm mb-1">ضمان ذهبي</h3>
            <p className="text-xs text-gray-400">
              ضمان ذهبي واسترجاع مرن مخصص لجوارب نانو الفضة فقط
            </p>
          </div>
          <div className="flex flex-col items-center text-center px-4">
            <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mb-4 text-primary">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm mb-1">قطن طبيعي %100</h3>
            <p className="text-xs text-gray-400">
              مواد عالية الجودة تمنع الروائح والحساسية
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
