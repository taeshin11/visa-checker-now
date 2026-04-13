import Link from "next/link";
import { COUNTRY_FLAGS, ALL_COUNTRY_NAMES } from "@/lib/data";

interface Props {
  code: string;
  href: string;
  subtitle?: string;
  badge?: string;
  badgeColor?: "green" | "blue" | "yellow" | "red";
}

const badgeColors = {
  green: "bg-green-100 text-green-800",
  blue: "bg-blue-100 text-blue-800",
  yellow: "bg-yellow-100 text-yellow-800",
  red: "bg-red-100 text-red-800",
};

export default function CountryCard({ code, href, subtitle, badge, badgeColor = "blue" }: Props) {
  return (
    <Link
      href={href}
      className="bg-white rounded-xl border border-blue-100 p-4 hover:border-blue-300 hover:shadow-md transition-all flex items-center gap-3"
    >
      <span className="text-3xl">{COUNTRY_FLAGS[code] || "🌍"}</span>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-[#0c1a2e] truncate">{ALL_COUNTRY_NAMES[code] || code}</p>
        {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
      {badge && (
        <span className={`text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap ${badgeColors[badgeColor]}`}>
          {badge}
        </span>
      )}
    </Link>
  );
}
