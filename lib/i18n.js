export const PAYMENT_LINK =
  process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK ||
  "https://buy.stripe.com/test_dRm9ATeixbYLdQZeZi0oM00";

export const copy = {
  fr: {
    lang: "fr",
    htmlLang: "fr",
    otherLangHref: "/en",
    otherLangLabel: "EN",
    badge: "Pack digital · Freelances FR/EN · Accès immédiat",
    title: "Tes clients te paient en retard.",
    title2: "Voici le kit pour relancer sans te cramer.",
    leadPain: "Factures à +30 jours, relances gênantes, cashflow en dents de scie.",
    lead:
      "Le Kit Relance Impayés Freelance te donne les emails, courriers, checklist et tracker prêts à envoyer — pour encaisser plus vite, sans improvisation.",
    whatTitle: "Ce que tu reçois (immédiatement)",
    what: [
      "15+ templates emails de relance (J+7 → mise en demeure soft)",
      "Courrier type mise en demeure (FR)",
      "Checklist avant envoi : preuves, échéances, mentions légales",
      "Scripts WhatsApp / SMS (3 niveaux d'intensité)",
      "Tracker CSV des impayés (montant, âge, prochaine action)",
      "Guide d'usage en 1 page — tu ouvres, tu copies, tu envoies",
    ],
    steps: [
      { t: "1. Paie", d: "Stripe TEST · 19 €" },
      { t: "2. Télécharge", d: "Pack débloqué sur /succes" },
      { t: "3. Relance", d: "Copie → envoi → encaissement" },
    ],
    offerTitle: "Offre lancement",
    price: "19 €",
    priceSub: "TTC · paiement unique",
    audience: "Audience : freelances solo & micro-entreprises qui facturent en B2B.",
    cta: "Acheter le kit — 19 €",
    testNote: "Mode Stripe TEST uniquement (zéro dépense réelle). Carte test :",
    delivery: "Livraison digitale sur /succes après paiement vérifié (session Stripe).",
    whyTitle: "Pourquoi ce kit",
    why:
      "Les micro-produits digitaux ultra-nichés (templates, checklists) convertissent mieux que les formations à 2000 €. Les freelances veulent un résultat en 10 minutes. Ce kit résout une douleur cash immédiate.",
    faqTitle: "FAQ",
    faq: [
      {
        q: "Comment je reçois le pack ?",
        a: "Après paiement Stripe, tu es redirigé vers /succes?session_id=… Le site vérifie la session Checkout puis débloque les téléchargements.",
      },
      {
        q: "Les fichiers sont-ils publics ?",
        a: "Non. Ils ne sont pas servis sous /public. Seule une session Checkout payée (vérifiée avec STRIPE_SECRET_KEY) permet le download via l'API.",
      },
      {
        q: "C'est du conseil juridique ?",
        a: "Non. Templates & outils pratiques uniquement. Pour un contentieux, consulte un professionnel.",
      },
      {
        q: "Puis-je tester sans payer ?",
        a: "Oui en mode TEST Stripe : carte 4242 4242 4242 4242, date future, CVC quelconque.",
      },
    ],
    disclaimer:
      "Disclaimer : ce pack n'est pas un conseil juridique, fiscal ou comptable. Adapte les textes à ta situation et à tes CGV.",
    footerLinks: { terms: "/mentions", privacy: "/confidentialite", termsLabel: "Mentions / CGV", privacyLabel: "Confidentialité" },
    metaTitle: "Kit Relance Impayés Freelance — 19€",
    metaDesc:
      "Emails, courrier, checklist et tracker CSV pour freelances. Se faire payer sans se battre. Pack digital immédiat.",
  },
  en: {
    lang: "en",
    htmlLang: "en",
    otherLangHref: "/",
    otherLangLabel: "FR",
    badge: "Digital pack · Freelancers · Instant access",
    title: "Clients pay you late.",
    title2: "Here’s the kit to chase invoices without burning bridges.",
    leadPain: "30+ day invoices, awkward follow-ups, uneven cashflow.",
    lead:
      "The Freelancer Overdue Invoice Kit gives you ready-to-send emails, formal letters, a checklist and CSV tracker — so you get paid faster.",
    whatTitle: "What you get (instantly)",
    what: [
      "15+ payment-reminder email templates (day +7 → soft formal notice)",
      "Formal demand letter template",
      "Pre-send checklist: proof, due dates, legal mentions",
      "WhatsApp / SMS scripts (3 intensity levels)",
      "Overdue invoices CSV tracker",
      "One-page usage guide — open, copy, send",
    ],
    steps: [
      { t: "1. Pay", d: "Stripe TEST · €19" },
      { t: "2. Download", d: "Pack unlocked on /succes" },
      { t: "3. Chase", d: "Copy → send → get paid" },
    ],
    offerTitle: "Launch offer",
    price: "€19",
    priceSub: "incl. tax · one-time",
    audience: "For solo freelancers & micro-businesses invoicing B2B.",
    cta: "Buy the kit — €19",
    testNote: "Stripe TEST mode only (no real charge). Test card:",
    delivery: "Digital delivery on /succes after verified Stripe payment.",
    whyTitle: "Why this kit",
    why:
      "Niche digital micro-products (templates, checklists) convert better than €2000 courses. Freelancers want a result in 10 minutes. This kit fixes an immediate cash pain.",
    faqTitle: "FAQ",
    faq: [
      {
        q: "How do I get the pack?",
        a: "After Stripe payment you’re redirected to /succes?session_id=… We verify the Checkout session, then unlock downloads.",
      },
      {
        q: "Are files publicly downloadable?",
        a: "No. They’re not under /public. Only a paid Checkout session (verified with STRIPE_SECRET_KEY) unlocks /api/download.",
      },
      {
        q: "Is this legal advice?",
        a: "No. Practical templates only. For disputes, consult a professional.",
      },
      {
        q: "Can I test without paying?",
        a: "Yes in Stripe TEST: card 4242 4242 4242 4242, future expiry, any CVC.",
      },
    ],
    disclaimer:
      "Disclaimer: this pack is not legal, tax or accounting advice. Adapt the text to your situation and terms.",
    footerLinks: { terms: "/en/terms", privacy: "/en/privacy", termsLabel: "Terms", privacyLabel: "Privacy" },
    metaTitle: "Freelancer Overdue Invoice Kit — €19",
    metaDesc:
      "Emails, formal letter, checklist and CSV tracker for freelancers. Get paid without the awkwardness. Instant digital pack.",
  },
};
