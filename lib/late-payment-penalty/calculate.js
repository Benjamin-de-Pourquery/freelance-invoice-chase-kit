import {
  KNOWN_SEMESTER_RATES,
  calendarDaysBetween,
  semesterForDueDate,
} from "./rates.js";

const RECOVERY_INDEMNITY_EUR = 40;
const DAYS_PER_YEAR = 365;

/**
 * @typedef {'professional' | 'private'} DebtorType
 * @typedef {'none' | 'contractual' | 'statutory_default' | 'floor_minimum' | 'floor_only_unknown_default' | 'unavailable'} RateReason
 */

/**
 * @param {number} value
 * @returns {number}
 */
function roundMoney(value) {
  return Math.round(value * 100) / 100;
}

/**
 * @param {object} input
 * @param {number} input.amountTtc
 * @param {string} input.dueDate YYYY-MM-DD
 * @param {string} input.calcDate YYYY-MM-DD
 * @param {number | null | undefined} input.contractualRatePercent optional annual %
 * @param {DebtorType} input.debtorType
 */
export function calculateLatePaymentPenalties(input) {
  const {
    amountTtc,
    dueDate,
    calcDate,
    contractualRatePercent,
    debtorType,
  } = input;

  const amount = Number(amountTtc);
  const daysLate = Math.max(0, calendarDaysBetween(dueDate, calcDate));
  const semester = semesterForDueDate(dueDate);
  const semesterRates = KNOWN_SEMESTER_RATES[semester.key];

  const base = {
    daysLate,
    semesterKey: semester.key,
    semesterYear: semester.year,
    semesterHalf: semester.half,
    amountTtc: amount,
    interestEur: 0,
    recoveryIndemnityEur: 0,
    totalPenaltiesEur: 0,
    annualRatePercent: null,
    rateBeforeFloorPercent: null,
    rateReason: "none",
    floorPercent: semesterRates?.floorPercent ?? null,
    statutoryDefaultPercent: semesterRates?.defaultStatutoryPercent ?? null,
    bcePercent: semesterRates?.bcePercent ?? null,
    needsManualRate: false,
    warnings: [],
    formula:
      daysLate === 0
        ? null
        : "interest = amount × (annualRate / 100) × (daysLate / 365)",
  };

  if (!Number.isFinite(amount) || amount < 0) {
    return {
      ...base,
      rateReason: "unavailable",
      warnings: ["invalid_amount"],
    };
  }

  if (daysLate === 0) {
    return base;
  }

  const contractual =
    contractualRatePercent === null ||
    contractualRatePercent === undefined ||
    contractualRatePercent === ""
      ? null
      : Number(contractualRatePercent);

  if (contractual !== null && !Number.isFinite(contractual)) {
    return {
      ...base,
      rateReason: "unavailable",
      warnings: ["invalid_contractual_rate"],
    };
  }

  let rateBeforeFloor = null;
  let rateReason = "none";
  let needsManualRate = false;
  const warnings = [];

  if (contractual !== null) {
    rateBeforeFloor = contractual;
    rateReason = "contractual";
  } else if (semesterRates) {
    rateBeforeFloor = semesterRates.defaultStatutoryPercent;
    rateReason = "statutory_default";
  } else {
    needsManualRate = true;
    warnings.push("unknown_semester_rates");
    if (base.floorPercent != null) {
      rateBeforeFloor = base.floorPercent;
      rateReason = "floor_only_unknown_default";
    } else {
      warnings.push("floor_unknown");
      return {
        ...base,
        needsManualRate: true,
        warnings,
        rateReason: "unavailable",
      };
    }
  }

  let annualRate = rateBeforeFloor;
  const floor = base.floorPercent;

  if (floor !== null && annualRate < floor) {
    annualRate = floor;
    if (needsManualRate) {
      rateReason = "floor_only_unknown_default";
    } else {
      rateReason = "floor_minimum";
    }
  }

  const interestEur = roundMoney(
    amount * (annualRate / 100) * (daysLate / DAYS_PER_YEAR)
  );

  const recoveryIndemnityEur =
    debtorType === "professional" && daysLate > 0
      ? RECOVERY_INDEMNITY_EUR
      : 0;

  const totalPenaltiesEur = roundMoney(interestEur + recoveryIndemnityEur);

  return {
    ...base,
    interestEur,
    recoveryIndemnityEur,
    totalPenaltiesEur,
    annualRatePercent: annualRate,
    rateBeforeFloorPercent: rateBeforeFloor,
    rateReason,
    needsManualRate,
    warnings,
  };
}

