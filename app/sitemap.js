const BASE = "https://freelance-invoice-chase-kit.vercel.app";

export default function sitemap() {
  const routes = [
    "",
    "/en",
    "/outil-verification-facture",
    "/en/invoice-checker",
    "/outil-penalites-retard",
    "/en/late-payment-calculator",
    "/outil-interets-retard-ue",
    "/en/eu-late-payment-calculator",
    "/outil-loi-paiement-freelance-us",
    "/en/us-freelance-payment-checker",
    "/outil-interets-retard-uk",
    "/en/uk-late-payment-calculator",
    "/mentions",
    "/confidentialite",
    "/en/terms",
    "/en/privacy",
  ];

  return routes.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "" || path === "/en" ? 1 : 0.8,
  }));
}
