import Link from "next/link";
import LangToggle from "@/components/LangToggle";

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
          Digital product by <strong>Nazruden</strong>. Contact:{" "}
          <a href="https://github.com/Nazruden" rel="noopener noreferrer">github.com/Nazruden</a>.
        </p>
        <h2>Product</h2>
        <p>
          Digital pack of templates (emails, formal letter, checklist, CSV tracker). Instant access
          after verified Stripe payment. No physical shipping.
        </p>
        <h2>Price</h2>
        <p>€19 one-time. This demo deployment uses Stripe <strong>TEST</strong> mode only.</p>
        <h2>Disclaimer</h2>
        <p>
          This pack is <strong>not legal, tax or accounting advice</strong>. Templates are practical
          tools you must adapt. For disputes, consult a qualified professional.
        </p>
        <h2>Liability</h2>
        <p>No recovery-rate guarantee. Use of templates is at the buyer’s sole responsibility.</p>
        <h2>Hosting</h2>
        <p>Vercel Inc. — Next.js application hosting.</p>
      </section>
    </main>
  );
}
