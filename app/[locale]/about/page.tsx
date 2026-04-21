import type { Metadata } from "next";

interface Props {
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: "About VisaCheckerNow — Free Visa Requirement Checker for 195+ Countries",
  description:
    "VisaCheckerNow is a free tool to check visa requirements for 195+ countries based on your passport. Find out if you need a visa, visa-on-arrival, or e-visa — instantly.",
};

export default async function AboutPage({ params }: Props) {
  await params;

  return (
    <div className="max-w-3xl mx-auto px-4 py-14">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 rounded-full px-4 py-2 text-sm mb-4">
          <span>✈️</span>
          <span>About Us</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#0c1a2e] mb-4">
          About VisaCheckerNow
        </h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">
          The free, fast, and reliable way to check visa requirements for any
          passport and destination in the world.
        </p>
      </div>

      {/* Mission */}
      <div className="card mb-8">
        <h2 className="text-xl font-bold text-[#0c1a2e] mb-3">Our Mission</h2>
        <p className="text-gray-600 leading-relaxed">
          VisaCheckerNow was built with one goal: make travel planning simpler.
          Navigating visa requirements across 195+ countries is complex and
          time-consuming. We centralize that information so travelers can
          instantly know whether they need a visa, can get one on arrival, or
          qualify for an e-visa — all without wading through multiple embassy
          websites.
        </p>
      </div>

      {/* What we cover */}
      <div className="card mb-8">
        <h2 className="text-xl font-bold text-[#0c1a2e] mb-4">What We Cover</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: "🌍",
              title: "195+ Countries",
              desc: "Comprehensive destination coverage including every UN-recognised nation.",
            },
            {
              icon: "🛂",
              title: "Visa Types",
              desc: "Visa-free, visa-on-arrival, e-visa, and traditional visa categories clearly explained.",
            },
            {
              icon: "📋",
              title: "Passport Coverage",
              desc: "Requirements for passports from the most-travelled nations worldwide.",
            },
          ].map((item) => (
            <div key={item.title} className="bg-blue-50 rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">{item.icon}</div>
              <p className="font-semibold text-[#0c1a2e] mb-1">{item.title}</p>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Data sources */}
      <div className="card mb-8">
        <h2 className="text-xl font-bold text-[#0c1a2e] mb-3">Our Data Sources</h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          We compile visa requirement data from authoritative and frequently
          updated sources:
        </p>
        <ul className="space-y-2 text-gray-600">
          {[
            "Official embassy and consulate websites",
            "IATA Travel Centre (the airline industry's visa data standard)",
            "Government foreign affairs and travel advisory portals",
            "Timatic — the IATA travel information database used by airlines",
          ].map((src) => (
            <li key={src} className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">✓</span>
              <span>{src}</span>
            </li>
          ))}
        </ul>
        <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3 mt-4">
          Visa requirements change frequently. Always verify the latest
          requirements with the official embassy or consulate of your destination
          country before you travel.
        </p>
      </div>

      {/* Free to use */}
      <div className="card mb-8">
        <h2 className="text-xl font-bold text-[#0c1a2e] mb-3">Free to Use — Always</h2>
        <p className="text-gray-600 leading-relaxed">
          VisaCheckerNow is completely free. No account, no subscription, and no
          sign-up required. We believe access to clear travel information should
          be available to every traveler, regardless of budget.
        </p>
      </div>

      {/* Multilingual */}
      <div className="card">
        <h2 className="text-xl font-bold text-[#0c1a2e] mb-3">Available in 8 Languages</h2>
        <p className="text-gray-600 leading-relaxed mb-3">
          VisaCheckerNow is available in English, Spanish, French, German,
          Japanese, Korean, Portuguese, and Chinese so travelers worldwide can
          access information in their preferred language.
        </p>
        <div className="flex flex-wrap gap-2 text-sm">
          {["English", "Español", "Français", "Deutsch", "日本語", "한국어", "Português", "中文"].map(
            (lang) => (
              <span
                key={lang}
                className="bg-blue-100 text-blue-700 rounded-full px-3 py-1"
              >
                {lang}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
}
