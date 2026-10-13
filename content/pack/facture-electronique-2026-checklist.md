# Module Facture électronique 2026 (FR)

**Information générale (pas un conseil juridique).** Vérifie toujours les textes officiels et adapte à ta situation.

## Calendrier (résumé)

| Échéance | Qui | Quoi |
|----------|-----|------|
| 1er sept. 2026 | Toutes les entreprises assujetties à la TVA établies en France (y compris franchise en base) | Capacité de **recevoir** des factures électroniques via une plateforme agréée |
| 1er sept. 2026 | Grandes entreprises et ETI | **Émission** de factures électroniques + **e-reporting** |
| 1er sept. 2027 | PME et micro-entreprises (y compris franchise en base) | **Émission** de factures électroniques + **e-reporting** |

Sources : [economie.gouv.fr](https://www.economie.gouv.fr/tout-savoir-sur-la-facturation-electronique-pour-les-entreprises) ; [entreprendre.service-public.gouv.fr](https://entreprendre.service-public.gouv.fr/actualites/A18953)

## Checklist mise en conformité (freelance / micro)

### 1. Comprendre ton calendrier
- [ ] Je sais si je suis en réception seule (2026) ou aussi en émission (2027 pour PME / micro)
- [ ] J'ai noté la date limite qui s'applique à moi pour l'émission

### 2. Plateforme agréée
- [ ] J'ai consulté la liste officielle des plateformes immatriculées (ex-PDP ; le portail public ne transmet pas les factures entre entreprises, il tient l'annuaire et reçoit les données)
- [ ] J'ai choisi (ou mon logiciel utilise) une plateforme agréée pour recevoir, et bientôt émettre
- [ ] Si j'utilise un logiciel « solution compatible », je confirme qu'il transmet via une plateforme agréée

Source liste : [impots.gouv.fr](https://www.impots.gouv.fr/facturation-electronique-et-plateformes-agreees)

### 3. Facture conforme (≠ PDF seul)
- [ ] Je ne compte plus sur un simple PDF ou un scan comme facture électronique B2B assujetti TVA en France
- [ ] Mes factures passent par le circuit plateforme agréée (émission / réception)
- [ ] Ma facture est dans un format structuré accepté (Factur-X, UBL ou CII), transmise via une plateforme agréée

Source : [economie.gouv.fr](https://www.economie.gouv.fr/tout-savoir-sur-la-facturation-electronique-pour-les-entreprises)

### 4. Mentions à jour (à partir du 1er sept. 2026)
- [ ] SIREN du client
- [ ] Catégorie de l'opération : livraison de biens, prestation de services, ou mixte
- [ ] Mention de l'option pour le paiement de la TVA d'après les débits, le cas échéant
- [ ] Adresse complète de livraison du bien, si différente de l'adresse de facturation

Source : [economie.gouv.fr](https://www.economie.gouv.fr/tout-savoir-sur-la-facturation-electronique-pour-les-entreprises)

### 5. e-reporting (clients particuliers, certains cas à l'étranger)
- [ ] J'ai identifié les opérations hors facture électronique classique (B2C, opérateurs étrangers selon mon activité)
- [ ] Je sais comment ma plateforme transmet les données de transaction / paiement

Source : [economie.gouv.fr](https://www.economie.gouv.fr/tout-savoir-sur-la-facturation-electronique-pour-les-entreprises)

### 6. Relier conformité et relance impayés
- [ ] Chaque facture B2B a un identifiant plateforme noté dans le tracker
- [ ] Je consulte le **statut** sur la plateforme avant d'envoyer un email de relance
- [ ] Je vérifie le statut plateforme avant tout courrier formel

Source statuts : [impots.gouv.fr (fiche statuts)](https://www.impots.gouv.fr/sites/default/files/media/1_metier/2_professionnel/EV/2_gestion/290_facturation_electronique/fiches_reforme/fiche-3_v.pdf) ; cadre légal : [Légifrance, CGI ann. IV art. 41 septies G](https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000044131176)

## Statuts facture électronique → piste de relance

Utilise la colonne `statut_facture_electronique` du tracker. Adapte les libellés à ta plateforme (les intitulés peuvent varier).

| Statut (exemple) | Signification pratique | Piste de relance (à adapter) |
|------------------|------------------------|------------------------------|
| `brouillon` (dans ton logiciel, pas un statut plateforme) | Pas encore déposée | Déposer avant toute relance paiement |
| `deposee` (obligatoire) | Acceptée par ta plateforme, horodatée | Après 2 à 5 jours ouvrés, rappel doux (modèle 16) |
| `rejetee` (obligatoire) | Refusée par une plateforme pour non-conformité (format, montants) | Corriger et redéposer, pas de relance client |
| `recue` / `mise_a_disposition` / `prise_en_charge` (facultatifs) | Le client l'a reçue ou la traite | Relance J+7 si échéance dépassée (modèle 2 ou 17) |
| `approuvee` (facultatif) | Acceptée pour paiement | Relance ferme si échéance passée (modèle 18) |
| `en_litige` / `suspendue` (facultatifs) | Contestation ou complément demandé | Pause de la relance ; échange écrit |
| `refusee` (obligatoire) | Refus motivé par le client, définitif | Traiter le motif, émettre une nouvelle facture si besoin |
| `encaissee` (obligatoire) | Paiement reçu (date et montant) | Clôturer la ligne ; modèle 15 |

Les 4 statuts obligatoires sont Déposée, Rejetée, Refusée et Encaissée ; les autres dépendent de ta plateforme (voir art. 41 septies G ann. IV CGI).

## Ressources officielles

- Guide pratique DGFiP (PDF) : [impots.gouv.fr](https://www.impots.gouv.fr/sites/default/files/media/1_metier/2_professionnel/EV/2_gestion/290_facturation_electronique/guide_pratique_facturation_electronique.pdf)
- Portail facturation électronique : [impots.gouv.fr](https://www.impots.gouv.fr/facturation-electronique-et-plateformes-agreees)
- Fiche service-public : [entreprendre.service-public.gouv.fr](https://entreprendre.service-public.gouv.fr/actualites/A18953)
- Texte fondateur : [Légifrance, ordonnance n° 2021-1190](https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000044131176)
