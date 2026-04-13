"use client";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Navbar() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";

  const links = [
    { href: `/${locale}`, label: "Home" },
    { href: `/${locale}/passports`, label: "Passports" },
    { href: `/${locale}/destinations`, label: "Destinations" },
    { href: `/${locale}/rankings`, label: "Rankings" },
    { href: `/${locale}/guide/tourist`, label: "Guides" },
  ];

  return (
    <nav className="bg-white border-b border-blue-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href={`/${locale}`} className="flex items-center gap-2 font-bold text-xl text-[#2563eb]">
          <span>✈️</span>
          <span>VisaCheckerNow</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-[#0c1a2e] hover:text-[#2563eb] transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>
        <div className="md:hidden">
          <details className="relative">
            <summary className="cursor-pointer p-2 text-[#0c1a2e]">☰</summary>
            <div className="absolute right-0 top-full bg-white border border-blue-100 rounded-lg shadow-lg p-4 flex flex-col gap-3 min-w-[160px]">
              {links.map((l) => (
                <Link key={l.href} href={l.href} className="text-sm text-[#0c1a2e] hover:text-[#2563eb]">
                  {l.label}
                </Link>
              ))}
            </div>
          </details>
        </div>
      </div>
    </nav>
  );
}
