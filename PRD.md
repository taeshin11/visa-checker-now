# VisaCheckerNow — PRD
# Visa Requirements by Passport

---

## Overview

**Service Name:** VisaCheckerNow  
**Tagline:** Check Visa Requirements for Any Passport × Destination in Seconds  
**Domain suggestion:** visacheckernow.com (or Vercel subdomain for dev)  
**Folder:** `C:\MakingApps\260413\visa-checker-now\`  
**GitHub Repo:** `taeshin11/visa-checker-now` (create via `gh repo create`)  
**Deploy:** Vercel (`npx vercel --prod`)  
**Backend:** Not needed — fully static (SSG from JSON data)  

VisaCheckerNow is a programmatic SEO powerhouse. With 195 passport countries × 195 destination countries, it generates ~38,000 unique pages (passport→destination pairs), plus ~390 country-level pages. The site answers the fundamental travel question: "Do I need a visa to visit [country] with my [passport]?" Data comes from publicly available sources (Wikipedia visa requirement tables, Passport Index public data). Zero API cost. Maximum SEO value.

---

## Target Users & Pain Points

| User Segment | Pain Point |
|---|---|
| International travelers | Must visit multiple embassy websites to check requirements |
| Dual passport holders | Need to compare which passport to use for each trip |
| Digital nomads | Planning multi-country trips, need quick visa matrix |
| HR/relocation managers | Checking visa feasibility for international employee moves |
| Travel bloggers | Need accurate, citeable visa requirement information |

**Core user intent:** "Do US passport holders need a visa for Japan?" / "Can I visit Thailand visa-free?" / "India passport visa requirements"

**SEO opportunity:** This is one of the highest-volume travel query categories. Pages like "US passport visa requirements", "Indian passport visa-free countries", "[Country] visa requirements for [passport]" drive millions of searches monthly.

---

## Core Features

| ID | Feature | Priority | Status |
|---|---|---|---|
| F01 | Homepage — passport selector → show visa-free count + top destinations | P0 | TODO |
| F02 | Passport pages `/passport/[country]` — all destinations with visa status | P0 | TODO |
| F03 | Destination pages `/destination/[country]` — all passports with visa status | P0 | TODO |
| F04 | Pair pages `/visa/[passport]-to-[destination]` — specific requirements detail | P0 | TODO |
| F05 | Compare pages `/compare/[country-a]-vs-[country-b]` — 2 passports side by side | P0 | TODO |
| F06 | Visa status categories: Visa Free, Visa on Arrival, eVisa, Visa Required, Banned | P0 | TODO |
| F07 | Visa-free country count leaderboard (Passport Power Ranking) | P0 | TODO |
| F08 | Search: fuzzy search for country names (Fuse.js) | P0 | TODO |
| F09 | Filter by visa status (on passport detail page) | P1 | TODO |
| F10 | Stay duration display (e.g., "Visa-free for 90 days") | P0 | TODO |
| F11 | Visitor counter (today + total) in footer | P0 | TODO |
| F12 | i18n (8 languages) via next-intl | P0 | TODO |
| F13 | Google Sheets webhook on every user interaction | P0 | TODO |
| F14 | Adsterra ad placements (Social Bar, Native Banner, Display) | P0 | TODO |
| F15 | Schema.org JSON-LD (Dataset, FAQPage, BreadcrumbList, Table) | P0 | TODO |
| F16 | Sitemap.xml + robots.txt auto-generated | P0 | TODO |
| F17 | hreflang tags for all 8 language variants | P0 | TODO |
| F18 | research_history/ folder with milestone logs | P0 | TODO |
| F19 | Passport power index sorted by visa-free access count | P1 | TODO |
| F20 | Regional grouping (EU, ASEAN, Americas, Africa, etc.) | P1 | TODO |
| F21 | "Popular destinations" quick links on passport page | P1 | TODO |
| F22 | Currency + timezone quick info on destination page | P2 | TODO |

---

## Tech Stack

```
Framework:        Next.js 14 (App Router, SSG — generateStaticParams for all pairs)
Styling:          Tailwind CSS v3
i18n:             next-intl
Search:           Fuse.js (client-side fuzzy search over country list)
Data:             Static JSON (visa matrix + country metadata)
Icons:            Lucide React + country flag emojis / twemoji
Deployment:       Vercel (npx vercel --prod)
Repo:             GitHub (gh repo create taeshin11/visa-checker-now --public)
Analytics:        Vercel Analytics (free)
Visitor Counter:  Vercel KV (free) or Railway
```

**Important note on build time:** With 38,000 pair pages, SSG at build time is slow. Strategy:
- Generate the top 500 most-searched pairs at build time (hardcoded list)
- Use `fallback: 'blocking'` (or ISR with `revalidate: 86400`) for remaining pairs
- This keeps build fast while still being SEO-indexable

### Environment Variables (`.env.local`)
```
NEXT_PUBLIC_GS_WEBHOOK_URL=          # Google Apps Script webhook URL
NEXT_PUBLIC_ADSTERRA_SOCIAL_BAR=     # TODO: add when received
NEXT_PUBLIC_ADSTERRA_NATIVE=         # TODO: add when received
NEXT_PUBLIC_ADSTERRA_DISPLAY=        # TODO: add when received
```

---

## Data Sources (Free — All Static)

### 1. Visa Requirement Matrix (`data/visa-matrix.json`)
**Source:** Wikipedia "Visa requirements for citizens of [country]" tables (scraped/compiled from public domain data). Also cross-referenced with Passport Index (passportindex.org public data).

**Structure:**
```json
{
  "version": "2025-Q1",
  "updated": "2025-01-01",
  "matrix": {
    "US": {
      "JP": { "status": "visa_free", "days": 90, "notes": "90 days per visit" },
      "CN": { "status": "visa_required", "days": null, "notes": "Visa required before travel" },
      "TH": { "status": "visa_free", "days": 30, "notes": "30 days, extendable" },
      "IN": { "status": "evisa", "days": 60, "notes": "e-Visa available online" },
      "SA": { "status": "evisa", "days": 90, "notes": "eVisa or Visa on Arrival" }
    },
    "IN": {
      "JP": { "status": "visa_required", "days": null, "notes": null },
      "TH": { "status": "visa_on_arrival", "days": 15, "notes": "15 days, fee applies" }
    }
  }
}
```

**Visa Status Values:**
- `visa_free` — no visa needed
- `visa_on_arrival` — get visa at airport/border
- `evisa` — electronic visa applied online before travel
- `visa_required` — must apply at embassy before travel
- `banned` — travel not permitted (sanctions, conflict, etc.)
- `admission_refused` — passport holder generally refused entry

**Initial data target:** At minimum, full matrix for top 50 passport countries × all 195 destinations. Stub remaining pairs with `visa_required` as conservative fallback.

### 2. Country Metadata (`data/countries.json`)
```json
[
  {
    "code": "US",
    "slug": "united-states",
    "name": "United States",
    "native_name": "United States of America",
    "continent": "North America",
    "region": "Americas",
    "flag_emoji": "🇺🇸",
    "capital": "Washington D.C.",
    "currency": "USD",
    "currency_name": "US Dollar",
    "timezone": "UTC-5 to UTC-10",
    "languages": ["English"],
    "phone_code": "+1",
    "passport_power_rank": 7,
    "visa_free_count": 186
  }
]
```

Include all 195 UN-recognized countries + common special territories.

### 3. Passport Power Rankings (`data/passport-rankings.json`)
```json
[
  { "rank": 1, "countries": ["JP"], "visa_free": 194 },
  { "rank": 2, "countries": ["DE", "ES", "FI", "IT", "LU", "SE"], "visa_free": 193 },
  { "rank": 3, "countries": ["AT", "DK", "FR", "IE", "NL", "PT"], "visa_free": 192 }
]
```
Source: Henley Passport Index (publicly cited data) — update quarterly.

### 4. Top 500 Pairs (`data/top-pairs.json`)
For build-time pre-generation:
```json
[
  "US-JP", "US-GB", "US-FR", "US-IN", "US-CN", "US-MX", "US-CA",
  "IN-US", "IN-GB", "IN-AE", "IN-TH", "IN-SG",
  "CN-US", "CN-JP", "CN-TH"
]
```

---

## Page Structure & SEO

### Routes

| Route | Purpose | Primary Keywords |
|---|---|---|
| `/` | Homepage — passport selector + power ranking | "visa requirements", "do I need a visa" |
| `/passport` | All passports index | "passport visa requirements list" |
| `/passport/[country]` | Per-passport detail — all destinations | "[country] passport visa requirements", "[country] visa-free countries" |
| `/destination` | All destinations index | "visa requirements to enter [country]" |
| `/destination/[country]` | Per-destination — all passports | "who can visit [country] visa-free" |
| `/visa/[passport]-to-[destination]` | Specific pair detail | "[passport country] visa for [destination]", "do [nationality] need visa for [country]" |
| `/compare/[a]-vs-[b]` | 2-passport comparison | "[country] vs [country] passport", "compare passport [a] [b]" |
| `/ranking` | Passport power ranking | "most powerful passport", "passport ranking 2025" |
| `/visa-free` | Visa-free travel guide | "visa free countries 2025" |
| `/sitemap.xml` | Auto-generated | — |
| `/robots.txt` | Allow all | — |

### SEO Implementation
```tsx
// generateMetadata for /passport/[country]:
export async function generateMetadata({ params }) {
  const country = getCountryBySlug(params.country);
  const visaFreeCount = getVisaFreeCount(country.code);
  return {
    title: `${country.name} Passport Visa Requirements 2025 — ${visaFreeCount} Visa-Free Countries | VisaCheckerNow`,
    description: `${country.name} passport holders can visit ${visaFreeCount} countries visa-free. Check complete visa requirements for all 195 destinations with ${country.name} ${country.flag_emoji} passport.`,
    alternates: {
      canonical: `https://visacheckernow.com/passport/${params.country}`,
      languages: {
        'en': `/en/passport/${params.country}`,
        'ko': `/ko/passport/${params.country}`,
        'ja': `/ja/passport/${params.country}`,
        'zh': `/zh/passport/${params.country}`,
        'es': `/es/passport/${params.country}`,
        'fr': `/fr/passport/${params.country}`,
        'de': `/de/passport/${params.country}`,
        'pt': `/pt/passport/${params.country}`,
      }
    },
    openGraph: {
      title: `${country.flag_emoji} ${country.name} Passport — ${visaFreeCount} Visa-Free Countries`,
      description: `Complete visa requirements for ${country.name} passport. Updated 2025.`,
      type: 'website',
    }
  }
}
```

```tsx
// generateMetadata for /visa/[passport]-to-[destination]:
export async function generateMetadata({ params }) {
  const [passportSlug, destSlug] = params.pair.split('-to-');
  const passport = getCountryBySlug(passportSlug);
  const dest = getCountryBySlug(destSlug);
  const req = getVisaRequirement(passport.code, dest.code);
  const statusText = VISA_STATUS_LABELS[req.status];
  return {
    title: `${passport.name} to ${dest.name} Visa Requirements 2025 — ${statusText} | VisaCheckerNow`,
    description: `Do ${passport.name} passport holders need a visa for ${dest.name}? ${statusText}. ${req.notes || ''} Full requirements, stay limits, and application info.`,
  }
}
```

### Schema.org JSON-LD
```json
// Passport page — Dataset:
{
  "@context": "https://schema.org",
  "@type": "Dataset",
  "name": "US Passport Visa Requirements 2025",
  "description": "Complete list of visa requirements for US passport holders traveling to 195 countries",
  "url": "https://visacheckernow.com/passport/united-states",
  "temporalCoverage": "2025",
  "keywords": ["US passport", "visa requirements", "visa-free countries", "travel requirements"],
  "creator": { "@type": "Organization", "name": "VisaCheckerNow" }
}

