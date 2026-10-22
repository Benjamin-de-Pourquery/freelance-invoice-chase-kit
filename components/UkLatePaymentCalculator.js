"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import LangToggle from "@/components/LangToggle";
import SiteFooter from "@/components/SiteFooter";
import PackCheckoutButton from "@/components/PackCheckoutButton";
import {
  buildUkChaseEmailText,
  calculateUkLatePayment,
  dueDateFromInvoiceReceipt,
} from "@/lib/uk-late-payment/calculate";
import { formatUkRateDetail } from "@/lib/uk-late-payment/copy";

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

export default function UkLatePaymentCalculator({ t, kitBrand }) {
  const [amountGbp, setAmountGbp] = useState("1000");
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

  const parsedAmount = parseFloat(amountGbp.replace(",", ".")) || 0;
  const contractualParsed =
    contractualRate.trim() === ""
      ? null
      : parseFloat(contractualRate.replace(",", "."));

  const result = useMemo(
    () =>
      calculateUkLatePayment({
        amountGbp: parsedAmount,
        dueDate: effectiveDueDate,
        calcDate,
        contractualRatePercent: contractualParsed,
        debtorType,
      }),
    [parsedAmount, effectiveDueDate, calcDate, contractualParsed, debtorType]
  );

  const chaseText = useMemo(
    () =>
      buildUkChaseEmailText(result, {
        dueDate: effectiveDueDate,
        calcDate,
        debtorType,
        lang: t.lang,
      }),
    [result, effectiveDueDate, calcDate, debtorType, t.lang]
  );

  const rateDetail = formatUkRateDetail(result, t);

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

      <p className="note" style={{ marginTop: 0 }}>{t.periodNote}</p>
      <p className="note">{t.billNote}</p>
      <p className="note">{t.rulesNote}</p>
      <p className="note">{t.contractualNote}</p>

      <div className="checker-grid">
        <section className="card" aria-labelledby="uk-penalty-inputs">
          <h2 id="uk-penalty-inputs">{t.sectionInputs}</h2>

          <label className="checker-field-label" htmlFor="amount-gbp">
            {t.amountLabel}
          </label>
          <input
            id="amount-gbp"
            className="checker-date checker-input-wide"
            type="number"
            min="0"
            step="0.01"
            inputMode="decimal"
            value={amountGbp}
            onChange={(e) => setAmountGbp(e.target.value)}
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
                id={`uk-due-mode-${key}`}
                selected={dueMode === key}
                onSelect={() => setDueMode(key)}
              >
                {label}
              </OptionCard>
            ))}
          </div>

          {dueMode === "agreed" ? (
            <>
              <label className="checker-field-label" htmlFor="uk-due-date">
                {t.dueDateLabel}
              </label>
              <input
                id="uk-due-date"
                className="checker-date"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </>
          ) : (
            <>
              <label className="checker-field-label" htmlFor="uk-invoice-receipt">
                {t.invoiceReceiptLabel}
              </label>
              <input
                id="uk-invoice-receipt"
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

          <label className="checker-field-label" htmlFor="uk-calc-date">
            {t.calcDateLabel}
          </label>
          <input
            id="uk-calc-date"
            className="checker-date"
            type="date"
            value={calcDate}
            onChange={(e) => setCalcDate(e.target.value)}
          />
          <p className="note" style={{ marginTop: 6 }}>{t.calcDateHint}</p>

          <label className="checker-field-label" htmlFor="uk-contractual-rate">
            {t.contractualRateLabel}
          </label>
          <input
            id="uk-contractual-rate"
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
                id={`uk-debtor-${key}`}
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
          {debtorType === "public_authority" && (
            <p className="note" style={{ color: "var(--warn)" }}>{t.publicAuthorityNote}</p>
          )}
        </section>

        <section className="card" aria-labelledby="uk-penalty-results">
          <h2 id="uk-penalty-results">{t.sectionResults}</h2>

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
          ) : null}

          {result.needsManualRate && !result.consumerNotApplicable && (
            <p className="note" style={{ color: "var(--warn)" }}>
              {t.warningManualRate}
            </p>
          )}

          <dl className="penalty-result-dl">
            <div>
              <dt>{t.daysLateLabel}</dt>
              <dd>{result.daysLate}</dd>
            </div>
            {result.interestStartDate && result.daysLate > 0 && (
              <div>
                <dt>{t.interestStartLabel}</dt>
                <dd className="mono">{result.interestStartDate}</dd>
              </div>
            )}
            {result.rateReason === "statutory" && result.referenceDate && (
              <>
                <div>
                  <dt>{t.referenceLabel}</dt>
                  <dd>
                    <span className="mono">{result.referenceDate}</span>
                    {rateDetail && (
                      <p className="checker-result-hint" style={{ marginTop: 6 }}>
                        {rateDetail}
                      </p>
                    )}
                  </dd>
                </div>
                <div>
                  <dt>{t.bankRateLabel}</dt>
                  <dd className="mono">
                    {result.bankRatePercent != null
                      ? `${result.bankRatePercent.toFixed(2)}%`
                      : "n/a"}
                  </dd>
                </div>
              </>
            )}
            {result.annualRatePercent != null && !result.consumerNotApplicable && (
              <div>
                <dt>{t.rateLabel}</dt>
                <dd>
                  <span className="mono">{result.annualRatePercent.toFixed(2)}%</span>
                  {result.rateReason === "contractual" && rateDetail && (
                    <p className="checker-result-hint" style={{ marginTop: 6 }}>
                      {rateDetail}
                    </p>
                  )}
                </dd>
              </div>
            )}
            {result.formula &&
              result.annualRatePercent != null &&
              !result.consumerNotApplicable && (
                <div>
                  <dt>{t.formulaLabel}</dt>
                  <dd className="mono" style={{ fontSize: "0.85rem" }}>
                    {parsedAmount.toFixed(2)} × ({result.annualRatePercent.toFixed(2)} / 100) × (
                    {result.interestDays} / 365) = £{result.interestGbp.toFixed(2)}
                  </dd>
                </div>
              )}
            {!result.consumerNotApplicable && result.daysLate > 0 && (
              <>
                <div>
                  <dt>{t.dailyInterestLabel}</dt>
                  <dd className="mono">
                    {result.dailyInterestGbp > 0
                      ? `£${result.dailyInterestGbp.toFixed(2)}`
                      : "£0.00"}
                  </dd>
                </div>
                <div>
                  <dt>{t.interestLabel}</dt>
                  <dd className="mono">£{result.interestGbp.toFixed(2)}</dd>
                </div>
                <div>
                  <dt>{t.compensationLabel}</dt>
                  <dd className="mono">
                    {result.compensationGbp > 0
                      ? `£${result.compensationGbp.toFixed(2)}`
                      : "n/a"}
                  </dd>
                  {result.compensationGbp > 0 && (
                    <p className="checker-result-hint" style={{ marginTop: 6 }}>
                      {t.compensationHint}
                    </p>
                  )}
                </div>
                <div className="penalty-total-row">
                  <dt>{t.totalLabel}</dt>
                  <dd className="mono">£{result.totalGbp.toFixed(2)}</dd>
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
          <a className="checker-tool-link" href={t.euToolLink}>
            {t.euToolLabel} →
          </a>
        </p>
        <p className="note e-invoicing-disclaimer" style={{ marginTop: 14 }}>
          {t.disclaimer}
        </p>
      </section>

      <section className="card checker-cta" style={{ marginTop: 18 }}>
        <h2>{t.kitCtaTitle}</h2>
        <p className="note" style={{ marginTop: 0 }}>{t.kitCtaBody}</p>
        <PackCheckoutButton
          lang={t.lang === "en" ? "en" : "fr"}
          preferGbp={true}
          ctaLabel={t.kitCtaBtn}
          className="cta cta-inline"
          compactSelector={true}
        />
      </section>

      <SiteFooter t={footerT} />
    </main>
  );
}
