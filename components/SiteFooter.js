import Link from "next/link";

export default function SiteFooter({ t }) {
  return (
    <footer>
      <p className="disclaimer">{t.disclaimer}</p>
      <p>
        <Link href={t.footerLinks.terms}>{t.footerLinks.termsLabel}</Link>
        {" · "}
        <Link href={t.footerLinks.privacy}>{t.footerLinks.privacyLabel}</Link>
        {" · "}
        Kit Relance Impayés · Stripe TEST · Nazruden
      </p>
    </footer>
  );
}
