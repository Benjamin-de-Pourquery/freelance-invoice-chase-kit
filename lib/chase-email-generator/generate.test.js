import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  generateChaseEmail,
  daysOverdue,
  parseIsoDateOnly,
  formatEmailForCopy,
} from "./generate.js";

const baseInput = {
  clientName: "Acme Ltd",
  contactName: "Jane",
  freelancerName: "Alex Freelance",
  invoiceNumber: "INV-2026-042",
  amount: 1500,
  currency: "EUR",
  invoiceDate: "2026-09-01",
  dueDate: "2026-09-15",
  paymentDetails: "",
  referenceDate: "2026-10-01",
};

const stages = ["friendly", "firm", "final"];
const langs = ["fr", "en"];

describe("generateChaseEmail", () => {
  for (const stage of stages) {
    for (const emailLang of langs) {
      it(`produces subject and body for stage=${stage} lang=${emailLang}`, () => {
        const result = generateChaseEmail({ ...baseInput, stage, emailLang });
        assert.ok(result.subject.length > 0);
        assert.ok(result.body.length > 0);
        assert.equal(typeof result.daysLate, "number");
        assert.ok(result.body.includes("INV-2026-042"));
      });
    }
  }

  it("uses localized client placeholder when client name is empty (FR)", () => {
    const result = generateChaseEmail({
      ...baseInput,
      stage: "firm",
      emailLang: "fr",
      clientName: "",
    });
    assert.ok(result.body.includes("votre société"));
    assert.ok(!result.body.includes("your company"));
  });

  it("uses localized client placeholder when client name is empty (EN)", () => {
    const result = generateChaseEmail({
      ...baseInput,
      stage: "firm",
      emailLang: "en",
      clientName: "   ",
    });
    assert.ok(result.body.includes("your company"));
    assert.ok(!result.body.includes("votre société"));
  });

  it("does not include freelancer-facing disclaimer in final FR body", () => {
    const result = generateChaseEmail({
      ...baseInput,
      stage: "final",
      emailLang: "fr",
    });
    assert.ok(!result.body.includes("Ces mentions sont informatives"));
    assert.ok(!result.body.includes("calculateurs gratuits"));
    assert.ok(
      result.body.includes(
        "le cas échéant, les intérêts de retard et indemnités prévus au contrat ou par la loi"
      )
    );
  });

  it("does not include freelancer-facing disclaimer in final EN body", () => {
    const result = generateChaseEmail({
      ...baseInput,
      stage: "final",
      emailLang: "en",
    });
    assert.ok(!result.body.includes("This is informational wording only"));
    assert.ok(!result.body.includes("free calculators"));
    assert.ok(
      result.body.includes(
        "where applicable, late payment interest and compensation provided for in the contract or by law"
      )
    );
  });
});

describe("daysOverdue", () => {
  it("counts calendar days after due date", () => {
    assert.equal(daysOverdue("2026-09-15", "2026-10-01"), 16);
  });
});

describe("parseIsoDateOnly", () => {
  it("rejects invalid dates", () => {
    assert.equal(parseIsoDateOnly("2026-02-30"), null);
  });
});

describe("formatEmailForCopy", () => {
  it("prefixes subject line", () => {
    const text = formatEmailForCopy("Hello", "Body");
    assert.equal(text, "Subject: Hello\n\nBody");
  });
});
