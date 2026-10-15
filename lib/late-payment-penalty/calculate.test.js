import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { calculateLatePaymentPenalties } from "./calculate.js";
import { semesterForDueDate } from "./rates.js";

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

  it("computes interest with annual rate and day count", () => {
    const r = calculateLatePaymentPenalties({
      amountTtc: 3650,
      dueDate: "2026-07-01",
      calcDate: "2026-08-01",
      contractualRatePercent: 10,
      debtorType: "private",
    });
    assert.equal(r.daysLate, 31);
    assert.equal(r.annualRatePercent, 10);
    assert.equal(r.interestEur, 31);
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
});
