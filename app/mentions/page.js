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
          Produit digital proposé par <strong>Nazruden</strong> (personne physique / micro-entreprise).
          Contact via le profil GitHub :{" "}
          <a href="https://github.com/Nazruden" rel="noopener noreferrer">github.com/Nazruden</a>.
        </p>
        <h2>Nature du produit</h2>
        <p>
          Pack numérique de modèles (emails, courrier, checklist, tracker CSV). Accès immédiat après
          paiement Stripe vérifié. Aucun envoi postal / physique.
        </p>
        <h2>Prix</h2>
        <p>19 € TTC — paiement unique. Environnement Stripe <strong>TEST</strong> sur ce déploiement de démo.</p>
        <h2>Droit de rétractation</h2>
        <p>
          Conformément à l'art. L221-28 du Code de la consommation, le droit de rétractation ne s'applique
          pas aux contenus numériques fournis immédiatement après accord explicite (accès au pack sur /succes).
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
        <p>Vercel Inc. — déploiement applicatif Next.js.</p>
      </section>
    </main>
  );
}
