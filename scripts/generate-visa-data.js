const fs = require('fs');

const PASSPORT_COUNTRIES = ["US","UK","CA","AU","DE","FR","JP","KR","SG","NZ","SE","NO","DK","NL","CH","AT","BE","FI","IE","ES","IT","PT","BR","MX","IN","CN","RU","AE","SA","ZA"];
const DESTINATION_COUNTRIES = ["US","UK","CA","AU","DE","FR","JP","KR","SG","NZ","TH","ID","VN","PH","MY","IN","CN","AE","TR","GR","IT","ES","MX","BR","AR","PE","EG","MA","KE","ZA"];

const STRONG_PASSPORTS = new Set(["US","UK","CA","AU","DE","FR","JP","KR","SG","NZ","SE","NO","DK","NL","CH","AT","BE","FI","IE","ES","IT","PT"]);
const MEDIUM_PASSPORTS = new Set(["BR","MX","AE","SA","RU","ZA"]);
const WEAK_PASSPORTS = new Set(["IN","CN"]);

const VOA_DESTINATIONS = new Set(["TH","ID","TR","EG","MA","KE"]);
const EVISA_DESTINATIONS = new Set(["IN","AU","NZ","KE","EG","MA","VN"]);
const STRICT_DESTINATIONS = new Set(["US","UK","CA","AU","CN","RU","JP","KR"]);
const SCHENGEN = new Set(["DE","FR","IT","ES","GR","AT","BE","NL","SE","NO","DK","CH","FI","PT","IE"]);

function vf(days, notes) {
  return { requiresVisa: false, stayDays: days, visaOnArrival: false, eVisa: false, processingDays: 0, fee: 0, notes };
}
function voa(days, fee, notes) {
  return { requiresVisa: false, stayDays: days, visaOnArrival: true, eVisa: false, processingDays: 0, fee, notes };
}
function evisa(days, procDays, fee, notes) {
  return { requiresVisa: true, stayDays: days, visaOnArrival: false, eVisa: true, processingDays: procDays, fee, notes };
}
function visa(procDays, fee, notes) {
  return { requiresVisa: true, stayDays: 0, visaOnArrival: false, eVisa: false, processingDays: procDays, fee, notes };
}

