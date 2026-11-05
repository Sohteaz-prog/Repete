# Répète

Appli web mobile pour apprendre des textes de théâtre : lecture, répétition avec répliques cachées, notation (« Je connais » / « À revoir »), progression, niveaux, badges.

Un seul fichier HTML, JavaScript sans librairie, aucune dépendance, aucun serveur. Les données restent dans le navigateur (localStorage).

> Les textes intégrés sont protégés par le droit d'auteur : usage privé, pour la classe de théâtre.

## Installer sur le téléphone

Ouvrir l'adresse de l'appli (https) dans le navigateur, puis :

- **iPhone (Safari)** : bouton Partager, puis « Sur l'écran d'accueil ».
- **Android (Chrome)** : menu ⋮, puis « Installer l'application » ou « Ajouter à l'écran d'accueil ».

L'appli s'ouvre alors en plein écran avec son icône et fonctionne hors ligne après la première ouverture. La progression est enregistrée sur l'appareil.

## Contenu du dépôt

- `index.html` : toute l'appli
- `manifest.webmanifest`, `sw.js`, `icons/` : installation et mode hors ligne
- `README.md` : ce fichier

## Mettre à jour

Remplacer `index.html`, puis changer le numéro de version dans `sw.js` (`repete-v1` devient `repete-v2`, etc.) pour que les téléphones récupèrent la nouvelle version.

## Principes

- Une réplique devient « Connue » après des validations sur des jours différents, « Solide » après 5 jours sans « À revoir ».
- Le niveau (1 à 50) suit la maîtrise globale et ne baisse jamais.
- Animations et sons des récompenses réglables (sons désactivés par défaut).
- Thème clair/sombre automatique.

## Objectif

Présentation avec la classe de théâtre le 19 janvier 2027.