// Pair page — FAQPage:
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Do US citizens need a visa for Japan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. US passport holders can visit Japan visa-free for up to 90 days per visit for tourism and business purposes."
      }
    }
  ]
}

// Homepage — WebApplication + BreadcrumbList
// Ranking page — ItemList
```

### Sitemap Strategy
```ts
// Build-time SSG: top 500 pairs + all 195 passport pages + all 195 destination pages
// ISR (revalidate: 86400): remaining ~37,500 pair pages
// Sitemap covers all ~38,000 URLs (include even ISR ones — they'll be indexed when crawled)
// Priority: pair pages = 0.8, passport/destination = 0.9, homepage = 1.0
```

---

## UI/UX Guidelines

### Color Palette (Soft Pastel — Global/Travel)
```css
--bg-primary:       #f5f0ff;   /* soft lavender — world/travel feeling */
--bg-card:          #ffffff;
--bg-accent:        #ede9fe;   /* light purple */
--status-free:      #d1fae5;   /* green — visa free */
--status-free-text: #065f46;
--status-voa:       #dbeafe;   /* blue — visa on arrival */
--status-voa-text:  #1e40af;
--status-evisa:     #fef3c7;   /* yellow — eVisa */
--status-evisa-text:#92400e;
--status-required:  #fecaca;   /* red — visa required */
--status-required-text: #991b1b;
--status-banned:    #e5e7eb;   /* gray — banned/refused */
--status-banned-text: #374151;
--text-primary:     #2d1b69;
--text-secondary:   #6b7280;
--border:           #ede9fe;
```

### Homepage Layout
```
┌─────────────────────────────────────────────┐
│  Nav: Logo | Passports | Destinations | Rank | Compare | Lang
├─────────────────────────────────────────────┤
│  "Check Visa Requirements"                   │
│  ┌─────────────────────────────────────────┐ │
│  │ I have a [🇺🇸 United States ▾] passport │ │
│  │ I want to visit [🇯🇵 Japan ▾]           │ │
│  │         [Check Visa Requirements →]     │ │
│  └─────────────────────────────────────────┘ │
├─────────────────────────────────────────────┤
│  [Adsterra Native Banner]                    │
├─────────────────────────────────────────────┤
│  🏆 Passport Power Ranking (top 10)          │
│  1. 🇯🇵 Japan — 194 countries               │
│  2. 🇩🇪 Germany — 193 countries             │
│  ...                                         │
├─────────────────────────────────────────────┤
│  Popular Passport Pages                      │
│  [🇺🇸 US] [🇮🇳 India] [🇨🇳 China] [🇬🇧 UK] │
├─────────────────────────────────────────────┤
│  [Adsterra Display Banner]                   │
├─────────────────────────────────────────────┤
│  Footer: Visitor counter | Disclaimer        │
└─────────────────────────────────────────────┘
```

### Passport Page Layout (`/passport/united-states`)
```
Header: 🇺🇸 United States Passport — 186 Visa-Free Countries
Sub: Power Rank: #7 worldwide

