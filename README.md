# Répète

Appli web mobile pour apprendre des textes de théâtre : lecture, répétition avec répliques cachées, notation (« Je connais » / « À revoir »), progression, niveaux, badges, classement entre camarades (facultatif).

Un seul fichier HTML, JavaScript sans librairie, aucun serveur à installer. Les données (progression, réglages, textes ajoutés) restent dans le navigateur de l'appareil (localStorage). Seule exception : le classement, si on choisit d'y participer (voir plus bas).

> Les textes intégrés sont protégés par le droit d'auteur : usage privé, pour la classe de théâtre.

## Installer sur le téléphone

Ouvrir l'adresse de l'appli (https) dans le navigateur, puis :

- **iPhone (Safari)** : bouton Partager, puis « Sur l'écran d'accueil ».
- **Android (Chrome)** : menu ⋮, puis « Installer l'application » ou « Ajouter à l'écran d'accueil » (le bouton « Installer Répète » est aussi dans les Réglages).

L'appli s'ouvre alors en plein écran avec son icône et fonctionne hors ligne après la première ouverture. La progression est enregistrée sur l'appareil.

## Contenu du dépôt

- `index.html` : toute l'appli
- `manifest.webmanifest`, `sw.js`, icônes (`icon-*.png`, `icon.svg`, `apple-touch-icon.png`, `favicon-32.png`) : installation et mode hors ligne
- `textes-classe.json`, `textes-classe-2.json`, … (facultatifs) : textes partagés avec la classe, chargés au démarrage dans l'ordre, jusqu'au premier fichier absent
- `README.md` : ce fichier

## Mettre à jour

Remplacer `index.html` et `sw.js` sur GitHub, puis attendre la coche verte du déploiement (onglet « Actions »). Le numéro du cache dans `sw.js` change à chaque version (`repete-v103` devient `repete-v104`, etc.) : c'est ce qui fait récupérer la nouvelle version aux téléphones. Il faut ensuite fermer complètement l'appli et la rouvrir une fois. Le numéro de version de l'appli (« v2.02 ») s'affiche en petit en bas des Réglages.

## Principes

- Une réplique devient « Connue » après des validations sur des jours différents, « Solide » après 5 jours sans « À revoir ».
- Le niveau (1 à 50) suit la maîtrise globale et ne baisse jamais.
- Série de jours, objectif du jour, badges et titres.
- **Animations** réglables : Activées, Réduites (sans mouvement) ou Désactivées (ni animation ni son). Sons des animations désactivés par défaut. Vibration réglable.
- Thème clair / sombre / automatique.
- **Réglages** regroupés en 5 sections repliables avec résumé (Texte et lecture, Apparence, Animations et vibration, Objectif, Données et appli) ; tirer vers le bas depuis le haut des Réglages actualise l'appli (sans indicateur).
- **Sauvegarde** : copie automatique des données (restaurée si elles deviennent illisibles) ; dans les Réglages, export / import de la progression et des notes (fichiers `progression-repete.json`, `notes-repete.json`).
- **Daltonisme** (Réglages) : deux modes (rouge-vert, bleu-jaune) qui changent les couleurs des niveaux et ajoutent des formes.
- **Vérifier** la mise à jour (Réglages, lien discret) : cherche une nouvelle version et recharge l'appli ; un rechargement fait depuis les Réglages y ramène toujours.
- **Ajouter mon texte** : coller un texte, il est découpé en répliques par personnage ; export et import possibles (fichier `textes-classe.json`).
- **Notes sur les répliques** (onglet Texte, version test) : un libellé « ✎ Notes » en haut à droite de chaque réplique ; une note est un texte libre (obligatoire, 300 caractères). Une réplique qui a une note affiche un petit chevron : un appui déplie ou replie la note, avec « Modifier » et « Supprimer ». Le bouton « Notes · n » en haut à gauche du texte ouvre la liste des notes de la scène : un appui sur une ligne saute à la réplique. Stockées sur le téléphone uniquement.
- **Au rafraîchissement**, l'appli revient sur l'écran où on était (scène, onglet, position). Un lancement à froid repart de l'accueil.

## Bouton retour du téléphone

Il fait la même chose que les boutons « Retour » ou « Fermer » de l'appli. À l'accueil, un premier appui affiche « Appuie encore sur retour pour quitter », un second appui rapproché (2 s) quitte. Limite d'Android : si l'appli est rouverte à froid et qu'on appuie sur retour sans avoir touché l'écran une seule fois, elle se ferme directement.

## Classement (facultatif)

Écran « Classement », depuis « Ma progression ». La participation est volontaire, avec un pseudo de 10 caractères. Seuls le pseudo, le niveau, la série, le nombre de badges et le nombre de répliques répondues sont envoyés à une feuille Google (via un script Apps Script). Aucun texte, aucun nom. On peut se retirer à tout moment : la ligne est alors supprimée. Le script est dans `classement-script.gs`, à coller dans la feuille Google.

## Mode admin (profil de test)

Profil parallèle pour tester (données séparées, rien n'est envoyé au classement). On l'ouvre en touchant cinq fois la ligne « Répète · v… » en bas des Réglages, puis le code. Le panneau permet de simuler maîtrise, niveau, série, badges, jours, et contient le journal du bouton retour.

## Objectif

Présentation avec la classe de théâtre le 19 janvier 2027.
