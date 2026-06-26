import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "جميع المنتجات - شرابات وجوارب شرّابي | Sharraby",
  description: "تسوق تشكيلة واسعة من شرابات وجوارب شرّابي. اختر باقة جوارب نانو الفضة أو بكج شرابات القطن الفاخرة للرجال. توصيل داخل السعودية.",
  alternates: {
    canonical: "/products",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "الرئيسية",
        item: "https://sharraby.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "جميع المنتجات",
        item: "https://sharraby.com/products",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
