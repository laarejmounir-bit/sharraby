"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Star, ShieldCheck, Package } from "lucide-react";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import WebPageSchema from "@/components/WebPageSchema";

export default function ProductsPage() {
  return (
    <div className="flex flex-col w-full pb-24 md:pb-0 min-h-screen bg-[#F8F9FA] pt-10">
      <WebPageSchema
        name="تشكيلة الجوارب | شرّابي"
        description="تسوق أفضل شرابات وجوارب نانو الفضة والقطن من شرّابي."
        url="https://sharraby.com/products"
      />
      <BreadcrumbSchema
        items={[
          { name: "الرئيسية", item: "https://sharraby.com" },
          { name: "المنتجات", item: "https://sharraby.me/products" }
        ]}
      />
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20 w-full">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-tight mb-6">
            اختر <span className="text-primary">راحتك مع أفضل شرابات</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            مجموعة منتقاة من أفضل جوارب وشرابات مصممة خصيصاً للرجل السعودي.
            اختر ما يناسب احتياجك اليومي سواء كنت تبحث عن شرابات قطن أو جوارب نانو الفضة.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Premium Socks Product Card */}
          <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 group flex flex-col">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50 flex items-center justify-center p-4">
              <Image
                src="/nano-black.jpeg"
                alt="جوارب نانو فضة الفاخرة"
                fill
                className="object-contain transition-transform duration-700 group-hover:scale-105 p-4"
              />
            </div>
            
            <div className="p-8 flex-1 flex flex-col">
              <div className="mb-4">
                <span className="inline-flex bg-emerald-100 text-emerald-800 text-xs font-black px-3 py-1.5 rounded-full shadow-sm items-center gap-1 border border-emerald-200">
                  <ShieldCheck className="w-4 h-4" /> مدعم بتقنية نانو الفضة
                </span>
              </div>
              <div className="flex text-amber-400 mb-3">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <span className="text-gray-900 text-sm font-bold ml-2">(+1k)</span>
              </div>
              
              <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">
                بكج نانو الفضة
              </h2>
              
              <p className="text-gray-600 mb-8 leading-relaxed font-medium">
                جوارب نانو فضة عالية الجودة مصممة لمنع البكتيريا والروائح.
                مثالية للاستخدام الطويل والدوام في الأجواء الحارة.
              </p>
              
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-center gap-3 text-sm text-gray-700 font-bold">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" /> تقنية الفضة للقضاء على البكتيريا
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-700 font-bold">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" /> قطن طبيعي عالي التهوية
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-700 font-bold">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" /> تصميم يلائم الشكلين الرياضي والرسمي
                </li>
              </ul>
              
              <Link
                href="/product/premium-socks"
                className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 transition-transform active:scale-[0.98] shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 text-lg group-hover:bg-primary"
              >
                تصفح العروض <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-2" />
              </Link>
            </div>
          </div>

          {/* Cotton Bundle Product Card */}
          <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 group flex flex-col relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 z-0" />
            
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50 flex items-center justify-center z-10 p-4">
              <Image
                src="/joss.png"
                alt="بكج التوفير جوارب قطنية"
                fill
                className="object-contain transition-transform duration-700 group-hover:scale-105 p-4"
              />
            </div>
            
            <div className="p-8 flex-1 flex flex-col relative z-10">
              <div className="mb-4">
                <span className="inline-flex bg-red-100 text-red-700 text-xs font-black px-3 py-1.5 rounded-full shadow-sm items-center gap-1 border border-red-200">
                  <Package className="w-4 h-4" /> كمية تكفيك لشهور
                </span>
              </div>
              <div className="flex text-amber-400 mb-3">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <span className="text-gray-900 text-sm font-bold ml-2">(740)</span>
              </div>
              
              <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">
                بكج التوفير
              </h2>
              
              <p className="text-gray-600 mb-8 leading-relaxed font-medium">
                باقات ضخمة (36، 72، 108 زوج) من الجوارب القطنية الفائقة الراحة.
                انسى هم شراء الجوارب لشهور طويلة وبأقل سعر للزوج الواحد.
              </p>
              
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-center gap-3 text-sm text-gray-700 font-bold">
                  <CheckCircle2 className="w-5 h-5 text-primary" /> سعر مغري بأقل من 3 ر.س للزوج
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-700 font-bold">
                  <CheckCircle2 className="w-5 h-5 text-primary" /> 80% قطن طبيعي لتهوية مثالية
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-700 font-bold">
                  <CheckCircle2 className="w-5 h-5 text-primary" /> ألوان أساسية تناسب الجميع
                </li>
              </ul>
              
              <Link
                href="/product/cotton-bundle"
                className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 transition-transform active:scale-[0.98] shadow-xl shadow-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary text-lg group-hover:scale-[1.02]"
              >
                تصفح العروض <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-2" />
              </Link>
            </div>
          </div>

        </div>
        
      </div>
    </div>
  );
}
