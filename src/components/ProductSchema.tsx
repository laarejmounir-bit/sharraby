export default function ProductSchema({
  product
}: {
  product: {
    id: string;
    name: string;
    image: string[];
    description: string;
    brand: string;
    sku: string;
    price: number;
    originalPrice?: number;
    currency: string;
    availability: string;
    ratingValue?: number;
    reviewCount?: number;
    reviews?: {
      author: string;
      datePublished: string;
      reviewBody: string;
      reviewRating: number;
    }[];
  };
}) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": product.image,
    "description": product.description,
    "sku": product.sku,
    "brand": {
      "@type": "Brand",
      "name": product.brand
    },
    "offers": {
      "@type": "Offer",
      "url": "https://sharraby.com/product/" + product.id,
      "priceCurrency": product.currency,
      "price": product.price,
      "itemCondition": "https://schema.org/NewCondition",
      "availability": product.availability,
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": "0",
          "currency": "SAR"
        },
        "shippingDestination": {
          "@type": "DefinedRegion",
          "addressCountry": "SA"
        },
        "deliveryTime": {
          "@type": "ShippingDeliveryTime",
          "handlingTime": {
            "@type": "QuantitativeValue",
            "minValue": 0,
            "maxValue": 1,
            "unitCode": "d"
          },
          "transitTime": {
            "@type": "QuantitativeValue",
            "minValue": 1,
            "maxValue": 3,
            "unitCode": "d"
          }
        }
      },
      "hasMerchantReturnPolicy": {
        "@type": "MerchantReturnPolicy",
        "applicableCountry": "SA",
        "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
        "merchantReturnDays": 14,
        "returnMethod": "https://schema.org/ReturnByMail",
        "returnFees": "https://schema.org/FreeReturn"
      }
    }
  };

  if (product.ratingValue && product.reviewCount) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      "ratingValue": product.ratingValue,
      "reviewCount": product.reviewCount
    };
  }

  if (product.reviews && product.reviews.length > 0) {
    schema.review = product.reviews.map(r => ({
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": r.reviewRating
      },
      "author": {
        "@type": "Person",
        "name": r.author
      },
      "reviewBody": r.reviewBody,
      "datePublished": r.datePublished
    }));
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
