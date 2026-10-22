import Link from "next/link";
import LangToggle from "@/components/LangToggle";

export const metadata = {
  title: "Mentions légales & CGV — Kit Relance Impayés",
  description: "Mentions légales, CGV et disclaimer du Kit Relance Impayés Freelance.",
};

export default function MentionsPage() {
  return (
    <main className="wrap prose">
      <div className="topbar">
        <Link href="/">← Accueil</Link>
        <LangToggle href="/en/terms" label="EN" />
      </div>
      <h1>Mentions légales &amp; conditions</h1>
      <section className="card">
        <h2>Éditeur</h2>
        <p>
          Produit digital proposé par <strong>Glint</strong>. Contact :{" "}
          <a href="mailto:glintapps@proton.me">glintapps@proton.me</a>.
        </p>
        <h2>Nature du produit</h2>
        <p>
          Pack numérique de modèles (emails, courrier, checklist, tracker CSV). Accès immédiat après
          paiement Stripe vérifié. Aucun envoi postal / physique.
        </p>
        <h2>Prix</h2>
        <p>
          Paiement unique via Stripe (carte bancaire). Le montant affiché sur la page d&apos;achat
          s&apos;applique dans la devise choisie : euro (EUR), dollar US (USD) ou livre sterling
          (GBP).
        </p>
        <h2>Droit de rétractation</h2>
        <p>
          Conformément à l'art. L221-28 du Code de la consommation, le droit de rétractation ne s'applique
          pas aux contenus numériques fournis immédiatement après accord explicite (accès au pack après paiement).
        </p>
        <h2>Disclaimer (important)</h2>
        <p>
          Ce pack <strong>n'est pas un conseil juridique, fiscal ou comptable</strong>. Les modèles sont
          des outils pratiques à adapter. Pour un litige ou une procédure, consulte un avocat ou un
          professionnel habilité.
        </p>
        <h2>Responsabilité</h2>
        <p>
          L'éditeur ne garantit aucun taux de recouvrement. L'usage des modèles relève de la seule
          responsabilité de l'acheteur.
        </p>
        <h2>Hébergement</h2>
        <p>Vercel Inc. : déploiement applicatif Next.js.</p>
      </section>
    </main>
  );
}
