import { PACK_PRODUCT_ID } from "./pricing.js";

/** True only when Stripe reports the session as paid ("complete" alone can still be unpaid). */
export function isPaidSession(session) {
  if (!session) return false;
  const status = session.payment_status;
  return status === "paid";
}

/**
 * Whether a paid Stripe Checkout Session unlocks this digital pack.
 * Accepts API sessions created by /api/checkout (metadata.product) and
 * sessions from the kit's own Payment Link only.
 * @param {object} session Stripe Checkout Session
 * @param {{ allowedPaymentLinkIds?: string[], paymentLinkUrl?: string | null, allowedPaymentLinkUrls?: string[] }} [opts]
 *   paymentLinkUrl is the URL of session.payment_link, resolved via the Stripe API.
 */
export function isPackCheckoutSession(session, opts = {}) {
  if (!session || typeof session !== "object") return false;

  const metadata = session.metadata || {};
  if (metadata.product === PACK_PRODUCT_ID) return true;

  const linkId = session.payment_link;
  if (!linkId || typeof linkId !== "string") return false;

  const ids = (opts.allowedPaymentLinkIds || []).filter(Boolean);
  if (ids.includes(linkId)) return true;

  const urls = (opts.allowedPaymentLinkUrls || []).filter(Boolean);
  if (opts.paymentLinkUrl && urls.includes(opts.paymentLinkUrl)) return true;

  return false;
}
