"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import LangToggle from "@/components/LangToggle";
import SiteFooter from "@/components/SiteFooter";
import PackCheckoutButton from "@/components/PackCheckoutButton";
import { normalizeCurrency } from "@/lib/checkout/pricing";
import { generatePaymentTermsStatement } from "@/lib/payment-terms-generator/generate";

function OptionCard({ selected, onSelect, children, id }) {
  return (
    <button
      type="button"
      id={id}
      className={`checker-card${selected ? " checker-card--selected" : ""}`}
      aria-pressed={selected}
      onClick={onSelect}
    >
      {children}
    </button>
  );
}

export default function PaymentTermsGenerator({ t, kitBrand }) {
  const [freelancerName, setFreelancerName] = useState("");
  const [clientName, setClientName] = useState("");
  const [scope, setScope] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("2500");
  const [currency, setCurrency] = useState("EUR");
  const [paymentDueTerm, setPaymentDueTerm] = useState("");
  const [paymentMethods, setPaymentMethods] = useState("");
  const [terminationNotice, setTerminationNotice] = useState("");
  const [jurisdiction, setJurisdiction] = useState("france");
  const [copied, setCopied] = useState(false);

  const parsedPrice = parseFloat(String(price).replace(",", ".")) || 0;
  const preferredPackCurrency = normalizeCurrency(currency);

  const generated = useMemo(
    () =>
      generatePaymentTermsStatement(
        {
          freelancerName,
          clientName,
          scope,
          duration,
          price,
          currency,
          paymentDueTerm,
          paymentMethods,
          terminationNotice,
          jurisdiction,
        },
        t.documentLabels,
        { pageLang: t.lang === "en" ? "en" : "fr" }
      ),
    [
      freelancerName,
      clientName,
      scope,
      duration,
      price,
      currency,
      paymentDueTerm,
      paymentMethods,
      terminationNotice,
      jurisdiction,
      t.documentLabels,
    ]
  );

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(generated.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }, [generated.text]);

  const onPrint = () => window.print();

  const footerT = {
    disclaimer: t.disclaimer,
    footerLinks:
      t.lang === "fr"
        ? {
            terms: "/mentions",
            privacy: "/confidentialite",
            termsLabel: "Mentions / CGV",
            privacyLabel: "Confidentialité",
          }
        : {
            terms: "/en/terms",
            privacy: "/en/privacy",
            termsLabel: "Terms",
            privacyLabel: "Privacy",
          },
    footerBrand: kitBrand,
  };

  return (
    <main className="wrap checker-wrap payment-terms-wrap">
      <div className="topbar">
        <Link href={t.homeHref} className="checker-back">
          ← {kitBrand}
        </Link>
        <LangToggle href={t.otherLangHref} label={t.otherLangLabel} />
      </div>

      <span className="badge">{t.badge}</span>
      <h1>{t.title}</h1>
      <p className="lead">{t.lead}</p>
      <p className="note payment-terms-legal-banner" role="note">
        {t.notLegalAdviceBanner}
      </p>

      <div className="checker-grid">
        <section
          className="card payment-terms-form"
          aria-labelledby="payment-terms-inputs"
        >
          <h2 id="payment-terms-inputs">{t.sectionInputs}</h2>

          <label className="checker-field-label" htmlFor="pt-freelancer">
            {t.freelancerNameLabel}
          </label>
          <input
            id="pt-freelancer"
            className="checker-date checker-input-wide"
            type="text"
            value={freelancerName}
            onChange={(e) => setFreelancerName(e.target.value)}
            autoComplete="organization"
          />

          <label className="checker-field-label" htmlFor="pt-client">
            {t.clientNameLabel}
          </label>
          <input
            id="pt-client"
            className="checker-date checker-input-wide"
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            autoComplete="organization"
          />

          <label className="checker-field-label" htmlFor="pt-scope">
            {t.scopeLabel}
          </label>
          <textarea
            id="pt-scope"
            className="checker-date checker-input-wide"
            rows={3}
            value={scope}
            onChange={(e) => setScope(e.target.value)}
            placeholder={t.scopeHint}
            style={{ resize: "vertical", minHeight: 72 }}
          />

          <label className="checker-field-label" htmlFor="pt-duration">
            {t.durationLabel}
          </label>
          <input
            id="pt-duration"
            className="checker-date checker-input-wide"
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder={t.durationHint}
          />

          <label className="checker-field-label" htmlFor="pt-price">
            {t.priceLabel}
          </label>
          <input
            id="pt-price"
            className="checker-date checker-input-wide"
            type="number"
            min="0"
            step="0.01"
            inputMode="decimal"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <label className="checker-field-label" htmlFor="pt-currency">
            {t.currencyLabel}
          </label>
          <select
            id="pt-currency"
            className="checker-date checker-input-wide"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            {Object.entries(t.currencies).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>

          <label className="checker-field-label" htmlFor="pt-due">
            {t.paymentDueLabel}
          </label>
          <input
            id="pt-due"
            className="checker-date checker-input-wide"
            type="text"
            value={paymentDueTerm}
            onChange={(e) => setPaymentDueTerm(e.target.value)}
            placeholder={t.paymentDueHint}
          />

          <label className="checker-field-label" htmlFor="pt-methods">
            {t.paymentMethodsLabel}
          </label>
          <textarea
            id="pt-methods"
            className="checker-date checker-input-wide"
            rows={2}
            value={paymentMethods}
            onChange={(e) => setPaymentMethods(e.target.value)}
            placeholder={t.paymentMethodsHint}
            style={{ resize: "vertical", minHeight: 56 }}
          />

          <label className="checker-field-label" htmlFor="pt-termination">
            {t.terminationLabel}
          </label>
          <input
            id="pt-termination"
            className="checker-date checker-input-wide"
            type="text"
            value={terminationNotice}
            onChange={(e) => setTerminationNotice(e.target.value)}
            placeholder={t.terminationHint}
          />

          <p className="checker-field-label">{t.jurisdictionLabel}</p>
          <div
            className="checker-card-grid checker-card-grid--1"
            role="group"
            aria-label={t.jurisdictionLabel}
          >
            {Object.entries(t.jurisdictions).map(([key, label]) => (
              <OptionCard
                key={key}
                id={`jurisdiction-${key}`}
                selected={jurisdiction === key}
                onSelect={() => setJurisdiction(key)}
              >
                {label}
              </OptionCard>
            ))}
          </div>
        </section>

        <section
          className="card payment-terms-output"
          aria-labelledby="payment-terms-output-heading"
          aria-live="polite"
        >
          <div className="checker-results-head">
            <h2 id="payment-terms-output-heading">{t.sectionOutput}</h2>
            <div className="checker-results-actions payment-terms-print-actions">
              <button
                type="button"
                className="checker-btn-secondary"
                onClick={onCopy}
              >
                {copied ? t.copiedBtn : t.copyBtn}
              </button>
              <button
                type="button"
                className="checker-btn-secondary"
                onClick={onPrint}
              >
                {t.printBtn}
              </button>
            </div>
          </div>

          <pre className="penalty-chase-pre payment-terms-pre">
            {generated.text}
          </pre>
        </section>
      </div>

      <section
        className="card checker-timeline-note payment-terms-context"
        aria-labelledby="payment-terms-context"
      >
        <h2 id="payment-terms-context">{t.contextTitle}</h2>

        {(jurisdiction === "uk" || jurisdiction === "other") && (
          <>
            <h3 className="checker-subheading">{t.ukContextTitle}</h3>
            <p className="note" style={{ marginTop: 0 }}>
              {t.ukContextBody}{" "}
              <a
                href={t.ukContextLinkUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.ukContextLinkLabel}
              </a>
            </p>
          </>
        )}

        {(jurisdiction === "france" || jurisdiction === "other") && (
          <>
            <h3 className="checker-subheading">{t.franceContextTitle}</h3>
            <p className="note" style={{ marginTop: 0 }}>
              {t.franceContextBody}{" "}
              <Link
                className="checker-tool-link"
                href={t.franceContextLinkHref}
              >
                {t.franceContextLinkLabel}
              </Link>
            </p>
          </>
        )}

        {jurisdiction === "other" && (
          <>
            <h3 className="checker-subheading">{t.otherContextTitle}</h3>
            <p className="note" style={{ marginTop: 0 }}>
              {t.otherContextBody}
            </p>
          </>
        )}

        <p className="note e-invoicing-disclaimer" style={{ marginTop: 14 }}>
          {t.disclaimer}
        </p>
      </section>

      <aside className="card checker-cta payment-terms-cta">
        <h2>{t.ctaTitle}</h2>
        <p className="note" style={{ marginTop: 0 }}>
          {t.ctaBody}
        </p>
        <PackCheckoutButton
          lang={t.lang === "en" ? "en" : "fr"}
          preferredCurrency={preferredPackCurrency}
          ctaLabel={t.ctaButton}
          className="cta cta-inline"
          compactSelector={true}
        />
      </aside>

      <SiteFooter t={footerT} />
    </main>
  );
}
