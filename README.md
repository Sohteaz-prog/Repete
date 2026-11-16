# Répète

Appli web mobile pour apprendre des textes de théâtre : lecture, répétition avec répliques cachées, notation (« Je connais » / « À revoir »), progression, niveaux, badges, classement entre camarades (facultatif).

Un seul fichier HTML, JavaScript sans librairie, aucun serveur à installer. Les données (progression, réglages, textes ajoutés) restent dans le navigateur de l'appareil (localStorage) ; l'appli demande au navigateur de ne pas les effacer. Seule exception : le classement, si on choisit d'y participer (voir plus bas).

> Les textes intégrés sont protégés par le droit d'auteur : usage privé, pour la classe de théâtre.

## Installer sur le téléphone

Ouvrir l'adresse de l'appli (https) dans le navigateur, puis toucher la pastille **« Installer »** en haut de l'accueil, ou :

- **iPhone (Safari)** : bouton Partager, puis « Sur l'écran d'accueil ».
- **Android (Chrome)** : menu ⋮, puis « Installer l'application » ou « Ajouter à l'écran d'accueil » (le bouton « Installer Répète » est aussi dans Réglages › Données).

L'appli s'ouvre alors en plein écran avec son icône et fonctionne hors ligne après la première ouverture. La pastille « Installer » disparaît une fois l'appli installée. La progression est enregistrée sur l'appareil.

## Contenu du dépôt

- `index.html` : toute l'appli
- `manifest.webmanifest`, `sw.js`, icônes (`icon-*.png`, `icon.svg`, `apple-touch-icon.png`, `favicon-32.png`) : installation et mode hors ligne
- `textes-classe.json`, `textes-classe-2.json`, … (facultatifs) : textes partagés avec la classe, chargés au démarrage dans l'ordre, jusqu'au premier fichier absent
- `README.md` : ce fichier

Depuis la 2.06, `index.html` est fabriqué à partir de sources découpées en petits fichiers (gardées hors du dépôt, car elles contiennent les textes protégés). Sur GitHub, on ne met que le fichier assemblé.

## Mettre à jour

Remplacer `index.html` et `sw.js` sur GitHub, puis attendre la coche verte du déploiement (onglet « Actions »). Le numéro du cache dans `sw.js` change à chaque version (`repete-v139` pour la 2.06) : c'est ce qui fait récupérer la nouvelle version aux téléphones.

L'appli s'ouvre toujours tout de suite avec la version gardée sur le téléphone et télécharge la nouvelle en arrière-plan. Depuis la 2.06, quand la nouvelle version est prête, la pastille **« Mise à jour »** apparaît en haut de l'accueil (sans fermer l'appli) : la toucher charge la nouvelle version. Sinon : fermer complètement l'appli et la rouvrir **deux fois**, ou toucher « Vérifier » en bas des Réglages. Le numéro de version de l'appli (« v2.06 ») s'affiche en petit en bas des Réglages.

## Principes

