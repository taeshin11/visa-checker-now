import { MetadataRoute } from "next";
import { PASSPORT_CODES, DESTINATION_CODES } from "@/lib/data";

const BASE_URL = "https://visa-checker-now.vercel.app";
const LOCALES = ["en", "es", "fr", "de", "ja", "ko", "pt", "zh"];

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [];

  // Homepage per locale
  for (const locale of LOCALES) {
    urls.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    });
  }

  // Passport pages
  for (const locale of LOCALES) {
    urls.push({
      url: `${BASE_URL}/${locale}/passports`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    });
    for (const code of PASSPORT_CODES) {
      urls.push({
        url: `${BASE_URL}/${locale}/passports/${code}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  // Destination pages
  for (const locale of LOCALES) {
    urls.push({
      url: `${BASE_URL}/${locale}/destinations`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    });
    for (const code of DESTINATION_CODES) {
      urls.push({
        url: `${BASE_URL}/${locale}/destinations/${code}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  // Rankings page
  for (const locale of LOCALES) {
    urls.push({
      url: `${BASE_URL}/${locale}/rankings`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  // Content pages
  const contentPages = ["about", "how-to-use", "privacy", "terms"];
  for (const locale of LOCALES) {
    for (const page of contentPages) {
      urls.push({
        url: `${BASE_URL}/${locale}/${page}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  // Guide pages
  const guideTypes = ["tourist", "business", "student", "working-holiday"];
  for (const locale of LOCALES) {
    for (const type of guideTypes) {
      urls.push({
        url: `${BASE_URL}/${locale}/guide/${type}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  // Check pages (passport × destination pairs) — only en locale for SEO
  for (const passport of PASSPORT_CODES) {
    for (const destination of DESTINATION_CODES) {
      urls.push({
        url: `${BASE_URL}/en/check/${passport}/${destination}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return urls;
}
