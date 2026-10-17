import { SOURCES } from "./sources.js";
import { EU_COUNTRY_KEYS, EU_COUNTRY_RATES, STATUTORY_RATE_PERIOD } from "./rates.js";

const sourceLabelsFr = {
  your_europe: "Your Europe : intérêts de retard et délais de paiement (UE)",
};

const sourceLabelsEn = {
  your_europe: "Your Europe: late payment and payment periods (EU)",
};

function countryOptions(lang) {
  return EU_COUNTRY_KEYS.map((key) => ({
    key,
    label:
      lang === "fr" ? EU_COUNTRY_RATES[key].labelFr : EU_COUNTRY_RATES[key].labelEn,
  }));
}

export const euPenaltyCopy = {
  fr: {
    lang: "fr",
    homeHref: "/",
    otherLangHref: "/en/eu-late-payment-calculator",
    otherLangLabel: "EN",
    badge: "Outil gratuit · Intérêts de retard UE",
    metaTitle: "Calculateur intérêts de retard UE (B2B multi-pays)",
    metaDesc:
      "Estime les intérêts de retard et l'indemnité forfaitaire d'environ 40 € selon Your Europe. Taux légaux juil. déc. 2026. Gratuit, sans compte.",
    title: "Calculateur d'intérêts de retard UE",
    lead:
      "Estime les intérêts de retard et l'indemnité forfaitaire pour une facture B2B dans l'UE, à partir du pays du débiteur, du montant TTC et des dates.",
    disclaimer:
      "Information uniquement, pas un conseil juridique. Les taux et règles nationales évoluent : vérifie sur Your Europe et les sources nationales avant d'envoyer une relance.",
    crossBorderNote:
      "Contrat transfrontalier : la loi choisie au contrat s'applique ; à défaut, la loi du pays du créancier (Rome I). Ce calculateur utilise le taux légal du pays sélectionné à titre indicatif.",
    periodNote: `Taux légaux préchargés pour la période du ${STATUTORY_RATE_PERIOD.labelFr} (Your Europe).`,
    sectionInputs: "Données de la facture",
    countryLabel: "Pays du débiteur (taux légal de référence)",
    amountLabel: "Montant dû (TTC, €)",
    dueModeLabel: "Échéance de paiement",
    dueModes: {
      agreed: "Date d'échéance contractuelle",
      receipt_plus_30: "Pas de délai convenu : réception facture + 30 jours",
    },
    dueDateLabel: "Date d'échéance",
    invoiceReceiptLabel: "Date de réception de la facture par le client",
    invoiceReceiptHint:
      "Sans délai de paiement convenu : l'échéance est 30 jours calendaires après cette date (Your Europe).",
    effectiveDueLabel: "Échéance calculée",
    calcDateLabel: "Date de calcul",
    calcDateHint: "Par défaut : aujourd'hui",
    contractualRateLabel: "Taux annuel contractuel (%)",
    contractualRateHint:
      "Optionnel. Si vide, le taux légal du pays pour la période juil. déc. 2026 s'applique aux jours couverts par cette période.",
    debtorTypeLabel: "Type de débiteur",
    debtorTypes: {
      business: "Entreprise (B2B)",
      public_authority: "Autorité publique",
      consumer: "Consommateur (particulier)",
    },
    consumerHint:
      "Les intérêts de retard visés par ces règles européennes ne peuvent pas être réclamés auprès d'un consommateur.",
    sectionResults: "Résultat",
    daysLateLabel: "Jours de retard",
    interestDaysLabel: "Jours pris en compte pour les intérêts",
    excludedDaysLabel: "Jours hors période de taux préchargée",
    rateLabel: "Taux annuel appliqué",
    rateReasons: {
      statutory: "Taux légal Your Europe pour le pays et la période juil. déc. 2026.",
      contractual: "Taux contractuel saisi.",
      consumer_not_applicable: "Non applicable : débiteur consommateur.",
      excluded_outside_period: "Jours non calculés : hors période juil. déc. 2026 sans taux contractuel.",
      none: "",
    },
    warningOutsidePeriod:
      "Une partie des jours de retard est en dehors de la période juil. déc. 2026. Saisis un taux contractuel ou consulte la source nationale sur Your Europe pour ces jours. Seuls les jours dans la période sont estimés avec le taux légal.",
    interestLabel: "Intérêts de retard",
    recoveryLabel: "Indemnité forfaitaire de recouvrement (environ 40 €)",
    recoveryHint:
      "Your Europe indique environ 40 € (ou équivalent) par facture en retard ; le montant peut être plus élevé dans certains pays selon la valeur de la facture.",
    recoveryNa: "Non applicable",
    totalLabel: "Total estimé (hors principal)",
    formulaLabel: "Formule",
    breakdownTitle: "Ventilation par période",
    noPenaltiesTitle: "Aucun intérêt à cette date",
    noPenaltiesBody:
      "La date de calcul est égale ou antérieure à l'échéance : 0 jour de retard.",
    rulesNote:
      "Les intérêts courent à compter du lendemain de l'échéance. Calcul sur le montant TTC ; pas de TVA sur les intérêts (Your Europe).",
    chaseTitle: "Texte de relance (à copier)",
    copyBtn: "Copier le texte",
    copiedBtn: "Copié",
    sourcesTitle: "Source officielle",
    kitCtaTitle: "Aller plus loin",
    kitCtaBody:
      "Le Kit Relance Impayés Freelance inclut emails, courrier, checklist et tracker pour relancer sans improviser.",
    kitCtaBtn: "Voir le kit",
    sourceLabels: sourceLabelsFr,
    sources: Object.values(SOURCES),
    countryOptions: countryOptions("fr"),
    franceToolLink: "/outil-penalites-retard",
    franceToolLabel: "Calculateur détaillé France (art. L441-10)",
  },
  en: {
    lang: "en",
    homeHref: "/en",
    otherLangHref: "/outil-interets-retard-ue",
    otherLangLabel: "FR",
    badge: "Free tool · EU late-payment interest",
    metaTitle: "EU late payment interest calculator (multi-country B2B)",
    metaDesc:
      "Estimate late-payment interest and the flat recovery compensation (about €40) using Your Europe rates for Jul to Dec 2026. Free, no account.",
    title: "EU late payment interest calculator",
    lead:
      "Estimate late-payment interest and flat recovery compensation for a B2B invoice in the EU from the debtor country, amount incl. VAT, and dates.",
    disclaimer:
      "Information only, not legal advice. Rates and national rules change: check Your Europe and national sources before sending a chase email.",
    crossBorderNote:
      "Cross-border contracts: the law chosen in the contract applies; otherwise the law of the creditor's country (Rome I). This tool uses the selected country's statutory rate as a reference.",
    periodNote: `Statutory rates preloaded for ${STATUTORY_RATE_PERIOD.labelEn} (Your Europe).`,
    sectionInputs: "Invoice details",
    countryLabel: "Debtor country (reference statutory rate)",
    amountLabel: "Amount due (incl. VAT, €)",
    dueModeLabel: "Payment due date",
    dueModes: {
      agreed: "Contractual due date",
      receipt_plus_30: "No agreed term: invoice receipt + 30 calendar days",
    },
    dueDateLabel: "Due date",
    invoiceReceiptLabel: "Date the client received the invoice",
    invoiceReceiptHint:
      "With no agreed payment period, the due date is 30 calendar days after this date (Your Europe).",
    effectiveDueLabel: "Calculated due date",
    calcDateLabel: "Calculation date",
    calcDateHint: "Default: today",
    contractualRateLabel: "Contractual annual rate (%)",
    contractualRateHint:
      "Optional. If empty, the country's statutory rate for Jul to Dec 2026 applies to days inside that period only.",
    debtorTypeLabel: "Debtor type",
    debtorTypes: {
      business: "Business (B2B)",
      public_authority: "Public authority",
      consumer: "Consumer (individual)",
    },
    consumerHint:
      "Late-payment interest under these EU rules cannot be claimed from a consumer debtor.",
    sectionResults: "Result",
    daysLateLabel: "Days late",
    interestDaysLabel: "Days counted for interest",
    excludedDaysLabel: "Days outside preloaded rate period",
    rateLabel: "Annual rate applied",
    rateReasons: {
      statutory: "Your Europe statutory rate for the country and Jul to Dec 2026.",
      contractual: "Contractual rate entered.",
      consumer_not_applicable: "Not applicable: consumer debtor.",
      excluded_outside_period: "Days not calculated: outside Jul to Dec 2026 without a contractual rate.",
      none: "",
    },
    warningOutsidePeriod:
      "Some late days fall outside Jul to Dec 2026. Enter a contractual rate or check the national source on Your Europe for those days. Only in-period days are estimated with the statutory rate.",
    interestLabel: "Late-payment interest",
    recoveryLabel: "Flat recovery compensation (about €40)",
    recoveryHint:
      "Your Europe states about €40 (or equivalent) per late invoice; it may be higher in some countries depending on invoice value.",
    recoveryNa: "Not applicable",
    totalLabel: "Estimated total (excluding principal)",
    formulaLabel: "Formula",
    breakdownTitle: "Breakdown by period",
    noPenaltiesTitle: "No interest on this date",
    noPenaltiesBody:
      "The calculation date is on or before the due date: 0 days late.",
    rulesNote:
      "Interest runs from the day after the due date. Calculated on the gross amount incl. VAT; no VAT on interest (Your Europe).",
    chaseTitle: "Chase email text (copy and paste)",
    copyBtn: "Copy text",
    copiedBtn: "Copied",
    sourcesTitle: "Official source",
    kitCtaTitle: "Go further",
    kitCtaBody:
      "The Freelancer Overdue Invoice Kit includes emails, formal letter, checklist and tracker so you can chase invoices without winging it.",
    kitCtaBtn: "See the kit",
    sourceLabels: sourceLabelsEn,
    sources: Object.values(SOURCES),
    countryOptions: countryOptions("en"),
    franceToolLink: "/en/late-payment-calculator",
    franceToolLabel: "Detailed France calculator (art. L441-10)",
  },
};

export function formatEuBreakdownLine(row, lang) {
  if (row.rateReason === "excluded_outside_period") {
    if (lang === "fr") {
      return `${row.startDate} au ${row.endDate} : ${row.days} j. hors période de taux`;
    }
    return `${row.startDate} to ${row.endDate}: ${row.days} d. outside rate period`;
  }
  if (lang === "fr") {
    return `${row.startDate} au ${row.endDate} : ${row.days} j. × ${row.annualRatePercent.toFixed(2)} % = ${row.interestEur.toFixed(2)} €`;
  }
  return `${row.startDate} to ${row.endDate}: ${row.days} d. × ${row.annualRatePercent.toFixed(2)}% = €${row.interestEur.toFixed(2)}`;
}

export function formatEuRateDetail(result, t) {
  return t.rateReasons[result.rateReason] || "";
}
