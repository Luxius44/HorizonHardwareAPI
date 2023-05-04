# Guide de déploiement et d'utilisation de l'API RESTful *Horizon Hardware*

## Introduction

Ce guide explique comment déployer et utiliser l'API RESTful et le panneau Administrateur *Horizon Hardware* sur votre ordinateur en local ou sur un serveur distant.

## Déploiement

### Prérequis

> Node.js version 18.15 <br/>
> Npm version 9.5.0 <br/>

## Etapes de déploiement

1. Télécharger ou clonez le code source de l'application depuis le dépôt <a href="https://github.com/Luxius44/HorizonHardwareAPI">Gitlab</a>
2. Ouvrez un terminal et accédez au répertoire racine de l'application. 
3. Exécutez la commande `npm install` pour installer toutes les dépendances nécessaires.
4. Créer le dossier `img` à la racine du projet et créer et configurez le fichier `.env` depuis la racine du projet comme ceci : 
```
DATABASE_URL="file:./maDB.db"
USER="yatachiihardware@gmail.com"
PASS="hwkpoimgiazvlddw"
PRIVATE_KEY="XxXMinecraftXxXBlackGaming"

# CHANGE DEPEND WHERE YOU ARE

HOST="localhost"                    # Adresse de l'host
PORT = 3000                         # Port utilisé
URL="http://localhost:3000"         # Url pour accéder à l'application
PATH2='E:/HorizonHardwareAPI/view'  # Chemin absolu du dossier view
PATH3="E:/HorizonHardwareAPI/img"   # Chemin absolu du dossier img
```

5. Exécutez la commande `node startServer.mjs &` pour démarrer l'API et le panneau Administrateur.

L'application est maintenant accessible à l'adresse choisie.

## Utilisation

Une fois l'application déployée, vous pouvez voir la documentation des routes de l'API en rajoutant `/documentation` dans l'url. Vous pourrez ainsi voir comment est faite l'API et meme pouvoir la tester depuis la documentation ou l'essayer via des requettes HTTP. Vous pourrez accéder au panneau Administrateur en rajoutant `/panel`, vous devrez ensuite vous connecter avec le compte administrateur qu'on vous aura donner. Depuis celui ci vous pourrez naviguer depuis les différentes pages et gérer les données (Création, Suppresion, Modification de Deal, Création, Suppresion, Modification de Catégories, etc ...).


### Technologies utilisés

> Partie serveur HTTP : Hapi <br/>
> Partie base de données : Sqlite <br/>
> Partie ORM : Prisma <br/>
> Partie Documentation : Swagger <br/>
> Création de Token : JWT-Token <br/>
> Gestion des images : Fs <br/>
> Editeur de texte : Quill <br/>


### Fonctionnalités principales de l'APIRESTful:

- Créer un Administrateur et renvoyer un token
- Se connecter et renvoyer un token
- Renvoyer tous les Articles
- Renvoyer un Article par rapport à son Id
- Renvoyer toutes les Catégories
- Renvoyer un Catégorie par rapport à son Id
- Envoyer un mail aux Administrateurs
- Renvoyer tous les Deals
- Renvoyer tous les Deals par rapport à sa Catégorie
- Renvoyer une image par rapport a son nom
- Retourner tous les Tags

Pour une description plus détaillé de l'API vous pouvez utilisez la documentation générez par Swagger en allant rajoutant `documentation` à l'url.


### Fonctionnalités principales du panneau Administrateur:

Pour accédez au panneau Administrateur rajouter derrière l'url `/panel`.

#### Home : 
- Se connecter au panneau Administrateur
- Se déconnecter du panneau Administrateur
#### Deals :
- Consulter tous les Deals 
- Filtez les Deals par Catégorie
- Ajouter un nouveau Deal
- Modifier un Deal
- Supprimer un Deal
#### Catégories :
- Consulter toutes les Catégories 
- Ajouter un nouvelle Catégorie
- Modifier une Catégorie
- Supprimer une Catégorie
#### Articles :
- Consulter tous les Articles 
- Ajouter un nouveau Article
- Modifier un Article
- Supprimer un Article
#### Autres : 
- Consulter tous les Tags
- Ajouter un nouveau Tag
- Supprimer un Tag
- Consulter toutes les images 
- Supprimer une image
#### Admins : 
- Consulter tous les Admins
- Ajouter un nouveau Admin
- Modifier un Admin
- Supprimer un Admin

## Conclusion

Ce guide vous permettra de déployer et d'utiliser l'application *Horizon Hardware* sur votre ordinateur local ou sur un serveur distant. Si vous avez des questions ou des problèmes, n'hésitez pas à nous contacter pour obtenir de l'aide.