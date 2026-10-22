import "./globals.css";

export const metadata = {
  title: "Kit Relance Impayés Freelance",
  description:
    "Emails, courrier, checklist et tracker CSV pour freelances. Paiement en EUR, USD ou GBP. Pack digital immédiat.",
  openGraph: {
    title: "Kit Relance Impayés Freelance",
    description:
      "Pack digital : emails, courrier, checklist, tracker. Paiement en EUR, USD ou GBP.",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        {children}
        <script defer src="/_vercel/insights/script.js"></script>
      </body>
    </html>
  );
}
