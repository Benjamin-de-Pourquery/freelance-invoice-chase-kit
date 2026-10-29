export const REFORM_MENTION_IDS = [
  "client_siren_b2b",
  "operation_category",
  "delivery_address_if_different",
  "vat_debits_option_mention",
];

export const FRANCHISE_WORDING_IDS = [
  "vat_franchise_293b",
  "vat_franchise_cibs",
];

export const CORE_MENTION_IDS = [
  "parties_identity_address",
  "invoice_issue_date",
  "sale_or_service_date",
  "sequential_invoice_number",
  "line_items_detail",
  "seller_individual_id",
  "vat_amounts_by_rate",
  ...FRANCHISE_WORDING_IDS,
  "payment_due_date",
  "late_payment_penalties",
  "recovery_indemnity_40",
  "early_payment_discount_terms",
];

export const MENTION_IDS = [...CORE_MENTION_IDS, ...REFORM_MENTION_IDS];

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
    reformExplainerTitle: "Réforme facture électronique (rappel)",
    reformExplainerBody:
      "Quatre nouvelles mentions deviennent obligatoires sur les factures émises vers un client professionnel en France : numéro SIREN du client (entreprise), catégorie de l'opération (biens, services ou les deux), adresse de livraison des biens si elle diffère de l'adresse du client, et la mention « Option pour le paiement de la taxe d'après les débits » si tu as opté pour la TVA sur les débits. Calendrier service-public : 1er septembre 2026 pour les grandes entreprises et les ETI, 1er septembre 2027 pour les PME et micro-entreprises (y compris micro-entrepreneurs en franchise en base). Depuis le 1er septembre 2026, toute entreprise doit pouvoir recevoir des factures électroniques (plateforme agréée). Les PME et micro-entreprises doivent émettre des factures électroniques vers des clients professionnels assujettis à la TVA en France à partir du 1er septembre 2027. Pour la franchise en base, la mention « TVA non applicable, art. L. 223 et s. du code des impositions sur les biens et services (CIBS) » remplace la référence à l'article 293 B du CGI à partir du 1er septembre 2026 ; l'ancienne formulation reste acceptée jusqu'au 31 décembre 2027 selon service-public.",
    reformExplainerSourcesHeading: "Sources officielles",
    reformExplainerSources: [
      {
        label: "service-public : mentions obligatoires (F31808)",
        url: "https://entreprendre.service-public.gouv.fr/vosdroits/F31808",
      },
      {
        label: "impots.gouv.fr : réforme facturation électronique",
        url: "https://www.impots.gouv.fr/japprofondis-mes-connaissances-sur-la-reforme",
      },
      {
        label: "service-public : réception factures électroniques (F39785)",
        url: "https://entreprendre.service-public.gouv.fr/vosdroits/F39785",
      },
      {
        label: "impots.gouv.fr : micro-entrepreneur et réforme",
        url: "https://www.impots.gouv.fr/professionnel/questions/franchise-en-base-micro-entrepreneur-ou-auto-entrepreneur-suis-je-concerne",
      },
      {
        label: "service-public : mention TVA franchise (F23208)",
        url: "https://entreprendre.service-public.gouv.fr/vosdroits/F23208",
      },
    ],
    sectionContext: "Ta situation",
    sectionMentions: "Mentions sur la facture",
    sectionCoreMentions: "Mentions habituelles",
    sectionReformMentions: "Réforme facture électronique",
    sectionResults: "Résultat",
    sectionCoreResults: "Mentions habituelles",
    sectionReformResults: "Réforme facture électronique",
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
    sourceLinkLabel: "Source officielle",
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
        "Mention de franchise en base (293 B ou CIBS, voir ci-dessous)",
      vat_franchise_293b:
        "« TVA non applicable, art. 293 B du code général des impôts » (formulation antérieure, tolérée jusqu'au 31 décembre 2027)",
      vat_franchise_cibs:
        "« TVA non applicable, art. L. 223 et s. du code des impositions sur les biens et services (CIBS) » (nouvelle formulation)",
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
    resultNotes: {
      franchise_293b_tolerance:
        "La formulation CIBS est la référence depuis le 1er septembre 2026. L'article 293 B reste accepté jusqu'au 31 décembre 2027 (service-public F23208).",
      franchise_cibs_required:
        "Après le 31 décembre 2027, seule la mention CIBS correspond à la formulation indiquée par service-public.",
    },
    statusLabels: {
      present: "Présent",
      missing: "Manquant (semble obligatoire d'après la source officielle indiquée)",
      not_required: "Non requis dans ton cas",
      not_yet_required: "Obligatoire à partir du 1er sept. 2027",
    },
    statusHint: {
      missing:
        "Cette mention semble obligatoire pour ta situation et ta date de facture, d'après la source officielle indiquée.",
      not_yet_required:
        "Semble obligatoire à partir du 1er septembre 2027 pour les PME et micro-entreprises, d'après la source officielle indiquée ; tu peux déjà l'ajouter sur ta facture.",
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
    reformExplainerTitle: "E-invoicing reform (summary)",
    reformExplainerBody:
      "Four new mandatory mentions apply on invoices to French professional clients: the client SIREN (when the client is a business), operation category (goods, services or both), goods delivery address when it differs from the client address, and the wording \"Option pour le paiement de la taxe d'après les débits\" if you opted for VAT on debits. Service-public timeline: 1 September 2026 for large companies and mid-caps (ETI), 1 September 2027 for SMEs and micro-businesses (including VAT-franchise micro-entrepreneurs). From 1 September 2026 every business must be able to receive electronic invoices (approved platform). SMEs and micro-businesses must issue e-invoices to French VAT-registered business clients from 1 September 2027. For VAT franchise, the CIBS wording replaces the CGI art. 293 B reference from 1 September 2026; the older wording remains accepted until 31 December 2027 per service-public.",
    reformExplainerSourcesHeading: "Official sources",
    reformExplainerSources: [
      {
        label: "service-public: mandatory mentions (F31808)",
        url: "https://entreprendre.service-public.gouv.fr/vosdroits/F31808",
      },
      {
        label: "impots.gouv.fr: e-invoicing reform",
        url: "https://www.impots.gouv.fr/japprofondis-mes-connaissances-sur-la-reforme",
      },
      {
        label: "service-public: receiving e-invoices (F39785)",
        url: "https://entreprendre.service-public.gouv.fr/vosdroits/F39785",
      },
      {
        label: "impots.gouv.fr: micro-business and reform",
        url: "https://www.impots.gouv.fr/professionnel/questions/franchise-en-base-micro-entrepreneur-ou-auto-entrepreneur-suis-je-concerne",
      },
      {
        label: "service-public: VAT franchise wording (F23208)",
        url: "https://entreprendre.service-public.gouv.fr/vosdroits/F23208",
      },
    ],
    sectionContext: "Your situation",
    sectionMentions: "Mentions on the invoice",
    sectionCoreMentions: "Standard mentions",
    sectionReformMentions: "E-invoicing reform",
    sectionResults: "Result",
    sectionCoreResults: "Standard mentions",
    sectionReformResults: "E-invoicing reform",
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
    sourceLinkLabel: "Official source",
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
        "VAT franchise wording (293 B or CIBS, see below)",
      vat_franchise_293b:
        '"TVA non applicable, art. 293 B du code général des impôts" (previous wording, accepted until 31 December 2027)',
      vat_franchise_cibs:
        '"TVA non applicable, art. L. 223 et s. du code des impositions sur les biens et services (CIBS)" (new wording)',
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
    resultNotes: {
      franchise_293b_tolerance:
        "The CIBS wording is the reference from 1 September 2026. The art. 293 B wording remains accepted until 31 December 2027 (service-public F23208).",
      franchise_cibs_required:
        "After 31 December 2027, service-public points to the CIBS wording only.",
    },
    statusLabels: {
      present: "Present",
      missing: "Missing (appears to be required according to the official source shown)",
      not_required: "Not required in your case",
      not_yet_required: "Required from 1 Sept 2027",
    },
    statusHint: {
      missing:
        "This mention appears to be required for your situation and invoice date, according to the official source shown.",
      not_yet_required:
        "Appears to be required from 1 September 2027 for SMEs and micro-businesses, according to the official source shown; you can add it on your invoice already.",
      not_required:
        "Not applicable for your VAT regime, client type or operation.",
    },
    metaTitle: "French invoice mention checker",
    metaDesc:
      "Free bilingual tool to check mandatory invoice mentions in France, including 2026 e-invoicing reform. 100% local, FR/EN.",
  },
};
