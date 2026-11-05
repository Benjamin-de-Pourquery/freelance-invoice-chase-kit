"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import LangToggle from "@/components/LangToggle";
import SiteFooter from "@/components/SiteFooter";
import PackCheckoutButton from "@/components/PackCheckoutButton";
import { evaluateCommercialDebtSelfCheck } from "@/lib/commercial-debt-recovery/evaluate";
import { getSourceByKey } from "@/lib/commercial-debt-recovery/copy";

function TriChoice({ name, value, onChange, labels }) {
  return (
    <div className="checker-pills" role="radiogroup" aria-label={name}>
      {(["yes", "no", "unsure"]).map((key) => (
        <button
          key={key}
          type="button"
          className={`checker-pill${value === key ? " checker-pill--on" : ""}`}
          aria-pressed={value === key}
          onClick={() => onChange(key)}
        >
          {labels[key]}
        </button>
      ))}
    </div>
  );
}

function BoolToggle({ id, checked, onChange, label }) {
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

export default function CommercialDebtRecoveryGuide({ t, kitBrand }) {
  const [creditorIsCommercant, setCreditorIsCommercant] = useState("unsure");
  const [debtorIsCommercant, setDebtorIsCommercant] = useState("unsure");
  const [invoicedBetweenCommercant, setInvoicedBetweenCommercant] = useState(true);
  const [dueDatePassed, setDueDatePassed] = useState(true);
  const [debtCertainLiquidExigible, setDebtCertainLiquidExigible] = useState("unsure");
  const [debtorContests, setDebtorContests] = useState(false);
  const [checklist, setChecklist] = useState(() =>
    Object.fromEntries(t.checklistItems.map((_, i) => [`item-${i}`, false]))
  );

  const selfCheck = useMemo(
    () =>
      evaluateCommercialDebtSelfCheck({
        creditorIsCommercant,
        debtorIsCommercant,
        invoicedBetweenCommercant,
        dueDatePassed,
        debtCertainLiquidExigible,
        debtorContests,
      }),
    [
      creditorIsCommercant,
      debtorIsCommercant,
      invoicedBetweenCommercant,
      dueDatePassed,
      debtCertainLiquidExigible,
      debtorContests,
    ]
  );

  const outcomeCopy = t.selfCheckOutcomes[selfCheck.outcome];

  const notInForceSource = getSourceByKey(t.notInForceSourceKey);

  const footerT = {
    disclaimer: t.legalDisclaimer,
    footerLinks:
      t.lang === "fr"
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
      <p className="note">{t.legalDisclaimer}</p>

      <section
        className="card guide-not-in-force"
        aria-labelledby="not-in-force-title"
      >
        <h2 id="not-in-force-title">{t.notInForceTitle}</h2>
        <p className="note" style={{ marginTop: 0 }}>
          {t.notInForceBody}{" "}
          {notInForceSource ? (
            <a href={notInForceSource.url} target="_blank" rel="noopener noreferrer">
              ({t.sourceLinkLabel})
            </a>
          ) : null}
        </p>
      </section>

      <section className="card" aria-labelledby="context-title">
        <h2 id="context-title">{t.contextTitle}</h2>
        {t.contextParagraphs.map((p) => (
          <p key={p.slice(0, 40)} className="note" style={{ marginTop: 0 }}>
            {p}
          </p>
        ))}
      </section>

      <section className="card" aria-labelledby="who-title">
        <h2 id="who-title">{t.whoTitle}</h2>
        {t.whoParagraphs.map((p) => (
          <p key={p.slice(0, 40)} className="note" style={{ marginTop: 0 }}>
            {p}
          </p>
        ))}
      </section>

      <section className="card" aria-labelledby="how-title">
        <h2 id="how-title">{t.howTitle}</h2>
        <ol className="list guide-steps">
          {t.howSteps.map((step) => {
            const src = step.sourceKey ? getSourceByKey(step.sourceKey) : null;
            return (
              <li key={step.title}>
                <strong>{step.title}</strong>
                <p className="note" style={{ margin: "8px 0 0" }}>
                  {step.body}{" "}
                  {src ? (
                    <a href={src.url} target="_blank" rel="noopener noreferrer">
                      ({t.sourceLinkLabel})
                    </a>
                  ) : null}
                </p>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="card" aria-labelledby="if-not-title">
        <h2 id="if-not-title">{t.ifNotTitle}</h2>
        <p className="note" style={{ marginTop: 0 }}>
          {t.ifNotBody}
        </p>
      </section>

      <section className="card" aria-labelledby="self-check-title">
        <h2 id="self-check-title">{t.selfCheckTitle}</h2>
        <p className="note">{t.selfCheckIntro}</p>

        <p className="checker-field-label">{t.selfCheckFields.creditorIsCommercant}</p>
        <TriChoice
          name={t.selfCheckFields.creditorIsCommercant}
          value={creditorIsCommercant}
          onChange={setCreditorIsCommercant}
          labels={t.selfCheckOptions}
        />

        <p className="checker-field-label">{t.selfCheckFields.debtorIsCommercant}</p>
        <TriChoice
          name={t.selfCheckFields.debtorIsCommercant}
          value={debtorIsCommercant}
          onChange={setDebtorIsCommercant}
          labels={t.selfCheckOptions}
        />

        <p className="checker-field-label">{t.selfCheckFields.debtCertainLiquidExigible}</p>
        <TriChoice
          name={t.selfCheckFields.debtCertainLiquidExigible}
          value={debtCertainLiquidExigible}
          onChange={setDebtCertainLiquidExigible}
          labels={t.selfCheckOptions}
        />

        <BoolToggle
          id="invoiced-between"
          label={t.selfCheckFields.invoicedBetweenCommercant}
          checked={invoicedBetweenCommercant}
          onChange={setInvoicedBetweenCommercant}
        />
        <BoolToggle
          id="due-passed"
          label={t.selfCheckFields.dueDatePassed}
          checked={dueDatePassed}
          onChange={setDueDatePassed}
        />
        <BoolToggle
          id="debtor-contests"
          label={t.selfCheckFields.debtorContests}
          checked={debtorContests}
          onChange={setDebtorContests}
        />

        <div
          className={`guide-self-check-result guide-self-check-result--${selfCheck.outcome}`}
          aria-live="polite"
        >
          <h3 className="checker-subheading">{t.selfCheckResultTitle}</h3>
          <p>
            <strong>{outcomeCopy.title}</strong>
          </p>
          <p className="note" style={{ marginTop: 8 }}>
            {outcomeCopy.body}
          </p>
          <p className="note e-invoicing-disclaimer" style={{ marginTop: 12 }}>
            {t.selfCheckDisclaimer}
          </p>
        </div>
      </section>

      <section className="card" aria-labelledby="checklist-title">
        <h2 id="checklist-title">{t.checklistTitle}</h2>
        <p className="note">{t.checklistIntro}</p>
        <div className="checker-mentions">
          {t.checklistItems.map((label, index) => {
            const id = `checklist-item-${index}`;
            return (
              <label className="checker-mention" htmlFor={id} key={id}>
                <input
                  id={id}
                  type="checkbox"
                  checked={!!checklist[`item-${index}`]}
                  onChange={(e) =>
                    setChecklist((prev) => ({
                      ...prev,
                      [`item-${index}`]: e.target.checked,
                    }))
                  }
                />
                <span className="checker-mention-box" aria-hidden="true" />
                <span>{label}</span>
              </label>
            );
          })}
        </div>
      </section>

      <section className="card" aria-labelledby="tools-title">
        <h2 id="tools-title">{t.toolsTitle}</h2>
        <ul className="list">
          {t.tools.map((tool) => (
            <li key={tool.href}>
              <Link href={tool.href}>{tool.label}</Link>
            </li>
          ))}
        </ul>
      </section>

      <aside className="card checker-cta">
        <h2>{t.ctaTitle}</h2>
        <p className="note" style={{ marginTop: 0 }}>
          {t.ctaBody}
        </p>
        <PackCheckoutButton
          lang={t.lang === "en" ? "en" : "fr"}
          ctaLabel={t.ctaButton}
          className="cta cta-inline"
          compactSelector={true}
        />
      </aside>

      <section className="card" aria-labelledby="sources-title">
        <h2 id="sources-title">{t.sourcesTitle}</h2>
        <ul className="source-list">
          {t.sources.map((s) => (
            <li key={s.url}>
              <a href={s.url} target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <SiteFooter t={footerT} />
    </main>
  );
}
