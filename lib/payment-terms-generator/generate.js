export const UK_CONSULTATION_URL =
  "https://www.gov.uk/government/consultations/makework-pay-employment-status-reform-and-protections-for-the-self-employed";

export function resolveDocumentLocale(pageLang, currency) {
  const code = ["EUR", "USD", "GBP"].includes(currency) ? currency : "EUR";
  if (pageLang === "en") {
    return code === "USD" ? "en-US" : "en-GB";
  }
  if (code === "USD") return "en-US";
  if (code === "GBP") return "en-GB";
  return "fr-FR";
}

export function formatMoney(amount, currency, locale) {
  const value = Number(amount);
  if (!Number.isFinite(value) || value < 0) {
    return `${currency} 0.00`;
  }
  const localeTag =
    locale || (currency === "USD" ? "en-US" : currency === "GBP" ? "en-GB" : "fr-FR");
  try {
    return new Intl.NumberFormat(localeTag, {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return `${currency} ${value.toFixed(2)}`;
  }
}

function formatAgreedFee(input, labels, locale) {
  const raw = String(input.price ?? "").trim();
  if (raw === "") {
    return labels.placeholders.fee;
  }
  const parsed = parseFloat(raw.replace(",", "."));
  if (!Number.isFinite(parsed) || parsed < 0) {
    return labels.placeholders.fee;
  }
  const currency = ["EUR", "USD", "GBP"].includes(input.currency)
    ? input.currency
    : "EUR";
  return formatMoney(parsed, currency, locale);
}

function cleanLine(value, fallback) {
  const trimmed = String(value ?? "").trim();
  return trimmed.length > 0 ? trimmed : fallback;
}

export function generatePaymentTermsStatement(input, labels, options = {}) {
  const pageLang = options.pageLang === "en" ? "en" : "fr";
  const currency = ["EUR", "USD", "GBP"].includes(input.currency)
    ? input.currency
    : "EUR";
  const locale =
    options.locale || resolveDocumentLocale(pageLang, currency);
  const jurisdiction = input.jurisdiction || "other";
  const freelancer = cleanLine(
    input.freelancerName,
    labels.placeholders.freelancer
  );
  const client = cleanLine(input.clientName, labels.placeholders.client);
  const scope = cleanLine(input.scope, labels.placeholders.scope);
  const duration = cleanLine(input.duration, labels.placeholders.duration);
  const amount = formatAgreedFee(input, labels, locale);
  const paymentDue = cleanLine(
    input.paymentDueTerm,
    labels.placeholders.paymentDue
  );
  const paymentMethods = cleanLine(
    input.paymentMethods,
    labels.placeholders.paymentMethods
  );
  const termination = cleanLine(
    input.terminationNotice,
    labels.placeholders.termination
  );

  const lines = [
    labels.documentTitle,
    "",
    `${labels.partiesHeading}`,
    `${labels.freelancerLabel}: ${freelancer}`,
    `${labels.clientLabel}: ${client}`,
    "",
    `${labels.scopeHeading}`,
    scope,
    "",
    `${labels.durationHeading}`,
    duration,
    "",
    `${labels.feeHeading}`,
    amount,
    "",
    `${labels.paymentDueHeading}`,
    paymentDue,
    "",
    `${labels.paymentMethodsHeading}`,
    paymentMethods,
    "",
    `${labels.terminationHeading}`,
    termination,
    "",
    labels.documentFooter,
  ];

  return {
    text: lines.join("\n"),
    jurisdiction,
    freelancer,
    client,
    formattedFee: amount,
  };
}
