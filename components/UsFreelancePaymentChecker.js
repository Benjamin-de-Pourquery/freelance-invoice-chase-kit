"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import LangToggle from "@/components/LangToggle";
import SiteFooter from "@/components/SiteFooter";
import { PAYMENT_LINK } from "@/lib/i18n";
import {
  buildUsChaseEmailText,
  calculateUsFreelancePayment,
} from "@/lib/us-freelance-payment/calculate";
import { sourcesForResult } from "@/lib/us-freelance-payment/copy";
import { LAST_VERIFIED } from "@/lib/us-freelance-payment/sources";

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

export default function UsFreelancePaymentChecker({ t, kitBrand }) {
  const [jurisdictionId, setJurisdictionId] = useState("ny_state");
  const [contractValue, setContractValue] = useState("1500");
  const [aggregated120, setAggregated120] = useState("0");
  const [aggregatedYear, setAggregatedYear] = useState("0");
  const [sevenDayValue, setSevenDayValue] = useState("0");
  const [contractEnteredDate, setContractEnteredDate] = useState("2025-06-01");
  const [isProfessionalServices, setIsProfessionalServices] = useState(true);
  const [workInCity, setWorkInCity] = useState(true);
  const [governmentClient, setGovernmentClient] = useState(false);
  const [hasWrittenContract, setHasWrittenContract] = useState(true);
  const [paymentTiming, setPaymentTiming] = useState("default");
  const [agreedPaymentDate, setAgreedPaymentDate] = useState("2026-07-01");
  const [completionDate, setCompletionDate] = useState("2026-06-01");
  const [notificationDate, setNotificationDate] = useState("2026-06-01");
  const [calcDate, setCalcDate] = useState(() => todayIso());
  const [copied, setCopied] = useState(false);

  const parsedContract = parseFloat(contractValue.replace(",", ".")) || 0;
  const parsedAgg120 = parseFloat(aggregated120.replace(",", ".")) || 0;
  const parsedAggYear = parseFloat(aggregatedYear.replace(",", ".")) || 0;
  const parsedSeven = parseFloat(sevenDayValue.replace(",", ".")) || 0;

  const input = useMemo(
    () => ({
      jurisdictionId,
      contractValue: parsedContract,
      aggregatedValue120Days: parsedAgg120,
      aggregatedValueCalendarYear: parsedAggYear,
      contractValue7DayWindow: parsedSeven,
      contractEnteredDate,
      isProfessionalServices,
      workPerformedInCity: workInCity,
      governmentClient,
      hasWrittenContract,
      hasAgreedPaymentDate: paymentTiming === "agreed",
      agreedPaymentDate: paymentTiming === "agreed" ? agreedPaymentDate : "",
      completionDate,
      notificationDate,
      calcDate,
    }),
    [
      jurisdictionId,
      parsedContract,
      parsedAgg120,
      parsedAggYear,
      parsedSeven,
      contractEnteredDate,
      isProfessionalServices,
      workInCity,
      governmentClient,
      hasWrittenContract,
      paymentTiming,
      agreedPaymentDate,
      completionDate,
      notificationDate,
      calcDate,
    ]
  );

  const result = useMemo(() => calculateUsFreelancePayment(input), [input]);

  const chaseText = useMemo(
    () =>
      buildUsChaseEmailText(result, {
        contractValue: parsedContract,
        calcDate,
      }),
    [result, parsedContract, calcDate]
  );

  const resultSources = useMemo(
    () => sourcesForResult(result, t.lang),
    [result, t.lang]
  );

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

  const showYearAgg =
    jurisdictionId === "minneapolis" ||
    jurisdictionId === "seattle" ||
    jurisdictionId === "los_angeles";
  const showSevenDay = jurisdictionId === "minneapolis";
  const showCaFields =
    jurisdictionId === "ca_state" || jurisdictionId === "los_angeles";
  const showCityWork =
    jurisdictionId === "los_angeles" || jurisdictionId === "minneapolis";

  const lawLabel =
    result.status === "covered"
      ? t.lang === "fr"
        ? result.lawNameFr
        : result.lawNameEn
      : null;

  const remedies =
    result.status === "covered"
      ? t.lang === "fr"
        ? result.remediesFr
        : result.remediesEn
      : [];

  const complaint =
    result.status === "covered"
      ? t.lang === "fr"
        ? result.complaintFr
        : result.complaintEn
      : null;

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
      <p className="note">
        {t.lastVerifiedLabel}: {LAST_VERIFIED}
      </p>

      <div className="checker-grid">
        <section className="card" aria-labelledby="us-inputs">
          <h2 id="us-inputs">{t.sectionInputs}</h2>

          <label className="checker-field-label" htmlFor="us-jurisdiction">
            {t.jurisdictionLabel}
          </label>
          <select
            id="us-jurisdiction"
            className="checker-date"
            value={jurisdictionId}
            onChange={(e) => setJurisdictionId(e.target.value)}
          >
            {t.jurisdictions.map((j) => (
              <option key={j.id} value={j.id}>
                {j.label}
              </option>
            ))}
          </select>

          <label className="checker-field-label" htmlFor="us-contract-value">
            {t.contractValueLabel}
          </label>
          <input
            id="us-contract-value"
            className="checker-date"
            type="text"
            inputMode="decimal"
            value={contractValue}
            onChange={(e) => setContractValue(e.target.value)}
          />

          <label className="checker-field-label" htmlFor="us-agg-120">
            {t.aggregated120Label}
          </label>
          <input
            id="us-agg-120"
            className="checker-date"
            type="text"
            inputMode="decimal"
            value={aggregated120}
            onChange={(e) => setAggregated120(e.target.value)}
          />
          <p className="note" style={{ marginTop: 6 }}>{t.aggregated120Hint}</p>

          {showYearAgg && (
            <>
              <label className="checker-field-label" htmlFor="us-agg-year">
                {t.aggregatedYearLabel}
              </label>
              <input
                id="us-agg-year"
                className="checker-date"
                type="text"
                inputMode="decimal"
                value={aggregatedYear}
                onChange={(e) => setAggregatedYear(e.target.value)}
              />
              <p className="note" style={{ marginTop: 6 }}>
                {t.aggregatedYearHint}
              </p>
            </>
          )}

          {showSevenDay && (
            <>
              <label className="checker-field-label" htmlFor="us-seven">
                {t.sevenDayLabel}
              </label>
              <input
                id="us-seven"
                className="checker-date"
                type="text"
                inputMode="decimal"
                value={sevenDayValue}
                onChange={(e) => setSevenDayValue(e.target.value)}
              />
              <p className="note" style={{ marginTop: 6 }}>{t.sevenDayHint}</p>
            </>
          )}

          <label className="checker-field-label" htmlFor="us-contract-date">
            {t.contractDateLabel}
          </label>
          <input
            id="us-contract-date"
            className="checker-date"
            type="date"
            value={contractEnteredDate}
            onChange={(e) => setContractEnteredDate(e.target.value)}
          />

          {showCaFields && (
            <label className="checker-option-row" style={{ marginTop: 12 }}>
              <input
                type="checkbox"
                checked={isProfessionalServices}
                onChange={(e) => setIsProfessionalServices(e.target.checked)}
              />
              <span>
                {t.professionalServicesLabel}
                <span className="note" style={{ display: "block" }}>
                  {t.professionalServicesHint}
                </span>
              </span>
            </label>
          )}

          {showCityWork && (
            <label className="checker-option-row" style={{ marginTop: 8 }}>
              <input
                type="checkbox"
                checked={workInCity}
                onChange={(e) => setWorkInCity(e.target.checked)}
              />
              {t.workInCityLabel}
            </label>
          )}

          <label className="checker-option-row" style={{ marginTop: 8 }}>
            <input
              type="checkbox"
              checked={governmentClient}
              onChange={(e) => setGovernmentClient(e.target.checked)}
            />
            {t.governmentClientLabel}
          </label>

          <label className="checker-option-row" style={{ marginTop: 8 }}>
            <input
              type="checkbox"
              checked={hasWrittenContract}
              onChange={(e) => setHasWrittenContract(e.target.checked)}
            />
            {t.writtenContractLabel}
          </label>

          <p className="checker-field-label" style={{ marginTop: 16 }}>
            {t.paymentTimingLabel}
          </p>
          <div className="checker-card-row">
            <OptionCard
              id="us-timing-agreed"
              selected={paymentTiming === "agreed"}
              onSelect={() => setPaymentTiming("agreed")}
            >
              {t.paymentTimingAgreed}
            </OptionCard>
            <OptionCard
              id="us-timing-default"
              selected={paymentTiming === "default"}
              onSelect={() => setPaymentTiming("default")}
            >
              {t.paymentTimingDefault}
            </OptionCard>
          </div>

          {paymentTiming === "agreed" ? (
            <>
              <label className="checker-field-label" htmlFor="us-agreed-date">
                {t.agreedDateLabel}
              </label>
              <input
                id="us-agreed-date"
                className="checker-date"
                type="date"
                value={agreedPaymentDate}
                onChange={(e) => setAgreedPaymentDate(e.target.value)}
              />
            </>
          ) : (
            <>
              <label className="checker-field-label" htmlFor="us-completion">
                {t.completionDateLabel}
              </label>
              <input
                id="us-completion"
                className="checker-date"
                type="date"
                value={completionDate}
                onChange={(e) => setCompletionDate(e.target.value)}
              />
              {jurisdictionId === "minneapolis" && (
                <>
                  <label
                    className="checker-field-label"
                    htmlFor="us-notification"
                  >
                    {t.notificationDateLabel}
                  </label>
                  <input
                    id="us-notification"
                    className="checker-date"
                    type="date"
                    value={notificationDate}
                    onChange={(e) => setNotificationDate(e.target.value)}
                  />
                  <p className="note" style={{ marginTop: 6 }}>
                    {t.notificationDateHint}
                  </p>
                </>
              )}
            </>
          )}

          <label className="checker-field-label" htmlFor="us-calc-date">
            {t.calcDateLabel}
          </label>
          <input
            id="us-calc-date"
            className="checker-date"
            type="date"
            value={calcDate}
            onChange={(e) => setCalcDate(e.target.value)}
          />
        </section>

        <section className="card" aria-labelledby="us-results">
          <h2 id="us-results">{t.sectionResults}</h2>

          {result.status === "general_contract_law" ? (
            <div className="checker-timeline-note" style={{ marginTop: 0 }}>
              <p className="checker-result-label">
                <strong>{t.generalLawTitle}</strong>
              </p>
              <p className="checker-result-hint">
                {t.lang === "fr" ? result.messageFr : result.messageEn}
              </p>
              <p className="checker-result-hint">{t.generalLawBody}</p>
            </div>
          ) : (
            <>
              <dl className="penalty-result-dl">
                <div>
                  <dt>{t.lawLabel}</dt>
                  <dd>{lawLabel}</dd>
                </div>
                <div>
                  <dt>{t.paymentDueLabel}</dt>
                  <dd>
                    <span className="mono">{result.paymentDueDate}</span>
                    <p className="checker-result-hint" style={{ marginTop: 6 }}>
                      {t.lang === "fr"
                        ? result.paymentDueDetailFr
                        : result.paymentDueDetailEn}
                    </p>
                  </dd>
                </div>
                <div>
                  <dt>{t.daysLateLabel}</dt>
                  <dd>{result.daysLate}</dd>
                </div>
                {!result.isLate && (
                  <div>
                    <dt>{t.notLateTitle}</dt>
                    <dd className="checker-result-hint">{t.notLateBody}</dd>
                  </div>
                )}
                <div>
                  <dt>{t.writtenContractResultLabel}</dt>
                  <dd>
                    {result.writtenContractRequired
                      ? hasWrittenContract
                        ? t.writtenContractRequired
                        : t.writtenContractMissing
                      : "N/A"}
                  </dd>
                </div>
              </dl>

              {result.warnings?.includes("missing_written_contract") && (
                <p className="note" style={{ color: "var(--warn)" }}>
                  {t.warningMissingContract}
                </p>
              )}
              {result.warnings?.includes("la_superseded_by_ca_fwpa") && (
                <p className="note" style={{ color: "var(--warn)" }}>
                  {t.warningLaCa}
                </p>
              )}
              {result.precedenceNoteEn && jurisdictionId === "los_angeles" && (
                <p className="note">
                  {t.lang === "fr"
                    ? result.precedenceNoteFr
                    : result.precedenceNoteEn}
                </p>
              )}

              <h3 style={{ marginTop: 18, fontSize: "1rem" }}>
                {t.remediesLabel}
              </h3>
              <ul className="list">
                {remedies.map((r) => (
                  <li key={r.text}>
                    {r.text}{" "}
                    <a
                      className="source-link"
                      href={sourcesForResult(
                        { sources: [r.sourceKey] },
                        t.lang
                      )[0]?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      (source)
                    </a>
                  </li>
                ))}
              </ul>

              {complaint && (
                <>
                  <h3 style={{ marginTop: 18, fontSize: "1rem" }}>
                    {t.complaintLabel}
                  </h3>
                  <p className="checker-result-hint">
                    <a
                      href={complaint.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {complaint.channel}
                    </a>
                  </p>
                </>
              )}
            </>
          )}
        </section>
      </div>

      {result.status === "covered" && chaseText && (
        <section className="card" style={{ marginTop: 18 }}>
          <div className="checker-results-header">
            <h2 style={{ margin: 0 }}>{t.chaseTitle}</h2>
            <button type="button" className="checker-btn-secondary" onClick={onCopy}>
              {copied ? t.copiedBtn : t.copyBtn}
            </button>
          </div>
          <pre className="penalty-chase-pre">{chaseText}</pre>
        </section>
      )}

      <section className="card checker-timeline-note" style={{ marginTop: 18 }}>
        <h2>{t.sourcesTitle}</h2>
        <ul className="source-list">
          {(resultSources.length ? resultSources : sourcesForResult(
            { sources: Object.keys(t.sourceLabels) },
            t.lang
          )).map((s) => (
            <li key={s.url}>
              <a href={s.url} target="_blank" rel="noopener noreferrer">
                {s.label}
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
        <a className="cta cta-inline" href={PAYMENT_LINK} rel="noopener noreferrer">
          {t.kitCtaBtn}
        </a>
      </section>

      <SiteFooter t={footerT} />
    </main>
  );
}
