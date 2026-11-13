/* Guides — partie 1 : prise en main + ourlets */
window.G = window.G || [];
window.S = function (stitch, len, wid, ten, foot, needle, thread, extra) {
  return { stitch: stitch, len: len, wid: wid, ten: ten, foot: foot, needle: needle, thread: thread, extra: extra || '' };
};
(function () {
  const std = 'Polyester tout usage';
  G.push(
    /* ================= PRISE EN MAIN ================= */
    {
      id: 'b-parts', cat: 'basics', t: 'Connaître ta Singer Tradition', lvl: 1, time: '10 min',
      intro: 'Avant de coudre, repère les 8 éléments que tu utiliseras tout le temps. Les noms et positions varient un peu selon le modèle (2250, 2259, 2273, 2277, 2282) mais le principe est le même.',
      tools: [], set: null,
      steps: [
        { t: 'Vue d\'ensemble', d: 'Machine en place sur une table stable, la tête (aiguille) à ta gauche quand tu la regardes de face. Le volant est à droite : on ne le tourne JAMAIS vers l\'arrière.', i: ['machine', ''] },
        { t: 'Porte-bobine et releveur', d: 'Le porte-bobine (en haut) reçoit ta bobine de fil. Le releveur de fil est la pièce métallique qui monte et descend : il doit être en position HAUTE quand tu enfiles ou termines une couture.', i: ['machine', 'spool'], tip: 'Fais tourner le volant vers toi pour remonter le releveur.' },
        { t: 'Molette de tension', d: 'Elle règle la tension du fil du dessus. Valeur de départ : 4. Plus le chiffre est grand, plus le fil est tendu.', i: ['machine', 'tens'] },
        { t: 'Sélecteur de point', d: 'Il choisit le type de point (droit, zigzag, boutonnière…). Change TOUJOURS de point aiguille relevée.', i: ['machine', 'sel'] },
        { t: 'Longueur et largeur du point', d: 'La longueur (0–5 mm) = taille du point : petit pour les tissus fins, long pour bâtir. La largeur règle l\'amplitude du zigzag (0 = point droit).', i: ['machine', 'len'] },
        { t: 'Marche arrière', d: 'Appuyer et maintenir = la machine coud en arrière. Sert à bloquer le début et la fin de chaque couture.', i: ['machine', 'rev'] },
        { t: 'Levier du pied', d: 'Pied relevé : on enfile et on place le tissu. Pied baissé : on coud. Oublier de baisser le pied est la cause n°1 des nids de fil.', i: ['pl', 'foot-lift'] },
        { t: 'Griffes d\'entraînement', d: 'Ce sont les petites dents sous le pied qui font avancer le tissu. Pour la couture libre et le bouton, elles se baissent (levier à l\'arrière de la machine ou sous le plateau — voir ton manuel).', i: ['pl', 'feeddogs'] }
      ]
    },

    {
      id: 'b-needle', cat: 'basics', t: 'Choisir et changer l\'aiguille', lvl: 1, time: '5 min',
      intro: 'Une aiguille adaptée évite 80 % des problèmes (points sautés, fil qui casse, tissu abîmé). Change-la toutes les 8 heures de couture ou dès qu\'elle accroche.',
      tools: ['needles'], set: null,
      steps: [
        { t: 'Choisir la bonne taille', d: 'Plus le tissu est fin, plus l\'aiguille est fine. Voile 60-70, coton 80, jersey 90 pointe ronde, jean 100.', i: ['needle', 'sizes'], tip: 'Le premier nombre est le diamètre (en 1/100 mm), le second est l\'ancienne numérotation.' },
        { t: 'Choisir le bon type', d: 'Universelle pour les tissus tissés, « jersey/stretch » à pointe ronde pour les mailles, « jeans » à pointe fine et fût renforcé pour les toiles épaisses.', i: ['needle', 'types'] },
        { t: 'Éteindre et relever', d: 'Éteins la machine, relève le pied et l\'aiguille au maximum (volant vers toi).', i: ['pl', 'foot-lift'] },
        { t: 'Retirer l\'ancienne aiguille', d: 'Tiens-la d\'une main, dévisse la vis de fixation d\'un quart de tour avec le petit tournevis, puis tire l\'aiguille vers le bas.', i: ['needle', 'insert'] },
        { t: 'Placer la nouvelle, côté plat vers l\'arrière', d: 'Le côté PLAT de la tige regarde l\'arrière, la rainure vers l\'avant. Pousse l\'aiguille tout en haut, jusqu\'à ce qu\'elle bute, puis resserre bien la vis.', i: ['needle', 'anat'], tip: 'Si l\'aiguille est mal enfoncée ou à l\'envers, tu auras des points sautés.' },
        { t: 'Vérifier', d: 'Tourne le volant vers toi à la main : l\'aiguille doit passer au centre de l\'ouverture de la plaque sans toucher.' }
      ]
    },

    {
      id: 'b-bobbin', cat: 'basics', t: 'Remplir et placer la canette', lvl: 1, time: '10 min',
      intro: 'La canette fournit le fil du dessous. Elle se remplit avec le même fil que celui du dessus (même marque et même épaisseur de préférence).',
      tools: ['thread'], set: null,
      steps: [
        { t: 'Installer la bobine et guider le fil', d: 'Place la bobine sur le porte-bobine avec son disque de maintien. Passe le fil dans le guide-fil du haut, autour du disque de pré-tension, puis vers le bobineur.', i: ['bobbin', 'wind'] },
        { t: 'Fixer le fil sur la canette vide', d: 'Fais passer le fil de l\'intérieur vers l\'extérieur dans un des petits trous de la canette. Enroule quelques tours à la main sur la canette.', i: ['bobbin', 'wind'] },
        { t: 'Remplir', d: 'Pousse le bobineur vers la droite (canette « verrouillée »). Appuie doucement sur la pédale : la canette se remplit puis s\'arrête toute seule. Remets le bobineur en position coudre.', tip: 'Beaucoup de modèles désactivent l\'aiguille pendant le bobinage ; sinon, débraye le volant (voir manuel).' },
        { t: 'Mettre la canette dans son logement', d: 'Ouvre la trappe (plaque transparente), puis place la canette de façon que le fil se déroule dans le sens inverse des aiguilles d\'une montre (comme un « P » inversé).', i: ['bobbin', 'insert'] },
        { t: 'Passer le fil dans la fente', d: 'Suis le tracé gravé : fil dans la fente, sous le ressort de tension, jusqu\'au coupe-fil. Laisse environ 10 cm de fil libre.', i: ['bobbin', 'slot'] },
        { t: 'Remonter le fil du dessous', d: 'Tiens le fil du dessus, tourne le volant vers toi d\'un tour complet pour que l\'aiguille descende puis remonte : une boucle apparaît, tire-la pour sortir le fil de canette.', i: ['bobbin', 'up'], tip: 'Passe les deux fils vers l\'arrière sous le pied avant de commencer à coudre.' },
        { t: 'Longueur finale des fils', d: 'Les deux fils (dessus + dessous) doivent dépasser d\'environ 10 cm derrière le pied.', i: ['bobbin', 'tail'] }
      ]
    },

    {
      id: 'b-thread', cat: 'basics', t: 'Enfiler la machine (fil du dessus)', lvl: 1, time: '5 min',
      intro: 'L\'enfilage suit toujours le même chemin, de haut en bas. Un mauvais enfilage donne boucles et fil cassé. RELÈVE LE PIED avant d\'enfiler (sinon le fil ne passe pas entre les disques de tension).',
      tools: ['thread'], set: null,
      steps: [
        { t: 'Prépare', d: 'Aiguille en position haute (volant vers toi), pied relevé, bobine sur le porte-bobine.', i: ['pl', 'foot-lift'] },
        { t: '1 · Bobine → guide du haut', d: 'Tire le fil de la bobine vers le premier guide-fil, en haut de la machine.', i: ['thread', 2] },
        { t: '2 · Disques de tension', d: 'Fais descendre le fil dans le canal avant, derrière la molette de tension : le fil doit se « clipser » entre les disques (tu sens une légère résistance).', i: ['thread', 3] },
        { t: '3 · Releveur de fil', d: 'Remonte à gauche, passe le fil dans l\'œil du releveur de fil (de droite à gauche ou de l\'avant vers l\'arrière : suis la flèche sur la machine).', i: ['thread', 5] },
        { t: '4 · Guide de la barre à aiguille', d: 'Redescends et passe le fil dans le petit guide au-dessus de l\'aiguille.', i: ['thread', 6] },
        { t: '5 · Chas de l\'aiguille', d: 'Enfile le chas d\'avant en arrière (certains modèles ont un enfile-aiguille intégré : abaisse le levier, accroche le fil, relâche). Laisse dépasser 10 cm.', i: ['thread', 7], tip: 'Coupe le bout du fil en biais avec des ciseaux bien tranchants : il passe plus facilement.' }
      ]
    },

    {
      id: 'b-start', cat: 'basics', t: 'Premier test de couture', lvl: 1, time: '10 min',
      intro: 'Toujours tester sur une chute du même tissu (deux couches) avant de commencer le vrai travail.',
      tools: ['scissors', 'pins'],
      set: S('straight', 2.5, 0, 4, 'universal', '80/12', std),
      steps: [
        { t: 'Prépare le test', d: 'Coupe 2 rectangles de 10 × 20 cm dans le tissu du projet. Superpose-les endroit contre endroit.' },
        { t: 'Règle la machine', d: 'Point droit, longueur 2,5, largeur 0, tension 4.', i: ['machine', 'sel'] },
        { t: 'Positionne le tissu', d: 'Pied relevé, place le tissu avec son bord sur le repère 1,5 cm de la plaque. Abaisse le pied, aiguille piquée dans le tissu (volant vers toi).', i: ['pl', 'seam-sew'] },
        { t: 'Point d\'arrêt', d: 'Pique 3-4 points, puis marche arrière sur la même longueur, puis recoud en avant.', i: ['pl', 'backstitch'] },
        { t: 'Coudre droit', d: 'Laisse les griffes entraîner le tissu : tes mains guident sans tirer ni pousser. Vitesse régulière.' },
        { t: 'Finir proprement', d: 'Arrête-toi au bout, fais 3-4 points arrière, relève l\'aiguille et le pied, tire le tissu vers l\'arrière et coupe les fils à 10 cm.', i: ['pl', 'thread-cut'] },
        { t: 'Contrôle les points', d: 'Les points dessus/dessous doivent être réguliers. Si non, passe au guide « Régler la tension ».', i: ['tr', 'ok'] }
      ]
    },

    {
      id: 'b-tension', cat: 'basics', t: 'Régler la tension du fil', lvl: 2, time: '10 min',
      intro: 'Une bonne tension donne des points identiques dessus et dessous. On corrige presque toujours avec la molette du DESSUS uniquement.',
      tools: ['thread'], set: S('straight', 2.5, 0, '3 → 6 (selon le défaut)', 'universal', '80/12', std, 'Toujours modifier d\'1 cran à la fois et retester.'),
      steps: [
        { t: 'Vérifie les bases', d: '90 % des « problèmes de tension » viennent d\'un mauvais enfilage ou d\'une canette mal placée. Ré-enfile entièrement, pied RELEVÉ.', i: ['thread', 3] },
        { t: 'Cadran de tension', d: 'Départ à 4 pour un tissu moyen. Les tissus fins se piquent à 3, les épais jusqu\'à 5-6.', i: ['pl', 'tension-dial'] },
        { t: 'Tension correcte', d: 'Fil du dessus et fil du dessous se rejoignent au milieu de l\'épaisseur du tissu.', i: ['tr', 'ok'] },
        { t: 'Tension du dessus trop lâche', d: 'Des boucles du fil de dessus apparaissent sous le tissu : augmente la molette d\'un cran.', i: ['tr', 'loose'] },
        { t: 'Tension du dessus trop forte', d: 'Le fil de la canette remonte sur l\'endroit : diminue la molette d\'un cran.', i: ['tr', 'tight'] },
        { t: 'Tissu froncé', d: 'Le tissu fronce le long de la couture : baisse un peu la tension, rallonge les points, vérifie l\'aiguille.', i: ['tr', 'pucker'] }
      ]
    },

    {
      id: 'b-feet', cat: 'basics', t: 'Changer de pied de biche', lvl: 1, time: '3 min',
      intro: 'Le bon pied rend le travail beaucoup plus facile. Ta Singer Tradition est livrée avec : pied universel (zigzag), pied fermeture, pied boutonnière 4 temps, pied pose-bouton, parfois le pied ourlet invisible.',
      tools: [], set: null,
      steps: [
        { t: 'Relever aiguille et pied', d: 'Éteins la machine, aiguille en haut, pied relevé.' },
        { t: 'Détacher l\'ancien pied', d: 'Appuie sur le petit levier derrière le support : le pied tombe.', i: ['pl', 'foot-snap'] },
        { t: 'Choisir le pied selon le travail', d: 'Universel pour la plupart des coutures, fermeture pour les zips et passepoils, boutonnière pour les trous de boutons, pose-bouton pour les boutons, invisible pour les ourlets.', i: ['foot', 'universal'] },
        { t: 'Placer le nouveau', d: 'Place-le sous le support, barre transversale alignée avec la fente, puis abaisse le levier : il s\'enclenche.', i: ['pl', 'foot-snap'] }
      ]
    },

    {
      id: 'b-prep', cat: 'basics', t: 'Préparer, tracer et couper le tissu', lvl: 1, time: '30 min',
      intro: 'Une bonne préparation fait 50 % du résultat. Un tissu prélavé et bien coupé donne des vêtements qui ne se déforment pas.',
      tools: ['scissors', 'chalk', 'ruler', 'pins', 'iron'], set: null,
      steps: [
        { t: 'Prélaver', d: 'Lave le tissu comme tu laveras le vêtement fini (coton/lin rétrécissent de 3 à 8 %).', i: ['pl', 'prewash'] },
        { t: 'Repasser', d: 'Repasse à la température adaptée pour effacer les faux plis.', i: ['pl', 'iron'] },
        { t: 'Repérer le droit-fil', d: 'Les lisières indiquent le droit-fil. Le tissu s\'étire dans le biais (en diagonale) : on y évite de couper un vêtement entier.', i: ['pl', 'grain'] },
        { t: 'Disposer le patron', d: 'Les flèches « droit-fil » du patron doivent être parallèles aux lisières. Plie le tissu endroit contre endroit si le patron est « sur le pli ».', i: ['pl', 'layout'] },
        { t: 'Épingler et couper', d: 'Épingle le papier patron sans bouger le tissu, puis coupe au ras du trait avec les ciseaux de tailleur, lame posée à plat sur la table. Fais des petits crans vers l\'extérieur pour marquer les repères.', i: ['pl', 'cut'] }
      ]
    },

    /* ================= OURLETS ================= */
    {
      id: 'hem-double', cat: 'hems', t: 'Ourlet double classique (pantalon, jupe, robe)', lvl: 1, time: '20 min',
      intro: 'L\'ourlet le plus courant. Le bord brut est plié deux fois et caché à l\'intérieur : propre, solide, sans effilochage. Avantage : une seule ligne de piqûre visible à l\'endroit.',
      tools: ['iron', 'ruler', 'gauge', 'chalk', 'pins', 'scissors', 'thread'],
      set: S('straight', 2.5, 0, 4, 'universal', '80/12', std, 'Pour le jean : aiguille 100/16 et longueur 3,5.'),
      fabric: 'Coton, lin, popeline, viscose, toile.',
      steps: [
        { t: 'Marque la hauteur d\'ourlet', d: 'Essaie le vêtement, marque la longueur désirée. Règle générale : jupe/robe 2-4 cm, pantalon 3-4 cm, chemisier 1-1,5 cm. Trace la ligne de pli à la craie.', i: ['pl', 'ruler'] },
        { t: 'Premier pli : 1 cm vers l\'envers', d: 'Plie 1 cm du bord brut vers l\'envers sur toute la longueur. Ce pli cache le bord brut.', i: ['pl', 'fold1'] },
        { t: 'Repasse', d: 'Repasse ce premier pli à la vapeur avant le suivant, avec un mouvement de haut en bas (pas en glissant).', i: ['pl', 'iron'] },
        { t: 'Deuxième pli', d: 'Replie le tout sur la hauteur d\'ourlet souhaitée (ex. 2 cm), jusqu\'à la ligne tracée. Le bord brut est maintenant enfermé.', i: ['pl', 'fold2'] },
        { t: 'Repasse et épingle', d: 'Repasse bien, puis épingle perpendiculairement au bord tous les 5-8 cm.', i: ['pl', 'pins'] },
        { t: 'Règle la machine', d: 'Point droit, longueur 2,5, largeur 0. Aiguille adaptée au tissu.', i: ['machine', 'sel'] },
        { t: 'Piquer à 2 mm du pli', d: 'Place l\'ourlet à l\'envers sous le pied, pique à 2 mm du bord du pli intérieur. Retire les épingles AVANT qu\'elles n\'arrivent sous l\'aiguille.', i: ['pl', 'sewhem'] },
        { t: 'Finir', d: 'Fais un point d\'arrêt (3-4 points arrière) au début ET à la fin. Si tu fais le tour complet, chevauche de 2 cm.', i: ['pl', 'backstitch'] },
        { t: 'Résultat', d: 'À l\'endroit : une seule ligne de piqûre. Repasse une dernière fois.', i: ['xs', 'hem2'] }
      ]
    },

    {
      id: 'hem-simple', cat: 'hems', t: 'Ourlet simple avec bord surfilé', lvl: 1, time: '15 min',
      intro: 'Pour les tissus épais où un double pli serait trop volumineux (jean, toile, doublure). Le bord brut est surfilé au zigzag, plié une seule fois, puis piqué.',
      tools: ['iron', 'ruler', 'chalk', 'pins', 'thread'],
      set: S('zigzag', 2.5, 3.5, 4, 'universal', '80/12 (jean : 100/16)', std, 'Surfilage : zigzag L 2-2,5 / l 3-4. Piqûre : point droit L 3.'),
      steps: [
        { t: 'Marque l\'ourlet', d: 'Trace la hauteur d\'ourlet souhaitée (ex. 3 cm) puis ajoute 1 cm de marge, et coupe.', i: ['pl', 'ruler'] },
        { t: 'Surfiler le bord brut', d: 'Zigzag longueur 2-2,5, largeur 3,5 : la piqûre de droite doit tomber dans le vide, au bord du tissu.', i: ['pl', 'zz-edge'], tip: 'Si ton modèle l\'a, le point surjet donne un meilleur surfilage.' },
        { t: 'Plier une fois', d: 'Replie vers l\'envers à la hauteur d\'ourlet (le bord surfilé reste visible à l\'intérieur) et repasse.', i: ['pl', 'fold2'] },
        { t: 'Épingler', d: 'Épingle perpendiculairement tous les 5 cm.', i: ['pl', 'pins'] },
        { t: 'Piquer', d: 'Remets le point droit L 3. Pique à 3-5 mm du bord surfilé.', i: ['pl', 'sewhem'] },
        { t: 'Résultat', d: 'Un bord propre, peu volumineux.', i: ['xs', 'hem1'] }
      ]
    },

    {
      id: 'hem-blind', cat: 'hems', t: 'Ourlet invisible (pied spécial)', lvl: 3, time: '30 min',
      intro: 'Des points presque invisibles à l\'endroit : idéal pour les pantalons de ville, jupes, robes. Nécessite le pied ourlet invisible (fourni avec certains Tradition, sinon accessoire) et le point « ourlet invisible » de la machine.',
      tools: ['iron', 'pins', 'chalk', 'thread'],
      set: S('blind', 2.5, '2 – 3 (à ajuster)', 4, 'blind', '80/12', 'Fil assorti au tissu', 'Fais un essai sur chute. La largeur détermine la prise du pli : trop large = visible, trop étroite = ne tient pas.'),
      fabric: 'Tissus moyens à épais : laine, gabardine, lin, coton épais.',
      steps: [
        { t: 'Surfiler le bord brut', d: 'Zigzag ou surjet sur le bord brut (c\'est visible à l\'intérieur).', i: ['pl', 'zz-edge'] },
        { t: 'Plier en « Z »', d: 'Replie l\'ourlet vers l\'intérieur, puis replie le vêtement sur lui-même de façon que le bord surfilé dépasse de ~5 mm. Épingle côté droit.', i: ['pl', 'blind-fold'] },
        { t: 'Installer le pied et le point', d: 'Monte le pied ourlet invisible, choisis le point « ourlet invisible » sur le sélecteur.', i: ['foot', 'blind'] },
        { t: 'Aligner la lame-guide sur le pli', d: 'La lame du pied glisse le long du pli du vêtement. Le zigzag « pique » dans le bord de l\'ourlet.', i: ['pl', 'blind-sew'] },
        { t: 'Coudre doucement', d: 'Vitesse lente. Le point droit passe sur le bord surfilé, le petit saut prend UN SEUL fil du pli.', i: ['xs', 'blind'] },
        { t: 'Déplier et repasser', d: 'Déplie l\'ourlet : à l\'endroit, seuls de petits points de la taille d\'une tête d\'épingle sont visibles.', i: ['pl', 'blind-open'] }
      ]
    },

    {
      id: 'hem-rolled', cat: 'hems', t: 'Ourlet roulotté (foulard, volant, tissu fin)', lvl: 3, time: '25 min',
      intro: 'Un ourlet de 2-3 mm, très fin, pour les tissus fluides. Nécessite un pied ourleur (accessoire). Sans pied : on plie 2 fois 3 mm à la main et on pique près du pli.',
      tools: ['pins', 'iron', 'thread'],
      set: S('straight', 2, 0, 3, 'rolled', '70/10', 'Polyester fin', 'Tension basse (3) pour tissu fin. Papier de soie sous le tissu si besoin.'),
      fabric: 'Voile, soie, satin léger, viscose fine.',
      steps: [
        { t: 'Préparer le départ', d: 'Replie à la main 3 mm deux fois sur 5 cm au début du bord, repasse.', i: ['pl', 'rolled-fold'] },
        { t: 'Installer le pied', d: 'Monte le pied ourleur. Pique 3 points à travers ce départ puis laisse l\'aiguille baissée.', i: ['foot', 'rolled'] },
        { t: 'Engager dans la spirale', d: 'Relève le pied, passe le début plié dans la volute et abaisse le pied.', i: ['pl', 'rolled-foot'] },
        { t: 'Coudre en tenant légèrement le bord', d: 'Soulève le tissu devant le pied : il s\'enroule tout seul. Garde une vitesse lente et constante.', i: ['xs', 'rolled'] },
        { t: 'Finir', d: 'Coupe les fils à ras, repasse à la vapeur.' }
      ]
    },

    {
      id: 'hem-stretch', cat: 'hems', t: 'Ourlet sur jersey (T-shirt, legging)', lvl: 2, time: '20 min',
      intro: 'Un point droit casserait sur un tissu extensible. Deux solutions : double aiguille (le plus beau) ou point stretch/petit zigzag (avec une seule aiguille).',
      tools: ['iron', 'pins', 'clips', 'thread'],
      set: S('twin', 3, 0, '3 – 4', 'universal', 'Double aiguille jersey 4,0/75', std, 'Sans double aiguille : zigzag L 3 / l 1 ou point stretch.'),
      fabric: 'Jersey, T-shirt, maille, tricot.',
      steps: [
        { t: 'Plier 2 cm', d: 'Replie une fois 2-2,5 cm vers l\'envers. Repasse à la vapeur sans étirer.', i: ['pl', 'fold2'] },
        { t: 'Mettre la double aiguille', d: 'Éteins la machine, remplace l\'aiguille par une double aiguille « stretch ». Ajoute un second fil sur un 2ᵉ porte-bobine.', i: ['needle', 'types'] },
        { t: 'Régler', d: 'Point droit, largeur 0 (important : sinon l\'aiguille casse), longueur 3, tension 3-4.' },
        { t: 'Piquer à l\'endroit', d: 'Cous depuis le dessus, 1,5-2 cm du bord. Ne tire pas le tissu : laisse-le avancer.', i: ['pl', 'twin-needle'] },
        { t: 'Contrôler', d: 'Dessus : deux lignes parallèles. Dessous : zigzag qui s\'étire avec le tissu.', i: ['pl', 'twin-needle'] }
      ]
    },

    {
      id: 'hem-jean', cat: 'hems', t: 'Raccourcir un jean en gardant l\'ourlet d\'origine', lvl: 3, time: '30 min',
      intro: 'On coupe le surplus au-dessus de l\'ourlet d\'usine, on replie, et on repique sur la couture d\'origine : le résultat semble neuf.',
      tools: ['pins', 'chalk', 'ruler', 'scissors', 'wedge', 'jeanthread'],
      set: S('straight', 3.5, 0, '4 – 5', 'universal', '100/16 (jeans)', 'Fil à surpiquer', 'Vitesse très lente sur les surépaisseurs ; aide avec le volant à la main.'),
      steps: [
        { t: 'Mesurer la longueur manquante', d: 'Enfile le jean avec tes chaussures. Marque la nouvelle longueur sur la jambe (craie).' },
        { t: 'Plier vers l\'intérieur', d: 'Plie le surplus à l\'intérieur de la jambe jusqu\'à ce que l\'ourlet d\'origine arrive sur la longueur voulue, épingle.', i: ['pl', 'jean-fold'] },
        { t: 'Cale sous le pied', d: 'Aux couture latérales, l\'épaisseur est très forte : place une cale (carton plié) derrière le pied pour qu\'il reste à plat.', i: ['pl', 'jean-wedge'] },
        { t: 'Piquer', d: 'Pique juste au-dessus de l\'ancienne piqûre, au plus près de la couture d\'origine.', i: ['pl', 'jean-fold'] },
        { t: 'Couper le surplus', d: 'Coupe l\'excédent de tissu à 1 cm de ta piqûre, et surfile si le bord s\'effiloche.', i: ['pl', 'cut'] }
      ]
    },

    {
      id: 'hem-bias', cat: 'hems', t: 'Ourlet au biais (jupe ample, courbes)', lvl: 3, time: '30 min',
      intro: 'Un bord très courbe (jupe évasée) ne se plie pas bien : le biais s\'étire et épouse la courbe. Il peut être caché à l\'intérieur ou visible.',
      tools: ['biastape', 'pins', 'iron', 'thread'],
      set: S('straight', 2.5, 0, 4, 'universal', '80/12', 'Fil assorti'),
      steps: [
        { t: 'Choisir le biais', d: 'Biais de 2-2,5 cm de large, du même coloris ou en contraste.', i: ['pl', 'bias-open'] },
        { t: 'Déplier un pli', d: 'Ouvre un côté du biais : le pli sert de ligne de piqûre.', i: ['pl', 'bias-open'] },
        { t: 'Épingler endroit contre endroit', d: 'Pose le biais sur le bord du tissu, bord à bord, endroit contre endroit. Épingle en l\'étirant légèrement dans les courbes.', i: ['pl', 'bias-pin'] },
        { t: 'Piquer sur le pli', d: 'Coud exactement sur le pli du biais.', i: ['pl', 'bias-pin'] },
        { t: 'Rabattre vers l\'envers', d: 'Retourne le biais sur l\'envers, repasse, puis pique le bord libre à 2 mm.', i: ['xs', 'bias'] },
        { t: 'Résultat', d: 'Le biais enveloppe le bord, sans effet de plis.', i: ['pl', 'bias-hem'] }
      ]
    },

    {
      id: 'hem-miter', cat: 'hems', t: 'Ourlet à coins en onglet (nappe, serviette)', lvl: 2, time: '30 min',
      intro: 'Pour les pièces à quatre côtés (nappe, serviette, rideau). Les coins en onglet évitent les surépaisseurs.',
      tools: ['iron', 'ruler', 'pins', 'scissors', 'thread'],
      set: S('straight', 2.5, 0, 4, 'universal', '80/12', std),
      steps: [
        { t: 'Marquer les plis', d: 'Sur les 4 côtés, replie 1 cm puis 2 cm vers l\'envers, repasse, puis déplie : tu as des lignes de pli.', i: ['pl', 'miter-1'] },
        { t: 'Rabattre le coin', d: 'À chaque coin, replie la pointe en triangle jusqu\'au croisement des deux plis.', i: ['pl', 'miter-2'] },
        { t: 'Refermer les côtés', d: 'Replie les côtés (1 cm puis 2 cm) : les plis forment un angle à 45° propre. Épingle.', i: ['pl', 'miter-3'] },
        { t: 'Piquer', d: 'Pique à 2 mm du pli intérieur, pivote aiguille baissée aux coins.', i: ['pl', 'miter-4'] },
        { t: 'Pivoter correctement', d: 'Aiguille baissée dans le tissu, relève le pied, pivote de 90°, baisse le pied et repars.', i: ['pl', 'pivot'] }
      ]
    },

    {
      id: 'hem-hand', cat: 'hems', t: 'Ourlet à la main (point invisible)', lvl: 2, time: '30 min',
      intro: 'Pour finir un vêtement délicat (robe, jupe de soirée) sans aucune piqûre visible, sans machine.',
      tools: ['hand', 'thimble', 'iron', 'pins', 'thread'], set: null,
      steps: [
        { t: 'Préparer l\'ourlet', d: 'Surfile le bord, plie-le vers l\'envers et repasse. Épingle.', i: ['pl', 'pins'] },
        { t: 'Enfiler l\'aiguille', d: 'Fil assorti, simple (pas double), long d\'un bras. Noue le bout.' },
        { t: 'Piquer en « Z »', d: 'Prends 1-2 fils du vêtement, puis pique en quinconce dans le pli de l\'ourlet. Points espacés d\'1 cm, fil peu tendu.', i: ['pl', 'hand-hem'] },
        { t: 'Finir', d: 'Fais 2 petits points de bouclage cachés dans le pli et coupe le fil.' }
      ]
    }
  );
})();