Filter tabs: [All] [Visa Free] [Visa on Arrival] [eVisa] [Visa Required]
Search: Filter by destination country name

Country grid/table:
| Flag | Country | Status | Duration | Details |
| 🇯🇵 | Japan | 🟢 Visa Free | 90 days | → |
| 🇨🇳 | China | 🔴 Visa Required | — | → |
| 🇹🇭 | Thailand | 🟢 Visa Free | 30 days | → |

Stats sidebar:
  Visa Free: 186
  Visa on Arrival: 25
  eVisa: 30
  Visa Required: 45
  Restricted: 5
```

### Pair Page Layout (`/visa/united-states-to-japan`)
```
🇺🇸 → 🇯🇵  United States to Japan

Result: ✅ VISA FREE
Duration: 90 days per visit
Valid for: Tourism, Business, Transit
Source: Japan Ministry of Foreign Affairs

Details box:
  - Entry requirements
  - Validity
  - Extension possible?
  - Embassy contact link

Related pairs: US to South Korea | US to China | US to Thailand
```

### Key Components
```
components/
  PassportSelector.tsx         — country dropdown (searchable, with flags)
  DestinationSelector.tsx      — same, for destination
  VisaStatusBadge.tsx          — color-coded status pill
  VisaRequirementCard.tsx      — detailed pair result card
  CountryTable.tsx             — sortable/filterable table for passport/dest pages
  PowerRankingTable.tsx        — passport ranking leaderboard
  CompareTable.tsx             — 2-passport side-by-side
  CountrySearch.tsx            — Fuse.js client search
  RegionFilter.tsx             — filter by continent/region
  StayDurationBadge.tsx        — "90 days" etc.
  PassportCard.tsx             — country summary card with flag + visa-free count
  VisitorCounter.tsx
  LanguageSwitcher.tsx
  Breadcrumb.tsx
  SchemaLD.tsx
  AdPlaceholder.tsx
