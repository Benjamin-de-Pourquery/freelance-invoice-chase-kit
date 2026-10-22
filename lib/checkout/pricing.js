/** Pack product id stored on Checkout Session metadata for server-side verification. */
export const PACK_PRODUCT_ID = "freelance_invoice_chase_kit";

/** Supported checkout currencies (lowercase ISO codes). */
export const PACK_CURRENCIES = ["eur", "usd", "gbp"];

/**
 * Proposed one-time prices (minor units). Change here after owner approval.
 * EUR 19, USD 21, GBP 17.
 */
export const PACK_PRICES = {
  eur: { currency: "eur", unitAmount: 1900 },
  usd: { currency: "usd", unitAmount: 2100 },
  gbp: { currency: "gbp", unitAmount: 1700 },
};

export function normalizeCurrency(value) {
  if (!value || typeof value !== "string") return null;
  const c = value.trim().toLowerCase();
  return PACK_CURRENCIES.includes(c) ? c : null;
}

export function getPackPrice(currency) {
  const key = normalizeCurrency(currency);
  return key ? PACK_PRICES[key] : null;
}

/**
 * @param {"fr"|"en"} lang
 */
export function formatPackPrice(currency, lang = "en") {
  const price = getPackPrice(currency);
  if (!price) return "";
  const major = price.unitAmount / 100;
  const key = price.currency;
  if (key === "eur") {
    return lang === "fr" ? `${major} €` : `€${major}`;
  }
  if (key === "usd") {
    return `$${major}`;
  }
  if (key === "gbp") {
    return `£${major}`;
  }
  return `${major} ${key.toUpperCase()}`;
}

export function formatPackPriceLabel(currency, lang = "en") {
  const formatted = formatPackPrice(currency, lang);
  if (!formatted) return "";
  if (lang === "fr") {
    return `${formatted} TTC`;
  }
  return formatted;
}

export function productDisplayName(lang) {
  return lang === "fr"
    ? "Kit Relance Impayés Freelance"
    : "Freelancer Overdue Invoice Kit";
}
