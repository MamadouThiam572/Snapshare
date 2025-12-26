# SnapShare : Partage de Fichiers Local Simplifié

## 🚀 Concept

SnapShare est un outil personnel conçu pour faciliter le transfert de fichiers entre deux ordinateurs connectés directement via un câble Ethernet, **sans nécessiter de connexion Internet ni de configuration réseau complexe**. L'objectif est d'offrir une solution rapide, sécurisée et intuitive pour partager des données en local.

## 💡 Problème Résolu

Les méthodes traditionnelles de transfert de fichiers (clés USB, partages réseau SMB/FTP, services cloud) souffrent souvent de :
*   **Lenteur** ou dépendance à Internet.
*   **Complexité de configuration** pour les utilisateurs non techniques.
*   **Problèmes de compatibilité** ou de sécurité (virus via clés USB).

SnapShare répond à ces défis en proposant une interface web locale accessible via navigateur, dès que les machines sont connectées par Ethernet.

## ⚙️ Fonctionnement

1.  **Connexion Physique :** Deux machines sont connectées directement par un câble Ethernet.
2.  **Lancement du Serveur :** Sur l'une des machines (le "serveur"), vous lancez SnapShare.
3.  **Accès via Navigateur :** L'autre machine (le "client") ouvre son navigateur web et accède à l'adresse IP locale du serveur (par exemple : `http://192.168.x.x:3000`).

Les utilisateurs peuvent alors :
*   Téléverser (uploader) des fichiers.
*   Lister les fichiers disponibles sur le serveur.
*   Télécharger des fichiers.
*   Supprimer des fichiers.

**⚠️ Aucune connexion Internet n'est requise après le premier lancement pour l'installation des dépendances.**

## ✨ Fonctionnalités Actuelles

*   **Interface Web Intuitive :** Design minimaliste et moderne pour une utilisation facile.
*   **Affichage de l'IP Serveur :** L'adresse IP locale est affichée directement sur la page pour faciliter la connexion depuis une autre machine.
*   **Téléversement de Fichiers :** Envoyer des fichiers du client vers le serveur.
*   **Listing de Fichiers :** Afficher tous les fichiers disponibles sur le serveur.
*   **Téléchargement de Fichiers :** Télécharger n'importe quel fichier présent sur le serveur.
*   **Suppression de Fichiers :** Supprimer des fichiers du serveur via l'interface web.
*   **Mise à Jour Automatique :** La liste des fichiers se met à jour en temps réel sur tous les clients connectés.
*   **Démarrage Facilité :** Scripts `start.bat` (Windows) et `start.sh` (Linux/macOS) pour lancer le serveur en un clic.

## 🛠️ Stack Technique

*   **Backend :** Node.js, Express.js, Multer (pour l'upload), `fs` (gestion des fichiers), `os` (infos système).
*   **Frontend :** HTML, CSS, JavaScript (avec Fetch API pour les interactions).
*   **Réseau :** Communication locale via Ethernet (APIPA / IP locale).
*   **Systèmes Ciblés :** Windows, Linux.

## 🚀 Comment Lancer SnapShare ?

1.  **Prérequis :** Assurez-vous d'avoir [Node.js](https://nodejs.org/) (version 14 ou supérieure) et [npm](https://www.npmjs.com/) installés.
2.  **Cloner le dépôt :**
    ```bash
    git clone https://github.com/MamadouThiam572/Snapshare.git
    cd Snapshare
    ```
3.  **Installer les dépendances :**
    ```bash
    npm install
    ```
4.  **Lancer le serveur :**
    *   **Windows :** Double-cliquez sur `start.bat`.
    *   **Linux / macOS :** Ouvrez un terminal dans le dossier du projet et exécutez `./start.sh`.

    Votre navigateur devrait s'ouvrir automatiquement sur `http://localhost:3000`. L'adresse IP locale à utiliser pour les autres machines sera affichée sur la page.

## 👤 Auteur

**Mamadou Thiam**
*   Étudiant en Licence 3 Systèmes, Réseaux et Télécommunications.
*   Développeur Fullstack (Node.js, Express, MongoDB) et Administrateur Système.

---
*Projet développé avec l'assistance de Gemini-CLI.*
