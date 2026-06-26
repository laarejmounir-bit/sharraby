import type { Metadata, Viewport } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import Script from "next/script";
import GlobalSchema from "@/components/GlobalSchema";

const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-cairo",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const viewport: Viewport = {
  themeColor: "#059669",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://sharraby.com"),
  title: {
    default: "شرّابي | Sharraby - متجر الجوارب والشرابات الفاخرة",
    template: "%s | شرّابي Sharraby",
  },
  description: "المتجر الأول في السعودية لشراء جوارب وشرابات مريحة، قطنية، وضد الروائح. تسوق أفضل شرابات نانو الفضة وجوارب القطن المريحة الآن.",
  keywords: ["شرابات", "جوارب", "شرابات نانو الفضة", "جوارب نانو الفضة", "شرابات ضد الروائح", "جوارب ضد الروائح", "شرابات قطن", "جوارب مريحة", "السعودية"],
  authors: [{ name: "شرّابي Sharraby" }],
  creator: "شرّابي Sharraby",
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: "https://sharraby.com",
    title: "شرّابي | Sharraby - متجر الجوارب والشرابات الفاخرة",
    description: "اكتشف تشكيلتنا الواسعة من جوارب وشرابات مريحة ومانعة للتعرق. جودة عالية مصممة خصيصاً لأجواء السعودية.",
    siteName: "شرّابي | Sharraby",
    images: [
      {
        url: "/nano-black.jpeg",
        width: 1200,
        height: 630,
        alt: "شرّابي - جوارب وشرابات فاخرة",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "شرّابي | Sharraby - الجوارب والشرابات الفاخرة",
    description: "تسوق أفضل شرابات وجوارب نانو الفضة والقطن المريحة في السعودية.",
    images: ["/nano-black.jpeg"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <head>
        <GlobalSchema />
        <Script
          id="snapchat-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function()
              {a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};
              a.queue=[];var s='script';r=t.createElement(s);r.async=!0;
              r.src=n;var u=t.getElementsByTagName(s)[0];
              u.parentNode.insertBefore(r,u);})(window,document,
              'https://sc-static.net/scevent.min.js');

              snaptr('init', '4ea2a1e7-87ab-4100-9680-6e3118187f13');
              snaptr('track', 'PAGE_VIEW');
            `,
          }}
        />
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '854666832684721');
              fbq('track', 'PageView');
            `,
          }}
        />
      </head>
      <body className="antialiased bg-[#F8F9FA] text-[#1D1D1F] font-sans flex flex-col min-h-screen print:bg-white">
        <div className="print:hidden">
          <Navbar />
        </div>
        <main className="flex-1 mt-16 md:mt-20 print:mt-0 print:p-0">{children}</main>
        <div className="print:hidden">
          <CartDrawer />
          <Footer />
        </div>
      </body>
    </html>
  );
}
