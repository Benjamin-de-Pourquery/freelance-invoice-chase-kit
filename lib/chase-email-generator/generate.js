const MS_PER_DAY = 86400000;

export function parseIsoDateOnly(iso) {
  if (!iso || typeof iso !== "string") return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso.trim());
  if (!m) return null;
  const y = Number(m[1]);
  const mo = Number(m[2]) - 1;
  const d = Number(m[3]);
  const date = new Date(y, mo, d);
  if (
    date.getFullYear() !== y ||
    date.getMonth() !== mo ||
    date.getDate() !== d
  ) {
    return null;
  }
  return date;
}

export function todayIsoLocal() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function daysOverdue(dueDateIso, referenceIso = todayIsoLocal()) {
  const due = parseIsoDateOnly(dueDateIso);
  const ref = parseIsoDateOnly(referenceIso);
  if (!due || !ref) return 0;
  const diff = Math.floor((ref - due) / MS_PER_DAY);
  return Math.max(0, diff);
}

export function formatDisplayDate(iso, emailLang) {
  const d = parseIsoDateOnly(iso);
  if (!d) return iso || "";
  const locale = emailLang === "fr" ? "fr-FR" : "en-GB";
  return d.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatMoney(amount, currency, emailLang) {
  const n = Number(amount);
  const value = Number.isFinite(n) ? n : 0;
  const locale = emailLang === "fr" ? "fr-FR" : "en-GB";
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return `${value.toFixed(2)} ${currency}`;
  }
}

function greeting(emailLang, contactName) {
  const name = (contactName || "").trim();
  if (emailLang === "fr") {
    return name ? `Bonjour ${name},` : "Bonjour,";
  }
  return name ? `Hi ${name},` : "Hello,";
}

function signOff(emailLang, freelancerName) {
  const who = (freelancerName || "").trim();
  if (emailLang === "fr") {
    return who ? `Cordialement,\n${who}` : "Cordialement,";
  }
  return who ? `Best regards,\n${who}` : "Best regards,";
}

function paymentBlock(emailLang, paymentDetails) {
  const details = (paymentDetails || "").trim();
  if (!details) return [];
  if (emailLang === "fr") {
    return ["", "Coordonnées de paiement :", details];
  }
  return ["", "Payment details:", details];
}

function clientLabel(clientName) {
  return (clientName || "").trim() || "your company";
}

function buildFriendly({ emailLang, contactName, clientName, invoiceNumber, amountFormatted, dueDisplay, daysLate, invoiceDateDisplay, paymentDetails, freelancerName }) {
  const inv = (invoiceNumber || "").trim() || (emailLang === "fr" ? "ci-dessous" : "below");
  const client = clientLabel(clientName);

  if (emailLang === "fr") {
    const subject = `Rappel de paiement : facture ${inv}`;
    const overdueLine =
      daysLate > 0
        ? `Elle est en retard de ${daysLate} jour${daysLate > 1 ? "s" : ""} à ce jour.`
        : "La date d'échéance est atteinte ou imminente.";
    const body = [
      greeting(emailLang, contactName),
      "",
      `Je me permets de revenir vers vous concernant la facture ${inv}, émise le ${invoiceDateDisplay}, pour un montant de ${amountFormatted}, avec échéance au ${dueDisplay}.`,
      overdueLine,
      "",
      `Merci de confirmer la date de règlement ou d'effectuer le paiement dès que possible pour ${client}.`,
      ...paymentBlock(emailLang, paymentDetails),
      "",
      "Si le règlement est déjà parti, un rapide accusé avec référence de virement m'aiderait à rapprocher la comptabilité.",
      "",
      signOff(emailLang, freelancerName),
    ].join("\n");
    return { subject, body };
  }

  const subject = `Payment reminder: invoice ${inv}`;
  const overdueLine =
    daysLate > 0
      ? `It is now ${daysLate} calendar day${daysLate === 1 ? "" : "s"} past the due date.`
      : "The due date is today or imminent.";
  const body = [
    greeting(emailLang, contactName),
    "",
    `I am following up on invoice ${inv}, issued on ${invoiceDateDisplay}, for ${amountFormatted}, due on ${dueDisplay}.`,
    overdueLine,
    "",
    `Please confirm when payment will be made, or settle the invoice when you can for ${client}.`,
    ...paymentBlock(emailLang, paymentDetails),
    "",
    "If payment has already been sent, a short note with the transfer reference would help me reconcile accounts.",
    "",
    signOff(emailLang, freelancerName),
  ].join("\n");
  return { subject, body };
}

