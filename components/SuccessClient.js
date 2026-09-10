"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const LABELS = {
  fr: {
    loading: "Vérification du paiement Stripe…",
    missingSecretTitle: "Configuration requise",
    missingSecret:
      "STRIPE_SECRET_KEY n'est pas configurée sur Vercel. Colle ta clé sk_test_… dans les variables d'environnement du projet, puis redéploie. Les fichiers du pack ne sont pas exposés publiquement.",
    noSession: "Aucun session_id dans l'URL. Reviens via le Payment Link Stripe après paiement.",
    invalid: "Session invalide ou paiement non confirmé.",
    unlocked: "Paiement vérifié — télécharge ton pack.",
    files: "Fichiers inclus",
    back: "← Retour à la landing",
    tip: "Astuce : importe le CSV dans Notion, Google Sheets ou Excel. Trie par âge (jours) décroissant.",
  },
  en: {
    loading: "Verifying Stripe payment…",
    missingSecretTitle: "Configuration required",
    missingSecret:
      "STRIPE_SECRET_KEY is not set on Vercel. Paste your sk_test_… key in the project env vars, then redeploy. Pack files are not publicly exposed.",
    noSession: "No session_id in the URL. Come back via the Stripe Payment Link after checkout.",
    invalid: "Invalid session or payment not confirmed.",
    unlocked: "Payment verified — download your pack.",
    files: "Included files",
    back: "← Back to landing",
    tip: "Tip: import the CSV into Notion, Google Sheets or Excel. Sort by age (days) descending.",
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
          <p className="note mono">Vercel → Project → Settings → Environment Variables → STRIPE_SECRET_KEY = sk_test_…</p>
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
                <strong>{f.label}</strong>
              </a>{" "}
              <span className="mono">({f.key})</span>
            </li>
          ))}
        </ul>
        <p className="note">{t.tip}</p>
      </section>
    );
  }, [state, t, sessionId]);

  return (
    <main className="wrap">
      <span className="badge">{state.status === "ok" ? "✓ " : ""}{t.unlocked}</span>
      <h1>{state.status === "ok" ? (lang === "en" ? "Thank you — your kit is ready." : "Merci — ton kit est prêt.") : lang === "en" ? "Payment confirmation" : "Confirmation de paiement"}</h1>
      {body}
      <Link className="cta cta-inline" href={homeHref} style={{ marginTop: 20 }}>
        {t.back}
      </Link>
    </main>
  );
}
