import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  PASSPORT_CODES, DESTINATION_CODES, ALL_COUNTRY_NAMES, COUNTRY_FLAGS,
  getVisaRequirement, getVisaStatusLabel, getVisaStatusColor
} from "@/lib/data";

interface Props {
  params: Promise<{ locale: string; passport: string; destination: string }>;
}

export async function generateStaticParams() {
  const params: { passport: string; destination: string }[] = [];
  for (const passport of PASSPORT_CODES) {
    for (const destination of DESTINATION_CODES) {
      params.push({ passport, destination });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { passport, destination } = await params;
  const p = passport.toUpperCase();
  const d = destination.toUpperCase();
  const pName = ALL_COUNTRY_NAMES[p] || p;
  const dName = ALL_COUNTRY_NAMES[d] || d;
  return {
    title: `${pName} Passport → ${dName} Visa Requirements 2025 | VisaCheckerNow`,
    description: `Do ${pName} passport holders need a visa for ${dName}? Check stay duration, fees, processing time, and how to apply.`,
    keywords: `${pName} passport ${dName} visa, ${pName} ${dName} visa requirements, do ${pName} citizens need visa for ${dName}`,
  };
}

const colorConfig = {
  green: { bg: "from-green-500 to-emerald-600", badge: "bg-green-100 text-green-800", icon: "✅" },
  yellow: { bg: "from-yellow-400 to-orange-500", badge: "bg-yellow-100 text-yellow-800", icon: "🟡" },
  blue: { bg: "from-blue-500 to-indigo-600", badge: "bg-blue-100 text-blue-800", icon: "💻" },
  red: { bg: "from-red-500 to-rose-600", badge: "bg-red-100 text-red-800", icon: "🔴" },
};

export default async function CheckPage({ params }: Props) {
  const { locale, passport, destination } = await params;
  const pCode = passport.toUpperCase();
  const dCode = destination.toUpperCase();

  if (!PASSPORT_CODES.includes(pCode) || !DESTINATION_CODES.includes(dCode)) notFound();

  const req = getVisaRequirement(pCode, dCode);
  if (!req) notFound();

  const pName = ALL_COUNTRY_NAMES[pCode] || pCode;
  const dName = ALL_COUNTRY_NAMES[dCode] || dCode;
  const pFlag = COUNTRY_FLAGS[pCode] || "🌍";
  const dFlag = COUNTRY_FLAGS[dCode] || "🌍";
  const status = getVisaStatusLabel(req);
  const color = getVisaStatusColor(req) as keyof typeof colorConfig;
  const cfg = colorConfig[color];

  // Related checks
  const relatedPassports = PASSPORT_CODES.filter(p => p !== pCode).slice(0, 6);
  const relatedDests = DESTINATION_CODES.filter(d => d !== dCode).slice(0, 6);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": `Do ${pName} passport holders need a visa for ${dName}?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": `${pName} passport holders ${req.requiresVisa && !req.visaOnArrival && !req.eVisa ? "require a visa" : "can enter without a pre-arranged visa"} for ${dName}. ${req.notes}`,
                },
              },
            ],
          }),
        }}
      />

      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href={`/${locale}`} className="hover:text-[#2563eb]">Home</Link>
        {" / "}
        <Link href={`/${locale}/passports/${pCode}`} className="hover:text-[#2563eb]">{pName} Passport</Link>
        {" / "}
        <span>→ {dName}</span>
      </nav>

      {/* Hero result card */}
      <div className={`bg-gradient-to-br ${cfg.bg} text-white rounded-2xl p-8 mb-8`}>
        <div className="flex items-center gap-3 mb-6">
          <div className="text-center">
            <span className="text-5xl">{pFlag}</span>
            <p className="text-xs text-white/70 mt-1">{pName}</p>
          </div>
          <div className="flex-1 text-center text-3xl">→</div>
          <div className="text-center">
            <span className="text-5xl">{dFlag}</span>
            <p className="text-xs text-white/70 mt-1">{dName}</p>
          </div>
        </div>

        <div className="text-center">
          <div className="text-6xl mb-3">{cfg.icon}</div>
          <h1 className="text-2xl md:text-3xl font-extrabold mb-2">{status}</h1>
          <p className="text-white/80 text-sm max-w-md mx-auto">
            {pName} passport holders travelling to {dName}
          </p>
        </div>
      </div>

      {/* Details grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Stay Duration", value: req.stayDays > 0 ? `${req.stayDays} days` : "Varies" },
          { label: "Processing Time", value: req.processingDays > 0 ? `${req.processingDays} days` : "Instant" },
          { label: "Visa Fee", value: req.fee > 0 ? `$${req.fee} USD` : "Free" },
          { label: "eVisa Available", value: req.eVisa ? "Yes" : "No" },
        ].map((item) => (
          <div key={item.label} className="bg-white rounded-xl border border-blue-100 p-4 text-center">
            <p className="text-xs text-gray-500 mb-1">{item.label}</p>
            <p className="font-bold text-[#0c1a2e] text-lg">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Notes */}
      {req.notes && (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
          <h2 className="font-bold text-[#0c1a2e] mb-2">📌 Important Information</h2>
          <p className="text-gray-700">{req.notes}</p>
        </div>
      )}

      {/* Visa application info */}
      {(req.requiresVisa || req.eVisa) && (
        <div className="bg-white border border-blue-100 rounded-2xl p-6 mb-8">
          <h2 className="font-bold text-[#0c1a2e] mb-4">How to Apply</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 text-sm">
            <li>Check the official {dName} embassy website for current requirements</li>
            <li>Gather required documents (passport, photos, bank statements, travel itinerary)</li>
            {req.eVisa && <li>Apply online through the official eVisa portal</li>}
            <li>Pay the visa fee of {req.fee > 0 ? `$${req.fee}` : "no charge"}</li>
            {req.processingDays > 0 && <li>Allow {req.processingDays} business days for processing</li>}
            <li>Receive your visa and keep copies when travelling</li>
          </ol>
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-xl text-xs text-yellow-800">
            ⚠️ Always verify requirements at the official embassy website before travel. Requirements change.
          </div>
        </div>
      )}

      {/* Related: same passport, other destinations */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-[#0c1a2e] mb-4">
          More {pName} Passport Checks
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {relatedDests.map((d) => {
            const r = getVisaRequirement(pCode, d);
            const s = r ? getVisaStatusLabel(r) : "Unknown";
            const c = r ? getVisaStatusColor(r) : "blue";
            const badgeClass = { green: "bg-green-100 text-green-700", yellow: "bg-yellow-100 text-yellow-700", blue: "bg-blue-100 text-blue-700", red: "bg-red-100 text-red-700" }[c as string] || "bg-gray-100 text-gray-700";
            return (
              <Link
                key={d}
                href={`/${locale}/check/${pCode}/${d}`}
                className="bg-white border border-blue-100 rounded-xl p-3 hover:border-blue-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span>{COUNTRY_FLAGS[d]}</span>
                  <span className="font-medium text-sm text-[#0c1a2e]">{ALL_COUNTRY_NAMES[d]}</span>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${badgeClass}`}>{s}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Related: same destination, other passports */}
      <div>
        <h2 className="text-lg font-bold text-[#0c1a2e] mb-4">
          Other Passports → {dName}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {relatedPassports.map((p) => {
            const r = getVisaRequirement(p, dCode);
            const s = r ? getVisaStatusLabel(r) : "Unknown";
            const c = r ? getVisaStatusColor(r) : "blue";
            const badgeClass = { green: "bg-green-100 text-green-700", yellow: "bg-yellow-100 text-yellow-700", blue: "bg-blue-100 text-blue-700", red: "bg-red-100 text-red-700" }[c as string] || "bg-gray-100 text-gray-700";
            return (
              <Link
                key={p}
                href={`/${locale}/check/${p}/${dCode}`}
                className="bg-white border border-blue-100 rounded-xl p-3 hover:border-blue-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span>{COUNTRY_FLAGS[p]}</span>
                  <span className="font-medium text-sm text-[#0c1a2e]">{ALL_COUNTRY_NAMES[p]}</span>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${badgeClass}`}>{s}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
