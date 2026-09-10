import Link from "next/link";
import LangToggle from "@/components/LangToggle";

export const metadata = {
  title: "Privacy — Freelancer Overdue Invoice Kit",
  description: "Privacy policy.",
};

export default function PrivacyEnPage() {
  return (
    <main className="wrap prose">
      <div className="topbar">
        <Link href="/en">← Home</Link>
        <LangToggle href="/confidentialite" label="FR" />
      </div>
      <h1>Privacy policy</h1>
      <section className="card">
        <h2>Data collected</h2>
        <p>
          No user accounts. Payments are handled by <strong>Stripe</strong> (Payment Link / Checkout).
          Card data never hits our servers.
        </p>
        <h2>Payment confirmation</h2>
        <p>
          After payment, a secure confirmation page verifies your purchase server-side before unlocking
          pack downloads. Card data is processed entirely by Stripe.
        </p>
        <h2>Cookies &amp; analytics</h2>
        <p>
          No ad cookies in the current version. The host (Vercel) may keep technical logs (IP,
          user-agent) for security and operations.
        </p>
        <h2>Retention</h2>
        <p>
          This site does not store an application database. Payment records remain with Stripe under
          their policy.
        </p>
        <h2>Your rights</h2>
        <p>
          For payment-data requests, contact Stripe and/or the publisher via GitHub. Access,
          rectification and erasure rights may apply under GDPR.
        </p>
      </section>
    </main>
  );
}