```

---

## i18n Requirements

**Languages:** en, ko, ja, zh, es, fr, de, pt

### Translation Keys
```json
{
  "nav.home": "Home",
  "nav.passports": "Passports",
  "nav.destinations": "Destinations",
  "nav.ranking": "Passport Ranking",
  "nav.compare": "Compare",
  "hero.title": "Visa Requirements Checker",
  "hero.subtitle": "Check visa requirements for any passport and destination",
  "hero.passport": "I have a",
  "hero.passport.suffix": "passport",
  "hero.destination": "I want to visit",
  "hero.check": "Check Requirements",
  "status.visa_free": "Visa Free",
  "status.visa_on_arrival": "Visa on Arrival",
  "status.evisa": "eVisa Available",
  "status.visa_required": "Visa Required",
  "status.banned": "Entry Restricted",
  "status.admission_refused": "Admission Refused",
  "filter.all": "All",
  "filter.visaFree": "Visa Free",
  "filter.voa": "Visa on Arrival",
  "filter.evisa": "eVisa",
  "filter.required": "Visa Required",
  "table.country": "Country",
  "table.status": "Status",
  "table.duration": "Stay Duration",
  "table.details": "Details",
  "passport.visaFreeCount": "Visa-Free Countries",
  "passport.powerRank": "Passport Power Rank",
  "passport.worldwide": "worldwide",
  "days": "days",
  "ranking.title": "Passport Power Ranking 2025",
  "ranking.visaFree": "Visa-free countries",
  "compare.title": "Compare Passports",
  "compare.vs": "vs",
  "compare.advantage": "Better Access",
  "compare.equal": "Equal Access",
  "pair.result": "Visa Requirement",
  "pair.duration": "Allowed Stay",
  "pair.notes": "Important Notes",
  "pair.relatedPairs": "Related Searches",
  "footer.visitorToday": "Visitors today",
  "footer.visitorTotal": "Total visitors",
  "footer.disclaimer": "Visa information is for reference only. Always verify with official embassy sources before travel. Requirements change frequently.",
  "footer.dataUpdated": "Data last updated"
}
```

---

## Ad Integration (Adsterra)

```jsx
// app/[locale]/layout.tsx — Social Bar
// TODO: Add when Adsterra key received
// <Script src={socialBarUrl} strategy="afterInteractive" />

