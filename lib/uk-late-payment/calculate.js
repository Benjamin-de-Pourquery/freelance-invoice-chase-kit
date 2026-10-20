import {
  calendarDaysBetween,
  parseIsoDate,
} from "../late-payment-penalty/rates.js";
import {
  DAYS_PER_YEAR,
  STATUTORY_MARGIN_PERCENT,
  fixedCompensationGbp,
  interestStartFromDueDate,
  referencePeriodForInterestStart,
} from "./rates.js";

const DEFAULT_PAYMENT_DAYS = 30;

/**
 * @typedef {'business' | 'public_authority' | 'consumer'} UkDebtorType
 * @typedef {'none' | 'contractual' | 'statutory' | 'consumer_not_applicable' | 'unavailable'} UkRateReason
 */

/**
 * @param {number} value
 * @returns {number}
 */
function roundMoney(value) {
  return Math.round(value * 100) / 100;
}

/**
 * @param {string} receiptDate ISO
 * @returns {string} due date ISO (receipt + 30 calendar days, gov.uk)
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
 * @param {number} input.amountGbp
 * @param {string} input.dueDate YYYY-MM-DD
 * @param {string} input.calcDate YYYY-MM-DD
 * @param {number | null | undefined} input.contractualRatePercent
 * @param {UkDebtorType} input.debtorType
 */
export function calculateUkLatePayment(input) {
  const {
    amountGbp,
    dueDate,
    calcDate,
    contractualRatePercent,
    debtorType,
  } = input;

  const amount = Number(amountGbp);
  const daysLate = Math.max(0, calendarDaysBetween(dueDate, calcDate));
  const interestStartDate =
    daysLate > 0 ? interestStartFromDueDate(dueDate) : null;
  const reference =
    interestStartDate != null
      ? referencePeriodForInterestStart(interestStartDate)
      : null;

  const base = {
    daysLate,
    interestDays: daysLate > 0 ? daysLate : 0,
    interestStartDate,
    amountGbp: amount,
    interestGbp: 0,
    dailyInterestGbp: 0,
    compensationGbp: 0,
    totalGbp: 0,
    annualRatePercent: null,
    bankRatePercent: null,
    rateReason: "none",
    periodKey: reference?.periodKey ?? null,
    referenceDate: reference?.referenceDate ?? null,
    periodLabelEn: reference?.labelEn ?? "",
    periodLabelFr: reference?.labelFr ?? "",
    consumerNotApplicable: false,
    needsManualRate: false,
    formula:
      daysLate === 0
        ? null
        : "interest = amount × (annualRate / 100) × (days / 365)",
  };

  if (!Number.isFinite(amount) || amount < 0) {
    return { ...base, rateReason: "unavailable", warnings: ["invalid_amount"] };
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
    return { ...base, rateReason: "unavailable", warnings: ["invalid_contractual_rate"] };
  }

  let annualRatePercent = null;
  let rateReason = "none";
  let bankRatePercent = null;
  let needsManualRate = false;

  if (contractual !== null) {
    annualRatePercent = contractual;
    rateReason = "contractual";
  } else if (reference?.statutoryPercent != null) {
    annualRatePercent = reference.statutoryPercent;
    bankRatePercent = reference.bankRatePercent;
    rateReason = "statutory";
  } else {
    needsManualRate = true;
    rateReason = "unavailable";
  }

  let interestGbp = 0;
  let dailyInterestGbp = 0;
  if (annualRatePercent != null) {
    interestGbp = roundMoney(
      amount * (annualRatePercent / 100) * (daysLate / DAYS_PER_YEAR)
    );
    dailyInterestGbp = roundMoney(
      amount * (annualRatePercent / 100) / DAYS_PER_YEAR
    );
  }

  const compensationGbp =
    debtorType === "business" || debtorType === "public_authority"
      ? fixedCompensationGbp(amount)
      : 0;

  const totalGbp = roundMoney(interestGbp + compensationGbp);

  return {
    ...base,
    interestGbp,
    dailyInterestGbp,
    compensationGbp,
    totalGbp,
    annualRatePercent,
    bankRatePercent,
    rateReason,
    needsManualRate,
    statutoryMarginPercent: STATUTORY_MARGIN_PERCENT,
  };
}