- Une réplique devient « Connue » après des validations sur des jours différents, « Solide » après 5 jours sans « À revoir ».
- Le niveau (1 à 50) suit la maîtrise globale et ne baisse jamais.
- Série de jours, objectif du jour, badges et titres.
- **Accueil** : pastille « Installer » (appli pas encore installée) ou « Mise à jour » (nouvelle version prête) au milieu de la ligne du titre ; guide « Bien démarrer » pour les premiers pas.
- **Animations** réglables : Activées, Réduites (sans mouvement) ou Désactivées (ni animation ni son). Sons des animations désactivés par défaut. Vibration réglable.
- Thème clair / sombre / automatique.
- **Réglages** regroupés en 5 sections repliables avec résumé (Texte et lecture, Apparence, Animations et vibration, Objectif, Données et appli) ; tirer vers le bas depuis le haut des Réglages actualise l'appli (sans indicateur).
- **Sauvegarde** : copie automatique des données (restaurée si elles deviennent illisibles) ; dans les Réglages, export / import de la progression et des notes (fichiers `progression-repete.json`, `notes-repete.json`). Si l'enregistrement sur le téléphone échoue (mémoire pleine, navigation privée…), un bandeau le signale avec un bouton « Sauvegarder » (même effet que « Tout sauvegarder »).
- **Problème inattendu** : l'appli affiche « Un problème est survenu » avec un bouton « Recharger ».
- **Daltonisme** (Réglages) : deux modes (rouge-vert, bleu-jaune) qui changent les couleurs des niveaux et ajoutent des formes.
- **Vérifier** la mise à jour (Réglages, lien discret) : cherche une nouvelle version et recharge l'appli ; un rechargement fait depuis les Réglages y ramène toujours.
- **Importer un texte** (Bibliothèque) : bouton « ＋ Importer un texte » pour ajouter un fichier de textes (`textes-classe.json`). Les textes ajoutés sont listés sous le bouton (« Mes textes ajoutés », repliable), avec « Supprimer ».
- **Onglet Texte** : onglets Texte / Répéter en haut, puis la ligne « Je joue · personnage » (toucher la ligne ou ⇅ pour changer de personnage) et le bouton des options : Surligner mes répliques, Cacher mes répliques, Mes répliques uniquement (avec la fin de la réplique précédente), Voir ma progression, Afficher mes notes, Suivre la lecture. En fin de texte, le bouton « Répéter cette scène » ouvre l'onglet Répéter (sauf en mode « Suivre la lecture »).
- **Notes sur les répliques** (onglet Texte) : toucher une réplique affiche « Ajouter une note » (ou « Note » s'il y en a déjà une). Une note est un texte libre de 300 caractères au plus ; le menu ⋮ de la note permet de la modifier ou de la supprimer. L'interrupteur « Afficher mes notes » (bouton des options de l'onglet Texte) les ouvre toutes sous leur réplique. Le bouton « Notes · n » en haut du texte ouvre la liste des notes de la scène : un appui sur une ligne saute à la réplique. Les notes peuvent aussi s'afficher pendant la Répétition et les Cartes. Stockées sur le téléphone uniquement.
- **Répéter** : deux modes, « Répétition » (toute la scène dans l'ordre, en fil de bulles, avec indices) et « Cartes » (façon flashcards, toutes les répliques ou seulement les « à revoir »). Le bouton « Lancer » est juste sous le choix du mode (« Reprendre » / « Depuis le début » si une séance est en cours), les options en dessous. « Lecture à voix haute » : le lien « Détails » ouvre la vitesse, « Tester la voix » et l'aide pour installer une voix française. Si aucun son ne sort, un petit avertissement le signale (« Aide » pour le conseil complet, ✕ pour le fermer). « Terminer ici » ouvre le bilan sans finir la scène.
- **Minuteur de répétition** (icône en haut de l'accueil et de l'onglet Texte) : durée, nombre de passages, pause, préavis ; alarme sonore, vibration et clignotement réglables. Il s'arrête quand on ouvre « Répéter ».
- **Au rafraîchissement**, l'appli revient sur l'écran où on était (scène, onglet, position). Un lancement à froid repart de l'accueil.

## Bouton retour du téléphone

Il fait la même chose que les boutons « Retour » ou « Fermer » de l'appli. Il referme d'abord ce qui est ouvert (fenêtre, menu, liste, panneau des options) et, dans l'onglet Texte, coupe d'abord « Suivre la lecture » si ce mode est activé. À l'accueil, un premier appui affiche « Appuie encore sur retour pour quitter », un second appui rapproché (2 s) quitte. Limite d'Android : si l'appli est rouverte à froid et qu'on appuie sur retour sans avoir touché l'écran une seule fois, elle se ferme directement.

## Classement (facultatif)

Écran « Classement », depuis « Ma progression ». La participation est volontaire, avec un pseudo de 10 caractères. Seuls le pseudo, le niveau, la série, le nombre de badges et le nombre de répliques répondues sont envoyés à une feuille Google (via un script Apps Script). Aucun texte, aucun nom. La bulle (i) à côté de « Je participe » explique ce qui est envoyé. On peut se retirer à tout moment : la ligne est alors supprimée. Le script est dans `classement-script.gs`, à coller dans la feuille Google.

## Mode admin (profil de test)

Profil parallèle pour tester (données séparées, rien n'est envoyé au classement). On l'ouvre en touchant cinq fois la ligne « Répète · v… » en bas des Réglages, puis le code. Le panneau permet de simuler maîtrise, niveau, série, badges et jours, de rejouer le guide et les animations, de tester le minuteur en accéléré, et (section Diagnostic) d'afficher les messages d'erreur, l'avertissement « aucun son détecté » et le bandeau « enregistrement impossible ». En cas de problème inattendu, le détail de l'erreur s'y affiche (copiable). **Ajouter mon texte** (coller un texte, découpé en répliques par personnage ; export en `textes-classe.json`) est réservé à ce mode.

## Objectif

Présentation avec la classe de théâtre le 19 janvier 2027.
