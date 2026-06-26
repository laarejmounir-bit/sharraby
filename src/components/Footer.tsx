"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8 mt-auto">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          <div className="md:col-span-1">
            <Link
              href="/"
              aria-label="الصفحة الرئيسية لشرّابي"
              className="mb-4 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md w-max"
            >
              <img src="/logo.png" alt="شرّابي" className="h-16 md:h-20 object-contain" />
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              اول براند سعودي متخصص في الجوارب، راحة تدوم طوال اليوم، مع خامات
              قطنية تمتص العرق وتسمح بالتهوية.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-gray-900">روابط سريعة</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li>
                <Link
                  href="/"
                  className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
                >
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link
                  href="/product/premium-socks"
                  className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
                >
                  تسوق الآن
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
                >
                  من نحن
                </Link>
              </li>
              <li>
                <Link
                  href="/#faq"
                  className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
                >
                  الأسئلة الشائعة
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-gray-900">السياسات</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li>
                <Link
                  href="/shipping-policy"
                  className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
                >
                  سياسة الشحن
                </Link>
              </li>
              <li>
                <Link
                  href="/return-policy"
                  className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
                >
                  سياسة الاسترجاع
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
                >
                  سياسة الخصوصية
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
                >
                  الشروط والأحكام
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-gray-900">تواصل معنا</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li className="dir-ltr text-right">contact@sharraby.com</li>
              <li className="dir-ltr text-right">
                <a 
                  href="https://wa.me/966531002083" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm inline-block"
                >
                  +966 53 100 2083
                </a>
              </li>
              <li>الرياض، المملكة العربية السعودية</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} شرّابي. جميع الحقوق محفوظة.</p>
          <div className="flex bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 font-medium">
            صنع بكل فخر في السعودية 🇸🇦
          </div>
        </div>
      </div>
    </footer>
  );
}
