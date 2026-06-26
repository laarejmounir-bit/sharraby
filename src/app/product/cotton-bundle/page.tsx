"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  Truck,
  ShieldCheck,
  RefreshCcw,
  Check,
  ArrowLeft,
  Flame,
  Info
} from "lucide-react";
import { useCartStore } from "@/lib/store";
import { ReviewModal } from "@/components/ReviewModal";
import { REVIEWS } from "@/lib/reviews";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import WebPageSchema from "@/components/WebPageSchema";
import ProductSchema from "@/components/ProductSchema";

const BUNDLES = [
  {
    id: 36,
    name: "1 بكج",
    pairs: 36,
    price: 99,
    originalPrice: 199,
    badge: null,
  },
  {
    id: 72,
    name: "2 بكج",
    pairs: 72,
    price: 169,
    originalPrice: 398,
    badge: "الأكثر مبيعاً",
    isPopular: true,
  },
  {
    id: 108,
    name: "3 بكج",
    pairs: 108,
    price: 249,
    originalPrice: 597,
    badge: "أفضل قيمة",
  }
];

const COLORS = [
  { id: "all", name: "مشكل (أسود، أبيض، مكس)", hex: "conic-gradient(#111111 0% 33%, #F3F4F6 33% 66%, #6B7280 66% 100%)", imageIdx: 0 },
  { id: "black", name: "أسود بالكامل", hex: "#111111", imageIdx: 1 },
  { id: "white", name: "أبيض بالكامل", hex: "#F3F4F6", imageIdx: 2 },
];

