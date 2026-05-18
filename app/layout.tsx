import type { Metadata } from "next";
import { Abhaya_Libre, Lora } from "next/font/google";
import "./globals.css";

const lora = Lora({
  variable: "--font-sans",
  subsets: ["latin"],
});

const abhaya = Abhaya_Libre({
  variable: "--font-display",
  weight: ["800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.vlpl.co.in"),
  title: "Veesha Wellness | Your Trusted Neighborhood Pharmacy",
  description: "Experience premium healthcare and wellness services at Veesha Wellness. High-quality medicines, healthcare products, and expert consultations.",
  keywords: ["Pharmacy", "Veesha Wellness", "Healthcare", "Medicines", "Wellness", "Medical Products", "Neighborhood Pharmacy"],
  openGraph: {
    title: "Veesha Wellness | Your Trusted Neighborhood Pharmacy",
    description: "Experience premium healthcare and wellness services at Veesha Wellness. High-quality medicines, healthcare products, and expert consultations.",
    url: "https://www.vlpl.co.in",
    siteName: "Veesha Wellness",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/logo.svg",
        width: 1200,
        height: 630,
        alt: "Veesha Wellness Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Veesha Wellness",
    description: "Experience premium healthcare and wellness services at Veesha Wellness.",
    images: ["/logo.svg"],
  },
  icons: {
    icon: [
      { url: "/feviicons/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/feviicons/favicon.svg", type: "image/svg+xml" },
      { url: "/feviicons/favicon.ico" },
    ],
    apple: [
      { url: "/feviicons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/feviicons/site.webmanifest",
};

import { PageTransitionProvider, PageTransitionOverlay } from "@/components/page-transition";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${lora.variable} ${abhaya.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <PageTransitionProvider>
          <PageTransitionOverlay />
          {children}
        </PageTransitionProvider>
      </body>
    </html>
  );
}
