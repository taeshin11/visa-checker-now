import type { Metadata } from "next";

interface Props {
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: "How to Use VisaCheckerNow + Visa FAQ | VisaCheckerNow",
  description:
    "Learn how to check visa requirements in seconds, and get answers to the most common travel visa questions — visa on arrival, e-visa, Schengen visa, transit visa, and more.",
};

const faqs = [
  {
    q: "How do I check visa requirements?",
    a: "Select your passport country from the homepage, then choose your destination country. VisaCheckerNow will instantly show whether you need a visa, can obtain one on arrival, or are eligible for an e-visa, along with stay duration and key requirements.",
  },
  {
    q: "What is a visa on arrival?",
    a: "A visa on arrival (VOA) is a visa issued when you arrive at your destination country's port of entry — usually an international airport. You do not need to obtain it in advance from an embassy. Requirements typically include a valid passport, proof of onward travel, accommodation details, and a fee. Always confirm current VOA availability before travel, as policies change.",
  },
  {
    q: "What is an e-visa?",
    a: "An e-visa (electronic visa) is applied for and approved entirely online before you travel. Once approved, your visa is linked to your passport electronically — there is no physical sticker. E-visas typically require a scan of your passport photo page, a photo of yourself, and payment of a fee. Processing usually takes 1–5 business days.",
  },
  {
    q: "How long does a visa take to process?",
    a: "Processing times vary significantly by country and visa type. Tourist e-visas can be approved in as little as 24 hours. Traditional embassy visas typically take 5–15 business days, though some countries require 4–8 weeks for certain nationalities. Always apply well in advance of your travel date to avoid disruptions.",
  },
  {
    q: "What is a transit visa?",
    a: "A transit visa allows you to pass through a country on your way to another destination without staying there as a tourist. Some countries require transit visas even if you never leave the airport (airside transit), while others allow visa-free transit for short layovers. Always check transit requirements for every country you pass through.",
  },
  {
    q: "Do I need a visa if I have multiple passports?",
    a: "If you hold citizenship in more than one country, you may use whichever passport gives you the best access to your destination. For example, a dual US-European citizen visiting Japan could use either passport — both allow visa-free entry. However, some countries require you to enter and exit on the same passport. Check each destination's specific rules.",
  },
  {
    q: "What countries can US citizens visit without a visa?",
    a: "US passport holders enjoy visa-free or visa-on-arrival access to approximately 186 countries and territories, including most of Europe (Schengen Area), Japan, South Korea, Mexico, Canada, Australia (ETA), Thailand (visa exemption), and much of Latin America. You can see the full list on the US Passport page on VisaCheckerNow.",
  },
  {
    q: "What is a Schengen visa?",
    a: "The Schengen visa grants access to 27 European countries that have abolished internal border controls — the Schengen Area. A single Schengen visa allows travel across all member states, including France, Germany, Italy, Spain, the Netherlands, and more. A standard tourist Schengen visa allows a maximum stay of 90 days within any 180-day period. Citizens of many countries require a Schengen visa in advance, while others are admitted visa-free.",
  },
  {
    q: "Can I extend my visa at the destination?",
    a: "Visa extensions are possible in some countries but not all, and they are rarely guaranteed. You typically need to apply for an extension before your current visa or permission to stay expires, at the local immigration authority. Some countries strictly prohibit extensions for tourist visas. Check the immigration rules of your specific destination early in your trip if you think you may need more time.",
  },
  {
    q: "What is the difference between a tourist visa and a business visa?",
    a: "A tourist visa permits leisure travel — sightseeing, holidays, and visiting friends or family. It generally prohibits any form of employment or paid work. A business visa allows you to attend meetings, conferences, and business negotiations, but typically still prohibits taking up local employment. If you plan to work or earn income in the country, you will likely need a separate work permit or work visa.",
  },
];

export default async function HowToUsePage({ params }: Props) {
  await params;

  return (
    <div className="max-w-3xl mx-auto px-4 py-14">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 rounded-full px-4 py-2 text-sm mb-4">
          <span>📖</span>
          <span>Guide & FAQ</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#0c1a2e] mb-4">
          How to Use VisaCheckerNow
        </h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">
          Check visa requirements in three steps — and find answers to the most
          common travel visa questions below.
        </p>
      </div>

      {/* Steps */}
      <div className="card mb-12">
        <h2 className="text-xl font-bold text-[#0c1a2e] mb-6">
          Check Visa Requirements in 3 Steps
        </h2>
        <ol className="space-y-5">
          {[
            {
              step: "1",
              title: "Select your passport",
              desc: "Choose the country that issued your passport from the dropdown on the homepage or the Passports page.",
            },
            {
              step: "2",
              title: "Choose your destination",
              desc: "Pick the country you plan to visit. You can search by name or browse the full destinations list.",
            },
            {
              step: "3",
              title: "Read your visa requirement",
              desc: "Instantly see whether you are visa-free, eligible for visa-on-arrival or e-visa, or need to apply in advance — along with maximum stay durations.",
            },
          ].map((item) => (
            <li key={item.step} className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#2563eb] text-white flex items-center justify-center font-bold text-sm">
                {item.step}
              </div>
              <div>
                <p className="font-semibold text-[#0c1a2e]">{item.title}</p>
                <p className="text-gray-500 text-sm mt-0.5">{item.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* FAQ */}
      <h2 className="text-2xl font-bold text-[#0c1a2e] mb-6">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq) => (
          <div key={faq.q} className="card">
            <h3 className="font-semibold text-[#0c1a2e] mb-2">{faq.q}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="mt-10 bg-amber-50 border border-amber-200 rounded-2xl p-5 text-sm text-amber-800">
        <p className="font-semibold mb-1">Important Notice</p>
        <p>
          Visa regulations change frequently and without notice. The information
          on VisaCheckerNow is for general guidance only. Always confirm current
          requirements with the official embassy or consulate of your destination
          country before booking travel.
        </p>
      </div>

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: { "@type": "Answer", text: faq.a },
            })),
          }),
        }}
      />
    </div>
  );
}
