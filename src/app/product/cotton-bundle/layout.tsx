import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "بكج التوفير 36 زوج - شرابات قطن مريحة | شرّابي",
  description: "وفر أكثر مع بكج 36 زوج من شرابات القطن الفاخرة للرجال. جوارب قطنية مريحة للاستخدام اليومي بألوان متعددة. اطلب الآن مع التوصيل داخل السعودية.",
  alternates: {
    canonical: "/product/cotton-bundle",
  },
  openGraph: {
    title: "بكج التوفير 36 زوج - شرابات قطن مريحة | شرّابي",
    description: "باقة توفير تتضمن 36 زوج من الجوارب القطنية الفاخرة للرجال.",
    url: "https://sharraby.com/product/cotton-bundle",
    images: [{ url: "/joss.png" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: "بكج التوفير 36 زوج جوارب قطن",
    image: "https://sharraby.com/joss.png",
    description: "باقة 36 زوج من شرابات وجوارب القطن المريحة والفاخرة بألوان متعددة (أسود، أبيض، مكس).",
    brand: {
      "@type": "Brand",
      name: "شرّابي",
    },
    offers: {
      "@type": "Offer",
      url: "https://sharraby.me/product/cotton-bundle",
      priceCurrency: "SAR",
      price: "99",
      priceValidUntil: "2027-12-31",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "85",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "الرئيسية",
        item: "https://sharraby.me/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "بكج جوارب القطن",
        item: "https://sharraby.me/product/cotton-bundle",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
