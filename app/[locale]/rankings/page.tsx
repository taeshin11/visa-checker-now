import type { Metadata } from "next";
import RankingTable from "@/components/RankingTable";
import { getPassportRankings } from "@/lib/data";

interface Props {
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: "Passport Power Index 2025 — Henley Passport Ranking | VisaCheckerNow",
  description: "The most powerful passports in 2025 ranked by visa-free access. See which passport gives the most travel freedom.",
};

export default async function RankingsPage({ params }: Props) {
  const { locale } = await params;
  const rankings = getPassportRankings();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 rounded-full px-4 py-2 text-sm mb-4">
          <span>🏆</span>
          <span>Henley Passport Index 2025</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#0c1a2e] mb-3">
          Passport Power Index 2025
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Rankings based on the number of countries accessible without a prior visa.
          Data sourced from the Henley Passport Index.
        </p>
      </div>

      {/* Top 3 podium */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {rankings.slice(0, 3).map((r, i) => {
          const medals = ["🥇", "🥈", "🥉"];
          return (
            <div key={r.code} className={`bg-white rounded-2xl border-2 p-6 text-center ${i === 0 ? "border-yellow-300 shadow-lg" : "border-blue-100"}`}>
              <div className="text-4xl mb-2">{medals[i]}</div>
              <div className="text-4xl mb-2">{r.code === "JP" ? "🇯🇵" : r.code === "SG" ? "🇸🇬" : r.code === "DE" ? "🇩🇪" : "🌍"}</div>
              <p className="font-bold text-[#0c1a2e]">{r.name}</p>
              <p className="text-[#2563eb] font-extrabold text-xl">{r.visaFreeCount}</p>
              <p className="text-xs text-gray-400">countries</p>
            </div>
          );
        })}
      </div>

      <RankingTable rankings={rankings} locale={locale} />

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6 text-sm text-gray-600">
        <p className="font-semibold text-[#0c1a2e] mb-2">About the Passport Index</p>
        <p>The Henley Passport Index ranks passports by the number of destinations their holders can access without a prior visa. Rankings are updated quarterly based on data from the International Air Transport Association (IATA).</p>
      </div>
    </div>
  );
}
