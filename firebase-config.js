// 1. Allez sur https://console.firebase.google.com → "Ajouter un projet" (gratuit).
// 2. Dans le projet : "Créer une application Web" (icône </>), donnez-lui un nom.
// 3. Firebase vous affiche un objet "firebaseConfig" : copiez-collez ses valeurs ci-dessous.
// 4. Dans le menu Firebase : "Authentication" → "Get started" → activer "E-mail/Mot de passe"
//    puis "Add user" → mettez VOTRE email + un mot de passe (c'est votre connexion au site).
// 5. Dans le menu Firebase : "Firestore Database" → "Create database" → mode production, région proche (europe-west).
// 6. Une fois la base créée, onglet "Règles" (Rules), collez :
//
//    rules_version = '2';
//    service cloud.firestore {
//      match /databases/{database}/documents {
//        match /versions/{docId} {
//          allow read, write: if request.auth != null;
//        }
//      }
//    }
//
// 7. Renommez ce fichier en "firebase-config.js" (sans ".example") et remplissez les valeurs.
//    Ce fichier n'est PAS un secret dangereux : il identifie juste le projet, l'accès réel
//    est protégé par le mot de passe (règles Firestore ci-dessus).

window.FIREBASE_CONFIG = {
  apiKey: "COLLEZ_ICI",
  authDomain: "COLLEZ_ICI.firebaseapp.com",
  projectId: "COLLEZ_ICI",
  storageBucket: "COLLEZ_ICI.appspot.com",
  messagingSenderId: "COLLEZ_ICI",
  appId: "COLLEZ_ICI"
};
