/**
 * Fixed semester rates (F23211, A15398). Never use the live ECB day rate:
 * e.g. BCE 2.65% from 2026-09-16 does not change H2 2026 (still 2.40% at 1 Jul).
 * Last updated: 2026-10-15.
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
 * @param {string} isoDate ISO date
 * @returns {{ year: number, half: 'H1' | 'H2', key: string }}
 */
export function semesterForDate(isoDate) {
  const d = parseIsoDate(isoDate);
  const year = d.getUTCFullYear();
  const month = d.getUTCMonth() + 1;
  const half = month <= 6 ? "H1" : "H2";
  return { year, half, key: `${year}-${half}` };
}

/** @param {string} dueDate ISO date */
export function semesterForDueDate(dueDate) {
  return semesterForDate(dueDate);
}

/**
 * Last calendar day of the semester containing isoDate (UTC).
 * @param {string} isoDate
 */
export function lastDayOfSemester(isoDate) {
  const { year, half } = semesterForDate(isoDate);
  if (half === "H1") {
    return `${year}-06-30`;
  }
  return `${year}-12-31`;
}

/**
 * Add one calendar day to an ISO date.
 * @param {string} isoDate
 */
export function addOneDay(isoDate) {
  const d = parseIsoDate(isoDate);
  d.setUTCDate(d.getUTCDate() + 1);
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/**
 * Split the late period (day after due through calc date) into semester segments.
 * @param {string} dueDate
 * @param {string} calcDate
 * @returns {{ semesterKey: string, days: number, startDate: string, endDate: string }[]}
 */
export function splitLatePeriodBySemester(dueDate, calcDate) {
  const daysLate = calendarDaysBetween(dueDate, calcDate);
  if (daysLate <= 0) {
    return [];
  }

  let cursor = addOneDay(dueDate);
  const segments = [];

  while (calendarDaysBetween(cursor, calcDate) >= 0) {
    const semester = semesterForDate(cursor);
    const semesterEnd = lastDayOfSemester(cursor);
    const segmentEnd =
      calendarDaysBetween(calcDate, semesterEnd) >= 0 ? calcDate : semesterEnd;
    const days = calendarDaysBetween(cursor, segmentEnd) + 1;
    if (days > 0) {
      segments.push({
        semesterKey: semester.key,
        days,
        startDate: cursor,
        endDate: segmentEnd,
      });
    }
    cursor = addOneDay(segmentEnd);
  }

  return segments;
}
