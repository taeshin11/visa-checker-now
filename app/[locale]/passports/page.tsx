import type { Metadata } from "next";
import CountryCard from "@/components/CountryCard";
import { PASSPORT_CODES, getVisaFreeCount } from "@/lib/data";

interface Props {
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: "All Passports — Visa Requirements | VisaCheckerNow",
  description: "Browse visa requirements for all passport countries. Find out how many countries you can visit visa-free.",
};

export default async function PassportsPage({ params }: Props) {
  const { locale } = await params;

  const sorted = [...PASSPORT_CODES].sort((a, b) => getVisaFreeCount(b) - getVisaFreeCount(a));

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-[#0c1a2e] mb-2">All Passport Countries</h1>
        <p className="text-gray-500">Select a passport to see visa requirements for all destinations. Sorted by visa-free access.</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {sorted.map((code) => {
          const count = getVisaFreeCount(code);
          return (
            <CountryCard
              key={code}
              code={code}
              href={`/${locale}/passports/${code}`}
              subtitle={`${count} visa-free`}
              badge={`${count}`}
              badgeColor="blue"
            />
          );
        })}
      </div>
    </div>
  );
}
