// Utility types for visa data
export interface VisaRequirement {
  requiresVisa: boolean;
  stayDays: number;
  visaOnArrival: boolean;
  eVisa: boolean;
  processingDays: number;
  fee: number;
  notes: string;
}

export interface VisaMatrix {
  [passport: string]: {
    [destination: string]: VisaRequirement;
  };
}

export const PASSPORT_COUNTRIES = [
  "US","UK","CA","AU","DE","FR","JP","KR","SG","NZ",
  "SE","NO","DK","NL","CH","AT","BE","FI","IE","ES",
  "IT","PT","BR","MX","IN","CN","RU","AE","SA","ZA"
];

export const DESTINATION_COUNTRIES = [
  "US","UK","CA","AU","DE","FR","JP","KR","SG","NZ",
  "TH","ID","VN","PH","MY","IN","CN","AE","TR","GR",
  "IT","ES","MX","BR","AR","PE","EG","MA","KE","ZA"
];

export const PASSPORT_NAMES: Record<string, string> = {
  US:"United States", UK:"United Kingdom", CA:"Canada", AU:"Australia",
  DE:"Germany", FR:"France", JP:"Japan", KR:"South Korea", SG:"Singapore",
  NZ:"New Zealand", SE:"Sweden", NO:"Norway", DK:"Denmark", NL:"Netherlands",
  CH:"Switzerland", AT:"Austria", BE:"Belgium", FI:"Finland", IE:"Ireland",
  ES:"Spain", IT:"Italy", PT:"Portugal", BR:"Brazil", MX:"Mexico",
  IN:"India", CN:"China", RU:"Russia", AE:"UAE", SA:"Saudi Arabia", ZA:"South Africa"
};

export const DESTINATION_NAMES: Record<string, string> = {
  US:"United States", UK:"United Kingdom", CA:"Canada", AU:"Australia",
  DE:"Germany", FR:"France", JP:"Japan", KR:"South Korea", SG:"Singapore",
  NZ:"New Zealand", TH:"Thailand", ID:"Indonesia", VN:"Vietnam",
  PH:"Philippines", MY:"Malaysia", IN:"India", CN:"China", AE:"UAE",
  TR:"Turkey", GR:"Greece", IT:"Italy", ES:"Spain", MX:"Mexico",
  BR:"Brazil", AR:"Argentina", PE:"Peru", EG:"Egypt", MA:"Morocco",
  KE:"Kenya", ZA:"South Africa"
};

export const COUNTRY_FLAGS: Record<string, string> = {
  US:"🇺🇸", UK:"🇬🇧", CA:"🇨🇦", AU:"🇦🇺", DE:"🇩🇪", FR:"🇫🇷", JP:"🇯🇵",
  KR:"🇰🇷", SG:"🇸🇬", NZ:"🇳🇿", SE:"🇸🇪", NO:"🇳🇴", DK:"🇩🇰", NL:"🇳🇱",
  CH:"🇨🇭", AT:"🇦🇹", BE:"🇧🇪", FI:"🇫🇮", IE:"🇮🇪", ES:"🇪🇸", IT:"🇮🇹",
  PT:"🇵🇹", BR:"🇧🇷", MX:"🇲🇽", IN:"🇮🇳", CN:"🇨🇳", RU:"🇷🇺", AE:"🇦🇪",
  SA:"🇸🇦", ZA:"🇿🇦", TH:"🇹🇭", ID:"🇮🇩", VN:"🇻🇳", PH:"🇵🇭", MY:"🇲🇾",
  TR:"🇹🇷", GR:"🇬🇷", AR:"🇦🇷", PE:"🇵🇪", EG:"🇪🇬", MA:"🇲🇦", KE:"🇰🇪"
};
