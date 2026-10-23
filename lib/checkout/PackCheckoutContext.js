"use client";

import { createContext, useContext } from "react";
import { usePackCheckout } from "./usePackCheckout.js";

const PackCheckoutContext = createContext(null);

export function PackCheckoutProvider({ lang, preferGbp = false, cancelPath, children }) {
  const checkout = usePackCheckout({ lang, preferGbp, cancelPath });
  return (
    <PackCheckoutContext.Provider value={checkout}>{children}</PackCheckoutContext.Provider>
  );
}

export function usePackCheckoutContext() {
  const ctx = useContext(PackCheckoutContext);
  if (!ctx) {
    throw new Error("usePackCheckoutContext must be used within PackCheckoutProvider");
  }
  return ctx;
}
