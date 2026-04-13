import visaMatrix from "@/data/visa-requirements-fallback.json";
import countries from "@/data/countries-fallback.json";
import rankings from "@/data/passport-rankings-fallback.json";

export interface VisaRequirement {
  requiresVisa: boolean;
  stayDays: number;
  visaOnArrival: boolean;
  eVisa: boolean;
  processingDays: number;
  fee: number;
  notes: string;
}

export interface Country {
  code: string;
  name: string;
  region: string;
  currency: string;
  language: string;
  capital: string;
  timezone: string;
}

export interface PassportRanking {
  rank: number;
  code: string;
  name: string;
  visaFreeCount: number;
  score: number;
}

export const PASSPORT_CODES = [
  "US","UK","CA","AU","DE","FR","JP","KR","SG","NZ",
  "SE","NO","DK","NL","CH","AT","BE","FI","IE","ES",
  "IT","PT","BR","MX","IN","CN","RU","AE","SA","ZA"
];

export const DESTINATION_CODES = [
  "US","UK","CA","AU","DE","FR","JP","KR","SG","NZ",
  "TH","ID","VN","PH","MY","IN","CN","AE","TR","GR",
  "IT","ES","MX","BR","AR","PE","EG","MA","KE","ZA"
];

export const COUNTRY_FLAGS: Record<string, string> = {
  US:"🇺🇸", UK:"🇬🇧", CA:"🇨🇦", AU:"🇦🇺", DE:"🇩🇪", FR:"🇫🇷", JP:"🇯🇵",
  KR:"🇰🇷", SG:"🇸🇬", NZ:"🇳🇿", SE:"🇸🇪", NO:"🇳🇴", DK:"🇩🇰", NL:"🇳🇱",
  CH:"🇨🇭", AT:"🇦🇹", BE:"🇧🇪", FI:"🇫🇮", IE:"🇮🇪", ES:"🇪🇸", IT:"🇮🇹",
  PT:"🇵🇹", BR:"🇧🇷", MX:"🇲🇽", IN:"🇮🇳", CN:"🇨🇳", RU:"🇷🇺", AE:"🇦🇪",
  SA:"🇸🇦", ZA:"🇿🇦", TH:"🇹🇭", ID:"🇮🇩", VN:"🇻🇳", PH:"🇵🇭", MY:"🇲🇾",
  TR:"🇹🇷", GR:"🇬🇷", AR:"🇦🇷", PE:"🇵🇪", EG:"🇪🇬", MA:"🇲🇦", KE:"🇰🇪"
};

export const ALL_COUNTRY_NAMES: Record<string, string> = {
  US:"United States", UK:"United Kingdom", CA:"Canada", AU:"Australia",
  DE:"Germany", FR:"France", JP:"Japan", KR:"South Korea", SG:"Singapore",
  NZ:"New Zealand", SE:"Sweden", NO:"Norway", DK:"Denmark", NL:"Netherlands",
  CH:"Switzerland", AT:"Austria", BE:"Belgium", FI:"Finland", IE:"Ireland",
  ES:"Spain", IT:"Italy", PT:"Portugal", BR:"Brazil", MX:"Mexico",
  IN:"India", CN:"China", RU:"Russia", AE:"UAE", SA:"Saudi Arabia", ZA:"South Africa",
  TH:"Thailand", ID:"Indonesia", VN:"Vietnam", PH:"Philippines", MY:"Malaysia",
  TR:"Turkey", GR:"Greece", AR:"Argentina", PE:"Peru", EG:"Egypt", MA:"Morocco", KE:"Kenya"
};

export function getVisaRequirement(passport: string, destination: string): VisaRequirement | null {
  const matrix = visaMatrix as Record<string, Record<string, VisaRequirement>>;
  return matrix[passport]?.[destination] ?? null;
}

export function getAllCountries(): Country[] {
  return countries as Country[];
}

export function getPassportRankings(): PassportRanking[] {
  return rankings as PassportRanking[];
}

export function getCountryName(code: string): string {
  return ALL_COUNTRY_NAMES[code] ?? code;
}

export function getVisaFreeCount(passport: string): number {
  const matrix = visaMatrix as Record<string, Record<string, VisaRequirement>>;
  const destinations = matrix[passport];
  if (!destinations) return 0;
  return Object.values(destinations).filter(
    (v) => !v.requiresVisa || v.visaOnArrival
  ).length;
}

export function getVisaStatusLabel(req: VisaRequirement): string {
  if (!req.requiresVisa && !req.visaOnArrival && !req.eVisa) return "Visa Free";
  if (req.visaOnArrival) return "Visa on Arrival";
  if (req.eVisa && !req.requiresVisa) return "eVisa";
  if (req.eVisa && req.requiresVisa) return "eVisa Required";
  return "Visa Required";
}

export function getVisaStatusColor(req: VisaRequirement): string {
  if (!req.requiresVisa && !req.visaOnArrival && !req.eVisa) return "green";
  if (req.visaOnArrival) return "yellow";
  if (req.eVisa) return "blue";
  return "red";
}