function buildFirm({ emailLang, contactName, clientName, invoiceNumber, amountFormatted, dueDisplay, daysLate, paymentDetails, freelancerName }) {
  const inv = (invoiceNumber || "").trim() || (emailLang === "fr" ? "concernée" : "referenced below");
  const client = clientLabel(clientName);

  if (emailLang === "fr") {
    const subject = `Facture ${inv} : relance pour paiement`;
    const body = [
      greeting(emailLang, contactName),
      "",
      `La facture ${inv} (${amountFormatted}, échéance ${dueDisplay}) reste impayée depuis ${daysLate} jour${daysLate > 1 ? "s" : ""}.`,
      "",
      `Merci de régler le montant dû sous 5 jours ouvrés ou de me proposer une date ferme de paiement par retour de mail.`,
      ...paymentBlock(emailLang, paymentDetails),
      "",
      `Sans retour de votre part, je devrai suspendre toute nouvelle prestation pour ${client} jusqu'à régularisation.`,
      "",
      signOff(emailLang, freelancerName),
    ].join("\n");
    return { subject, body };
  }

  const subject = `Invoice ${inv}: follow-up for payment`;
  const body = [
    greeting(emailLang, contactName),
    "",
    `Invoice ${inv} (${amountFormatted}, due ${dueDisplay}) remains unpaid, now ${daysLate} calendar day${daysLate === 1 ? "" : "s"} overdue.`,
    "",
    "Please pay within 5 business days or reply with a firm payment date.",
    ...paymentBlock(emailLang, paymentDetails),
    "",
    `If I do not hear back, I will need to pause further work for ${client} until the balance is cleared.`,
    "",
    signOff(emailLang, freelancerName),
  ].join("\n");
  return { subject, body };
}

function buildFinal({ emailLang, contactName, clientName, invoiceNumber, amountFormatted, dueDisplay, daysLate, paymentDetails, freelancerName }) {
  const inv = (invoiceNumber || "").trim() || (emailLang === "fr" ? "concernée" : "referenced below");
  const client = clientLabel(clientName);

  if (emailLang === "fr") {
    const subject = `Dernier rappel avant suite : facture ${inv}`;
    const body = [
      greeting(emailLang, contactName),
      "",
      `Malgré mes relances, la facture ${inv} (${amountFormatted}, échéance ${dueDisplay}) n'est toujours pas réglée (${daysLate} jour${daysLate > 1 ? "s" : ""} de retard).`,
      "",
      "Je vous demande de procéder au paiement du principal sous 7 jours calendaires.",
      ...paymentBlock(emailLang, paymentDetails),
      "",
      "À défaut, j'envisagerai les démarches habituelles de recouvrement, y compris la facturation des intérêts de retard et indemnités prévus par la loi lorsque la relation est B2B, ainsi que toute procédure formelle adaptée à la situation.",
      "",
      "Ces mentions sont informatives : les montants et voies de recours dépendent de votre contrat et du droit applicable. Utilisez les calculateurs gratuits du site pour estimer les chiffres avant d'engager une suite.",
      "",
      signOff(emailLang, freelancerName),
    ].join("\n");
    return { subject, body };
  }

  const subject = `Final reminder before next steps: invoice ${inv}`;
  const body = [
    greeting(emailLang, contactName),
    "",
    `Despite earlier reminders, invoice ${inv} (${amountFormatted}, due ${dueDisplay}) is still unpaid (${daysLate} calendar day${daysLate === 1 ? "" : "s"} overdue).`,
    "",
    "Please pay the outstanding principal within 7 calendar days.",
    ...paymentBlock(emailLang, paymentDetails),
    "",
    "If not, I may pursue the usual recovery steps, including charging statutory late payment interest and fixed compensation where B2B rules apply, and any formal procedure appropriate to the situation.",
    "",
    "This is informational wording only: amounts and remedies depend on your contract and applicable law. Use the free calculators on this site to estimate figures before taking further action.",
    "",
    signOff(emailLang, freelancerName),
  ].join("\n");
  return { subject, body };
}

export function generateChaseEmail(input) {
  const {
    stage = "friendly",
    emailLang = "en",
    clientName = "",
    contactName = "",
    freelancerName = "",
    invoiceNumber = "",
    amount = 0,
    currency = "EUR",
    invoiceDate = "",
    dueDate = "",
    paymentDetails = "",
    referenceDate = todayIsoLocal(),
  } = input;

  const daysLate = daysOverdue(dueDate, referenceDate);
  const amountFormatted = formatMoney(amount, currency, emailLang);
  const dueDisplay = formatDisplayDate(dueDate, emailLang);
  const invoiceDateDisplay = formatDisplayDate(invoiceDate, emailLang);

  const common = {
    emailLang,
    contactName,
    clientName,
    invoiceNumber,
    amountFormatted,
    dueDisplay,
    daysLate,
    invoiceDateDisplay,
    paymentDetails,
    freelancerName,
  };

  if (stage === "firm") {
    return { ...buildFirm(common), daysLate };
  }
  if (stage === "final") {
    return { ...buildFinal(common), daysLate };
  }
  return { ...buildFriendly(common), daysLate };
}

export function formatEmailForCopy(subject, body) {
  return `Subject: ${subject}\n\n${body}`;
}

export function buildMailtoHref(subject, body) {
  const params = new URLSearchParams();
  params.set("subject", subject);
  params.set("body", body);
  return `mailto:?${params.toString()}`;
}
