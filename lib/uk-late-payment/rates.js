import { parseIsoDate } from "../late-payment-penalty/rates.js";

/**
 * Bank of England official Bank Rate snapshots for UK statutory late-payment interest.
 * Statutory annual rate = 8% + Bank Rate in force on the reference date (SI 2002/1675, art. 4).
 * Reference date: 31 December (interest starts 1 Jan to 30 Jun) or 30 June (interest starts 1 Jul to 31 Dec)
 * immediately before statutory interest starts to run.
 *
 * Bank Rate values: https://www.bankofengland.co.uk/boeapps/database/Bank-Rate.asp
 * Last verified: 2026-10-20.
 *
 * @type {Record<string, { referenceDate: string, bankRatePercent: number, labelEn: string, labelFr: string }>}
 */
export const UK_REFERENCE_PERIODS = {
  "2023-H1": {
    referenceDate: "2022-12-31",
    bankRatePercent: 3.5,
    labelEn: "1 January to 30 June 2023 (Bank Rate on 31 December 2022)",
    labelFr: "1er janvier au 30 juin 2023 (taux BoE au 31 décembre 2022)",
  },
  "2023-H2": {
    referenceDate: "2023-06-30",
    bankRatePercent: 5.0,
    labelEn: "1 July to 31 December 2023 (Bank Rate on 30 June 2023)",
    labelFr: "1er juillet au 31 décembre 2023 (taux BoE au 30 juin 2023)",
  },
  "2024-H1": {
    referenceDate: "2023-12-31",
    bankRatePercent: 5.25,
    labelEn: "1 January to 30 June 2024 (Bank Rate on 31 December 2023)",
    labelFr: "1er janvier au 30 juin 2024 (taux BoE au 31 décembre 2023)",
  },
  "2024-H2": {
    referenceDate: "2024-06-30",
    bankRatePercent: 5.25,
    labelEn: "1 July to 31 December 2024 (Bank Rate on 30 June 2024)",
    labelFr: "1er juillet au 31 décembre 2024 (taux BoE au 30 juin 2024)",
  },
  "2025-H1": {
    referenceDate: "2024-12-31",
    bankRatePercent: 4.75,
    labelEn: "1 January to 30 June 2025 (Bank Rate on 31 December 2024)",
    labelFr: "1er janvier au 30 juin 2025 (taux BoE au 31 décembre 2024)",
  },
  "2025-H2": {
    referenceDate: "2025-06-30",
    bankRatePercent: 4.25,
    labelEn: "1 July to 31 December 2025 (Bank Rate on 30 June 2025)",
    labelFr: "1er juillet au 31 décembre 2025 (taux BoE au 30 juin 2025)",
  },
  "2026-H1": {
    referenceDate: "2025-12-31",
    bankRatePercent: 3.75,
    labelEn: "1 January to 30 June 2026 (Bank Rate on 31 December 2025)",
    labelFr: "1er janvier au 30 juin 2026 (taux BoE au 31 décembre 2025)",
  },
  "2026-H2": {
    referenceDate: "2026-06-30",
    bankRatePercent: 3.75,
    labelEn: "1 July to 31 December 2026 (Bank Rate on 30 June 2026)",
    labelFr: "1er juillet au 31 décembre 2026 (taux BoE au 30 juin 2026)",
  },
};

export const STATUTORY_MARGIN_PERCENT = 8;
export const DAYS_PER_YEAR = 365;

/**
 * First calendar day statutory interest may run (day after the due date).
 * @param {string} dueDate ISO
 */
export function interestStartFromDueDate(dueDate) {
  const d = parseIsoDate(dueDate);
  d.setUTCDate(d.getUTCDate() + 1);
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/**
 * Six-month reference period key for the day statutory interest starts (UTC).
 * @param {string} interestStartIso YYYY-MM-DD
 * @returns {{ periodKey: string, referenceDate: string, bankRatePercent: number | null, statutoryPercent: number | null, labelEn: string, labelFr: string } | null}
 */
export function referencePeriodForInterestStart(interestStartIso) {
  const d = parseIsoDate(interestStartIso);
  const month = d.getUTCMonth() + 1;
  const year = d.getUTCFullYear();
  const periodKey = month >= 7 ? `${year}-H2` : `${year}-H1`;
  const row = UK_REFERENCE_PERIODS[periodKey];
  if (!row) {
    return {
      periodKey,
      referenceDate: month >= 7 ? `${year}-06-30` : `${year - 1}-12-31`,
      bankRatePercent: null,
      statutoryPercent: null,
      labelEn: "",
      labelFr: "",
    };
  }
  const statutoryPercent =
    row.bankRatePercent != null
      ? row.bankRatePercent + STATUTORY_MARGIN_PERCENT
      : null;
  return {
    periodKey,
    referenceDate: row.referenceDate,
    bankRatePercent: row.bankRatePercent,
    statutoryPercent,
    labelEn: row.labelEn,
    labelFr: row.labelFr,
  };
}

/**
 * Fixed debt recovery compensation per invoice (gov.uk).
 * @param {number} amountGbp
 * @returns {number}
 */
export function fixedCompensationGbp(amountGbp) {
  const amount = Number(amountGbp);
  if (!Number.isFinite(amount) || amount < 0) {
    return 0;
  }
  if (amount <= 999.99) {
    return 40;
  }
  if (amount < 10000) {
    return 70;
  }
  return 100;
}
