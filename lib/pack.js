import path from "path";
import fs from "fs/promises";

/** Allowed downloadable pack files (not exposed under /public). */
export const PACK_FILES = {
  "emails-relance.md": {
    filename: "emails-relance.md",
    label: { fr: "Templates emails de relance", en: "Payment reminder email templates" },
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
    label: { fr: "Guide d'usage (1 page)", en: "One-page usage guide" },
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
