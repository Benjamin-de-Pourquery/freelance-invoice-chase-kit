import { PAYMENT_LINK } from "@/lib/i18n";
import LangToggle from "@/components/LangToggle";
import SiteFooter from "@/components/SiteFooter";

export default function Landing({ t }) {
  return (
    <main className="wrap">
      <div className="topbar">
        <span className="badge">{t.badge}</span>
        <LangToggle href={t.otherLangHref} label={t.otherLangLabel} />
      </div>

      <h1>
        {t.title}
        <br />
        {t.title2}
      </h1>
      <p className="lead">
        <span className="pain">{t.leadPain}</span> {t.lead}
      </p>
      <p style={{ marginTop: 12 }}>
        <a className="checker-tool-link" href={t.latePaymentToolHref}>
          {t.latePaymentToolLabel} →
        </a>
      </p>
      <p style={{ marginTop: 8 }}>
        <a className="checker-tool-link" href={t.euLatePaymentToolHref}>
          {t.euLatePaymentToolLabel} →
        </a>
      </p>

      <div className="grid grid-2">
        <section className="card">
          <h2>{t.whatTitle}</h2>
          <ul className="list">
            {t.what.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="steps">
            {t.steps.map((s) => (
              <div className="step" key={s.t}>
                <strong>{s.t}</strong>
                {s.d}
              </div>
            ))}
          </div>
        </section>

        <aside className="card sticky-card">
          <h2>{t.offerTitle}</h2>
          <div className="price">
            {t.price} <span>{t.priceSub}</span>
          </div>
          <p className="note">{t.audience}</p>
          <a className="cta" href={PAYMENT_LINK} rel="noopener noreferrer">
            {t.cta}
          </a>
          <p className="note trust-note">{t.trustNote}</p>
          <p className="note">{t.delivery}</p>
        </aside>
      </div>

      <section className="card e-invoicing-section" style={{ marginTop: 18 }}>
        <h2>{t.eInvoicingTitle}</h2>
        <p className="lead" style={{ fontSize: "1rem", margin: "0 0 16px" }}>
          {t.eInvoicingLead}
        </p>
        <div className="e-invoicing-timeline">
          {t.eInvoicingTimeline.map((item) => (
            <div className="step" key={item.t}>
              <strong>{item.t}</strong>
              {item.d}{" "}
              <a
                className="source-link"
                href={item.sourceUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                ({item.sourceLabel})
              </a>
            </div>
          ))}
        </div>
        <ul className="list" style={{ marginTop: 16 }}>
          {t.eInvoicingPackBullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p style={{ marginTop: 16 }}>
          <a className="checker-tool-link" href={t.eInvoicingToolHref}>
            {t.eInvoicingToolLabel} →
          </a>
        </p>
        <p className="note e-invoicing-disclaimer">{t.eInvoicingDisclaimer}</p>
        <h3 className="e-invoicing-sources-heading">{t.eInvoicingSourcesTitle}</h3>
        <ul className="source-list">
          {t.eInvoicingSources.map((s) => (
            <li key={s.url}>
              <a href={s.url} rel="noopener noreferrer" target="_blank">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="card" style={{ marginTop: 18 }}>
        <h2>{t.whyTitle}</h2>
        <p className="lead" style={{ fontSize: "1rem", margin: 0 }}>
          {t.why}
        </p>
      </section>

      <section className="card" style={{ marginTop: 18 }}>
        <h2>{t.faqTitle}</h2>
        <div className="faq">
          {t.faq.map((item) => (
            <details key={item.q} className="faq-item">
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <div className="mobile-cta">
        <a className="cta" href={PAYMENT_LINK} rel="noopener noreferrer">
          {t.cta}
        </a>
      </div>

      <SiteFooter t={t} />
    </main>
  );
}
