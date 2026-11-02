/**
 * Client-side self-check for the commercial uncontested debt recovery procedure.
 * Returns informational outcomes only (not legal advice).
 */

const OUTCOMES = ["likely", "unlikely", "uncertain"];

/**
 * @param {{
 *   creditorIsCommercant: "yes" | "no" | "unsure";
 *   debtorIsCommercant: "yes" | "no" | "unsure";
 *   invoicedBetweenCommercant: boolean;
 *   dueDatePassed: boolean;
 *   debtCertainLiquidExigible: "yes" | "no" | "unsure";
 *   debtorContests: boolean;
 * }} input
 */
export function evaluateCommercialDebtSelfCheck(input) {
  const reasons = [];

  if (input.debtorContests) {
    reasons.push("debtor_contests");
  }
  if (!input.invoicedBetweenCommercant) {
    reasons.push("not_commercial_invoice");
  }
  if (!input.dueDatePassed) {
    reasons.push("not_exigible");
  }
  if (input.creditorIsCommercant === "no") {
    reasons.push("creditor_not_commercant");
  }
  if (input.debtorIsCommercant === "no") {
    reasons.push("debtor_not_commercant");
  }
  if (input.debtCertainLiquidExigible === "no") {
    reasons.push("debt_not_certain_liquid");
  }

  const hardBlock = reasons.some((r) =>
    [
      "debtor_contests",
      "not_commercial_invoice",
      "not_exigible",
      "creditor_not_commercant",
      "debtor_not_commercant",
      "debt_not_certain_liquid",
    ].includes(r)
  );

  if (hardBlock) {
    return { outcome: "unlikely", reasons };
  }

  const uncertain =
    input.creditorIsCommercant === "unsure" ||
    input.debtorIsCommercant === "unsure" ||
    input.debtCertainLiquidExigible === "unsure";

  if (uncertain) {
    return { outcome: "uncertain", reasons: ["status_unclear"] };
  }

  return { outcome: "likely", reasons: ["criteria_met"] };
}

export function isValidSelfCheckOutcome(value) {
  return OUTCOMES.includes(value);
}
