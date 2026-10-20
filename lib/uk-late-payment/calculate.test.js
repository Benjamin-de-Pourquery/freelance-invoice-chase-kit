import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  buildUkChaseEmailText,
  calculateUkLatePayment,
  dueDateFromInvoiceReceipt,
} from "./calculate.js";
import {
  fixedCompensationGbp,
  interestStartFromDueDate,
  referencePeriodForInterestStart,
} from "./rates.js";

describe("dueDateFromInvoiceReceipt", () => {
  it("adds 30 calendar days to the receipt date", () => {
    assert.equal(dueDateFromInvoiceReceipt("2026-06-01"), "2026-07-01");
    assert.equal(dueDateFromInvoiceReceipt("2026-01-15"), "2026-02-14");
  });
});

describe("referencePeriodForInterestStart", () => {
  it("uses H1 reference when interest starts on 30 June", () => {
    const start = interestStartFromDueDate("2026-06-29");
    assert.equal(start, "2026-06-30");
    const ref = referencePeriodForInterestStart(start);
    assert.equal(ref.periodKey, "2026-H1");
    assert.equal(ref.referenceDate, "2025-12-31");
    assert.equal(ref.bankRatePercent, 3.75);
    assert.equal(ref.statutoryPercent, 11.75);
  });

  it("uses H2 reference when interest starts on 1 July", () => {
    const start = interestStartFromDueDate("2026-06-30");
    assert.equal(start, "2026-07-01");
    const ref = referencePeriodForInterestStart(start);
    assert.equal(ref.periodKey, "2026-H2");
    assert.equal(ref.referenceDate, "2026-06-30");
    assert.equal(ref.bankRatePercent, 3.75);
    assert.equal(ref.statutoryPercent, 11.75);
  });

  it("uses H1 reference when interest starts on 1 January", () => {
    const start = interestStartFromDueDate("2025-12-31");
    assert.equal(start, "2026-01-01");
    const ref = referencePeriodForInterestStart(start);
    assert.equal(ref.periodKey, "2026-H1");
    assert.equal(ref.referenceDate, "2025-12-31");
    assert.equal(ref.bankRatePercent, 3.75);
  });

  it("uses H2 reference when interest starts on 31 December", () => {
    const start = interestStartFromDueDate("2026-12-30");
    assert.equal(start, "2026-12-31");
    const ref = referencePeriodForInterestStart(start);
    assert.equal(ref.periodKey, "2026-H2");
    assert.equal(ref.referenceDate, "2026-06-30");
    assert.equal(ref.bankRatePercent, 3.75);
  });
});

describe("fixedCompensationGbp", () => {
  it("applies band edges correctly", () => {
    assert.equal(fixedCompensationGbp(999.99), 40);
    assert.equal(fixedCompensationGbp(1000), 70);
    assert.equal(fixedCompensationGbp(9999.99), 70);
    assert.equal(fixedCompensationGbp(10000), 100);
  });
});

describe("calculateUkLatePayment", () => {
  it("returns zero when not late", () => {
    const r = calculateUkLatePayment({
      amountGbp: 5000,
      dueDate: "2026-10-01",
      calcDate: "2026-10-01",
      contractualRatePercent: null,
      debtorType: "business",
    });
    assert.equal(r.daysLate, 0);
    assert.equal(r.interestGbp, 0);
    assert.equal(r.compensationGbp, 0);
    assert.equal(r.totalGbp, 0);
  });

  it("returns zero interest for negative or zero late days via calc before due", () => {
    const r = calculateUkLatePayment({
      amountGbp: 1000,
      dueDate: "2026-10-15",
      calcDate: "2026-10-01",
      contractualRatePercent: null,
      debtorType: "business",
    });
    assert.equal(r.daysLate, 0);
    assert.equal(r.interestGbp, 0);
  });

  it("computes H2 2026 statutory interest at 11.75%", () => {
    const r = calculateUkLatePayment({
      amountGbp: 1000,
      dueDate: "2026-08-01",
      calcDate: "2026-09-01",
      contractualRatePercent: null,
      debtorType: "business",
    });
    assert.equal(r.daysLate, 31);
    assert.equal(r.rateReason, "statutory");
    assert.equal(r.annualRatePercent, 11.75);
    assert.equal(r.bankRatePercent, 3.75);
    assert.equal(r.periodKey, "2026-H2");
    const expected = Math.round(1000 * (11.75 / 100) * (31 / 365) * 100) / 100;
    assert.equal(r.interestGbp, expected);
    assert.equal(r.compensationGbp, 70);
    assert.equal(r.totalGbp, Math.round((expected + 70) * 100) / 100);
    assert.equal(r.dailyInterestGbp, Math.round((1000 * (11.75 / 100) / 365) * 100) / 100);
  });

  it("applies contractual rate override instead of statutory", () => {
    const r = calculateUkLatePayment({
      amountGbp: 1000,
      dueDate: "2026-08-01",
      calcDate: "2026-09-01",
      contractualRatePercent: 5,
      debtorType: "business",
    });
    assert.equal(r.rateReason, "contractual");
    assert.equal(r.annualRatePercent, 5);
    assert.equal(r.bankRatePercent, null);
    const expected = Math.round(1000 * (5 / 100) * (31 / 365) * 100) / 100;
    assert.equal(r.interestGbp, expected);
  });

  it("excludes consumer debts", () => {
    const r = calculateUkLatePayment({
      amountGbp: 1000,
      dueDate: "2026-08-01",
      calcDate: "2026-09-01",
      contractualRatePercent: null,
      debtorType: "consumer",
    });
    assert.equal(r.consumerNotApplicable, true);
    assert.equal(r.interestGbp, 0);
    assert.equal(r.compensationGbp, 0);
  });

  it("chase email cites statutory Act when statutory rate applies", () => {
    const result = calculateUkLatePayment({
      amountGbp: 1000,
      dueDate: "2026-08-01",
      calcDate: "2026-09-01",
      contractualRatePercent: null,
      debtorType: "business",
    });
    const en = buildUkChaseEmailText(result, {
      dueDate: "2026-08-01",
      calcDate: "2026-09-01",
      debtorType: "business",
      lang: "en",
    });
    assert.match(en, /Late Payment of Commercial Debts \(Interest\) Act 1998/);
    assert.match(en, /statutory interest of 11\.75%/);
  });
});
