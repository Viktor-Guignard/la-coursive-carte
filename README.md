# Éditeur de carte — La Coursive des Alpes

Site permettant de modifier la carte du restaurant sans compétences en mise en page :
- Cliquer sur n'importe quel texte pour l'éditer directement.
- Ajouter des blocs (titre de section, plat, formule, note, séparateur, saut de page) via **+ Ajouter un bloc**.
- Réorganiser / supprimer un bloc avec les flèches ↑ ↓ et ✕ qui apparaissent au survol.
- Exporter la carte en PDF fidèle à la mise en page (**⬇️ Exporter en PDF**).
- Enregistrer des versions horodatées dans le cloud, sans jamais écraser les précédentes (**💾 Enregistrer une version**), et les recharger depuis n'importe quel ordinateur (**🕑 Versions**).

## Mise en route (à faire une seule fois)

Le stockage cloud utilise **Firebase** (gratuit). Sans cette étape, l'édition et l'export PDF fonctionnent déjà, mais l'enregistrement de versions reste désactivé.

1. Allez sur [console.firebase.google.com](https://console.firebase.google.com) → **Ajouter un projet** (gratuit, quelques clics).
2. Dans le projet : icône **`</>`** → **Créer une application Web**, donnez-lui un nom, validez.
3. Firebase affiche un objet `firebaseConfig` : copiez ces valeurs dans le fichier [`firebase-config.js`](firebase-config.js) de ce repo (vous pouvez éditer ce fichier directement depuis l'interface GitHub, pas besoin d'outil spécial).
4. Menu Firebase → **Authentication** → **Get started** → activer **E-mail/Mot de passe**, puis **Add user** : entrez votre email et un mot de passe → c'est votre connexion au site.
5. Menu Firebase → **Firestore Database** → **Create database** → mode production, région proche (`europe-west`).
6. Onglet **Rules** de Firestore, remplacez le contenu par :
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /versions/{docId} {
         allow read, write: if request.auth != null;
       }
     }
   }
   ```
   puis **Publier**.
7. Rechargez le site : le bandeau "Firebase non configuré" disparaît, cliquez sur **Connexion** avec votre email/mot de passe.

Le fichier `firebase-config.js` n'est pas un secret sensible — l'accès réel est protégé par les règles Firestore ci-dessus (seul un utilisateur connecté peut lire/écrire).

## Développement local

Aucun outil de build requis. Ouvrez simplement un serveur statique à la racine, par exemple :

```
python3 -m http.server 8000
```

puis ouvrez `http://localhost:8000`.

## Publication (GitHub Pages)

Déjà configuré : chaque push sur `main` republie automatiquement le site via GitHub Pages.
