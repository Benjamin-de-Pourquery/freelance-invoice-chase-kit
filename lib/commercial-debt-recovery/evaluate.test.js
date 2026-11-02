import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  evaluateCommercialDebtSelfCheck,
  isValidSelfCheckOutcome,
} from "./evaluate.js";

const eligibleBase = {
  creditorIsCommercant: "yes",
  debtorIsCommercant: "yes",
  invoicedBetweenCommercant: true,
  dueDatePassed: true,
  debtCertainLiquidExigible: "yes",
  debtorContests: false,
};

describe("evaluateCommercialDebtSelfCheck", () => {
  it("returns likely when all criteria are met", () => {
    const result = evaluateCommercialDebtSelfCheck(eligibleBase);
    assert.equal(result.outcome, "likely");
    assert.ok(isValidSelfCheckOutcome(result.outcome));
  });

  it("returns unlikely when the debtor contests", () => {
    const result = evaluateCommercialDebtSelfCheck({
      ...eligibleBase,
      debtorContests: true,
    });
    assert.equal(result.outcome, "unlikely");
    assert.ok(result.reasons.includes("debtor_contests"));
  });

  it("returns unlikely when either party is not a commerçant", () => {
    assert.equal(
      evaluateCommercialDebtSelfCheck({
        ...eligibleBase,
        creditorIsCommercant: "no",
      }).outcome,
      "unlikely"
    );
    assert.equal(
      evaluateCommercialDebtSelfCheck({
        ...eligibleBase,
        debtorIsCommercant: "no",
      }).outcome,
      "unlikely"
    );
  });

  it("returns uncertain when commerçant status is unclear", () => {
    const result = evaluateCommercialDebtSelfCheck({
      ...eligibleBase,
      creditorIsCommercant: "unsure",
    });
    assert.equal(result.outcome, "uncertain");
  });

  it("returns unlikely when the due date has not passed", () => {
    const result = evaluateCommercialDebtSelfCheck({
      ...eligibleBase,
      dueDatePassed: false,
    });
    assert.equal(result.outcome, "unlikely");
    assert.ok(result.reasons.includes("not_exigible"));
  });
});