/**
 * @param {ReturnType<typeof calculateLatePaymentPenalties>} result
 * @param {object} opts
 * @param {string} opts.dueDate
 * @param {string} opts.calcDate
 * @param {DebtorType} opts.debtorType
 * @param {'fr' | 'en'} opts.lang
 */
export function buildChaseEmailText(result, opts) {
  const { dueDate, calcDate, debtorType, lang } = opts;
  const isFr = lang === "fr";

  if (result.daysLate === 0) {
    return isFr
      ? `Bonjour,\n\nJe me permets de vous rappeler que la facture dont l'échéance était le ${dueDate} reste impayée à ce jour (${calcDate}). Merci de procéder au règlement dans les meilleurs délais ou de me confirmer une date de paiement.\n\nCordialement`
      : `Hello,\n\nThis is a friendly reminder that the invoice due on ${dueDate} remains unpaid as of ${calcDate}. Please arrange payment at your earliest convenience or confirm a payment date.\n\nBest regards`;
  }

  const rate =
    result.annualRatePercent != null
      ? `${result.annualRatePercent.toFixed(2)}%`
      : isFr
        ? "taux en vigueur"
        : "applicable rate";

  const lines = isFr
    ? [
        "Bonjour,",
        "",
        `La facture échue le ${dueDate} n'a pas été réglée à la date du ${calcDate} (${result.daysLate} jour(s) de retard).`,
        `Conformément à l'article L441-10 du Code de commerce, des pénalités de retard sont exigibles dès le lendemain de l'échéance, sans rappel préalable.`,
        "",
        `Montant de la facture (TTC) : ${result.amountTtc.toFixed(2)} €`,
        `Intérêts de retard (${rate}, base annuelle) : ${result.interestEur.toFixed(2)} €`,
      ]
    : [
        "Hello,",
        "",
        `The invoice due on ${dueDate} was not paid by ${calcDate} (${result.daysLate} calendar day(s) late).`,
        `Under French Commercial Code article L441-10, late-payment penalties are due from the day after the due date, without a prior reminder.`,
        "",
        `Invoice amount (incl. tax): €${result.amountTtc.toFixed(2)}`,
        `Late-payment interest (${rate}, annual basis): €${result.interestEur.toFixed(2)}`,
      ];

  if (result.recoveryIndemnityEur > 0) {
    lines.push(
      isFr
        ? `Indemnité forfaitaire de recouvrement (client professionnel, art. D441-5) : ${result.recoveryIndemnityEur.toFixed(2)} €`
        : `Flat recovery indemnity (professional debtor, art. D441-5): €${result.recoveryIndemnityEur.toFixed(2)}`
    );
  } else if (debtorType === "private") {
    lines.push(
      isFr
        ? "Indemnité forfaitaire de recouvrement : non applicable (client particulier)."
        : "Flat recovery indemnity: not applicable (private individual debtor)."
    );
  }

  lines.push(
    "",
    isFr
      ? `Total pénalités estimées : ${result.totalPenaltiesEur.toFixed(2)} € (hors principal). Merci de régulariser le principal et les pénalités, ou de me confirmer une date de paiement.`
      : `Estimated penalties total: €${result.totalPenaltiesEur.toFixed(2)} (excluding principal). Please settle the principal and penalties, or confirm a payment date.`,
    "",
    isFr ? "Cordialement" : "Best regards"
  );

  return lines.join("\n");
}
