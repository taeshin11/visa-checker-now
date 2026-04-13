import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ locale: string; type: string }>;
}

const guides = {
  tourist: {
    title: "Tourist Visa Guide 2025",
    icon: "🏖️",
    description: "Everything you need to know about tourist visas — types, requirements, and how to apply.",
    sections: [
      {
        heading: "What is a Tourist Visa?",
        content: "A tourist visa (also called a visitor visa or B-2 visa in the US) is a document that allows you to enter a foreign country for leisure, tourism, or visiting friends and family. It does not permit you to work or study.",
      },
      {
        heading: "Types of Entry",
        content: "Visa-Free: No visa needed. You enter with just your passport.\nVisa on Arrival: You obtain a visa stamp at the border/airport upon arrival.\neVisa: Apply online before travel and receive an electronic authorization.\nEmb assy Visa: Apply in person or by post at the destination country's embassy or consulate.",
      },
      {
        heading: "Common Requirements",
        content: "Valid passport (usually 6 months beyond travel dates)\nReturn/onward flight ticket\nProof of accommodation\nSufficient funds (bank statement)\nTravel insurance (required by some countries)\nCompleted application form\nPassport photos",
      },
      {
        heading: "Schengen Area Tips",
        content: "The Schengen Area covers 27 European countries. With a single Schengen visa, you can travel freely within the zone. The standard tourist allowance is 90 days within any 180-day period. Apply at the embassy of your primary destination country.",
      },
      {
        heading: "Popular Tourist Destinations by Visa Type",
        content: "Visa-Free (Western Passports): Japan, Thailand (60 days), most of Europe, USA (ESTA), UK (ETA)\nVisa on Arrival: Indonesia (30 days, $35), Egypt ($25), Kenya ($50 eVisa)\nEmbassy Visa: India (eVisa available), China, Russia",
      },
    ],
  },
  business: {
    title: "Business Visa Guide 2025",
    icon: "💼",
    description: "How to obtain a business visa for meetings, conferences, and commercial activities abroad.",
    sections: [
      {
        heading: "What is a Business Visa?",
        content: "A business visa (B-1 visa in the US) allows you to enter a country for business purposes: attending meetings, conferences, signing contracts, or training. It does not allow you to receive a salary from a local company.",
      },
      {
        heading: "Key Requirements",
        content: "Invitation letter from the hosting company\nProof of business registration\nBank statements showing sufficient funds\nReturn ticket and accommodation bookings\nDetailed business itinerary\nEmployment letter from your company",
      },
      {
        heading: "Processing Times",
        content: "Business visas often have faster processing tracks. Many countries offer express processing for an additional fee. Apply at least 4-6 weeks before your trip for non-eVisa countries.",
      },
    ],
  },
  student: {
    title: "Student Visa Guide 2025",
    icon: "🎓",
    description: "Guide to obtaining a student visa for academic study abroad.",
    sections: [
      {
        heading: "What is a Student Visa?",
        content: "A student visa allows you to reside in a foreign country for the purpose of pursuing academic studies at an accredited institution. They are typically valid for the duration of your course plus a grace period.",
      },
      {
        heading: "Requirements",
        content: "Acceptance letter from an accredited institution\nProof of tuition payment or scholarship\nLanguage proficiency scores (IELTS/TOEFL for English-speaking countries)\nFinancial proof for living expenses\nHealth insurance\nBackground check (some countries)",
      },
      {
        heading: "Popular Study Destinations",
        content: "UK: Tier 4 Student Visa\nUSA: F-1 Student Visa\nAustralia: Subclass 500\nCanada: Study Permit\nGermany: Student Visa (visa-free application for EU students)\nJapan: College Student Visa",
      },
    ],
  },
  "working-holiday": {
    title: "Working Holiday Visa Guide 2025",
    icon: "🌏",
    description: "How to work and travel abroad with a working holiday visa.",
    sections: [
      {
        heading: "What is a Working Holiday Visa?",
        content: "A working holiday visa (WHV) lets young adults (usually 18-30 or 18-35) live and work in a foreign country for 1-2 years. They are typically bilateral agreements between countries.",
      },
      {
        heading: "Age Requirements",
        content: "Most programs require applicants to be between 18-30 years old (some extend to 35). Some countries (Canada, New Zealand) offer age waivers for certain professions.",
      },
      {
        heading: "Popular Programs",
        content: "Australia WHV (Subclass 417/462): Open to many nationalities, up to 3 years\nNew Zealand WHV: 1-3 years depending on nationality\nCanada International Experience Canada (IEC): 1-2 years\nJapan WHV: 1 year, available to Australians, Canadians, and others\nUK Youth Mobility Scheme: 2 years for eligible nationalities",
      },
      {
        heading: "Tips",
        content: "Apply well in advance — spots fill up quickly\nSome programs have annual quotas (ballots)\nYou can typically only participate once per country\nWork is usually unrestricted but some require farm work for visa extension",
      },
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(guides).map((type) => ({ type }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type } = await params;
  const guide = guides[type as keyof typeof guides];
  if (!guide) return {};
  return {
    title: `${guide.title} | VisaCheckerNow`,
    description: guide.description,
  };
}

export default async function GuidePage({ params }: Props) {
  const { locale, type } = await params;
  const guide = guides[type as keyof typeof guides];

  if (!guide) notFound();

  const otherGuides = Object.entries(guides).filter(([k]) => k !== type);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href={`/${locale}`} className="hover:text-[#2563eb]">Home</Link>
        {" / "}
        <span>Visa Guides</span>
        {" / "}
        <span>{guide.title}</span>
      </nav>

      <div className="text-center mb-10">
        <div className="text-6xl mb-4">{guide.icon}</div>
        <h1 className="text-3xl font-extrabold text-[#0c1a2e] mb-2">{guide.title}</h1>
        <p className="text-gray-500">{guide.description}</p>
      </div>

      <div className="space-y-6">
        {guide.sections.map((section) => (
          <div key={section.heading} className="bg-white rounded-2xl border border-blue-100 p-6">
            <h2 className="text-lg font-bold text-[#0c1a2e] mb-3">{section.heading}</h2>
            <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
              {section.content}
            </div>
          </div>
        ))}
      </div>

      {/* Other guides */}
      <div className="mt-10">
        <h2 className="text-lg font-bold text-[#0c1a2e] mb-4">Other Visa Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {otherGuides.map(([key, g]) => (
            <Link
              key={key}
              href={`/${locale}/guide/${key}`}
              className="bg-white border border-blue-100 rounded-xl p-4 hover:border-blue-300 hover:shadow-sm transition-all text-center"
            >
              <div className="text-3xl mb-2">{g.icon}</div>
              <p className="font-medium text-[#0c1a2e] text-sm">{g.title}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 bg-[#2563eb] text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
        >
          ✈️ Check Your Visa Requirements
        </Link>
      </div>
    </div>
  );
}
