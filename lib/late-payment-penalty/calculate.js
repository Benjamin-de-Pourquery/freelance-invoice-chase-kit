import {
  KNOWN_SEMESTER_RATES,
  calendarDaysBetween,
  semesterForDueDate,
  splitLatePeriodBySemester,
} from "./rates.js";

const RECOVERY_INDEMNITY_EUR = 40;
const DAYS_PER_YEAR = 365;

/**
 * @typedef {'professional' | 'private'} DebtorType
 * @typedef {'none' | 'contractual' | 'statutory_default' | 'legal_interest_private' | 'formal_notice_required' | 'floor_minimum' | 'floor_only_unknown_default' | 'unavailable'} RateReason
 */

/**
 * @param {number} value
 * @returns {number}
 */
function roundMoney(value) {
  return Math.round(value * 100) / 100;
}

/**
 * @param {string} semesterKey
 * @param {number | null} contractual
 * @param {DebtorType} debtorType
 */
function resolveRateForSemester(semesterKey, contractual, debtorType) {
  const semesterRates = KNOWN_SEMESTER_RATES[semesterKey];
  const floor = semesterRates?.floorPercent ?? null;
  const warnings = [];
  let needsManualRate = false;
  let rateBeforeFloor = null;
  let rateReason = "none";

  if (debtorType === "private") {
    if (contractual !== null) {
      rateBeforeFloor = contractual;
      rateReason = "contractual";
      return {
        annualRate: contractual,
        rateBeforeFloor,
        rateReason,
        floorPercent: null,
        statutoryDefaultPercent: null,
        bcePercent: null,
        legalInterestProPercent: semesterRates?.legalInterestProPercent ?? null,
        needsManualRate: false,
        warnings,
      };
    }
    if (semesterRates) {
      rateBeforeFloor = semesterRates.legalInterestProPercent;
      rateReason = "legal_interest_private";
      return {
        annualRate: semesterRates.legalInterestProPercent,
        rateBeforeFloor,
        rateReason,
        floorPercent: null,
        statutoryDefaultPercent: null,
        bcePercent: semesterRates.bcePercent,
        legalInterestProPercent: semesterRates.legalInterestProPercent,
        needsManualRate: false,
        warnings,
      };
    }
    needsManualRate = true;
    warnings.push("unknown_semester_rates");
    return {
      annualRate: null,
      rateBeforeFloor: null,
      rateReason: "unavailable",
      floorPercent: null,
      statutoryDefaultPercent: null,
      bcePercent: null,
      legalInterestProPercent: null,
      needsManualRate: true,
      warnings,
    };
  }

  if (contractual !== null) {
    rateBeforeFloor = contractual;
    rateReason = "contractual";
  } else if (semesterRates) {
    rateBeforeFloor = semesterRates.defaultStatutoryPercent;
    rateReason = "statutory_default";
  } else {
    needsManualRate = true;
    warnings.push("unknown_semester_rates");
    if (floor != null) {
      rateBeforeFloor = floor;
      rateReason = "floor_only_unknown_default";
    } else {
      warnings.push("floor_unknown");
      return {
        annualRate: null,
        rateBeforeFloor: null,
        rateReason: "unavailable",
        floorPercent: null,
        statutoryDefaultPercent: null,
        bcePercent: null,
        legalInterestProPercent: null,
        needsManualRate: true,
        warnings,
      };
    }
  }

  let annualRate = rateBeforeFloor;
  if (floor !== null && annualRate != null && annualRate < floor) {
    annualRate = floor;
    rateReason = needsManualRate ? "floor_only_unknown_default" : "floor_minimum";
  }

  return {
    annualRate,
    rateBeforeFloor,
    rateReason,
    floorPercent: floor,
    statutoryDefaultPercent: semesterRates?.defaultStatutoryPercent ?? null,
    bcePercent: semesterRates?.bcePercent ?? null,
    legalInterestProPercent: semesterRates?.legalInterestProPercent ?? null,
    needsManualRate,
    warnings,
  };
}

/**
 * @param {object} input
 * @param {number} input.amountTtc
 * @param {string} input.dueDate YYYY-MM-DD
 * @param {string} input.calcDate YYYY-MM-DD
 * @param {number | null | undefined} input.contractualRatePercent optional annual %
 * @param {DebtorType} input.debtorType
 * @param {string | null | undefined} [input.formalNoticeDate] YYYY-MM-DD, private debtor only:
 *   legal interest runs from the formal notice (C. civ. art. 1231-6).
 */
