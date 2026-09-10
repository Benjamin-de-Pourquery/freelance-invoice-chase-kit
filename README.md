# Kit Relance Impayés Freelance

> **Canonical repo (EN naming):** https://github.com/Benjamin-de-Pourquery/freelance-invoice-chase-kit  
> Mirrored from Nazruden/kit-relance-impayes-freelance @ 3b7543cb (product v1.1).

Pack digital **19 €** (Stripe TEST) pour freelances : templates emails / courrier, checklist, tracker CSV.

**Site :** https://kit-relance-impayes-freelance.vercel.app  
**Repo :** https://github.com/Benjamin-de-Pourquery/freelance-invoice-chase-kit

## Fonctionnalités (v1.1)

- Landing bilingue **FR** (`/`) et **EN** (`/en`) + toggle
- Pack riche dans `content/pack/` — **pas** servi en statique sous `/public`
- Page `/succes` : vérifie la Checkout Session Stripe (`session_id`) via API si `STRIPE_SECRET_KEY` est set
- Downloads uniquement via `/api/download` après paiement vérifié
- Mentions / Terms + Confidentialité / Privacy (FR + EN) + disclaimer
- FAQ, UX mobile (CTA sticky), Payment Link configurable

## Variables d'environnement (Vercel)

| Variable | Requis | Exemple |
|---|---|---|
| `STRIPE_SECRET_KEY` | **Oui** pour débloquer les downloads | `sk_test_…` |
| `NEXT_PUBLIC_STRIPE_PAYMENT_LINK` | Optionnel | `https://buy.stripe.com/test_…` |

Sans `STRIPE_SECRET_KEY`, `/succes` affiche un message clair « configure STRIPE_SECRET_KEY » et **n'expose pas** les fichiers.

Payment Link TEST par défaut : `https://buy.stripe.com/test_dRm9ATeixbYLdQZeZi0oM00`  
Price TEST : `price_1UE5ExFmPnFPvlGKCcbNKf0J` · Product : `prod_VEYLBnggQI5JXo`

Success URL Stripe (déjà) :  
`https://kit-relance-impayes-freelance.vercel.app/succes?session_id={CHECKOUT_SESSION_ID}`

## Test paiement (zéro live)

1. Ouvre le Payment Link TEST
2. Carte : `4242 4242 4242 4242` — date future — CVC quelconque
3. Après redirect → `/succes?session_id=cs_test_…`
4. Si `sk_test_` est configuré sur Vercel → téléchargements débloqués

## Stack

- Next.js 14 (App Router)
- Stripe Node SDK (vérification session uniquement — pas de PaymentIntent live)
- Vercel

## Dev local

```bash
npm install
# .env.local : STRIPE_SECRET_KEY=sk_test_…  (optionnel)
npm run dev
```

## Contenu du pack (`content/pack/`)

- `emails-relance.md` — 15 templates + scripts WhatsApp/SMS
- `courrier-mise-en-demeure.md` — modèle LRAR
- `checklist.md` — avant envoi
- `tracker-impayes.csv` — suivi créances
- `guide.md` — usage 1 page

## Sécurité

- Ne commit **jamais** de secrets (`.env*` ignoré)
- Zéro Stripe live / zéro dépense réelle sur ce projet de démo
- Fichiers pack hors `public/`
