/* Couture Singer — données de base : outils, pieds, tissus, catégories, glossaire */
window.DB = {
  cats: [
    { id: 'basics', t: 'Prise en main', e: '🧵', d: 'Aiguille, canette, enfilage, tension' },
    { id: 'hems', t: 'Ourlets', e: '📏', d: '9 façons de faire un ourlet' },
    { id: 'seams', t: 'Coutures', e: '✂️', d: 'Droites, anglaises, rabattues, jersey' },
    { id: 'details', t: 'Détails', e: '🔘', d: 'Zip, boutonnières, poches, élastique' },
    { id: 'make', t: 'Vêtements & projets', e: '👗', d: 'Jupe, T-shirt, pantalon, robe, sac' },
    { id: 'fix', t: 'Dépannage', e: '🛟', d: 'Points sautés, fil qui casse, retouches' }
  ],

  tools: {
    scissors: { n: 'Ciseaux de tailleur', u: 'Couper le tissu uniquement (jamais le papier : le fil s\'émousse).', e: '✂️' },
    snips: { n: 'Petits ciseaux / cisailles', u: 'Couper les fils, cranter et entailler les courbes.', e: '✂️' },
    rotary: { n: 'Cutter rotatif + tapis', u: 'Coupe rapide et très droite, surtout pour le jersey et les grandes pièces.', e: '⭕' },
    tape: { n: 'Mètre ruban souple', u: 'Mesures du corps et des courbes.', e: '📏' },
    ruler: { n: 'Règle transparente graduée', u: 'Tracer droit-fil, hauteurs d\'ourlet, marges.', e: '📐' },
    gauge: { n: 'Jauge à ourlet (ou petite règle)', u: 'Plier un ourlet à hauteur constante avant de repasser.', e: '📏' },
    chalk: { n: 'Craie de tailleur / stylo effaçable', u: 'Marquer sur l\'envers du tissu.', e: '🖍️' },
    pins: { n: 'Épingles à tête', u: 'Maintenir les couches. Les enlever AVANT que l\'aiguille arrive dessus.', e: '📌' },
    clips: { n: 'Pinces à tissu (type Wonder Clips)', u: 'Remplacent les épingles sur les tissus épais ou fragiles.', e: '🧷' },
    iron: { n: 'Fer à repasser + pattemouille', u: 'Marquer les plis : indispensable pour un ourlet net.', e: '♨️' },
    unpick: { n: 'Découd-vite', u: 'Défaire une couture et ouvrir les boutonnières.', e: '🔪' },
    needles: { n: 'Aiguilles machine assorties', u: 'Garder des 70, 80, 90, 100 + jersey. Changer toutes les ~8 h de couture.', e: '🪡' },
    hand: { n: 'Aiguilles à main', u: 'Ourlets à la main, boutons, finitions.', e: '🪡' },
    thimble: { n: 'Dé à coudre', u: 'Protège le doigt pour l\'ourlet à la main.', e: '🧤' },
    safety: { n: 'Épingle à nourrice / passe-lacet', u: 'Passer l\'élastique ou un cordon dans une coulisse.', e: '🧷' },
    elastic: { n: 'Élastique', u: 'Largeur choisie selon la coulisse (2 à 3 cm pour une taille).', e: '➰' },
    thread: { n: 'Fil polyester tout usage', u: 'Même fil dessus et dessous. Couleur assortie au tissu.', e: '🧶' },
    jeanthread: { n: 'Fil à surpiquer (jean)', u: 'Plus épais, pour les surpiqûres visibles. Aiguille 100/16.', e: '🧶' },
    interfacing: { n: 'Entoilage thermocollant', u: 'Raidir les cols, boutonnières, ceintures.', e: '📄' },
    tracing: { n: 'Papier patron / papier de soie', u: 'Reporter et ajuster les patrons.', e: '📄' },
    wedge: { n: 'Cale (carton plié ou plaquette de jean)', u: 'Aider le pied à franchir les surépaisseurs.', e: '🟫' },
    seamripper: { n: 'Boîte de rangement + pelote', u: 'Garder aiguilles et épingles sous la main.', e: '📦' },
    bodkin: { n: 'Allumette ou cure-dent', u: 'Fait la « queue » d\'un bouton cousu à la machine.', e: '🪵' },
    biastape: { n: 'Biais tout fait', u: 'Border les courbes et les bords bruts.', e: '🎀' },
    tailorsham: { n: 'Jamon / rouleau de repassage', u: 'Repasser les pinces et les courbes.', e: '🧻' }
  },

  feet: {
    universal: { n: 'Pied universel (zigzag)', e: '🦶', d: 'Le pied monté d\'origine. Couture droite, zigzag, surfilage, points utilitaires.' },
    zip: { n: 'Pied fermeture à glissière', e: '🦶', d: 'Étroit, se fixe à gauche ou à droite de l\'aiguille pour longer les dents.' },
    bh: { n: 'Pied boutonnière 4 temps', e: '🦶', d: 'Se règle à la taille du bouton ; la boutonnière se fait en 4 étapes avec le sélecteur.' },
    btn: { n: 'Pied pose-bouton', e: '🦶', d: 'Tient le bouton en place ; griffes abaissées.' },
    blind: { n: 'Pied ourlet invisible', e: '🦶', d: 'Lame-guide qui suit le pli. Point ourlet invisible.' },
    rolled: { n: 'Pied ourleur (roulotté)', e: '🦶', d: 'Enroule le bord en un tout petit ourlet (3 mm). Accessoire à acheter séparément.' },
    walk: { n: 'Pied de couture droite', e: '🦶', d: 'Optionnel : aiguille centrée, meilleure précision pour les surpiqûres.' }
  },

  stitches: {
    straight: 'Point droit', zigzag: 'Zigzag', satin: 'Zigzag serré (point satin)', blind: 'Point ourlet invisible',
    stretch: 'Point stretch', overlock: 'Point surjet (si disponible)', buttonhole: 'Boutonnière', twin: 'Point droit — double aiguille'
  },

  /* indicatifs : Singer Tradition 2250 / 2259 / 2273 / 2277 / 2282 */
  fabrics: [
    { n: 'Voile, mousseline, soie', e: '🌸', nd: '60/8 – 70/10', th: 'Polyester fin', len: '2 – 2,5', ten: '3 – 4', foot: 'Universel', tip: 'Papier de soie sous le tissu pour éviter qu\'il ne soit avalé. Aiguille neuve.' },
    { n: 'Coton léger, popeline', e: '👚', nd: '70/10 – 80/12', th: 'Polyester tout usage', len: '2,5', ten: '4', foot: 'Universel', tip: 'Le tissu le plus facile pour débuter.' },
    { n: 'Lin, coton moyen, toile', e: '🧺', nd: '80/12', th: 'Polyester tout usage', len: '2,5 – 3', ten: '4', foot: 'Universel', tip: 'Prélaver : le lin rétrécit beaucoup.' },
    { n: 'Jean, toile épaisse, gabardine', e: '👖', nd: '90/14 – 100/16 (jeans)', th: 'Polyester ou fil jean', len: '3 – 3,5', ten: '4 – 5', foot: 'Universel + cale', tip: 'Coudre doucement ; aider le volant à la main sur les surépaisseurs.' },
    { n: 'Jersey, T-shirt, tricot', e: '👕', nd: '75/11 – 90/14 jersey (pointe ronde)', th: 'Polyester', len: '2,5 – 3', ten: '3 – 4', foot: 'Universel', tip: 'Point stretch ou petit zigzag (L 2,5 / l 1). Ne jamais tirer le tissu.' },
    { n: 'Polaire, sweat, molleton', e: '🧥', nd: '90/14 jersey', th: 'Polyester', len: '3 – 3,5', ten: '3 – 4', foot: 'Universel', tip: 'Épingler peu, utiliser des pinces à tissu.' },
    { n: 'Satin, doublure glissante', e: '✨', nd: '70/10 microtex', th: 'Polyester fin', len: '2 – 2,5', ten: '3', foot: 'Universel', tip: 'Épingler dans la marge de couture ; ne pas défaire (trous visibles).' },
    { n: 'Velours, tissu à poils', e: '🟣', nd: '80/12 – 90/14', th: 'Polyester', len: '3', ten: '3 – 4', foot: 'Universel', tip: 'Piquer toujours dans le sens du poil ; peu de pression.' },
    { n: 'Simili, cuir fin', e: '🧳', nd: '90/14 – 100/16 cuir', th: 'Polyester', len: '3 – 4', ten: '4', foot: 'Téflon (acc.)', tip: 'Pas d\'épingles (trous définitifs) : pinces ou ruban adhésif.' },
    { n: 'Tissu à bords effilochés', e: '🧵', nd: '80/12', th: 'Polyester', len: '2,5', ten: '4', foot: 'Universel', tip: 'Surfiler tous les bords bruts en zigzag avant de commencer.' }
  ],

  glossary: [
    ['Droit-fil', 'Direction des fils parallèles aux lisières ; c\'est le sens le moins élastique du tissu.'],
    ['Lisière', 'Bord fini du tissu qui ne s\'effiloche pas.'],
    ['Biais', 'Direction à 45° du droit-fil : le tissu s\'y étire.'],
    ['Endroit / Envers', 'Le beau côté / le côté intérieur du tissu.'],
    ['Marge de couture', 'Tissu en plus de la ligne de piqûre (1,5 cm en général).'],
    ['Cran', 'Petite marque pour faire coïncider deux pièces.'],
    ['Cranter / Entailler', 'Couper de petits V ou fentes dans la marge pour que la couture d\'une courbe se plaque.'],
    ['Surfiler', 'Finir un bord brut (zigzag, surjet) pour qu\'il ne s\'effiloche pas.'],
    ['Piquer', 'Coudre avec la machine.'],
    ['Surpiquer', 'Piquer sur l\'endroit, près d\'une couture ou d\'un bord.'],
    ['Bâtir', 'Coudre de grands points provisoires (points les plus longs).'],
    ['Point d\'arrêt', 'Quelques points en arrière pour bloquer le fil au début et à la fin.'],
    ['Pied de biche', 'Le « pied » de la machine qui presse le tissu.'],
    ['Griffes (crabots)', 'Les petites dents sous le pied qui font avancer le tissu.'],
    ['Coulisse', 'Tunnel replié dans lequel on passe un élastique ou un cordon.'],
    ['Pince', 'Triangle piqué pour donner du volume (poitrine, taille).'],
    ['Aisance', 'Marge de largeur ajoutée pour pouvoir bouger.']
  ]
};
