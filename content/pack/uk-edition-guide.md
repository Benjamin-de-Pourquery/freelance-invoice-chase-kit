# UK Edition usage guide (one page)

Published by Glint. **General information only, not legal advice.**

This UK Edition sits alongside the France/EU and US materials in your pack. Amounts are in **GBP**. It is aimed at **business-to-business** freelance and supplier invoices where UK late payment law may apply.

---

## Recommended order

1. **`uk-unpaid-invoice-tracker.csv`**  
   Import into Google Sheets or Excel. One row per invoice. Update `calc_date` when you chase. Use the formula section below or the Glint calculation logic in `lib/uk-late-payment/calculate.js` (same maths as this guide).

2. **`uk-chase-emails.md`**  
   Friendly reminder, firm reminder, then final reminder before escalation. Optional short text blocks only where you already message the client.

3. **`uk-letter-before-action.md`**  
   After the email sequence, send a formal letter before action (England and Wales: align with the Practice Direction on Pre-Action Conduct; consider Money Claim Online for small claims).

4. **France/EU/US materials**  
   Keep using the FR/EU/US files for clients outside the UK. This edition does not replace VAT, IR35, or contract law advice.

---

## When statutory interest may apply (summary)

The statutory regime for late payment in commercial transactions is set out in the **Late Payment of Commercial Debts (Interest) Act 1998** (https://www.legislation.gov.uk/ukpga/1998/20/contents) in particular **section 5A** for fixed compensation (https://www.legislation.gov.uk/ukpga/1998/20/section/5A), and the **Late Payment of Commercial Debts (Rate of Interest) (No. 3) Order 2002** (SI 2002/1675) for the reference rate (https://www.legislation.gov.uk/uksi/2002/1675/article/4).

In broad terms (verify on GOV.UK and the Acts):

- It applies to **business-to-business** contracts for the supply of goods or services (not consumer contracts).
- If the contract provides a **substantial remedy** for late payment that is fair and reasonable, the statutory regime may not apply in full: see GOV.UK guidance (https://www.gov.uk/late-commercial-payments-interest-debt-recovery/charging-interest-commercial-debt).
- **Statutory interest** runs from the day after the contractual or statutory due date until payment, at **reference rate + 8% per year**. The reference rate is the Bank of England Bank Rate in force on 30 June or 31 December immediately before interest starts to run (SI 2002/1675, art. 4; https://www.bankofengland.co.uk/monetary-policy/the-interest-rate-bank-rate).
- **Fixed compensation** for recovery costs (per invoice): **40 GBP** if the debt is less than 1,000 GBP, **70 GBP** if it is 1,000 GBP to 9,999.99 GBP, **100 GBP** if it is 10,000 GBP or more (Late Payment of Commercial Debts (Interest) Act 1998, section 5A).

You **may be entitled to claim** these sums only where the law and your contract allow. Glint does not assess your contract.

---

## How to compute (tracker formulas)

Use **simple interest** on the principal invoice amount for the days late (consistent with GOV.UK worked examples).

| Column | Meaning | Excel / Sheets formula (row 2 example) |
|--------|---------|------------------------------------------|
| `days_late` | Calendar days after due date | `=MAX(0, calc_date - due_date)` |
| `statutory_rate_percent` | Reference + 8 | `=reference_rate_percent + 8` |
| `statutory_interest_gbp` | Interest to calc_date | `=IF(days_late<=0,0, ROUND(amount_gbp * statutory_rate_percent/100 * days_late/365, 2))` |
| `fixed_compensation_gbp` | Tiered sum | `=IF(days_late<=0,0, IF(amount_gbp<1000,40, IF(amount_gbp<10000,70,100)))` |
| `total_statutory_gbp` | Interest + compensation | `=statutory_interest_gbp + fixed_compensation_gbp` |

Replace `reference_rate_percent` with the Bank of England Bank Rate in force on 30 June or 31 December immediately before interest starts to run, plus 8% (SI 2002/1675, art. 4).

Sample row figures in the CSV use reference rate **3.75%** (Bank Rate on 30 June 2026, for interest starting in the second half of 2026), so a statutory rate of **11.75%**, as an example only: update for your dates.

---

## Free help and court routes

- **Small Business Commissioner** (free service for small business payment issues with larger customers): https://www.smallbusinesscommissioner.gov.uk/
- **England and Wales:** Practice Direction on Pre-Action Conduct (https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part-dealing-with-matter-specific-claim-types/practice-direction-pre-action-conduct-and-protocols) and **Money Claim Online** (https://www.gov.uk/make-court-claim-for-money)
- **Scotland:** simple procedure (https://www.scotcourts.gov.uk/taking-action/simple-procedure/)
- **Northern Ireland:** small claims (https://www.nidirect.gov.uk/articles/small-claims-process)

---

## Commercial Payments Bill (proposed, not yet in force)

The **Commercial Payments Bill** was introduced in the House of Lords and completed third reading in the Lords on 20 October 2026; it must still pass the House of Commons and receive Royal Assent before it becomes law. The government has indicated that many measures would take effect in **late 2027 or early 2028** if enacted.

**Proposed measures described in parliamentary materials (not in force today):** include a **60-day maximum** payment period in many B2B contracts and **mandatory statutory interest** in scope defined in the Bill. Track the Bill on UK Parliament (https://bills.parliament.uk/bills/4128) and official GOV.UK updates before relying on any new rule.

Do not treat Bill provisions as current law in your chases until they are enacted and commenced.

---

## Free calculator on the website

Estimate statutory interest and fixed compensation for one invoice with the free UK late payment calculator: https://freelance-invoice-chase-kit.vercel.app/en/uk-late-payment-calculator

---

## Official sources table

| Topic | Official source |
|-------|-----------------|
| Interest and compensation overview | https://www.gov.uk/late-commercial-payments-interest-debt-recovery/charging-interest-commercial-debt |
| 1998 Act | https://www.legislation.gov.uk/ukpga/1998/20/contents |
| 1998 Act, section 5A (fixed sums) | https://www.legislation.gov.uk/ukpga/1998/20/section/5A |
| SI 2002/1675, art. 4 (reference rate dates) | https://www.legislation.gov.uk/uksi/2002/1675/article/4 |
| Bank of England reference rate | https://www.bankofengland.co.uk/monetary-policy/the-interest-rate-bank-rate |
| Small Business Commissioner | https://www.smallbusinesscommissioner.gov.uk/ |
| Pre-action conduct (E&W) | https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part-dealing-with-matter-specific-claim-types/practice-direction-pre-action-conduct-and-protocols |
| Money Claim Online | https://www.gov.uk/make-court-claim-for-money |
| Scotland simple procedure | https://www.scotcourts.gov.uk/taking-action/simple-procedure/ |
| Northern Ireland small claims | https://www.nidirect.gov.uk/articles/small-claims-process |
| Commercial Payments Bill | https://bills.parliament.uk/bills/4128 |

---

## Disclaimer

Glint provides templates and spreadsheets for freelancers. We are not a law firm. Verify rates, dates, and court limits on the government sources above before you send a letter before action or start a claim.
