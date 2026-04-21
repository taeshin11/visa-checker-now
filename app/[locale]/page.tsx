import type { Metadata } from "next";
import PassportSelector from "@/components/PassportSelector";
import CountryCard from "@/components/CountryCard";
import { PASSPORT_CODES, DESTINATION_CODES } from "@/lib/data";

import { AdsterraNativeBanner } from '@/components/ads/AdsterraNativeBanner';
import { AdsterraDisplay } from '@/components/ads/AdsterraDisplay';

interface Props {
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: "VisaCheckerNow — Check Visa Requirements for Any Passport",
  description: "Instantly check if you need a visa for your next trip. Search by passport and destination country.",
  keywords: "visa requirements, passport visa check, visa free countries, do I need a visa",
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  const popularPassports = ["US", "UK", "IN", "JP", "DE", "AU", "CA", "FR"];
  const topDests = ["TH", "JP", "UK", "US", "FR", "IT", "AE", "AU"];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "VisaCheckerNow",
            "description": "Check visa requirements for any passport and destination in seconds",
            "url": "https://visa-checker-now.vercel.app",
            "applicationCategory": "TravelApplication",
          }),
        }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/30 rounded-full px-4 py-2 text-sm mb-6">
            <span>✈️</span>
            <span>Visa Requirements for 30+ Countries</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
            Check Visa Requirements<br />for Any Passport
          </h1>
          <p className="text-blue-100 text-lg mb-10 max-w-xl mx-auto">
            Find out if you need a visa, visa on arrival, or eVisa for your next trip — instantly.
          </p>
          <PassportSelector locale={locale} />
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-white border-b border-blue-100 py-6">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-3 gap-4 text-center">
          {[
            { n: "900+", label: "Passport × Destination Pairs" },
            { n: "30", label: "Passport Countries" },
            { n: "Free", label: "No Sign-up Required" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-2xl font-extrabold text-[#2563eb]">{s.n}</p>
              <p className="text-xs text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular passports */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[#0c1a2e]">Popular Passports</h2>
          <a href={`/${locale}/passports`} className="text-sm text-[#2563eb] hover:underline">
            View all →
          </a>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {popularPassports.map((code) => (
            <CountryCard
              key={code}
              code={code}
              href={`/${locale}/passports/${code}`}
              subtitle="View visa requirements"
              badgeColor="blue"
            />
          ))}
        </div>
      </section>

      {/* Top destinations */}
      <section className="bg-[#eff6ff] py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#0c1a2e]">Top Destinations</h2>
            <a href={`/${locale}/destinations`} className="text-sm text-[#2563eb] hover:underline">
              View all →
            </a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {topDests.map((code) => (
              <CountryCard
                key={code}
                code={code}
                href={`/${locale}/destinations/${code}`}
                subtitle="Check entry requirements"
                badgeColor="green"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Quick check links */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-xl font-bold text-[#0c1a2e] mb-6">Most Searched Visa Checks</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {[
            ["US","JP"], ["IN","US"], ["UK","TH"], ["JP","US"],
            ["IN","UK"], ["CN","US"], ["AU","JP"], ["DE","JP"],
          ].map(([p, d]) => (
            <a
              key={`${p}-${d}`}
              href={`/${locale}/check/${p}/${d}`}
              className="bg-white border border-blue-100 rounded-xl p-3 hover:border-blue-300 hover:shadow-sm transition-all text-sm"
            >
              <span className="font-medium text-[#0c1a2e]">
                {p} → {d}
              </span>
              <br />
              <span className="text-xs text-gray-500">Check requirements</span>
            </a>
          ))}
        </div>
      </section>
      <AdsterraNativeBanner />
      <AdsterraDisplay />

      {/* FAQ / Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Do US passport holders need a visa for Japan?",
                "acceptedAnswer": { "@type": "Answer", "text": "No. US passport holders can visit Japan visa-free for up to 90 days." },
              },
              {
                "@type": "Question",
                "name": "Which passport has the most visa-free access?",
                "acceptedAnswer": { "@type": "Answer", "text": "The Japanese passport consistently ranks #1 with access to 193+ countries without a prior visa." },
              },
              {
                "@type": "Question",
                "name": "Can Indian passport holders visit Thailand?",
                "acceptedAnswer": { "@type": "Answer", "text": "Yes. Indian passport holders can enter Thailand with a visa on arrival for 30 days." },
              },
            ],
          }),
        }}
      />
    </>
  );
}
