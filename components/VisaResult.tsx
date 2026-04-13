import { VisaRequirement, getVisaStatusLabel, getVisaStatusColor } from "@/lib/data";

interface Props {
  passport: string;
  passportName: string;
  destination: string;
  destinationName: string;
  requirement: VisaRequirement;
}

const colorMap = {
  green: { bg: "bg-green-50", border: "border-green-200", badge: "bg-green-100 text-green-800", icon: "✅" },
  yellow: { bg: "bg-yellow-50", border: "border-yellow-200", badge: "bg-yellow-100 text-yellow-800", icon: "🟡" },
  blue: { bg: "bg-blue-50", border: "border-blue-200", badge: "bg-blue-100 text-blue-800", icon: "💻" },
  red: { bg: "bg-red-50", border: "border-red-200", badge: "bg-red-100 text-red-800", icon: "🔴" },
};

export default function VisaResult({ passport, passportName, destination, destinationName, requirement }: Props) {
  const status = getVisaStatusLabel(requirement);
  const colorKey = getVisaStatusColor(requirement) as keyof typeof colorMap;
  const colors = colorMap[colorKey];

  return (
    <div className={`rounded-2xl border-2 ${colors.border} ${colors.bg} p-6`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-gray-500 mb-1">
            {passportName} passport → {destinationName}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{colors.icon}</span>
            <span className={`text-xl font-bold px-3 py-1 rounded-full ${colors.badge}`}>
              {status}
            </span>
          </div>
        </div>
        <a
          href={`/en/check/${passport}/${destination}`}
          className="text-sm text-[#2563eb] hover:underline font-medium"
        >
          Full details →
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        <div className="bg-white rounded-xl p-3 text-center">
          <p className="text-xs text-gray-500 mb-1">Stay Duration</p>
          <p className="font-bold text-[#0c1a2e]">
            {requirement.stayDays > 0 ? `${requirement.stayDays} days` : "N/A"}
          </p>
        </div>
        <div className="bg-white rounded-xl p-3 text-center">
          <p className="text-xs text-gray-500 mb-1">Processing</p>
          <p className="font-bold text-[#0c1a2e]">
            {requirement.processingDays > 0 ? `${requirement.processingDays} days` : "Instant"}
          </p>
        </div>
        <div className="bg-white rounded-xl p-3 text-center">
          <p className="text-xs text-gray-500 mb-1">Fee</p>
          <p className="font-bold text-[#0c1a2e]">
            {requirement.fee > 0 ? `$${requirement.fee}` : "Free"}
          </p>
        </div>
        <div className="bg-white rounded-xl p-3 text-center">
          <p className="text-xs text-gray-500 mb-1">eVisa</p>
          <p className="font-bold text-[#0c1a2e]">
            {requirement.eVisa ? "Available" : "No"}
          </p>
        </div>
      </div>

      {requirement.notes && (
        <p className="mt-4 text-sm text-gray-600 bg-white rounded-xl p-3">
          📌 {requirement.notes}
        </p>
      )}
    </div>
  );
}
