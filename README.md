# Éditeur de carte — La Coursive des Alpes

**Site : https://viktor-guignard.github.io/la-coursive-carte/**

Modifier la carte du restaurant sans aucune compétence en mise en page :

- **Cliquer sur un texte** pour l'éditer directement (Entrée ou clic ailleurs pour valider).
- **✕ au bout de chaque ligne** pour supprimer un plat (avec bouton « Annuler » pendant 6 s).
- **⧉ ↑ ↓** au survol d'une ligne : dupliquer, monter, descendre.
- **+ Ajouter un bloc** : titre de section, plat, formule, note, séparateur, saut de page.
- **Cliquer sur le logo ou le QR code** pour les remplacer par une autre image.
- **⬇️ Exporter en PDF** : PDF A4 exact (sans fond perdu ni traits de coupe — la carte est sur fond blanc), nommé automatiquement `carte_AAAA-MM-JJ_HHhMM.pdf`.
- **💾 Enregistrer une version** : chaque enregistrement crée un fichier horodaté dans le dossier [`versions/`](versions/) de ce repo — rien n'est jamais écrasé.
- **🕑 Versions** : recharger n'importe quelle version depuis n'importe quel ordinateur.

## Travailler sur plusieurs ordinateurs (PC du resto, Mac…)

- **Lire / reprendre le travail** : ouvrez simplement le site — la dernière version enregistrée se charge automatiquement. Aucun réglage.
- **Enregistrer** : il faut coller une fois par ordinateur un jeton GitHub (bouton **⚙️** du site, les 5 étapes sont expliquées dedans). Le jeton ne donne accès qu'à ce repo.
- **Filet de sécurité** : si vous fermez la page sans enregistrer, un brouillon local est conservé et proposé à la réouverture *sur le même ordinateur*. Pour retrouver votre travail ailleurs, pensez à **💾 Enregistrer une version** avant de partir.

## Technique

- Site 100 % statique (HTML/CSS/JS, aucun build), hébergé sur GitHub Pages — chaque push sur `main` republie automatiquement.
- Versions stockées en JSON dans `versions/` via l'API GitHub Contents (lecture publique, écriture par jeton *fine-grained* limité à ce repo).
- Export PDF : `html2canvas` + `jsPDF`, une page A4 par bloc « saut de page ».
- Le logo « Le vrai fait maison » et le QR code d'origine (extraits du PDF de février 2023) sont dans [`assets/`](assets/).

### Développement local

```
python3 -m http.server 8000
```

puis ouvrez `http://localhost:8000`. Note : la liste des versions lit le repo GitHub distant même en local.
