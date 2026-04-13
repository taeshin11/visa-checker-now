import Link from "next/link";
import { PassportRanking, COUNTRY_FLAGS } from "@/lib/data";

interface Props {
  rankings: PassportRanking[];
  locale: string;
}

export default function RankingTable({ rankings, locale }: Props) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-blue-100">
      <table className="w-full bg-white">
        <thead>
          <tr className="bg-[#eff6ff] border-b border-blue-100">
            <th className="text-left px-4 py-3 text-sm font-semibold text-[#0c1a2e]">Rank</th>
            <th className="text-left px-4 py-3 text-sm font-semibold text-[#0c1a2e]">Country</th>
            <th className="text-right px-4 py-3 text-sm font-semibold text-[#0c1a2e]">Visa-Free Access</th>
            <th className="text-center px-4 py-3 text-sm font-semibold text-[#0c1a2e]">Power Bar</th>
          </tr>
        </thead>
        <tbody>
          {rankings.map((r, i) => (
            <tr key={r.code + i} className="border-b border-blue-50 hover:bg-blue-50 transition-colors">
              <td className="px-4 py-3">
                <span className={`font-bold text-sm ${r.rank <= 3 ? "text-[#2563eb]" : "text-gray-500"}`}>
                  #{r.rank}
                </span>
              </td>
              <td className="px-4 py-3">
                <Link
                  href={`/${locale}/passports/${r.code}`}
                  className="flex items-center gap-2 hover:text-[#2563eb] transition-colors"
                >
                  <span className="text-xl">{COUNTRY_FLAGS[r.code] || "🌍"}</span>
                  <span className="font-medium text-[#0c1a2e]">{r.name}</span>
                </Link>
              </td>
              <td className="px-4 py-3 text-right">
                <span className="font-bold text-[#2563eb]">{r.visaFreeCount}</span>
                <span className="text-gray-400 text-sm"> countries</span>
              </td>
              <td className="px-4 py-3">
                <div className="w-full bg-blue-100 rounded-full h-2">
                  <div
                    className="bg-[#2563eb] h-2 rounded-full"
                    style={{ width: `${(r.visaFreeCount / 195) * 100}%` }}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
