import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { calculateLatePaymentPenalties } from "./calculate.js";
import {
  semesterForDueDate,
  splitLatePeriodBySemester,
} from "./rates.js";

describe("semesterForDueDate", () => {
  it("assigns H1 for January due dates", () => {
    assert.deepEqual(semesterForDueDate("2026-03-15"), {
      year: 2026,
      half: "H1",
      key: "2026-H1",
    });
  });

  it("assigns H2 for July due dates", () => {
    assert.deepEqual(semesterForDueDate("2026-08-01"), {
      year: 2026,
      half: "H2",
      key: "2026-H2",
    });
  });
});

describe("splitLatePeriodBySemester", () => {
  it("splits a period crossing 1 July into two segments", () => {
    const segments = splitLatePeriodBySemester("2026-06-15", "2026-08-15");
    assert.equal(segments.length, 2);
    assert.equal(segments[0].semesterKey, "2026-H1");
    assert.equal(segments[0].days, 15);
    assert.equal(segments[1].semesterKey, "2026-H2");
    assert.equal(segments[1].days, 46);
    assert.equal(segments[0].days + segments[1].days, 61);
  });
});

describe("calculateLatePaymentPenalties", () => {
  it("returns zero penalties when not late", () => {
    const r = calculateLatePaymentPenalties({
      amountTtc: 5000,
      dueDate: "2026-10-01",
      calcDate: "2026-10-01",
      contractualRatePercent: null,
      debtorType: "professional",
    });
    assert.equal(r.daysLate, 0);
    assert.equal(r.interestEur, 0);
    assert.equal(r.recoveryIndemnityEur, 0);
    assert.equal(r.totalPenaltiesEur, 0);
  });

  it("uses H1 2026 statutory default 12.15% without contractual rate", () => {
    const r = calculateLatePaymentPenalties({
      amountTtc: 1000,
      dueDate: "2026-04-10",
      calcDate: "2026-05-10",
      contractualRatePercent: null,
      debtorType: "professional",
    });
    assert.equal(r.daysLate, 30);
    assert.equal(r.annualRatePercent, 12.15);
    assert.equal(r.rateReason, "statutory_default");
    assert.equal(r.interestEur, 9.99);
    assert.equal(r.recoveryIndemnityEur, 40);
    assert.equal(r.totalPenaltiesEur, 49.99);
  });

  it("uses H2 2026 statutory default 12.40%", () => {
    const r = calculateLatePaymentPenalties({
      amountTtc: 2000,
      dueDate: "2026-09-01",
      calcDate: "2026-10-01",
      contractualRatePercent: null,
      debtorType: "professional",
    });
    assert.equal(r.semesterKey, "2026-H2");
    assert.equal(r.annualRatePercent, 12.4);
    assert.equal(r.rateReason, "statutory_default");
  });

  it("keeps H2 2026 at 12.40% after Sept 2026 ECB change (no live BCE rate)", () => {
    const r = calculateLatePaymentPenalties({
      amountTtc: 1000,
      dueDate: "2026-08-01",
      calcDate: "2026-10-20",
      contractualRatePercent: null,
      debtorType: "professional",
    });
    assert.equal(r.daysLate, 80);
    assert.equal(r.interestBreakdown.length, 1);
    assert.equal(r.interestBreakdown[0].semesterKey, "2026-H2");
    assert.equal(r.interestBreakdown[0].annualRatePercent, 12.4);
    assert.equal(r.bcePercent, 2.4);
  });

  it("raises contractual rate to H2 2026 floor 8.25%", () => {
    const r = calculateLatePaymentPenalties({
      amountTtc: 1000,
      dueDate: "2026-07-15",
      calcDate: "2026-08-15",
      contractualRatePercent: 5,
      debtorType: "professional",
    });
    assert.equal(r.rateBeforeFloorPercent, 5);
    assert.equal(r.annualRatePercent, 8.25);
    assert.equal(r.rateReason, "floor_minimum");
    assert.equal(r.floorPercent, 8.25);
  });

  it("raises contractual rate to H1 2026 floor 7.86%", () => {
    const r = calculateLatePaymentPenalties({
      amountTtc: 1000,
      dueDate: "2026-02-01",
      calcDate: "2026-03-01",
      contractualRatePercent: 4,
      debtorType: "professional",
    });
    assert.equal(r.annualRatePercent, 7.86);
    assert.equal(r.floorPercent, 7.86);
  });

  it("splits interest across H1 and H2 when late period crosses 1 July", () => {
    const r = calculateLatePaymentPenalties({
      amountTtc: 3650,
      dueDate: "2026-06-15",
      calcDate: "2026-08-15",
      contractualRatePercent: null,
      debtorType: "professional",
    });
    assert.equal(r.spansMultipleSemesters, true);
    assert.equal(r.interestBreakdown.length, 2);
    assert.equal(r.interestBreakdown[0].semesterKey, "2026-H1");
    assert.equal(r.interestBreakdown[0].annualRatePercent, 12.15);
    assert.equal(r.interestBreakdown[1].semesterKey, "2026-H2");
    assert.equal(r.interestBreakdown[1].annualRatePercent, 12.4);
    const sumParts = r.interestBreakdown.reduce(
      (s, row) => s + row.interestEur,
      0
    );
    assert.equal(r.interestEur, Math.round(sumParts * 100) / 100);
    assert.ok(r.interestEur > 0);
  });

  it("computes interest with annual rate and day count", () => {
    const r = calculateLatePaymentPenalties({
      amountTtc: 3650,
      dueDate: "2026-07-01",
      calcDate: "2026-08-01",
      contractualRatePercent: 10,
      debtorType: "private",
      formalNoticeDate: "2026-07-01",
    });
    assert.equal(r.daysLate, 31);
    assert.equal(r.annualRatePercent, 10);
    assert.equal(r.interestEur, 31);
    assert.equal(r.recoveryIndemnityEur, 0);
  });

  it("applies legal interest only for private debtor without contractual rate (H1)", () => {
    const r = calculateLatePaymentPenalties({
      amountTtc: 1000,
      dueDate: "2026-04-01",
      calcDate: "2026-05-01",
      contractualRatePercent: null,
      debtorType: "private",
      formalNoticeDate: "2026-04-01",
    });
    assert.ok(r.daysLate > 0);
    assert.equal(r.annualRatePercent, 2.62);
    assert.equal(r.rateReason, "legal_interest_private");
    assert.equal(r.recoveryIndemnityEur, 0);
    assert.notEqual(r.annualRatePercent, 12.15);
  });

  it("applies H2 legal interest 2.75% for private debtor without contractual rate", () => {
    const r = calculateLatePaymentPenalties({
      amountTtc: 1000,
      dueDate: "2026-09-01",
      calcDate: "2026-10-01",
      contractualRatePercent: null,
      debtorType: "private",
      formalNoticeDate: "2026-09-01",
    });
    assert.equal(r.annualRatePercent, 2.75);
    assert.equal(r.rateReason, "legal_interest_private");
    assert.equal(r.recoveryIndemnityEur, 0);
  });

  it("never adds €40 recovery for private individuals", () => {
    const r = calculateLatePaymentPenalties({
      amountTtc: 1000,
      dueDate: "2026-04-01",
      calcDate: "2026-05-01",
      contractualRatePercent: null,
      debtorType: "private",
    });
    assert.ok(r.daysLate > 0);
    assert.equal(r.recoveryIndemnityEur, 0);
  });

  it("adds €40 recovery only for professional debtors when late", () => {
    const pro = calculateLatePaymentPenalties({
      amountTtc: 1000,
      dueDate: "2026-04-01",
      calcDate: "2026-04-02",
      contractualRatePercent: null,
      debtorType: "professional",
    });
    assert.equal(pro.recoveryIndemnityEur, 40);

    const priv = calculateLatePaymentPenalties({
      amountTtc: 1000,
      dueDate: "2026-04-01",
      calcDate: "2026-04-02",
      contractualRatePercent: null,
      debtorType: "private",
    });
    assert.equal(priv.recoveryIndemnityEur, 0);
  });

  it("flags unknown semester and uses floor when no contractual rate", () => {
    const r = calculateLatePaymentPenalties({
      amountTtc: 1000,
      dueDate: "2025-04-01",
      calcDate: "2025-05-01",
      contractualRatePercent: null,
      debtorType: "professional",
    });
    assert.equal(r.needsManualRate, true);
    assert.ok(r.warnings.includes("unknown_semester_rates"));
    assert.equal(r.floorPercent, null);
    assert.equal(r.rateReason, "unavailable");
  });

  it("private debtor without formal notice date: interest is 0 (C. civ. art. 1231-6)", () => {
    const r = calculateLatePaymentPenalties({
      amountTtc: 1000,
      dueDate: "2026-04-01",
      calcDate: "2026-05-01",
      contractualRatePercent: null,
      debtorType: "private",
    });
    assert.equal(r.daysLate, 30);
    assert.equal(r.interestEur, 0);
    assert.equal(r.totalPenaltiesEur, 0);
    assert.equal(r.rateReason, "formal_notice_required");
    assert.ok(r.warnings.includes("formal_notice_missing"));
  });

  it("private debtor: interest runs from the day after the formal notice", () => {
    const r = calculateLatePaymentPenalties({
      amountTtc: 3650,
      dueDate: "2026-07-01",
      calcDate: "2026-08-01",
      formalNoticeDate: "2026-07-21",
      contractualRatePercent: 10,
      debtorType: "private",
    });
    assert.equal(r.daysLate, 31);
    assert.equal(r.interestDays, 11);
    assert.equal(r.interestEur, 11);
  });

  it("chase email cites the formal notice date for a private debtor", async () => {
    const { buildChaseEmailText } = await import("./calculate.js");
    const opts = { dueDate: "2026-07-01", calcDate: "2026-08-01", debtorType: "private" };
    const r = calculateLatePaymentPenalties({
      amountTtc: 1000, ...opts, formalNoticeDate: "2026-07-10", contractualRatePercent: null,
    });
    assert.ok(buildChaseEmailText(r, { ...opts, lang: "fr" }).includes(
      "Intérêts au taux de l'intérêt légal à compter de la mise en demeure du 2026-07-10 (art. 1231-6 du Code civil)."));
    assert.ok(buildChaseEmailText(r, { ...opts, lang: "en" }).includes(
      "Interest at the legal interest rate from the formal notice dated 2026-07-10 (French Civil Code art. 1231-6)."));
  });

  it("displayed semester comes from the first interest slice (due 30/06)", () => {
    const r = calculateLatePaymentPenalties({
      amountTtc: 1000,
      dueDate: "2026-06-30",
      calcDate: "2026-07-15",
      contractualRatePercent: null,
      debtorType: "professional",
    });
    assert.equal(r.semesterKey, "2026-H2");
    assert.equal(r.floorPercent, 8.25);
    assert.equal(r.annualRatePercent, 12.4);
  });
});
