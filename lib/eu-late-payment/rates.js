import { YOUR_EUROPE_LATE_PAYMENT_URL } from "./sources.js";

/**
 * Statutory B2B late-payment interest period covered by this tool.
 * Verified on Your Europe: 2026-10-17.
 */
export const STATUTORY_RATE_PERIOD = {
  start: "2026-07-01",
  end: "2026-12-31",
  sourceUrl: YOUR_EUROPE_LATE_PAYMENT_URL,
  labelEn: "July to December 2026",
  labelFr: "juillet à décembre 2026",
};

/**
 * Annual statutory rates (% per year) for the period above.
 * Poland is split into health sector vs other public sectors per Your Europe.
 * @type {Record<string, { ratePercent: number, labelEn: string, labelFr: string }>}
 */
export const EU_COUNTRY_RATES = {
  austria: { ratePercent: 10.73, labelEn: "Austria", labelFr: "Autriche" },
  belgium: { ratePercent: 10.5, labelEn: "Belgium", labelFr: "Belgique" },
  bulgaria: { ratePercent: 10.15, labelEn: "Bulgaria", labelFr: "Bulgarie" },
  croatia: { ratePercent: 10.15, labelEn: "Croatia", labelFr: "Croatie" },
  cyprus: { ratePercent: 10.15, labelEn: "Cyprus", labelFr: "Chypre" },
  czechia: { ratePercent: 11.75, labelEn: "Czechia", labelFr: "Tchéquie" },
  denmark: { ratePercent: 10.0, labelEn: "Denmark", labelFr: "Danemark" },
  estonia: { ratePercent: 10.4, labelEn: "Estonia", labelFr: "Estonie" },
  finland: { ratePercent: 10.5, labelEn: "Finland", labelFr: "Finlande" },
  france: { ratePercent: 12.4, labelEn: "France", labelFr: "France" },
  germany: { ratePercent: 10.52, labelEn: "Germany", labelFr: "Allemagne" },
  greece: { ratePercent: 10.15, labelEn: "Greece", labelFr: "Grèce" },
  hungary: { ratePercent: 14.0, labelEn: "Hungary", labelFr: "Hongrie" },
  ireland: { ratePercent: 10.4, labelEn: "Ireland", labelFr: "Irlande" },
  italy: { ratePercent: 10.15, labelEn: "Italy", labelFr: "Italie" },
  latvia: { ratePercent: 10.4, labelEn: "Latvia", labelFr: "Lettonie" },
  lithuania: { ratePercent: 10.15, labelEn: "Lithuania", labelFr: "Lituanie" },
  luxembourg: { ratePercent: 10.15, labelEn: "Luxembourg", labelFr: "Luxembourg" },
  malta: { ratePercent: 10.4, labelEn: "Malta", labelFr: "Malte" },
  netherlands: { ratePercent: 10.15, labelEn: "Netherlands", labelFr: "Pays-Bas" },
  poland: {
    ratePercent: null,
    labelEn: "Poland",
    labelFr: "Pologne",
  },
  poland_health: {
    ratePercent: 11.75,
    labelEn: "Poland (health sector)",
    labelFr: "Pologne (secteur de la santé)",
  },
  poland_other_public: {
    ratePercent: 13.75,
    labelEn: "Poland (other public sectors)",
    labelFr: "Pologne (autres secteurs publics)",
  },
  portugal: { ratePercent: 10.15, labelEn: "Portugal", labelFr: "Portugal" },
  romania: { ratePercent: 14.5, labelEn: "Romania", labelFr: "Roumanie" },
  slovakia: { ratePercent: 10.15, labelEn: "Slovakia", labelFr: "Slovaquie" },
  slovenia: { ratePercent: 10.4, labelEn: "Slovenia", labelFr: "Slovénie" },
  spain: { ratePercent: 10.4, labelEn: "Spain", labelFr: "Espagne" },
  sweden: { ratePercent: 10.0, labelEn: "Sweden", labelFr: "Suède" },
};

/** @type {string[]} */
export const EU_COUNTRY_KEYS = Object.keys(EU_COUNTRY_RATES);
