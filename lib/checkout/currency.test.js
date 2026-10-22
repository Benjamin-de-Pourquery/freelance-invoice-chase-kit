import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  isValidStoredCurrency,
  resolveDefaultCurrency,
} from "./currency.js";

describe("resolveDefaultCurrency", () => {
  it("defaults to EUR on the French landing", () => {
    assert.equal(resolveDefaultCurrency({ lang: "fr" }), "eur");
  });

  it("defaults to USD on the English landing", () => {
    assert.equal(resolveDefaultCurrency({ lang: "en" }), "usd");
  });

  it("defaults to GBP on UK pages", () => {
    assert.equal(resolveDefaultCurrency({ lang: "en", preferGbp: true }), "gbp");
    assert.equal(resolveDefaultCurrency({ lang: "fr", preferGbp: true }), "gbp");
  });

  it("defaults to GBP when browser locale is en-GB", () => {
    assert.equal(
      resolveDefaultCurrency({ lang: "en", browserLocales: ["en-US", "en-GB"] }),
      "gbp"
    );
  });
});

describe("isValidStoredCurrency", () => {
  it("validates supported codes", () => {
    assert.equal(isValidStoredCurrency("usd"), true);
    assert.equal(isValidStoredCurrency("EUR"), true);
    assert.equal(isValidStoredCurrency("cad"), false);
  });
});
