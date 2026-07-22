import type { Metadata, Viewport } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

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
        <script
          id="snapchat-pixel"
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
        <script
          id="meta-pixel"
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
        <script
          id="tiktok-pixel"
          dangerouslySetInnerHTML={{
            __html: `
              !function (w, d, t) {
                w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
                var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
                ;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
                ttq.load('D92DUN3C77UBI6V95NQG');
                ttq.load('D9G39AJC77UD5IE53MLG');
                ttq.page();
              }(window, document, 'ttq');
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
