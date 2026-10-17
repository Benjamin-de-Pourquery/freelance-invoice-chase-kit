"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import LangToggle from "@/components/LangToggle";
import SiteFooter from "@/components/SiteFooter";
import { PAYMENT_LINK } from "@/lib/i18n";
import {
  buildEuChaseEmailText,
  calculateEuLatePayment,
  dueDateFromInvoiceReceipt,
} from "@/lib/eu-late-payment/calculate";
import { EU_COUNTRY_RATES } from "@/lib/eu-late-payment/rates";
import {
  formatEuBreakdownLine,
  formatEuRateDetail,
} from "@/lib/eu-late-payment/copy";

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

export default function EuLatePaymentCalculator({ t, kitBrand }) {
  const [countryKey, setCountryKey] = useState("france");
  const [amountTtc, setAmountTtc] = useState("1000");
  const [dueMode, setDueMode] = useState("agreed");
  const [dueDate, setDueDate] = useState("2026-08-01");
  const [invoiceReceiptDate, setInvoiceReceiptDate] = useState("2026-06-15");
  const [calcDate, setCalcDate] = useState(() => todayIso());
  const [contractualRate, setContractualRate] = useState("");
  const [debtorType, setDebtorType] = useState("business");
  const [copied, setCopied] = useState(false);

  const effectiveDueDate = useMemo(() => {
    if (dueMode === "receipt_plus_30") {
      return dueDateFromInvoiceReceipt(invoiceReceiptDate);
    }
    return dueDate;
  }, [dueMode, dueDate, invoiceReceiptDate]);

  const parsedAmount = parseFloat(amountTtc.replace(",", ".")) || 0;
  const contractualParsed =
    contractualRate.trim() === ""
      ? null
      : parseFloat(contractualRate.replace(",", "."));

  const countryLabel =
    t.lang === "fr"
      ? EU_COUNTRY_RATES[countryKey]?.labelFr
      : EU_COUNTRY_RATES[countryKey]?.labelEn;

  const result = useMemo(
    () =>
      calculateEuLatePayment({
        amountTtc: parsedAmount,
        dueDate: effectiveDueDate,
        calcDate,
        contractualRatePercent: contractualParsed,
        debtorType,
        countryKey,
      }),
    [
      parsedAmount,
      effectiveDueDate,
      calcDate,
      contractualParsed,
      debtorType,
      countryKey,
    ]
  );

  const chaseText = useMemo(
    () =>
      buildEuChaseEmailText(result, {
        dueDate: effectiveDueDate,
        calcDate,
        debtorType,
        countryLabel: countryLabel || countryKey,
        lang: t.lang,
      }),
    [result, effectiveDueDate, calcDate, debtorType, countryLabel, countryKey, t.lang]
  );

  const rateDetail = formatEuRateDetail(result, t);

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

  const showBreakdown =
    result.interestBreakdown.length > 1 ||
    result.interestBreakdown.some(
      (row) => row.rateReason === "excluded_outside_period"
    );

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

      <p className="note" style={{ marginTop: 0 }}>{t.periodNote}</p>
      <p className="note">{t.crossBorderNote}</p>
      <p className="note">{t.rulesNote}</p>

      <div className="checker-grid">
        <section className="card" aria-labelledby="eu-penalty-inputs">
          <h2 id="eu-penalty-inputs">{t.sectionInputs}</h2>

          <label className="checker-field-label" htmlFor="country-key">
            {t.countryLabel}
          </label>
          <select
            id="country-key"
            className="checker-date checker-input-wide"
            value={countryKey}
            onChange={(e) => setCountryKey(e.target.value)}
          >
            {t.countryOptions.map((opt) => (
              <option key={opt.key} value={opt.key}>
                {opt.label}
              </option>
            ))}
          </select>

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

          <p className="checker-field-label">{t.dueModeLabel}</p>
          <div
            className="checker-card-grid checker-card-grid--1"
            role="group"
            aria-label={t.dueModeLabel}
          >
            {Object.entries(t.dueModes).map(([key, label]) => (
              <OptionCard
                key={key}
                id={`due-mode-${key}`}
                selected={dueMode === key}
                onSelect={() => setDueMode(key)}
              >
                {label}
              </OptionCard>
            ))}
          </div>

          {dueMode === "agreed" ? (
            <>
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
            </>
          ) : (
            <>
              <label className="checker-field-label" htmlFor="invoice-receipt">
                {t.invoiceReceiptLabel}
              </label>
              <input
                id="invoice-receipt"
                className="checker-date"
                type="date"
                value={invoiceReceiptDate}
                onChange={(e) => setInvoiceReceiptDate(e.target.value)}
              />
              <p className="note" style={{ marginTop: 6 }}>{t.invoiceReceiptHint}</p>
              <p className="checker-field-label">{t.effectiveDueLabel}</p>
              <p className="mono" style={{ margin: "4px 0 0" }}>{effectiveDueDate}</p>
            </>
          )}

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
            placeholder="10.00"
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
                id={`eu-debtor-${key}`}
                selected={debtorType === key}
                onSelect={() => setDebtorType(key)}
              >
                {label}
              </OptionCard>
            ))}
          </div>

          {debtorType === "consumer" && (
            <p className="note" style={{ color: "var(--warn)" }}>{t.consumerHint}</p>
          )}
        </section>

        <section className="card" aria-labelledby="eu-penalty-results">
          <h2 id="eu-penalty-results">{t.sectionResults}</h2>

          {result.daysLate === 0 ? (
            <div
              className="checker-timeline-note"
              style={{ marginTop: 0, padding: 0, border: "none", background: "transparent" }}
            >
              <p className="checker-result-label" style={{ marginTop: 0 }}>
                <strong>{t.noPenaltiesTitle}</strong>
              </p>
              <p className="checker-result-hint">{t.noPenaltiesBody}</p>
            </div>
          ) : result.consumerNotApplicable ? (
            <p className="checker-result-hint">
              {t.rateReasons.consumer_not_applicable}
            </p>
          ) : result.needsPolandContractualRate ? (
            <p className="checker-result-hint">
              {t.rateReasons.poland_needs_contractual_rate}
            </p>
          ) : null}

          {result.needsPolandContractualRate && !result.consumerNotApplicable && (
            <p className="note" style={{ color: "var(--warn)" }}>
              {t.polandBusinessHint}
            </p>
          )}

          {result.needsOutsidePeriodRate &&
            !result.consumerNotApplicable &&
            !result.needsPolandContractualRate && (
            <p className="note" style={{ color: "var(--warn)" }}>
              {t.warningOutsidePeriod}
            </p>
          )}

          <dl className="penalty-result-dl">
            <div>
              <dt>{t.daysLateLabel}</dt>
              <dd>{result.daysLate}</dd>
            </div>
            {!result.consumerNotApplicable && result.daysLate > 0 && (
              <div>
                <dt>{t.interestDaysLabel}</dt>
                <dd>{result.interestDays}</dd>
              </div>
            )}
            {result.excludedDaysOutsidePeriod > 0 && (
              <div>
                <dt>{t.excludedDaysLabel}</dt>
                <dd>{result.excludedDaysOutsidePeriod}</dd>
              </div>
            )}
            {result.annualRatePercent != null && !result.consumerNotApplicable && (
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
            {showBreakdown && result.interestBreakdown.length > 0 && (
              <div>
                <dt>{t.breakdownTitle}</dt>
                <dd>
                  <ul className="source-list" style={{ margin: 0 }}>
                    {result.interestBreakdown.map((row) => (
                      <li
                        key={`${row.startDate}-${row.endDate}-${row.rateReason}`}
                        className="mono"
                        style={{ fontSize: "0.85rem" }}
                      >
                        {formatEuBreakdownLine(row, t.lang)}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            )}
            {result.formula &&
              result.annualRatePercent != null &&
              !showBreakdown &&
              !result.consumerNotApplicable && (
                <div>
                  <dt>{t.formulaLabel}</dt>
                  <dd className="mono" style={{ fontSize: "0.85rem" }}>
                    {parsedAmount.toFixed(2)} × ({result.annualRatePercent.toFixed(2)} / 100) × (
                    {result.interestDays} / 365) = {result.interestEur.toFixed(2)} €
                  </dd>
                </div>
              )}
            {!result.consumerNotApplicable && (
              <>
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
                  {result.recoveryIndemnityEur > 0 && (
                    <p className="checker-result-hint" style={{ marginTop: 6 }}>
                      {t.recoveryHint}
                    </p>
                  )}
                </div>
                <div className="penalty-total-row">
                  <dt>{t.totalLabel}</dt>
                  <dd className="mono">{result.totalPenaltiesEur.toFixed(2)} €</dd>
                </div>
              </>
            )}
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
        <p className="note" style={{ marginTop: 12 }}>
          <a className="checker-tool-link" href={t.franceToolLink}>
            {t.franceToolLabel} →
          </a>
        </p>
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
