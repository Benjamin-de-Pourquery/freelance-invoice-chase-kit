import Link from "next/link";
import LangToggle from "@/components/LangToggle";
import SiteFooter from "@/components/SiteFooter";
import { guideCopy } from "@/lib/commercial-debt-recovery/copy";
import { copy } from "@/lib/i18n";

const t = guideCopy.en;
const BASE = "https://freelance-invoice-chase-kit.vercel.app";

export const metadata = {
  title: t.metaTitle,
  description: t.metaDesc,
  alternates: {
    canonical: `${BASE}${t.canonicalPath}`,
    languages: {
      fr: "/guide-recouvrement-creances-commerciales-incontestees",
      en: t.canonicalPath,
    },
  },
};

export default function CommercialDebtRecoveryGuideEnPage() {
  const footerT = {
    disclaimer: t.legalDisclaimer,
    footerLinks: copy.en.footerLinks,
    footerBrand: copy.en.footerBrand,
  };

  return (
    <main className="wrap">
      <div className="topbar">
        <Link href={t.homeHref} className="checker-back">
          ← {copy.en.footerBrand}
        </Link>
        <LangToggle href={t.otherLangHref} label={t.otherLangLabel} />
      </div>
      <span className="badge">{t.badge}</span>
      <h1>{t.title}</h1>
      <p className="lead">{t.lead}</p>
      {t.scopeParagraphs?.map((paragraph) => (
        <p key={paragraph.slice(0, 48)}>{paragraph}</p>
      ))}
      <p className="note">{t.legalDisclaimer}</p>
      <p style={{ marginTop: 16 }}>
        <Link className="checker-tool-link" href={t.frGuideHref}>
          {t.frGuideLinkLabel} →
        </Link>
      </p>
      <SiteFooter t={footerT} />
    </main>
  );
}
