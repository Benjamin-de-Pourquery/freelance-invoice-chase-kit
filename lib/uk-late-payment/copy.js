import { SOURCES, LAST_VERIFIED } from "./sources.js";
import { UK_REFERENCE_PERIODS } from "./rates.js";

const sourceLabelsFr = {
  govuk_interest: "GOV.UK : intérêts sur les paiements commerciaux tardifs",
  govuk_recovery: "GOV.UK : indemnité forfaitaire de recouvrement",
  uksi_2002_1675:
    "Législation.gov.uk : SI 2002/1675 (taux d'intérêt, Angleterre, Pays de Galles, Irlande du Nord)",
  ssi_2002_336:
    "Législation.gov.uk : SSI 2002/336 (taux d'intérêt, Écosse)",
  bank_rate: "Bank of England : historique du Bank Rate",
  commercial_payments_bill:
    "GOV.UK : Commercial Payments Bill (projet de loi, pas encore en vigueur)",
};

const sourceLabelsEn = {
  govuk_interest: "GOV.UK: interest on late commercial payments",
  govuk_recovery: "GOV.UK: fixed debt recovery compensation",
  uksi_2002_1675:
    "Legislation.gov.uk: SI 2002/1675 (rate of interest, England, Wales, Northern Ireland)",
  ssi_2002_336:
    "Legislation.gov.uk: SSI 2002/336 (rate of interest, Scotland)",
  bank_rate: "Bank of England: Bank Rate history",
  commercial_payments_bill:
    "GOV.UK: Commercial Payments Bill (proposed, not yet in force)",
};

const periodRangeEn = Object.keys(UK_REFERENCE_PERIODS)
  .sort()
  .join(", ");
const periodRangeFr = "2023 à décembre 2026 (semestres préchargés)";

