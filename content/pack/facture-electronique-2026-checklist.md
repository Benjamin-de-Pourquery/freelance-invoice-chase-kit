# Module Facture électronique 2026 (FR)

**Information générale (pas un conseil juridique).** Vérifie toujours les textes officiels et adapte à ta situation.

## Calendrier (résumé)

| Échéance | Qui | Quoi |
|----------|-----|------|
| 1er sept. 2026 | Toutes les entreprises | Capacité de **recevoir** des factures électroniques via une plateforme agréée |
| 1er sept. 2026 | Grandes entreprises et ETI | **Émission** de factures électroniques + **e-reporting** |
| 1er sept. 2027 | PME et micro-entreprises | **Émission** de factures électroniques + **e-reporting** |

Sources : [economie.gouv.fr](https://www.economie.gouv.fr/tout-savoir-sur-la-facturation-electronique-pour-les-entreprises) ; [entreprendre.service-public.fr](https://entreprendre.service-public.gouv.fr/actualites/A18953)

## Checklist mise en conformité (freelance / micro)

### 1. Comprendre ton calendrier
- [ ] Je sais si je suis en réception seule (2026) ou aussi en émission (2027 pour PME / micro)
- [ ] J'ai noté la date limite qui m'applique pour l'émission

### 2. Plateforme agréée
- [ ] J'ai consulté la liste officielle des plateformes immatriculées
- [ ] J'ai choisi (ou mon logiciel utilise) une plateforme agréée pour recevoir, et bientôt émettre
- [ ] Si j'utilise un logiciel « solution compatible », je confirme qu'il transmet via une plateforme agréée

Source liste : [impots.gouv.fr](https://www.impots.gouv.fr/facturation-electronique-et-plateformes-agreees)

### 3. Facture conforme (≠ PDF seul)
- [ ] Je ne compte plus sur un simple PDF ou un scan comme facture électronique B2B assujetti TVA en France
- [ ] Mes factures passent par le circuit plateforme agréée (émission / réception)

Source : [economie.gouv.fr](https://www.economie.gouv.fr/tout-savoir-sur-la-facturation-electronique-pour-les-entreprises)

### 4. Mentions à jour (à partir du 1er sept. 2026)
- [ ] SIREN du client
- [ ] Catégorie d'opération (vente, prestation, ou les deux)
- [ ] Mention TVA sur les débits si applicable
- [ ] Adresse de livraison si différente de l'adresse de facturation

Source : [economie.gouv.fr](https://www.economie.gouv.fr/tout-savoir-sur-la-facturation-electronique-pour-les-entreprises)

### 5. e-reporting (clients particuliers, certains cas à l'étranger)
- [ ] J'ai identifié les opérations hors facture électronique classique (B2C, opérateurs étrangers selon mon activité)
- [ ] Je sais comment ma plateforme transmet les données de transaction / paiement

Source : [economie.gouv.fr](https://www.economie.gouv.fr/tout-savoir-sur-la-facturation-electronique-pour-les-entreprises)

### 6. Relier conformité et relance impayés
- [ ] Chaque facture B2B a un identifiant plateforme noté dans le tracker
- [ ] Je consulte le **statut** sur la plateforme avant d'envoyer un email de relance
- [ ] Je n'envoie pas une mise en demeure sur une facture encore « en cours de traitement » sans vérifier le statut

Source statuts et suivi : [economie.gouv.fr](https://www.economie.gouv.fr/tout-savoir-sur-la-facturation-electronique-pour-les-entreprises)

## Statuts facture électronique → action relance

Utilise la colonne `statut_facture_electronique` du tracker. Adapte les libellés à ta plateforme (les intitulés peuvent varier).

| Statut (exemple) | Signification pratique | Action relance recommandée |
|------------------|------------------------|----------------------------|
| `brouillon` | Pas encore déposée sur la plateforme | Finaliser et déposer avant toute relance paiement |
| `deposee` | Transmise, en attente côté client | Attendre 2 à 5 jours ouvrés, puis rappel doux (template 16) |
| `recue` / `prise_en_charge` | Le client a reçu la facture sur sa plateforme | Relance J+7 classique si échéance dépassée |
| `en_cours_traitement` | Compta en traitement | Relance « forward compta » (template 2 ou 17) |
| `approuvee` / `validee` | Acceptée pour paiement | Relance ferme si date d'échéance passée (template 4) |
| `en_litige` | Contestation ouverte | Pause relance agressive ; échange écrit sur le litige |
| `refusee` | Refus formel | Corriger et redéposer, ou traiter le motif de refus |
| `payee` | Soldée sur la plateforme | Clôturer la ligne tracker ; template 15 |

## Ressources officielles

- Guide pratique DGFiP (PDF) : [impots.gouv.fr](https://www.impots.gouv.fr/sites/default/files/media/1_metier/2_professionnel/EV/2_gestion/290_facturation_electronique/guide_pratique_facturation_electronique.pdf)
- Portail facturation électronique : [impots.gouv.fr](https://www.impots.gouv.fr/facturation-electronique-et-plateformes-agreees)
- Fiche service-public : [entreprendre.service-public.fr](https://entreprendre.service-public.gouv.fr/actualites/A18953)
- Texte fondateur : [Légifrance, ordonnance n° 2021-1190](https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000044131176)
