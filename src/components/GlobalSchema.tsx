export default function GlobalSchema() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://sharraby.com/#organization",
    name: "شرّابي Sharraby",
    url: "https://sharraby.com",
    logo: {
      "@type": "ImageObject",
      "@id": "https://sharraby.com/#logo",
      url: "https://sharraby.com/logo.png",
      caption: "شرّابي Sharraby"
    },
    image: {
      "@id": "https://sharraby.com/#logo"
    },
    description: "المتجر الأول في السعودية لشراء جوارب وشرابات مريحة، قطنية، وضد الروائح. تسوق أفضل شرابات نانو الفضة وجوارب القطن المريحة الآن.",
    email: "contact@sharraby.com",
    telephone: "+966531002083",
    address: {
      "@type": "PostalAddress",
      addressLocality: "الرياض",
      addressRegion: "الرياض",
      addressCountry: "SA"
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+966531002083",
      contactType: "customer service",
      areaServed: "SA",
      availableLanguage: ["Arabic", "English"],
      email: "contact@sharraby.com"
    },
    sameAs: [
      "https://www.instagram.com/sharraby.sa",
      "https://www.tiktok.com/@sharraby"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://sharraby.com/#website",
    url: "https://sharraby.com",
    name: "شرّابي Sharraby",
    description: "المتجر الأول في السعودية لشراء جوارب وشرابات مريحة، قطنية، وضد الروائح.",
    publisher: {
      "@id": "https://sharraby.com/#organization"
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://sharraby.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    inLanguage: "ar-SA"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [organizationSchema, websiteSchema]
        })
      }}
    />
  );
}
