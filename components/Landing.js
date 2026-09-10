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
          <p className="note">
            {t.testNote} <span className="mono">4242 4242 4242 4242</span>
          </p>
          <p className="note">{t.delivery}</p>
        </aside>
      </div>

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
