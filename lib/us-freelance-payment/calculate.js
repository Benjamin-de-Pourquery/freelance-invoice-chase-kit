import { LAST_VERIFIED } from "./sources.js";
import {
  JURISDICTION_RULES,
  resolveLosAngelesLawKey,
} from "./jurisdictions.js";

/**
 * @param {string} fromIso YYYY-MM-DD
 * @param {string} toIso YYYY-MM-DD
 * @returns {number}
 */
export function calendarDaysBetween(fromIso, toIso) {
  const from = new Date(`${fromIso}T12:00:00Z`);
  const to = new Date(`${toIso}T12:00:00Z`);
  const ms = to.getTime() - from.getTime();
  return Math.round(ms / (24 * 60 * 60 * 1000));
}

/**
 * @param {string} iso
 * @param {number} days
 * @returns {string}
 */
export function addCalendarDays(iso, days) {
  const d = new Date(`${iso}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/**
 * @typedef {object} UsFreelancePaymentInput
 * @property {string} jurisdictionId
 * @property {number} contractValue
 * @property {number} [aggregatedValue120Days]
 * @property {number} [aggregatedValueCalendarYear]
 * @property {number} [contractValue7DayWindow]
 * @property {string} [contractEnteredDate]
 * @property {boolean} [isProfessionalServices]
 * @property {boolean} [workPerformedInCity]
 * @property {boolean} governmentClient
 * @property {boolean} hasWrittenContract
 * @property {boolean} hasAgreedPaymentDate
 * @property {string} [agreedPaymentDate]
 * @property {string} completionDate
 * @property {string} [notificationDate]
 * @property {string} calcDate
 */

/**
 * @param {UsFreelancePaymentInput} input
 * @param {object} rules
 */
function meetsThreshold(input, rules) {
  const contractValue = input.contractValue || 0;
  const agg120 = (input.aggregatedValue120Days || 0) + contractValue;
  const aggYear = (input.aggregatedValueCalendarYear || 0) + contractValue;
  const sevenDay = input.contractValue7DayWindow || 0;

  if (rules.id === "minneapolis") {
    if (contractValue >= 600) return { ok: true };
    if (aggYear >= 600) return { ok: true };
    if (sevenDay >= 200 || contractValue >= 200) {
      return { ok: true, note: "seven_day_window" };
    }
    return {
      ok: false,
      reason: "below_threshold",
      detail:
        "Under $600 calendar-year aggregate, under $600 for this contract, and under $200 seven-day window.",
    };
  }

  if (rules.aggregationWindow === "120_days") {
    if (agg120 < rules.minThreshold) {
      return { ok: false, reason: "below_threshold", detail: "120_day_aggregate" };
    }
  } else if (rules.aggregationWindow === "calendar_year") {
    if (aggYear < rules.minThreshold && contractValue < rules.minThreshold) {
      return { ok: false, reason: "below_threshold", detail: "calendar_year" };
    }
  }

  if (rules.requiresProfessionalServices && !input.isProfessionalServices) {
    return {
      ok: false,
      reason: "not_professional_services",
      detail: "professional_services_required",
    };
  }

  if (rules.id === "ca_state") {
    const entered = input.contractEnteredDate || "";
    if (entered && entered < "2025-01-01") {
      return { ok: false, reason: "contract_before_effective_date" };
    }
  }

  if (rules.id === "los_angeles") {
    const entered = input.contractEnteredDate || "";
    if (entered && entered < "2023-07-01") {
      return { ok: false, reason: "contract_before_effective_date" };
    }
    if (input.workPerformedInCity === false) {
      return { ok: false, reason: "work_outside_city" };
    }
  }

  return { ok: true };
}

/**
 * @param {UsFreelancePaymentInput} input
 * @param {object} rules
 */
function computeDueDate(input, rules) {
  if (input.hasAgreedPaymentDate && input.agreedPaymentDate) {
    return {
      dueDate: input.agreedPaymentDate,
      basis: "agreed_date",
      basisDetailEn: "Payment due on the agreed date in the contract.",
      basisDetailFr: "Paiement dû à la date convenue au contrat.",
    };
  }

  const startIso =
    rules.notificationStartsDefaultClock && input.notificationDate
      ? input.notificationDate
      : input.completionDate;

  const dueDate = addCalendarDays(startIso, 30);
  const basisDetailEn = rules.notificationStartsDefaultClock
    ? "No payment date in the contract: due 30 days after you notified the hiring party that work was complete."
    : "No payment date in the contract: due 30 days after completion of services.";
  const basisDetailFr = rules.notificationStartsDefaultClock
    ? "Pas de date au contrat : 30 jours après notification d'achèvement au client."
    : "Pas de date au contrat : 30 jours après achèvement des services.";

  return {
    dueDate,
    basis: "completion_plus_30",
    basisDetailEn,
    basisDetailFr,
  };
}

/**
 * @param {UsFreelancePaymentInput} input
 * @returns {object}
 */
export function calculateUsFreelancePayment(input) {
  let jurisdictionId = input.jurisdictionId;
  let laResolvedFrom = null;
  if (jurisdictionId === "los_angeles") {
    const resolved = resolveLosAngelesLawKey(input);
    if (resolved !== "los_angeles") {
      laResolvedFrom = "los_angeles";
      jurisdictionId = resolved;
    }
  }

  const rules = JURISDICTION_RULES[jurisdictionId];
  if (!rules) {
    return {
      status: "general_contract_law",
      lastVerified: LAST_VERIFIED,
      messageEn: "Unknown location selected.",
      messageFr: "Lieu inconnu.",
    };
  }

  if (rules.governmentClientExcluded && input.governmentClient) {
    return {
      status: "general_contract_law",
      lastVerified: LAST_VERIFIED,
      jurisdictionId,
      rules,
      messageEn:
        "No specific freelance payment law applies to this government hiring party. General contract law may still govern payment.",
      messageFr:
        "Aucune loi freelance spécifique pour ce client public. Le droit commun des contrats peut s'appliquer.",
      governmentExcluded: true,
      sources: rules.sourceKeys,
    };
  }

  const threshold = meetsThreshold(input, rules);
  if (!threshold.ok) {
    return {
      status: "general_contract_law",
      lastVerified: LAST_VERIFIED,
      jurisdictionId,
      rules,
      belowThreshold: threshold.reason === "below_threshold",
      notProfessionalServices: threshold.reason === "not_professional_services",
      contractBeforeEffective: threshold.reason === "contract_before_effective_date",
      messageEn:
        threshold.reason === "below_threshold"
          ? "Contract value is below the threshold for this freelance payment law. General contract law may apply."
          : threshold.reason === "not_professional_services"
            ? "California's statewide act covers professional services only. General contract law may apply."
            : threshold.reason === "contract_before_effective_date"
              ? "This contract appears to predate the effective date of the local freelance law. General contract law may apply."
              : "This situation is not covered by the selected freelance payment law. General contract law may apply.",
      messageFr:
        threshold.reason === "below_threshold"
          ? "Montant sous le seuil de la loi freelance. Le droit commun des contrats peut s'appliquer."
          : "Situation non couverte par la loi sélectionnée. Droit commun des contrats.",
      sources: rules.sourceKeys,
    };
  }

  const due = computeDueDate(input, rules);
  const daysLate = Math.max(
    0,
    calendarDaysBetween(due.dueDate, input.calcDate)
  );
  const isLate = daysLate > 0;

  const warnings = [];
  if (rules.writtenContractRequired && !input.hasWrittenContract) {
    warnings.push("missing_written_contract");
  }
  if (laResolvedFrom === "los_angeles" && jurisdictionId === "ca_state") {
    warnings.push("la_superseded_by_ca_fwpa");
  }

  return {
    status: "covered",
    lastVerified: LAST_VERIFIED,
    jurisdictionId,
    rules,
    laResolvedFrom,
    lawNameEn: rules.lawNameEn,
    lawNameFr: rules.lawNameFr,
    effectiveNoteEn: rules.effectiveNoteEn,
    effectiveNoteFr: rules.effectiveNoteFr,
    paymentDueDate: due.dueDate,
    paymentDueBasis: due.basis,
    paymentDueDetailEn: due.basisDetailEn,
    paymentDueDetailFr: due.basisDetailFr,
    daysLate,
    isLate,
    writtenContractRequired: rules.writtenContractRequired,
    hasWrittenContract: input.hasWrittenContract,
    warnings,
    remediesEn: rules.remediesEn,
    remediesFr: rules.remediesFr,
    complaintEn: rules.complaintEn,
    complaintFr: rules.complaintFr,
    precedenceNoteEn: rules.precedenceNoteEn || null,
    precedenceNoteFr: rules.precedenceNoteFr || null,
    sources: rules.sourceKeys,
  };
}

/**
 * @param {ReturnType<typeof calculateUsFreelancePayment>} result
 * @param {object} ctx
 */
export function buildUsChaseEmailText(result, ctx) {
  const {
    contractValue,
    calcDate,
    clientName = "Client",
    freelancerName = "[Your name]",
    invoiceRef = "[Invoice or project reference]",
  } = ctx;

  if (result.status !== "covered") {
    return "";
  }

  const law = result.lawNameEn;
  const due = result.paymentDueDate;
  const amount = Number(contractValue).toFixed(2);

  const lateParagraph = result.isLate
    ? `Our records show payment was due on ${due}, which is now ${result.daysLate} day(s) past that deadline (as of ${calcDate}).`
    : `Payment is due on ${due}. As of ${calcDate}, this date has not yet passed.`;

  return `Subject: Payment follow-up: ${invoiceRef}

Dear ${clientName},

I hope you are well. I am writing regarding ${invoiceRef} for freelance services totaling $${amount}.

Under the ${law}, agreed compensation must be paid on time. ${lateParagraph}

Please confirm when payment will be sent, or let me know if you need any further documentation to process the invoice.

Thank you for your prompt attention.

Best regards,
${freelancerName}`;
}
