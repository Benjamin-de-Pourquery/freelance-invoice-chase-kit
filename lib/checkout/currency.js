import { PACK_CURRENCIES } from "./pricing.js";

export const PACK_CURRENCY_STORAGE_KEY = "pack_checkout_currency";

/**
 * Resolve default checkout currency from page context (no browser APIs).
 * @param {{ lang: "fr"|"en", preferGbp?: boolean, browserLocales?: string[] }} options
 */
export function resolveDefaultCurrency({ lang, preferGbp = false, browserLocales = [] }) {
  if (preferGbp) return "gbp";
  if (lang === "fr") return "eur";
  for (const locale of browserLocales) {
    if (typeof locale === "string" && locale.toLowerCase().startsWith("en-gb")) {
      return "gbp";
    }
  }
  return "usd";
}

export function isValidStoredCurrency(value) {
  return typeof value === "string" && PACK_CURRENCIES.includes(value.toLowerCase());
}

export function readStoredCurrency() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(PACK_CURRENCY_STORAGE_KEY);
    return isValidStoredCurrency(raw) ? raw.toLowerCase() : null;
  } catch {
    return null;
  }
}

export function writeStoredCurrency(currency) {
  if (typeof window === "undefined") return;
  const key = typeof currency === "string" ? currency.toLowerCase() : "";
  if (!PACK_CURRENCIES.includes(key)) return;
  try {
    window.localStorage.setItem(PACK_CURRENCY_STORAGE_KEY, key);
  } catch {
    /* ignore quota / private mode */
  }
}

export function currencySelectorLabels(lang) {
  if (lang === "fr") {
    return {
      legend: "Devise de paiement",
      eur: "Euro (EUR)",
      usd: "Dollar US (USD)",
      gbp: "Livre sterling (GBP)",
    };
  }
  return {
    legend: "Payment currency",
    eur: "Euro (EUR)",
    usd: "US dollar (USD)",
    gbp: "Pound sterling (GBP)",
  };
}
