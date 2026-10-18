import { SOURCE_URLS } from "./sources.js";

/**
 * @typedef {'ny_state' | 'nyc' | 'il_state' | 'ca_state' | 'los_angeles' | 'seattle' | 'minneapolis' | 'columbus'} JurisdictionId
 */

/** @type {Record<JurisdictionId, { labelEn: string, labelFr: string }>} */
export const JURISDICTION_OPTIONS = {
  ny_state: {
    labelEn: "New York State (client or work statewide)",
    labelFr: "État de New York (client ou travail dans l'État)",
  },
  nyc: {
    labelEn: "New York City",
    labelFr: "New York City",
  },
  il_state: {
    labelEn: "Illinois",
    labelFr: "Illinois",
  },
  ca_state: {
    labelEn: "California (outside Los Angeles city rules)",
    labelFr: "Californie (hors règles municipales de Los Angeles)",
  },
  los_angeles: {
    labelEn: "Los Angeles, California (work performed in the city)",
    labelFr: "Los Angeles, Californie (travail réalisé dans la ville)",
  },
  seattle: {
    labelEn: "Seattle, Washington",
    labelFr: "Seattle, Washington",
  },
  minneapolis: {
    labelEn: "Minneapolis, Minnesota",
    labelFr: "Minneapolis, Minnesota",
  },
  columbus: {
    labelEn: "Columbus, Ohio",
    labelFr: "Columbus, Ohio",
  },
};

const CA_FWPA_EFFECTIVE = "2025-01-01";
const LA_FWPO_EFFECTIVE = "2023-07-01";

/**
 * Resolve which statute applies for Los Angeles picker.
 * @param {object} input
 * @returns {JurisdictionId}
 */
export function resolveLosAngelesLawKey(input) {
  const total120 =
    (input.contractValue || 0) + (input.aggregatedValue120Days || 0);
  const totalCalendarYear =
    (input.contractValue || 0) + (input.aggregatedValueCalendarYear || 0);
  const contractDate = input.contractEnteredDate || "";
  const professional = Boolean(input.isProfessionalServices);
  const afterCaFwpa = contractDate >= CA_FWPA_EFFECTIVE;

  if (
    afterCaFwpa &&
    professional &&
    total120 >= 250 &&
    input.workPerformedInCity !== false
  ) {
    return "ca_state";
  }
  if (
    contractDate >= LA_FWPO_EFFECTIVE &&
    totalCalendarYear >= 600 &&
    input.workPerformedInCity !== false
  ) {
    return "los_angeles";
  }
  return "los_angeles";
}

