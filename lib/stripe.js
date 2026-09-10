import Stripe from "stripe";

export function getStripeSecretKey() {
  return process.env.STRIPE_SECRET_KEY || "";
}

export function hasStripeSecret() {
  const k = getStripeSecretKey();
  return Boolean(k && k.startsWith("sk_"));
}

export function getStripe() {
  const key = getStripeSecretKey();
  if (!key) return null;
  return new Stripe(key, { apiVersion: "2024-06-20" });
}

/**
 * Verify a Checkout Session is paid (TEST or LIVE depending on key).
 * Returns { ok, reason, session } — never throws secrets.
 */
export async function verifyCheckoutSession(sessionId) {
  if (!sessionId || typeof sessionId !== "string" || !sessionId.startsWith("cs_")) {
    return { ok: false, reason: "invalid_session_id", session: null };
  }
  if (!hasStripeSecret()) {
    return { ok: false, reason: "missing_secret", session: null };
  }
  const stripe = getStripe();
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const paid =
      session.payment_status === "paid" ||
      session.status === "complete";
    if (!paid) {
      return { ok: false, reason: "not_paid", session: { id: session.id, payment_status: session.payment_status } };
    }
    return {
      ok: true,
      reason: "paid",
      session: {
        id: session.id,
        payment_status: session.payment_status,
        status: session.status,
        amount_total: session.amount_total,
        currency: session.currency,
      },
    };
  } catch (err) {
    return { ok: false, reason: "stripe_error", session: null };
  }
}
