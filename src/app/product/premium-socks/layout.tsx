import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "جوارب نانو الفضة - شرابات ضد الروائح للرجال | شرّابي",
  description: "اطلب الآن باقة جوارب نانو الفضة الأصلية المضادة للروائح والبكتيريا. شرابات قطنية فاخرة للرجال تمنع التعرق وتوفر راحة تدوم طوال اليوم في السعودية.",
  alternates: {
    canonical: "/product/premium-socks",
  },
  openGraph: {
    title: "جوارب نانو الفضة - شرابات ضد الروائح للرجال | شرّابي",
    description: "شرابات جوارب قطنية فاخرة بتقنية نانو الفضة المضادة للبكتيريا والتعرق.",
    url: "https://sharraby.com/product/premium-socks",
    images: [{ url: "/nano-black.jpeg" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: "جوارب نانو الفضة المضادة للروائح",
    image: "https://sharraby.com/nano-black.jpeg",
    description: "باقة 10 أزواج من شرابات وجوارب نانو الفضة الفاخرة للرجال، مصنوعة من القطن وتمنع البكتيريا والتعرق.",
    brand: {
      "@type": "Brand",
      name: "شرّابي",
    },
    offers: {
      "@type": "AggregateOffer",
      url: "https://sharraby.me/product/premium-socks",
      priceCurrency: "SAR",
      lowPrice: "99",
      highPrice: "249",
      offerCount: "3",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "128",
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
        name: "جوارب نانو الفضة",
        item: "https://sharraby.me/product/premium-socks",
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