export function calculateLatePaymentPenalties(input) {
  const {
    amountTtc,
    dueDate,
    calcDate,
    contractualRatePercent,
    debtorType,
    formalNoticeDate,
  } = input;

  const amount = Number(amountTtc);
  const daysLate = Math.max(0, calendarDaysBetween(dueDate, calcDate));
  const isPrivate = debtorType === "private";
  const notice =
    isPrivate && typeof formalNoticeDate === "string" && formalNoticeDate !== ""
      ? formalNoticeDate
      : null;
  // Interest start: day after the due date (L441-10, professionals) or day
  // after the formal notice for a private debtor (C. civ. art. 1231-6),
  // never before the due date.
  const interestFrom =
    notice && calendarDaysBetween(dueDate, notice) > 0 ? notice : dueDate;
  const segments =
    isPrivate && !notice ? [] : splitLatePeriodBySemester(interestFrom, calcDate);
  const interestDays = segments.reduce((sum, seg) => sum + seg.days, 0);
  // Displayed semester: the one of the first interest slice, else the due date's.
  const semester = segments.length
    ? {
        key: segments[0].semesterKey,
        year: Number(segments[0].semesterKey.slice(0, 4)),
        half: segments[0].semesterKey.endsWith("H1") ? "H1" : "H2",
      }
    : semesterForDueDate(dueDate);
  const semesterRates = KNOWN_SEMESTER_RATES[semester.key];

  const base = {
    daysLate,
    interestDays,
    formalNoticeDate: notice,
    semesterKey: semester.key,
    semesterYear: semester.year,
    semesterHalf: semester.half,
    amountTtc: amount,
    interestEur: 0,
    recoveryIndemnityEur: 0,
    totalPenaltiesEur: 0,
    annualRatePercent: null,
    rateBeforeFloorPercent: null,
    rateReason: "none",
    floorPercent: semesterRates?.floorPercent ?? null,
    statutoryDefaultPercent: semesterRates?.defaultStatutoryPercent ?? null,
    bcePercent: semesterRates?.bcePercent ?? null,
    needsManualRate: false,
    warnings: [],
    interestBreakdown: [],
    spansMultipleSemesters: false,
    formula:
      daysLate === 0
        ? null
        : "interest = amount × (annualRate / 100) × (days / 365)",
  };

  if (!Number.isFinite(amount) || amount < 0) {
    return {
      ...base,
      rateReason: "unavailable",
      warnings: ["invalid_amount"],
    };
  }

  if (daysLate === 0) {
    return base;
  }

  if (isPrivate && !notice) {
    return {
      ...base,
      rateReason: "formal_notice_required",
      warnings: ["formal_notice_missing"],
      formula: null,
    };
  }

  const contractual =
    contractualRatePercent === null ||
    contractualRatePercent === undefined ||
    contractualRatePercent === ""
      ? null
      : Number(contractualRatePercent);

  if (contractual !== null && !Number.isFinite(contractual)) {
    return {
      ...base,
      rateReason: "unavailable",
      warnings: ["invalid_contractual_rate"],
    };
  }

  const allWarnings = [];
  let needsManualRate = false;
  let interestEur = 0;
  const interestBreakdown = [];

  for (const segment of segments) {
    const resolved = resolveRateForSemester(
      segment.semesterKey,
      contractual,
      debtorType
    );
    needsManualRate = needsManualRate || resolved.needsManualRate;
    allWarnings.push(...resolved.warnings);

    if (resolved.annualRate == null) {
      return {
        ...base,
        needsManualRate: true,
        warnings: [...new Set(allWarnings)],
        rateReason: "unavailable",
      };
    }

    const segmentInterest = roundMoney(
      amount * (resolved.annualRate / 100) * (segment.days / DAYS_PER_YEAR)
    );
    interestEur += segmentInterest;

    interestBreakdown.push({
      semesterKey: segment.semesterKey,
      days: segment.days,
      startDate: segment.startDate,
      endDate: segment.endDate,
      annualRatePercent: resolved.annualRate,
      rateBeforeFloorPercent: resolved.rateBeforeFloor,
      rateReason: resolved.rateReason,
      floorPercent: resolved.floorPercent,
      bcePercent: resolved.bcePercent,
      interestEur: segmentInterest,
    });
  }

  interestEur = roundMoney(interestEur);

  const spansMultipleSemesters = interestBreakdown.length > 1;
  const primary = interestBreakdown[0];
  const sole = interestBreakdown.length === 1 ? primary : null;

  const recoveryIndemnityEur =
    debtorType === "professional" && daysLate > 0
      ? RECOVERY_INDEMNITY_EUR
      : 0;

  const totalPenaltiesEur = roundMoney(interestEur + recoveryIndemnityEur);

  let annualRatePercent = null;
  if (sole) {
    annualRatePercent = sole.annualRatePercent;
  } else if (interestBreakdown.length > 1 && daysLate > 0) {
    const weighted =
      interestBreakdown.reduce(
        (sum, row) => sum + row.annualRatePercent * row.days,
        0
      ) / interestDays;
    annualRatePercent = Math.round(weighted * 100) / 100;
  }

  const rateReason = sole ? sole.rateReason : primary?.rateReason ?? "none";
  const rateBeforeFloorPercent = sole
    ? sole.rateBeforeFloorPercent
    : primary?.rateBeforeFloorPercent ?? null;

  return {
    ...base,
    interestEur,
    recoveryIndemnityEur,
    totalPenaltiesEur,
    annualRatePercent,
    rateBeforeFloorPercent,
    rateReason,
    needsManualRate,
    warnings: [...new Set(allWarnings)],
    interestBreakdown,
    spansMultipleSemesters,
    floorPercent: sole?.floorPercent ?? base.floorPercent,
    bcePercent: sole?.bcePercent ?? base.bcePercent,
  };
}

