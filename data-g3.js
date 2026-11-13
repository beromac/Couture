/* Guides — partie 3 : vêtements & projets + dépannage */
(function () {
  const std = 'Polyester tout usage';
  G.push(
    /* ================= VÊTEMENTS & PROJETS ================= */
    {
      id: 'g-measure', cat: 'make', t: 'Prendre ses mesures', lvl: 1, time: '10 min',
      intro: 'Des mesures justes = un vêtement qui tombe bien. Mesure en sous-vêtements, mètre ruban souple, à plat sans serrer. Note tout.',
      tools: ['tape'], set: null,
      steps: [
        { t: 'Tour de poitrine', d: 'À l\'endroit le plus fort de la poitrine, mètre horizontal.', i: ['body', 'chest'] },
        { t: 'Tour de taille', d: 'À l\'endroit le plus étroit du buste (au-dessus du nombril).', i: ['body', 'waist'] },
        { t: 'Tour de bassin', d: 'À l\'endroit le plus fort des hanches, à environ 20 cm sous la taille.', i: ['body', 'hip'] },
        { t: 'Longueur souhaitée', d: 'De la taille (ou de l\'épaule) jusqu\'au bas du vêtement.', i: ['body', 'len'] },
        { t: 'Tour de cou', d: 'À la base du cou, sans serrer.', i: ['body', 'neck'] },
        { t: 'Ajouter l\'aisance', d: 'Un vêtement ajusté = + 4 à 6 cm sur le tour ; décontracté = + 10 cm ou plus ; jupe élastique = tour de bassin × 1,5.' }
      ]
    },

    {
      id: 'g-skirt', cat: 'make', t: 'Jupe simple à taille élastique', lvl: 1, time: '1 h 30', calc: 'skirt',
      intro: 'Le meilleur premier vêtement : deux couteaux droits, une couture, un ourlet, une coulisse. Aucun patron nécessaire.',
      tools: ['scissors', 'tape', 'ruler', 'chalk', 'pins', 'iron', 'elastic', 'safety', 'thread'],
      set: S('straight', 2.5, 0, 4, 'universal', '80/12', std),
      fabric: 'Coton, popeline, viscose, jersey épais (au point stretch).',
      steps: [
        { t: 'Calculer les dimensions', d: 'Utilise le calculateur ci-dessus : largeur de la jupe, hauteur de coupe, longueur d\'élastique.', i: ['pat', 'rect', [['Jupe', 'Largeur L', 'Hauteur H', '1 rectangle']]] },
        { t: 'Couper', d: 'Coupe un rectangle (ou deux, un devant et un dos) dans le droit-fil.', i: ['pl', 'layout'] },
        { t: 'Fermer le côté', d: 'Plie endroit contre endroit pour former un tube, épingle et pique la couture (1,5 cm). Surfile et repasse ouvert.', i: ['pl', 'seam-pin'] },
        { t: 'Faire l\'ourlet du bas', d: 'Replie 1 cm puis 3 cm vers l\'envers, repasse, pique à 2 mm du pli.', i: ['xs', 'hem2'] },
        { t: 'Préparer la coulisse', d: 'En haut, plie 1 cm puis (largeur de l\'élastique + 0,5 cm) vers l\'envers.', i: ['pl', 'casing-fold'] },
        { t: 'Piquer la coulisse', d: 'Pique près du bord du pli en laissant 4 cm ouverts.', i: ['pl', 'casing-sew'] },
        { t: 'Passer l\'élastique', d: 'Coupe l\'élastique à la longueur calculée, passe-le dans la coulisse, raboute et ferme l\'ouverture.', i: ['pl', 'elastic-pin'] },
        { t: 'Répartir les fronces', d: 'Étire la jupe pour répartir régulièrement le tissu autour de l\'élastique.', i: ['xs', 'casing'] }
      ]
    },

    {
      id: 'g-tee', cat: 'make', t: 'T-shirt basique en jersey (coupe droite)', lvl: 2, time: '2 h', calc: 'tee',
      intro: 'Un T-shirt à épaules tombantes composé de rectangles : aucun patron à acheter. Tu apprends le jersey, la bande d\'encolure et l\'ourlet à la double aiguille.',
      tools: ['rotary', 'scissors', 'tape', 'clips', 'iron', 'thread', 'needles'],
      set: S('stretch', 3, 1, 3, 'universal', 'Jersey 75/11 – 90/14', std, 'Point stretch ou zigzag étroit L 3 / l 1 pour toutes les coutures. Ourlets : double aiguille.'),
      fabric: 'Jersey de coton avec élasthanne (5 %).',
      steps: [
        { t: 'Calculer les pièces', d: 'Entre tes mesures dans le calculateur : corps (2 pièces), manches (2 pièces), bande d\'encolure.', i: ['pat', 'tee'] },
        { t: 'Couper', d: 'Coupe devant et dos sur le pli, sans étirer. Le droit-fil du jersey est dans le sens des mailles verticales.', i: ['pl', 'cut'] },
        { t: 'Coudre les épaules', d: 'Assemble devant et dos aux épaules (point stretch), marge 1 cm.', i: ['pl', 'seam-pin'] },
        { t: 'Poser la bande d\'encolure', d: 'Plie la bande en deux dans la longueur, répartis en 4 repères (épaules, devant, dos) et épingle en l\'étirant légèrement.', i: ['pl', 'tee-neck'] },
        { t: 'Piquer l\'encolure', d: 'Coud en étirant légèrement la bande pour qu\'elle suive l\'encolure. Rabats la marge sur le corps et surpique à la double aiguille.', i: ['pl', 'tee-neck'] },
        { t: 'Poser les manches à plat', d: 'Épingle le haut de chaque manche sur le contour de l\'emmanchure, endroit contre endroit, et pique.', i: ['pl', 'tee-sleeve'] },
        { t: 'Fermer les côtés', d: 'Plie le tout, endroit contre endroit, et coud les côtés et le dessous des manches d\'un seul trait.', i: ['pat', 'tee'] },
        { t: 'Ourlets', d: 'Ourlets du bas et des manches à la double aiguille.', i: ['pl', 'twin-needle'] }
      ]
    },

    {
      id: 'g-pants', cat: 'make', t: 'Pantalon à taille élastique', lvl: 2, time: '3 h', calc: 'pants',
      intro: 'Un pantalon facile à porter : 4 pièces (2 devants, 2 dos), une coulisse. Parfait avec un patron simplifié.',
      tools: ['scissors', 'tape', 'chalk', 'pins', 'iron', 'elastic', 'safety', 'thread'],
      set: S('straight', 2.5, 0, 4, 'universal', '80/12 – 90/14', std),
      fabric: 'Coton, lin, viscose, toile légère.',
      steps: [
        { t: 'Prendre les mesures', d: 'Tour de bassin, hauteur de fourche (assis, de la taille à la chaise) et longueur extérieure.', i: ['body', 'hip'] },
        { t: 'Tracer le patron', d: 'Utilise le calculateur : largeur et hauteur des 4 pièces. Courbe de fourche à tracer au curvimètre.', i: ['pat', 'pants'] },
        { t: 'Couper 4 pièces', d: '2 devants + 2 dos, dans le droit-fil, crans aux repères.', i: ['pl', 'cut'] },
        { t: 'Coudre les côtés', d: 'Pique endroit contre endroit côté extérieur, puis côté intérieur. Surfile et repasse.', i: ['pl', 'seam-pin'] },
        { t: 'Assembler les deux jambes', d: 'Mets une jambe à l\'endroit dans l\'autre jambe à l\'envers, et pique la courbe de fourche. Renforce par 2 piqûres.', i: ['pl', 'pants-crotch'] },
        { t: 'Ourlets du bas', d: 'Replie 1 cm puis 3 cm et pique.', i: ['xs', 'hem2'] },
        { t: 'Coulisse et élastique', d: 'Plie 1 cm puis la largeur de l\'élastique + 0,5, pique, passe l\'élastique.', i: ['pl', 'casing-fold'] }
      ]
    },

    {
      id: 'g-dress', cat: 'make', t: 'Robe trapèze simple (sans fermeture)', lvl: 2, time: '3 h', calc: 'dress',
      intro: 'Une robe qui s\'enfile par la tête, avec encolure bordée de biais et emmanchures bordées. Tissu non extensible : prévoir assez d\'aisance.',
      tools: ['scissors', 'tape', 'tracing', 'chalk', 'pins', 'iron', 'biastape', 'snips', 'thread'],
      set: S('straight', 2.5, 0, 4, 'universal', '80/12', std),
      fabric: 'Coton, viscose, crêpe, lin.',
      steps: [
        { t: 'Tracer le patron', d: 'Avec le calculateur : trapèze devant sur le pli, trapèze dos sur le pli, décolleté et emmanchures à tracer à main levée.', i: ['pat', 'dress'] },
        { t: 'Couper devant et dos', d: 'Plie le tissu endroit contre endroit, coupe en suivant le patron.', i: ['pl', 'layout'] },
        { t: 'Épaules', d: 'Assemble les épaules (1,5 cm). Surfile.', i: ['pl', 'seam-pin'] },
        { t: 'Border l\'encolure', d: 'Pose un biais sur l\'encolure.', i: ['pl', 'bias-pin'] },
        { t: 'Border les emmanchures', d: 'Même technique pour chaque emmanchure.', i: ['xs', 'bias'] },
        { t: 'Fermer les côtés', d: 'Coud les côtés d\'un seul trait (de l\'aisselle à l\'ourlet).', i: ['pl', 'seam-pin'] },
        { t: 'Ourlet', d: 'Ourlet double 1 + 2,5 cm.', i: ['xs', 'hem2'] }
      ]
    },

    {
      id: 'g-tote', cat: 'make', t: 'Sac cabas (tote bag) renforcé', lvl: 1, time: '1 h', calc: 'tote',
      intro: 'Un projet rapide et utile pour s\'entraîner aux coutures et aux surpiqûres.',
      tools: ['scissors', 'ruler', 'iron', 'pins', 'jeanthread'],
      set: S('straight', 3, 0, 4, 'universal', '90/14 – 100/16', 'Fil à surpiquer', 'Toile épaisse : longueur 3, aiguille 100/16.'),
      fabric: 'Toile de coton, lin épais, jean léger.',
      steps: [
        { t: 'Couper', d: 'Calcule avec le calculateur : 2 pièces pour le corps du sac + 2 bandes pour les anses.', i: ['pat', 'rect', [['Corps', 'Largeur L', 'Hauteur H', '× 2'], ['Anse', 'Longueur A', '10 cm', '× 2']]] },
        { t: 'Préparer les anses', d: 'Plie la bande en deux dans la longueur, replie les bords vers le centre (2,5 cm), puis replie de nouveau : 4 plis. Pique les 2 bords.', i: ['pl', 'strap', 1] },
        { t: 'Surpiquer', d: 'Deux piqûres tout le long des anses.', i: ['pl', 'strap', 3] },
        { t: 'Ourlet du haut', d: 'Chaque pièce : ourlet double (1 + 3 cm).', i: ['xs', 'hem2'] },
        { t: 'Poser les anses', d: 'Épingle les anses sur l\'endroit à 6 cm des bords, pique un rectangle renforcé de croix.', i: ['pl', 'tote'] },
        { t: 'Assembler', d: 'Endroit contre endroit, pique les 3 côtés (côtés + fond) avec 1,5 cm de marge, surfile, retourne.', i: ['pl', 'seam-sew'] }
      ]
    },

    {
      id: 'g-pillow', cat: 'make', t: 'Housse de coussin à rabat', lvl: 1, time: '45 min', calc: 'pillow',
      intro: 'Une housse sans fermeture : deux pièces au dos se chevauchent et laissent l\'ouverture. Idéal pour apprendre à ourler et assembler.',
      tools: ['scissors', 'ruler', 'iron', 'pins', 'thread'],
      set: S('straight', 2.5, 0, 4, 'universal', '80/12', std),
      steps: [
        { t: 'Couper', d: 'Utilise le calculateur : 1 devant et 2 dos.', i: ['pl', 'pillow'] },
        { t: 'Ourler les dos', d: 'Ourle le bord droit de chaque dos (1 + 2 cm).', i: ['xs', 'hem2'] },
        { t: 'Chevaucher', d: 'Pose le devant à l\'endroit, puis les deux dos endroit contre endroit, qui se chevauchent.', i: ['pl', 'pillow'] },
        { t: 'Piquer tout le tour', d: 'Pique avec 1,5 cm de marge, pivote aux angles.', i: ['pl', 'pivot'] },
        { t: 'Couper les angles', d: 'Coupe les angles en biais, retourne, repasse.', i: ['pl', 'clip-corner'] }
      ]
    },

    /* ================= DÉPANNAGE ================= */
    {
      id: 'r-problems', cat: 'fix', t: 'Problèmes fréquents et solutions', lvl: 1, time: '10 min',
      intro: 'Avant de paniquer : 90 % des soucis se règlent par (1) ré-enfiler la machine pied relevé, (2) changer l\'aiguille, (3) refaire la canette.',
      tools: ['needles', 'thread'], set: null,
      steps: [
        { t: 'Points sautés', d: 'Aiguille émoussée, tordue, mal enfoncée (plat vers l\'arrière) ou inadaptée au tissu : change-la.', i: ['tr', 'skip'] },
        { t: 'Nid de fil sous le tissu', d: 'Tu as cousu avec le pied relevé ou le fil mal engagé dans les tensions. Coupe, ré-enfile pied RELEVÉ.', i: ['tr', 'nest'] },
        { t: 'Boucles du fil de dessus', d: 'La tension du dessus est trop faible, ou le fil n\'est pas entre les disques.', i: ['tr', 'loose'] },
        { t: 'Le fil de dessous remonte', d: 'La tension du dessus est trop forte, ou la canette est mal placée.', i: ['tr', 'tight'] },
        { t: 'Tissu froncé', d: 'Tension trop forte, aiguille trop grosse ou points trop courts.', i: ['tr', 'pucker'] },
        { t: 'Le fil casse', d: 'Mauvais enfilage, aiguille abîmée, fil de mauvaise qualité ou tension trop forte. Ré-enfile entièrement.', i: ['thread', 3] },
        { t: 'L\'aiguille casse', d: 'Tu as tiré le tissu, piqué sur une épingle ou une couche trop épaisse. Utilise une aiguille plus grosse et ralentis.', i: ['needle', 'sizes'] },
        { t: 'Le tissu n\'avance pas', d: 'Les griffes sont abaissées, ou le pied est mal baissé. Remonte les griffes et abaisse le pied.', i: ['pl', 'feeddogs'] },
        { t: 'Point correct', d: 'Quand tout est réglé, les points sont réguliers.', i: ['tr', 'ok'] }
      ]
    },

    {
      id: 'r-unpick', cat: 'fix', t: 'Découdre proprement', lvl: 1, time: '5 min',
      intro: 'Une erreur ? Pas de panique : on découd et on recommence.',
      tools: ['unpick'], set: null,
      steps: [
        { t: 'Repérer le fil', d: 'Retourne le tissu et coupe un fil de piqûre tous les 3-4 points avec le découd-vite.', i: ['pl', 'unpick'] },
        { t: 'Tirer le fil', d: 'Tire le fil du dessous : les points se défont d\'un coup.' },
        { t: 'Nettoyer', d: 'Enlève les petits bouts de fil avec un rouleau adhésif ou ta main.' },
        { t: 'Repasser', d: 'Repasse à la vapeur pour effacer les trous d\'aiguille (sauf soie, satin, cuir).' }
      ]
    },

    {
      id: 'r-care', cat: 'fix', t: 'Entretenir sa machine', lvl: 1, time: '10 min',
      intro: 'Une machine propre coud mieux, plus longtemps.',
      tools: ['needles'], set: null,
      steps: [
        { t: 'Débrancher', d: 'Éteins et débranche toujours avant le nettoyage.' },
        { t: 'Retirer la plaque à aiguille', d: 'Dévisse la plaque à aiguille avec le petit tournevis fourni.' },
        { t: 'Enlever les peluches', d: 'Brosse (fournie) les peluches autour des griffes et du logement de canette. Ne souffle pas dessus (l\'humidité provoque de la rouille).', i: ['pl', 'feeddogs'] },
        { t: 'Huiler (si ton manuel l\'indique)', d: 'Une goutte d\'huile pour machine à coudre sur les pièces indiquées.' },
        { t: 'Ranger', d: 'Aiguille en haut, pied relevé, housse sur la machine.' }
      ]
    }
  );
})();
