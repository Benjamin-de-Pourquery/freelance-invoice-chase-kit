# Kit Relance Impayés Freelance

> **Canonical repo (EN naming):** https://github.com/Benjamin-de-Pourquery/freelance-invoice-chase-kit  
> Mirrored from Nazruden/kit-relance-impayes-freelance @ 3b7543cb (product v1.1).

Digital pack for freelancers: email and letter templates, checklist, CSV tracker.

**Site:** https://kit-relance-impayes-freelance.vercel.app  
**Repo:** https://github.com/Benjamin-de-Pourquery/freelance-invoice-chase-kit

## Features (v1.5)

- Bilingual landing **FR** (`/`) and **EN** (`/en`) + language toggle
- **Multi-currency checkout** (EUR, USD, GBP) via `POST /api/checkout` when `STRIPE_SECRET_KEY` is set (`sk_test_` only)
- Currency selector on landings and tool CTAs; defaults: FR → EUR, EN → USD, UK tools / `en-GB` → GBP
- Fallback to the legacy Stripe Payment Link (EUR) when the secret key is missing
- **US Edition** (EN) in the pack: chase emails, final demand letter, written-contract checklist, USD tracker
- Pack files in `content/pack/` (not served as static files under `/public`)
- `/succes` and `/en/success`: verify Checkout Session (`session_id`) server-side
- Downloads only through `/api/download` after verified payment
- Terms / Privacy (FR + EN), FAQ, mobile sticky CTA
- E-invoicing 2026 module, invoice checker, EU/US/UK calculators (see below)
- **UK Edition** (EN, GBP) in the pack: B2B chase emails, letter before action, GBP tracker, statutory interest guide (1998 Act)

### Proposed checkout prices (config)

Editable in `lib/checkout/pricing.js` (awaiting owner approval):

| Currency | Amount |
|----------|--------|
| EUR | 19 |
| USD | 21 |
| GBP | 17 |

## Environment variables (Vercel)

| Variable | Required | Example |
|----------|----------|---------|
| `STRIPE_SECRET_KEY` | **Yes** for checkout API and downloads | `sk_test_…` |
| `NEXT_PUBLIC_STRIPE_PAYMENT_LINK` | Optional fallback | `https://buy.stripe.com/test_…` |

Without `STRIPE_SECRET_KEY`, buy buttons use the Payment Link (EUR only) and `/succes` shows a clear configuration message without exposing files.

Default TEST Payment Link: `https://buy.stripe.com/test_dRm9ATeixbYLdQZeZi0oM00`

## Checkout API

`POST /api/checkout` (JSON body):

```json
{
  "currency": "usd",
  "lang": "en",
  "cancelPath": "/en"
}
```

- Creates a Stripe Checkout Session (`mode: payment`) with inline `price_data` for the selected currency
- `locale`: `fr` or `en` to match the page
- Success URL: `/succes?session_id={CHECKOUT_SESSION_ID}` (FR) or `/en/success?session_id={CHECKOUT_SESSION_ID}` (EN)
- Session `metadata.product` = `freelance_invoice_chase_kit` for `/api/verify-session` and `/api/download`

## Test payments (TEST mode only)

1. Deploy preview or run locally with `STRIPE_SECRET_KEY=sk_test_…` in `.env.local`
2. Open `/` or `/en`, pick **EUR**, **USD**, or **GBP**, and click the buy button
3. Card: `4242 4242 4242 4242`, any future expiry, any CVC
4. After redirect, confirm `/succes` or `/en/success` lists downloads
5. Repeat for each currency on the Vercel preview

Legacy Payment Link flow still works when the API is unavailable (no secret key).

## Stack

- Next.js 14 (App Router)
- Stripe Node SDK (Checkout Sessions, server-side verification)
- Vercel

## Local development

```bash
npm install
# .env.local: STRIPE_SECRET_KEY=sk_test_…
npm run dev
npm test
npm run build
```

## Pack content (`content/pack/`)

- `emails-relance.md` : 15 templates + scripts WhatsApp/SMS
- `courrier-mise-en-demeure.md` : modèle LRAR
- `checklist.md` : avant envoi
- `tracker-impayes.csv` : suivi créances
- `guide.md` : usage 1 page
- `facture-electronique-2026-checklist.md` / `e-invoicing-2026-checklist-en.md`
- `relance-facture-electronique-emails.md` / `e-invoicing-chase-emails-en.md`
- **US Edition (EN)** : `us-chase-emails.md`, `us-final-demand-letter.md`, `us-written-contract-checklist.md`, `us-unpaid-invoice-tracker.csv`, `us-edition-guide.md`
- **UK Edition (EN + guide FR)** : `uk-chase-emails.md`, `uk-letter-before-action.md`, `uk-unpaid-invoice-tracker.csv`, `uk-edition-guide.md`, `uk-edition-guide-fr.md`

## Security

- Never commit secrets (`.env*` is gitignored)
- Stripe **TEST** keys only; no live charges on this project
- Pack files stay outside `public/`
- Download routes require a paid session for this product (metadata or Payment Link session)
