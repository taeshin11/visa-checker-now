import type { Metadata } from "next";
import CountryCard from "@/components/CountryCard";
import { DESTINATION_CODES, PASSPORT_CODES, getVisaRequirement } from "@/lib/data";

interface Props {
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: "All Destination Countries — Visa Requirements | VisaCheckerNow",
  description: "Check which passports need visas for every destination. Browse visa requirements by destination country.",
};

export default async function DestinationsPage({ params }: Props) {
  const { locale } = await params;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-[#0c1a2e] mb-2">All Destination Countries</h1>
        <p className="text-gray-500">Select a destination to see which passports require visas.</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {DESTINATION_CODES.map((code) => {
          const visaFreeCount = PASSPORT_CODES.filter((p) => {
            const req = getVisaRequirement(p, code);
            return req && !req.requiresVisa && !req.visaOnArrival && !req.eVisa;
          }).length;
          return (
            <CountryCard
              key={code}
              code={code}
              href={`/${locale}/destinations/${code}`}
              subtitle={`${visaFreeCount} passports visa-free`}
              badge={`${visaFreeCount} free`}
              badgeColor="green"
            />
          );
        })}
      </div>
    </div>
  );
}
