import { NextResponse } from "next/server";
import { getStripe, hasStripeSecret } from "@/lib/stripe";
import {
  getPackPrice,
  normalizeCurrency,
  PACK_PRODUCT_ID,
  productDisplayName,
} from "@/lib/checkout/pricing";

export const runtime = "nodejs";

function safeCancelPath(value, lang) {
  const fallback = lang === "en" ? "/en" : "/";
  if (!value || typeof value !== "string") return fallback;
  if (!value.startsWith("/") || value.startsWith("//")) return fallback;
  return value;
}

export async function POST(request) {
  if (!hasStripeSecret()) {
    return NextResponse.json(
      { ok: false, reason: "missing_secret", usePaymentLink: true },
      { status: 503 }
    );
  }

  let body = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const lang = body.lang === "en" ? "en" : "fr";
  const currency = normalizeCurrency(body.currency) || (lang === "fr" ? "eur" : "usd");
  const price = getPackPrice(currency);
  if (!price) {
    return NextResponse.json({ ok: false, reason: "invalid_currency" }, { status: 400 });
  }

  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      { ok: false, reason: "missing_secret", usePaymentLink: true },
      { status: 503 }
    );
  }

  const origin = new URL(request.url).origin;
  const successPath = lang === "en" ? "/en/success" : "/succes";
  const cancelPath = safeCancelPath(body.cancelPath, lang);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      locale: lang === "fr" ? "fr" : "en",
      success_url: `${origin}${successPath}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}${cancelPath}`,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: price.currency,
            unit_amount: price.unitAmount,
            product_data: {
              name: productDisplayName(lang),
              metadata: {
                product: PACK_PRODUCT_ID,
              },
            },
          },
        },
      ],
      metadata: {
        product: PACK_PRODUCT_ID,
        lang,
        currency: price.currency,
      },
    });

    if (!session.url) {
      return NextResponse.json({ ok: false, reason: "stripe_error" }, { status: 502 });
    }

    return NextResponse.json({ ok: true, url: session.url });
  } catch {
    return NextResponse.json({ ok: false, reason: "stripe_error" }, { status: 502 });
  }
}
