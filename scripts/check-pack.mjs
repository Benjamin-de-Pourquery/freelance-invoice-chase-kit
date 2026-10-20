import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const packDir = path.join(root, "content", "pack");

const packModuleUrl = pathToFileURL(path.join(root, "lib", "pack.js")).href;
const { PACK_FILES } = await import(packModuleUrl);

const onDisk = new Set(
  fs.readdirSync(packDir).filter((name) => !name.startsWith("."))
);

const packKeys = Object.keys(PACK_FILES);

for (const key of packKeys) {
  const meta = PACK_FILES[key];
  assert.equal(key, meta.filename, `PACK_FILES key must match filename for ${key}`);
  assert.ok(onDisk.has(meta.filename), `Missing pack file on disk: ${meta.filename}`);
  const full = path.join(packDir, meta.filename);
  assert.ok(fs.statSync(full).isFile(), `Pack path is not a file: ${meta.filename}`);
}

for (const name of onDisk) {
  assert.ok(
    packKeys.includes(name),
    `File in content/pack not registered in PACK_FILES: ${name}`
  );
}

const intensityChecks = [
  {
    file: "whatsapp-sms-scripts-fr.md",
    markers: ["doux", "ferme", "urgent"],
  },
  {
    file: "whatsapp-sms-scripts-en.md",
    markers: ["soft", "firm", "urgent"],
  },
];

for (const { file, markers } of intensityChecks) {
  const text = fs.readFileSync(path.join(packDir, file), "utf8").toLowerCase();
  for (const marker of markers) {
    assert.ok(
      text.includes(marker),
      `${file} must mention intensity level "${marker}"`
    );
  }
}

const usEditionFiles = [
  "us-chase-emails.md",
  "us-final-demand-letter.md",
  "us-written-contract-checklist.md",
  "us-unpaid-invoice-tracker.csv",
  "us-edition-guide.md",
];

for (const filename of usEditionFiles) {
  assert.ok(packKeys.includes(filename), `US Edition pack file missing from PACK_FILES: ${filename}`);
  const text = fs.readFileSync(path.join(packDir, filename), "utf8");
  assert.ok(
    !/[\u2013\u2014]/.test(text),
    `${filename} must not contain en dash or em dash in user-facing copy`
  );
}

console.log(
  `check-pack: OK (${packKeys.length} files, WhatsApp/SMS intensity markers verified, US Edition registered)`
);
