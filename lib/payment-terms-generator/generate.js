export const UK_CONSULTATION_URL =
  "https://www.gov.uk/government/consultations/makework-pay-employment-status-reform-and-protections-for-the-self-employed";

const CURRENCY_LOCALE = {
  EUR: "fr-FR",
  USD: "en-US",
  GBP: "en-GB",
};

export function formatMoney(amount, currency) {
  const value = Number(amount);
  if (!Number.isFinite(value) || value < 0) {
    return `${currency} 0.00`;
  }
  const locale = CURRENCY_LOCALE[currency] || "en-GB";
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return `${currency} ${value.toFixed(2)}`;
  }
}

function cleanLine(value, fallback) {
  const trimmed = String(value ?? "").trim();
  return trimmed.length > 0 ? trimmed : fallback;
}

export function generatePaymentTermsStatement(input, labels) {
  const jurisdiction = input.jurisdiction || "other";
  const freelancer = cleanLine(
    input.freelancerName,
    labels.placeholders.freelancer
  );
  const client = cleanLine(input.clientName, labels.placeholders.client);
  const scope = cleanLine(input.scope, labels.placeholders.scope);
  const duration = cleanLine(input.duration, labels.placeholders.duration);
  const currency = ["EUR", "USD", "GBP"].includes(input.currency)
    ? input.currency
    : "EUR";
  const amount = formatMoney(
    parseFloat(String(input.price).replace(",", ".")) || 0,
    currency
  );
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
    labels.governingNote[jurisdiction] || labels.governingNote.other,
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
