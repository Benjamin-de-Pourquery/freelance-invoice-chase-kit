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
          <strong>{publisherName}</strong> (nom commercial {tradeName}), entrepreneur individuel
          (micro-entreprise).
          <br />Adresse : {publisherAddress}
          <br />Téléphone : <a href="tel:+33643548200">{publisherPhone}</a>
          <br />E-mail : <a href={`mailto:${publisherEmail}`}>{publisherEmail}</a>
          <br />SIREN : {publisherSiren}
          <br />TVA non applicable, art. 293 B du CGI.
          <br />Directeur de la publication : {publicationDirector}
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
        <p>
          Hébergeur : {hostingProviderLines.fr}. Déploiement applicatif Next.js.
        </p>
      </section>
    </main>
  );
}
