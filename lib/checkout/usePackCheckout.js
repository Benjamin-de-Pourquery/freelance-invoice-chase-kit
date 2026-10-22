"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { PAYMENT_LINK } from "@/lib/i18n";
import {
  currencySelectorLabels,
  readStoredCurrency,
  resolveDefaultCurrency,
  writeStoredCurrency,
} from "./currency.js";
import { formatPackPrice, PACK_CURRENCIES } from "./pricing.js";

/**
 * @param {{ lang: "fr"|"en", preferGbp?: boolean, cancelPath?: string }} options
 */
export function usePackCheckout({ lang, preferGbp = false, cancelPath }) {
  const [currency, setCurrencyState] = useState(() => {
    const stored = readStoredCurrency();
    if (stored) return stored;
    const locales =
      typeof navigator !== "undefined" && navigator.languages
        ? [...navigator.languages]
        : typeof navigator !== "undefined" && navigator.language
          ? [navigator.language]
          : [];
    return resolveDefaultCurrency({ lang, preferGbp, browserLocales: locales });
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = readStoredCurrency();
    if (stored) {
      setCurrencyState(stored);
      return;
    }
    const locales =
      typeof navigator !== "undefined" && navigator.languages
        ? [...navigator.languages]
        : typeof navigator !== "undefined" && navigator.language
          ? [navigator.language]
          : [];
    setCurrencyState(
      resolveDefaultCurrency({ lang, preferGbp, browserLocales: locales })
    );
  }, [lang, preferGbp]);

  const setCurrency = useCallback((next) => {
    const value = typeof next === "string" ? next.toLowerCase() : "";
    if (!PACK_CURRENCIES.includes(value)) return;
    setCurrencyState(value);
    writeStoredCurrency(value);
  }, []);

  const formattedPrice = useMemo(
    () => formatPackPrice(currency, lang),
    [currency, lang]
  );

  const selectorLabels = useMemo(() => currencySelectorLabels(lang), [lang]);

  const startCheckout = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currency,
          lang,
          cancelPath: cancelPath || (lang === "en" ? "/en" : "/"),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok && data.url) {
        window.location.href = data.url;
        return;
      }
      window.location.href = PAYMENT_LINK;
    } catch {
      window.location.href = PAYMENT_LINK;
    } finally {
      setLoading(false);
    }
  }, [currency, lang, cancelPath]);

  return {
    currency,
    setCurrency,
    formattedPrice,
    selectorLabels,
    loading,
    startCheckout,
  };
}
