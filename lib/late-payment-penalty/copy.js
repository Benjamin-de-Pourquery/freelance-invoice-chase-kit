import { SOURCES } from "./sources.js";

const sourceLabelsFr = {
  l441_10: "Légifrance : art. L441-10 (pénalités de retard)",
  f23211: "Service Public Entreprendre : F23211 (taux B2B)",
  bce_rates: "Banque de France : taux directeurs BCE",
  d441_5: "Légifrance : art. D441-5 (indemnité forfaitaire 40 €)",
  legal_interest_h2_2026: "service-public.fr : intérêt légal S2 2026 (professionnel)",
};

const sourceLabelsEn = {
  l441_10: "Légifrance: art. L441-10 (late-payment penalties)",
  f23211: "Service Public Entreprendre: F23211 (B2B rates)",
  bce_rates: "Banque de France: ECB key rates",
  d441_5: "Légifrance: art. D441-5 (€40 flat recovery indemnity)",
  legal_interest_h2_2026: "service-public.fr: H2 2026 legal interest (professional)",
};

export const penaltyCopy = {
  fr: {
    lang: "fr",
    homeHref: "/",
    otherLangHref: "/en/late-payment-calculator",
    otherLangLabel: "EN",
    badge: "Outil gratuit · Pénalités de retard B2B",
    metaTitle: "Calculateur pénalités de retard facture (France B2B)",
    metaDesc:
      "Estime les intérêts de retard et l'indemnité forfaitaire 40 € selon le Code de commerce. Gratuit, sans compte.",
    title: "Calculateur de pénalités de retard",
    lead:
      "Estime les intérêts de retard et l'indemnité forfaitaire pour une facture B2B en France, à partir du montant TTC, des dates et du type de client.",
    disclaimer:
      "Information uniquement, pas un conseil juridique. Les taux évoluent : vérifie sur les sources officielles avant d'envoyer une relance ou une mise en demeure.",
    sectionInputs: "Données de la facture",
    amountLabel: "Montant dû (TTC, €)",
    dueDateLabel: "Date d'échéance",
    calcDateLabel: "Date de calcul",
    calcDateHint: "Par défaut : aujourd'hui",
    contractualRateLabel: "Taux annuel contractuel (%)",
    contractualRateHint:
      "Optionnel. Si vide, le taux légal par défaut du semestre d'échéance s'applique (BCE + 10 points, art. L441-10).",
    debtorTypeLabel: "Type de débiteur",
    debtorTypes: {
      professional: "Client professionnel (entreprise)",
      private: "Particulier",
    },
    sectionResults: "Résultat",
    daysLateLabel: "Jours de retard",
    rateLabel: "Taux annuel appliqué",
    floorShortLabel: "plancher",
    interestLabel: "Intérêts de retard",
    recoveryLabel: "Indemnité forfaitaire de recouvrement",
    recoveryNa: "Non applicable (client particulier)",
    totalLabel: "Total pénalités (hors principal)",
    formulaLabel: "Formule",
    noPenaltiesTitle: "Aucune pénalité à cette date",
    noPenaltiesBody:
      "La date de calcul est égale ou antérieure à l'échéance : 0 jour de retard. Les pénalités L441-10 ne courent pas encore.",
    rateReasons: {
      statutory_default:
        "Taux légal par défaut du semestre (taux BCE au 1er janv. ou 1er juil. + 10 points, F23211).",
      contractual: "Taux contractuel saisi (CGV ou facture).",
      floor_minimum:
        "Le taux contractuel ou légal est relevé au plancher légal (3 × intérêt légal professionnel du semestre d'échéance).",
      floor_only_unknown_default:
        "Semestre non référencé dans l'outil : saisis un taux contractuel ou le taux BCE du semestre pour le défaut BCE + 10 points. En attendant, seul le plancher minimum du semestre est appliqué.",
      unavailable:
        "Taux non calculable : saisis un taux contractuel ou consulte F23211 / Banque de France pour ce semestre.",
      none: "",
    },
    warningUnknownSemester:
      "Ce semestre n'est pas préchargé dans l'outil. Indique un taux contractuel ou vérifie le taux BCE sur la Banque de France et Service Public F23211.",
    l441Note:
      "Les pénalités sont exigibles le lendemain de l'échéance, sans mise en demeure préalable (art. L441-10).",
    chaseTitle: "Texte de relance (à copier)",
    copyBtn: "Copier le texte",
    copiedBtn: "Copié",
    sourcesTitle: "Sources officielles",
    kitCtaTitle: "Aller plus loin",
    kitCtaBody:
      "Le Kit Relance Impayés Freelance inclut emails, courrier, checklist et tracker pour relancer sans improviser.",
    kitCtaBtn: "Voir le kit",
    sourceLabels: sourceLabelsFr,
    sources: Object.values(SOURCES),
  },
  en: {
    lang: "en",
    homeHref: "/en",
    otherLangHref: "/outil-penalites-retard",
    otherLangLabel: "FR",
    badge: "Free tool · French B2B late penalties",
    metaTitle: "Late payment penalty calculator (France B2B)",
    metaDesc:
      "Estimate late-payment interest and the €40 flat recovery indemnity under the French Commercial Code. Free, no account.",
    title: "Late payment penalty calculator",
    lead:
      "Estimate late-payment interest and the flat recovery indemnity for a French B2B invoice from the amount due, dates, and debtor type.",
    disclaimer:
      "Information only, not legal advice. Rates change: check official sources before sending a chase email or formal notice.",
    sectionInputs: "Invoice details",
    amountLabel: "Amount due (incl. tax, €)",
    dueDateLabel: "Due date",
    calcDateLabel: "Calculation date",
    calcDateHint: "Default: today",
    contractualRateLabel: "Contractual annual rate (%)",
    contractualRateHint:
      "Optional. If empty, the statutory default for the due-date semester applies (ECB rate + 10 points, art. L441-10).",
    debtorTypeLabel: "Debtor type",
    debtorTypes: {
      professional: "Professional client (business)",
      private: "Private individual",
    },
    sectionResults: "Result",
    daysLateLabel: "Days late",
    rateLabel: "Annual rate applied",
    floorShortLabel: "floor",
    interestLabel: "Late-payment interest",
    recoveryLabel: "Flat recovery indemnity",
    recoveryNa: "Not applicable (private individual)",
    totalLabel: "Total penalties (excluding principal)",
    formulaLabel: "Formula",
    noPenaltiesTitle: "No penalties on this date",
    noPenaltiesBody:
      "The calculation date is on or before the due date: 0 days late. L441-10 penalties do not accrue yet.",
    rateReasons: {
      statutory_default:
        "Statutory default for the semester (ECB rate on 1 Jan or 1 Jul + 10 points, F23211).",
      contractual: "Contractual rate entered (terms or invoice).",
      floor_minimum:
        "Contractual or statutory rate raised to the legal floor (3 × professional legal interest for the due-date semester).",
      floor_only_unknown_default:
        "Semester not preloaded in this tool: enter a contractual rate or the semester ECB rate for the ECB + 10 default. Until then, only the semester minimum floor is applied.",
      unavailable:
        "Rate cannot be computed: enter a contractual rate or check F23211 / Banque de France for this semester.",
      none: "",
    },
    warningUnknownSemester:
      "This semester is not preloaded. Enter a contractual rate or check the ECB rate on Banque de France and Service Public F23211.",
    l441Note:
      "Penalties are due from the day after the due date, without a prior formal notice (art. L441-10).",
    chaseTitle: "Chase email text (copy and paste)",
    copyBtn: "Copy text",
    copiedBtn: "Copied",
    sourcesTitle: "Official sources",
    kitCtaTitle: "Go further",
    kitCtaBody:
      "The Freelancer Overdue Invoice Kit includes emails, formal letter, checklist and tracker so you can chase invoices without winging it.",
    kitCtaBtn: "See the kit",
    sourceLabels: sourceLabelsEn,
    sources: Object.values(SOURCES),
  },
};

export function formatRateDetail(result, t) {
  const parts = [];
  if (result.bcePercent != null && result.rateReason === "statutory_default") {
    parts.push(`BCE ${result.bcePercent}% + 10 pts`);
  }
  if (result.floorPercent != null) {
    parts.push(`${t.floorShortLabel} ${result.floorPercent}%`);
  }
  const reason = t.rateReasons[result.rateReason] || "";
  if (reason) parts.push(reason);
  return parts.join(" · ");
}
