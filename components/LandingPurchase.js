"use client";

import PackCurrencySelector from "@/components/PackCurrencySelector";
import { usePackCheckoutContext } from "@/lib/checkout/PackCheckoutContext";
import { formatPackPriceLabel } from "@/lib/checkout/pricing";

/**
 * Sticky offer card on the landing page (price, currency, CTA).
 */
export function LandingOfferCard({ t }) {
  const lang = t.lang === "en" ? "en" : "fr";
  const { currency, setCurrency, formattedPrice, selectorLabels, loading, startCheckout } =
    usePackCheckoutContext();

  const ctaText = t.ctaBuy.includes("{price}")
    ? t.ctaBuy.replace("{price}", formattedPrice)
    : `${t.ctaBuy} · ${formattedPrice}`;

  return (
    <>
      <div className="price">
        {formattedPrice} <span>{t.priceSub}</span>
      </div>
      <PackCurrencySelector
        currency={currency}
        onChange={setCurrency}
        labels={selectorLabels}
      />
      <p className="note">{t.audience}</p>
      <button
        type="button"
        className="cta"
        onClick={startCheckout}
        disabled={loading}
        aria-busy={loading}
      >
        {loading ? (lang === "fr" ? "Redirection…" : "Redirecting…") : ctaText}
      </button>
      <p className="note trust-note">{t.trustNote}</p>
      <p className="note">{t.delivery}</p>
    </>
  );
}

/**
 * Step 1 payment line with live price.
 */
export function LandingPayStep({ t }) {
  const lang = t.lang === "en" ? "en" : "fr";
  const { currency, formattedPrice } = usePackCheckoutContext();
  const priceLine = formatPackPriceLabel(currency, lang) || formattedPrice;
  return (
    <div className="step">
      <strong>{t.stepPayTitle}</strong>
      {t.stepPayDesc.replace("{price}", priceLine)}
    </div>
  );
}

export function LandingMobileCta({ t }) {
  const lang = t.lang === "en" ? "en" : "fr";
  const { currency, setCurrency, formattedPrice, selectorLabels, loading, startCheckout } =
    usePackCheckoutContext();

  const ctaText = t.ctaBuy.includes("{price}")
    ? t.ctaBuy.replace("{price}", formattedPrice)
    : `${t.ctaBuy} · ${formattedPrice}`;

  return (
    <div className="pack-checkout">
      <PackCurrencySelector
        currency={currency}
        onChange={setCurrency}
        labels={selectorLabels}
        compact={true}
      />
      <button
        type="button"
        className="cta"
        onClick={startCheckout}
        disabled={loading}
        aria-busy={loading}
      >
        {loading ? (lang === "fr" ? "Redirection…" : "Redirecting…") : ctaText}
      </button>
    </div>
  );
}
