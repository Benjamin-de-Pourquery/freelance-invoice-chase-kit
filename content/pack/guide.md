# Guide d'usage — Kit Relance Impayés (1 page)

1. Importe `tracker-impayes.csv` dans Sheets / Excel / Notion.
2. Trie par `age_jours` décroissant, commence par la plus vieille créance.
3. Ouvre `checklist.md` et coche avant chaque envoi.
4. Copie le mail adapté dans `emails-relance.md` (J+7, J+14, J+21, J+30…).
5. Remplace [PRÉNOM], [FACTURE], [MONTANT], [ÉCHÉANCE], [LIEN_PAIEMENT], [TON_PRÉNOM], [SIRET].
6. Si pas de réponse après J+30 amiable → utilise `courrier-mise-en-demeure.md` (LRAR recommandé).
7. Mets à jour le tracker (statut, prochaine_action, date).

## Module Facture électronique 2026

8. Lis `facture-electronique-2026-checklist.md` (FR) ou `e-invoicing-2026-checklist-en.md` (EN) pour le calendrier officiel et la checklist conformité.
9. Renseigne `statut_facture_electronique`, `id_facture_plateforme` et `plateforme_agreee` dans le tracker avant de relancer.
10. Utilise les modèles 16 à 19 dans `relance-facture-electronique-emails.md` (ou la version EN) selon le statut plateforme.

Rappel : ce pack n'est pas un conseil juridique. Dates et obligations : voir economie.gouv.fr et impots.gouv.fr (liens dans les checklists).
