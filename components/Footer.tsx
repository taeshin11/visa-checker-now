export default function Footer() {
  return (
    <footer className="bg-[#0c1a2e] text-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xl font-bold mb-3">
              <span>✈️</span>
              <span>VisaCheckerNow</span>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed">
              Check visa requirements for any passport and destination in seconds.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-blue-100">Quick Links</h3>
            <ul className="space-y-2 text-sm text-blue-200">
              <li><a href="/en/passports" className="hover:text-white">All Passports</a></li>
              <li><a href="/en/destinations" className="hover:text-white">All Destinations</a></li>
              <li><a href="/en/rankings" className="hover:text-white">Passport Rankings</a></li>
              <li><a href="/en/guide/tourist" className="hover:text-white">Tourist Visa Guide</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-blue-100">Popular Checks</h3>
            <ul className="space-y-2 text-sm text-blue-200">
              <li><a href="/en/check/US/JP" className="hover:text-white">US → Japan</a></li>
              <li><a href="/en/check/IN/US" className="hover:text-white">India → USA</a></li>
              <li><a href="/en/check/UK/TH" className="hover:text-white">UK → Thailand</a></li>
              <li><a href="/en/check/JP/US" className="hover:text-white">Japan → USA</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-blue-100">Company</h3>
            <ul className="space-y-2 text-sm text-blue-200">
              <li><a href="/en/about" className="hover:text-white">About</a></li>
              <li><a href="/en/how-to-use" className="hover:text-white">How to Use</a></li>
              <li><a href="/en/privacy" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="/en/terms" className="hover:text-white">Terms of Use</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-blue-900 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-blue-300">
            ⚠️ Visa requirements change frequently. Always verify with official embassy websites before travel.
          </p>
          <p className="text-xs text-blue-400">
            © {new Date().getFullYear()} VisaCheckerNow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
