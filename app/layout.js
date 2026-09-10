import "./globals.css";

export const metadata = {
  title: "Kit Relance Impayés Freelance — 19€",
  description:
    "Emails, courrier, checklist et tracker CSV pour freelances. Se faire payer sans se battre. Pack digital immédiat.",
  openGraph: {
    title: "Kit Relance Impayés Freelance",
    description:
      "Pack digital 19€ — emails, courrier, checklist, tracker. Pour freelances qui veulent encaisser.",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
