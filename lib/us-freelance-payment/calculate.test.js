import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  addCalendarDays,
  buildUsChaseEmailText,
  calculateUsFreelancePayment,
  calendarDaysBetween,
} from "./calculate.js";

const baseInput = {
  jurisdictionId: "ny_state",
  contractValue: 1500,
  aggregatedValue120Days: 0,
  aggregatedValueCalendarYear: 0,
  contractValue7DayWindow: 0,
  contractEnteredDate: "2024-09-01",
  isProfessionalServices: true,
  workPerformedInCity: true,
  governmentClient: false,
  hasWrittenContract: true,
  hasAgreedPaymentDate: false,
  completionDate: "2026-06-01",
  notificationDate: "2026-06-01",
  calcDate: "2026-08-01",
};

describe("calendarDaysBetween", () => {
  it("counts days between ISO dates", () => {
    assert.equal(calendarDaysBetween("2026-06-01", "2026-07-01"), 30);
  });
});

describe("addCalendarDays", () => {
  it("adds days across month boundaries", () => {
    assert.equal(addCalendarDays("2026-06-01", 30), "2026-07-01");
  });
});

describe("calculateUsFreelancePayment per jurisdiction", () => {
  it("New York State: 30 days after completion when no agreed date", () => {
    const r = calculateUsFreelancePayment({ ...baseInput, jurisdictionId: "ny_state" });
    assert.equal(r.status, "covered");
    assert.equal(r.paymentDueDate, "2026-07-01");
    assert.equal(r.daysLate, 31);
    assert.equal(r.isLate, true);
  });

  it("NYC: uses local law when covered", () => {
    const r = calculateUsFreelancePayment({ ...baseInput, jurisdictionId: "nyc" });
    assert.equal(r.status, "covered");
    assert.equal(r.jurisdictionId, "nyc");
    assert.match(r.lawNameEn, /New York City/);
  });

  it("Illinois: double-damage remedy present", () => {
    const r = calculateUsFreelancePayment({
      ...baseInput,
      jurisdictionId: "il_state",
      contractValue: 600,
    });
    assert.equal(r.status, "covered");
    assert.ok(
      r.remediesEn.some((x) => /double/i.test(x.text)),
      "expected double damages remedy"
    );
  });

  it("California: requires professional services and $250 threshold", () => {
    const r = calculateUsFreelancePayment({
      ...baseInput,
      jurisdictionId: "ca_state",
      contractValue: 300,
      contractEnteredDate: "2025-03-01",
    });
    assert.equal(r.status, "covered");
    assert.match(r.lawNameEn, /California/);
  });

  it("Los Angeles: resolves to California FWPA for professional services after 2025", () => {
    const r = calculateUsFreelancePayment({
      ...baseInput,
      jurisdictionId: "los_angeles",
      contractValue: 4500,
      contractEnteredDate: "2025-05-23",
      isProfessionalServices: true,
      aggregatedValueCalendarYear: 0,
    });
    assert.equal(r.status, "covered");
    assert.equal(r.jurisdictionId, "ca_state");
    assert.ok(r.warnings.includes("la_superseded_by_ca_fwpa"));
  });

  it("Seattle: calendar year threshold", () => {
    const r = calculateUsFreelancePayment({
      ...baseInput,
      jurisdictionId: "seattle",
      contractValue: 400,
      aggregatedValueCalendarYear: 250,
    });
    assert.equal(r.status, "covered");
    assert.equal(r.paymentDueDate, "2026-07-01");
  });

  it("Minneapolis: 30 days after notification when no agreed date", () => {
    const r = calculateUsFreelancePayment({
      ...baseInput,
      jurisdictionId: "minneapolis",
      contractValue: 800,
      aggregatedValueCalendarYear: 0,
      completionDate: "2026-06-01",
      notificationDate: "2026-06-10",
      calcDate: "2026-07-20",
    });
    assert.equal(r.status, "covered");
    assert.equal(r.paymentDueDate, "2026-07-10");
    assert.equal(r.daysLate, 10);
  });

  it("Columbus: covered at $250 with 120-day aggregation", () => {
    const r = calculateUsFreelancePayment({
      ...baseInput,
      jurisdictionId: "columbus",
      contractValue: 200,
      aggregatedValue120Days: 100,
    });
    assert.equal(r.status, "covered");
  });
});

describe("calculateUsFreelancePayment edge cases", () => {
  it("below threshold returns general contract law", () => {
    const r = calculateUsFreelancePayment({
      ...baseInput,
      contractValue: 200,
      aggregatedValue120Days: 0,
    });
    assert.equal(r.status, "general_contract_law");
    assert.equal(r.belowThreshold, true);
  });

  it("government client excluded in New York State", () => {
    const r = calculateUsFreelancePayment({
      ...baseInput,
      governmentClient: true,
    });
    assert.equal(r.status, "general_contract_law");
    assert.equal(r.governmentExcluded, true);
  });

  it("flags missing written contract", () => {
    const r = calculateUsFreelancePayment({
      ...baseInput,
      hasWrittenContract: false,
    });
    assert.equal(r.status, "covered");
    assert.ok(r.warnings.includes("missing_written_contract"));
  });

  it("uses agreed payment date when provided", () => {
    const r = calculateUsFreelancePayment({
      ...baseInput,
      hasAgreedPaymentDate: true,
      agreedPaymentDate: "2026-09-01",
      calcDate: "2026-09-15",
    });
    assert.equal(r.paymentDueDate, "2026-09-01");
    assert.equal(r.daysLate, 14);
  });

  it("not yet late when calc date is on due date", () => {
    const r = calculateUsFreelancePayment({
      ...baseInput,
      calcDate: "2026-07-01",
    });
    assert.equal(r.daysLate, 0);
    assert.equal(r.isLate, false);
  });
});

describe("buildUsChaseEmailText", () => {
  it("cites the law name when covered", () => {
    const result = calculateUsFreelancePayment(baseInput);
    const text = buildUsChaseEmailText(result, {
      contractValue: 1500,
      calcDate: "2026-08-01",
    });
    assert.match(text, /Freelance Isn't Free Act/);
    assert.match(text, /1500\.00/);
  });
});