// Homepage — Native Banner (between ranking and popular passports)
<section className="my-6 container mx-auto px-4">
  <div id="adsterra-native">
    {/* TODO: Add Adsterra Native Banner code when key received */}
    <div className="border-2 border-dashed border-violet-200 rounded-xl p-6 text-center text-violet-300 text-sm bg-violet-50">
      [Adsterra Native Banner — travel/visa context]
    </div>
  </div>
</section>

// Passport page — Display Banner (between filter tabs and country table)
<div id="adsterra-display" className="my-6 flex justify-center">
  {/* TODO: Add Adsterra Display Banner when key received */}
  <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center text-gray-300 w-full max-w-3xl text-sm">
    [Adsterra Display — 728×90 / 320×50]
  </div>
</div>

// Pair detail page — Native Banner (between result card and related pairs)
// Use same AdsterraNativeBanner component
```

---

## Google Sheets Webhook

### Tracked Events
- `page_view` — every route (include page type and country codes)
- `passport_select` — user selects a passport on homepage
- `destination_select` — user selects a destination
- `visa_check` — "Check Requirements" button clicked (log passport+destination pair)
- `filter_apply` — filter tab clicked on passport/destination page
- `compare_start` — compare page loaded (log two country codes)
- `pair_page_view` — specific pair page loaded (high-value SEO event)
- `language_switch`
- `country_search` — search query used (log search term)

### Apps Script
```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName('Events') || SpreadsheetApp.getActiveSpreadsheet().insertSheet('Events');
  const data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    new Date(), data.event_type, data.page,
    data.locale, data.detail, data.passport, data.destination, data.referrer
  ]);
  return ContentService.createTextOutput('OK');
}
```

---

## Visitor Counter

```ts
// lib/visitorCounter.ts
export async function trackVisitor() {
  if (typeof window === 'undefined') return { today: 0, total: 0 };
  const key = new Date().toISOString().slice(0, 10);
  const data = JSON.parse(localStorage.getItem('vcn_v') || '{}');
  const today = data.date === key ? data.count + 1 : 1;
  localStorage.setItem('vcn_v', JSON.stringify({ date: key, count: today }));
  const res = await fetch('/api/visitor', { method: 'POST' }).catch(() => null);
  const total = res ? (await res.json()).total : 0;
  return { today, total };
}
```

Footer:
```jsx
<div className="text-xs text-purple-300 text-center py-2">
  {t('footer.visitorToday')}: <strong>{today.toLocaleString()}</strong>
  {' · '}
  {t('footer.visitorTotal')}: <strong>{total.toLocaleString()}</strong>
