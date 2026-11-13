# 🧵 Couture Singer

Application Android (PWA installable, 100 % hors connexion) pour apprendre à coudre pas à pas avec une machine **Singer Tradition** : 43 guides illustrés, outils à utiliser et réglages machine pour chaque technique.

## Ce que contient l'application

| Rubrique | Exemples |
|---|---|
| **Prise en main** | connaître la machine, aiguille, canette, enfilage, tension, pieds |
| **Ourlets (9)** | double, simple surfilé, invisible, roulotté, jersey (double aiguille), jean, biais, coins en onglet, à la main |
| **Coutures** | droite, finitions, anglaise, rabattue, courbes, surpiqûre, fronces, pinces, jersey |
| **Détails** | fermeture à glissière (classique et invisible), boutonnière 4 temps, bouton, poche, coulisse élastique, biais |
| **Vêtements & projets** | mesures, jupe, T-shirt, pantalon, robe trapèze, sac cabas, housse de coussin — avec **calculateurs** de dimensions de coupe, élastique et métrage |
| **Dépannage** | points sautés, nid de fil, tension, fil/aiguille cassés, découdre, entretien |

Pour chaque guide : outils à avoir, réglages (point, longueur, largeur, tension, pied, aiguille, fil) avec jauges, étapes illustrées, **mode pas à pas** plein écran (l'écran reste allumé), progression et favoris. Une page « Réglages » donne les valeurs de départ par tissu.

## Mettre l'application sur GitHub (une seule fois)

1. Crée un compte sur <https://github.com> puis **New repository** (nom : `couture-singer`, public).
2. Sur la page du dépôt : **uploading an existing file** et glisse **tout le contenu du dossier** (y compris `.github` et `icons`), puis **Commit changes**.
   - Dossier caché `.github` : il doit absolument être envoyé (c'est lui qui publie le site). Sur téléphone, il est plus simple d'utiliser un ordinateur pour cette étape.
3. Va dans **Settings → Pages → Build and deployment → Source : GitHub Actions**.
4. Onglet **Actions** : attends la coche verte du workflow « Déployer sur GitHub Pages » (1 à 2 minutes).
5. L'adresse de ton application est `https://TON-PSEUDO.github.io/couture-singer/`.

## Installer sur le téléphone Android

1. Ouvre l'adresse ci-dessus dans **Chrome**.
2. Menu ⋮ → **Installer l'application** (ou « Ajouter à l'écran d'accueil »).
3. L'icône 🧵 apparaît avec tes autres applications et fonctionne ensuite **sans internet**.

### Obtenir un vrai fichier APK (facultatif)

1. Va sur <https://www.pwabuilder.com>, colle l'adresse de ton application.
2. **Package for stores → Android** pour télécharger un `.apk`/`.aab` signé.
3. Installe l'APK sur le téléphone (autorise l'installation depuis cette source).

## Mettre à jour

Modifie les fichiers dans GitHub, puis dans `sw.js` change `VERSION` (ex. `couture-singer-v2`) pour que le téléphone récupère la nouvelle version.

## Ajouter ou modifier un guide

Les guides sont des données simples dans `data-g1.js`, `data-g2.js`, `data-g3.js` :

```js
{ id: 'mon-guide', cat: 'hems', t: 'Titre', lvl: 1, time: '20 min',
  intro: 'Présentation…',
  tools: ['iron', 'pins'],                       // voir DB.tools dans data-base.js
  set: S('straight', 2.5, 0, 4, 'universal', '80/12', 'Polyester tout usage'),
  steps: [ { t: 'Titre', d: 'Explication', i: ['pl', 'fold1'], tip: 'Astuce' } ] }
```

`i` désigne l'illustration (`ill-core.js` / `ill-plan.js`). Les calculateurs sont dans `calcs.js`.

## Test en local

```bash
python3 -m http.server 8000   # puis http://localhost:8000
```

## Important

Les réglages sont des **valeurs de départ** pour les Singer Tradition (2250, 2259, 2273, 2277, 2282…) : teste toujours sur une chute du même tissu. Le nombre de points et leur numérotation varient selon le modèle : repère le pictogramme sur ta machine. Le manuel de ton modèle reste la référence (bobinage, boutonnière, huilage). Le patron du pantalon et de la robe est simplifié : fais une toile d'essai.
