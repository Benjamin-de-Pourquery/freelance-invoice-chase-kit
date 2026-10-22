import { PACK_PRODUCT_ID } from "./pricing.js";

/**
 * Whether a paid Stripe Checkout Session unlocks this digital pack.
 * Accepts API sessions (metadata) and legacy Payment Link sessions.
 */
export function isPackCheckoutSession(session) {
  if (!session || typeof session !== "object") return false;

  const metadata = session.metadata || {};
  if (metadata.product === PACK_PRODUCT_ID) return true;

  if (session.payment_link) return true;

  return false;
}