</div>
```

---

## Milestones

### M1 — Project Scaffold (Day 1)
**Tasks:**
- [ ] `gh repo create taeshin11/visa-checker-now --public --clone`
- [ ] `npx create-next-app@latest . --typescript --tailwind --app`
- [ ] `npm install next-intl lucide-react fuse.js`
- [ ] Create `feature_list.json`, `claude-progress.txt`, `init.sh`
- [ ] Create `research_history/` + `M1-scaffold.md`
- [ ] Configure Tailwind with lavender pastel palette + status colors
- [ ] Create base `app/layout.tsx`
- [ ] Create `.env.local.example`

**Commit:** `M1: scaffold — Next.js 14, Tailwind lavender palette, next-intl, fuse.js`
```bash
git add -A && git commit -m "M1: scaffold — Next.js 14, Tailwind lavender palette, next-intl, fuse.js" && git push origin main
```

---

### M2 — Data Layer (Day 2)
**Tasks:**
- [ ] Create `data/countries.json` — all 195 countries with metadata
- [ ] Create `data/visa-matrix.json` — full visa requirement matrix
  - Start with top 50 passport countries × all 195 destinations
  - Stub remaining with `visa_required` as conservative fallback
- [ ] Create `data/passport-rankings.json` — Henley-style rankings
- [ ] Create `data/top-pairs.json` — top 500 pairs for SSG
- [ ] Create `lib/countries.ts` — helpers: getBySlug, getByCode, getVisaFreeCount
- [ ] Create `lib/matrix.ts` — getRequirement, getTopDestinations, getTopPassports
- [ ] Create `lib/rankings.ts` — compute and sort passport rankings
- [ ] Write TypeScript types: `types/country.ts`, `types/visa.ts`
- [ ] Create `app/api/visitor/route.ts`
- [ ] Log to `research_history/M2-data.md`

**Commit:** `M2: data layer — visa matrix, 195 countries, rankings, TypeScript types`
```bash
git add -A && git commit -m "M2: data layer — visa matrix, 195 countries, rankings, TypeScript types" && git push origin main
```

---

### M3 — Homepage & Passport Pages (Day 3)
**Tasks:**
- [ ] Build `app/[locale]/page.tsx` — homepage with passport/destination selectors
- [ ] Build `PassportSelector.tsx` + `DestinationSelector.tsx` (searchable dropdowns with flags)
- [ ] Build `PowerRankingTable.tsx` — top 10 passports leaderboard
- [ ] Build `app/[locale]/passport/[country]/page.tsx` — passport detail
- [ ] Build `CountryTable.tsx` — sortable, filterable with status badges
- [ ] Build `VisaStatusBadge.tsx` — color-coded pills
- [ ] Build `PassportCard.tsx`
- [ ] Create all 8 locale message files
- [ ] Implement `LanguageSwitcher.tsx`, `VisitorCounter.tsx`
- [ ] Add Adsterra placeholder divs
- [ ] Wire Google Sheets webhook
- [ ] Log to `research_history/M3-homepage-passport.md`

**Commit:** `M3: homepage, passport pages, country table, status badges, i18n`
```bash
git add -A && git commit -m "M3: homepage, passport pages, country table, status badges, i18n" && git push origin main
```

---

### M4 — Destination Pages & Pair Pages (Day 4)
**Tasks:**
- [ ] Build `app/[locale]/destination/[country]/page.tsx` — who can visit
- [ ] Build `app/[locale]/visa/[pair]/page.tsx` — specific pair detail
  - Parse `[passport]-to-[destination]` slug
  - `generateStaticParams` for top 500 pairs only
  - `export const dynamicParams = true` for ISR on remaining pairs
  - `export const revalidate = 86400`
- [ ] Build `VisaRequirementCard.tsx` — detailed result display
- [ ] Build `RegionFilter.tsx` — filter by continent
- [ ] Add `generateMetadata()` + hreflang to all pages
- [ ] Log to `research_history/M4-destination-pair.md`

**Commit:** `M4: destination pages, pair detail pages, ISR for long-tail pairs`
```bash
git add -A && git commit -m "M4: destination pages, pair detail pages, ISR for long-tail pairs" && git push origin main
```

---

### M5 — Compare, Ranking & SEO (Day 5)
**Tasks:**
- [ ] Build `/ranking` page — full passport power ranking
- [ ] Build `/compare/[a]-vs-[b]` — side-by-side passport comparison
- [ ] Build `CompareTable.tsx` — shows all destinations, highlights differences
- [ ] Build `/visa-free` — visa-free travel guide page
- [ ] Add Schema.org JSON-LD to all page types (Dataset, FAQPage, BreadcrumbList, ItemList)
- [ ] Generate `app/sitemap.ts` — covers all routes
- [ ] Create `app/robots.ts`
- [ ] Add "Related pairs" section to pair pages
- [ ] Log to `research_history/M5-compare-seo.md`

**Commit:** `M5: compare tool, passport ranking, full SEO — schema, sitemap, hreflang`
```bash
git add -A && git commit -m "M5: compare tool, passport ranking, full SEO — schema, sitemap, hreflang" && git push origin main
```

---

### M6 — Deploy & QA (Day 6)
**Tasks:**
- [ ] `npx vercel --prod`
- [ ] Test passport selector on homepage (submits to correct pair page)
- [ ] Test US→Japan pair page loads with correct visa-free info
- [ ] Test India→US pair page
- [ ] Verify ISR works for non-pre-generated pairs
- [ ] Test all 8 locales
- [ ] Verify sitemap.xml (spot check 100 URLs)
- [ ] Validate Schema.org JSON-LD
- [ ] Verify visitor counter + Google Sheets webhook
- [ ] Check Lighthouse score > 85
- [ ] Log to `research_history/M6-deploy.md`

**Commit:** `M6: production deploy — Vercel, QA complete`
```bash
git add -A && git commit -m "M6: production deploy — Vercel, QA complete" && git push origin main
```

---

## File Structure

```
visa-checker-now/
├── app/
│   ├── [locale]/
│   │   ├── page.tsx                    # Homepage — selector + ranking
│   │   ├── passport/
│   │   │   ├── page.tsx                # All passports index
│   │   │   └── [country]/
│   │   │       └── page.tsx            # Passport detail (SSG all 195)
│   │   ├── destination/
│   │   │   ├── page.tsx                # All destinations index
│   │   │   └── [country]/
│   │   │       └── page.tsx            # Destination detail (SSG all 195)
│   │   ├── visa/
│   │   │   └── [pair]/
│   │   │       └── page.tsx            # Pair detail — ISR (top 500 SSG + rest ISR)
│   │   ├── compare/
│   │   │   └── [pair]/
│   │   │       └── page.tsx            # Compare [a]-vs-[b]
│   │   ├── ranking/
│   │   │   └── page.tsx
│   │   └── visa-free/
│   │       └── page.tsx
│   ├── api/
│   │   └── visitor/
│   │       └── route.ts
│   ├── layout.tsx
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── PassportSelector.tsx
│   ├── DestinationSelector.tsx
│   ├── VisaStatusBadge.tsx
│   ├── VisaRequirementCard.tsx
│   ├── CountryTable.tsx
│   ├── PowerRankingTable.tsx
│   ├── CompareTable.tsx
│   ├── CountrySearch.tsx
│   ├── RegionFilter.tsx
│   ├── StayDurationBadge.tsx
│   ├── PassportCard.tsx
│   ├── VisitorCounter.tsx
│   ├── LanguageSwitcher.tsx
│   ├── Breadcrumb.tsx
│   ├── SchemaLD.tsx
│   └── ads/
│       ├── AdsterraSocialBar.tsx
│       ├── AdsterraNativeBanner.tsx
│       └── AdsterraDisplay.tsx
├── lib/
│   ├── countries.ts
│   ├── matrix.ts
│   ├── rankings.ts
│   ├── analytics.ts
│   └── visitorCounter.ts
├── types/
│   ├── country.ts
│   └── visa.ts
├── data/
│   ├── countries.json
│   ├── visa-matrix.json
│   ├── passport-rankings.json
│   └── top-pairs.json
├── messages/
│   ├── en.json
│   ├── ko.json
│   ├── ja.json
│   ├── zh.json
│   ├── es.json
│   ├── fr.json
│   ├── de.json
│   └── pt.json
├── research_history/
│   ├── M1-scaffold.md
│   ├── M2-data.md
│   ├── M3-homepage-passport.md
│   ├── M4-destination-pair.md
│   ├── M5-compare-seo.md
│   └── M6-deploy.md
├── feature_list.json
├── claude-progress.txt
├── init.sh
├── .env.local.example
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Harness Files Spec