/** @type {Record<string, object>} */
export const JURISDICTION_RULES = {
  ny_state: {
    id: "ny_state",
    lawNameEn:
      "New York General Business Law Article 44-A (Freelance Isn't Free Act)",
    lawNameFr:
      "General Business Law de l'État de New York, article 44-A (Freelance Isn't Free Act)",
    effectiveNoteEn: "Contracts on or after August 28, 2024.",
    effectiveNoteFr: "Contrats à partir du 28 août 2024.",
    thresholdDescriptionEn:
      "$800 or more for this contract or aggregated with other contracts with the same hiring party in the immediately preceding 120 days.",
    thresholdDescriptionFr:
      "800 $ ou plus pour ce contrat ou cumulés avec d'autres contrats avec le même client sur les 120 jours précédents.",
    minThreshold: 800,
    aggregationWindow: "120_days",
    governmentClientExcluded: true,
    governmentExclusionNoteEn:
      "The law does not apply when the hiring party is the U.S. government, New York State, a municipality, or a foreign government (GBL § 1410).",
    writtenContractRequired: true,
    paymentDefaultDaysAfter: "completion",
    notificationStartsDefaultClock: false,
    remediesEn: [
      {
        text:
          "Double damages, injunctive relief, and reasonable attorneys' fees and costs for late payment (GBL § 1414).",
        sourceKey: "ny_gbs_1414",
      },
      {
        text:
          "$250 statutory damages for written-contract violations; contract value statutory damages when combined with other violations (GBL § 1414).",
        sourceKey: "ny_gbs_1414",
      },
      {
        text:
          "Private civil action: 6 years for payment violations, 2 years for written-contract violations (GBL § 1414).",
        sourceKey: "ny_gbs_1414",
      },
    ],
    remediesFr: [
      {
        text:
          "Dommages doubles, injonction et honoraires d'avocat raisonnables pour retard de paiement (GBL § 1414).",
        sourceKey: "ny_gbs_1414",
      },
      {
        text:
          "Dommages statutaires de 250 $ pour défaut de contrat écrit (GBL § 1414).",
        sourceKey: "ny_gbs_1414",
      },
      {
        text:
          "Action civile: 6 ans (paiement), 2 ans (contrat écrit) (GBL § 1414).",
        sourceKey: "ny_gbs_1414",
      },
    ],
    complaintEn: {
      channel:
        "New York State Attorney General (worker rights resources; Freelance Isn't Free Act)",
      url: "https://ag.ny.gov/resources/individuals/workers-rights",
    },
    complaintFr: {
      channel:
        "Procureur général de l'État de New York (droits des travailleurs)",
      url: "https://ag.ny.gov/resources/individuals/workers-rights",
    },
    sourceKeys: [
      "ny_gbs_1410",
      "ny_gbs_1411",
      "ny_gbs_1412",
      "ny_gbs_1414",
      "ny_dol_fifa",
    ],
  },
  nyc: {
    id: "nyc",
    lawNameEn:
      "New York City Administrative Code Chapter 10 (Freelance Isn't Free Act)",
    lawNameFr:
      "Administrative Code de New York City, chapitre 10 (Freelance Isn't Free Act)",
    effectiveNoteEn: "Contracts entered on or after May 15, 2017.",
    effectiveNoteFr: "Contrats conclus à partir du 15 mai 2017.",
    thresholdDescriptionEn:
      "$800 or more for this contract or aggregated with other contracts with the same hiring party in the immediately preceding 120 days.",
    thresholdDescriptionFr:
      "800 $ ou plus pour ce contrat ou cumulés avec le même client sur les 120 jours précédents.",
    minThreshold: 800,
    aggregationWindow: "120_days",
    governmentClientExcluded: false,
    writtenContractRequired: true,
    paymentDefaultDaysAfter: "completion",
    notificationStartsDefaultClock: false,
    remediesEn: [
      {
        text:
          "Double damages, injunctive relief, and other appropriate remedies for late or underpayment (NYC Admin. Code § 20-933).",
        sourceKey: "nyc_admin_20_928",
      },
      {
        text:
          "$250 statutory damages when a written contract was refused; contract-value damages when combined with other violations.",
        sourceKey: "nyc_dcwp_faq",
      },
      {
        text:
          "Attorneys' fees and costs for prevailing freelance workers (NYC Admin. Code § 20-933).",
        sourceKey: "nyc_admin_20_928",
      },
    ],
    remediesFr: [
      {
        text:
          "Dommages doubles et injonction pour retard ou sous-paiement (NYC Admin. Code § 20-933).",
        sourceKey: "nyc_admin_20_928",
      },
      {
        text: "Dommages statutaires de 250 $ si refus de contrat écrit.",
        sourceKey: "nyc_dcwp_faq",
      },
      {
        text: "Honoraires d'avocat pour le freelance gagnant.",
        sourceKey: "nyc_admin_20_928",
      },
    ],
    complaintEn: {
      channel: "NYC Department of Consumer and Worker Protection (DCWP)",
      url: "https://www.nyc.gov/site/dca/workers/workersrights/freelancer-workers.page",
    },
    complaintFr: {
      channel: "NYC Department of Consumer and Worker Protection (DCWP)",
      url: "https://www.nyc.gov/site/dca/workers/workersrights/freelancer-workers.page",
    },
    sourceKeys: ["nyc_admin_20_928", "nyc_dcwp_rights", "nyc_dcwp_faq"],
  },
  il_state: {
    id: "il_state",
    lawNameEn: "Illinois Freelance Worker Protection Act (820 ILCS 193)",
    lawNameFr: "Freelance Worker Protection Act de l'Illinois (820 ILCS 193)",
    effectiveNoteEn: "Contracts taking effect on or after July 1, 2024.",
    effectiveNoteFr: "Contrats prenant effet à partir du 1er juillet 2024.",
    thresholdDescriptionEn:
      "$500 or more for this contract or aggregated with other contracts with the same contracting entity in the immediately preceding 120 days.",
    thresholdDescriptionFr:
      "500 $ ou plus pour ce contrat ou cumulés avec le même client sur les 120 jours précédents.",
    minThreshold: 500,
    aggregationWindow: "120_days",
    governmentClientExcluded: false,
    writtenContractRequired: true,
    paymentDefaultDaysAfter: "completion",
    notificationStartsDefaultClock: false,
    remediesEn: [
      {
        text:
          "Double the amount of underpayments, injunctive relief, costs, and reasonable attorneys' fees (820 ILCS 193/30).",
        sourceKey: "il_820_193_30",
      },
      {
        text:
          "$500 statutory damages for written-contract violations when requested before work began (820 ILCS 193/30).",
        sourceKey: "il_820_193_30",
      },
      {
        text:
          "Civil complaint for payment violations within 2 years after final compensation was due (820 ILCS 193/30).",
        sourceKey: "il_820_193_30",
      },
    ],
    remediesFr: [
      {
        text:
          "Double du montant impayé, injonction, frais et honoraires (820 ILCS 193/30).",
        sourceKey: "il_820_193_30",
      },
      {
        text: "500 $ de dommages statutaires pour défaut de contrat écrit (820 ILCS 193/30).",
        sourceKey: "il_820_193_30",
      },
      {
        text:
          "Plainte civile dans les 2 ans suivant l'échéance du paiement final (820 ILCS 193/30).",
        sourceKey: "il_820_193_30",
      },
    ],
    complaintEn: {
      channel: "Illinois Department of Labor (FWPA complaint)",
      url: "https://labor.illinois.gov/laws-rules/freelance-worker-protection-act.html",
    },
    complaintFr: {
      channel: "Illinois Department of Labor (plainte FWPA)",
      url: "https://labor.illinois.gov/laws-rules/freelance-worker-protection-act.html",
    },
    sourceKeys: [
      "il_820_193_5",
      "il_820_193_10",
      "il_820_193_15",
      "il_820_193_25",
      "il_820_193_30",
    ],
  },
  ca_state: {
    id: "ca_state",
    lawNameEn:
      "California Freelance Worker Protection Act (Bus. & Prof. Code §§ 18100-18107)",
    lawNameFr:
      "Freelance Worker Protection Act de Californie (Bus. & Prof. Code §§ 18100-18107)",
    effectiveNoteEn:
      "Contracts entered into or renewed on or after January 1, 2025. Professional services only.",
    effectiveNoteFr:
      "Contrats conclus ou renouvelés à partir du 1er janvier 2025. Services professionnels uniquement.",
    thresholdDescriptionEn:
      "$250 or more for professional services, including amounts aggregated with other contracts in the immediately preceding 120 days.",
    thresholdDescriptionFr:
      "250 $ ou plus pour des services professionnels, y compris cumul sur 120 jours.",
    minThreshold: 250,
    aggregationWindow: "120_days",
    requiresProfessionalServices: true,
    governmentClientExcluded: true,
    governmentExclusionNoteEn:
      "Excludes U.S. government, California or its subdivisions, and foreign governments (BPC § 18101).",
    writtenContractRequired: true,
    paymentDefaultDaysAfter: "completion",
    notificationStartsDefaultClock: false,
    remediesEn: [
      {
        text:
          "Damages up to twice the unpaid amount for late payment, plus reasonable attorneys' fees and costs (BPC § 18106).",
        sourceKey: "ca_bpc_18106",
      },
      {
        text:
          "Additional $1,000 if a written contract was requested before work and refused (BPC § 18106).",
        sourceKey: "ca_bpc_18106",
      },
      {
        text: "Civil action by the freelance worker or a public prosecutor (BPC § 18106).",
        sourceKey: "ca_bpc_18106",
      },
    ],
    remediesFr: [
      {
        text:
          "Dommages jusqu'à deux fois le montant impayé, honoraires et frais (BPC § 18106).",
        sourceKey: "ca_bpc_18106",
      },
      {
        text: "1 000 $ supplémentaires si contrat écrit refusé avant le travail (BPC § 18106).",
        sourceKey: "ca_bpc_18106",
      },
      {
        text: "Action civile par le freelance ou un procureur public (BPC § 18106).",
        sourceKey: "ca_bpc_18106",
      },
    ],
    complaintEn: {
      channel: "Civil court (no state agency administers FWPA payment claims)",
      url: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=18106.",
    },
    complaintFr: {
      channel: "Tribunal civil (pas d'agence d'État pour les paiements FWPA)",
      url: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=18106.",
    },
    sourceKeys: ["ca_bpc_part5", "ca_bpc_18106"],
  },
  los_angeles: {
    id: "los_angeles",
    lawNameEn:
      "Los Angeles Municipal Code Article 10 (Freelance Worker Protections Ordinance)",
    lawNameFr:
      "Los Angeles Municipal Code, article 10 (Freelance Worker Protections Ordinance)",
    effectiveNoteEn:
      "Contracts entered on or after July 1, 2023, for work performed in the City of Los Angeles.",
    effectiveNoteFr:
      "Contrats à partir du 1er juillet 2023 pour un travail réalisé dans la ville de Los Angeles.",
    thresholdDescriptionEn:
      "$600 or more in a calendar year for the same hiring entity (including this contract).",
    thresholdDescriptionFr:
      "600 $ ou plus sur une année civile pour le même client (y compris ce contrat).",
    minThreshold: 600,
    aggregationWindow: "calendar_year",
    governmentClientExcluded: false,
    writtenContractRequired: true,
    paymentDefaultDaysAfter: "completion",
    notificationStartsDefaultClock: false,
    remediesEn: [
      {
        text:
          "Unpaid compensation, liquidated damages, civil penalties, and other remedies under LAMC Art. 10 § 189.111.",
        sourceKey: "la_lamc_189",
      },
      {
        text:
          "Administrative complaint to the Office of Wage Standards for eligible contracts.",
        sourceKey: "la_ows",
      },
    ],
    remediesFr: [
      {
        text:
          "Rémunération impayée, dommages liquidés et pénalités (LAMC art. 10 § 189.111).",
        sourceKey: "la_lamc_189",
      },
      {
        text: "Plainte auprès de l'Office of Wage Standards pour les contrats couverts.",
        sourceKey: "la_ows",
      },
    ],
    complaintEn: {
      channel: "Los Angeles Office of Wage Standards",
      url: "https://wagesla.lacity.gov/",
    },
    complaintFr: {
      channel: "Los Angeles Office of Wage Standards",
      url: "https://wagesla.lacity.gov/",
    },
    sourceKeys: ["la_fwpo_ordinance", "la_fwpo_rules", "la_lamc_189", "la_ows"],
    precedenceNoteEn:
      "For contracts on or after January 1, 2025, California's statewide Freelance Worker Protection Act applies instead when the work is covered professional services of $250 or more.",
    precedenceNoteFr:
      "Pour les contrats à partir du 1er janvier 2025, la loi californienne FWPA prime si les services professionnels couverts atteignent 250 $ ou plus.",
  },
  seattle: {
    id: "seattle",
    lawNameEn:
      "Seattle Municipal Code Chapter 14.34 (Independent Contractor Protections Ordinance)",
    lawNameFr:
      "Seattle Municipal Code, chapitre 14.34 (Independent Contractor Protections Ordinance)",
    effectiveNoteEn: "Contracts on or after September 1, 2022.",
    effectiveNoteFr: "Contrats à partir du 1er septembre 2022.",
    thresholdDescriptionEn:
      "$600 or more in compensation, or reasonably expected to reach $600 when aggregated in the calendar year with the same hiring entity.",
    thresholdDescriptionFr:
      "600 $ ou plus, ou cumul annuel de 600 $ avec le même client.",
    minThreshold: 600,
    aggregationWindow: "calendar_year",
    governmentClientExcluded: false,
    writtenContractRequired: false,
    requiresPreContractDisclosure: true,
    paymentDefaultDaysAfter: "completion",
    notificationStartsDefaultClock: false,
    remediesEn: [
      {
        text:
          "Liquidated damages up to twice unpaid compensation, civil penalties, and interest (SMC § 14.34.170).",
        sourceKey: "seattle_smc_14_34",
      },
      {
        text:
          "Private civil action with unpaid compensation, liquidated damages up to twice the unpaid amount, and attorneys' fees (SMC § 14.34.230).",
        sourceKey: "seattle_smc_14_34",
      },
    ],
    remediesFr: [
      {
        text:
          "Dommages liquidés jusqu'à deux fois l'impayé et pénalités (SMC § 14.34.170).",
        sourceKey: "seattle_smc_14_34",
      },
      {
        text:
          "Action civile avec honoraires d'avocat (SMC § 14.34.230).",
        sourceKey: "seattle_smc_14_34",
      },
    ],
    complaintEn: {
      channel: "Seattle Office of Labor Standards",
      url: "https://www.seattle.gov/laborstandards/ordinances/independent-contractor-protections-",
    },
    complaintFr: {
      channel: "Seattle Office of Labor Standards",
      url: "https://www.seattle.gov/laborstandards/ordinances/independent-contractor-protections-",
    },
    sourceKeys: [
      "seattle_smc_14_34",
      "seattle_smc_14_34_055",
      "seattle_ols_icp",
    ],
  },
  minneapolis: {
    id: "minneapolis",
    lawNameEn:
      "Minneapolis Code Title 2, Chapter 40, Article VI (Freelance Worker Protections Ordinance)",
    lawNameFr:
      "Code de Minneapolis, titre 2, chapitre 40, article VI (Freelance Worker Protections Ordinance)",
    effectiveNoteEn: "Contracts entered on or after January 1, 2021.",
    effectiveNoteFr: "Contrats à partir du 1er janvier 2021.",
    thresholdDescriptionEn:
      "Applies if compensation is $600+ in the calendar year (aggregated), $600+ for this contract, or $200+ for work within seven consecutive days.",
    thresholdDescriptionFr:
      "S'applique si 600 $+ sur l'année civile, 600 $+ pour ce contrat, ou 200 $+ sur sept jours consécutifs.",
    minThreshold: 600,
    aggregationWindow: "calendar_year",
    altThreshold7Day: 200,
    governmentClientExcluded: false,
    writtenContractRequired: true,
    paymentDefaultDaysAfter: "notification",
    notificationStartsDefaultClock: true,
    remediesEn: [
      {
        text:
          "Compensatory damages for unpaid amounts and liquidated damages up to double compensatory damages or $500, whichever is greater (§ 40.790).",
        sourceKey: "minneapolis_40_760",
      },
      {
        text:
          "Up to $250 per violation for failure to provide a required written contract when requested (§ 40.790).",
        sourceKey: "minneapolis_40_760",
      },
      {
        text: "Report within 2 years (3 years if willful) after the violation (§ 40.790).",
        sourceKey: "minneapolis_40_760",
      },
    ],
    remediesFr: [
      {
        text:
          "Dommages compensatoires et liquidés jusqu'à double ou 500 $ (§ 40.790).",
        sourceKey: "minneapolis_40_760",
      },
      {
        text: "Jusqu'à 250 $ par violation pour défaut de contrat écrit (§ 40.790).",
        sourceKey: "minneapolis_40_760",
      },
      {
        text: "Signalement dans les 2 ans (3 ans si volontaire) (§ 40.790).",
        sourceKey: "minneapolis_40_760",
      },
    ],
    complaintEn: {
      channel: "Minneapolis Department of Civil Rights (labor violation report)",
      url: "https://www.minneapolismn.gov/report-an-issue/",
    },
    complaintFr: {
      channel:
        "Minneapolis Department of Civil Rights (signalement violation du travail)",
      url: "https://www.minneapolismn.gov/report-an-issue/",
    },
    sourceKeys: ["minneapolis_40_760", "minneapolis_faq", "minneapolis_report"],
  },
  columbus: {
    id: "columbus",
    lawNameEn: "Columbus City Code Chapter 2337 (Freelance Workers)",
    lawNameFr: "Columbus City Code, chapitre 2337 (Freelance Workers)",
    effectiveNoteEn: "Written contracts required when the contract value threshold is met.",
    effectiveNoteFr:
      "Contrat écrit requis lorsque le seuil de valeur du contrat est atteint.",
    thresholdDescriptionEn:
      "$250 or more for this contract or aggregated with other contracts in the immediately preceding 120 days.",
    thresholdDescriptionFr:
      "250 $ ou plus pour ce contrat ou cumulés sur les 120 jours précédents.",
    minThreshold: 250,
    aggregationWindow: "120_days",
    governmentClientExcluded: true,
    governmentExclusionNoteEn:
      "Does not apply when the hiring party is the U.S. government, Ohio, or other local governments except the City of Columbus (§ 2337.01).",
    writtenContractRequired: true,
    paymentDefaultDaysAfter: "completion",
    notificationStartsDefaultClock: false,
    remediesEn: [
      {
        text:
          "Complaint to the Labor Commission with investigation and hearing under City Code Chapters 2337 and 377.",
        sourceKey: "columbus_2337",
      },
      {
        text:
          "Timely payment required on the contract date or within 30 days after work completion (§ 2337.03).",
        sourceKey: "columbus_2337",
      },
    ],
    remediesFr: [
      {
        text:
          "Plainte auprès de la Labor Commission avec enquête (chapitres 2337 et 377).",
        sourceKey: "columbus_2337",
      },
      {
        text:
          "Paiement à la date convenue ou dans les 30 jours après achèvement (§ 2337.03).",
        sourceKey: "columbus_2337",
      },
    ],
    complaintEn: {
      channel: "Columbus Labor Commission (via City Code Chapter 377)",
      url: "https://library.municode.com/oh/columbus/codes/code_of_ordinances?nodeId=TIT23GEOFCO_CH2337FRWO",
    },
    complaintFr: {
      channel: "Columbus Labor Commission (chapitre 377 du code municipal)",
      url: "https://library.municode.com/oh/columbus/codes/code_of_ordinances?nodeId=TIT23GEOFCO_CH2337FRWO",
    },
    sourceKeys: ["columbus_2337", "columbus_377"],
  },
};

export function getSourceUrl(key) {
  return SOURCE_URLS[key] || null;
}
