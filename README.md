# Photos des outils (facultatif)

Dépose ici des photos libres de droits (ou les tiennes), puis déclare-les dans `index.json`.
L'application les affiche à la place de l'icône, et les garde hors connexion après la première vue.

```json
{
  "tool:scissors": { "src": "ciseaux.jpg", "credit": "Photo : Nom, CC BY-SA 4.0, Wikimedia Commons", "link": "https://commons.wikimedia.org/wiki/File:..." },
  "foot:zip":      { "src": "pied-zip.jpg", "credit": "Ma photo" }
}
```

Identifiants : `tool:<id>` (voir `DB.tools` dans `data-base.js` : scissors, snips, rotary, tape, ruler, gauge, chalk,
pins, clips, iron, unpick, needles, hand, thimble, safety, elastic, thread, jeanthread, interfacing, tracing, wedge,
bodkin, biastape, tailorsham) et `foot:<id>` (universal, zip, bh, btn, blind, rolled, walk).

Pense à respecter la licence et à indiquer l'auteur dans `credit`. Tu peux aussi, directement dans l'application,
ouvrir la fiche d'un outil et appuyer sur « 📷 Ajouter ma photo » : la photo reste sur ton téléphone.
Mets à jour `VERSION` dans `sw.js` après avoir ajouté des fichiers.
