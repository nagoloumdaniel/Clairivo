# Conformité juridique et fiscale de Clairivo

Dernière vérification : 5 novembre 2026. Ce document résume ce que j'ai pu lire sur des sources officielles. Les points non lus sont marqués « non vérifié » et restent à traiter avant l'ouverture des ventes.

## 1. Situation de départ

- Vendeur : micro-entreprise établie en France.
- Produits : contenus numériques téléchargeables (guides, modèles, mini-formations), livrés immédiatement.
- Clients visés : particuliers de l'Europe francophone (France, Belgique, Suisse, Luxembourg).
- Paiement : Stripe (cartes, Apple Pay, Google Pay).

## 2. TVA

### 2.1 Franchise en base en France (lu)

Source : [service-public.gouv.fr, fiche F21746](https://entreprendre.service-public.gouv.fr/vosdroits/F21746), consultée le 5 novembre 2026.

- Seuils 2026 pour les prestations de services : 37 500 € (seuil de base) et 41 250 € (seuil majoré). Pour la vente de marchandises : 85 000 € et 93 500 €.
- Le seuil unique de 25 000 € prévu par la loi de finances pour 2025 a été abandonné, les seuils 2026 sont inchangés.
- Dépassement du seuil de base : la TVA s'applique au 1er janvier de l'année suivante. Dépassement du seuil majoré : elle s'applique dès le premier jour du dépassement.
- En franchise, les factures sont émises hors taxe avec la mention « TVA non applicable, article 293 B du CGI ».

À trancher : une vente de fichier téléchargeable est en général traitée comme un service fourni par voie électronique, donc le seuil de 37 500 € est le plus probable. **Non vérifié** pour ton cas précis. Le service des impôts des entreprises (SIE) ou les « Conseillers entreprises » peuvent le confirmer par écrit.

Conséquence produit : tant que tu es en franchise, les prix affichés de 2,99 € à 9,99 € sont des prix sans TVA ajoutée. Il n'y a rien à reverser, mais tu ne récupères pas la TVA sur tes achats. Dans la roadmap, la phrase « TVA environ 20 % du TTC » ne s'applique donc qu'après le passage au régime normal.

### 2.2 Ventes aux particuliers des autres pays de l'UE (lu en partie)

Source : [impots.gouv.fr, guichet unique OSS](https://www.impots.gouv.fr/professionnel/suis-je-concerne-0), page modifiée le 22 mars 2024, consultée le 5 novembre 2026.

- Un prestataire établi dans un seul pays de l'UE peut continuer à appliquer la TVA de son pays tant que ses ventes transfrontalières aux particuliers de l'UE restent sous 10 000 € HT par an, pour l'année en cours et l'année précédente.
- Au-dessus, la TVA du pays du client s'applique, avec déclaration possible par le guichet unique OSS.
- La page ne traite pas de la franchise en base des micro-entrepreneurs. **Non vérifié** : comment la franchise s'articule avec l'OSS quand le seuil de 10 000 € est dépassé. Les articles de blogs lus ne sont pas assez fiables pour trancher. À demander au SIE et à confirmer dans le BOFiP avant d'atteindre 10 000 € de ventes UE.

Action produit : suivre dans l'admin le chiffre d'affaires cumulé par pays de l'UE, avec une alerte à 8 000 €.

### 2.3 Belgique, Luxembourg, Suisse

- Belgique et Luxembourg : membres de l'UE, même règle que 2.2.
- Suisse : hors UE. **Non vérifié** : règles de TVA suisse sur les services électroniques vendus par une entreprise étrangère à des particuliers suisses (seuil, obligation d'inscription). À rechercher sur le site de l'Administration fédérale des contributions avant d'ouvrir les ventes en Suisse. Option raisonnable au lancement : ne vendre qu'en France, Belgique et Luxembourg, et ouvrir la Suisse plus tard.

## 3. Droit de rétractation sur contenu numérique (lu)

Source : [Légifrance, article L221-28 du code de la consommation](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000044563170), version en vigueur depuis le 28 mai 2022, consultée le 5 novembre 2026.

Le 13° exclut le droit de rétractation pour la fourniture d'un contenu numérique sans support matériel dont l'exécution a commencé avant la fin du délai de rétractation, si le contrat impose de payer et si les trois conditions suivantes sont réunies :

1. Le client a donné son consentement exprès, avant l'exécution, à ce que la fourniture commence avant la fin du délai de rétractation.
2. Il a reconnu qu'il perdra son droit de rétractation.
3. Le vendeur a confirmé cet accord, conformément au deuxième alinéa de l'article L221-13 (confirmation sur support durable, donc par e-mail).

Conséquences pour le checkout (à construire en phase 6) :
- Une case à cocher non précochée, avec un texte clair, qui couvre les points 1 et 2. Sans la case, pas de paiement.
- L'e-mail de confirmation reprend cet accord (point 3). Il est conservé avec la commande, horodaté.
- Les exceptions du code de la consommation s'interprètent strictement. Si la case manque, le client a 14 jours pour se rétracter.
- **Non vérifié** : l'alinéa exact de L221-13 sur le contenu de la confirmation, et les obligations d'information précontractuelle (articles L221-5 et suivants). À lire en entier avant la rédaction des CGV.

## 4. Cookies et traceurs (lu)

Source : [CNIL, cookies et traceurs : que dit la loi](https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/cookies/que-dit-la-loi), consultée le 5 novembre 2026.

- Consentement préalable pour tout traceur non exempté (article 82 de la loi Informatique et Libertés, directive ePrivacy).
- Le consentement est libre, spécifique, éclairé, univoque et retirable aussi facilement qu'il a été donné.
- Aucun traceur soumis au consentement avant l'accord. Refuser doit être aussi simple qu'accepter. Accepter les CGU ne vaut pas consentement.
- Exemptés : mémorisation du choix de l'utilisateur, authentification, sécurité, panier, équilibrage de charge, certains traceurs de mesure d'audience sous conditions.
- Preuve : Clairivo doit pouvoir démontrer le consentement recueilli (historique de configuration, captures horodatées).

À faire : lire la page CNIL sur les conditions d'exemption de la mesure d'audience avant de choisir l'outil d'analyse. Durées de conservation du cookie et du consentement : **non vérifié** ici.

## 5. Données personnelles (RGPD)

Non lu sur source officielle pour l'instant. À faire en phase 11 : registre des traitements, base légale de chaque traitement, durées de conservation, liste des sous-traitants (Stripe, hébergeur, e-mail, analytics), procédure d'export et d'effacement. Sources à lire : CNIL (rubrique « Les outils de la conformité »), texte du RGPD sur EUR-Lex. Belgique : autorité de protection des données. Suisse : loi fédérale sur la protection des données (LPD).

## 6. Mentions que seul le vendeur peut fournir

- Nom (ou dénomination) et adresse de l'entreprise, SIREN, adresse e-mail de contact.
- Hébergeur du site (nom, adresse, contact).
- Médiateur de la consommation (à désigner et à mentionner pour un professionnel vendant à des consommateurs). **Non vérifié** : liste des médiateurs et procédure d'adhésion.
- Numéro de TVA intracommunautaire s'il y en a un.

## 7. Prochaine vérification

Refaire cette veille avant l'ouverture des ventes et à chaque évolution notable (nouveau pays, passage hors franchise, nouveau traceur), en notant la date.
