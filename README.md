# Répète

Appli web mobile pour apprendre des textes de théâtre : lecture, répétition avec répliques cachées, notation (« Je connais » / « À répéter »), progression, niveaux, badges, classement entre camarades (facultatif).

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
- `textes-classe.json`, `textes-classe-2.json`, … (facultatifs) : textes partagés avec la classe, relus à chaque ouverture (avec réseau) dans l'ordre, jusqu'au premier fichier absent. Corriger des mots ne touche pas à la progression ; ajouter ou retirer une réplique dans une scène remet la progression de cette scène à zéro (un message le dit), car elle est rangée par position de réplique.
- `README.md` : ce fichier

Depuis la 2.06, `index.html` est fabriqué à partir de sources découpées en petits fichiers (gardées hors du dépôt, car elles contiennent les textes protégés). Sur GitHub, on ne met que le fichier assemblé.

## Mettre à jour

Remplacer `index.html` et `sw.js` sur GitHub, puis attendre la coche verte du déploiement (onglet « Actions »). Le numéro du cache dans `sw.js` change à chaque version (`repete-v157` pour la 2.08) : c'est ce qui fait récupérer la nouvelle version aux téléphones.

L'appli s'ouvre toujours tout de suite avec la version gardée sur le téléphone et télécharge la nouvelle en arrière-plan. Quand une nouvelle version est publiée, la pastille **« Mise à jour »** apparaît en haut de l'accueil, même si l'appli était restée ouverte ou en arrière-plan (elle lit le petit fichier `sw.js` en revenant au premier plan, et toutes les 5 min tant que l'appli est affichée) : la toucher affiche « Mise à jour… » puis charge la nouvelle version. Sinon : fermer complètement l'appli et la rouvrir **deux fois**, ou toucher « Vérifier » en bas des Réglages. Le numéro de version de l'appli (« v2.08 ») s'affiche en petit en bas des Réglages.

## Principes

- Une réplique devient « Connue » après des validations sur des jours différents, « Solide » après 5 jours sans « À répéter ».
- La journée change à **4 h du matin** (une répétition tard le soir compte pour la veille) ; le compte à rebours « J-x » change à minuit.
- Le niveau (1 à 50) suit la maîtrise globale et ne baisse jamais.
- Série de jours, objectif du jour, badges et titres.
- **Accueil** : une pastille au milieu de la ligne du titre, par ordre de priorité : « Mise à jour » (nouvelle version prête), « Sauvegarder » (rappel de sauvegarde), « Installer » (appli pas encore installée) ; guide « Bien démarrer » pour les premiers pas.
- **Animations** réglables : Activées, Réduites (sans mouvement) ou Désactivées (ni animation ni son). Sons des animations désactivés par défaut. Vibration réglable.
- Thème clair / sombre / automatique.
- **Fenêtres** : les Réglages et le minuteur s'ouvrent en sortant de leur bouton et y retournent en se fermant (✕, bouton retour, toucher le fond, ou les pousser vers le haut depuis la petite barre du bas : la fenêtre suit le doigt). La Préparation s'ouvre en plein écran depuis le bas et se ferme en glissant vers le bas.
- **Réglages** regroupés en 5 sections repliables avec résumé (Texte et lecture, Apparence, Animations et vibration, Objectif, Données et appli) ; tirer vers le bas depuis le haut des Réglages actualise l'appli (sans indicateur).
- **Sauvegarde** : copie automatique des données (restaurée si elles deviennent illisibles) ; dans Réglages › Données, « Sauvegarder » / « Restaurer » (fichiers `progression-repete.json`, `notes-repete.json`) et la date de la dernière sauvegarde. **Rappel de sauvegarde** : tous les 30 jours si on a répété depuis (et une dernière fois dans les 7 jours avant la date objectif), la pastille « Sauvegarder » ouvre une fenêtre « Plus tard » (revient dans 3 jours) / « Sauvegarder » / « Ne plus me le rappeler » ; interrupteur « Me rappeler de sauvegarder » dans Réglages › Données. Si l'enregistrement sur le téléphone échoue (mémoire pleine, navigation privée…), un bandeau le signale avec un bouton « Sauvegarder ».
- **Problème inattendu** : l'appli affiche « Un problème est survenu » avec un bouton « Recharger ».
- **Daltonisme** (Réglages) : deux modes (rouge-vert, bleu-jaune) qui changent les couleurs des niveaux et ajoutent des formes.
- **Vérifier** la mise à jour (Réglages, lien discret) : cherche une nouvelle version et recharge l'appli ; un rechargement fait depuis les Réglages y ramène toujours.
- **Importer un texte** (Bibliothèque) : bouton « ＋ Importer un texte » pour ajouter un fichier de textes (`textes-classe.json`). Les textes ajoutés sont listés sous le bouton (« Mes textes ajoutés », repliable), avec « Supprimer ».
- **Préparation de la scène** (costumes, accessoires, sons… ; bouton à côté de « Répéter » dans Mes scènes, et sur la ligne des notes dans l'onglet Texte) : liste à cocher ; « Son : sifflet » affiche « Son » en étiquette. Toucher le texte d'un élément le modifie ; ✕ demande une confirmation (« Annuler » ou la poubelle rouge).
- **Mes scènes** : « Répliques à travailler » avec deux onglets, « À répéter » et « À rafraîchir » (« Aucune réplique… » s'il n'y en a pas) ; « Répéter ces n répliques ▾ » propose « Répliques » (chacune précédée de la réplique qui l'amène) ou « Cartes ». Le panneau se replie en touchant ailleurs. Toucher le cercle de maîtrise d'une scène ouvre « Maîtrise de la scène » : chaque statut (Solides, Connues par nombre de jours, À répéter, Nouvelles) se déplie sur ses répliques.
- **Onglet Texte** : onglets Texte / Répéter en haut, puis la ligne « Je joue · personnage » (seulement dans l'onglet Texte) (toucher la ligne ou ⇅ pour changer de personnage) et le bouton des options : Surligner mes répliques, Cacher mes répliques, Mes répliques uniquement (avec la fin de la réplique précédente), Voir ma progression, Afficher mes notes, Suivre la lecture. En fin de texte, le bouton « Répéter cette scène » ouvre l'onglet Répéter (sauf en mode « Suivre la lecture »). En « Suivre la lecture », la réplique suivie est agrandie et toucher n'importe où passe à la suivante. Toucher une réplique, puis « Répéter d'ici », propose les trois modes.
- **Notes sur les répliques** (onglet Texte) : toucher une réplique affiche « Ajouter une note » (ou « Note » s'il y en a déjà une). Une note est un texte libre de 300 caractères au plus ; le menu ⋮ de la note permet de la modifier ou de la supprimer. L'interrupteur « Afficher mes notes » (bouton des options de l'onglet Texte) les ouvre toutes sous leur réplique. Le bouton « Notes · n » en haut du texte ouvre la liste des notes de la scène : un appui sur une ligne saute à la réplique. Les notes peuvent aussi s'afficher pendant la Répétition et les Cartes. Stockées sur le téléphone uniquement.
- **Répéter** : trois modes. « Répliques » (toute la scène dans l'ordre, en fil de bulles ; « Souffler » donne un indice), qui commence juste avant ta première réplique ; option « Uniquement les « à répéter » » (chacune précédée de la réplique qui l'amène). « Cartes » (façon flashcards, toutes les répliques ou seulement les « à répéter » ; glisser à droite / à gauche pour répondre). « Italienne » (la voix lit les répliques des autres, sans notation ; options « Aller à ma réplique », « Cacher mes répliques », « Afficher mes notes » ; boutons « Précédente » / « Suivante », ou glisser vers le haut / le bas). En Répliques et Cartes, un toucher arrivé moins de 0,5 s après le précédent est ignoré (évite de sauter une réplique). Le bilan de fin montre les répliques « Soufflées », puis deux onglets : « Évolution » (ce qui a changé) et « Stables » ; ses boutons sont en bas de l'écran (« Reprendre », « Refaire les à répéter », « Recommencer », « Mes scènes ») ; la flèche ‹ ramène aux options. Le bouton « Lancer » est juste sous le choix du mode (« Reprendre » / « Depuis le début » si une séance est en cours), les options en dessous.
- **Italienne mains libres** (option, avec bulle (i)) : la voix lit les autres et enchaîne ; à ta réplique, un blanc « À toi… n s » (calculé sur le nombre de syllabes : environ 0,22 s par syllabe + 1 s, de 2 à 45 s ; le toucher le termine), puis la voix dit ta réplique si « Entendre ma réplique » est coché. « Mode lent » allonge seulement ton blanc ; « Bip sonore » joue un bip court quand c'est à toi. Toucher l'écran : pause / reprise.
- **Lecture à voix haute** : le lien « Détails » ouvre la vitesse, l'aide pour installer une voix française et les voix : « Une voix par personnage » (si le téléphone a au moins deux voix françaises) donne une voix différente à chaque personnage, avec ▶ pour l'écouter ; sinon une seule voix pour tous. Tous les personnages sont lus à la même hauteur. Si aucun son ne sort, un petit avertissement le signale (« Aide » pour le conseil complet, ✕ pour le fermer). « Terminer ici » ouvre le bilan sans finir la scène.
- **Minuteur de répétition** (icône en haut de l'accueil et de l'onglet Texte) : durée, nombre de passages, pause, préavis ; alarme sonore, vibration et clignotement réglables. La fenêtre s'adapte à la hauteur de l'écran. Lancé, il continue dans une barre sous l'en-tête ; toucher la barre le rouvre. Ouvrir « Répéter » (par n'importe quel chemin) demande d'abord s'il faut l'arrêter.
- **Ma progression** : « Voir › » pour les badges et le classement ; niveau et, en quadrillage, maîtrise, gain du jour, répliques solides / à répéter et meilleure série (flamme en couleur si la série en cours est la meilleure). Badges : chaque badge a 5 grades (« Collection ») ; le pourcentage mesure le chemin vers le grade suivant.
- **Au rafraîchissement**, l'appli revient sur l'écran où on était (scène, onglet, position). Un lancement à froid repart de l'accueil.

## Bouton retour du téléphone

Il fait la même chose que les boutons « Retour » ou « Fermer » de l'appli. Il referme d'abord ce qui est ouvert (fenêtre, menu, liste, panneau des options) et, dans l'onglet Texte, coupe d'abord « Suivre la lecture » si ce mode est activé, puis remonte en haut du texte avant de revenir à l'accueil. À l'accueil, un premier appui affiche « Appuie encore sur retour pour quitter », un second appui rapproché (2 s) quitte. Pendant un exercice, le retour ouvre le bilan ou les options de l'onglet Répéter (le mode choisi est gardé), puis l'accueil. Si Android a rechargé l'appli entre-temps (mise à jour, appli fermée en arrière-plan), le retour remonte quand même d'un niveau. Limite d'Android : si l'appli est rouverte à froid et qu'on appuie sur retour sans avoir touché l'écran une seule fois, elle se ferme directement.

## Classement (facultatif)

Écran « Classement », depuis « Ma progression ». La participation est volontaire, avec un pseudo de 10 caractères. Seuls le pseudo, le niveau, la série, le nombre de badges et le nombre de répliques entraînées (chaque réponse compte) sont envoyés à une feuille Google (via un script Apps Script). Aucun texte, aucun nom. La bulle (i) à côté de « Je participe » explique ce qui est envoyé. On peut se retirer à tout moment : la ligne est alors supprimée. À l'ouverture, l'appli envoie tes chiffres puis relit la liste (« Actualiser » affiche « Mise à jour… » pendant ce temps). Le script est dans `classement-script.gs`, à coller dans la feuille Google.

## Mode admin (profil de test)

Profil parallèle pour tester (données séparées, rien n'est envoyé au classement). On l'ouvre en touchant cinq fois la ligne « Répète · v… » en bas des Réglages, puis le code. Le panneau permet de simuler maîtrise, niveau, série, badges et jours, de rejouer le guide et les animations (la simulation de progression ne déclenche plus d'animation), de tester le minuteur en accéléré, et (section Diagnostic) d'afficher les messages d'erreur, l'avertissement « aucun son détecté » et le bandeau « enregistrement impossible », de faire apparaître la pastille « Sauvegarder » (« Tester : rappel de sauvegarde »), et de lire le journal du bouton retour. En cas de problème inattendu, le détail de l'erreur s'y affiche (copiable). **Ajouter mon texte** (coller un texte, découpé en répliques par personnage ; export en `textes-classe.json`) est réservé à ce mode.

## Objectif

Présentation avec la classe de théâtre le 19 janvier 2027.
