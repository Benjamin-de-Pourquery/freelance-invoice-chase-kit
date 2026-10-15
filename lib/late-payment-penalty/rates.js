/**
 * Known official values aligned with service-public F23211 (BCE + 10 points)
 * and professional legal interest (3× floor) for supported semesters.
 * @type {Record<string, { bcePercent: number, defaultStatutoryPercent: number, legalInterestProPercent: number, floorPercent: number }>}
 */
export const KNOWN_SEMESTER_RATES = {
  "2026-H1": {
    bcePercent: 2.15,
    defaultStatutoryPercent: 12.15,
    legalInterestProPercent: 2.62,
    floorPercent: 7.86,
  },
  "2026-H2": {
    bcePercent: 2.4,
    defaultStatutoryPercent: 12.4,
    legalInterestProPercent: 2.75,
    floorPercent: 8.25,
  },
};

/**
 * @param {string} isoDate YYYY-MM-DD
 * @returns {Date}
 */
export function parseIsoDate(isoDate) {
  const [y, m, d] = isoDate.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

/**
 * Calendar days between two ISO dates (calc minus due).
 * @param {string} dueDate
 * @param {string} calcDate
 */
export function calendarDaysBetween(dueDate, calcDate) {
  const msPerDay = 24 * 60 * 60 * 1000;
  const due = parseIsoDate(dueDate).getTime();
  const calc = parseIsoDate(calcDate).getTime();
  return Math.round((calc - due) / msPerDay);
}

/**
 * @param {string} dueDate ISO date
 * @returns {{ year: number, half: 'H1' | 'H2', key: string }}
 */
export function semesterForDueDate(dueDate) {
  const d = parseIsoDate(dueDate);
  const year = d.getUTCFullYear();
  const month = d.getUTCMonth() + 1;
  const half = month <= 6 ? "H1" : "H2";
  return { year, half, key: `${year}-${half}` };
}
