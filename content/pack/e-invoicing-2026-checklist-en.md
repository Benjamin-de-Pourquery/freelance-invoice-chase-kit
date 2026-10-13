# E-invoicing 2026 module (EN)

**General information only, not legal advice.** Always check official texts and adapt to your situation.

## Timeline (summary)

| Date | Who | What |
|------|-----|------|
| 1 Sept 2026 | All businesses | Must be able to **receive** e-invoices through an approved platform |
| 1 Sept 2026 | Large companies and mid-caps (ETI) | Must **issue** e-invoices and perform **e-reporting** |
| 1 Sept 2027 | SMEs and micro-businesses | Must **issue** e-invoices and perform **e-reporting** |

Sources: [economie.gouv.fr](https://www.economie.gouv.fr/tout-savoir-sur-la-facturation-electronique-pour-les-entreprises) ; [entreprendre.service-public.fr](https://entreprendre.service-public.gouv.fr/actualites/A18953)

## Compliance checklist (freelancer / micro)

### 1. Know your deadline
- [ ] I know whether I am reception-only in 2026 or also issuing in 2027 (SME / micro)
- [ ] I noted the issuance date that applies to me

### 2. Approved platform
- [ ] I checked the official list of registered platforms
- [ ] I chose (or my software uses) an approved platform to receive and soon issue
- [ ] If I use a "compatible solution", I confirmed it routes through an approved platform

List source: [impots.gouv.fr](https://www.impots.gouv.fr/facturation-electronique-et-plateformes-agreees)

### 3. Compliant invoice (not a plain PDF)
- [ ] I no longer rely on a simple PDF or scan as a B2B e-invoice for VAT-registered B2B in France
- [ ] My invoices go through the approved-platform circuit

Source: [economie.gouv.fr](https://www.economie.gouv.fr/tout-savoir-sur-la-facturation-electronique-pour-les-entreprises)

### 4. Updated mandatory fields (from 1 Sept 2026)
- [ ] Customer SIREN
- [ ] Operation category (sale, service, or both)
- [ ] VAT on debits mention if applicable
- [ ] Delivery address when different from billing address

Source: [economie.gouv.fr](https://www.economie.gouv.fr/tout-savoir-sur-la-facturation-electronique-pour-les-entreprises)

### 5. e-reporting (B2C, some cross-border cases)
- [ ] I identified operations outside standard B2B e-invoicing
- [ ] I know how my platform sends transaction / payment data

Source: [economie.gouv.fr](https://www.economie.gouv.fr/tout-savoir-sur-la-facturation-electronique-pour-les-entreprises)

### 6. Link compliance and overdue chase
- [ ] Each B2B invoice has a platform ID in the tracker
- [ ] I check **status** on the platform before sending a payment reminder
- [ ] I do not send a formal notice while status is still "processing" without checking

Source on statuses: [economie.gouv.fr](https://www.economie.gouv.fr/tout-savoir-sur-la-facturation-electronique-pour-les-entreprises)

## E-invoice status → chase action

Use the `statut_facture_electronique` column in the tracker. Wording may differ per platform.

| Status (example) | Practical meaning | Suggested chase |
|------------------|-------------------|-----------------|
| `brouillon` / draft | Not deposited yet | Deposit before chasing payment |
| `deposee` / deposited | Sent, pending client side | Wait 2-5 business days, then soft reminder (template 16) |
| `recue` / received | Client received on their platform | Standard day+7 if due date passed |
| `en_cours_traitement` | Accounting in progress | Accounting forward (template 2 or 17) |
| `approuvee` / approved | Accepted for payment | Firm reminder if due date passed (template 4) |
| `en_litige` / disputed | Open dispute | Pause aggressive chase; written exchange on dispute |
| `refusee` / refused | Formal refusal | Fix and resubmit, or handle refusal reason |
| `payee` / paid | Settled on platform | Close tracker row; template 15 |

## Official resources

- DGFiP practical guide (PDF): [impots.gouv.fr](https://www.impots.gouv.fr/sites/default/files/media/1_metier/2_professionnel/EV/2_gestion/290_facturation_electronique/guide_pratique_facturation_electronique.pdf)
- E-invoicing hub: [impots.gouv.fr](https://www.impots.gouv.fr/facturation-electronique-et-plateformes-agreees)
- Service-public brief: [entreprendre.service-public.fr](https://entreprendre.service-public.gouv.fr/actualites/A18953)
- Founding text: [Légifrance, ordinance no. 2021-1190](https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000044131176)
