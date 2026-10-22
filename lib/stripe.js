import Stripe from "stripe";
import { isPackCheckoutSession, isPaidSession } from "@/lib/checkout/session";
import { PAYMENT_LINK } from "@/lib/i18n";

export function getStripeSecretKey() {
  return process.env.STRIPE_SECRET_KEY || "";
}

/** True when a Stripe secret key (test sk_test_ or live sk_live_) is configured. */
export function hasStripeSecret() {
  const k = getStripeSecretKey();
  return Boolean(k && (k.startsWith("sk_test_") || k.startsWith("sk_live_")));
}

/** Payment Link ids allowed to unlock the pack (optional, comma separated). */
function allowedPaymentLinkIds() {
  return (process.env.STRIPE_PACK_PAYMENT_LINK_IDS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function getStripe() {
  const key = getStripeSecretKey();
  if (!key) return null;
  return new Stripe(key, { apiVersion: "2024-06-20" });
}

/**
 * Verify a Checkout Session is paid (TEST or LIVE depending on key).
 * Returns { ok, reason, session }; never throws secrets.
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
    if (!isPaidSession(session)) {
      return { ok: false, reason: "not_paid", session: { id: session.id, payment_status: session.payment_status } };
    }
    let paymentLinkUrl = null;
    if (session.payment_link && typeof session.payment_link === "string") {
      try {
        const link = await stripe.paymentLinks.retrieve(session.payment_link);
        paymentLinkUrl = link && link.url ? link.url : null;
      } catch {
        paymentLinkUrl = null;
      }
    }
    if (
      !isPackCheckoutSession(session, {
        allowedPaymentLinkIds: allowedPaymentLinkIds(),
        paymentLinkUrl,
        allowedPaymentLinkUrls: [PAYMENT_LINK],
      })
    ) {
      return { ok: false, reason: "invalid_product", session: null };
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
