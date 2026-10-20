/** Official source URLs for UK B2B late payment statutory interest and compensation. */
export const LAST_VERIFIED = "2026-10-20";

export const BANK_RATE_HISTORY_URL =
  "https://www.bankofengland.co.uk/boeapps/database/Bank-Rate.asp";

export const SOURCE_URLS = {
  govuk_interest:
    "https://www.gov.uk/late-commercial-payments-interest-debt-recovery/charging-interest-commercial-debt",
  govuk_recovery:
    "https://www.gov.uk/late-commercial-payments-interest-debt-recovery/claim-debt-recovery-costs",
  uksi_2002_1675:
    "https://www.legislation.gov.uk/uksi/2002/1675/made",
  ssi_2002_336:
    "https://www.legislation.gov.uk/ssi/2002/336/made",
  commercial_payments_bill:
    "https://www.gov.uk/government/publications/commercial-payments-bill-factsheets/commercial-payments-bill-overview",
};

export const SOURCES = [
  { key: "govuk_interest", url: SOURCE_URLS.govuk_interest },
  { key: "govuk_recovery", url: SOURCE_URLS.govuk_recovery },
  { key: "uksi_2002_1675", url: SOURCE_URLS.uksi_2002_1675 },
  { key: "ssi_2002_336", url: SOURCE_URLS.ssi_2002_336 },
  { key: "bank_rate", url: BANK_RATE_HISTORY_URL },
  { key: "commercial_payments_bill", url: SOURCE_URLS.commercial_payments_bill },
];
