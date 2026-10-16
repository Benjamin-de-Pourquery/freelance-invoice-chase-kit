export const checkerCopy = {
  fr: {
    htmlLang: "fr",
    otherLangHref: "/en/invoice-checker",
    otherLangLabel: "EN",
    homeHref: "/",
    badge: "Outil gratuit · 100 % local · FR / EN",
    title: "Vérifier les mentions obligatoires de ta facture",
    lead:
      "Coche ce qui figure déjà sur ta facture. L'outil indique ce qui manque, ce qui ne s'applique pas encore à ta taille d'entreprise, ou ce qui n'est pas requis dans ta situation. Aucune donnée n'est envoyée: tout reste dans ton navigateur.",
    exhaustiveListNote:
      "Liste non exhaustive : certaines mentions dépendent de ta situation (EI, forme juridique, autoliquidation, garantie légale pour un particulier...). Voir la fiche service-public F31808.",
    timelineNoteTitle: "Calendrier des 4 nouvelles mentions (réforme 2026)",
    timelineNoteBody:
      "Service Public Entreprendre indique le 1er septembre 2026 pour les grandes entreprises et les ETI, et le 1er septembre 2027 pour les PME et micro-entreprises. La loi de finances pour 2024 (art. 91) fixe ce calendrier, et l'art. 242 nonies A de l'annexe II du CGI liste les mentions. La fiche service-public F31808 reprend le même calendrier. Certaines FAQ DGFiP utilisent une formulation du type « à compter du 1er septembre 2026 » sans détailler le décalage PME/micro: nous suivons ici le calendrier service-public, cité dans les sources de chaque règle.",
    timelineSources: [
      {
        label: "service-public (A15683)",
        url: "https://entreprendre.service-public.gouv.fr/actualites/A15683",
      },
      {
        label: "service-public (F31808)",
        url: "https://entreprendre.service-public.gouv.fr/vosdroits/F31808",
      },
      {
        label: "Légifrance art. 242 nonies A",
        url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000050811276",
      },
    ],
    sectionContext: "Ta situation",
    sectionMentions: "Mentions sur la facture",
    sectionResults: "Résultat",
    companySizeLabel: "Taille de ton entreprise (émettrice)",
    companySizes: {
      micro: "Micro-entreprise",
      sme: "PME",
      eti: "ETI",
      large: "Grande entreprise",
    },
    vatRegimeLabel: "Régime de TVA",
    vatRegimes: {
      standard: "Assujetti TVA (débits ou encaissements)",
      franchise: "Franchise en base (art. 293 B CGI)",
    },
    clientTypeLabel: "Type de client",
    clientTypes: {
      french_b2b: "Entreprise assujettie établie en France",
      consumer: "Particulier (B2C)",
      foreign: "Client étranger ou hors champ B2B domestique",
    },
    invoiceDateLabel: "Date d'émission de la facture",
    operationKindLabel: "Nature de l'opération facturée",
    operationKinds: {
      goods: "Livraison de biens uniquement",
      services: "Prestation de services uniquement",
      both: "Biens et services",
    },
    deliveryDiffersLabel:
      "Adresse de livraison des biens différente de l'adresse de facturation du client",
    vatDebitsOptedLabel:
      "Tu as opté pour le paiement de la TVA d'après les débits",
    runCheck: "Mettre à jour le résultat",
    copySummary: "Copier le résumé",
    printSummary: "Imprimer",
    copied: "Résumé copié",
    ctaTitle: "Aller plus loin avec le kit",
    ctaBody:
      "Le Kit Relance Impayés Freelance inclut checklists facture électronique 2026, modèles de relance et tracker CSV. Paiement unique, téléchargement immédiat.",
    ctaButton: "Voir l'offre du kit",
    disclaimer:
      "Cet outil est une aide informative basée sur les sources officielles citées. Il ne remplace pas un conseil juridique, fiscal ou comptable.",
    ruleLabels: {
      parties_identity_address:
        "Nom et adresse de l'émetteur et du client, numéro SIREN de l'émetteur",
      invoice_issue_date: "Date d'émission de la facture",
      sale_or_service_date:
        "Date de la vente ou de la prestation de services",
      sequential_invoice_number:
        "Numéro unique, chronologique et continu",
      line_items_detail:
        "Quantité, désignation, prix unitaire HT et taux de TVA (ou exonération) par ligne",
      seller_individual_id:
        "Numéro individuel d'identification de l'émetteur (art. 286 ter CGI)",
      vat_amounts_by_rate:
        "Montant de TVA et totaux HT/TVA par taux",
      vat_franchise_mention:
        "Mention « TVA non applicable, art. 293 B du code général des impôts »",
      payment_due_date: "Date d'échéance de paiement",
      late_payment_penalties:
        "Taux des pénalités de retard (jour suivant l'échéance)",
      recovery_indemnity_40:
        "Montant de l'indemnité forfaitaire de recouvrement (40 €)",
      early_payment_discount_terms:
        "Conditions d'escompte pour paiement anticipé (ou « Escompte pour paiement anticipé : néant »)",
      client_siren_b2b: "Numéro SIREN du client professionnel (France)",
      operation_category:
        "Catégorie de l'opération: biens, services ou les deux",
      delivery_address_if_different:
        "Adresse de livraison des biens si différente de l'adresse du client",
      vat_debits_option_mention:
        "Mention « Option pour le paiement de la taxe d'après les débits »",
    },
    statusLabels: {
      present: "Présent",
      missing: "Manquant",
      not_required: "Non requis dans ton cas",
      not_yet_required: "Pas encore obligatoire (calendrier)",
    },
    statusHint: {
      missing:
        "Cette mention semble obligatoire pour ta situation et ta date.",
      not_yet_required:
        "Obligation prévue plus tard pour les PME et micro-entreprises (voir calendrier).",
      not_required:
        "Non applicable selon le régime de TVA, le type de client ou le type d'opération.",
    },
    metaTitle: "Outil de vérification des mentions de facture (France)",
    metaDesc:
      "Vérifiez gratuitement les mentions obligatoires sur une facture française, y compris la réforme facture électronique 2026. 100 % local, FR/EN.",
  },
  en: {
    htmlLang: "en",
    otherLangHref: "/outil-verification-facture",
    otherLangLabel: "FR",
    homeHref: "/en",
    badge: "Free tool · 100% local · FR / EN",
    title: "Check mandatory mentions on your invoice",
    lead:
      "Tick what already appears on your invoice. The tool shows what is missing, not yet required for your company size, or not applicable. No data is sent: everything stays in your browser.",
    exhaustiveListNote:
      "Not an exhaustive list: some mentions depend on your situation (sole trader, legal form, reverse charge, consumer warranty...). See service-public sheet F31808.",
    timelineNoteTitle: "Timeline for the 4 new mentions (2026 reform)",
    timelineNoteBody:
      'Service Public Entreprendre states 1 September 2026 for large companies and mid-caps (ETI), and 1 September 2027 for SMEs and micro-businesses. The 2024 Finance Act (art. 91) sets this timeline, and CGI annex II art. 242 nonies A lists the mentions. The service-public sheet F31808 states the same timeline. Some DGFiP FAQ wording uses "as of 1 September 2026" without the SME/micro delay: this tool follows the service-public calendar, cited on each rule.',
    timelineSources: [
      {
        label: "service-public (A15683)",
        url: "https://entreprendre.service-public.gouv.fr/actualites/A15683",
      },
      {
        label: "service-public (F31808)",
        url: "https://entreprendre.service-public.gouv.fr/vosdroits/F31808",
      },
      {
        label: "Légifrance art. 242 nonies A",
        url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000050811276",
      },
    ],
    sectionContext: "Your situation",
    sectionMentions: "Mentions on the invoice",
    sectionResults: "Result",
    companySizeLabel: "Your company size (issuer)",
    companySizes: {
      micro: "Micro-business",
      sme: "SME",
      eti: "Mid-cap (ETI)",
      large: "Large company",
    },
    vatRegimeLabel: "VAT regime",
    vatRegimes: {
      standard: "VAT registered (debits or receipts)",
      franchise: "VAT franchise (CGI art. 293 B)",
    },
    clientTypeLabel: "Client type",
    clientTypes: {
      french_b2b: "VAT-liable business established in France",
      consumer: "Consumer (B2C)",
      foreign: "Foreign client or outside domestic B2B scope",
    },
    invoiceDateLabel: "Invoice issue date",
    operationKindLabel: "Type of operation invoiced",
    operationKinds: {
      goods: "Goods only",
      services: "Services only",
      both: "Goods and services",
    },
    deliveryDiffersLabel:
      "Goods delivery address differs from the client's billing address",
    vatDebitsOptedLabel: "You opted to pay VAT on debits",
    runCheck: "Refresh result",
    copySummary: "Copy summary",
    printSummary: "Print",
    copied: "Summary copied",
    ctaTitle: "Go further with the kit",
    ctaBody:
      "The Freelancer Overdue Invoice Kit includes 2026 e-invoicing checklists, chase templates and a CSV tracker. One-time payment, instant download.",
    ctaButton: "See the kit offer",
    disclaimer:
      "This tool is an informational aid based on the cited official sources. It is not legal, tax or accounting advice.",
    ruleLabels: {
      parties_identity_address:
        "Name and address of seller and client, seller SIREN number",
      invoice_issue_date: "Invoice issue date",
      sale_or_service_date: "Date of sale or service",
      sequential_invoice_number: "Unique sequential invoice number",
      line_items_detail:
        "Quantity, description, unit price excl. VAT and VAT rate (or exemption) per line",
      seller_individual_id:
        "Seller individual identification number (CGI art. 286 ter)",
      vat_amounts_by_rate: "VAT amount and excl./incl. totals per rate",
      vat_franchise_mention:
        'Wording "TVA non applicable, art. 293 B du code général des impôts"',
      payment_due_date: "Payment due date",
      late_payment_penalties:
        "Late payment penalty rate (day after due date)",
      recovery_indemnity_40:
        "Flat recovery indemnity amount (40 euros)",
      early_payment_discount_terms:
        'Early payment discount terms (or "no early payment discount")',
      client_siren_b2b: "Client SIREN for French professional clients",
      operation_category:
        "Operation category: goods, services or both",
      delivery_address_if_different:
        "Goods delivery address when different from client address",
      vat_debits_option_mention:
        'Wording "Option pour le paiement de la taxe d\'après les débits"',
    },
    statusLabels: {
      present: "Present",
      missing: "Missing",
      not_required: "Not required in your case",
      not_yet_required: "Not yet mandatory (timeline)",
    },
    statusHint: {
      missing: "This mention appears mandatory for your situation and date.",
      not_yet_required:
        "Required later for SMEs and micro-businesses (see timeline).",
      not_required:
        "Not applicable for your VAT regime, client type or operation.",
    },
    metaTitle: "French invoice mention checker",
    metaDesc:
      "Free bilingual tool to check mandatory invoice mentions in France, including 2026 e-invoicing reform. 100% local, FR/EN.",
  },
};

export const MENTION_IDS = [
  "parties_identity_address",
  "invoice_issue_date",
  "sale_or_service_date",
  "sequential_invoice_number",
  "line_items_detail",
  "seller_individual_id",
  "vat_amounts_by_rate",
  "vat_franchise_mention",
  "payment_due_date",
  "late_payment_penalties",
  "recovery_indemnity_40",
  "early_payment_discount_terms",
  "client_siren_b2b",
  "operation_category",
  "delivery_address_if_different",
  "vat_debits_option_mention",
];
