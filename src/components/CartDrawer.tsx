"use client";

import { useCartStore } from "@/lib/store";
import { X, Minus, Plus, ShoppingBag, ArrowLeft, Check, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

const NANO_COLORS = [
  { id: "black", name: "أسود", hex: "#111111", image: "/nano-black.jpeg" },
  { id: "white", name: "أبيض", hex: "#F3F4F6", image: "/nano-white.jpeg" },
];

const COTTON_COLORS = [
  { id: "all", name: "مشكل", hex: "conic-gradient(#111111 0% 33%, #F3F4F6 33% 66%, #6B7280 66% 100%)", image: "/joss.png" },
  { id: "black", name: "أسود", hex: "#111111", image: "/nano-black.jpeg" }, // Assuming same nano images for simplicity or use joss
  { id: "white", name: "أبيض", hex: "#F3F4F6", image: "/nano-white.jpeg" },
];

export default function CartDrawer() {
  const {
    isCartOpen,
    toggleCart,
    items,
    updateQuantity,
    removeItem,
    getCartTotal,
    addItem,
    updateItem,
  } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  const [upsellColor, setUpsellColor] = useState(NANO_COLORS[0]);
  const [upsellCottonColor, setUpsellCottonColor] = useState(COTTON_COLORS[0]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Revert upsells to regular products if primary product is removed
  useEffect(() => {
    if (!mounted) return;

    const hasPremium = items.some((item) => item.id.includes("premium-socks"));
    const hasCotton = items.some((item) => item.id.includes("cotton-bundle"));

    items.forEach((item) => {
      if (item.id.includes("upsell-cotton") && !hasPremium) {
        removeItem(item.id);
        addItem({
          id: item.id.replace("upsell-cotton", "cotton-bundle"),
          name: item.name.replace(" - عرض خاص", ""),
          price: 99,
          originalPrice: 199,
          image: item.image,
        }, item.quantity);
      }

      if (item.id.includes("upsell-premium") && !hasCotton) {
        removeItem(item.id);
        addItem({
          id: item.id.replace("upsell-premium", "premium-socks"),
          name: item.name.replace(" - عرض خاص", ""),
          price: 99,
          originalPrice: 199,
          image: item.image,
        }, item.quantity);
      }
    });
  }, [items, addItem, removeItem, mounted]);

  // Lock body scroll when cart is open
  useEffect(() => {
    if (!mounted) return;
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen, mounted]);

  if (!mounted) return null;

  const total = getCartTotal();
  const totalSavings = items.reduce((acc, item) => acc + ((item.originalPrice || item.price) - item.price) * item.quantity, 0);
  const amountToFreeShipping = Math.max(0, 99 - total);

  const handleCheckout = () => {
    toggleCart();
    router.push("/checkout");
  };

  const hasPremiumSocks = items.some(item => item.id.includes("premium-socks"));
  const hasCottonBundle = items.some(item => item.id.includes("cotton-bundle"));
  const hasUpsellPremium = items.some(item => item.id.includes("upsell-premium"));
  const hasUpsellCotton = items.some(item => item.id.includes("upsell-cotton"));

  const showCottonUpsell = hasPremiumSocks && !hasCottonBundle && !hasUpsellCotton;
  const showNanoUpsell = hasCottonBundle && !hasPremiumSocks && !hasUpsellPremium;

  const handleAddUpsellCotton = () => {
    addItem(
      {
        id: `upsell-cotton-36-${upsellCottonColor.id}`,
        name: `بكج التوفير 36 زوج (${upsellCottonColor.name}) - عرض خاص`,
        price: 75,
        originalPrice: 199,
        image: upsellCottonColor.image,
      },
      1
    );
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.4 },
      zIndex: 100
    });
  };

  const handleAddUpsellNano = () => {
    addItem(
      {
        id: `upsell-premium-10-${upsellColor.id}`,
        name: `جوارب نانو 10 أزواج (${upsellColor.name}) - عرض خاص`,
        price: 75,
        originalPrice: 199,
        image: upsellColor.image,
      },
      1
    );
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.4 },
      zIndex: 100
    });
  };

  return (
    <>
      {/* Overlay */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity"
          onClick={toggleCart}
        />
      )}

      {/* Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="سلة المشتريات"
        className={`fixed inset-y-0 left-0 w-full md:w-[400px] bg-white border-r border-gray-100 shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out flex flex-col ${
          isCartOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white z-10 box-border">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            <span className="font-bold text-lg text-gray-900">
              سلة المشتريات
            </span>
            <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-0.5 rounded-full">
              {items.length}
            </span>
          </div>
          <button
            onClick={toggleCart}
            aria-label="إغلاق السلة"
            className="p-2 text-gray-400 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Savings Text Notification */}
        {totalSavings > 0 && (
          <div className="bg-green-50 z-10 border-b border-green-100 px-4 py-3 flex items-center gap-3 animate-in slide-in-from-top-2 fade-in duration-300 box-border flex-shrink-0">
            <div className="bg-green-100 p-2 rounded-full text-green-600 flex-shrink-0">
               <Sparkles className="w-5 h-5" />
            </div>
            <div>
               <p className="text-green-800 font-bold text-sm">عرض التوفير مطبق!</p>
               <p className="text-green-600 text-xs font-medium mt-0.5 inline-block">لقد وفرت <span className="font-black text-sm">{totalSavings} ر.س</span> في هذه الطلبية 💸</p>
            </div>
          </div>
        )}

        {/* Free Shipping Alert */}
        <div className="p-4 bg-gray-50 border-b border-gray-100 box-border flex-shrink-0">
          <p className="text-sm font-semibold mb-2 text-center text-gray-800">
            {amountToFreeShipping > 0
              ? `بقي ${amountToFreeShipping} ريال للحصول على الشحن المجاني`
              : "مبروك! مؤهل للشحن المجاني 🚚"}
          </p>
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#10b981] transition-all duration-500 ease-out"
              style={{ width: `${Math.min(100, (total / 99) * 100)}%` }}
            />
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto min-h-0 p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-gray-400 space-y-4 py-12 h-full">
              <ShoppingBag className="w-16 h-16 opacity-20" />
              <p className="text-gray-500">السلة فارغة حالياً</p>
              <button
                onClick={toggleCart}
                className="text-primary font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm px-2"
              >
                تسوق الآن
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-white border border-gray-100 rounded-xl shadow-sm"
                >
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <Image
                      src={item.image || "/joss.png"}
                      alt={item.name}
                      fill
                      sizes="96px"
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-sm leading-tight text-gray-900">
                          {item.name}
                        </h3>
                        <button
                          aria-label="إزالة المنتج"
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                      <p className="text-primary font-bold mt-1">
                        {item.price} ر.س
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-full px-2 py-1">
                        <button
                          aria-label="تقليل الكمية"
                          disabled={item.quantity <= 1}
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-6 h-6 flex items-center justify-center bg-white border border-gray-100 rounded-full shadow-sm text-gray-900 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors hover:bg-gray-50"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-bold text-sm w-4 text-center text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          aria-label="زيادة الكمية"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-6 h-6 flex items-center justify-center bg-white border border-gray-100 rounded-full shadow-sm text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors hover:bg-gray-50"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upsell Section */}
        {(showCottonUpsell || showNanoUpsell) && items.length > 0 && (
          <div className="p-3 bg-orange-50 border-t border-orange-100 flex-shrink-0 flex flex-col gap-2 relative z-10">
            <div className="flex items-center gap-2">
              <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                عرض حصري لك
              </span>
              <p className="text-sm font-bold text-gray-900">أضف المزيد ووفر!</p>
            </div>

            {showCottonUpsell && (
              <div className="bg-white rounded-lg p-2 border border-orange-200 shadow-sm flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 flex-shrink-0 relative flex items-center justify-center rounded-md border border-gray-100 p-1">
                    <div className="relative w-full h-full">
                      <Image src={upsellCottonColor.image} alt="بكج التوفير" fill className="object-contain" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-[13px] text-gray-900 max-w-[150px] truncate">بكج التوفير 36 زوج</h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="font-black text-sm text-primary">75 ر.س</span>
                      <span className="text-[10px] text-gray-400 line-through">199 ر.س</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={handleAddUpsellCotton}
                  className="bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-gray-800 transition-colors shrink-0"
                >
                  أضف للعرض
                </button>
              </div>
            )}

            {showNanoUpsell && (
              <div className="bg-white rounded-lg p-2 border border-orange-200 shadow-sm flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 flex-shrink-0 relative flex items-center justify-center rounded-md border border-gray-100 p-1">
                    <div className="relative w-full h-full">
                      <Image src={upsellColor.image} alt="جوارب نانو" fill className="object-contain" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-[13px] text-gray-900 max-w-[150px] truncate">جوارب نانو 10 أزواج</h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="font-black text-sm text-primary">75 ر.س</span>
                      <span className="text-[10px] text-gray-400 line-through">199 ر.س</span>
                    </div>
                    <div className="flex gap-1 mt-1">
                      {NANO_COLORS.map(color => (
                        <button
                        key={color.id}
                        onClick={() => setUpsellColor(color)}
                        className={`w-4 h-4 rounded-full border shadow-inner flex items-center justify-center ${upsellColor.id === color.id ? 'border-primary ring-1 ring-primary/20' : 'border-gray-300'}`}
                        style={{ backgroundColor: color.hex }}
                      >
                        {upsellColor.id === color.id && <Check className="w-2.5 h-2.5 text-white drop-shadow-md" />}
                      </button>
                      ))}
                    </div>
                  </div>
                </div>
                <button 
                  onClick={handleAddUpsellNano}
                  className="bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-gray-800 transition-colors shrink-0"
                >
                  أضف للعرض
                </button>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 bg-white border-t border-gray-100 box-border flex-shrink-0">
            <div className="flex justify-between mb-4 text-gray-900">
              <span className="font-bold text-gray-600">المجموع:</span>
              <span className="font-black text-xl text-primary">
                {total} ر.س
              </span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-primary text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-transform active:scale-[0.98] shadow-lg shadow-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              إتمام الطلب <ArrowLeft className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
