# Snapface

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


## #################################################### ##


## Introduction

Nom: SnapFace un réseau social 

Objectif: Voir le contenu des autres, partager du contenu, communiquer.

Contexte: J'adore instagram, je me suis lancée le défi de créer un similaire.



## Fonctionnalités

    Authentification des utilisateurs (inscription / connexion) -- se déconnecter 

    Voir publications des utilisateurs public et ceux qu'ont suit

    Compte public || private 

    S'abonner et se désabonner

    compte privé -- accepter ou refuser une requete d'abonnement 

    Interagir sur les publications -- liker, ajouter un point, enregistrer ou commenter -- 

    Voir sa Liste des publications likées, pointed, enregistré 

    Création de publications avec photos, videos & audio

    Modification et suppression de publications

    Envoi et réception de messages en temps réel

    Envoi et réception de publications en temps réel

    Affichage de l'état en ligne des utilisateurs

    Rechercher un utilisateur ou une publication

    Signaler un utilisateur ou une publication 

    un utilisateur peut modifier ses données -- sa photo de profil et sa photo de background 


## Technologies utilisées

Liste des langages, frameworks, bibliothèques et outils utilisés.

        Frontend : Angular

        Backend : Node.js (Express)

        Base de données : MongoDB

        Communication temps réel : Socket.IO

        Autres : Mongoose(is an Object modeling tool for MongoDB), JWT, etc.



## Installation / Lancement du projet
# Cloner le repo
git clone https://github.com/safiylm/snapface.git

# Aller dans le dossier frontend
cd snapface-main
npm install
ng serve

# Aller dans le dossier backend depuis le dossier frontend
cd backend
npm install
npm start
node index.js


## Architecture du projet
Fournis un aperçu de l’organisation des fichiers et répertoires.

/frontend
  /src
    /app
      /components
    /assets
    /services
    /models
    index.html

/backend
  /config 
  /controllers
  /routes
  /models
  index.js


## API 

POST /api/login
Corps de la requête :
{ "email": "...", "password": "..." }
Réponse :
{ "token": "..." }