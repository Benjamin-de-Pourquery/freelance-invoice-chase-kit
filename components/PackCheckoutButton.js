"use client";

import { usePathname } from "next/navigation";
import PackCurrencySelector from "@/components/PackCurrencySelector";
import { usePackCheckout } from "@/lib/checkout/usePackCheckout";

/**
 * @param {{
 *   lang: "fr"|"en",
 *   preferGbp?: boolean,
 *   cancelPath?: string,
 *   ctaLabel: string,
 *   className?: string,
 *   showSelector?: boolean,
 *   compactSelector?: boolean,
 * }} props
 */
export default function PackCheckoutButton({
  lang,
  preferGbp = false,
  cancelPath,
  ctaLabel,
  className = "cta",
  showSelector = true,
  compactSelector = false,
}) {
  const pathname = usePathname();
  const resolvedCancel = cancelPath || pathname || (lang === "en" ? "/en" : "/");
  const { currency, setCurrency, formattedPrice, selectorLabels, loading, startCheckout } =
    usePackCheckout({ lang, preferGbp, cancelPath: resolvedCancel });

  const label = ctaLabel.includes("{price}")
    ? ctaLabel.replace("{price}", formattedPrice)
    : `${ctaLabel} · ${formattedPrice}`;

  return (
    <div className="pack-checkout">
      {showSelector ? (
        <PackCurrencySelector
          currency={currency}
          onChange={setCurrency}
          labels={selectorLabels}
          compact={compactSelector}
        />
      ) : null}
      <button
        type="button"
        className={className}
        onClick={startCheckout}
        disabled={loading}
        aria-busy={loading}
      >
        {loading ? (lang === "fr" ? "Redirection…" : "Redirecting…") : label}
      </button>
    </div>
  );
}
