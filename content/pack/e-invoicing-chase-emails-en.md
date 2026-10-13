# E-invoicing payment reminders (EN)

Add-on to the main email pack. Replace [PLATFORM_ID], [PLATFORM_STATUS], [PLATFORM], [DEPOSIT_DATE].

---

## 16. Deposited, not yet visible to client
**Subject:** Invoice [FACTURE] on [PLATFORM] (ref. [PLATFORM_ID])

Hi [PRÉNOM],

I deposited invoice [FACTURE] ([MONTANT] €) on approved platform [PLATFORM] on [DEPOSIT_DATE]. Reference: [PLATFORM_ID].

Can you confirm you see it in your workspace (current status: [PLATFORM_STATUS])?

If needed, forward to accounting with this reference.

Thanks,
[TON_PRÉNOM]

---

## 17. Status "processing" (accounting)
**Subject:** Invoice [FACTURE]: status [PLATFORM_STATUS] on [PLATFORM]

Hi [PRÉNOM],

On [PLATFORM], invoice [FACTURE] ([MONTANT] €) shows as "[PLATFORM_STATUS]" (ref. [PLATFORM_ID]).

Can you share a payment date or the accounting contact handling this file?

Contractual due date: [ÉCHÉANCE].

[TON_PRÉNOM]

---

## 18. Approved on platform, payment late
**Subject:** Payment due: invoice [FACTURE] (approved on [PLATFORM])

Hi [PRÉNOM],

Invoice [FACTURE] ([MONTANT] €) is approved on [PLATFORM] (ref. [PLATFORM_ID]) but payment is still outstanding (due: [ÉCHÉANCE]).

Please confirm transfer within 5 business days or a firm date.

IBAN / link: [LIEN_PAIEMENT]

Best regards,
[TON_PRÉNOM]

---

## 19. Refused or disputed on platform
**Subject:** Invoice [FACTURE]: status [PLATFORM_STATUS] on [PLATFORM]

Hi [PRÉNOM],

I see status "[PLATFORM_STATUS]" for [FACTURE] on [PLATFORM] (ref. [PLATFORM_ID]).

Please tell me the reason and what is missing to fix it. I can correct and resubmit if needed.

[TON_PRÉNOM]

---

## Note

Approved platforms expose invoice lifecycle statuses for tracking. General information: [economie.gouv.fr](https://www.economie.gouv.fr/tout-savoir-sur-la-facturation-electronique-pour-les-entreprises). This is not legal or accounting advice.
