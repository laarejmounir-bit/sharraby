"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X, ArrowLeft, Search } from "lucide-react";
import { useCartStore } from "@/lib/store";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { items, toggleCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white ${isScrolled ? "shadow-sm border-b border-gray-100 py-3" : "py-5"}`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Right - Mobile Menu */}
        <button
          aria-label="القائمة الجانبية"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsMobileMenuOpen(true)}
          className="lg:hidden p-2 -mr-2 text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Right - Desktop Links */}
        <nav className="hidden lg:flex items-center gap-8 font-medium text-sm text-foreground">
          <Link
            href="/"
            className={`hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm ${pathname === "/" ? "text-primary font-bold" : ""}`}
          >
            الرئيسية
          </Link>
          <Link
            href="/products"
            className={`hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm ${pathname === "/products" ? "text-primary font-bold" : ""}`}
          >
            المنتجات
          </Link>
          <Link
            href="/#reviews"
            className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
          >
            الآراء
          </Link>
          <Link
            href="/#faq"
            className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
          >
            الأسئلة الشائعة
          </Link>
        </nav>

        {/* Center - Logo */}
        <Link
          href="/"
          aria-label="الصفحة الرئيسية لشرّابي"
          className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md px-2 py-1"
        >
          <img src="/logo.png" alt="شرّابي" className="h-12 md:h-16 object-contain" />
        </Link>

        {/* Left - Actions */}
        <div className="flex items-center gap-2 md:gap-4 ml-0">
          <button
            aria-label="البحث"
            className="p-2 -ml-2 text-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full"
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            aria-label="سلة المشتريات"
            onClick={toggleCart}
            className="p-2 relative text-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full"
          >
            <ShoppingBag className="w-5 h-5" />
            {mounted && totalItems > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="fixed inset-y-0 right-0 w-3/4 max-w-sm bg-white shadow-2xl p-6 flex flex-col"
            onClick={(e) => e.stopPropagation()}
            id="mobile-menu"
          >
            <div className="flex items-center justify-between mb-8">
              <img src="/logo.png" alt="شرّابي" className="h-12 object-contain" />
              <button
                aria-label="إغلاق القائمة"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex flex-col gap-6 text-lg font-bold">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between border-b pb-4 ${pathname === "/" ? "text-primary font-bold" : ""}`}
              >
                الرئيسية <ArrowLeft className="w-4 h-4 text-muted-foreground" />
              </Link>
              <Link
                href="/products"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between border-b pb-4 ${pathname === "/products" ? "text-primary font-bold" : ""}`}
              >
                المنتجات{" "}
                <ArrowLeft className={`w-4 h-4 ${pathname === "/products" ? "text-primary" : "text-muted-foreground"}`} />
              </Link>
              <Link
                href="/#reviews"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between border-b pb-4"
              >
                آراء العملاء{" "}
                <ArrowLeft className="w-4 h-4 text-muted-foreground" />
              </Link>
              <Link
                href="/#faq"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between border-b pb-4"
              >
                الأسئلة الشائعة{" "}
                <ArrowLeft className="w-4 h-4 text-muted-foreground" />
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
