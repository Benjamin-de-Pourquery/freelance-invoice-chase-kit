import { UK_CONSULTATION_URL } from "./generate.js";

const franceLatePaymentHref = "/outil-penalites-retard";

export const paymentTermsCopy = {
  fr: {
    lang: "fr",
    htmlLang: "fr",
    homeHref: "/",
    otherLangHref: "/en/payment-terms-generator",
    otherLangLabel: "EN",
    badge: "Outil gratuit · 100 % local · FR / EN",
    metaTitle: "Générateur de conditions de paiement freelance",
    metaDesc:
      "Rédige une note écrite de conditions de prestation (parties, prix, délais, résiliation). Gratuit, sans compte, aucune donnée envoyée.",
    title: "Générateur de conditions de paiement",
    lead:
      "Renseigne les parties, le périmètre, la durée, le prix et les modalités de paiement. L'outil produit une note écrite que tu peux copier ou imprimer. Tout reste dans ton navigateur.",
    disclaimer:
      "Information générale publiée par Glint, pas un conseil juridique. Fais relire le texte par un professionnel avant signature.",
    notLegalAdviceBanner: "Pas un conseil juridique",
    sectionInputs: "Informations du contrat",
    sectionOutput: "Note écrite générée",
    freelancerNameLabel: "Prestataire (freelance)",
    clientNameLabel: "Client (société ou personne)",
    scopeLabel: "Périmètre de la prestation",
    scopeHint: "Décris les livrables ou services couverts.",
    durationLabel: "Durée ou calendrier",
    durationHint: "Ex. 3 mois, du 1er nov. 2026 au 31 janv. 2027, mission ponctuelle.",
    priceLabel: "Prix convenu",
    currencyLabel: "Devise",
    currencies: { EUR: "EUR", USD: "USD", GBP: "GBP" },
    paymentDueLabel: "Délai de paiement",
    paymentDueHint: "Ex. 30 jours fin de mois à réception de facture.",
    paymentMethodsLabel: "Modes de paiement",
    paymentMethodsHint: "Ex. virement SEPA, lien de paiement, chèque.",
    terminationLabel: "Préavis de résiliation",
    terminationHint: "Ex. 15 jours calendaires par écrit.",
    jurisdictionLabel: "Cadre juridique principal",
    jurisdictions: {
      uk: "Royaume-Uni",
      france: "France",
      other: "Autre / à préciser",
    },
    copyBtn: "Copier la note",
    copiedBtn: "Copié",
    printBtn: "Imprimer",
    contextTitle: "Contexte réglementaire (information)",
    ukContextTitle: "Royaume-Uni : proposition en consultation",
    ukContextBody:
      "Le 14 octobre 2026, le gouvernement britannique a ouvert une consultation (clôture le 8 janvier 2027) qui propose, entre autres, un droit pour certaines personnes indépendantes à une note écrite sur les conditions de chaque contrat de prestation. Ce texte n'est pas une loi : c'est une proposition soumise à consultation.",
    ukContextLinkLabel: "Consultation gov.uk : Make Work Pay (statut et protections des indépendants)",
    ukContextLinkUrl: UK_CONSULTATION_URL,
    franceContextTitle: "France : retards de paiement",
    franceContextBody:
      "Pour estimer pénalités et indemnités si le client paie en retard, utilise l'outil dédié (B2B France). Ce générateur ne calcule pas de montants légaux.",
    franceContextLinkLabel: "Calculateur pénalités de retard (B2B France)",
    franceContextLinkHref: franceLatePaymentHref,
    otherContextTitle: "Autres pays",
    otherContextBody:
      "Les obligations écrites varient selon le droit applicable. Adapte cette note avec un conseil local si besoin.",
    ctaTitle: "Aller plus loin",
    ctaBody:
      "Le Kit Relance Impayés Freelance inclut modèles de relance, checklist, courrier et tracker pour encaisser plus vite après l'échéance.",
    ctaButton: "Voir le kit",
    documentLabels: {
      documentTitle: "NOTE ÉCRITE DE CONDITIONS DE PRESTATION",
      partiesHeading: "1. Parties",
      freelancerLabel: "Prestataire",
      clientLabel: "Client",
      scopeHeading: "2. Périmètre de la prestation",
      durationHeading: "3. Durée ou calendrier",
      feeHeading: "4. Prix convenu",
      paymentDueHeading: "5. Délai de paiement",
      paymentMethodsHeading: "6. Modes de paiement",
      terminationHeading: "7. Résiliation",
      governingNote: {
        uk:
          "8. Cadre : prestation visée pour un client au Royaume-Uni. Au 14 octobre 2026, le gouvernement britannique consulte sur une proposition de droit à une note écrite pour certains travailleurs indépendants (consultation ouverte jusqu'au 8 janvier 2027). Ce document est un modèle d'information, pas un texte imposé par la loi.",
        france:
          "8. Cadre : prestation visée pour un client en France. Les retards de paiement B2B peuvent donner lieu à pénalités et indemnité forfaitaire (voir outil Glint sur les pénalités de retard).",
        other:
          "8. Cadre : droit applicable à préciser entre les parties. Vérifie les exigences locales avant signature.",
      },
      documentFooter:
        "Document généré par l'outil Glint à titre informatif. Pas un conseil juridique. Les parties restent libres d'ajouter clauses (confidentialité, propriété intellectuelle, litiges).",
      placeholders: {
        freelancer: "[Nom ou raison sociale du prestataire]",
        client: "[Nom ou raison sociale du client]",
        scope: "[Description des services ou livrables]",
        duration: "[Durée ou dates]",
        paymentDue: "[Délai de paiement]",
        paymentMethods: "[Modes de paiement]",
        termination: "[Préavis de résiliation]",
      },
    },
  },
  en: {
    lang: "en",
    htmlLang: "en",
    homeHref: "/en",
    otherLangHref: "/outil-conditions-paiement",
    otherLangLabel: "FR",
    badge: "Free tool · 100% client-side · FR / EN",
    metaTitle: "Freelance payment terms statement generator",
    metaDesc:
      "Draft a written statement of engagement terms (parties, scope, fee, payment, termination). Free, no account, nothing is sent to a server.",
    title: "Payment terms statement generator",
    lead:
      "Enter the parties, scope, duration, fee, and payment details. The tool builds a one-page written statement you can copy or print. Everything stays in your browser.",
    disclaimer:
      "General information published by Glint, not legal advice. Have a professional review the text before you sign.",
    notLegalAdviceBanner: "Not legal advice",
    sectionInputs: "Engagement details",
    sectionOutput: "Generated written statement",
    freelancerNameLabel: "Freelancer (service provider)",
    clientNameLabel: "Client (company or individual)",
    scopeLabel: "Scope of work",
    scopeHint: "Describe deliverables or services covered.",
    durationLabel: "Duration or timeline",
    durationHint: "E.g. 3 months, 1 Nov 2026 to 31 Jan 2027, one-off project.",
    priceLabel: "Agreed fee",
    currencyLabel: "Currency",
    currencies: { EUR: "EUR", USD: "USD", GBP: "GBP" },
    paymentDueLabel: "Payment due term",
    paymentDueHint: "E.g. 30 days end of month from invoice date.",
    paymentMethodsLabel: "Payment methods",
    paymentMethodsHint: "E.g. bank transfer, payment link, cheque.",
    terminationLabel: "Termination notice",
    terminationHint: "E.g. 15 calendar days in writing.",
    jurisdictionLabel: "Main legal context",
    jurisdictions: {
      uk: "United Kingdom",
      france: "France",
      other: "Other / to specify",
    },
    copyBtn: "Copy statement",
    copiedBtn: "Copied",
    printBtn: "Print",
    contextTitle: "Regulatory context (information)",
    ukContextTitle: "United Kingdom: proposal under consultation",
    ukContextBody:
      "On 14 October 2026 the UK government opened a consultation (closing 8 January 2027) that proposes, among other measures, a right for certain self-employed workers to a written statement of terms for each contract for services. This is a proposal under consultation, not current law.",
    ukContextLinkLabel:
      "gov.uk consultation: Make Work Pay (employment status and self-employed protections)",
    ukContextLinkUrl: UK_CONSULTATION_URL,
    franceContextTitle: "France: late payment",
    franceContextBody:
      "To estimate penalties and the flat recovery indemnity if a client pays late, use the dedicated France B2B tool. This generator does not calculate statutory amounts.",
    franceContextLinkLabel: "France B2B late payment penalty calculator",
    franceContextLinkHref: franceLatePaymentHref,
    otherContextTitle: "Other countries",
    otherContextBody:
      "Written terms requirements differ by applicable law. Adapt this note with local advice if needed.",
    ctaTitle: "Go further with the kit",
    ctaBody:
      "The Freelancer Overdue Invoice Kit includes chase templates, checklist, letter, and tracker to collect faster after the due date.",
    ctaButton: "See the kit offer",
    documentLabels: {
      documentTitle: "WRITTEN STATEMENT OF ENGAGEMENT TERMS",
      partiesHeading: "1. Parties",
      freelancerLabel: "Service provider",
      clientLabel: "Client",
      scopeHeading: "2. Scope of work",
      durationHeading: "3. Duration or timeline",
      feeHeading: "4. Agreed fee",
      paymentDueHeading: "5. Payment due term",
      paymentMethodsHeading: "6. Payment methods",
      terminationHeading: "7. Termination",
      governingNote: {
        uk:
          "8. Context: engagement for a client in the United Kingdom. On 14 October 2026 the UK government is consulting on a proposed right to a written statement for certain self-employed individuals (consultation open until 8 January 2027). This document is an informational template, not a statutory form.",
        france:
          "8. Context: engagement for a client in France. B2B late payment may attract penalties and a flat recovery indemnity (see Glint late payment penalty tool).",
        other:
          "8. Context: applicable law to be agreed by the parties. Check local requirements before signing.",
      },
      documentFooter:
        "Document generated by the Glint tool for information only. Not legal advice. The parties may add further clauses (confidentiality, IP, disputes).",
      placeholders: {
        freelancer: "[Freelancer name or business name]",
        client: "[Client name or business name]",
        scope: "[Description of services or deliverables]",
        duration: "[Duration or dates]",
        paymentDue: "[Payment due term]",
        paymentMethods: "[Payment methods]",
        termination: "[Termination notice period]",
      },
    },
  },
};
