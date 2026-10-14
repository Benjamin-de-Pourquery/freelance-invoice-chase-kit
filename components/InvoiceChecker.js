"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import LangToggle from "@/components/LangToggle";
import SiteFooter from "@/components/SiteFooter";
import { PAYMENT_LINK } from "@/lib/i18n";
import {
  evaluateInvoiceMentions,
  summarizeResults,
} from "@/lib/invoice-checker/evaluate";
import { MENTION_IDS } from "@/lib/invoice-checker/copy";

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

function Toggle({ checked, onChange, label, id }) {
  return (
    <label className="checker-toggle" htmlFor={id}>
      <input
        id={id}
        type="checkbox"
        className="checker-toggle-input"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="checker-toggle-track" aria-hidden="true" />
      <span className="checker-toggle-label">{label}</span>
    </label>
  );
}

function MentionToggle({ checked, onChange, label, id }) {
  return (
    <label className="checker-mention" htmlFor={id}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="checker-mention-box" aria-hidden="true" />
      <span>{label}</span>
    </label>
  );
}

const defaultMentions = () =>
  Object.fromEntries(MENTION_IDS.map((id) => [id, false]));

export default function InvoiceChecker({ t, kitBrand }) {
  const [companySize, setCompanySize] = useState("micro");
  const [vatRegime, setVatRegime] = useState("standard");
  const [clientType, setClientType] = useState("french_b2b");
  const [invoiceDate, setInvoiceDate] = useState("2026-10-14");
  const [operationKind, setOperationKind] = useState("services");
  const [deliveryDiffers, setDeliveryDiffers] = useState(false);
  const [vatDebitsOpted, setVatDebitsOpted] = useState(false);
  const [presentMentions, setPresentMentions] = useState(defaultMentions);
  const [copied, setCopied] = useState(false);

  const results = useMemo(
    () =>
      evaluateInvoiceMentions({
        companySize,
        vatRegime,
        clientType,
        invoiceDate,
        operationKind,
        deliveryDiffers,
        vatDebitsOpted,
        presentMentions,
      }),
    [
      companySize,
      vatRegime,
      clientType,
      invoiceDate,
      operationKind,
      deliveryDiffers,
      vatDebitsOpted,
      presentMentions,
    ]
  );

  const summary = useMemo(() => summarizeResults(results), [results]);

  const setMention = useCallback((id, value) => {
    setPresentMentions((prev) => ({ ...prev, [id]: value }));
  }, []);

  const buildTextSummary = useCallback(() => {
    const lines = [
      t.title,
      "",
      `${t.companySizeLabel}: ${t.companySizes[companySize]}`,
      `${t.invoiceDateLabel}: ${invoiceDate}`,
      "",
    ];
    for (const r of results) {
      if (r.status === "not_required") continue;
      lines.push(
        `[${t.statusLabels[r.status]}] ${t.ruleLabels[r.id]} (${r.sourceUrl})`
      );
    }
    lines.push("", t.disclaimer);
    return lines.join("\n");
  }, [t, results, companySize, invoiceDate]);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildTextSummary());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard may be unavailable */
    }
  };

  const onPrint = () => window.print();

  const footerT = {
    disclaimer: t.disclaimer,
    footerLinks: t.lang === "fr"
      ? { terms: "/mentions", privacy: "/confidentialite", termsLabel: "Mentions / CGV", privacyLabel: "Confidentialité" }
      : { terms: "/en/terms", privacy: "/en/privacy", termsLabel: "Terms", privacyLabel: "Privacy" },
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

      <section className="card checker-timeline-note" aria-labelledby="timeline-note-title">
        <h2 id="timeline-note-title">{t.timelineNoteTitle}</h2>
        <p className="note" style={{ marginTop: 0 }}>{t.timelineNoteBody}</p>
        <ul className="source-list">
          {t.timelineSources.map((s) => (
            <li key={s.url}>
              <a href={s.url} target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <div className="checker-grid">
        <section className="card" aria-labelledby="ctx-heading">
          <h2 id="ctx-heading">{t.sectionContext}</h2>

          <p className="checker-field-label">{t.companySizeLabel}</p>
          <div className="checker-card-grid" role="group" aria-label={t.companySizeLabel}>
            {Object.entries(t.companySizes).map(([key, label]) => (
              <OptionCard
                key={key}
                id={`size-${key}`}
                selected={companySize === key}
                onSelect={() => setCompanySize(key)}
              >
                {label}
              </OptionCard>
            ))}
          </div>

          <p className="checker-field-label">{t.vatRegimeLabel}</p>
          <div className="checker-pills" role="group" aria-label={t.vatRegimeLabel}>
            {Object.entries(t.vatRegimes).map(([key, label]) => (
              <button
                key={key}
                type="button"
                className={`checker-pill${vatRegime === key ? " checker-pill--on" : ""}`}
                aria-pressed={vatRegime === key}
                onClick={() => setVatRegime(key)}
              >
                {label}
              </button>
            ))}
          </div>

          <p className="checker-field-label">{t.clientTypeLabel}</p>
          <div className="checker-card-grid checker-card-grid--1" role="group" aria-label={t.clientTypeLabel}>
            {Object.entries(t.clientTypes).map(([key, label]) => (
              <OptionCard
                key={key}
                id={`client-${key}`}
                selected={clientType === key}
                onSelect={() => setClientType(key)}
              >
                {label}
              </OptionCard>
            ))}
          </div>

          <label className="checker-field-label" htmlFor="invoice-date">
            {t.invoiceDateLabel}
          </label>
          <input
            id="invoice-date"
            type="date"
            className="checker-date"
            value={invoiceDate}
            onChange={(e) => setInvoiceDate(e.target.value)}
          />

          <p className="checker-field-label">{t.operationKindLabel}</p>
          <div className="checker-pills" role="group" aria-label={t.operationKindLabel}>
            {Object.entries(t.operationKinds).map(([key, label]) => (
              <button
                key={key}
                type="button"
                className={`checker-pill${operationKind === key ? " checker-pill--on" : ""}`}
                aria-pressed={operationKind === key}
                onClick={() => setOperationKind(key)}
              >
                {label}
              </button>
            ))}
          </div>

          <Toggle
            id="delivery-differs"
            label={t.deliveryDiffersLabel}
            checked={deliveryDiffers}
            onChange={setDeliveryDiffers}
          />
          <Toggle
            id="vat-debits"
            label={t.vatDebitsOptedLabel}
            checked={vatDebitsOpted}
            onChange={setVatDebitsOpted}
          />
        </section>

        <section className="card" aria-labelledby="mentions-heading">
          <h2 id="mentions-heading">{t.sectionMentions}</h2>
          <p className="note">{t.runCheck}</p>
          <div className="checker-mentions">
            {MENTION_IDS.map((id) => (
              <MentionToggle
                key={id}
                id={`mention-${id}`}
                label={t.ruleLabels[id]}
                checked={!!presentMentions[id]}
                onChange={(v) => setMention(id, v)}
              />
            ))}
          </div>
        </section>
      </div>

      <section
        className="card checker-results"
        id="checker-results"
        aria-labelledby="results-heading"
      >
        <div className="checker-results-head">
          <h2 id="results-heading">{t.sectionResults}</h2>
          <div className="checker-results-actions">
            <button type="button" className="checker-btn-secondary" onClick={onCopy}>
              {copied ? t.copied : t.copySummary}
            </button>
            <button type="button" className="checker-btn-secondary" onClick={onPrint}>
              {t.printSummary}
            </button>
          </div>
        </div>

        <div className="checker-summary-chips" aria-live="polite">
          <span className="checker-chip checker-chip--ok">
            {t.statusLabels.present}: {summary.present}
          </span>
          <span className="checker-chip checker-chip--bad">
            {t.statusLabels.missing}: {summary.missing}
          </span>
          <span className="checker-chip checker-chip--muted">
            {t.statusLabels.not_yet_required}: {summary.not_yet_required}
          </span>
        </div>

        <ul className="checker-result-list">
          {results.map((r) => (
            <li
              key={r.id}
              className={`checker-result checker-result--${r.status}`}
            >
              <div className="checker-result-main">
                <span className="checker-result-status">
                  {t.statusLabels[r.status]}
                </span>
                <p className="checker-result-label">{t.ruleLabels[r.id]}</p>
                {t.statusHint[r.status] && (
                  <p className="checker-result-hint">{t.statusHint[r.status]}</p>
                )}
              </div>
              <a
                className="checker-source"
                href={r.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Source
              </a>
            </li>
          ))}
        </ul>
      </section>

      <aside className="card checker-cta">
        <h2>{t.ctaTitle}</h2>
        <p className="note" style={{ marginTop: 0 }}>{t.ctaBody}</p>
        <a className="cta cta-inline" href={PAYMENT_LINK} rel="noopener noreferrer">
          {t.ctaButton}
        </a>
      </aside>

      <SiteFooter t={footerT} />
    </main>
  );
}
