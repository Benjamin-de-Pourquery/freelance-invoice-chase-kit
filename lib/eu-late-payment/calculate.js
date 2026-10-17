import {
  addOneDay,
  calendarDaysBetween,
  parseIsoDate,
} from "../late-payment-penalty/rates.js";
import {
  EU_COUNTRY_RATES,
  STATUTORY_RATE_PERIOD,
} from "./rates.js";

const RECOVERY_INDEMNITY_EUR = 40;
const DAYS_PER_YEAR = 365;
const DEFAULT_PAYMENT_DAYS = 30;

/**
 * @typedef {'business' | 'public_authority' | 'consumer'} EuDebtorType
 * @typedef {'contractual' | 'agreed' | 'statutory' | 'excluded_outside_period' | 'consumer_not_applicable' | 'poland_needs_contractual_rate' | 'poland_choose_sector' | 'none'} EuRateReason
 */

/**
 * @param {string} countryKey
 * @returns {boolean}
 */
function isPolandCountryKey(countryKey) {
  return countryKey === "poland" || countryKey.startsWith("poland_");
}

/**
 * Statutory rates published for Poland on Your Europe apply to public-authority debtors only.
 *
 * @param {string} countryKey
 * @param {EuDebtorType} debtorType
 * @param {number | null | undefined} ratePercent
 * @returns {number | null}
 */
function effectiveStatutoryRatePercent(countryKey, debtorType, ratePercent) {
  if (ratePercent == null) {
    return null;
  }
  if (isPolandCountryKey(countryKey) && debtorType !== "public_authority") {
    return null;
  }
  return ratePercent;
}

/**
 * @param {number} value
 * @returns {number}
 */
function roundMoney(value) {
  return Math.round(value * 100) / 100;
}

/**
 * @param {string} isoDate
 */
