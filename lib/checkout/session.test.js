import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { isPackCheckoutSession, isPaidSession } from "./session.js";
import { PACK_PRODUCT_ID } from "./pricing.js";

const KIT_URL = "https://buy.stripe.com/test_kit";

describe("isPackCheckoutSession", () => {
  it("accepts API sessions with product metadata", () => {
    assert.equal(isPackCheckoutSession({ metadata: { product: PACK_PRODUCT_ID } }), true);
  });

  it("accepts the kit Payment Link by id", () => {
    assert.equal(
      isPackCheckoutSession({ payment_link: "plink_kit" }, { allowedPaymentLinkIds: ["plink_kit"] }),
      true
    );
  });

  it("accepts the kit Payment Link by resolved URL", () => {
    assert.equal(
      isPackCheckoutSession(
        { payment_link: "plink_kit" },
        { paymentLinkUrl: KIT_URL, allowedPaymentLinkUrls: [KIT_URL] }
      ),
      true
    );
  });

  it("rejects other Payment Links on the same Stripe account", () => {
    assert.equal(isPackCheckoutSession({ payment_link: "plink_other" }), false);
    assert.equal(
      isPackCheckoutSession(
        { payment_link: "plink_other" },
        { allowedPaymentLinkIds: ["plink_kit"], paymentLinkUrl: "https://buy.stripe.com/other", allowedPaymentLinkUrls: [KIT_URL] }
      ),
      false
    );
  });

  it("rejects unrelated paid sessions", () => {
    assert.equal(isPackCheckoutSession({ metadata: { product: "other" } }), false);
    assert.equal(isPackCheckoutSession(null), false);
  });
});

describe("isPaidSession", () => {
  it("requires payment_status paid (0 EUR sessions do not unlock)", () => {
    assert.equal(isPaidSession({ payment_status: "paid", status: "complete" }), true);
    assert.equal(isPaidSession({ payment_status: "no_payment_required", status: "complete" }), false);
    assert.equal(isPaidSession({ payment_status: "unpaid", status: "complete" }), false);
    assert.equal(isPaidSession(null), false);
  });
});
