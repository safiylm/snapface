### Snapface

## 1. Résumé du projet

Snapface est un réseau social de partage visuel inspiré d’Instagram.
Objectif : permettre aux utilisateurs de créer un compte, publier des photos/vidéos avec légendes, suivre d’autres comptes, interagir (like/comment), voir un fil d’actualité personnalisé et publier des stories éphémères.

Public cible : développeurs/UX for learning, prototype MVP ou petit service social.




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




## 2. Principales fonctionnalités

Utilisateur

Inscription / connexion (email + mot de passe / OAuth optionnel)

Profil utilisateur (bio, avatar, nombre d’abonnés/abonnements)

Publier un post (image/vidéo + légende + emplacement optionnel + hashtags)

Fil d’actualité (posts des utilisateurs suivis, tri par date / algorithme simple)

Like / Commentaire / Partage (URL)

Suivre / Se désabonner

Stories (image/vidéo, visibles 24h)

Rechercher utilisateurs / hashtags

Notifications basiques (nouveau like, commentaire, nouveau follower)

Paramètres (privé/public, suppression de compte)

Envoi et réception de messages/publications en temps réel

Affichage de l'état en ligne des utilisateurs

Signaler un utilisateur ou une publication 


Administrateur

Gestion des utilisateurs (bannir, modérer contenu)

Statistiques (nombres d’utilisateurs, posts, activité)

Modération des signalements








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


## API ABONNEMENTS

POST /api/abonnees/create

POST /api/abonnees/remove

GET /api/abonnement

GET /api/followers

GET /api/checkabonnement



## API COMMENTAIRES

GET /api/commentairesByPostId

POST /api/commentaire/create

POST /api/commentaire/delete

POST /api/commentaire/update

## API FOLLOW REQUEST 

POST /api/followrequest/create

POST /api/followrequest/accept

POST /api/followrequest/reject

GET /api/listOfFollowRequest

GET /api/dejaEnAttente 


## API INTERACTION SOCIAL 


POST /api/interaction/pointsAdd

POST /api/interaction/pointsRemove

POST /api/interaction/likesAdd

POST /api/interaction/likesRemove

POST /api/interaction/enregistrementAdd

POST /api/interaction/enregistrementRemove


GET /api/interaction/pointsByUserId

GET /api/interaction/likesByUserId

GET /api/interaction/enregistrementsByUserId

GET /api/interaction/pointsByPostId

GET /api/interaction/likesByPostId

GET /api/interaction/likesCount

GET /api/interaction/pointsCount

GET /api/interaction/getIfUserAlreadyLikePost

GET /api/interaction/getIfUserAlreadyPointPost

GET /api/interaction/getIfUserAlreadySavePost


## API MESSAGE


POST /message/create

POST /conversation/create

POST /message/edit

POST /message/delete

POST /conversation/delete

POST /message/markasseen

GET /messages

GET /last-message

GET /conversations

GET /conversation

GET /conversation/nbnewmsj


## API PUBLICATION 

POST /api/publication/create

POST /api/publication/edit

POST /api/publication/delete


GET /api/publication

GET /api/pour-moi/publication

GET /api/publicationByUserId

GET /api/publicationid

GET /api/publication/search




## API SIGNALEMENT 

POST /create/signalement/user

POST /create/signalement/post

GET /signalement/allpost

GET /signalement/alluser

GET /signalement/allpostByAuteur

GET /signalement/alluserByAuteur




## API STATISTIQUE USER 

POST /api/statistique/user/create

POST /api/checkFollowers

POST /api/checkPublications

POST /api/checkPoints

GET /api/statistiqueUserByUserId



## API USER 


GET /api/user

GET /api/userid

GET /api/username

GET /logout



POST /api/user/create

POST /api/user/connexion

POST /api/user/update

POST /api/user/edit/password

POST /api/user/edit/email

POST /api/user/edit/phonenumber

POST /api/user/delete

POST /password-oublie/email

POST /api/user/email

POST /api/user/reinitialise/password

POST /api/user/edit/photodeprofil

POST /api/user/edit/photobackground


POST /api/user/edit/online

POST /api/user/edit/notonline