### `feature_list.json`
```json
{
  "project": "visa-checker-now",
  "version": "1.0.0",
  "features": [
    { "id": "F01", "name": "Homepage passport selector", "priority": "P0", "status": "TODO", "milestone": "M3" },
    { "id": "F02", "name": "Passport detail pages", "priority": "P0", "status": "TODO", "milestone": "M3" },
    { "id": "F03", "name": "Destination detail pages", "priority": "P0", "status": "TODO", "milestone": "M4" },
    { "id": "F04", "name": "Visa pair pages", "priority": "P0", "status": "TODO", "milestone": "M4" },
    { "id": "F05", "name": "Compare pages", "priority": "P0", "status": "TODO", "milestone": "M5" },
    { "id": "F06", "name": "Visa status categories + colors", "priority": "P0", "status": "TODO", "milestone": "M3" },
    { "id": "F07", "name": "Passport power ranking", "priority": "P0", "status": "TODO", "milestone": "M5" },
    { "id": "F08", "name": "Country search (Fuse.js)", "priority": "P0", "status": "TODO", "milestone": "M3" },
    { "id": "F09", "name": "Visa status filter tabs", "priority": "P1", "status": "TODO", "milestone": "M3" },
    { "id": "F10", "name": "Stay duration display", "priority": "P0", "status": "TODO", "milestone": "M3" },
    { "id": "F11", "name": "Visitor counter", "priority": "P0", "status": "TODO", "milestone": "M3" },
    { "id": "F12", "name": "i18n 8 languages", "priority": "P0", "status": "TODO", "milestone": "M3" },
    { "id": "F13", "name": "Google Sheets webhook", "priority": "P0", "status": "TODO", "milestone": "M3" },
    { "id": "F14", "name": "Adsterra ads", "priority": "P0", "status": "TODO", "milestone": "M3" },
    { "id": "F15", "name": "Schema.org JSON-LD", "priority": "P0", "status": "TODO", "milestone": "M5" },
    { "id": "F16", "name": "Sitemap + robots.txt", "priority": "P0", "status": "TODO", "milestone": "M5" },
    { "id": "F17", "name": "hreflang tags", "priority": "P0", "status": "TODO", "milestone": "M5" },
    { "id": "F18", "name": "research_history logs", "priority": "P0", "status": "TODO", "milestone": "M1" },
    { "id": "F19", "name": "Passport power index", "priority": "P1", "status": "TODO", "milestone": "M5" },
    { "id": "F20", "name": "Regional grouping filter", "priority": "P1", "status": "TODO", "milestone": "M4" },
    { "id": "F21", "name": "Popular destinations quick links", "priority": "P1", "status": "TODO", "milestone": "M3" },
    { "id": "F22", "name": "Currency + timezone info", "priority": "P2", "status": "TODO", "milestone": "M6" }
  ]
}
```

