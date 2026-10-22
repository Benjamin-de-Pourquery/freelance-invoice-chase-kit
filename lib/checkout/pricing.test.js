import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  formatPackPrice,
  formatPackPriceLabel,
  getPackPrice,
  normalizeCurrency,
  PACK_PRICES,
} from "./pricing.js";

describe("normalizeCurrency", () => {
  it("accepts supported currencies case-insensitively", () => {
    assert.equal(normalizeCurrency("EUR"), "eur");
    assert.equal(normalizeCurrency("usd"), "usd");
    assert.equal(normalizeCurrency("Gbp"), "gbp");
  });

  it("rejects unknown currencies", () => {
    assert.equal(normalizeCurrency("chf"), null);
    assert.equal(normalizeCurrency(""), null);
  });
});

describe("getPackPrice", () => {
  it("returns configured minor-unit amounts", () => {
    assert.equal(getPackPrice("eur").unitAmount, 1900);
    assert.equal(getPackPrice("usd").unitAmount, 2100);
    assert.equal(getPackPrice("gbp").unitAmount, 1700);
  });

  it("keeps all prices in one config object", () => {
    assert.deepEqual(Object.keys(PACK_PRICES).sort(), ["eur", "gbp", "usd"]);
  });
});

describe("formatPackPrice", () => {
  it("formats FR euro style", () => {
    assert.equal(formatPackPrice("eur", "fr"), "19 €");
  });

  it("formats EN euro style", () => {
    assert.equal(formatPackPrice("eur", "en"), "€19");
  });

  it("formats USD and GBP", () => {
    assert.equal(formatPackPrice("usd", "en"), "$21");
    assert.equal(formatPackPrice("gbp", "en"), "£17");
  });
});

describe("formatPackPriceLabel", () => {
  it("adds TTC suffix in French", () => {
    assert.equal(formatPackPriceLabel("eur", "fr"), "19 € TTC");
  });
});
