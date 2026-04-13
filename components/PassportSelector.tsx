"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PASSPORT_CODES, DESTINATION_CODES, ALL_COUNTRY_NAMES, COUNTRY_FLAGS } from "@/lib/data";

interface Props {
  locale: string;
  initialPassport?: string;
  initialDestination?: string;
}

export default function PassportSelector({ locale, initialPassport = "", initialDestination = "" }: Props) {
  const [passport, setPassport] = useState(initialPassport);
  const [destination, setDestination] = useState(initialDestination);
  const router = useRouter();

  function handleCheck() {
    if (passport && destination) {
      router.push(`/${locale}/check/${passport}/${destination}`);
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 w-full max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-semibold text-[#0c1a2e] mb-2">
            🛂 Your Passport
          </label>
          <select
            value={passport}
            onChange={(e) => setPassport(e.target.value)}
            className="w-full border border-blue-200 rounded-xl px-4 py-3 text-[#0c1a2e] bg-[#eff6ff] focus:outline-none focus:ring-2 focus:ring-[#2563eb] text-sm"
          >
            <option value="">Select passport...</option>
            {PASSPORT_CODES.map((code) => (
              <option key={code} value={code}>
                {COUNTRY_FLAGS[code]} {ALL_COUNTRY_NAMES[code]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#0c1a2e] mb-2">
            🌍 Destination Country
          </label>
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full border border-blue-200 rounded-xl px-4 py-3 text-[#0c1a2e] bg-[#eff6ff] focus:outline-none focus:ring-2 focus:ring-[#2563eb] text-sm"
          >
            <option value="">Select destination...</option>
            {DESTINATION_CODES.map((code) => (
              <option key={code} value={code}>
                {COUNTRY_FLAGS[code]} {ALL_COUNTRY_NAMES[code]}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button
        onClick={handleCheck}
        disabled={!passport || !destination}
        className="w-full bg-[#2563eb] text-white font-bold py-3 px-8 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-base"
      >
        Check Visa Requirements →
      </button>
    </div>
  );
}
