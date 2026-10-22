import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { isPackCheckoutSession } from "./session.js";
import { PACK_PRODUCT_ID } from "./pricing.js";

describe("isPackCheckoutSession", () => {
  it("accepts API sessions with product metadata", () => {
    assert.equal(
      isPackCheckoutSession({ metadata: { product: PACK_PRODUCT_ID } }),
      true
    );
  });

  it("accepts legacy Payment Link sessions", () => {
    assert.equal(isPackCheckoutSession({ payment_link: "plink_test_123" }), true);
  });

  it("rejects unrelated paid sessions", () => {
    assert.equal(isPackCheckoutSession({ metadata: { product: "other" } }), false);
    assert.equal(isPackCheckoutSession(null), false);
  });
});
