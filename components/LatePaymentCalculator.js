"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import LangToggle from "@/components/LangToggle";
import SiteFooter from "@/components/SiteFooter";
import PackCheckoutButton from "@/components/PackCheckoutButton";
import {
  buildChaseEmailText,
  calculateLatePaymentPenalties,
} from "@/lib/late-payment-penalty/calculate";
import {
  formatBreakdownLine,
  formatRateDetail,
} from "@/lib/late-payment-penalty/copy";

function todayIso() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

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

export default function LatePaymentCalculator({ t, kitBrand }) {
  const [amountTtc, setAmountTtc] = useState("1000");
  const [dueDate, setDueDate] = useState("2026-04-01");
  const [calcDate, setCalcDate] = useState(() => todayIso());
  const [contractualRate, setContractualRate] = useState("");
  const [debtorType, setDebtorType] = useState("professional");
  const [formalNoticeDate, setFormalNoticeDate] = useState("");
  const [copied, setCopied] = useState(false);

  const parsedAmount = parseFloat(amountTtc.replace(",", ".")) || 0;
  const contractualParsed =
    contractualRate.trim() === ""
      ? null
      : parseFloat(contractualRate.replace(",", "."));

  const result = useMemo(
    () =>
      calculateLatePaymentPenalties({
        amountTtc: parsedAmount,
        dueDate,
        calcDate,
        contractualRatePercent: contractualParsed,
        debtorType,
        formalNoticeDate: debtorType === "private" ? formalNoticeDate : null,
      }),
    [parsedAmount, dueDate, calcDate, contractualParsed, debtorType, formalNoticeDate]
  );

  const chaseText = useMemo(
    () =>
      buildChaseEmailText(result, {
        dueDate,
        calcDate,
        debtorType,
        lang: t.lang,
      }),
    [result, dueDate, calcDate, debtorType, t.lang]
  );

  const rateDetail = formatRateDetail(result, t);

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(chaseText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }, [chaseText]);

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

      <p className="note" style={{ marginTop: 0 }}>{t.l441Note}</p>

      <div className="checker-grid">
        <section className="card" aria-labelledby="penalty-inputs">
          <h2 id="penalty-inputs">{t.sectionInputs}</h2>

          <label className="checker-field-label" htmlFor="amount-ttc">
            {t.amountLabel}
          </label>
          <input
            id="amount-ttc"
            className="checker-date checker-input-wide"
            type="number"
            min="0"
            step="0.01"
            inputMode="decimal"
            value={amountTtc}
            onChange={(e) => setAmountTtc(e.target.value)}
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

          <label className="checker-field-label" htmlFor="calc-date">
            {t.calcDateLabel}
          </label>
          <input
            id="calc-date"
            className="checker-date"
            type="date"
            value={calcDate}
            onChange={(e) => setCalcDate(e.target.value)}
          />
          <p className="note" style={{ marginTop: 6 }}>{t.calcDateHint}</p>

          <label className="checker-field-label" htmlFor="contractual-rate">
            {t.contractualRateLabel}
          </label>
          <input
            id="contractual-rate"
            className="checker-date checker-input-wide"
            type="number"
            min="0"
            step="0.01"
            inputMode="decimal"
            placeholder="12.15"
            value={contractualRate}
            onChange={(e) => setContractualRate(e.target.value)}
          />
          <p className="note" style={{ marginTop: 6 }}>{t.contractualRateHint}</p>

          <p className="checker-field-label">{t.debtorTypeLabel}</p>
          <div
            className="checker-card-grid checker-card-grid--1"
            role="group"
            aria-label={t.debtorTypeLabel}
          >
            {Object.entries(t.debtorTypes).map(([key, label]) => (
              <OptionCard
                key={key}
                id={`debtor-${key}`}
                selected={debtorType === key}
                onSelect={() => setDebtorType(key)}
              >
                {label}
              </OptionCard>
            ))}
          </div>

          {debtorType === "private" && (
            <>
              <label className="checker-field-label" htmlFor="formal-notice-date">
                {t.formalNoticeLabel}
              </label>
              <input
                id="formal-notice-date"
                className="checker-date"
                type="date"
                value={formalNoticeDate}
                onChange={(e) => setFormalNoticeDate(e.target.value)}
              />
              <p className="note" style={{ marginTop: 6 }}>{t.formalNoticeHint}</p>
            </>
          )}
        </section>

        <section className="card" aria-labelledby="penalty-results">
          <h2 id="penalty-results">{t.sectionResults}</h2>

          {result.daysLate === 0 ? (
            <div className="checker-timeline-note" style={{ marginTop: 0, padding: 0, border: "none", background: "transparent" }}>
              <p className="checker-result-label" style={{ marginTop: 0 }}>
                <strong>{t.noPenaltiesTitle}</strong>
              </p>
              <p className="checker-result-hint">{t.noPenaltiesBody}</p>
            </div>
          ) : result.rateReason === "formal_notice_required" ? (
            <p className="checker-result-hint">
              {t.rateReasons.formal_notice_required}
            </p>
          ) : result.rateReason === "unavailable" ? (
            <p className="note" style={{ color: "var(--warn)" }}>
              {t.rateReasons.unavailable}
            </p>
          ) : null}

          {result.needsManualRate && result.rateReason !== "unavailable" && (
            <p className="note" style={{ color: "var(--warn)" }}>
              {t.warningUnknownSemester}
            </p>
          )}

          <dl className="penalty-result-dl">
            <div>
              <dt>{t.daysLateLabel}</dt>
              <dd>{result.daysLate}</dd>
            </div>
            {result.annualRatePercent != null && (
              <div>
                <dt>{t.rateLabel}</dt>
                <dd>
                  <span className="mono">{result.annualRatePercent.toFixed(2)}%</span>
                  {rateDetail && (
                    <p className="checker-result-hint" style={{ marginTop: 6 }}>
                      {rateDetail}
                    </p>
                  )}
                </dd>
              </div>
            )}
            {result.spansMultipleSemesters &&
              result.interestBreakdown?.length > 0 && (
                <div>
                  <dt>{t.breakdownTitle}</dt>
                  <dd>
                    <ul className="source-list" style={{ margin: 0 }}>
                      {result.interestBreakdown.map((row) => (
                        <li key={row.semesterKey} className="mono" style={{ fontSize: "0.85rem" }}>
                          {formatBreakdownLine(row, t.lang)}
                        </li>
                      ))}
                    </ul>
                    <p className="checker-result-hint" style={{ marginTop: 6 }}>
                      {parsedAmount.toFixed(2)} × (taux / 100) × (jours / 365) par semestre
                    </p>
                  </dd>
                </div>
              )}
            {result.formula &&
              result.annualRatePercent != null &&
              !result.spansMultipleSemesters && (
              <div>
                <dt>{t.formulaLabel}</dt>
                <dd className="mono" style={{ fontSize: "0.85rem" }}>
                  {parsedAmount.toFixed(2)} × ({result.annualRatePercent.toFixed(2)} / 100) × (
                  {result.interestDays} / 365) = {result.interestEur.toFixed(2)} €
                </dd>
              </div>
            )}
            <div>
              <dt>{t.interestLabel}</dt>
              <dd className="mono">{result.interestEur.toFixed(2)} €</dd>
            </div>
            <div>
              <dt>{t.recoveryLabel}</dt>
              <dd className="mono">
                {result.recoveryIndemnityEur > 0
                  ? `${result.recoveryIndemnityEur.toFixed(2)} €`
                  : t.recoveryNa}
              </dd>
            </div>
            <div className="penalty-total-row">
              <dt>{t.totalLabel}</dt>
              <dd className="mono">{result.totalPenaltiesEur.toFixed(2)} €</dd>
            </div>
          </dl>
        </section>
      </div>

      <section className="card" style={{ marginTop: 18 }}>
        <div className="checker-results-header">
          <h2 style={{ margin: 0 }}>{t.chaseTitle}</h2>
          <button type="button" className="checker-btn-secondary" onClick={onCopy}>
            {copied ? t.copiedBtn : t.copyBtn}
          </button>
        </div>
        <pre className="penalty-chase-pre">{chaseText}</pre>
      </section>

      <section className="card checker-timeline-note" style={{ marginTop: 18 }}>
        <h2>{t.sourcesTitle}</h2>
        <ul className="source-list">
          {t.sources.map((s) => (
            <li key={s.url}>
              <a href={s.url} target="_blank" rel="noopener noreferrer">
                {t.sourceLabels[s.key]}
              </a>
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
        <PackCheckoutButton
          lang={t.lang === "en" ? "en" : "fr"}
          ctaLabel={t.kitCtaBtn}
          className="cta cta-inline"
          compactSelector={true}
        />
      </section>

      <SiteFooter t={footerT} />
    </main>
  );
}