export default function CottonBundlePage() {
  const [reviews, setReviews] = useState(REVIEWS);
  const [visibleReviews, setVisibleReviews] = useState(3);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedBundle, setSelectedBundle] = useState(BUNDLES[0]);
  const [selectedColors, setSelectedColors] = useState([COLORS[0]]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [salesCounter, setSalesCounter] = useState(1287);
  const { addItem, openCart } = useCartStore();

  const images = [
    "/joss.png",
  ];

  const savings = selectedBundle.originalPrice - selectedBundle.price;

  useEffect(() => {
    // Dynamic sales counter to increase urgency
    const interval = setInterval(() => {
      // 30% chance to increase the counter every 8 seconds
      if (Math.random() > 0.7) {
        setSalesCounter(prev => prev + 1);
      }
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleAddToCart = () => {
    const colorsId = selectedColors.map(c => c.id).join('-');
    const colorsName = selectedColors.map(c => c.name).join('، ');

    const product = {
      id: `cotton-bundle-${selectedBundle.pairs}-${colorsId}`,
      name: `${selectedBundle.name} - لون (${colorsName})`,
      price: selectedBundle.price,
      originalPrice: selectedBundle.originalPrice,
      image: images[selectedColors[0].imageIdx] || images[0],
      bundleQuantity: selectedBundle.pairs,
    };

    addItem(product, 1);
    openCart();
  };

  return (
    <div className="bg-transparent w-full pb-24 md:pb-0">
      <WebPageSchema
        name={`باقة ${selectedBundle.name} - جوارب قطن | شرّابي`}
        description="هل تعبت من شراء الجوارب كل أسبوع؟ وفرنا لك الحل النهائي! بكج ضخم يحتوي على أزواج الجوارب الصيفية بقيمة رائعة."
        url="https://sharraby.com/product/cotton-bundle"
      />
      <BreadcrumbSchema
        items={[
          { name: "الرئيسية", item: "https://sharraby.com" },
          { name: "المنتجات", item: "https://sharraby.me/products" },
          { name: "بكج التوفير قطن", item: "https://sharraby.me/product/cotton-bundle" }
        ]}
      />
      <ProductSchema
        product={{
          id: "cotton-bundle",
          name: `باقة ${selectedBundle.name} - جوارب قطن`,
          image: ["https://sharraby.me/joss.png"],
          description: "هل تعبت من شراء الجوارب كل أسبوع؟ وفرنا لك الحل النهائي! بكج ضخم يحتوي على جوارب قطنية مريحة.",
          brand: "شرّابي",
          sku: `COTTON-${selectedBundle.pairs}`,
          price: selectedBundle.price,
          originalPrice: selectedBundle.originalPrice,
          currency: "SAR",
          availability: "https://schema.org/InStock",
          ratingValue: 4.8,
          reviewCount: 740,
          reviews: REVIEWS.slice(0, 5).map(r => ({
            author: r.name,
            datePublished: new Date().toISOString().split('T')[0],
            reviewBody: r.text,
            reviewRating: 5
          }))
        }}
      />
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="text-sm text-gray-500 mb-6 flex items-center gap-2">
          <Link
            href="/"
            className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
          >
            الرئيسية
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-bold">
            بكج التوفير والراحة
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          <div className="space-y-4">
            <div className="group relative aspect-square w-full rounded-3xl overflow-hidden bg-white">
              <Image
                src={images[selectedImage] || images[0]}
                alt="بكج التوفير والراحة"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain transition-transform duration-500 group-hover:scale-105 p-4"
                priority
              />
            </div>

            <div className="flex gap-4 overflow-x-auto p-2 scrollbar-hide">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  aria-label={`تحديد صورة المنتج ${idx + 1}`}
                  aria-current={selectedImage === idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 bg-white ${selectedImage === idx ? "shadow-md scale-105" : "opacity-60 hover:opacity-100 hover:scale-105"}`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    sizes="96px"
                    className="object-contain p-2"
                  />
                </button>
              ))}
            </div>
            
            {/* Extended Details for Mobile */}
            <div className="md:hidden mt-8">
              <DetailsSection pairs={selectedBundle.pairs} />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex text-amber-400">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <span className="text-sm font-bold text-gray-900">4.8</span>
              <a
                href="#reviews"
                className="text-sm text-primary underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
              >
                (740 تقييم)
              </a>
            </div>

            <h1 className="text-3xl md:text-3xl lg:text-4xl font-black text-gray-900 mb-4 leading-tight tracking-tight">
              📦 بكج &quot;التوفير والراحة&quot; – {selectedBundle.pairs} زوج قطني
            </h1>

            <p className="text-gray-600 mb-6 leading-relaxed text-lg">
              هل تعبت من شراء الجوارب كل أسبوع؟ وفرنا لك الحل النهائي! بكج ضخم يحتوي على {selectedBundle.pairs} زوجاً من الجوارب الصيفية بقيمة رائعة. احصل على الزوج الواحد بسعر أقل من 3 ريال.
            </p>

            <div className="bg-red-50 text-red-700 px-4 py-3 rounded-2xl flex justify-center items-center gap-2 mb-8 shadow-sm border border-red-100 animate-pulse">
              <span className="relative flex h-5 w-5 shrink-0 items-center justify-center">
                <Flame className="w-5 h-5 text-red-600 relative z-10" />
              </span>
              <span className="font-bold text-base md:text-lg">
                تم شراءه {salesCounter} مرة
              </span>
            </div>

            <div className="flex items-end gap-4 mb-8">
              <span className="text-5xl font-black text-primary">
                {selectedBundle.price} <span className="text-2xl">ر.س</span>
              </span>
              <span className="text-xl text-gray-400 line-through mb-1.5">
                {selectedBundle.originalPrice} ر.س
              </span>
              <span className="text-sm font-bold bg-green-100 text-green-700 px-3 py-1.5 rounded-lg mb-2 border border-green-200">
                فرصة التوفير الخارق
              </span>
            </div>

            <div className="mb-8">
              <h3 className="font-bold mb-4 text-gray-900 text-lg">
                اختر الباقة المناسبة{" "}
                <span className="text-sm font-normal text-gray-500">
                  (مع خصم إضافي)
                </span>
              </h3>
              <div className="flex flex-col gap-3">
                {BUNDLES.map((bundle) => (
                  <button
                    key={bundle.id}
                    aria-pressed={selectedBundle.id === bundle.id}
                    onClick={() => {
                      setSelectedBundle(bundle);
                      const packagesCount = bundle.pairs / 36;
                      setSelectedColors(prev => {
                        const newColors = [...prev];
                        while (newColors.length < packagesCount) {
                          newColors.push(COLORS[0]);
                        }
                        return newColors.slice(0, packagesCount);
                      });
                    }}
                    className={`relative w-full p-5 rounded-2xl border-2 transition-all flex items-center justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${selectedBundle.id === bundle.id ? "border-primary bg-primary/5 shadow-md" : "border-gray-200 bg-white hover:border-primary/40"}`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedBundle.id === bundle.id ? "border-primary bg-primary" : "border-gray-300"}`}
                      >
                        {selectedBundle.id === bundle.id && (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-bold text-gray-900">{bundle.name}</p>
                          {bundle.badge && (
                            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm ${bundle.isPopular ? "bg-gradient-to-l from-orange-500 to-amber-500 text-white animate-pulse" : "bg-gray-100 text-gray-700"}`}>
                              {bundle.isPopular && <Flame className="w-3 h-3 text-white" />}
                              {bundle.badge}
                            </span>
                          )}
                        </div>
                        <div className="inline-block mt-0.5 bg-[#dcfce7] text-[#166534] text-xs font-bold px-2.5 py-1 rounded-md border border-[#bbf7d0]">
                          {bundle.pairs} زوج جوارب قطن
                        </div>
                      </div>
                    </div>
                    <div className="text-left">
                      <p className="font-black text-primary text-xl">
                        {bundle.price} ر.س
                      </p>
                      <p className="text-xs text-gray-400 line-through">
                        {bundle.originalPrice} ر.س
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-bold mb-4 text-gray-900 text-lg">
                {selectedBundle.pairs / 36 === 1 ? "اختر اللون:" : "اختر ألوان البكجات:"}
              </h3>
              <div className="flex flex-col gap-4">
                {Array.from({ length: selectedBundle.pairs / 36 }).map((_, idx) => (
                  <div key={idx} className={`flex flex-col md:flex-row md:items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-100 gap-3 ${selectedBundle.pairs / 36 === 1 ? "md:justify-center" : ""}`}>
                    {selectedBundle.pairs / 36 > 1 && (
                      <span className="font-semibold text-gray-700 whitespace-nowrap">{["البكج الأول", "البكج الثاني", "البكج الثالث"][idx] || `البكج ${idx + 1}`}</span>
                    )}
                    <div className={`grid grid-cols-2 gap-2 ${selectedBundle.pairs / 36 === 1 ? "w-full" : "w-full md:w-3/4"}`}>
                      {[COLORS[1], COLORS[2], COLORS[0]].map((color) => (
                        <button
                          key={color.id}
                          onClick={() => {
                            const newColors = [...selectedColors];
                            newColors[idx] = color;
                            setSelectedColors(newColors);
                            if (idx === 0) setSelectedImage(color.imageIdx);
                          }}
                          className={`px-4 py-2 rounded-lg font-bold text-sm transition-all border-2 text-center ${color.id === "all" ? "col-span-2" : "col-span-1"} ${selectedColors[idx]?.id === color.id ? "border-primary bg-primary/10 text-primary" : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"}`}
                        >
                          {color.name}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="hidden md:flex w-full bg-primary hover:bg-primary-dark text-white font-black text-xl py-6 rounded-2xl items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-primary/30 mb-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              أضف للسلة وأكمل الطلب <ArrowLeft className="w-6 h-6" />
            </button>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-8 border-t border-gray-200">
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                </div>
                <span className="text-xs font-bold text-gray-600">
                  الدفع عند الاستلام
                </span>
              </div>
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100">
                  <Truck className="w-6 h-6 text-primary" />
                </div>
                <span className="text-xs font-bold text-gray-600">
                  سريع بالرياض
                </span>
              </div>
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100">
                  <Check className="w-6 h-6 text-primary" />
                </div>
                <span className="text-xs font-bold text-gray-600">
                  قطن أصلي
                </span>
              </div>
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100">
                  <Check className="w-6 h-6 text-primary" />
                </div>
                <span className="text-xs font-bold text-gray-600">
                  علامة سعودية
                </span>
              </div>
            </div>

            {/* Extended Details Desktop */}
            <div className="hidden md:block mt-12 pt-8 border-t border-gray-100">
                <DetailsSection pairs={selectedBundle.pairs} />
            </div>

          </div>
        </div>
      </div>

      <div
        id="reviews"
        className="w-full max-w-7xl mx-auto px-4 md:px-6 py-20 mt-4 md:mt-10"
      >
        <div className="flex flex-col md:flex-row items-center justify-between mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight text-gray-900">
              آراء عملائنا
            </h2>
            <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 inline-flex">
              <div className="flex text-amber-400">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
              </div>
              <span className="font-bold text-gray-900 border-r border-gray-200 pr-3">
                4.8 من 5
              </span>
              <span className="text-gray-500 text-sm">
                (مبني على 740 تقييم)
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsReviewModalOpen(true)}
            className="hidden md:block px-8 py-4 bg-white border-2 border-gray-200 font-bold rounded-xl hover:border-primary hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-sm text-gray-900"
          >
            كتابة تقييم
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.slice(0, visibleReviews).map((review) => (
            <div
              key={review.id}
              className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-black text-xl shrink-0">
                    {review.initial}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 leading-tight">
                      {review.name}{" "}
                      <span className="text-xs text-gray-500 font-medium block sm:inline mt-1 sm:mt-0">
                        ({review.city})
                      </span>
                    </h4>
                    <span className="text-[11px] text-green-600 font-bold flex items-center gap-1 mt-1.5 bg-green-50 w-max px-2 py-0.5 rounded-full">
                      <ShieldCheck className="w-3 h-3" /> مشتري موثوق
                    </span>
                  </div>
                </div>
                <div className="flex text-amber-400 shrink-0">
                  <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                  <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                  <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                  <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                  <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed font-medium mb-6 text-lg">
                &quot;{review.text}&quot;
              </p>
              <span className="text-sm text-gray-400 font-medium">
                {review.date}
              </span>
            </div>
          ))}
        </div>

        {visibleReviews < reviews.length && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setVisibleReviews((prev) => prev + 3)}
              className="px-8 py-4 bg-gray-50 border-2 border-gray-200 font-bold rounded-xl hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-sm text-gray-900"
            >
              الاطلاع على المزيد
            </button>
          </div>
        )}
      </div>

      {/* Related Product */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 mb-20 mt-10">
        <h2 className="text-2xl md:text-3xl font-black mb-8 text-gray-900 border-t border-gray-100 pt-10">
          منتجات قد تعجبك
        </h2>
        <Link href="/product/premium-socks" className="group block bg-white rounded-3xl border border-gray-100 p-3 md:p-6 shadow-sm hover:shadow-lg transition-all duration-300">
          <div className="flex flex-row gap-3 md:gap-6 items-center">
            <div className="w-20 h-20 md:w-48 md:h-48 bg-gray-50 rounded-2xl p-2 md:p-4 flex items-center justify-center shrink-0">
              <Image 
                src="/nano-black.jpeg" 
                alt="جوارب نانو الفضة" 
                width={200} 
                height={200} 
                className="object-contain group-hover:scale-105 transition-transform duration-300 rounded-xl"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-1 text-right">
              <div className="hidden md:flex text-amber-400 mb-2 justify-start">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
              </div>
              <h3 className="text-sm md:text-xl font-black text-gray-900 mb-1 md:mb-2 line-clamp-1">بكج جوارب نانو الفضة (10 أزواج)</h3>
              <p className="hidden md:block text-gray-600 mb-4 line-clamp-2">جوارب مقاومة للروائح والبكتيريا بتقنية النانو، تحافظ على جفاف قدمك طوال اليوم.</p>
              <div className="flex items-center gap-2 md:gap-4 justify-start">
                <span className="text-sm md:text-xl font-black text-primary">99 ر.س</span>
                <span className="text-xs md:text-sm text-gray-400 line-through">199 ر.س</span>
              </div>
            </div>
            <div className="shrink-0 hidden md:block mt-4 md:mt-0">
              <button className="px-8 py-3 bg-primary text-white font-bold rounded-xl group-hover:bg-primary-dark transition-colors pointer-events-none">
                عرض المنتج
              </button>
            </div>
          </div>
        </Link>
      </div>

      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSubmit={(newReview) => {
          setReviews([
            {
              id: Date.now(),
              initial: newReview.name.charAt(0),
              name: newReview.name,
              city: newReview.city,
              rating: newReview.rating,
              text: newReview.text,
              date: "الآن",
              verified: true,
            },
            ...reviews,
          ]);
          setShowToast(true);
          setTimeout(() => setShowToast(false), 3000);
        }}
      />

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-24 right-4 md:right-auto md:left-1/2 md:-translate-x-1/2 z-50 bg-gray-900 text-white px-6 py-4 rounded-xl shadow-2xl animate-fade-in flex items-center gap-3">
          <Check className="w-5 h-5 text-green-400" />
          <span className="font-bold">شكراً لتقييمك! ستتم مراجعة تقييمك ونشره قريباً.</span>
        </div>
      )}

      {/* Mobile CTA */}
      <div className="md:hidden fixed bottom-6 left-4 right-4 z-40">
        <button
          onClick={handleAddToCart}
          className="w-full bg-primary text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 active:scale-[0.98] transition-transform shadow-[0_20px_40px_rgba(26,83,92,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 border border-primary-dark/20 text-lg"
        >
          أضف للسلة وأكمل الطلب - {selectedBundle.price} ر.س
        </button>
      </div>
    </div>
  );
}

function DetailsSection({ pairs }: { pairs: number }) {
    return (
        <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
            <h3 className="text-2xl font-black text-gray-900 mb-6">تفاصيل العرض الرهيب 🌟</h3>
            
            <div className="space-y-6">
                <div>
                    <h4 className="font-bold text-lg text-primary mb-2 flex items-center gap-2">
                        <Check className="w-5 h-5" /> خامة مثالية
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                        مزيج متقن من 80% قطن طبيعي عالي الجودة لراحة ونعومة فائقة، مع 20% سبانديكس (Spandex) لضمان مرونة عالية وثبات على القدم دون انزلاق. خفيفة صيفية ومناسبة للأجواء الحارة.
                    </p>
                </div>
                
                <div>
                    <h4 className="font-bold text-lg text-primary mb-2 flex items-center gap-2">
                        <Check className="w-5 h-5" /> تهوية طبيعية
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                        بفضل نسبة القطن العالية، تسمح الجوارب لقدمك بالتنفس بشكل طبيعي، مما يجعلها الخيار الأمثل لساعات الدوام الطويلة والوقوف المستمر.
                    </p>
                </div>

                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 mt-4">
                    <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Info className="w-5 h-5 text-amber-500" /> سر الانتعاش الدائم (دليل العناية بالقدم)
                    </h4>
                    <ul className="space-y-3">
                        <li className="flex gap-3 text-gray-600 text-sm">
                            <span className="font-bold text-gray-900 shrink-0">نظافة الحذاء:</span>
                            الجوارب القطنية توفر التهوئة، ولكن الحذاء المتهوّي هو السر لمنع الروائح.
                        </li>
                        <li className="flex gap-3 text-gray-600 text-sm">
                            <span className="font-bold text-gray-900 shrink-0">التجديد اليومي:</span>
                            مع {pairs} زوج، بدّل جواربك يومياً لتبقى قدمك منتعشة.
                        </li>
                        <li className="flex gap-3 text-gray-600 text-sm">
                            <span className="font-bold text-gray-900 shrink-0">خيار صحي:</span>
                            صممنا هذه الجوارب من الخامات الطبيعية بدون معالجات كيميائية لتكون صديقة للبشرة.
                        </li>
                    </ul>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center flex flex-col justify-center">
                        <span className="block text-gray-500 text-sm mb-1">المقاس</span>
                        <span className="font-black text-gray-900 text-sm md:text-xl whitespace-nowrap" dir="rtl">فري سايز (37-43)</span>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center flex flex-col justify-center">
                        <span className="block text-gray-500 text-sm mb-1">الكمية</span>
                        <span className="font-black text-gray-900 text-sm md:text-xl whitespace-nowrap">{pairs} زوج</span>
                    </div>
                </div>
                
                <p className="text-xs text-gray-400 mt-4 text-center mt-6">
                    تنويه: هذه الجوارب لا تتوفر على تقنية نانو الفضة. لمقاومة البكتيريا المتقدمة يرجى تصفح فئة الجوارب المميزة.
                </p>
            </div>
        </div>
    );
}
