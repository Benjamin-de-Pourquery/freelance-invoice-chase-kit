# E-invoicing 2026 module (EN)

**General information only, not legal advice.** Always check official texts and adapt to your situation.

## Timeline (summary)

| Date | Who | What |
|------|-----|------|
| 1 Sept 2026 | All VAT-liable businesses established in France (including VAT franchise) | Must be able to **receive** e-invoices through an approved platform |
| 1 Sept 2026 | Large companies and mid-caps (ETI) | Must **issue** e-invoices and perform **e-reporting** |
| 1 Sept 2027 | SMEs and micro-businesses (including VAT franchise) | Must **issue** e-invoices and perform **e-reporting** |

Sources: [economie.gouv.fr](https://www.economie.gouv.fr/tout-savoir-sur-la-facturation-electronique-pour-les-entreprises) ; [entreprendre.service-public.gouv.fr](https://entreprendre.service-public.gouv.fr/actualites/A18953)

## Compliance checklist (freelancer / micro)

### 1. Know your deadline
- [ ] I know whether I am reception-only in 2026 or also issuing in 2027 (SME / micro)
- [ ] I noted the issuance date that applies to me

### 2. Approved platform
- [ ] I checked the official list of registered platforms (the public portal does not route B2B invoices between businesses; it holds the directory and receives data)
- [ ] I chose (or my software uses) an approved platform to receive and soon issue
- [ ] If I use a "compatible solution", I confirmed it routes through an approved platform

List source: [impots.gouv.fr](https://www.impots.gouv.fr/facturation-electronique-et-plateformes-agreees)

### 3. Compliant invoice (not a plain PDF)
- [ ] I no longer rely on a simple PDF or scan as a B2B e-invoice for VAT-registered B2B in France
- [ ] My invoices go through the approved-platform circuit
- [ ] My invoice uses an accepted structured format (Factur-X, UBL or CII), sent through an approved platform

Source: [economie.gouv.fr](https://www.economie.gouv.fr/tout-savoir-sur-la-facturation-electronique-pour-les-entreprises)

### 4. Updated mandatory fields (from 1 Sept 2026)
- [ ] Customer SIREN
- [ ] Operation category: goods, services, or mixed
- [ ] Mention of the option to pay VAT on debits, if applicable
- [ ] Full delivery address of goods, if different from billing address

Source: [economie.gouv.fr](https://www.economie.gouv.fr/tout-savoir-sur-la-facturation-electronique-pour-les-entreprises)

### 5. e-reporting (B2C, some cross-border cases)
- [ ] I identified operations outside standard B2B e-invoicing
- [ ] I know how my platform sends transaction / payment data

Source: [economie.gouv.fr](https://www.economie.gouv.fr/tout-savoir-sur-la-facturation-electronique-pour-les-entreprises)

### 6. Link compliance and overdue chase
- [ ] Each B2B invoice has a platform ID in the tracker
- [ ] I check **status** on the platform before sending a payment reminder
- [ ] I check the platform status before any formal letter

Status sources: [impots.gouv.fr (status factsheet PDF)](https://www.impots.gouv.fr/sites/default/files/media/1_metier/2_professionnel/EV/2_gestion/290_facturation_electronique/fiches_reforme/fiche-3_v.pdf) ; [Légifrance, ordinance no. 2021-1190](https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000044131176), mandatory statuses: CGI ann. IV art. 41 septies G

## E-invoice status → possible next step

Use the `statut_facture_electronique` column in the tracker. Wording may differ per platform.

| Status (example) | Practical meaning | Possible next step (adapt) |
|------------------|-------------------|----------------------------|
| `brouillon` / draft (in your software, not a platform status) | Not deposited yet | Deposit before chasing payment |
| `deposee` / deposited (mandatory) | Accepted by your platform, timestamped | After 2-5 business days, soft reminder (template 16) |
| `rejetee` / rejected (mandatory) | Rejected by a platform for non-compliance (format, amounts) | Fix and resubmit, do not chase the client |
| `recue` / `mise_a_disposition` / `prise_en_charge` (optional) | Client received or is processing | Day+7 reminder if due date passed (template 2 or 17) |
| `approuvee` / approved (optional) | Accepted for payment | Firm reminder if due date passed (template 18) |
| `en_litige` / `suspendue` / disputed (optional) | Dispute or information requested | Pause chase; written exchange |
| `refusee` / refused (mandatory) | Motivated refusal by client, final | Handle reason; issue a new invoice if needed |
| `encaissee` / collected (mandatory) | Payment received (date and amount) | Close tracker row; template 15 |

The 4 mandatory statuses are Deposited, Rejected, Refused and Collected (Encaissée); others depend on your platform (see CGI ann. IV art. 41 septies G).

## Official resources

- DGFiP practical guide (PDF): [impots.gouv.fr](https://www.impots.gouv.fr/sites/default/files/media/1_metier/2_professionnel/EV/2_gestion/290_facturation_electronique/guide_pratique_facturation_electronique.pdf)
- E-invoicing hub: [impots.gouv.fr](https://www.impots.gouv.fr/facturation-electronique-et-plateformes-agreees)
- Service-public brief: [entreprendre.service-public.gouv.fr](https://entreprendre.service-public.gouv.fr/actualites/A18953)
- Founding text: [Légifrance, ordinance no. 2021-1190](https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000044131176)
