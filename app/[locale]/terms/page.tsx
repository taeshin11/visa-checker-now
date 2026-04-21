import type { Metadata } from "next";

interface Props {
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: "Terms of Use | VisaCheckerNow",
  description:
    "Terms of Use for VisaCheckerNow. Visa information is provided for reference only. Always verify entry requirements with official embassy sources before travel.",
};

const LAST_UPDATED = "April 13, 2025";

export default async function TermsPage({ params }: Props) {
  await params;

  return (
    <div className="max-w-3xl mx-auto px-4 py-14">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#0c1a2e] mb-3">
          Terms of Use
        </h1>
        <p className="text-gray-400 text-sm">Last updated: {LAST_UPDATED}</p>
      </div>

      {/* Important disclaimer banner */}
      <div className="bg-amber-50 border border-amber-300 rounded-2xl p-5 mb-10">
        <p className="font-bold text-amber-900 mb-1">Important Disclaimer</p>
        <p className="text-amber-800 text-sm leading-relaxed">
          Visa information on VisaCheckerNow is provided for general reference
          only. Visa requirements can change without notice. Always verify entry
          requirements with the official embassy or consulate of your destination
          country before you travel. We are not responsible for visa denials,
          refused entry, or any travel disruptions arising from reliance on
          information on this site.
        </p>
      </div>

      <div className="space-y-8 text-gray-600 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-[#0c1a2e] mb-3">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using VisaCheckerNow (the &ldquo;Service&rdquo;),
            you agree to be bound by these Terms of Use. If you do not agree
            with any part of these terms, you must not use the Service. These
            terms apply to all visitors, users, and others who access or use the
            Service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0c1a2e] mb-3">
            2. Nature of Information — For Reference Only
          </h2>
          <p className="mb-3">
            All visa requirement information on VisaCheckerNow is provided for
            general informational and reference purposes only. It does not
            constitute legal advice, immigration advice, or a guarantee of any
            particular outcome for any traveler.
          </p>
          <p>
            Visa policies, entry requirements, permitted stay durations, and
            related regulations are set by sovereign governments and{" "}
            <strong className="text-[#0c1a2e]">
              can change at any time without notice
            </strong>
            . The information displayed on this site may not reflect the most
            current requirements.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0c1a2e] mb-3">
            3. Verify with Official Sources
          </h2>
          <p className="mb-3">
            Before making any travel arrangements, you must independently verify
            all visa and entry requirements with the appropriate official
            authorities, including:
          </p>
          <ul className="space-y-2">
            {[
              "The official embassy or consulate of your destination country in your home country",
              "Your own government's foreign affairs or travel advisory department",
              "The airline or carrier operating your flight (for transit requirements)",
              "Your travel insurance provider (for cover conditions)",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-amber-500 mt-1 flex-shrink-0">⚠️</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0c1a2e] mb-3">
            4. No Liability for Visa Denials or Travel Disruptions
          </h2>
          <p className="mb-3">
            VisaCheckerNow expressly disclaims all liability for any visa
            denials, refused entry at borders, deportation, flight disruptions,
            financial losses, or any other consequences arising directly or
            indirectly from reliance on the information provided on this site.
          </p>
          <p>
            Travel decisions are made at your own risk. VisaCheckerNow makes no
            warranties, express or implied, as to the accuracy, completeness, or
            timeliness of visa requirement information.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0c1a2e] mb-3">
            5. Permitted Use
          </h2>
          <p>
            You may use VisaCheckerNow for personal, non-commercial travel
            research purposes. You may not reproduce, distribute, republish,
            scrape, or create derivative works from the content of this site for
            commercial purposes without our prior written consent.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0c1a2e] mb-3">
            6. Intellectual Property
          </h2>
          <p>
            All content on VisaCheckerNow, including text, design, code, and
            data compilations, is the property of VisaCheckerNow or its
            licensors and is protected by applicable intellectual property laws.
            Country flag emoji and other Unicode characters are provided by the
            Unicode Consortium and are not proprietary to VisaCheckerNow.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0c1a2e] mb-3">
            7. Third-Party Links and Services
          </h2>
          <p>
            The Service may display links to third-party websites, including
            official embassy websites and government portals. These links are
            provided for convenience only. VisaCheckerNow does not endorse and
            is not responsible for the content, accuracy, or availability of any
            third-party sites.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0c1a2e] mb-3">
            8. Limitation of Liability
          </h2>
          <p>
            To the fullest extent permitted by applicable law, VisaCheckerNow
            shall not be liable for any indirect, incidental, special,
            consequential, or punitive damages, including without limitation loss
            of profits, data, use, goodwill, or other intangible losses,
            resulting from your access to or use of (or inability to access or
            use) the Service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0c1a2e] mb-3">
            9. Changes to These Terms
          </h2>
          <p>
            We reserve the right to modify these Terms of Use at any time. When
            we do, we will update the &ldquo;Last updated&rdquo; date at the top
            of this page. Your continued use of the Service after any changes
            constitutes your acceptance of the new terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0c1a2e] mb-3">
            10. Governing Law
          </h2>
          <p>
            These Terms shall be governed by and construed in accordance with
            applicable law. Any disputes arising from your use of the Service
            shall be subject to the exclusive jurisdiction of the competent
            courts.
          </p>
        </section>
      </div>
    </div>
  );
}