/**
 * @param {ReturnType<typeof calculateUkLatePayment>} result
 * @param {object} opts
 * @param {string} opts.dueDate
 * @param {string} opts.calcDate
 * @param {UkDebtorType} opts.debtorType
 * @param {'fr' | 'en'} opts.lang
 */
export function buildUkChaseEmailText(result, opts) {
  const { dueDate, calcDate, debtorType, lang } = opts;
  const isFr = lang === "fr";

  if (result.consumerNotApplicable) {
    return isFr
      ? `Bonjour,\n\nJe me permets de vous rappeler que la facture échue le ${dueDate} reste impayée à ce jour (${calcDate}). Les règles britanniques sur les intérêts de retard commerciaux ne s'appliquent pas aux dettes de consommateurs.\n\nCordialement`
      : `Hello,\n\nThis is a reminder that the invoice due on ${dueDate} remains unpaid as of ${calcDate}. UK commercial late-payment rules do not apply to consumer debts.\n\nBest regards`;
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
      ]
    : [
        "Hello,",
        "",
        `The invoice due on ${dueDate} was not paid by ${calcDate} (${result.daysLate} calendar day(s) late).`,
      ];

  if (debtorType === "public_authority") {
    lines.push(
      isFr
        ? "Pour un contrat avec une autorité publique, un taux contractuel inférieur au taux légal ne peut pas être appliqué (gov.uk)."
        : "For a contract with a public authority, a contractual rate below the statutory rate cannot be used (gov.uk)."
    );
  }

  if (result.rateReason === "contractual") {
    lines.push(
      isFr
        ? `Des intérêts de retard peuvent être réclamés au taux contractuel de ${rate} (taux convenu au contrat).`
        : `Late-payment interest may be charged at the contractual rate of ${rate} (rate agreed in the contract).`
    );
  } else if (result.rateReason === "statutory" && result.annualRatePercent != null) {
    lines.push(
      isFr
        ? `Au titre de la loi britannique sur le paiement tardif des dettes commerciales (Late Payment of Commercial Debts (Interest) Act 1998), des intérêts légaux de ${rate} par an peuvent s'appliquer à compter du lendemain de l'échéance.`
        : `Under the Late Payment of Commercial Debts (Interest) Act 1998, statutory interest of ${rate} per year may apply from the day after the due date.`
    );
  } else {
    lines.push(
      isFr
        ? "Des intérêts de retard commerciaux peuvent être exigibles au taux légal britannique (vérifiez le taux en vigueur à la date où les intérêts commencent à courir)."
        : "Commercial late-payment interest may be due at the UK statutory rate (check the rate in force when interest starts to run)."
    );
  }

  lines.push(
    "",
    isFr
      ? `Montant de la facture : £${result.amountGbp.toFixed(2)}`
      : `Invoice amount: £${result.amountGbp.toFixed(2)}`
  );

  if (result.interestGbp > 0 || result.rateReason === "statutory") {
    lines.push(
      isFr
        ? `Intérêts de retard estimés (${rate}, intérêts simples) : £${result.interestGbp.toFixed(2)}`
        : `Estimated late-payment interest (${rate}, simple interest): £${result.interestGbp.toFixed(2)}`
    );
  }

  if (result.compensationGbp > 0) {
    lines.push(
      isFr
        ? `Indemnité forfaitaire de recouvrement (une fois par paiement en retard) : £${result.compensationGbp.toFixed(2)}`
        : `Fixed debt recovery compensation (once per late payment): £${result.compensationGbp.toFixed(2)}`
    );
  }

  lines.push(
    "",
    isFr
      ? `Total estimé (hors principal) : £${result.totalGbp.toFixed(2)}. Merci de régulariser le principal et les montants ci-dessus, ou de me confirmer une date de paiement.`
      : `Estimated total (excluding principal): £${result.totalGbp.toFixed(2)}. Please settle the principal and the amounts above, or confirm a payment date.`,
    "",
    isFr ? "Cordialement" : "Best regards"
  );

  return lines.join("\n");
}
