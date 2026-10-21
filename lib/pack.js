import path from "path";
import fs from "fs/promises";

/** Allowed downloadable pack files (not exposed under /public). */
export const PACK_FILES = {
  "emails-relance.md": {
    filename: "emails-relance.md",
    label: { fr: "Templates emails de relance (FR)", en: "Payment reminder email templates (FR)" },
    mime: "text/markdown; charset=utf-8",
  },
  "payment-reminder-emails-en.md": {
    filename: "payment-reminder-emails-en.md",
    label: {
      fr: "Emails de relance (EN)",
      en: "Payment reminder emails (EN)",
    },
    mime: "text/markdown; charset=utf-8",
  },
  "whatsapp-sms-scripts-fr.md": {
    filename: "whatsapp-sms-scripts-fr.md",
    label: {
      fr: "Scripts WhatsApp / SMS (FR, 3 niveaux)",
      en: "WhatsApp / SMS scripts (FR, 3 levels)",
    },
    mime: "text/markdown; charset=utf-8",
  },
  "whatsapp-sms-scripts-en.md": {
    filename: "whatsapp-sms-scripts-en.md",
    label: {
      fr: "Scripts WhatsApp / SMS (EN, 3 niveaux)",
      en: "WhatsApp / SMS scripts (EN, 3 levels)",
    },
    mime: "text/markdown; charset=utf-8",
  },
  "courrier-mise-en-demeure.md": {
    filename: "courrier-mise-en-demeure.md",
    label: { fr: "Courrier mise en demeure", en: "Formal demand letter template" },
    mime: "text/markdown; charset=utf-8",
  },
  "checklist.md": {
    filename: "checklist.md",
    label: { fr: "Checklist avant envoi", en: "Pre-send checklist" },
    mime: "text/markdown; charset=utf-8",
  },
  "tracker-impayes.csv": {
    filename: "tracker-impayes.csv",
    label: { fr: "Tracker CSV des impayés", en: "Overdue invoices CSV tracker" },
    mime: "text/csv; charset=utf-8",
  },
  "guide.md": {
    filename: "guide.md",
    label: { fr: "Guide d'usage (1 page, FR)", en: "One-page usage guide (FR)" },
    mime: "text/markdown; charset=utf-8",
  },
  "guide-en.md": {
    filename: "guide-en.md",
    label: { fr: "Guide d'usage (1 page, EN)", en: "One-page usage guide (EN)" },
    mime: "text/markdown; charset=utf-8",
  },
  "facture-electronique-2026-checklist.md": {
    filename: "facture-electronique-2026-checklist.md",
    label: {
      fr: "Facture électronique 2026 : checklist conformité (FR)",
      en: "E-invoicing 2026: compliance checklist (FR)",
    },
    mime: "text/markdown; charset=utf-8",
  },
  "e-invoicing-2026-checklist-en.md": {
    filename: "e-invoicing-2026-checklist-en.md",
    label: {
      fr: "E-invoicing 2026 : checklist (EN)",
      en: "E-invoicing 2026: compliance checklist (EN)",
    },
    mime: "text/markdown; charset=utf-8",
  },
  "relance-facture-electronique-emails.md": {
    filename: "relance-facture-electronique-emails.md",
    label: {
      fr: "Relances facture électronique (FR)",
      en: "E-invoicing reminder emails (FR)",
    },
    mime: "text/markdown; charset=utf-8",
  },
  "e-invoicing-chase-emails-en.md": {
    filename: "e-invoicing-chase-emails-en.md",
    label: {
      fr: "E-invoicing chase emails (EN)",
      en: "E-invoicing reminder emails (EN)",
    },
    mime: "text/markdown; charset=utf-8",
  },
  "us-chase-emails.md": {
    filename: "us-chase-emails.md",
    label: {
      fr: "US Edition : emails de relance (EN)",
      en: "US Edition: chase email templates",
    },
    mime: "text/markdown; charset=utf-8",
  },
  "us-final-demand-letter.md": {
    filename: "us-final-demand-letter.md",
    label: {
      fr: "US Edition : lettre de mise en demeure (EN)",
      en: "US Edition: final demand letter",
    },
    mime: "text/markdown; charset=utf-8",
  },
  "us-written-contract-checklist.md": {
    filename: "us-written-contract-checklist.md",
    label: {
      fr: "US Edition : checklist contrat écrit (EN)",
      en: "US Edition: written contract checklist",
    },
    mime: "text/markdown; charset=utf-8",
  },
  "us-unpaid-invoice-tracker.csv": {
    filename: "us-unpaid-invoice-tracker.csv",
    label: {
      fr: "US Edition : tracker impayés CSV (USD)",
      en: "US Edition: unpaid invoice tracker (USD)",
    },
    mime: "text/csv; charset=utf-8",
  },
  "us-edition-guide.md": {
    filename: "us-edition-guide.md",
    label: {
      fr: "US Edition : guide d'usage (EN)",
      en: "US Edition: one-page usage guide",
    },
    mime: "text/markdown; charset=utf-8",
  },
  "uk-chase-emails.md": {
    filename: "uk-chase-emails.md",
    label: {
      fr: "UK Edition : emails de relance (EN)",
      en: "UK Edition: chase email templates",
    },
    mime: "text/markdown; charset=utf-8",
  },
  "uk-letter-before-action.md": {
    filename: "uk-letter-before-action.md",
    label: {
      fr: "UK Edition : lettre avant action (EN)",
      en: "UK Edition: letter before action",
    },
    mime: "text/markdown; charset=utf-8",
  },
  "uk-unpaid-invoice-tracker.csv": {
    filename: "uk-unpaid-invoice-tracker.csv",
    label: {
      fr: "UK Edition : tracker impayés CSV (GBP)",
      en: "UK Edition: unpaid invoice tracker (GBP)",
    },
    mime: "text/csv; charset=utf-8",
  },
  "uk-edition-guide.md": {
    filename: "uk-edition-guide.md",
    label: {
      fr: "UK Edition : guide d'usage (EN)",
      en: "UK Edition: one-page usage guide",
    },
    mime: "text/markdown; charset=utf-8",
  },
  "uk-edition-guide-fr.md": {
    filename: "uk-edition-guide-fr.md",
    label: {
      fr: "UK Edition : guide rapide (FR)",
      en: "UK Edition: quick guide (FR)",
    },
    mime: "text/markdown; charset=utf-8",
  },
};

export function packDir() {
  return path.join(process.cwd(), "content", "pack");
}

export async function readPackFile(key) {
  const meta = PACK_FILES[key];
  if (!meta) return null;
  const full = path.join(packDir(), meta.filename);
  const resolved = path.resolve(full);
  if (!resolved.startsWith(path.resolve(packDir()))) return null;
  const buf = await fs.readFile(resolved);
  return { ...meta, buf };
}
