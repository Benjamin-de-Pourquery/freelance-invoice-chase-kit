import { JURISDICTION_OPTIONS } from "./jurisdictions.js";
import { SOURCE_URLS, LAST_VERIFIED } from "./sources.js";

const sourceLabelsEn = {
  ny_gbs_1410: "NYS Open Legislation: GBL § 1410 (definitions)",
  ny_gbs_1411: "NYS Open Legislation: GBL § 1411 (payment)",
  ny_gbs_1412: "NYS Open Legislation: GBL § 1412 (written contract)",
  ny_gbs_1414: "NYS Open Legislation: GBL § 1414 (violations)",
  ny_dol_fifa: "NY Department of Labor: Freelance Isn't Free Act",
  nyc_admin_20_928: "NYC Administrative Code: Freelance Workers (AmLegal)",
  nyc_dcwp_rights: "NYC DCWP: Freelance worker rights",
  nyc_dcwp_faq: "NYC DCWP: Freelance Isn't Free FAQ (PDF)",
  il_820_193_5: "Illinois General Assembly: 820 ILCS 193/5",
  il_820_193_10: "Illinois General Assembly: 820 ILCS 193/10",
  il_820_193_15: "Illinois General Assembly: 820 ILCS 193/15",
  il_820_193_25: "Illinois General Assembly: 820 ILCS 193/25",
  il_820_193_30: "Illinois General Assembly: 820 ILCS 193/30",
  ca_bpc_part5: "California LegInfo: Bus. & Prof. Code Part 5 (FWPA)",
  ca_bpc_18106: "California LegInfo: BPC § 18106 (enforcement)",
  la_fwpo_rules: "LA Office of Wage Standards: FWPO rules (PDF)",
  la_fwpo_ordinance: "LA Office of Wage Standards: FWPO ordinance (PDF)",
  la_ows: "LA Office of Wage Standards",
  la_lamc_189: "Los Angeles Municipal Code: Art. 10 FWPO (AmLegal)",
  seattle_smc_14_34: "Seattle Municipal Code: Ch. 14.34 (Municode)",
  seattle_smc_14_34_055: "Seattle Municipal Code: § 14.34.055 (Municode)",
  seattle_ols_icp: "Seattle Office of Labor Standards: ICP ordinance",
  minneapolis_40_760: "Minneapolis Code: Art. VI (Municode)",
  minneapolis_faq: "Minneapolis Civil Rights: Freelance FAQ (PDF)",
  minneapolis_report: "City of Minneapolis: Report an issue",
  columbus_2337: "Columbus City Code: Ch. 2337 (Municode)",
  columbus_377: "Columbus City Code: Ch. 377 Labor Commission (Municode)",
};

const sourceLabelsFr = {
  ...sourceLabelsEn,
  ny_dol_fifa: "NY Department of Labor : Freelance Isn't Free Act",
  minneapolis_faq: "Minneapolis Civil Rights : FAQ freelance (PDF)",
};

function buildSourcesList(lang) {
  const labels = lang === "fr" ? sourceLabelsFr : sourceLabelsEn;
  return Object.entries(SOURCE_URLS).map(([key, url]) => ({
    key,
    url,
    label: labels[key] || key,
  }));
}

const jurisdictionListEn = Object.entries(JURISDICTION_OPTIONS).map(
  ([id, labels]) => ({ id, label: labels.labelEn })
);
const jurisdictionListFr = Object.entries(JURISDICTION_OPTIONS).map(
  ([id, labels]) => ({ id, label: labels.labelFr })
);

