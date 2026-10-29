import {
  CIBS_FRANCHISE_WORDING_START,
  FRANCHISE_293B_TOLERANCE_END,
  REFORM_START_LARGE_ETI,
  REFORM_START_SME_MICRO,
  SOURCES,
} from "./sources.js";

/**
 * @typedef {'micro'|'sme'|'eti'|'large'} CompanySize
 * @typedef {'standard'|'franchise'} VatRegime
 * @typedef {'french_b2b'|'consumer'|'foreign'} ClientType
 * @typedef {'goods'|'services'|'both'} OperationKind
 * @typedef {'present'|'missing'|'not_required'|'not_yet_required'} RuleStatus
 */

/**
 * @param {string} isoDate YYYY-MM-DD
 * @returns {Date}
 */
export function parseIsoDate(isoDate) {
  const [y, m, d] = isoDate.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

/**
 * Whether the four reform mentions apply as mandatory (not merely recommended).
 *
 * @param {CompanySize} companySize
 * @param {string} invoiceDate ISO date
 */
export function reformMentionsApply(companySize, invoiceDate) {
  const d = parseIsoDate(invoiceDate);
  const startLarge = parseIsoDate(REFORM_START_LARGE_ETI);
  const startSme = parseIsoDate(REFORM_START_SME_MICRO);

  if (d < startLarge) return false;
  if (companySize === "large" || companySize === "eti") return true;
  if (companySize === "sme" || companySize === "micro") {
    return d >= startSme;
  }
  return false;
}

/**
 * @param {Record<string, boolean>} presentMentions
 * @param {string} invoiceDate
 * @returns {{ status: RuleStatus, noteKey?: string }}
 */
export function evaluateFranchiseVatMention(presentMentions, invoiceDate) {
  const has293 =
    presentMentions.vat_franchise_293b ||
    presentMentions.vat_franchise_mention;
  const hasCibs = presentMentions.vat_franchise_cibs;
  const d = parseIsoDate(invoiceDate);
  const cibsStart = parseIsoDate(CIBS_FRANCHISE_WORDING_START);
  const toleranceEnd = parseIsoDate(FRANCHISE_293B_TOLERANCE_END);

  if (hasCibs) {
    return { status: "present" };
  }
  if (has293 && d < cibsStart) {
    return { status: "present" };
  }
  if (has293 && d >= cibsStart && d <= toleranceEnd) {
    return { status: "present", noteKey: "franchise_293b_tolerance" };
  }
  if (has293 && d > toleranceEnd) {
    return { status: "missing", noteKey: "franchise_cibs_required" };
  }
  return { status: "missing" };
}

/**
 * @param {object} input
 * @param {CompanySize} input.companySize
 * @param {VatRegime} input.vatRegime
 * @param {ClientType} input.clientType
 * @param {string} input.invoiceDate
 * @param {OperationKind} input.operationKind
 * @param {boolean} input.deliveryDiffers
 * @param {boolean} input.vatDebitsOpted
 * @param {Record<string, boolean>} input.presentMentions rule id -> on invoice
 * @returns {Array<{ id: string, status: RuleStatus, sourceUrl: string, sourceKey: string, noteKey?: string, reformGroup?: boolean }>}
 */
export function evaluateInvoiceMentions(input) {
  const {
    companySize,
    vatRegime,
    clientType,
    invoiceDate,
    operationKind,
    deliveryDiffers,
    vatDebitsOpted,
    presentMentions = {},
  } = input;

  const isB2bPro =
    clientType === "french_b2b" || clientType === "foreign";
  const isFrenchB2b = clientType === "french_b2b";
  const reformActive = reformMentionsApply(companySize, invoiceDate);
  const afterReformStart =
    isFrenchB2b &&
    parseIsoDate(invoiceDate) >= parseIsoDate(REFORM_START_LARGE_ETI);
  const reformPending =
    afterReformStart &&
    !reformActive &&
    (companySize === "sme" || companySize === "micro");

  const hasGoods =
    operationKind === "goods" || operationKind === "both";

  const franchiseEval =
    vatRegime === "franchise"
      ? evaluateFranchiseVatMention(presentMentions, invoiceDate)
      : null;

  /** @type {Array<{ id: string, applies: boolean, pending?: boolean, sourceUrl: string, sourceKey: string, reformGroup?: boolean, fixedStatus?: RuleStatus, noteKey?: string }>} */
  const rules = [
    {
      id: "parties_identity_address",
      applies: true,
      sourceUrl: SOURCES.CGI_242_NONIES_A,
      sourceKey: "CGI_242_NONIES_A",
    },
    {
      id: "invoice_issue_date",
      applies: true,
      sourceUrl: SOURCES.CGI_242_NONIES_A,
      sourceKey: "CGI_242_NONIES_A",
    },
    {
      id: "sale_or_service_date",
      applies: true,
      sourceUrl: SOURCES.SERVICE_PUBLIC_F31808,
      sourceKey: "SERVICE_PUBLIC_F31808",
    },
    {
      id: "sequential_invoice_number",
      applies: true,
      sourceUrl: SOURCES.CGI_242_NONIES_A,
      sourceKey: "CGI_242_NONIES_A",
    },
    {
      id: "line_items_detail",
      applies: true,
      sourceUrl: SOURCES.CGI_242_NONIES_A,
      sourceKey: "CGI_242_NONIES_A",
    },
    {
      id: "seller_individual_id",
      applies: vatRegime !== "franchise",
      sourceUrl: SOURCES.CGI_242_NONIES_A,
      sourceKey: "CGI_242_NONIES_A",
    },
    {
      id: "vat_amounts_by_rate",
      applies: vatRegime === "standard",
      sourceUrl: SOURCES.CGI_242_NONIES_A,
      sourceKey: "CGI_242_NONIES_A",
    },
    {
      id: "vat_franchise_mention",
      applies: vatRegime === "franchise",
      sourceUrl: SOURCES.SERVICE_PUBLIC_F23208,
      sourceKey: "SERVICE_PUBLIC_F23208",
      fixedStatus: franchiseEval?.status,
      noteKey: franchiseEval?.noteKey,
    },
    {
      id: "payment_due_date",
      applies: isB2bPro,
      sourceUrl: SOURCES.CC_L441_9,
      sourceKey: "CC_L441_9",
    },
    {
      id: "late_payment_penalties",
      applies: isB2bPro,
      sourceUrl: SOURCES.CC_L441_9,
      sourceKey: "CC_L441_9",
    },
    {
      id: "recovery_indemnity_40",
      applies: isB2bPro,
      sourceUrl: SOURCES.CC_D441_5,
      sourceKey: "CC_D441_5",
    },
    {
      id: "early_payment_discount_terms",
      applies: isB2bPro,
      sourceUrl: SOURCES.CC_L441_9,
      sourceKey: "CC_L441_9",
    },
    {
      id: "client_siren_b2b",
      applies: afterReformStart,
      pending: reformPending,
      reformGroup: true,
      sourceUrl: SOURCES.SERVICE_PUBLIC_F31808,
      sourceKey: "SERVICE_PUBLIC_F31808",
    },
    {
      id: "operation_category",
      applies: afterReformStart,
      pending: reformPending,
      reformGroup: true,
      sourceUrl: SOURCES.SERVICE_PUBLIC_F31808,
      sourceKey: "SERVICE_PUBLIC_F31808",
    },
    {
      id: "delivery_address_if_different",
      applies: afterReformStart && hasGoods && deliveryDiffers,
      pending: reformPending && hasGoods && deliveryDiffers,
      reformGroup: true,
      sourceUrl: SOURCES.SERVICE_PUBLIC_F31808,
      sourceKey: "SERVICE_PUBLIC_F31808",
    },
    {
      id: "vat_debits_option_mention",
      applies: afterReformStart && vatDebitsOpted,
      pending: reformPending && vatDebitsOpted,
      reformGroup: true,
      sourceUrl: SOURCES.SERVICE_PUBLIC_F31808,
      sourceKey: "SERVICE_PUBLIC_F31808",
    },
  ];

  return rules.map((rule) => {
    let status;
    if (rule.fixedStatus !== undefined) {
      status = rule.fixedStatus;
    } else if (!rule.applies) {
      status = "not_required";
    } else if (rule.pending && !presentMentions[rule.id]) {
      status = "not_yet_required";
    } else if (rule.pending && presentMentions[rule.id]) {
      status = "present";
    } else {
      status = presentMentions[rule.id] ? "present" : "missing";
    }
    return {
      id: rule.id,
      status,
      sourceUrl: rule.sourceUrl,
      sourceKey: rule.sourceKey,
      noteKey: rule.noteKey,
      reformGroup: !!rule.reformGroup,
    };
  });
}

export function summarizeResults(results) {
  const counts = { present: 0, missing: 0, not_required: 0, not_yet_required: 0 };
  for (const r of results) {
    counts[r.status] += 1;
  }
  return counts;
}
