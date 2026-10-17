import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  buildEuChaseEmailText,
  calculateEuLatePayment,
  dueDateFromInvoiceReceipt,
  splitLatePeriodByStatutoryWindow,
} from "./calculate.js";
import { EU_COUNTRY_RATES } from "./rates.js";

describe("dueDateFromInvoiceReceipt", () => {
  it("adds 30 calendar days to the receipt date", () => {
    assert.equal(dueDateFromInvoiceReceipt("2026-06-01"), "2026-07-01");
    assert.equal(dueDateFromInvoiceReceipt("2026-01-15"), "2026-02-14");
  });
});

describe("splitLatePeriodByStatutoryWindow", () => {
  const start = "2026-07-01";
  const end = "2026-12-31";

  it("marks segments inside and outside the statutory window", () => {
    const segments = splitLatePeriodByStatutoryWindow(
      "2026-06-01",
      "2026-08-15",
      start,
      end
    );
    assert.equal(segments.length, 2);
    assert.equal(segments[0].inWindow, false);
    assert.equal(segments[0].days, 29);
    assert.equal(segments[1].inWindow, true);
    assert.equal(segments[1].startDate, "2026-07-01");
  });
});

describe("calculateEuLatePayment", () => {
  it("computes in-window statutory interest for Germany", () => {
    const r = calculateEuLatePayment({
      amountTtc: 1000,
      dueDate: "2026-08-01",
      calcDate: "2026-09-01",
      contractualRatePercent: null,
      debtorType: "business",
      countryKey: "germany",
    });
    assert.equal(r.daysLate, 31);
    assert.equal(r.annualRatePercent, 10.52);
    assert.equal(r.rateReason, "statutory");
    const expected = Math.round(1000 * (10.52 / 100) * (31 / 365) * 100) / 100;
    assert.equal(r.interestEur, expected);
    assert.equal(r.recoveryIndemnityEur, 40);
    assert.equal(r.totalPenaltiesEur, Math.round((expected + 40) * 100) / 100);
    assert.equal(r.needsOutsidePeriodRate, false);
  });

  it("excludes out-of-window days without a contractual rate", () => {
    const r = calculateEuLatePayment({
      amountTtc: 1000,
      dueDate: "2026-06-01",
      calcDate: "2026-08-01",
      contractualRatePercent: null,
      debtorType: "business",
      countryKey: "france",
    });
    assert.equal(r.daysLate, 61);
    assert.equal(r.excludedDaysOutsidePeriod, 29);
    assert.equal(r.needsOutsidePeriodRate, true);
    const inWindowDays = 32;
    const expected =
      Math.round(1000 * (12.4 / 100) * (inWindowDays / 365) * 100) / 100;
    assert.equal(r.interestEur, expected);
    assert.ok(r.interestBreakdown.some((row) => row.rateReason === "excluded_outside_period"));
  });

  it("applies contractual rate to all late days including outside the window", () => {
    const r = calculateEuLatePayment({
      amountTtc: 2000,
      dueDate: "2026-06-01",
      calcDate: "2026-08-01",
      contractualRatePercent: 8,
      debtorType: "business",
      countryKey: "spain",
    });
    assert.equal(r.daysLate, 61);
    assert.equal(r.needsOutsidePeriodRate, false);
    assert.equal(r.annualRatePercent, 8);
    const expected = Math.round(2000 * (8 / 100) * (61 / 365) * 100) / 100;
    assert.equal(r.interestEur, expected);
  });

  it("returns no interest for consumer debtors", () => {
    const r = calculateEuLatePayment({
      amountTtc: 5000,
      dueDate: "2026-08-01",
      calcDate: "2026-10-01",
      contractualRatePercent: null,
      debtorType: "consumer",
      countryKey: "italy",
    });
    assert.equal(r.daysLate, 61);
    assert.equal(r.consumerNotApplicable, true);
    assert.equal(r.interestEur, 0);
    assert.equal(r.recoveryIndemnityEur, 0);
    assert.equal(r.totalPenaltiesEur, 0);
  });

  it("Poland business without contractual rate computes no statutory interest", () => {
    const r = calculateEuLatePayment({
      amountTtc: 1000,
      dueDate: "2026-08-01",
      calcDate: "2026-09-01",
      contractualRatePercent: null,
      debtorType: "business",
      countryKey: "poland",
    });
    assert.equal(r.daysLate, 31);
    assert.equal(r.interestEur, 0);
    assert.equal(r.annualRatePercent, null);
    assert.equal(r.rateReason, "poland_needs_contractual_rate");
    assert.equal(r.needsPolandContractualRate, true);
    assert.equal(r.recoveryIndemnityEur, 40);
    assert.equal(r.totalPenaltiesEur, 40);
  });

  it("Poland public authority without sector computes no interest but keeps recovery", () => {
    const r = calculateEuLatePayment({
      amountTtc: 1000,
      dueDate: "2026-08-01",
      calcDate: "2026-09-01",
      contractualRatePercent: null,
      debtorType: "public_authority",
      countryKey: "poland",
    });
    assert.equal(r.daysLate, 31);
    assert.equal(r.interestEur, 0);
    assert.equal(r.rateReason, "poland_choose_sector");
    assert.equal(r.needsPolandChooseSector, true);
    assert.equal(r.needsOutsidePeriodRate, false);
    assert.equal(r.recoveryIndemnityEur, 40);
    assert.equal(r.totalPenaltiesEur, 40);
  });

  it("Poland public authority uses sector statutory rate", () => {
    const r = calculateEuLatePayment({
      amountTtc: 1000,
      dueDate: "2026-08-01",
      calcDate: "2026-09-01",
      contractualRatePercent: null,
      debtorType: "public_authority",
      countryKey: "poland_health",
    });
    assert.equal(r.rateReason, "statutory");
    assert.equal(r.annualRatePercent, 11.75);
    assert.ok(r.interestEur > 0);
  });

  it("chase email for Poland public authority does not use UI sector picker wording", () => {
    const result = calculateEuLatePayment({
      amountTtc: 1000,
      dueDate: "2026-08-01",
      calcDate: "2026-09-01",
      contractualRatePercent: null,
      debtorType: "public_authority",
      countryKey: "poland",
    });
    const fr = buildEuChaseEmailText(result, {
      dueDate: "2026-08-01",
      calcDate: "2026-09-01",
      debtorType: "public_authority",
      countryLabel: EU_COUNTRY_RATES.poland.labelFr,
      lang: "fr",
    });
    const en = buildEuChaseEmailText(result, {
      dueDate: "2026-08-01",
      calcDate: "2026-09-01",
      debtorType: "public_authority",
      countryLabel: EU_COUNTRY_RATES.poland.labelEn,
      lang: "en",
    });
    assert.ok(!/choisis/i.test(fr));
    assert.ok(!/choose the sector/i.test(en));
    assert.match(
      fr,
      /Intérêts de retard : à calculer selon le taux publié sur Your Europe/
    );
    assert.match(
      en,
      /Late-payment interest: to be calculated at the rate published on Your Europe/
    );
  });

  it("chase email for Poland business cites contractual rate wording", () => {
    const result = calculateEuLatePayment({
      amountTtc: 1000,
      dueDate: "2026-08-01",
      calcDate: "2026-09-01",
      contractualRatePercent: null,
      debtorType: "business",
      countryKey: "poland",
    });
    const fr = buildEuChaseEmailText(result, {
      dueDate: "2026-08-01",
      calcDate: "2026-09-01",
      debtorType: "business",
      countryLabel: EU_COUNTRY_RATES.poland.labelFr,
      lang: "fr",
    });
    assert.match(
      fr,
      /Les intérêts de retard seront calculés au taux prévu au contrat/
    );
    assert.ok(!/Merci de m'indiquer/i.test(fr));
  });

  it("uses receipt plus 30 days flow via due date helper", () => {
    const due = dueDateFromInvoiceReceipt("2026-07-01");
    assert.equal(due, "2026-07-31");
    const r = calculateEuLatePayment({
      amountTtc: 1000,
      dueDate: due,
      calcDate: "2026-08-15",
      contractualRatePercent: null,
      debtorType: "public_authority",
      countryKey: "netherlands",
    });
    assert.equal(r.daysLate, 15);
    assert.equal(r.annualRatePercent, 10.15);
    assert.equal(r.recoveryIndemnityEur, 40);
  });
});
