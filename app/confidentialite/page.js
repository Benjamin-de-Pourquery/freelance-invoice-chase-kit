import Link from "next/link";
import LangToggle from "@/components/LangToggle";

export const metadata = {
  title: "Confidentialité — Kit Relance Impayés",
  description: "Politique de confidentialité du Kit Relance Impayés Freelance.",
};

export default function ConfidentialitePage() {
  return (
    <main className="wrap prose">
      <div className="topbar">
        <Link href="/">← Accueil</Link>
        <LangToggle href="/en/privacy" label="EN" />
      </div>
      <h1>Politique de confidentialité</h1>
      <section className="card">
        <h2>Données collectées</h2>
        <p>
          Le site n'implémente pas de compte utilisateur. Le paiement est traité par{" "}
          <strong>Stripe</strong> (Payment Link / Checkout). Les données de carte ne transitent pas
          sur nos serveurs.
        </p>
        <h2>Confirmation de paiement</h2>
        <p>
          Après paiement, une page de confirmation sécurisée vérifie ton achat côté serveur avant
          d'autoriser le téléchargement du pack. Les données de carte sont traitées exclusivement par
          Stripe.
        </p>
        <h2>Cookies &amp; analytics</h2>
        <p>
          Pas de cookies publicitaires déposés par ce site dans sa version actuelle. L'hébergeur
          (Vercel) peut journaliser des logs techniques (IP, user-agent) pour la sécurité et le
          fonctionnement.
        </p>
        <h2>Conservation</h2>
        <p>
          Aucune base de données applicative n'est stockée par ce site. Les preuves de paiement restent
          chez Stripe selon leur politique.
        </p>
        <h2>Vos droits</h2>
        <p>
          Pour toute demande relative à vos données de paiement, contactez Stripe et/ou l'éditeur via
          GitHub. Droit d'accès, rectification, effacement selon le RGPD le cas échéant.
        </p>
      </section>
    </main>
  );
}
