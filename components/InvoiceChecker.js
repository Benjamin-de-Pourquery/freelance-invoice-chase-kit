"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import LangToggle from "@/components/LangToggle";
import SiteFooter from "@/components/SiteFooter";
import PackCheckoutButton from "@/components/PackCheckoutButton";
import {
  evaluateInvoiceMentions,
  summarizeResults,
} from "@/lib/invoice-checker/evaluate";
import {
  CORE_MENTION_IDS,
  FRANCHISE_WORDING_IDS,
  MENTION_IDS,
  REFORM_MENTION_IDS,
} from "@/lib/invoice-checker/copy";

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

function ResultList({ results, t }) {
  return (
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
            {r.noteKey && t.resultNotes?.[r.noteKey] && (
              <p className="checker-result-hint">{t.resultNotes[r.noteKey]}</p>
            )}
          </div>
          <a
            className="checker-source"
            href={r.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.sourceLinkLabel}
          </a>
        </li>
      ))}
    </ul>
  );
}

const defaultMentions = () =>
  Object.fromEntries(MENTION_IDS.map((id) => [id, false]));

function mentionIdsForRegime(vatRegime) {
  const core = CORE_MENTION_IDS.filter(
    (id) => !FRANCHISE_WORDING_IDS.includes(id)
  );
  if (vatRegime === "franchise") {
    return [...core, ...FRANCHISE_WORDING_IDS];
  }
  return core;
}

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

  const coreResults = useMemo(
    () => results.filter((r) => !r.reformGroup),
    [results]
  );
  const reformResults = useMemo(
    () => results.filter((r) => r.reformGroup),
    [results]
  );

  const summary = useMemo(() => summarizeResults(results), [results]);

  const visibleMentionIds = useMemo(
    () => mentionIdsForRegime(vatRegime),
    [vatRegime]
  );

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

  const renderMentionGroup = (ids) =>
    ids.map((id) => (
      <MentionToggle
        key={id}
        id={`mention-${id}`}
        label={t.ruleLabels[id]}
        checked={!!presentMentions[id]}
        onChange={(v) => setMention(id, v)}
      />
    ));

  const coreMentionIds = visibleMentionIds.filter(
    (id) => !REFORM_MENTION_IDS.includes(id)
  );
  const reformMentionIds = REFORM_MENTION_IDS;

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
      <p className="note">{t.exhaustiveListNote}</p>

      <section className="card checker-timeline-note" aria-labelledby="reform-explainer-title">
        <h2 id="reform-explainer-title">{t.reformExplainerTitle}</h2>
        <p className="note" style={{ marginTop: 0 }}>{t.reformExplainerBody}</p>
        <p className="checker-field-label">{t.reformExplainerSourcesHeading}</p>
        <ul className="source-list">
          {t.reformExplainerSources.map((s) => (
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

          <h3 className="checker-subheading">{t.sectionCoreMentions}</h3>
          <div className="checker-mentions">
            {renderMentionGroup(coreMentionIds)}
          </div>

          <h3 className="checker-subheading">{t.sectionReformMentions}</h3>
          <div className="checker-mentions">
            {renderMentionGroup(reformMentionIds)}
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

        <h3 className="checker-subheading">{t.sectionCoreResults}</h3>
        <ResultList results={coreResults} t={t} />

        <h3 className="checker-subheading">{t.sectionReformResults}</h3>
        <ResultList results={reformResults} t={t} />
      </section>

      <aside className="card checker-cta">
        <h2>{t.ctaTitle}</h2>
        <p className="note" style={{ marginTop: 0 }}>{t.ctaBody}</p>
        <PackCheckoutButton
          lang={t.lang === "en" ? "en" : "fr"}
          ctaLabel={t.ctaButton}
          className="cta cta-inline"
          compactSelector={true}
        />
      </aside>

      <SiteFooter t={footerT} />
    </main>
  );
}
