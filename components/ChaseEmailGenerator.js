"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import LangToggle from "@/components/LangToggle";
import SiteFooter from "@/components/SiteFooter";
import { PAYMENT_LINK } from "@/lib/i18n";
import {
  buildMailtoHref,
  formatEmailForCopy,
  generateChaseEmail,
  todayIsoLocal,
} from "@/lib/chase-email-generator/generate";

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

export default function ChaseEmailGenerator({ t, kitBrand }) {
  const [clientName, setClientName] = useState("Acme Ltd");
  const [contactName, setContactName] = useState("");
  const [freelancerName, setFreelancerName] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("INV-2026-042");
  const [amount, setAmount] = useState("1500");
  const [currency, setCurrency] = useState("EUR");
  const [invoiceDate, setInvoiceDate] = useState("2026-09-01");
  const [dueDate, setDueDate] = useState("2026-09-15");
  const [paymentDetails, setPaymentDetails] = useState("");
  const [stage, setStage] = useState("friendly");
  const [emailLang, setEmailLang] = useState(t.lang === "fr" ? "fr" : "en");
  const [copied, setCopied] = useState(false);

  const parsedAmount = parseFloat(String(amount).replace(",", ".")) || 0;
  const referenceDate = todayIsoLocal();

  const generated = useMemo(
    () =>
      generateChaseEmail({
        stage,
        emailLang,
        clientName,
        contactName,
        freelancerName,
        invoiceNumber,
        amount: parsedAmount,
        currency,
        invoiceDate,
        dueDate,
        paymentDetails,
        referenceDate,
      }),
    [
      stage,
      emailLang,
      clientName,
      contactName,
      freelancerName,
      invoiceNumber,
      parsedAmount,
      currency,
      invoiceDate,
      dueDate,
      paymentDetails,
      referenceDate,
    ]
  );

  const fullText = useMemo(
    () => formatEmailForCopy(generated.subject, generated.body),
    [generated.subject, generated.body]
  );

  const mailtoHref = useMemo(
    () => buildMailtoHref(generated.subject, generated.body),
    [generated.subject, generated.body]
  );

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }, [fullText]);

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
    <main className="wrap checker-wrap">
      <div className="topbar">
        <Link href={t.homeHref} className="checker-back">
          ← {kitBrand}
        </Link>
        <LangToggle href={t.otherLangHref} label={t.otherLangLabel} />
      </div>

      <span className="badge">{t.badge}</span>
      <h1>{t.title}</h1>
      <p className="lead">{t.lead}</p>

      <div className="checker-grid">
        <section className="card" aria-labelledby="chase-inputs">
          <h2 id="chase-inputs">{t.sectionInputs}</h2>

          <label className="checker-field-label" htmlFor="client-name">
            {t.clientNameLabel}
          </label>
          <input
            id="client-name"
            className="checker-date checker-input-wide"
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            autoComplete="organization"
          />

          <label className="checker-field-label" htmlFor="contact-name">
            {t.contactNameLabel}
          </label>
          <input
            id="contact-name"
            className="checker-date checker-input-wide"
            type="text"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            autoComplete="name"
          />

          <label className="checker-field-label" htmlFor="freelancer-name">
            {t.freelancerNameLabel}
          </label>
          <input
            id="freelancer-name"
            className="checker-date checker-input-wide"
            type="text"
            value={freelancerName}
            onChange={(e) => setFreelancerName(e.target.value)}
            autoComplete="name"
          />

          <label className="checker-field-label" htmlFor="invoice-number">
            {t.invoiceNumberLabel}
          </label>
          <input
            id="invoice-number"
            className="checker-date checker-input-wide"
            type="text"
            value={invoiceNumber}
            onChange={(e) => setInvoiceNumber(e.target.value)}
          />

          <label className="checker-field-label" htmlFor="amount">
            {t.amountLabel}
          </label>
          <input
            id="amount"
            className="checker-date checker-input-wide"
            type="number"
            min="0"
            step="0.01"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <label className="checker-field-label" htmlFor="currency">
            {t.currencyLabel}
          </label>
          <select
            id="currency"
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

          <label className="checker-field-label" htmlFor="invoice-date">
            {t.invoiceDateLabel}
          </label>
          <input
            id="invoice-date"
            className="checker-date"
            type="date"
            value={invoiceDate}
            onChange={(e) => setInvoiceDate(e.target.value)}
          />

          <label className="checker-field-label" htmlFor="due-date">
            {t.dueDateLabel}
          </label>
          <input
            id="due-date"
            className="checker-date"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <label className="checker-field-label" htmlFor="payment-details">
            {t.paymentDetailsLabel}
          </label>
          <textarea
            id="payment-details"
            className="checker-date checker-input-wide"
            rows={3}
            value={paymentDetails}
            onChange={(e) => setPaymentDetails(e.target.value)}
            placeholder={t.paymentDetailsHint}
            style={{ resize: "vertical", minHeight: 72 }}
          />

          <p className="checker-field-label">{t.stageLabel}</p>
          <div
            className="checker-card-grid checker-card-grid--1"
            role="group"
            aria-label={t.stageLabel}
          >
            {Object.entries(t.stages).map(([key, meta]) => (
              <OptionCard
                key={key}
                id={`stage-${key}`}
                selected={stage === key}
                onSelect={() => setStage(key)}
              >
                <strong>{meta.title}</strong>
                <p className="checker-result-hint" style={{ margin: "6px 0 0" }}>
                  {meta.hint}
                </p>
              </OptionCard>
            ))}
          </div>

          <p className="checker-field-label">{t.emailLangLabel}</p>
          <div className="checker-pills" role="group" aria-label={t.emailLangLabel}>
            {Object.entries(t.emailLangs).map(([key, label]) => (
              <button
                key={key}
                type="button"
                className={`checker-pill${emailLang === key ? " checker-pill--on" : ""}`}
                aria-pressed={emailLang === key}
                onClick={() => setEmailLang(key)}
              >
                {label}
              </button>
            ))}
          </div>
        </section>

        <section className="card" aria-labelledby="chase-output" aria-live="polite">
          <h2 id="chase-output">{t.sectionOutput}</h2>

          <dl className="penalty-result-dl">
            <div>
              <dt>{t.daysLateLabel}</dt>
              <dd className="mono">{generated.daysLate}</dd>
            </div>
          </dl>

          <p className="checker-field-label" style={{ marginTop: 14 }}>
            {t.subjectLabel}
          </p>
          <p className="mono" style={{ margin: 0, fontSize: "0.92rem" }}>
            {generated.subject}
          </p>

          <p className="checker-field-label" style={{ marginTop: 14 }}>
            {t.bodyLabel}
          </p>
          <pre className="penalty-chase-pre" style={{ marginTop: 0 }}>
            {generated.body}
          </pre>

          <div className="checker-results-actions" style={{ marginTop: 12 }}>
            <button type="button" className="checker-btn-secondary" onClick={onCopy}>
              {copied ? t.copiedBtn : t.copyBtn}
            </button>
            <a className="checker-btn-secondary" href={mailtoHref}>
              {t.mailtoBtn}
            </a>
          </div>
        </section>
      </div>

      <section className="card checker-timeline-note" style={{ marginTop: 18 }}>
        <h2>{t.calculatorsTitle}</h2>
        <p className="note" style={{ marginTop: 0 }}>{t.calculatorsIntro}</p>
        <ul className="source-list">
          {t.calculatorLinks.map((link) => (
            <li key={link.href}>
              <Link className="checker-tool-link" href={link.href}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <p className="note e-invoicing-disclaimer" style={{ marginTop: 14 }}>
          {t.disclaimer}
        </p>
      </section>

      <section className="card checker-cta" style={{ marginTop: 18 }}>
        <h2>{t.kitCtaTitle}</h2>
        <p className="note" style={{ marginTop: 0 }}>{t.kitCtaBody}</p>
        <a className="cta cta-inline" href={PAYMENT_LINK} rel="noopener noreferrer">
          {t.kitCtaBtn}
        </a>
      </section>

      <SiteFooter t={footerT} />
    </main>
  );
}
