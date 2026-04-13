import type { Metadata } from "next";
import Link from "next/link";
import {
  PASSPORT_CODES, DESTINATION_CODES, ALL_COUNTRY_NAMES, COUNTRY_FLAGS,
  getVisaRequirement, getVisaStatusLabel, getVisaStatusColor, getVisaFreeCount
} from "@/lib/data";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ locale: string; code: string }>;
}

export async function generateStaticParams() {
  return PASSPORT_CODES.map((code) => ({ code }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;
  const name = ALL_COUNTRY_NAMES[code] || code;
  return {
    title: `${name} Passport Visa Requirements 2025 | VisaCheckerNow`,
    description: `Check where ${name} passport holders can travel visa-free. Complete list of visa requirements for ${name} passport.`,
  };
}

const statusColors: Record<string, string> = {
  green: "bg-green-100 text-green-800 border-green-200",
  yellow: "bg-yellow-100 text-yellow-800 border-yellow-200",
  blue: "bg-blue-100 text-blue-800 border-blue-200",
  red: "bg-red-100 text-red-800 border-red-200",
};

export default async function PassportDetailPage({ params }: Props) {
  const { locale, code } = await params;
  const upCode = code.toUpperCase();

  if (!PASSPORT_CODES.includes(upCode)) notFound();

  const name = ALL_COUNTRY_NAMES[upCode] || upCode;
  const flag = COUNTRY_FLAGS[upCode] || "🌍";
  const visaFreeCount = getVisaFreeCount(upCode);

  const entries = DESTINATION_CODES.map((dest) => ({
    dest,
    req: getVisaRequirement(upCode, dest),
  })).filter((e) => e.req !== null);

  const visaFree = entries.filter((e) => e.req && !e.req.requiresVisa && !e.req.visaOnArrival && !e.req.eVisa);
  const voaEntries = entries.filter((e) => e.req?.visaOnArrival);
  const evisaEntries = entries.filter((e) => e.req?.eVisa && e.req?.requiresVisa);
  const required = entries.filter((e) => e.req?.requiresVisa && !e.req?.visaOnArrival && !e.req?.eVisa);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href={`/${locale}`} className="hover:text-[#2563eb]">Home</Link>
        {" / "}
        <Link href={`/${locale}/passports`} className="hover:text-[#2563eb]">Passports</Link>
        {" / "}
        <span>{name}</span>
      </nav>

      {/* Header */}
      <div className="bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] text-white rounded-2xl p-8 mb-8">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-6xl">{flag}</span>
          <div>
            <h1 className="text-3xl font-extrabold">{name} Passport</h1>
            <p className="text-blue-200">Visa Requirements 2025</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/10 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold">{visaFree.length}</p>
            <p className="text-xs text-blue-200">Visa Free</p>
          </div>
          <div className="bg-white/10 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold">{voaEntries.length}</p>
            <p className="text-xs text-blue-200">Visa on Arrival</p>
          </div>
          <div className="bg-white/10 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold">{evisaEntries.length}</p>
            <p className="text-xs text-blue-200">eVisa</p>
          </div>
          <div className="bg-white/10 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold">{required.length}</p>
            <p className="text-xs text-blue-200">Visa Required</p>
          </div>
        </div>
      </div>

      {/* All destinations table */}
      <h2 className="text-xl font-bold text-[#0c1a2e] mb-4">All Destinations</h2>
      <div className="overflow-x-auto rounded-2xl border border-blue-100">
        <table className="w-full bg-white">
          <thead>
            <tr className="bg-[#eff6ff] border-b border-blue-100">
              <th className="text-left px-4 py-3 text-sm font-semibold text-[#0c1a2e]">Destination</th>
              <th className="text-center px-4 py-3 text-sm font-semibold text-[#0c1a2e]">Status</th>
              <th className="text-center px-4 py-3 text-sm font-semibold text-[#0c1a2e]">Stay</th>
              <th className="text-center px-4 py-3 text-sm font-semibold text-[#0c1a2e]">Fee</th>
              <th className="text-center px-4 py-3 text-sm font-semibold text-[#0c1a2e]"></th>
            </tr>
          </thead>
          <tbody>
            {entries.map(({ dest, req }) => {
              if (!req) return null;
              const status = getVisaStatusLabel(req);
              const color = getVisaStatusColor(req);
              return (
                <tr key={dest} className="border-b border-blue-50 hover:bg-blue-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span>{COUNTRY_FLAGS[dest] || "🌍"}</span>
                      <span className="font-medium text-[#0c1a2e]">{ALL_COUNTRY_NAMES[dest] || dest}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full border ${statusColors[color]}`}>
                      {status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-gray-600">
                    {req.stayDays > 0 ? `${req.stayDays}d` : "—"}
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-gray-600">
                    {req.fee > 0 ? `$${req.fee}` : "Free"}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Link
                      href={`/${locale}/check/${upCode}/${dest}`}
                      className="text-xs text-[#2563eb] hover:underline"
                    >
                      Details →
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