### `claude-progress.txt`
```
# VisaCheckerNow — Claude Progress Log
# Format: [TIMESTAMP] [MILESTONE] [STATUS] [NOTES]
# Statuses: STARTED | IN_PROGRESS | COMPLETE | BLOCKED

[START] Project initialized
```

### `init.sh`
```bash
#!/usr/bin/env bash
set -e

echo "=== VisaCheckerNow Init Script ==="

gh repo create taeshin11/visa-checker-now --public --clone || echo "Repo may already exist"
npm install
cp .env.local.example .env.local || true
mkdir -p research_history data

git add -A
git commit -m "M1: scaffold — Next.js 14, Tailwind lavender palette, next-intl, fuse.js" || true
git push origin main || true

echo "=== Init complete ==="
echo "Steps:"
echo "  1. Deploy Google Apps Script webhook, add URL to .env.local"
echo "  2. Run: npx vercel --prod"
echo ""
echo "Note: The visa-matrix.json is the most critical data file."
echo "  Start with top 50 passports × 195 destinations = 9,750 entries"
```

---

## Additional Notes for Claude Code

1. **Pair page slug format:** `/visa/[passport-slug]-to-[destination-slug]`
   - Example: `/visa/united-states-to-japan`
   - Parser: `const [passportSlug, , destSlug] = params.pair.split('-to-')` — Wait, this fails if country names contain "to". Use a different separator or split on first occurrence of `-to-`.
   - **Recommended:** Split on first `-to-` occurrence: `const idx = params.pair.indexOf('-to-'); const passportSlug = params.pair.slice(0, idx); const destSlug = params.pair.slice(idx + 4);`

2. **Compare page slug format:** `/compare/[country-a-slug]-vs-[country-b-slug]`
   - Same split logic using `-vs-`

3. **Country code to slug mapping:** All lowercase, spaces→hyphens. Special cases:
   - "United States" → "united-states"
   - "South Korea" → "south-korea"
   - "United Arab Emirates" → "united-arab-emirates"
   - Keep consistent throughout all data files.

4. **Build time optimization:** With 195 passport pages × 8 locales = 1,560 SSG pages at build time. This is acceptable. The 38,000 pair pages should use ISR, not SSG at build time.

5. **Visa matrix data bootstrapping:** Start with this known data for the top 10 passport countries:
   - Japan (JP): 194 visa-free destinations
   - Germany (DE): 193
   - Spain/Italy/Finland/Luxembourg/Sweden (ES/IT/FI/LU/SE): 192
   - Fill the full matrix using Wikipedia "Visa requirements for citizens of [country]" tables — these are freely available and regularly maintained.

6. **Flag display:** Use country flag emoji directly (all major browsers support them). Format: The flag emoji for country code XX is derived from regional indicator symbols U+1F1E6-U+1F1FF. Alternatively use the `country-flag-emoji` npm package.

7. **Privacy disclaimer:** Visa requirements change frequently (conflicts, diplomacy, COVID, etc.). Always display: "This information is for reference only and may be outdated. Always verify with the official embassy or consulate of your destination country before traveling." This is legally important.

8. **Top 20 most searched pairs (pre-generate these first):**
   US→MX, US→CA, US→GB, US→FR, US→IT, US→JP, US→AU, US→DE, US→ES, US→TH,
   IN→US, IN→GB, IN→AE, IN→CA, IN→AU, IN→SG, IN→TH, IN→DE, IN→FR, IN→JP,
   CN→US, CN→JP, CN→GB, CN→DE, CN→FR, CN→AU, CN→CA, CN→TH, CN→AE, CN→SG

9. **Passport selector UX:** On homepage, both dropdowns should be fully searchable. When user selects both passport and destination and clicks "Check", navigate to `/visa/[passport-slug]-to-[destination-slug]`. If only passport selected, navigate to `/passport/[slug]`. Pre-populate from URL params if returning to homepage.
