export const PAYMENT_LINK =
  process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK ||
  (process.env.VERCEL_ENV === "production"
    ? "https://buy.stripe.com/aFaaEX3DS7qtgjN0AK4wM00"
    : "https://buy.stripe.com/test_dRm9ATeixbYLdQZeZi0oM00");

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
      "Le Kit Relance Impayés Freelance te donne les emails, courriers, checklist et tracker prêts à envoyer, pour encaisser plus vite, sans improvisation.",
    latePaymentToolLabel: "Outil gratuit : calculateur de pénalités de retard",
    latePaymentToolHref: "/outil-penalites-retard",
    euLatePaymentToolLabel: "Outil gratuit : calculateur intérêts de retard UE",
    euLatePaymentToolHref: "/outil-interets-retard-ue",
    usFreelanceToolLabel: "Outil gratuit : loi US paiement freelance",
    usFreelanceToolHref: "/outil-loi-paiement-freelance-us",
    ukLatePaymentToolLabel: "Outil gratuit : calculateur intérêts de retard UK",
    ukLatePaymentToolHref: "/outil-interets-retard-uk",
    whatTitle: "Ce que tu reçois (immédiatement)",
    what: [
      "15+ templates emails de relance (J+7 → mise en demeure soft)",
      "Courrier type mise en demeure (FR)",
      "Checklist avant envoi : preuves, échéances, mentions légales",
      "Scripts WhatsApp / SMS (3 niveaux d'intensité)",
      "Tracker CSV des impayés (montant, âge, statut plateforme, prochaine action)",
      "Guide d'usage en 1 page : tu ouvres, tu copies, tu envoies",
      "Module Facture électronique 2026 : checklist FR/EN, relances liées aux statuts plateforme",
      "US Edition (EN) : relances, lettre finale, checklist contrats NY/IL/CA et tracker USD",
      "UK Edition (EN) : relances B2B, lettre avant action, tracker GBP et guide intérêts légaux",
    ],
    stepPayTitle: "1. Paie",
    stepPayDesc: "Paiement sécurisé · {price}",
    steps: [
      { t: "2. Télécharge", d: "Accès immédiat à tout le pack" },
      { t: "3. Relance", d: "Copie → envoi → encaissement" },
    ],
    offerTitle: "Offre lancement",
    priceSub: "TTC · paiement unique",
    audience: "Audience : freelances solo & micro-entreprises qui facturent en B2B.",
    ctaBuy: "Acheter le kit : {price}",
    trustNote: "Paiement sécurisé via Stripe · Téléchargement instantané · Paiement unique, sans abonnement",
    delivery: "Livraison digitale instantanée : tous les fichiers sont disponibles dès la confirmation du paiement.",
    eInvoicingTitle: "Facture électronique 2026 (inclus dans le pack)",
    eInvoicingLead:
      "À partir du 1er septembre 2026, toutes les entreprises assujetties à la TVA établies en France, y compris les micro-entrepreneurs en franchise en base, doivent pouvoir recevoir des factures électroniques via une plateforme agréée (émission obligatoire pour elles au 1er septembre 2027). Le kit ajoute une checklist de préparation et des relances adaptées aux statuts visibles sur ta plateforme.",
    eInvoicingTimeline: [
      {
        t: "1er sept. 2026",
        d: "Réception des factures électroniques pour toutes les entreprises assujetties à la TVA en France (franchise en base incluse) ; émission pour les grandes entreprises et ETI.",
        sourceLabel: "economie.gouv.fr",
        sourceUrl:
          "https://www.economie.gouv.fr/tout-savoir-sur-la-facturation-electronique-pour-les-entreprises",
      },
      {
        t: "1er sept. 2027",
        d: "Émission des factures électroniques et e-reporting pour les PME et micro-entreprises.",
        sourceLabel: "economie.gouv.fr",
        sourceUrl:
          "https://www.economie.gouv.fr/tout-savoir-sur-la-facturation-electronique-pour-les-entreprises",
      },
    ],
    eInvoicingPackBullets: [
      "Checklist conformité (FR + EN) avec liens impots.gouv.fr et service-public",
      "4 modèles de relance selon statuts plateforme (obligatoires : déposée, rejetée, refusée, encaissée)",
      "Tracker enrichi : statut_facture_electronique, id_facture_plateforme, plateforme_agreee",
    ],
    eInvoicingToolLabel: "Outil gratuit : vérifier les mentions de ta facture",
    eInvoicingToolHref: "/outil-verification-facture",
    eInvoicingDisclaimer:
      "Information générale uniquement, pas un conseil juridique, fiscal ou comptable. Vérifie les textes officiels et parle à ton expert-comptable si besoin.",
    eInvoicingSourcesTitle: "Sources officielles citées",
    eInvoicingSources: [
      {
        label: "Ministère de l'Économie : calendrier et obligations",
        url: "https://www.economie.gouv.fr/tout-savoir-sur-la-facturation-electronique-pour-les-entreprises",
      },
      {
        label: "impots.gouv.fr : plateformes agréées",
        url: "https://www.impots.gouv.fr/facturation-electronique-et-plateformes-agreees",
      },
      {
        label: "entreprendre.service-public.gouv.fr : actualité réforme",
        url: "https://entreprendre.service-public.gouv.fr/actualites/A18953",
      },
      {
        label: "DGFiP : guide pratique facturation électronique (PDF)",
        url: "https://www.impots.gouv.fr/sites/default/files/media/1_metier/2_professionnel/EV/2_gestion/290_facturation_electronique/guide_pratique_facturation_electronique.pdf",
      },
      {
        label: "Légifrance : ordonnance n° 2021-1190 (généralisation facturation électronique)",
        url: "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000044131176",
      },
    ],
    whyTitle: "Pourquoi ce kit",
    why:
      "Tu ne devrais pas passer une heure à rédiger une relance alors que ton client doit déjà te payer. Ce kit te donne des formulations professionnelles, une progression claire (du rappel amical à la mise en demeure) et un suivi simple, pour protéger la relation tout en faisant avancer l'encaissement.",
    faqTitle: "FAQ",
    faq: [
      {
        q: "Comment je reçois le pack ?",
        a: "Immédiatement après le paiement, tu arrives sur une page de confirmation avec tous les fichiers à télécharger. Garde cet onglet ouvert : tu peux aussi revenir via le reçu ou la confirmation de paiement Stripe.",
      },
      {
        q: "Combien de temps pour accéder au pack ?",
        a: "Accès instantané. Dès que le paiement est validé, l'ensemble des fichiers est disponible au téléchargement.",
      },
      {
        q: "À qui s'adresse ce kit ?",
        a: "Aux freelances solo, consultants et micro-entreprises qui facturent en B2B et veulent relancer leurs impayés avec des messages professionnels, sans perdre de temps.",
      },
      {
        q: "C'est du conseil juridique ?",
        a: "Non. Ce sont des modèles et outils pratiques à adapter à ta situation. Pour un contentieux ou une procédure, consulte un professionnel habilité.",
      },
      {
        q: "Dans quelle devise puis-je payer ?",
        a: "Tu choisis la devise sur la page d'achat : euro (EUR), dollar US (USD) ou livre sterling (GBP). Le montant affiché est celui facturé par Stripe au moment du paiement.",
      },
      {
        q: "Puis-je obtenir un remboursement ?",
        a: "Comme c'est un contenu numérique livré instantanément, les ventes sont définitives sauf erreur technique avérée. En cas de problème d'accès, réponds au reçu de paiement Stripe pour que l'on te renvoie le lien.",
      },
      {
        q: "Le module Facture électronique 2026 remplace mon expert-comptable ?",
        a: "Non. C'est une checklist et des modèles de relance basés sur des sources officielles (economie.gouv.fr, impots.gouv.fr). Pour ta mise en conformité logicielle ou fiscale, consulte un professionnel habilité.",
      },
    ],
    disclaimer:
      "Disclaimer : ce pack n'est pas un conseil juridique, fiscal ou comptable. Adapte les textes à ta situation et à tes CGV.",
    footerLinks: { terms: "/mentions", privacy: "/confidentialite", termsLabel: "Mentions / CGV", privacyLabel: "Confidentialité" },
    footerBrand: "Kit Relance Impayés Freelance",
    metaTitle: "Kit Relance Impayés Freelance",
    metaDesc:
      "Emails, courrier, checklist et tracker CSV pour freelances. Paiement en EUR, USD ou GBP. Pack digital immédiat.",
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
      "The Freelancer Overdue Invoice Kit gives you ready-to-send emails, formal letters, a checklist and CSV tracker, so you get paid faster.",
    latePaymentToolLabel: "Free tool: late payment penalty calculator",
    latePaymentToolHref: "/en/late-payment-calculator",
    euLatePaymentToolLabel: "Free tool: EU late payment interest calculator",
    euLatePaymentToolHref: "/en/eu-late-payment-calculator",
    usFreelanceToolLabel: "Free tool: US freelance payment law checker",
    usFreelanceToolHref: "/en/us-freelance-payment-checker",
    ukLatePaymentToolLabel: "Free tool: UK late payment interest calculator",
    ukLatePaymentToolHref: "/en/uk-late-payment-calculator",
    whatTitle: "What you get (instantly)",
    what: [
      "15+ payment-reminder email templates (day +7 → soft formal notice)",
      "Formal demand letter template",
      "Pre-send checklist: proof, due dates, legal mentions",
      "WhatsApp / SMS scripts (3 intensity levels)",
      "Overdue invoices CSV tracker (platform status columns)",
      "One-page usage guide: open, copy, send",
      "E-invoicing 2026 module: FR/EN checklists and status-based reminder templates",
      "US Edition (English): chase emails, final demand letter, written-contract checklist, USD tracker",
      "UK Edition (English): B2B chase emails, letter before action, GBP tracker, statutory interest guide",
    ],
    usEditionTitle: "US Edition included in this pack",
    usEditionLead:
      "Freelancers billing US clients get English templates in USD, plus a written-contract checklist aligned with official state and city sources (not legal advice).",
    usEditionBullets: [
      "Chase sequence: before due date through final notice, plus short text/Slack scripts and replies to common excuses",
      "Final demand letter with optional freelance-law paragraph and lawful next steps (agency complaint, small claims in general terms)",
      "Written-contract checklist: New York State (GBL Art. 44-A), New York City (Admin. Code Title 20, Ch. 10), Illinois (820 ILCS 193), California (BPC §§ 18100-18107), with thresholds and source links",
      "USD unpaid-invoice CSV tracker and a one-page US usage guide",
    ],
    usEditionDisclaimer:
      "General information only. Laws vary by facts and location. Verify thresholds and requirements on the official government sites linked in the pack.",
    ukEditionTitle: "UK Edition included in this pack",
    ukEditionLead:
      "Freelancers billing UK business clients get English templates in GBP, with optional statutory interest and fixed compensation wording tied to official UK sources (not legal advice).",
    ukEditionBullets: [
      "B2B chase sequence: friendly, firm, and final reminder before a letter before action",
      "Letter before action for England and Wales (Practice Direction on Pre-Action Conduct, Money Claim Online), with notes for Scotland and Northern Ireland",
      "GBP unpaid-invoice CSV tracker with statutory interest and 40/70/100 GBP compensation formulas",
      "One-page UK usage guide (plus a short French intro) citing gov.uk, legislation.gov.uk, and Bank of England sources",
    ],
    ukEditionDisclaimer:
      "General information only. Statutory late payment rights depend on your contract and whether the 1998 Act regime applies. Verify rates and court limits on official sites linked in the pack.",
    stepPayTitle: "1. Pay",
    stepPayDesc: "Secure payment · {price}",
    steps: [
      { t: "2. Download", d: "Instant access to the full pack" },
      { t: "3. Chase", d: "Copy → send → get paid" },
    ],
    offerTitle: "Launch offer",
    priceSub: "incl. tax · one-time",
    audience: "For solo freelancers & micro-businesses invoicing B2B.",
    ctaBuy: "Buy the kit: {price}",
    trustNote: "Secure Stripe checkout · Instant download · One-time payment, no subscription",
    delivery: "Instant digital delivery: all files are available as soon as your payment is confirmed.",
    eInvoicingTitle: "E-invoicing 2026 (included in the pack)",
    eInvoicingLead:
      "From 1 September 2026, all VAT-liable businesses established in France, including micro-entrepreneurs under the VAT franchise, must be able to receive e-invoices through an approved platform (issuing becomes mandatory for them on 1 September 2027). The kit adds a readiness checklist and chase templates aligned with platform invoice statuses.",
    eInvoicingTimeline: [
      {
        t: "1 Sept 2026",
        d: "Receive e-invoices for all VAT-liable businesses in France (including VAT franchise); issue e-invoices for large companies and mid-caps (ETI).",
        sourceLabel: "economie.gouv.fr",
        sourceUrl:
          "https://www.economie.gouv.fr/tout-savoir-sur-la-facturation-electronique-pour-les-entreprises",
      },
      {
        t: "1 Sept 2027",
        d: "Issue e-invoices and e-reporting for SMEs and micro-businesses.",
        sourceLabel: "economie.gouv.fr",
        sourceUrl:
          "https://www.economie.gouv.fr/tout-savoir-sur-la-facturation-electronique-pour-les-entreprises",
      },
    ],
    eInvoicingPackBullets: [
      "Compliance checklists (FR + EN) with links to impots.gouv.fr and service-public",
      "4 reminder templates by platform status (mandatory: deposited, rejected, refused, collected)",
      "Updated tracker: statut_facture_electronique, id_facture_plateforme, plateforme_agreee",
    ],
    eInvoicingToolLabel: "Free tool: check your invoice mentions",
    eInvoicingToolHref: "/en/invoice-checker",
    eInvoicingDisclaimer:
      "General information only, not legal, tax or accounting advice. Check official texts and talk to your accountant if needed.",
    eInvoicingSourcesTitle: "Official sources referenced",
    eInvoicingSources: [
      {
        label: "Ministry of Economy: timeline and obligations",
        url: "https://www.economie.gouv.fr/tout-savoir-sur-la-facturation-electronique-pour-les-entreprises",
      },
      {
        label: "impots.gouv.fr: approved platforms",
        url: "https://www.impots.gouv.fr/facturation-electronique-et-plateformes-agreees",
      },
      {
        label: "entreprendre.service-public.gouv.fr: reform update",
        url: "https://entreprendre.service-public.gouv.fr/actualites/A18953",
      },
      {
        label: "DGFiP: practical e-invoicing guide (PDF)",
        url: "https://www.impots.gouv.fr/sites/default/files/media/1_metier/2_professionnel/EV/2_gestion/290_facturation_electronique/guide_pratique_facturation_electronique.pdf",
      },
      {
        label: "Légifrance: ordinance no. 2021-1190 (e-invoicing generalisation)",
        url: "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000044131176",
      },
    ],
    whyTitle: "Why this kit",
    why:
      "You shouldn’t spend an hour drafting a follow-up when your client already owes you money. This kit gives you professional wording, a clear escalation path (friendly reminder to formal notice), and simple tracking, so you protect the relationship while moving cash forward.",
    faqTitle: "FAQ",
    faq: [
      {
        q: "How do I get the pack?",
        a: "Right after payment, you land on a confirmation page with every file ready to download. Keep that tab open: you can also return via your Stripe receipt or payment confirmation.",
      },
      {
        q: "How fast is delivery?",
        a: "Instant. As soon as payment is confirmed, the full pack is available to download.",
      },
      {
        q: "Who is this kit for?",
        a: "Solo freelancers, consultants and micro-businesses invoicing B2B who want to chase overdue invoices with professional messages, without wasting time.",
      },
      {
        q: "Is this legal advice?",
        a: "No. These are practical templates you adapt to your situation. For disputes or formal proceedings, consult a qualified professional.",
      },
      {
        q: "Which currency can I pay in?",
        a: "Choose your currency on the purchase page: euro (EUR), US dollar (USD), or pound sterling (GBP). The amount shown is what Stripe charges at checkout.",
      },
      {
        q: "Can I get a refund?",
        a: "Because this is digital content delivered instantly, sales are final except in cases of proven technical error. If you have trouble accessing your files, reply to your Stripe payment receipt and we'll resend the link.",
      },
      {
        q: "Does the e-invoicing 2026 module replace my accountant?",
        a: "No. It is a checklist and chase templates based on official sources (economie.gouv.fr, impots.gouv.fr). For software or tax compliance, consult a qualified professional.",
      },
    ],
    disclaimer:
      "Disclaimer: this pack is not legal, tax or accounting advice. Adapt the text to your situation and terms.",
    footerLinks: { terms: "/en/terms", privacy: "/en/privacy", termsLabel: "Terms", privacyLabel: "Privacy" },
    footerBrand: "Freelancer Overdue Invoice Kit",
    metaTitle: "Freelancer Overdue Invoice Kit",
    metaDesc:
      "Emails, formal letter, checklist and CSV tracker for freelancers. Pay in EUR, USD, or GBP. Instant digital pack.",
  },
};
