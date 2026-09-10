"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const LABELS = {
  fr: {
    loading: "Confirmation de ton paiement en cours…",
    badgePending: "Confirmation de paiement",
    missingSecretTitle: "Téléchargement temporairement indisponible",
    missingSecret:
      "Nous ne pouvons pas débloquer ton pack pour le moment. Réessaie dans quelques minutes. Si le problème persiste, contacte le support via GitHub.",
    noSession:
      "Nous n'avons pas trouvé ta commande. Reviens depuis la page de confirmation après paiement, ou consulte l'e-mail de reçu Stripe.",
    invalid: "Paiement non confirmé ou lien expiré. Si tu as bien payé, vérifie ton e-mail de confirmation ou contacte le support.",
    unlocked: "Paiement confirmé",
    files: "Télécharge ton pack",
    back: "← Retour à la landing",
    tip: "Astuce : importe le CSV dans Notion, Google Sheets ou Excel. Trie par âge (jours) décroissant.",
    titleOk: "Merci — ton kit est prêt.",
    titlePending: "Confirmation de paiement",
  },
  en: {
    loading: "Confirming your payment…",
    badgePending: "Payment confirmation",
    missingSecretTitle: "Downloads temporarily unavailable",
    missingSecret:
      "We can't unlock your pack right now. Please try again in a few minutes. If the issue persists, contact support via GitHub.",
    noSession:
      "We couldn't find your order. Return from the checkout confirmation page, or check your Stripe receipt email.",
    invalid: "Payment not confirmed or link expired. If you paid successfully, check your confirmation email or contact support.",
    unlocked: "Payment confirmed",
    files: "Download your pack",
    back: "← Back to landing",
    tip: "Tip: import the CSV into Notion, Google Sheets or Excel. Sort by age (days) descending.",
    titleOk: "Thank you — your kit is ready.",
    titlePending: "Payment confirmation",
  },
};

export default function SuccessClient({ lang = "fr" }) {
  const t = LABELS[lang] || LABELS.fr;
  const params = useSearchParams();
  const sessionId = params.get("session_id");
  const [state, setState] = useState({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    async function run() {
      if (!sessionId) {
        if (!cancelled) setState({ status: "no_session" });
        return;
      }
      try {
        const res = await fetch(`/api/verify-session?session_id=${encodeURIComponent(sessionId)}`);
        const data = await res.json();
        if (cancelled) return;
        if (data.reason === "missing_secret") {
          setState({ status: "missing_secret" });
          return;
        }
        if (!data.ok) {
          setState({ status: "invalid", reason: data.reason });
          return;
        }
        setState({ status: "ok", files: data.files || [] });
      } catch {
        if (!cancelled) setState({ status: "invalid", reason: "network" });
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  const homeHref = lang === "en" ? "/en" : "/";
  const isOk = state.status === "ok";

  const body = useMemo(() => {
    if (state.status === "loading") {
      return <p className="lead">{t.loading}</p>;
    }
    if (state.status === "missing_secret") {
      return (
        <section className="card warn-card">
          <h2>{t.missingSecretTitle}</h2>
          <p className="lead" style={{ fontSize: "1rem" }}>
            {t.missingSecret}
          </p>
        </section>
      );
    }
    if (state.status === "no_session") {
      return (
        <section className="card">
          <p className="lead" style={{ fontSize: "1rem" }}>
            {t.noSession}
          </p>
        </section>
      );
    }
    if (state.status !== "ok") {
      return (
        <section className="card">
          <p className="lead" style={{ fontSize: "1rem" }}>
            {t.invalid}
          </p>
        </section>
      );
    }
    return (
      <section className="card">
        <h2>{t.files}</h2>
        <ul className="list download-list">
          {(state.files || []).map((f) => (
            <li key={f.key}>
              <a
                href={`/api/download?file=${encodeURIComponent(f.key)}&session_id=${encodeURIComponent(sessionId)}`}
              >
                {f.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="note">{t.tip}</p>
      </section>
    );
  }, [state, t, sessionId]);

  return (
    <main className="wrap">
      <span className="badge">
        {isOk ? "✓ " : ""}
        {isOk ? t.unlocked : t.badgePending}
      </span>
      <h1>{isOk ? t.titleOk : t.titlePending}</h1>
      {body}
      <Link className="cta cta-inline" href={homeHref} style={{ marginTop: 20 }}>
        {t.back}
      </Link>
    </main>
  );
}
