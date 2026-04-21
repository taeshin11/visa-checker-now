import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const BASE_URL = "https://visa-checker-now.vercel.app";
const LOCALES = ["en", "es", "fr", "de", "ja", "ko", "pt", "zh"];

export const metadata: Metadata = {
  verification: {
    google: "WddgcbVJsL2BGHNAje5m6DK56IcR0Mw5UOqozI2Xtrc",
  },
  title: "Visa Requirements Checker by Country & Passport | VisaCheckerNow",
  description:
    "Check visa requirements for any country based on your passport. Find visa-free, visa-on-arrival, and e-visa options for 195+ countries.",
  keywords: [
    "visa requirements",
    "do I need a visa",
    "visa checker",
    "passport visa requirements",
    "visa free countries",
    "e-visa",
    "visa on arrival",
    "Schengen visa",
  ],
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: BASE_URL,
    languages: Object.fromEntries(
      LOCALES.map((locale) => [locale, `${BASE_URL}/${locale}`])
    ),
  },
  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "VisaCheckerNow",
    title: "Visa Requirements Checker by Country & Passport | VisaCheckerNow",
    description:
      "Check visa requirements for any country based on your passport. Find visa-free, visa-on-arrival, and e-visa options for 195+ countries.",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "VisaCheckerNow — Visa Requirements Checker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@visacheckernow",
    title: "Visa Requirements Checker by Country & Passport | VisaCheckerNow",
    description:
      "Check visa requirements for any country based on your passport. Find visa-free, visa-on-arrival, and e-visa options for 195+ countries.",
    images: [`${BASE_URL}/og-image.png`],
  },
  other: {
    "google-adsense-account": "ca-pub-7098271335538021",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
