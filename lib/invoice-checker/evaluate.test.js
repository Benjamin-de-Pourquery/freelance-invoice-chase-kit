import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  evaluateInvoiceMentions,
  reformMentionsApply,
  parseIsoDate,
  summarizeResults,
} from "./evaluate.js";

const baseInput = {
  companySize: "micro",
  vatRegime: "standard",
  clientType: "french_b2b",
  invoiceDate: "2026-10-01",
  operationKind: "services",
  deliveryDiffers: false,
  vatDebitsOpted: false,
  presentMentions: {},
};

describe("reformMentionsApply", () => {
  it("returns false before 1 Sept 2026", () => {
    assert.equal(reformMentionsApply("large", "2026-08-31"), false);
    assert.equal(reformMentionsApply("micro", "2026-08-31"), false);
  });

  it("returns true for large and ETI from 1 Sept 2026", () => {
    assert.equal(reformMentionsApply("large", "2026-09-01"), true);
    assert.equal(reformMentionsApply("eti", "2027-01-15"), true);
  });

  it("returns false for SME/micro between Sept 2026 and Sept 2027", () => {
    assert.equal(reformMentionsApply("sme", "2026-09-01"), false);
    assert.equal(reformMentionsApply("micro", "2027-08-31"), false);
  });

  it("returns true for SME/micro from 1 Sept 2027", () => {
    assert.equal(reformMentionsApply("sme", "2027-09-01"), true);
    assert.equal(reformMentionsApply("micro", "2028-01-01"), true);
  });
});

describe("parseIsoDate", () => {
  it("parses UTC midnight", () => {
    const d = parseIsoDate("2026-09-01");
    assert.equal(d.toISOString(), "2026-09-01T00:00:00.000Z");
  });
});

describe("evaluateInvoiceMentions", () => {
  it("flags missing core mentions when nothing is ticked", () => {
    const results = evaluateInvoiceMentions(baseInput);
    const parties = results.find((r) => r.id === "parties_identity_address");
    assert.equal(parties.status, "missing");
  });

  it("marks reform mentions not_yet_required for micro in late 2026", () => {
    const results = evaluateInvoiceMentions({
      ...baseInput,
      companySize: "micro",
      invoiceDate: "2026-11-01",
      presentMentions: {},
    });
    const op = results.find((r) => r.id === "operation_category");
    assert.equal(op.status, "not_yet_required");
  });

  it("requires reform mentions for large company from Sept 2026", () => {
    const results = evaluateInvoiceMentions({
      ...baseInput,
      companySize: "large",
      invoiceDate: "2026-09-15",
      presentMentions: {},
    });
    const op = results.find((r) => r.id === "operation_category");
    assert.equal(op.status, "missing");
  });

  it("skips delivery address when services only", () => {
    const results = evaluateInvoiceMentions({
      ...baseInput,
      companySize: "large",
      invoiceDate: "2026-10-01",
      operationKind: "services",
      deliveryDiffers: true,
      presentMentions: {},
    });
    const del = results.find((r) => r.id === "delivery_address_if_different");
    assert.equal(del.status, "not_required");
  });

  it("requires delivery address when goods and address differs", () => {
    const results = evaluateInvoiceMentions({
      ...baseInput,
      companySize: "large",
      invoiceDate: "2026-10-01",
      operationKind: "goods",
      deliveryDiffers: true,
      presentMentions: {},
    });
    const del = results.find((r) => r.id === "delivery_address_if_different");
    assert.equal(del.status, "missing");
  });

  it("marks B2C commercial mentions as not required", () => {
    const results = evaluateInvoiceMentions({
      ...baseInput,
      clientType: "consumer",
      presentMentions: {},
    });
    const penalties = results.find((r) => r.id === "late_payment_penalties");
    assert.equal(penalties.status, "not_required");
  });

  it("marks VAT breakdown not required for franchise", () => {
    const results = evaluateInvoiceMentions({
      ...baseInput,
      vatRegime: "franchise",
      presentMentions: {},
    });
    const vat = results.find((r) => r.id === "vat_amounts_by_rate");
    assert.equal(vat.status, "not_required");
  });

  it("requires franchise VAT wording when on franchise regime", () => {
    const results = evaluateInvoiceMentions({
      ...baseInput,
      vatRegime: "franchise",
      presentMentions: {},
    });
    const mention = results.find((r) => r.id === "vat_franchise_mention");
    assert.equal(mention.status, "missing");
  });

  it("requires sale or service date on every invoice", () => {
    const results = evaluateInvoiceMentions({
      ...baseInput,
      presentMentions: {},
    });
    const saleDate = results.find((r) => r.id === "sale_or_service_date");
    assert.equal(saleDate.status, "missing");
    assert.equal(saleDate.sourceKey, "SERVICE_PUBLIC_F31808");
  });

  it("summarizeResults counts statuses", () => {
    const results = evaluateInvoiceMentions({
      ...baseInput,
      presentMentions: { parties_identity_address: true },
    });
    const summary = summarizeResults(results);
    assert.ok(summary.present >= 1);
    assert.ok(summary.missing >= 1);
  });
});
