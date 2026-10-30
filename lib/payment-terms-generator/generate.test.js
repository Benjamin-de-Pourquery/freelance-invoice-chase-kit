import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  formatMoney,
  generatePaymentTermsStatement,
  UK_CONSULTATION_URL,
} from "./generate.js";
import { paymentTermsCopy } from "./copy.js";

const baseInput = {
  freelancerName: "Studio Glint",
  clientName: "Acme Ltd",
  scope: "Brand design and social assets",
  duration: "1 November 2026 to 31 January 2027",
  price: 2500,
  currency: "EUR",
  paymentDueTerm: "30 days from invoice date",
  paymentMethods: "Bank transfer (SEPA)",
  terminationNotice: "14 days in writing",
  jurisdiction: "uk",
};

describe("formatMoney", () => {
  it("formats EUR with two decimals", () => {
    const out = formatMoney(2500, "EUR");
    assert.match(out, /2[\s\u202f]?500/);
    assert.match(out, /€|EUR/);
  });

  it("handles invalid amounts", () => {
    assert.equal(formatMoney(NaN, "GBP"), "GBP 0.00");
  });
});

describe("generatePaymentTermsStatement", () => {
  it("includes parties and fee for EN UK jurisdiction", () => {
    const result = generatePaymentTermsStatement(
      baseInput,
      paymentTermsCopy.en.documentLabels
    );
    assert.ok(result.text.includes("Studio Glint"));
    assert.ok(result.text.includes("Acme Ltd"));
    assert.ok(result.text.includes("Brand design"));
    assert.ok(result.text.includes("14 October 2026"));
    assert.ok(result.text.includes("8 January 2027"));
    assert.ok(result.text.toLowerCase().includes("consultation"));
    assert.equal(result.jurisdiction, "uk");
  });

  it("uses placeholders when names are blank (FR)", () => {
    const result = generatePaymentTermsStatement(
      { ...baseInput, freelancerName: "  ", clientName: "", jurisdiction: "france" },
      paymentTermsCopy.fr.documentLabels
    );
    assert.ok(result.text.includes("[Nom ou raison sociale du client]"));
    assert.ok(result.text.includes("France"));
    assert.ok(result.text.includes("pénalités"));
  });

  it("does not contain em dash or en dash characters in EN labels", () => {
    const enBlob = JSON.stringify(paymentTermsCopy.en);
    assert.ok(!enBlob.includes("\u2014"));
    assert.ok(!enBlob.includes("\u2013"));
  });

  it("does not contain em dash or en dash characters in FR labels", () => {
    const frBlob = JSON.stringify(paymentTermsCopy.fr);
    assert.ok(!frBlob.includes("\u2014"));
    assert.ok(!frBlob.includes("\u2013"));
  });

  it("exports a verified gov.uk consultation URL", () => {
    assert.equal(
      UK_CONSULTATION_URL,
      "https://www.gov.uk/government/consultations/makework-pay-employment-status-reform-and-protections-for-the-self-employed"
    );
  });
});