function getReq(passport, dest) {
  if (passport === dest) return vf(365, "You are a citizen of this country.");

  // Japan - best passport
  if (passport === "JP") {
    if (dest === "IN") return evisa(30, 3, 25, "e-Visa required for Japanese citizens.");
    if (dest === "CN") return vf(15, "Visa-free for 15 days under pilot program.");
    if (dest === "RU") return visa(7, 50, "eVisa available at evisa.kdmid.ru.");
    if (dest === "AU") return { requiresVisa: false, stayDays: 90, visaOnArrival: false, eVisa: true, processingDays: 1, fee: 20, notes: "ETA required." };
    if (dest === "NZ") return { requiresVisa: false, stayDays: 90, visaOnArrival: false, eVisa: true, processingDays: 1, fee: 17, notes: "NZeTA required." };
    if (dest === "US") return { requiresVisa: false, stayDays: 90, visaOnArrival: false, eVisa: true, processingDays: 1, fee: 21, notes: "ESTA required." };
    if (dest === "CA") return { requiresVisa: false, stayDays: 180, visaOnArrival: false, eVisa: true, processingDays: 1, fee: 7, notes: "eTA required." };
    if (dest === "UK") return vf(180, "Visa-free for 6 months. UK ETA may be required.");
    if (dest === "VN") return vf(45, "Visa-free for 45 days.");
    if (dest === "TH") return vf(60, "Visa-free for 60 days.");
    if (dest === "ID") return vf(30, "Visa-free for 30 days.");
    if (dest === "TR") return { requiresVisa: false, stayDays: 90, visaOnArrival: false, eVisa: true, processingDays: 1, fee: 51, notes: "eVisa required." };
    if (dest === "EG") return voa(30, 25, "Visa on arrival.");
    if (dest === "KE") return evisa(90, 3, 50, "eVisa required.");
    if (dest === "MY") return vf(90, "Visa-free for 90 days.");
    if (dest === "PH") return vf(30, "Visa-free for 30 days.");
    if (dest === "AE") return vf(30, "Visa-free for 30 days.");
    if (dest === "MX") return vf(180, "No visa required.");
    if (dest === "BR") return vf(90, "Visa-free for 90 days.");
    if (dest === "AR") return vf(90, "Visa-free for 90 days.");
    if (dest === "PE") return vf(183, "Visa-free for 183 days.");
    if (dest === "MA") return vf(90, "Visa-free for 90 days.");
    if (dest === "KR") return vf(90, "Visa-free for 90 days.");
    if (dest === "SG") return vf(30, "Visa-free for 30 days.");
    if (SCHENGEN.has(dest)) return vf(90, "Visa-free for 90 days in Schengen Area.");
    if (dest === "ZA") return vf(90, "Visa-free for 90 days.");
    return vf(90, "Visa-free access.");
  }

  // India passport
  if (passport === "IN") {
    if (dest === "TH") return voa(30, 0, "Visa on arrival for 30 days.");
    if (dest === "ID") return voa(30, 35, "Visa on arrival.");
    if (dest === "MA") return vf(90, "Visa-free for 90 days.");
    if (dest === "VN") return { requiresVisa: false, stayDays: 45, visaOnArrival: false, eVisa: true, processingDays: 3, fee: 25, notes: "Visa-free 45 days or eVisa." };
    if (dest === "TR") return { requiresVisa: false, stayDays: 30, visaOnArrival: true, eVisa: true, processingDays: 1, fee: 0, notes: "eVisa or visa on arrival." };
    if (dest === "EG") return voa(30, 25, "Visa on arrival.");
    if (dest === "ZA") return visa(10, 40, "Visa required. Apply at South African embassy.");
    if (dest === "AE") return vf(30, "Visa-free for Indian passport holders with UAE residence/visa.");
    if (dest === "MY") return vf(30, "Visa-free for 30 days.");
    if (dest === "MX") return vf(180, "Visa-free for Indian passport holders.");
    if (dest === "BR") return visa(10, 60, "Visa required.");
    if (dest === "AR") return vf(90, "Visa-free for 90 days.");
    if (dest === "PE") return visa(10, 60, "Visa required.");
    if (dest === "KE") return evisa(90, 3, 50, "eVisa required.");
    if (dest === "AU") return evisa(0, 5, 20, "eVisa required.");
    if (dest === "NZ") return evisa(0, 3, 17, "NZeTA required.");
    if (dest === "CA") return visa(14, 100, "Visitor visa required.");
    if (dest === "UK") return visa(15, 115, "Standard Visitor Visa required.");
    if (dest === "US") return visa(21, 185, "B1/B2 visitor visa required.");
    if (dest === "KR") return visa(10, 50, "Visa required.");
    if (dest === "SG") return visa(7, 30, "Visa required.");
    if (SCHENGEN.has(dest)) return visa(15, 80, "Schengen visa required.");
    if (dest === "JP") return visa(10, 50, "Visa required.");
    if (dest === "CN") return visa(10, 50, "Visa required.");
    if (dest === "RU") return evisa(30, 7, 50, "eVisa available.");
    if (dest === "PH") return vf(30, "Visa-free for 30 days.");
    if (dest === "IN") return vf(365, "Home country.");
    return visa(10, 60, "Visa required.");
  }

  // China passport
  if (passport === "CN") {
    if (dest === "TH") return vf(30, "Visa-free for 30 days.");
    if (dest === "ID") return voa(30, 35, "Visa on arrival.");
    if (dest === "TR") return { requiresVisa: false, stayDays: 30, visaOnArrival: true, eVisa: true, processingDays: 1, fee: 0, notes: "eVisa or visa on arrival." };
    if (dest === "EG") return voa(30, 25, "Visa on arrival.");
    if (dest === "RU") return vf(90, "Visa-free under bilateral agreement.");
    if (dest === "MY") return vf(30, "Visa-free for 30 days.");
    if (dest === "MA") return vf(90, "Visa-free for 90 days.");
    if (dest === "MX") return vf(180, "Visa-free.");
    if (dest === "BR") return vf(90, "Visa-free.");
    if (dest === "AR") return vf(90, "Visa-free.");
    if (dest === "PE") return vf(183, "Visa-free.");
    if (dest === "SG") return vf(30, "Visa-free for 30 days.");
    if (dest === "KR") return vf(30, "Visa-free for 30 days.");
    if (dest === "JP") return vf(15, "Visa-free for 15 days under current pilot program.");
    if (dest === "AE") return vf(30, "Visa-free.");
    if (dest === "AU") return visa(10, 145, "Visitor visa required.");
    if (dest === "NZ") return visa(10, 167, "Visitor visa required.");
    if (dest === "US") return visa(21, 185, "B1/B2 visitor visa required.");
    if (dest === "UK") return visa(15, 115, "Standard Visitor Visa required.");
    if (dest === "CA") return visa(14, 100, "Visitor visa required.");
    if (SCHENGEN.has(dest)) return visa(15, 80, "Schengen visa required.");
    if (dest === "KE") return evisa(90, 3, 50, "eVisa required.");
    if (dest === "VN") return evisa(30, 3, 25, "eVisa required.");
    if (dest === "IN") return visa(14, 75, "Visa required.");
    if (dest === "PH") return vf(30, "Visa-free for 30 days.");
    if (dest === "ZA") return visa(10, 40, "Visa required.");
    return visa(10, 60, "Visa required.");
  }

  // Russia passport
  if (passport === "RU") {
    if (dest === "CN") return vf(90, "Visa-free under bilateral agreement.");
    if (dest === "TH") return vf(30, "Visa-free for 30 days.");
    if (dest === "TR") return vf(90, "Visa-free for 90 days.");
    if (dest === "ID") return voa(30, 35, "Visa on arrival.");
    if (dest === "EG") return voa(30, 25, "Visa on arrival.");
    if (dest === "MA") return vf(90, "Visa-free for 90 days.");
    if (dest === "VN") return vf(15, "Visa-free for 15 days.");
    if (dest === "MY") return vf(30, "Visa-free for 30 days.");
    if (dest === "AR") return vf(90, "Visa-free.");
    if (dest === "BR") return vf(90, "Visa-free.");
    if (dest === "MX") return vf(180, "Visa-free.");
    if (dest === "PE") return vf(183, "Visa-free.");
    if (dest === "AE") return vf(30, "Visa-free.");
    if (dest === "KE") return evisa(90, 3, 50, "eVisa required.");
    if (dest === "IN") return evisa(30, 3, 25, "eVisa required.");
    if (dest === "AU") return visa(14, 145, "Visitor visa required.");
    if (dest === "NZ") return visa(10, 167, "Visitor visa required.");
    if (dest === "US") return visa(21, 185, "Visa required.");
    if (dest === "UK") return visa(15, 115, "Visa required.");
    if (dest === "CA") return visa(14, 100, "Visitor visa required.");
    if (dest === "JP") return visa(7, 50, "Visa required.");
    if (dest === "KR") return vf(60, "Visa-free for 60 days.");
    if (dest === "SG") return vf(30, "Visa-free for 30 days.");
    if (SCHENGEN.has(dest)) return visa(15, 80, "Schengen visa required.");
    if (dest === "ZA") return vf(30, "Visa-free.");
    if (dest === "PH") return vf(30, "Visa-free for 30 days.");
    return vf(90, "Visa-free.");
  }

  // Strong passports
  if (STRONG_PASSPORTS.has(passport)) {
    // EU/Schengen to Schengen
    if (SCHENGEN.has(passport) && SCHENGEN.has(dest)) {
      return vf(365, "EU/Schengen freedom of movement. No visa required.");
    }
    if (SCHENGEN.has(dest)) return vf(90, "Visa-free for 90 days in Schengen Area.");

    if (dest === "US") {
      const vtw = new Set(["UK","DE","FR","IT","ES","AT","BE","NL","SE","NO","DK","CH","FI","PT","IE","JP","KR","SG","AU","NZ","CA"]);
      if (vtw.has(passport)) return { requiresVisa: false, stayDays: 90, visaOnArrival: false, eVisa: true, processingDays: 1, fee: 21, notes: "ESTA required. Apply before travel at esta.cbp.dhs.gov." };
      return visa(21, 185, "B1/B2 visitor visa required.");
    }
    if (dest === "UK") {
      if (["US","CA","AU","NZ","SG","JP","KR"].includes(passport)) return vf(180, "Visa-free for 6 months.");
      return { requiresVisa: false, stayDays: 180, visaOnArrival: false, eVisa: true, processingDays: 1, fee: 10, notes: "UK ETA required." };
    }
    if (dest === "CA") {
      if (passport === "US") return vf(180, "No visa required for US citizens.");
      return { requiresVisa: false, stayDays: 180, visaOnArrival: false, eVisa: true, processingDays: 1, fee: 7, notes: "eTA required." };
    }
    if (dest === "AU") return { requiresVisa: false, stayDays: 90, visaOnArrival: false, eVisa: true, processingDays: 1, fee: 20, notes: "ETA required. Apply at eta.immi.gov.au." };
    if (dest === "NZ") return { requiresVisa: false, stayDays: 90, visaOnArrival: false, eVisa: true, processingDays: 1, fee: 17, notes: "NZeTA required." };
    if (dest === "JP") return vf(90, "Visa-free for 90 days.");
    if (dest === "KR") return vf(90, "Visa-free for 90 days.");
    if (dest === "SG") return vf(30, "Visa-free for 30 days.");
    if (dest === "TH") return vf(60, "Visa-free for 60 days.");
    if (dest === "ID") return voa(30, 35, "Visa on arrival, extendable once.");
    if (dest === "VN") return { requiresVisa: false, stayDays: 45, visaOnArrival: false, eVisa: true, processingDays: 3, fee: 25, notes: "Visa-free 45 days. eVisa also available." };
    if (dest === "PH") return vf(30, "Visa-free for 30 days.");
    if (dest === "MY") return vf(90, "Visa-free for 90 days.");
    if (dest === "IN") return evisa(30, 3, 25, "e-Visa required. Apply at indianvisaonline.gov.in.");
    if (dest === "CN") return vf(15, "Visa-free for 15 days under pilot program (select nationalities).");
    if (dest === "AE") return vf(30, "Visa-free for 30 days.");
    if (dest === "TR") return { requiresVisa: false, stayDays: 90, visaOnArrival: false, eVisa: true, processingDays: 1, fee: 51, notes: "eVisa required at evisa.gov.tr." };
    if (dest === "MX") return vf(180, "No visa required.");
    if (dest === "BR") return vf(90, "Visa-free for 90 days.");
    if (dest === "AR") return vf(90, "Visa-free for 90 days.");
    if (dest === "PE") return vf(183, "Visa-free for 183 days.");
    if (dest === "EG") return voa(30, 25, "Visa on arrival or eVisa available.");
    if (dest === "MA") return vf(90, "Visa-free for 90 days.");
    if (dest === "KE") return evisa(90, 3, 50, "eVisa required at evisa.go.ke.");
    if (dest === "ZA") return vf(90, "Visa-free for 90 days.");
    if (dest === "RU") return evisa(16, 7, 50, "eVisa required. Apply at evisa.kdmid.ru.");
    return vf(90, "Visa-free access.");
  }

  // Medium passports (BR, MX, AE, SA, ZA)
  if (MEDIUM_PASSPORTS.has(passport)) {
    if (dest === "US") {
      if (passport === "MX") return { requiresVisa: false, stayDays: 90, visaOnArrival: false, eVisa: true, processingDays: 1, fee: 21, notes: "ESTA required." };
      if (passport === "BR") return visa(21, 185, "B1/B2 visitor visa required.");
      return visa(14, 185, "Visitor visa required.");
    }
    if (dest === "UK") {
      if (["BR","MX"].includes(passport)) return vf(180, "Visa-free for 6 months.");
      if (passport === "AE") return vf(180, "Visa-free for UAE passport holders.");
      return visa(15, 115, "Standard Visitor Visa required.");
    }
    if (dest === "CA") {
      if (["BR","MX"].includes(passport)) return { requiresVisa: false, stayDays: 180, visaOnArrival: false, eVisa: true, processingDays: 1, fee: 7, notes: "eTA required." };
      return visa(14, 100, "Visitor visa required.");
    }
    if (dest === "AU") {
      if (["BR","MX"].includes(passport)) return evisa(0, 5, 20, "eVisa may be required.");
      return visa(10, 145, "Visitor visa required.");
    }
    if (dest === "NZ") {
      if (["BR","MX"].includes(passport)) return { requiresVisa: false, stayDays: 90, visaOnArrival: false, eVisa: true, processingDays: 1, fee: 17, notes: "NZeTA required." };
      return visa(10, 167, "Visitor visa required.");
    }
    if (SCHENGEN.has(dest)) {
      if (["AE","SA"].includes(passport)) return vf(90, "Visa-free for 90 days in Schengen.");
      if (["BR","MX"].includes(passport)) return vf(90, "Visa-free for 90 days in Schengen.");
      return visa(15, 80, "Schengen visa required.");
    }
    if (dest === "JP") {
      if (["BR","MX"].includes(passport)) return vf(90, "Visa-free for 90 days.");
      if (passport === "AE") return vf(30, "Visa-free for 30 days.");
      return visa(10, 50, "Visa required.");
    }
    if (dest === "KR") {
      if (["BR","MX","AE"].includes(passport)) return vf(90, "Visa-free for 90 days.");
      return visa(10, 50, "Visa required.");
    }
    if (dest === "TH") return vf(30, "Visa-free for 30 days.");
    if (dest === "ID") return voa(30, 35, "Visa on arrival.");
    if (dest === "VN") return { requiresVisa: false, stayDays: 45, visaOnArrival: false, eVisa: true, processingDays: 3, fee: 25, notes: "Visa-free or eVisa." };
    if (dest === "MY") return vf(90, "Visa-free for 90 days.");
    if (dest === "PH") return vf(30, "Visa-free for 30 days.");
    if (dest === "SG") return vf(30, "Visa-free for 30 days.");
    if (dest === "IN") return evisa(30, 3, 25, "e-Visa required.");
    if (dest === "CN") {
      if (passport === "AE") return vf(30, "Visa-free.");
      return visa(10, 50, "Visa required.");
    }
    if (dest === "AE") return vf(30, "Visa-free for 30 days.");
    if (dest === "TR") return { requiresVisa: false, stayDays: 90, visaOnArrival: false, eVisa: true, processingDays: 1, fee: 51, notes: "eVisa required." };
    if (dest === "EG") return voa(30, 25, "Visa on arrival.");
    if (dest === "MA") return vf(90, "Visa-free.");
    if (dest === "KE") return evisa(90, 3, 50, "eVisa required.");
    if (dest === "ZA") {
      if (passport === "ZA") return vf(365, "Home country.");
      return vf(30, "Visa-free for 30 days.");
    }
    if (dest === "MX") {
      if (passport === "MX") return vf(365, "Home country.");
      return vf(180, "Visa-free.");
    }
    if (dest === "BR") {
      if (passport === "BR") return vf(365, "Home country.");
      return vf(90, "Visa-free.");
    }
    if (dest === "AR") return vf(90, "Visa-free.");
    if (dest === "PE") return vf(183, "Visa-free.");
    if (dest === "RU") return evisa(16, 7, 50, "eVisa required.");
    return vf(30, "Visa-free access.");
  }

  // Fallback
  if (STRICT_DESTINATIONS.has(dest)) return visa(14, 100, "Visa required. Contact embassy.");
  if (VOA_DESTINATIONS.has(dest)) return voa(30, 35, "Visa on arrival.");
  return vf(90, "Visa-free access.");
}

const matrix = {};
for (const passport of PASSPORT_COUNTRIES) {
  matrix[passport] = {};
  for (const dest of DESTINATION_COUNTRIES) {
    matrix[passport][dest] = getReq(passport, dest);
  }
}

fs.writeFileSync('C:\\MakingApps\\260413\\visa-checker-now\\data\\visa-requirements-fallback.json', JSON.stringify(matrix, null, 2));
console.log('Generated visa requirements data for ' + PASSPORT_COUNTRIES.length + ' x ' + DESTINATION_COUNTRIES.length + ' pairs');