function subtractOneDay(isoDate) {
  const d = parseIsoDate(isoDate);
  d.setUTCDate(d.getUTCDate() - 1);
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/**
 * @param {string} dueDate ISO (payment due)
 * @param {string} calcDate ISO
 * @param {string} windowStart ISO
 * @param {string} windowEnd ISO
 * @returns {{ startDate: string, endDate: string, days: number, inWindow: boolean }[]}
 */
export function splitLatePeriodByStatutoryWindow(
  dueDate,
  calcDate,
  windowStart,
  windowEnd
) {
  const daysLate = calendarDaysBetween(dueDate, calcDate);
  if (daysLate <= 0) {
    return [];
  }

  let cursor = addOneDay(dueDate);
  const segments = [];

  while (calendarDaysBetween(cursor, calcDate) >= 0) {
    const inWindow =
      calendarDaysBetween(windowStart, cursor) >= 0 &&
      calendarDaysBetween(cursor, windowEnd) >= 0;

    let segmentEnd;
    if (inWindow) {
      segmentEnd =
        calendarDaysBetween(calcDate, windowEnd) >= 0 ? calcDate : windowEnd;
    } else if (calendarDaysBetween(cursor, windowStart) > 0) {
      const lastBeforeWindow = subtractOneDay(windowStart);
      segmentEnd =
        calendarDaysBetween(calcDate, windowStart) > 0 ? calcDate : lastBeforeWindow;
    } else {
      segmentEnd = calcDate;
    }

    const days = calendarDaysBetween(cursor, segmentEnd) + 1;
    if (days > 0) {
      segments.push({
        startDate: cursor,
        endDate: segmentEnd,
        days,
        inWindow,
      });
    }
    cursor = addOneDay(segmentEnd);
  }

  return segments;
}

/**
 * @param {string} receiptDate ISO
 * @returns {string} due date ISO (receipt + 30 calendar days)
 */
export function dueDateFromInvoiceReceipt(receiptDate) {
  const d = parseIsoDate(receiptDate);
  d.setUTCDate(d.getUTCDate() + DEFAULT_PAYMENT_DAYS);
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/**
 * @param {object} input
 * @param {number} input.amountTtc
 * @param {string} input.dueDate YYYY-MM-DD (effective due date)
 * @param {string} input.calcDate YYYY-MM-DD
 * @param {number | null | undefined} input.contractualRatePercent
 * @param {EuDebtorType} input.debtorType
 * @param {string} input.countryKey key in EU_COUNTRY_RATES
 */
export function calculateEuLatePayment(input) {
  const {
    amountTtc,
    dueDate,
    calcDate,
    contractualRatePercent,
    debtorType,
    countryKey,
  } = input;

  const amount = Number(amountTtc);
  const daysLate = Math.max(0, calendarDaysBetween(dueDate, calcDate));
  const country = EU_COUNTRY_RATES[countryKey];
  const statutoryPercent = effectiveStatutoryRatePercent(
    countryKey,
    debtorType,
    country?.ratePercent ?? null
  );

  const base = {
    daysLate,
    interestDays: 0,
    excludedDaysOutsidePeriod: 0,
    amountTtc: amount,
    interestEur: 0,
    recoveryIndemnityEur: 0,
    totalPenaltiesEur: 0,
    annualRatePercent: null,
    rateReason: "none",
    needsOutsidePeriodRate: false,
    needsPolandContractualRate: false,
    needsPolandChooseSector: false,
    consumerNotApplicable: false,
    countryKey,
    statutoryPercent,
    interestBreakdown: [],
    formula:
      daysLate === 0
        ? null
        : "interest = amount × (annualRate / 100) × (days / 365)",
    periodLabel: STATUTORY_RATE_PERIOD,
  };

  if (!Number.isFinite(amount) || amount < 0) {
    return { ...base, rateReason: "none", warnings: ["invalid_amount"] };
  }

  if (daysLate === 0) {
    return base;
  }

  if (debtorType === "consumer") {
    return {
      ...base,
      consumerNotApplicable: true,
      rateReason: "consumer_not_applicable",
      formula: null,
    };
  }

  const contractual =
    contractualRatePercent === null ||
    contractualRatePercent === undefined ||
    contractualRatePercent === ""
      ? null
      : Number(contractualRatePercent);

  if (contractual !== null && !Number.isFinite(contractual)) {
    return { ...base, rateReason: "none", warnings: ["invalid_contractual_rate"] };
  }

  const polandBusinessNeedsContractual =
    isPolandCountryKey(countryKey) &&
    debtorType === "business" &&
    contractual === null;

  if (polandBusinessNeedsContractual) {
    const recoveryIndemnityEur = RECOVERY_INDEMNITY_EUR;
    return {
      ...base,
      needsPolandContractualRate: true,
      rateReason: "poland_needs_contractual_rate",
      recoveryIndemnityEur,
      totalPenaltiesEur: roundMoney(recoveryIndemnityEur),
      formula: null,
    };
  }

  const polandPublicNeedsSector =
    countryKey === "poland" &&
    debtorType === "public_authority" &&
    contractual === null;

  if (polandPublicNeedsSector) {
    const recoveryIndemnityEur = RECOVERY_INDEMNITY_EUR;
    return {
      ...base,
      needsPolandChooseSector: true,
      rateReason: "poland_choose_sector",
      recoveryIndemnityEur,
      totalPenaltiesEur: roundMoney(recoveryIndemnityEur),
      formula: null,
    };
  }

  const segments = splitLatePeriodByStatutoryWindow(
    dueDate,
    calcDate,
    STATUTORY_RATE_PERIOD.start,
    STATUTORY_RATE_PERIOD.end
  );

  const interestDays = segments.reduce((sum, seg) => sum + seg.days, 0);
  let excludedDaysOutsidePeriod = 0;
  let needsOutsidePeriodRate = false;
  let interestEur = 0;
  const interestBreakdown = [];

  for (const segment of segments) {
    if (!segment.inWindow && contractual === null) {
      excludedDaysOutsidePeriod += segment.days;
      needsOutsidePeriodRate = true;
      interestBreakdown.push({
        ...segment,
        annualRatePercent: null,
        rateReason: "excluded_outside_period",
        interestEur: 0,
      });
      continue;
    }

    const annualRate =
      contractual !== null ? contractual : statutoryPercent;
    if (annualRate == null) {
      return {
        ...base,
        interestDays,
        excludedDaysOutsidePeriod,
        needsOutsidePeriodRate: true,
        rateReason: "none",
      };
    }

    const segmentInterest = roundMoney(
      amount * (annualRate / 100) * (segment.days / DAYS_PER_YEAR)
    );
    interestEur += segmentInterest;

    interestBreakdown.push({
      ...segment,
      annualRatePercent: annualRate,
      rateReason: contractual !== null ? "contractual" : "statutory",
      interestEur: segmentInterest,
    });
  }

  interestEur = roundMoney(interestEur);

  const recoveryIndemnityEur =
    debtorType === "business" || debtorType === "public_authority"
      ? RECOVERY_INDEMNITY_EUR
      : 0;

  const totalPenaltiesEur = roundMoney(interestEur + recoveryIndemnityEur);

  let annualRatePercent = null;
  let rateReason = "none";
  const computedSegments = interestBreakdown.filter(
    (row) => row.interestEur > 0 || row.rateReason === "statutory"
  );

  if (contractual !== null) {
    annualRatePercent = contractual;
    rateReason = "contractual";
  } else if (interestBreakdown.some((row) => row.rateReason === "statutory")) {
    annualRatePercent = statutoryPercent;
    rateReason = "statutory";
  }

  if (needsOutsidePeriodRate && contractual === null) {
    rateReason =
      interestEur > 0 ? "statutory" : rateReason;
  }

  const interestDaysComputed = interestBreakdown
    .filter((row) => row.interestEur > 0)
    .reduce((sum, row) => sum + row.days, 0);

  return {
    ...base,
    interestDays: interestDaysComputed || interestDays,
    excludedDaysOutsidePeriod,
    needsOutsidePeriodRate,
    interestEur,
    recoveryIndemnityEur,
    totalPenaltiesEur,
    annualRatePercent,
    rateReason,
    interestBreakdown,
  };
}

/**
 * @param {ReturnType<typeof calculateEuLatePayment>} result
 * @param {object} opts
 * @param {string} opts.dueDate
 * @param {string} opts.calcDate
 * @param {EuDebtorType} opts.debtorType
 * @param {string} opts.countryLabel
 * @param {'fr' | 'en'} opts.lang
 */
export function buildEuChaseEmailText(result, opts) {
  const { dueDate, calcDate, debtorType, countryLabel, lang } = opts;
  const isFr = lang === "fr";

  if (result.consumerNotApplicable) {
    return isFr
      ? `Bonjour,\n\nJe me permets de vous rappeler que la facture échue le ${dueDate} reste impayée à ce jour (${calcDate}). Les règles européennes sur les intérêts de retard B2B ne s'appliquent pas aux consommateurs.\n\nCordialement`
      : `Hello,\n\nThis is a reminder that the invoice due on ${dueDate} remains unpaid as of ${calcDate}. EU B2B late-payment interest rules do not apply to consumer debtors.\n\nBest regards`;
  }

  if (result.daysLate === 0) {
    return isFr
      ? `Bonjour,\n\nJe me permets de vous rappeler que la facture dont l'échéance était le ${dueDate} reste impayée à ce jour (${calcDate}). Merci de procéder au règlement dans les meilleurs délais ou de me confirmer une date de paiement.\n\nCordialement`
      : `Hello,\n\nThis is a friendly reminder that the invoice due on ${dueDate} remains unpaid as of ${calcDate}. Please arrange payment at your earliest convenience or confirm a payment date.\n\nBest regards`;
  }

  const rate =
    result.annualRatePercent != null
      ? `${result.annualRatePercent.toFixed(2)}%`
      : isFr
        ? "taux applicable"
        : "applicable rate";

  const lines = isFr
    ? [
        "Bonjour,",
        "",
        `La facture échue le ${dueDate} n'a pas été réglée à la date du ${calcDate} (${result.daysLate} jour(s) de retard).`,
        `Pays dont la loi régit le contrat (référence) : ${countryLabel}.`,
      ]
    : [
        "Hello,",
        "",
        `The invoice due on ${dueDate} was not paid by ${calcDate} (${result.daysLate} calendar day(s) late).`,
        `Country whose law governs the contract (reference): ${countryLabel}.`,
      ];

  if (result.needsPolandContractualRate) {
    lines.push(
      isFr
        ? "Les intérêts de retard seront calculés au taux prévu au contrat."
        : "Late-payment interest will be calculated at the rate set in the contract."
    );
  } else if (result.needsPolandChooseSector) {
    lines.push(
      isFr
        ? "Intérêts de retard : à calculer selon le taux publié sur Your Europe pour le secteur public concerné."
        : "Late-payment interest: to be calculated at the rate published on Your Europe for the relevant public sector."
    );
  } else if (debtorType === "public_authority") {
    lines.push(
      isFr
        ? "En l'absence de taux contractuel, le taux d'intérêt légal s'applique (Your Europe)."
        : "When no contractual rate was agreed, the statutory interest rate applies (Your Europe)."
    );
  } else {
    lines.push(
      isFr
        ? "Les intérêts de retard B2B sont exigibles à compter du lendemain de l'échéance (Your Europe)."
        : "B2B late-payment interest runs from the day after the due date (Your Europe)."
    );
  }

  lines.push(
    "",
    isFr
      ? `Montant de la facture (TTC) : ${result.amountTtc.toFixed(2)} €`
      : `Invoice amount (incl. VAT): €${result.amountTtc.toFixed(2)}`
  );

  if (result.interestBreakdown.length > 1) {
    for (const row of result.interestBreakdown) {
      if (row.rateReason === "excluded_outside_period") {
        lines.push(
          isFr
            ? `Période ${row.startDate} au ${row.endDate} (${row.days} j.) : hors plage de taux préchargée dans l'outil.`
            : `Period ${row.startDate} to ${row.endDate} (${row.days} d.): outside the rate period loaded in this tool.`
        );
      } else {
        lines.push(
          isFr
            ? `Intérêts ${row.startDate} au ${row.endDate} (${row.days} j., ${row.annualRatePercent.toFixed(2)} %) : ${row.interestEur.toFixed(2)} €`
            : `Interest ${row.startDate} to ${row.endDate} (${row.days} d., ${row.annualRatePercent.toFixed(2)}%): €${row.interestEur.toFixed(2)}`
        );
      }
    }
    lines.push(
      isFr
        ? `Total intérêts de retard : ${result.interestEur.toFixed(2)} €`
        : `Total late-payment interest: €${result.interestEur.toFixed(2)}`
    );
  } else if (!result.needsPolandContractualRate && !result.needsPolandChooseSector) {
    lines.push(
      isFr
        ? `Intérêts de retard (${rate}, base annuelle) : ${result.interestEur.toFixed(2)} €`
        : `Late-payment interest (${rate}, annual basis): €${result.interestEur.toFixed(2)}`
    );
  }

  if (result.recoveryIndemnityEur > 0) {
    lines.push(
      isFr
        ? `Indemnité forfaitaire de recouvrement (40 € ou équivalent, peut être plus élevée selon le pays et le montant) : ${result.recoveryIndemnityEur.toFixed(2)} €`
        : `Flat recovery compensation (EUR 40 or equivalent; may be higher in some countries depending on invoice value): €${result.recoveryIndemnityEur.toFixed(2)}`
    );
  }

  lines.push(
    "",
    isFr
      ? `Total estimé (hors principal) : ${result.totalPenaltiesEur.toFixed(2)} €. Merci de régulariser le principal et les montants ci-dessus, ou de me confirmer une date de paiement.`
      : `Estimated total (excluding principal): €${result.totalPenaltiesEur.toFixed(2)}. Please settle the principal and the amounts above, or confirm a payment date.`,
    "",
    isFr ? "Cordialement" : "Best regards"
  );

  return lines.join("\n");
}
