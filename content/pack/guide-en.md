# Usage guide: Overdue Invoice Kit (one page)

1. Import `tracker-impayes.csv` into Sheets, Excel, or Notion.
2. Sort by `age_jours` (days overdue) descending. Start with the oldest balance.
3. Open `checklist.md` and complete it before each send.
4. Copy the right template from `payment-reminder-emails-en.md` (D+7, D+14, D+21, D+30, etc.). French main sequence: `emails-relance.md`.
5. Replace [FIRST_NAME], [INVOICE], [AMOUNT], [CURRENCY], [DUE_DATE], [PAYMENT_LINK], [YOUR_NAME], and tax ID placeholders if you use them.
6. For WhatsApp or SMS, use `whatsapp-sms-scripts-en.md` (soft / firm / urgent). French scripts: `whatsapp-sms-scripts-fr.md`.
7. If no response after friendly D+30 steps, consider `courrier-mise-en-demeure.md` (formal letter template, adapt to your jurisdiction).
8. Update the tracker (status, next action, date).

## E-invoicing module (France 2026)

9. Read `e-invoicing-2026-checklist-en.md` (or the French checklist) for the official timeline and compliance steps.
10. Fill `statut_facture_electronique`, `id_facture_plateforme`, and `plateforme_agreee` in the tracker before chasing.
11. Use templates 16 to 19 in `e-invoicing-chase-emails-en.md` (or the French file) based on platform status.

Reminder: this pack is not legal advice. Verify dates and obligations with official sources linked in the checklists.
