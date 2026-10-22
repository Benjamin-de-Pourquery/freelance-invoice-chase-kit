"use client";

import { PACK_CURRENCIES } from "@/lib/checkout/pricing";

/**
 * @param {{
 *   currency: string,
 *   onChange: (currency: string) => void,
 *   labels: { legend: string, eur: string, usd: string, gbp: string },
 *   compact?: boolean,
 * }} props
 */
export default function PackCurrencySelector({
  currency,
  onChange,
  labels,
  compact = false,
}) {
  const labelFor = (code) => {
    if (code === "eur") return labels.eur;
    if (code === "usd") return labels.usd;
    return labels.gbp;
  };

  return (
    <fieldset className={`currency-selector${compact ? " currency-selector-compact" : ""}`}>
      <legend>{labels.legend}</legend>
      <div className="currency-options" role="radiogroup" aria-label={labels.legend}>
        {PACK_CURRENCIES.map((code) => (
          <label key={code} className="currency-option">
            <input
              type="radio"
              name="pack-currency"
              value={code}
              checked={currency === code}
              onChange={() => onChange(code)}
            />
            <span>{labelFor(code)}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