export const ukLatePaymentCopy = {
  fr: {
    lang: "fr",
    homeHref: "/",
    otherLangHref: "/en/uk-late-payment-calculator",
    otherLangLabel: "EN",
    badge: "Outil gratuit · Intérêts de retard UK",
    metaTitle: "Calculateur intérêts de retard UK (B2B, GBP)",
    metaDesc:
      "Estime les intérêts légaux (8 % + Bank Rate), l'indemnité forfaitaire de recouvrement et un texte de relance pour factures B2B au Royaume-Uni. Gratuit, sans compte.",
    title: "Calculateur d'intérêts de retard UK",
    lead:
      "Estime les intérêts légaux britanniques et l'indemnité forfaitaire de recouvrement pour une facture B2B (y compris auto-entrepreneur), à partir du montant en GBP et des dates.",
    disclaimer:
      "Information générale publiée par Glint, pas un conseil juridique. Vérifie les sources officielles avant d'agir. Dernière vérification : " +
      LAST_VERIFIED +
      ".",
    periodNote:
      `Taux Bank of England préchargés pour les périodes ${periodRangeFr} (8 % + Bank Rate, taux fixé pour la dette selon la date où les intérêts commencent à courir).`,
    billNote:
      "Le Commercial Payments Bill (projet de loi, pas encore en vigueur) pourrait à terme plafonner les délais de paiement et renforcer le taux légal. Consulte la fiche GOV.UK pour l'état actuel du texte.",
    rulesNote:
      "Intérêts simples à compter du lendemain de l'échéance (ou 30 jours après réception de la facture si aucun délai convenu). B2B uniquement, y compris travailleurs indépendants.",
    contractualNote:
      "Si le contrat prévoit déjà un taux d'intérêt de retard, les intérêts légaux ne peuvent en principe pas être réclamés en plus : saisis le taux contractuel.",
    publicAuthorityNote:
      "Contrat avec une autorité publique : un taux contractuel inférieur au taux légal ne peut pas être utilisé (gov.uk).",
    sectionInputs: "Données de la facture",
    amountLabel: "Montant dû (£)",
    dueModeLabel: "Échéance de paiement",
    dueModes: {
      agreed: "Date d'échéance contractuelle",
      receipt_plus_30:
        "Pas de délai convenu : réception facture ou livraison + 30 jours",
    },
    dueDateLabel: "Date d'échéance",
    invoiceReceiptLabel: "Date de réception de la facture (ou livraison)",
    invoiceReceiptHint:
      "Sans délai convenu : l'échéance est 30 jours calendaires après cette date (gov.uk).",
    effectiveDueLabel: "Échéance calculée",
    calcDateLabel: "Date de calcul",
    calcDateHint: "Par défaut : aujourd'hui",
    contractualRateLabel: "Taux annuel contractuel (%)",
    contractualRateHint:
      "Optionnel. Si le contrat fixe un taux de retard, saisis-le ici à la place du taux légal.",
    debtorTypeLabel: "Type de débiteur",
    debtorTypes: {
      business: "Entreprise ou travailleur indépendant (B2B)",
      public_authority: "Autorité publique",
      consumer: "Consommateur (particulier)",
    },
    consumerHint:
      "Les règles sur les paiements commerciaux tardifs ne s'appliquent pas aux dettes de consommateurs.",
    sectionResults: "Résultat",
    daysLateLabel: "Jours de retard",
    interestStartLabel: "Début des intérêts (lendemain de l'échéance)",
    referenceLabel: "Période de référence du Bank Rate",
    bankRateLabel: "Bank Rate de référence",
    rateLabel: "Taux annuel appliqué",
    dailyInterestLabel: "Intérêt journalier",
    interestLabel: "Intérêts de retard à ce jour",
    compensationLabel: "Indemnité forfaitaire de recouvrement",
    compensationHint:
      "£40 (jusqu'à £999,99), £70 (£1 000 à £9 999,99), £100 (£10 000 ou plus), une fois par paiement en retard. Des frais de recouvrement raisonnables peuvent aussi être réclamés.",
    totalLabel: "Total estimé (hors principal)",
    formulaLabel: "Formule",
    noPenaltiesTitle: "Aucun intérêt à cette date",
    noPenaltiesBody:
      "La date de calcul est égale ou antérieure à l'échéance : 0 jour de retard.",
    rateReasons: {
      statutory:
        "Taux légal : 8 % + Bank Rate en vigueur à la date de référence, fixé pour cette dette.",
      contractual: "Taux contractuel saisi (les intérêts légaux ne s'appliquent pas en parallèle).",
      consumer_not_applicable: "Non applicable : débiteur consommateur.",
      unavailable: "Période hors plage préchargée : vérifie le Bank Rate sur le site de la Banque d'Angleterre.",
      none: "",
    },
    warningManualRate:
      "La date où les intérêts commencent à courir est hors des périodes préchargées dans l'outil. Consulte l'historique du Bank Rate officiel.",
    chaseTitle: "Texte de relance (à copier)",
    copyBtn: "Copier le texte",
    copiedBtn: "Copié",
    sourcesTitle: "Sources officielles",
    kitCtaTitle: "Aller plus loin",
    kitCtaBody:
      "Le Kit Relance Impayés Freelance inclut emails, courrier, checklist et tracker pour relancer sans improviser.",
    kitCtaBtn: "Voir le kit",
    sourceLabels: sourceLabelsFr,
    sources: SOURCES,
    euToolLink: "/outil-interets-retard-ue",
    euToolLabel: "Calculateur intérêts de retard UE",
  },
  en: {
    lang: "en",
    homeHref: "/en",
    otherLangHref: "/outil-interets-retard-uk",
    otherLangLabel: "FR",
    badge: "Free tool · UK late-payment interest",
    metaTitle: "UK late payment interest calculator (B2B, GBP)",
    metaDesc:
      "Estimate statutory interest (8% + Bank Rate), fixed debt recovery compensation, and a chase email for UK B2B invoices. Free, no account.",
    title: "UK late payment interest calculator",
    lead:
      "Estimate UK statutory late-payment interest and fixed debt recovery compensation for a B2B invoice (including sole traders), from the amount in GBP and your dates.",
    disclaimer:
      "General information published by Glint, not legal advice. Check official sources before you act. Last verified: " +
      LAST_VERIFIED +
      ".",
    periodNote:
      `Preloaded Bank of England rates for ${periodRangeEn} (8% + Bank Rate, fixed for the debt based on when interest starts to run).`,
    billNote:
      "The Commercial Payments Bill (proposed, not yet in force) may eventually cap payment terms and reinforce the statutory rate. See the GOV.UK factsheet for the current status of the bill.",
    rulesNote:
      "Simple interest from the day after the due date (or 30 days after invoice receipt or delivery when no date was agreed). B2B only, including sole traders.",
    contractualNote:
      "If the contract already sets a late-payment interest rate, statutory interest cannot usually be claimed instead: enter the contractual rate.",
    publicAuthorityNote:
      "Public authority contracts: a contractual rate below the statutory rate cannot be used (gov.uk).",
    sectionInputs: "Invoice details",
    amountLabel: "Amount owed (£)",
    dueModeLabel: "Payment due date",
    dueModes: {
      agreed: "Contractual due date",
      receipt_plus_30: "No agreed term: invoice receipt or delivery + 30 days",
    },
    dueDateLabel: "Due date",
    invoiceReceiptLabel: "Date of invoice receipt (or delivery)",
    invoiceReceiptHint:
      "With no agreed payment period, the due date is 30 calendar days after this date (gov.uk).",
    effectiveDueLabel: "Calculated due date",
    calcDateLabel: "Calculation date",
    calcDateHint: "Default: today",
    contractualRateLabel: "Contractual annual rate (%)",
    contractualRateHint:
      "Optional. If the contract sets a late-payment rate, enter it here instead of the statutory rate.",
    debtorTypeLabel: "Debtor type",
    debtorTypes: {
      business: "Business or sole trader (B2B)",
      public_authority: "Public authority",
      consumer: "Consumer (individual)",
    },
    consumerHint:
      "Late commercial payment rules do not apply to consumer debts.",
    sectionResults: "Result",
    daysLateLabel: "Days late",
    interestStartLabel: "Interest starts (day after due date)",
    referenceLabel: "Bank Rate reference period",
    bankRateLabel: "Reference Bank Rate",
    rateLabel: "Annual rate applied",
    dailyInterestLabel: "Daily interest",
    interestLabel: "Late-payment interest to date",
    compensationLabel: "Fixed debt recovery compensation",
    compensationHint:
      "£40 (up to £999.99), £70 (£1,000 to £9,999.99), £100 (£10,000 or more), once per late payment. Reasonable recovery costs may also be claimed.",
    totalLabel: "Estimated total (excluding principal)",
    formulaLabel: "Formula",
    noPenaltiesTitle: "No interest on this date",
    noPenaltiesBody:
      "The calculation date is on or before the due date: 0 days late.",
    rateReasons: {
      statutory:
        "Statutory rate: 8% + Bank Rate in force on the reference date, fixed for this debt.",
      contractual:
        "Contractual rate entered (statutory interest does not apply in parallel).",
      consumer_not_applicable: "Not applicable: consumer debtor.",
      unavailable:
        "Period outside the preloaded range: check Bank Rate on the Bank of England website.",
      none: "",
    },
    warningManualRate:
      "The date interest starts to run is outside the periods preloaded in this tool. Check the official Bank Rate history.",
    chaseTitle: "Chase email text (copy and paste)",
    copyBtn: "Copy text",
    copiedBtn: "Copied",
    sourcesTitle: "Official sources",
    kitCtaTitle: "Go further",
    kitCtaBody:
      "The Freelancer Overdue Invoice Kit includes emails, formal letter, checklist and tracker so you can chase invoices without winging it.",
    kitCtaBtn: "See the kit",
    sourceLabels: sourceLabelsEn,
    sources: SOURCES,
    euToolLink: "/en/eu-late-payment-calculator",
    euToolLabel: "EU late payment interest calculator",
  },
};

export function formatUkRateDetail(result, t) {
  if (result.rateReason === "contractual") {
    return t.rateReasons.contractual;
  }
  if (result.rateReason === "statutory") {
    const period =
      t.lang === "fr" ? result.periodLabelFr : result.periodLabelEn;
    return period ? `${t.rateReasons.statutory} ${period}` : t.rateReasons.statutory;
  }
  return t.rateReasons[result.rateReason] || "";
}
