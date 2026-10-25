import Link from "next/link";
import LangToggle from "@/components/LangToggle";
import {
  publisherName,
  publisherEmail,
  hostingProviderLines,
  tradeName,
  publisherAddress,
  publisherPhone,
  publisherPhoneIntl,
  publisherSiren,
  publicationDirector,
} from "@/lib/legal/siteIdentity";

export const metadata = {
  title: "Terms — Freelancer Overdue Invoice Kit",
  description: "Terms, conditions and disclaimer.",
};

export default function TermsEnPage() {
  return (
    <main className="wrap prose">
      <div className="topbar">
        <Link href="/en">← Home</Link>
        <LangToggle href="/mentions" label="FR" />
      </div>
      <h1>Terms &amp; conditions</h1>
      <section className="card">
        <h2>Publisher</h2>
        <p>
          <strong>{publisherName}</strong> (trade name {tradeName}), French sole trader
          (entrepreneur individuel, micro-entreprise).
          <br />Address: {publisherAddress}
          <br />Phone: <a href="tel:+33643548200">{publisherPhoneIntl}</a>
          <br />Email: <a href={`mailto:${publisherEmail}`}>{publisherEmail}</a>
          <br />SIREN: {publisherSiren}
          <br />VAT not applicable, art. 293 B of the French General Tax Code (CGI).
          <br />Publication director: {publicationDirector}
        </p>
        <h2>Product</h2>
        <p>
          Digital pack of templates (emails, formal letter, checklist, CSV tracker). Instant access
          after verified Stripe payment. No physical shipping.
        </p>
        <h2>Price</h2>
        <p>
          €19 incl. VAT where applicable (EUR), $21 (USD) or £17 (GBP), one-time payment via Stripe
          (card checkout), in the currency you select on the purchase page.
        </p>
        <h2>Disclaimer</h2>
        <p>
          This pack is <strong>not legal, tax or accounting advice</strong>. Templates are practical
          tools you must adapt. For disputes, consult a qualified professional.
        </p>
        <h2>Liability</h2>
        <p>No recovery-rate guarantee. Use of templates is at the buyer’s sole responsibility.</p>
        <h2>Hosting</h2>
        <p>
          Hosting provider: {hostingProviderLines.en}. Next.js application hosting.
        </p>
      </section>
    </main>
  );
}
