import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  formatMoney,
  generatePaymentTermsStatement,
  resolveDocumentLocale,
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

describe("resolveDocumentLocale", () => {
  it("uses en-GB for EUR on the English page", () => {
    assert.equal(resolveDocumentLocale("en", "EUR"), "en-GB");
  });

  it("uses en-US for USD on the English page", () => {
    assert.equal(resolveDocumentLocale("en", "USD"), "en-US");
  });
});

describe("formatMoney", () => {
  it("formats EUR with en-GB locale on the English page", () => {
    const out = formatMoney(2500, "EUR", "en-GB");
    assert.match(out, /2,500\.00|2\.500,00/);
    assert.ok(out.includes("€") || out.includes("EUR"));
    assert.doesNotMatch(out, /2[\s\u202f]500,00 €/);
  });

  it("formats EUR with fr-FR locale on the French page", () => {
    const out = formatMoney(2500, "EUR", "fr-FR");
    assert.match(out, /2[\s\u202f]?500,00/);
  });

  it("handles invalid amounts", () => {
    assert.equal(formatMoney(NaN, "GBP", "en-GB"), "GBP 0.00");
  });
});

describe("generatePaymentTermsStatement", () => {
  it("includes parties and fee for EN UK jurisdiction", () => {
    const result = generatePaymentTermsStatement(
      baseInput,
      paymentTermsCopy.en.documentLabels,
      { pageLang: "en" }
    );
    assert.ok(result.text.includes("Studio Glint"));
    assert.ok(result.text.includes("Acme Ltd"));
    assert.ok(result.text.includes("Brand design"));
    assert.equal(result.jurisdiction, "uk");
  });

  it("omits section 8 / regulatory context from the client-facing document", () => {
    const en = generatePaymentTermsStatement(
      { ...baseInput, jurisdiction: "uk" },
      paymentTermsCopy.en.documentLabels,
      { pageLang: "en" }
    );
    assert.ok(!en.text.includes("8. Context"));
    assert.ok(!en.text.toLowerCase().includes("consultation"));

    const fr = generatePaymentTermsStatement(
      { ...baseInput, jurisdiction: "france" },
      paymentTermsCopy.fr.documentLabels,
      { pageLang: "fr" }
    );
    assert.ok(!fr.text.includes("8. Cadre"));
    assert.ok(!fr.text.includes("pénalités"));
  });

  it("uses fee placeholder when price is empty (no zero euro amount)", () => {
    const result = generatePaymentTermsStatement(
      { ...baseInput, price: "" },
      paymentTermsCopy.en.documentLabels,
      { pageLang: "en" }
    );
    assert.ok(result.text.includes("[Agreed fee amount]"));
    assert.ok(!result.text.includes("€0.00"));
    assert.ok(!result.text.includes("0,00 €"));
    assert.ok(!result.text.includes("0.00"));
  });

  it("formats EN page EUR fees with en-GB grouping", () => {
    const result = generatePaymentTermsStatement(
      baseInput,
      paymentTermsCopy.en.documentLabels,
      { pageLang: "en" }
    );
    assert.ok(result.text.includes("2,500.00") || result.text.includes("€2,500.00"));
    assert.ok(!result.formattedFee.includes("2\u202f500,00"));
  });

  it("uses placeholders when names are blank (FR)", () => {
    const result = generatePaymentTermsStatement(
      { ...baseInput, freelancerName: "  ", clientName: "", jurisdiction: "france" },
      paymentTermsCopy.fr.documentLabels,
      { pageLang: "fr" }
    );
    assert.ok(result.text.includes("[Nom ou raison sociale du client]"));
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