/**
 * @param {ReturnType<typeof calculateLatePaymentPenalties>} result
 * @param {object} opts
 * @param {string} opts.dueDate
 * @param {string} opts.calcDate
 * @param {DebtorType} opts.debtorType
 * @param {'fr' | 'en'} opts.lang
 */
export function buildChaseEmailText(result, opts) {
  const { dueDate, calcDate, debtorType, lang } = opts;
  const isFr = lang === "fr";

  if (result.daysLate === 0) {
    return isFr
      ? `Bonjour,\n\nJe me permets de vous rappeler que la facture dont l'échéance était le ${dueDate} reste impayée à ce jour (${calcDate}). Merci de procéder au règlement dans les meilleurs délais ou de me confirmer une date de paiement.\n\nCordialement`
      : `Hello,\n\nThis is a friendly reminder that the invoice due on ${dueDate} remains unpaid as of ${calcDate}. Please arrange payment at your earliest convenience or confirm a payment date.\n\nBest regards`;
  }

  const rate =
    result.annualRatePercent != null
      ? `${result.annualRatePercent.toFixed(2)}%`
      : isFr
        ? "taux en vigueur"
        : "applicable rate";

  const lines = isFr
    ? [
        "Bonjour,",
        "",
        `La facture échue le ${dueDate} n'a pas été réglée à la date du ${calcDate} (${result.daysLate} jour(s) de retard).`,
      ]
    : [
        "Hello,",
        "",
        `The invoice due on ${dueDate} was not paid by ${calcDate} (${result.daysLate} calendar day(s) late).`,
      ];

  if (debtorType === "professional") {
    lines.push(
      isFr
        ? `Conformément à l'article L441-10 du Code de commerce, des pénalités de retard sont exigibles dès le lendemain de l'échéance, sans rappel préalable.`
        : `Under French Commercial Code article L441-10, late-payment penalties are due from the day after the due date, without a prior reminder.`
    );
  } else {
    lines.push(
      isFr
        ? result.formalNoticeDate
          ? `Intérêts au taux de l'intérêt légal à compter de la mise en demeure du ${result.formalNoticeDate} (art. 1231-6 du Code civil).`
          : `Pour un client particulier, l'intérêt au taux légal court à compter de la mise en demeure (art. 1231-6 du Code civil).`
        : result.formalNoticeDate
          ? `Interest at the legal interest rate from the formal notice dated ${result.formalNoticeDate} (French Civil Code art. 1231-6).`
          : `For a private individual debtor, legal interest runs from the formal notice (French Civil Code art. 1231-6).`
    );
  }

  lines.push(
    "",
    isFr
      ? `Montant de la facture (TTC) : ${result.amountTtc.toFixed(2)} €`
      : `Invoice amount (incl. tax): €${result.amountTtc.toFixed(2)}`
  );

  if (result.spansMultipleSemesters && result.interestBreakdown.length > 0) {
    for (const row of result.interestBreakdown) {
      lines.push(
        isFr
          ? `Intérêts ${row.semesterKey} (${row.days} j., ${row.annualRatePercent.toFixed(2)} %) : ${row.interestEur.toFixed(2)} €`
          : `Interest ${row.semesterKey} (${row.days} d., ${row.annualRatePercent.toFixed(2)}%): €${row.interestEur.toFixed(2)}`
      );
    }
    lines.push(
      isFr
        ? `Total intérêts de retard : ${result.interestEur.toFixed(2)} €`
        : `Total late-payment interest: €${result.interestEur.toFixed(2)}`
    );
  } else {
    lines.push(
      isFr
        ? `Intérêts de retard (${rate}, base annuelle) : ${result.interestEur.toFixed(2)} €`
        : `Late-payment interest (${rate}, annual basis): €${result.interestEur.toFixed(2)}`
    );
  }

  if (result.recoveryIndemnityEur > 0) {
    lines.push(
      isFr
        ? `Indemnité forfaitaire de recouvrement (client professionnel, art. D441-5) : ${result.recoveryIndemnityEur.toFixed(2)} €`
        : `Flat recovery indemnity (professional debtor, art. D441-5): €${result.recoveryIndemnityEur.toFixed(2)}`
    );
  } else if (debtorType === "private") {
    lines.push(
      isFr
        ? "Indemnité forfaitaire de recouvrement : non applicable (client particulier)."
        : "Flat recovery indemnity: not applicable (private individual debtor)."
    );
  }

  lines.push(
    "",
    isFr
      ? `Total pénalités estimées : ${result.totalPenaltiesEur.toFixed(2)} € (hors principal). Merci de régulariser le principal et les pénalités, ou de me confirmer une date de paiement.`
      : `Estimated penalties total: €${result.totalPenaltiesEur.toFixed(2)} (excluding principal). Please settle the principal and penalties, or confirm a payment date.`,
    "",
    isFr ? "Cordialement" : "Best regards"
  );

  return lines.join("\n");
}
