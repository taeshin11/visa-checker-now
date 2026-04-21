import type { Metadata } from "next";

interface Props {
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: "Privacy Policy | VisaCheckerNow",
  description:
    "Privacy Policy for VisaCheckerNow. Learn how we collect, use, and protect your information when you use our free visa requirements checker.",
};

const LAST_UPDATED = "April 13, 2025";

export default async function PrivacyPage({ params }: Props) {
  await params;

  return (
    <div className="max-w-3xl mx-auto px-4 py-14">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#0c1a2e] mb-3">
          Privacy Policy
        </h1>
        <p className="text-gray-400 text-sm">Last updated: {LAST_UPDATED}</p>
      </div>

      <div className="space-y-8 text-gray-600 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-[#0c1a2e] mb-3">1. Introduction</h2>
          <p>
            Welcome to VisaCheckerNow (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or
            &ldquo;our&rdquo;). We operate the website{" "}
            <span className="text-blue-600">visa-checker-now.vercel.app</span>{" "}
            (the &ldquo;Service&rdquo;). This Privacy Policy explains how we
            collect, use, disclose, and safeguard your information when you use
            our Service. Please read this policy carefully. If you disagree with
            its terms, please discontinue use of the site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0c1a2e] mb-3">
            2. Information We Collect
          </h2>
          <p className="mb-3">
            <strong className="text-[#0c1a2e]">Information you provide:</strong>{" "}
            VisaCheckerNow does not require you to create an account or provide
            any personal information to use our Service. We do not collect your
            name, email address, or payment information.
          </p>
          <p className="mb-3">
            <strong className="text-[#0c1a2e]">
              Automatically collected information:
            </strong>{" "}
            When you visit our site, we may automatically collect certain
            technical information, including your IP address, browser type,
            referring URL, pages viewed, and the date and time of your visit.
            This data is used in aggregate to understand how visitors use our
            site and to improve the Service.
          </p>
          <p>
            <strong className="text-[#0c1a2e]">Cookies:</strong> We use cookies
            and similar tracking technologies to improve your experience and
            serve relevant advertising. You can instruct your browser to refuse
            all cookies or to indicate when a cookie is being sent. Please see
            Section 5 for details on advertising.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0c1a2e] mb-3">
            3. How We Use Your Information
          </h2>
          <ul className="space-y-2">
            {[
              "To operate and maintain the Service",
              "To analyse usage patterns and improve site content and performance",
              "To detect and prevent technical issues and security threats",
              "To comply with legal obligations",
              "To serve relevant advertising through third-party ad networks",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-blue-500 mt-1 flex-shrink-0">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0c1a2e] mb-3">
            4. Sharing of Information
          </h2>
          <p>
            We do not sell, trade, or otherwise transfer your personally
            identifiable information to third parties. We may share aggregated,
            non-personally identifiable data with analytics and advertising
            partners. We may disclose information if required by law or to
            protect our rights and the safety of our users.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0c1a2e] mb-3">
            5. Advertising (Google AdSense)
          </h2>
          <p className="mb-3">
            We use Google AdSense to display advertisements. Google, as a
            third-party vendor, uses cookies to serve ads based on your prior
            visits to our website and other websites. Google&apos;s use of
            advertising cookies enables it and its partners to serve ads based
            on your visit to our site and/or other sites on the internet.
          </p>
          <p>
            You may opt out of personalised advertising by visiting{" "}
            <span className="text-blue-600">
              www.aboutads.info/choices
            </span>{" "}
            or by adjusting your Google Ads settings at{" "}
            <span className="text-blue-600">www.google.com/settings/ads</span>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0c1a2e] mb-3">
            6. Third-Party Analytics
          </h2>
          <p>
            We may use analytics services such as Google Analytics to track and
            analyse how visitors use the Service. These services collect
            information such as how often users visit the site, what pages they
            view, and what other sites they visited before coming to ours. We
            use this information to improve the Service. Google Analytics
            collects only the IP address assigned to you on the date you visit
            the site, not your name or other personally identifiable
            information.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0c1a2e] mb-3">
            7. Data Retention
          </h2>
          <p>
            We retain automatically collected technical data for up to 26 months
            for analytics purposes, after which it is deleted or anonymised.
            Since we do not collect personal account data, there is no personal
            profile to delete.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0c1a2e] mb-3">
            8. Children&apos;s Privacy
          </h2>
          <p>
            Our Service is not directed to children under the age of 13. We do
            not knowingly collect personally identifiable information from
            children under 13. If you believe we have inadvertently collected
            such information, please contact us so we can promptly remove it.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0c1a2e] mb-3">
            9. Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. When we do, we
            will update the &ldquo;Last updated&rdquo; date at the top of this
            page. We encourage you to review this page periodically for any
            changes. Your continued use of the Service after changes are posted
            constitutes your acceptance of the updated policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0c1a2e] mb-3">10. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please open an
            issue or discussion on our public repository, or reach us via the
            contact information listed on our website.
          </p>
        </section>
      </div>
    </div>
  );
}