export const usFreelanceCopy = {
  en: {
    lang: "en",
    homeHref: "/en",
    otherLangHref: "/outil-loi-paiement-freelance-us",
    otherLangLabel: "FR",
    badge: "Free tool · US freelance payment laws",
    metaTitle: "US freelance payment law checker",
    metaDesc:
      "See which US freelance payment law may apply, your payment deadline, days late, public remedies, and a copy-ready chase email. General information only.",
    title: "US freelance payment law checker",
    lead:
      "Pick where the work was done or where your client is based, enter contract details and dates, and get payment deadlines, remedies, official complaint channels, and a polite chase email citing the law.",
    disclaimer:
      "General information published by Glint, not legal advice. Rules change: check the official sources below before you act. Last verified: " +
      LAST_VERIFIED +
      ".",
    lastVerifiedLabel: "Last verified",
    sectionInputs: "Your situation",
    jurisdictionLabel: "State or city",
    contractValueLabel: "This contract value (USD)",
    aggregated120Label: "Other contract value with same client (last 120 days, USD)",
    aggregated120Hint:
      "Include prior contracts with the same hiring party in the last 120 days where the law uses a 120-day window.",
    aggregatedYearLabel:
      "Other contract value with same client (calendar year, USD)",
    aggregatedYearHint:
      "For Minneapolis, Seattle, and Los Angeles city rules that use a calendar-year total.",
    sevenDayLabel: "Contract value for work within 7 consecutive days (USD)",
    sevenDayHint: "Minneapolis only: $200+ in a seven-day window can trigger coverage.",
    contractDateLabel: "Contract entered date",
    professionalServicesLabel: "Work is covered professional services (California FWPA)",
    professionalServicesHint:
      "Required for California statewide law and for Los Angeles vs state precedence since January 1, 2025.",
    workInCityLabel: "Work was performed inside the city limits",
    governmentClientLabel: "Client is a government entity (federal, state, or local)",
    writtenContractLabel: "Written contract in place",
    paymentTimingLabel: "Payment timing",
    paymentTimingAgreed: "Contract specifies a payment due date",
    paymentTimingDefault: "No payment date agreed (use completion or notification)",
    agreedDateLabel: "Agreed payment due date",
    completionDateLabel: "Date work was completed",
    notificationDateLabel: "Date you notified the client work was complete",
    notificationDateHint:
      "Minneapolis: if no payment date is in the contract, the 30-day clock starts when you notify the hiring party.",
    calcDateLabel: "Today's date",
    sectionResults: "Results",
    lawLabel: "Law that may apply",
    generalLawTitle: "General contract law",
    generalLawBody:
      "No specific freelance payment law found for this location and inputs. General contract law may still govern when and how you get paid.",
    paymentDueLabel: "Payment deadline under this law",
    daysLateLabel: "Days late (after deadline)",
    notLateTitle: "Not late yet",
    notLateBody: "As of the date you entered, the payment deadline has not passed.",
    remediesLabel: "Public remedies listed in the law",
    complaintLabel: "Official complaint channel",
    writtenContractResultLabel: "Written contract",
    writtenContractRequired: "Required when covered",
    writtenContractMissing: "Missing (may affect remedies)",
    writtenContractNotRequired: "Not required",
    warningMissingContract:
      "A written contract is required for covered work. You may have additional remedies if you requested one before work began.",
    warningLaCa:
      "California's statewide Freelance Worker Protection Act applies to this professional-services contract instead of the Los Angeles city ordinance.",
    chaseTitle: "Copy-ready chase email (English)",
    copyBtn: "Copy email",
    copiedBtn: "Copied",
    sourcesTitle: "Official sources",
    sourceLabels: sourceLabelsEn,
    kitCtaTitle: "Need templates for the full chase sequence?",
    kitCtaBody:
      "The Freelancer Overdue Invoice Kit includes reminder emails, formal letters, a checklist, and a CSV tracker.",
    kitCtaBtn: "Get the kit",
    jurisdictions: jurisdictionListEn,
  },
  fr: {
    lang: "fr",
    homeHref: "/",
    otherLangHref: "/en/us-freelance-payment-checker",
    otherLangLabel: "EN",
    badge: "Outil gratuit · Lois US paiement freelance",
    metaTitle: "Vérificateur loi US paiement freelance",
    metaDesc:
      "Quelle loi US freelance peut s'appliquer, échéance, jours de retard, recours publics et email de relance. Information générale uniquement.",
    title: "Vérificateur loi US paiement freelance",
    lead:
      "Choisis l'État ou la ville, les montants et dates du contrat : échéance, retard, recours, canal de plainte officiel et email de relance en anglais.",
    disclaimer:
      "Information générale publiée par Glint, pas un conseil juridique. Vérifie les sources officielles avant d'agir. Dernière vérification : " +
      LAST_VERIFIED +
      ".",
    lastVerifiedLabel: "Dernière vérification",
    sectionInputs: "Ta situation",
    jurisdictionLabel: "État ou ville",
    contractValueLabel: "Montant de ce contrat (USD)",
    aggregated120Label:
      "Autres contrats avec le même client (120 derniers jours, USD)",
    aggregated120Hint: "Pour les lois qui cumulent sur 120 jours.",
    aggregatedYearLabel:
      "Autres contrats avec le même client (année civile, USD)",
    aggregatedYearHint: "Pour Minneapolis, Seattle et Los Angeles (ville).",
    sevenDayLabel: "Montant sur 7 jours consécutifs (USD)",
    sevenDayHint: "Minneapolis : 200 $+ sur 7 jours peut déclencher la couverture.",
    contractDateLabel: "Date de conclusion du contrat",
    professionalServicesLabel: "Services professionnels couverts (FWPA Californie)",
    professionalServicesHint:
      "Nécessaire pour la loi californienne et la priorité LA depuis le 1er janvier 2025.",
    workInCityLabel: "Travail réalisé dans les limites de la ville",
    governmentClientLabel: "Client entité publique (fédéral, État ou local)",
    writtenContractLabel: "Contrat écrit en place",
    paymentTimingLabel: "Échéance de paiement",
    paymentTimingAgreed: "Date de paiement prévue au contrat",
    paymentTimingDefault: "Pas de date convenue (achèvement ou notification)",
    agreedDateLabel: "Date de paiement convenue",
    completionDateLabel: "Date d'achèvement du travail",
    notificationDateLabel: "Date de notification au client",
    notificationDateHint:
      "Minneapolis : sans date au contrat, le délai de 30 jours commence à la notification.",
    calcDateLabel: "Date du jour",
    sectionResults: "Résultats",
    lawLabel: "Loi susceptible de s'appliquer",
    generalLawTitle: "Droit commun des contrats",
    generalLawBody:
      "Aucune loi freelance spécifique pour ce lieu et ces données. Le droit commun des contrats peut quand même régir le paiement.",
    paymentDueLabel: "Échéance selon cette loi",
    daysLateLabel: "Jours de retard (après échéance)",
    notLateTitle: "Pas encore en retard",
    notLateBody: "À la date indiquée, l'échéance n'est pas encore passée.",
    remediesLabel: "Recours publics prévus par la loi",
    complaintLabel: "Canal de plainte officiel",
    writtenContractResultLabel: "Contrat écrit",
    writtenContractRequired: "Requis si couvert",
    writtenContractMissing: "Absent (peut affecter les recours)",
    writtenContractNotRequired: "Non requis",
    warningMissingContract:
      "Un contrat écrit est requis. Des recours supplémentaires peuvent exister si tu l'as demandé avant le travail.",
    warningLaCa:
      "La loi californienne FWPA s'applique à ce contrat de services professionnels plutôt que l'ordonnance de Los Angeles.",
    chaseTitle: "Email de relance prêt à copier (anglais)",
    copyBtn: "Copier l'email",
    copiedBtn: "Copié",
    sourcesTitle: "Sources officielles",
    sourceLabels: sourceLabelsFr,
    kitCtaTitle: "Besoin de modèles pour toute la séquence de relance ?",
    kitCtaBody:
      "Le Kit Relance Impayés Freelance inclut emails, courriers, checklist et tracker CSV.",
    kitCtaBtn: "Voir le kit",
    jurisdictions: jurisdictionListFr,
  },
};

export function sourcesForResult(result, lang) {
  const labels =
    lang === "fr"
      ? usFreelanceCopy.fr.sourceLabels
      : usFreelanceCopy.en.sourceLabels;
  if (!result?.sources) return [];
  return result.sources.map((key) => ({
    key,
    url: SOURCE_URLS[key],
    label: labels[key] || key,
  }));
}
