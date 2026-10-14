import {
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
 * Whether the four reform mentions (7° bis, 8° bis, 11° bis and strengthened client
 * identification for B2B e-invoicing) apply to this issuer and invoice date.
 * Calendar: service-public and CGI ann. II art. 242 nonies A (decree 2022-1299 art. 3).
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
 * @param {object} input
 * @param {CompanySize} input.companySize
 * @param {VatRegime} input.vatRegime
 * @param {ClientType} input.clientType
 * @param {string} input.invoiceDate
 * @param {OperationKind} input.operationKind
 * @param {boolean} input.deliveryDiffers
 * @param {boolean} input.vatDebitsOpted
 * @param {Record<string, boolean>} input.presentMentions rule id -> on invoice
 * @returns {Array<{ id: string, status: RuleStatus, sourceUrl: string, sourceKey: string }>}
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

  /** @type {Array<{ id: string, applies: boolean, pending?: boolean, sourceUrl: string, sourceKey: string }>} */
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
      optionalForFranchise: true,
      sourceUrl: SOURCES.CGI_242_NONIES_A,
      sourceKey: "CGI_242_NONIES_A",
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
      sourceUrl: SOURCES.SERVICE_PUBLIC_A15683,
      sourceKey: "SERVICE_PUBLIC_A15683",
    },
    {
      id: "operation_category",
      applies: afterReformStart,
      pending: reformPending,
      sourceUrl: SOURCES.CGI_242_NONIES_A,
      sourceKey: "CGI_242_NONIES_A",
    },
    {
      id: "delivery_address_if_different",
      applies: afterReformStart && hasGoods && deliveryDiffers,
      pending: reformPending && hasGoods && deliveryDiffers,
      sourceUrl: SOURCES.CGI_242_NONIES_A,
      sourceKey: "CGI_242_NONIES_A",
    },
    {
      id: "vat_debits_option_mention",
      applies: afterReformStart && vatDebitsOpted,
      pending: reformPending && vatDebitsOpted,
      sourceUrl: SOURCES.CGI_242_NONIES_A,
      sourceKey: "CGI_242_NONIES_A",
    },
  ];

  return rules.map((rule) => {
    let status;
    if (!rule.applies) {
      status = "not_required";
    } else if (rule.pending && !presentMentions[rule.id]) {
      status = "not_yet_required";
    } else if (rule.pending && presentMentions[rule.id]) {
      status = "present";
    } else if (rule.optionalForFranchise && !presentMentions[rule.id]) {
      status = "not_required";
    } else {
      status = presentMentions[rule.id] ? "present" : "missing";
    }
    return {
      id: rule.id,
      status,
      sourceUrl: rule.sourceUrl,
      sourceKey: rule.sourceKey,
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
