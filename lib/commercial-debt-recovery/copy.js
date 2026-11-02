import { OFFICIAL_SOURCES } from "./sources.js";

export const guideCopy = {
  fr: {
    lang: "fr",
    htmlLang: "fr",
    homeHref: "/",
    otherLangHref: "/en/commercial-debt-recovery-procedure",
    otherLangLabel: "EN",
    badge: "Guide gratuit · 100 % local · FR",
    metaTitle:
      "Recouvrement créances commerciales incontestées - guide pratique 2026",
    metaDesc:
      "Comprendre la nouvelle procédure entre commerçants, pas encore en vigueur (loi 2026-307, décret 2026-967) : étapes, auto-diagnostic, dossier de preuves, outils gratuits et kit relance.",
    canonicalPath: "/guide-recouvrement-creances-commerciales-incontestees",
    title: "Procédure de recouvrement des créances commerciales incontestées",
    lead:
      "Ce guide résume, à partir de sources officielles, la procédure simplifiée instaurée par la loi du 23 avril 2026 pour certaines factures impayées entre commerçants. Rien n'est transmis au serveur : l'auto-diagnostic ci-dessous s'exécute uniquement dans ton navigateur.",
    legalDisclaimer:
      "Information générale uniquement, pas un conseil juridique. L'appréciation d'une situation particulière relève des textes officiels et, le cas échéant, d'un commissaire de justice, d'un avocat ou d'un expert-comptable.",
    notInForceTitle: "Procédure pas encore en vigueur",
    notInForceBody:
      "Le décret n° 2026-967 du 20 octobre 2026 précise que cette procédure entrera en vigueur à une date fixée par arrêté du ministre de la Justice, et au plus tard le 31 décembre 2026. En attendant, les démarches habituelles restent applicables : relance amiable, mise en demeure, puis procédures judiciaires classiques (injonction de payer, référé-provision, assignation en paiement).",
    notInForceSourceKey: "decree2026_967",
    contextTitle: "De quoi s'agit-il ?",
    contextParagraphs: [
      "Les retards de paiement fragilisent la trésorerie des entreprises. La loi n° 2026-307 du 23 avril 2026 instaure une procédure simplifiée de recouvrement des créances commerciales incontestées, complétant les voies déjà existantes (solution amiable ou recouvrement judiciaire).",
      "Selon Entreprendre Service Public, cette procédure vise à accélérer le recouvrement lorsque la créance n'est pas contestée par le débiteur, sans faire intervenir le juge pour obtenir le titre exécutoire dans ce parcours.",
      "Elle complète la procédure de recouvrement simplifiée déjà limitée aux dettes inférieures à 5 000 €, et permet le recouvrement de créances commerciales incontestées entre professionnels sans seuil de montant (Service Public).",
    ],
    whoTitle: "Qui est concerné ?",
    whoParagraphs: [
      "La procédure concerne le recouvrement d'une créance ayant fait l'objet d'une facturation entre commerçants. Cette créance doit être certaine, liquide et exigible (Service Public).",
      "La procédure est réservée aux dettes commerciales entre commerçants (Service Public). L'applicabilité dépend du statut juridique du créancier et du débiteur, tel que décrit dans les textes officiels cités en bas de page.",
    ],
    howTitle: "Comment se déroule la procédure (une fois en vigueur) ?",
    howSteps: [
      {
        title: "1. Demande auprès d'un commissaire de justice",
        body:
          "La procédure est mise en œuvre par un commissaire de justice à la demande du créancier (Service Public). Le décret précise qu'intervient un commissaire de justice du ressort de la cour d'appel où demeure le débiteur.",
        sourceKey: "decree2026_967",
      },
      {
        title: "2. Commandement de payer",
        body:
          "Le commissaire de justice signifie au débiteur un commandement de payer la créance, auquel est joint une copie de la facture (décret). Le commandement décrit l'obligation, les montants réclamés et fixe un délai d'un mois pour payer (Service Public). Le décret exige que la signification respecte les modalités prévues aux articles 654 à 658 du code de procédure civile (signification à personne, à domicile ou à étude).",
        sourceKey: "decree2026_967",
      },
      {
        title: "3. Paiement, contestation ou silence",
        body:
          "Le débiteur dispose d'un mois pour payer ou contester (Service Public). S'il conteste la créance auprès du commissaire de justice, la procédure de recouvrement simplifiée prend fin (loi, article L. 126-2 ; décret, article R. 126-2). En l'absence de contestation, la demande de titre exécutoire est régie par le décret (article R. 126-4).",
        sourceKey: "decree2026_967",
      },
      {
        title: "4. Procès-verbal de non-contestation",
        body:
          "Si la somme due n'est ni payée ni contestée, le commissaire de justice dresse un procès-verbal de non-contestation, au minimum 8 jours après la fin du délai d'un mois (Service Public).",
        sourceKey: "servicePublicA18889",
      },
      {
        title: "5. Titre exécutoire",
        body:
          "Sur demande du commissaire de justice, le greffier de la juridiction compétente en matière commerciale rend le procès-verbal de non-contestation exécutoire (Service Public mentionne le greffier du tribunal de commerce ; décret, article R. 126-4). La demande est adressée au greffe désigné par le décret selon le lieu où demeure le débiteur (article R. 126-4).",
        sourceKey: "servicePublicA18889",
      },
      {
        title: "6. Recouvrement et recours",
        body:
          "La créance pourra alors être recouvrée directement par le commissaire de justice (Service Public). À l'initiative du créancier, le procès-verbal exécutoire est transmis au débiteur dans un délai de six mois ; le débiteur peut saisir le juge pour contester ce procès-verbal (Service Public). Les frais liés à la mise en œuvre de la procédure sont à la charge du débiteur (Service Public).",
        sourceKey: "servicePublicA18889",
      },
    ],
    ifNotTitle: "Si la procédure ne s'applique pas ou si le débiteur conteste",
    ifNotBody:
      "Tant que la procédure n'est pas applicable, ou si le débiteur conteste, le créancier retrouve les voies classiques évoquées par Service Public : injonction de payer, référé-provision ou assignation en paiement, en plus de la relance amiable et de la mise en demeure.",
    selfCheckTitle: "Suis-je concerné ?",
    selfCheckIntro:
      "Réponds aux questions ci-dessous pour obtenir une indication générale. Aucune réponse n'est enregistrée ni envoyée.",
    selfCheckFields: {
      creditorIsCommercant: "Es-tu commerçant au sens de la procédure (facturation entre commerçants) ?",
      debtorIsCommercant: "Ton client débiteur est-il commerçant ?",
      invoicedBetweenCommercant:
        "La créance provient-elle d'une facturation entre commerçants (créance commerciale) ?",
      dueDatePassed: "La créance est-elle exigible (échéance dépassée, délais de paiement écoulés) ?",
      debtCertainLiquidExigible:
        "La dette te paraît-elle certaine et liquide (montant déterminé ou déterminable) ?",
      debtorContests: "Le débiteur conteste-t-il déjà la dette (écrit ou action en justice) ?",
    },
    selfCheckOptions: {
      yes: "Oui",
      no: "Non",
      unsure: "Je ne sais pas",
    },
    selfCheckResultTitle: "Résultat indicatif",
    selfCheckOutcomes: {
      likely: {
        title: "Critères de la procédure en principe remplis (indication)",
        body:
          "D'après les réponses saisies, la créance correspond aux critères décrits par Service Public pour une créance commerciale incontestée entre commerçants. La procédure n'est pas encore en vigueur (voir encadré ci-dessus).",
      },
      unlikely: {
        title: "Au moins un critère de la procédure ne semble pas rempli (indication)",
        body:
          "D'après les réponses saisies, au moins une condition décrite par Service Public ne semble pas remplie (statut de commerçant, créance non exigible, dette contestée, etc.). Les voies classiques évoquées par Service Public (relance amiable, mise en demeure, injonction de payer, référé-provision, assignation en paiement) restent applicables selon la situation.",
      },
      uncertain: {
        title: "Statut ou nature de la dette indiqués comme incertains",
        body:
          "Les réponses indiquent une incertitude sur le statut de commerçant ou sur le caractère certain et liquide de la dette. Les textes officiels cités en bas de page décrivent les conditions d'application de la procédure.",
      },
    },
    selfCheckDisclaimer:
      "Ce questionnaire ne remplace pas une analyse juridique. Seul un professionnel habilité peut confirmer l'adéquation de la procédure à ton dossier.",
    checklistTitle: "Dossier de preuves (bonnes pratiques)",
    checklistIntro:
      "Anticiper un recouvrement, quelle que soit la procédure, suppose de rassembler des éléments lisibles. Cette liste est une check-list pratique, pas une liste légale exhaustive.",
    checklistItems: [
      "Devis accepté, bon de commande ou contrat décrivant la prestation ou la vente",
      "Facture avec date d'échéance, montant et identité des parties",
      "Preuve de livraison ou d'exécution du service (bon de livraison, PV de recette, échanges de validation)",
      "Historique des relances amiables et des échanges avec le débiteur",
      "Coordonnées à jour du débiteur (adresse, SIREN le cas échéant)",
      "Copie des conditions de paiement ou CGV mentionnant délais et pénalités le cas échéant",
    ],
    toolsTitle: "Outils gratuits du site",
    tools: [
      {
        label: "Générateur d'email de relance",
        href: "/outil-email-relance",
      },
      {
        label: "Vérification des mentions de facture",
        href: "/outil-verification-facture",
      },
      {
        label: "Générateur de conditions de paiement",
        href: "/outil-conditions-paiement",
      },
    ],
    ctaTitle: "Aller plus loin avec le kit payant",
    ctaBody:
      "Le Kit Relance Impayés Freelance regroupe emails, courrier de mise en demeure, checklist d'envoi et tracker CSV pour suivre tes impayés avant d'envisager une procédure formelle.",
    ctaButton: "Voir le kit",
    sourcesTitle: "Sources officielles citées",
    sources: [
      OFFICIAL_SOURCES.law2026_307,
      OFFICIAL_SOURCES.decree2026_967,
      OFFICIAL_SOURCES.servicePublicA18889,
    ],
    sourceLinkLabel: "Lire sur le site officiel",
  },
  en: {
    lang: "en",
    htmlLang: "en",
    homeHref: "/en",
    otherLangHref: "/guide-recouvrement-creances-commerciales-incontestees",
    otherLangLabel: "FR",
    badge: "Free guide · French law only",
    metaTitle: "French commercial debt recovery procedure (2026)",
    metaDesc:
      "This page describes a French simplified recovery procedure for uncontested commercial debts between commerçants. The procedure is not yet in force. Full guide in French.",
    canonicalPath: "/en/commercial-debt-recovery-procedure",
    title: "French uncontested commercial debt recovery (2026)",
    lead:
      "This short page is for English-speaking visitors. The full guide, self-check and checklist are in French because the procedure applies under French law.",
    scopeParagraphs: [
      "The simplified procedure is not yet in force under French law. Decree no. 2026-967 of 20 October 2026 states that it will enter into force on a date set by order of the Minister of Justice, and no later than 31 December 2026.",
      "When it applies, it concerns the recovery of an uncontested commercial debt invoiced only between commerçants, as described on Entreprendre Service Public.",
    ],
    frGuideLinkLabel: "Read the full French guide",
    frGuideHref: "/guide-recouvrement-creances-commerciales-incontestees",
    legalDisclaimer:
      "General information only, not legal advice. Individual cases are appraised by qualified professionals and by the official sources cited on the French guide page.",
  },
};

export function getSourceByKey(key) {
  return OFFICIAL_SOURCES[key] ?? null;
}
