/* Guides — partie 2 : coutures + détails */
(function () {
  const std = 'Polyester tout usage';
  G.push(
    /* ================= COUTURES ================= */
    {
      id: 's-straight', cat: 'seams', t: 'Couture droite de base (assembler deux pièces)', lvl: 1, time: '15 min',
      intro: 'La couture la plus utilisée : deux pièces assemblées endroit contre endroit avec 1,5 cm de marge.',
      tools: ['pins', 'iron', 'snips', 'thread'],
      set: S('straight', 2.5, 0, 4, 'universal', '80/12', std),
      steps: [
        { t: 'Superposer endroit contre endroit', d: 'Les deux beaux côtés se touchent. Fais coïncider les bords et les crans.', i: ['pl', 'seam-pin'] },
        { t: 'Épingler', d: 'Épingles perpendiculaires à la couture, tous les 8-10 cm, têtes vers le bord.', i: ['pl', 'seam-pin'] },
        { t: 'Aligner sur 1,5 cm', d: 'Place le bord du tissu sur le repère 1,5 cm (5/8") gravé sur la plaque à aiguille.', i: ['pl', 'seam-sew'] },
        { t: 'Piquer avec points d\'arrêt', d: 'Marche arrière 3-4 points au départ et à la fin. Retire les épingles au fur et à mesure.', i: ['pl', 'backstitch'] },
        { t: 'Repasser la couture', d: 'Repasse à plat la couture « fermée », puis ouvre-la au fer, marges écartées.', i: ['pl', 'seam-open'] },
        { t: 'Résultat', d: 'Couture ouverte à plat : propre et durable.', i: ['xs', 'seam'] }
      ]
    },

    {
      id: 's-finish', cat: 'seams', t: 'Finitions de marges (zigzag / surjet)', lvl: 1, time: '10 min',
      intro: 'Pour que les bords bruts ne s\'effilochent pas, on les surfile après avoir ouvert la couture.',
      tools: ['thread'],
      set: S('zigzag', 2.5, 3.5, 4, 'universal', '80/12', std, 'Si ta machine a un point surjet/overlock, utilise-le : plus propre et plus souple.'),
      steps: [
        { t: 'Ouvre la couture', d: 'Repasse les marges écartées.', i: ['pl', 'seam-open'] },
        { t: 'Règle le zigzag', d: 'Zigzag L 2,5 / l 3,5. Passe le bord brut sous le pied : la piqûre de droite doit tomber à quelques millimètres du bord.', i: ['pl', 'zz-edge'] },
        { t: 'Surfiler chaque marge', d: 'Chaque marge de couture est surfilée séparément.', i: ['pl', 'seam-zz'] },
        { t: 'Variante avec rabat', d: 'Pour tissus fins : replie 5 mm et pique au point droit à 3 mm du pli.', i: ['xs', 'hem1'] }
      ]
    },

    {
      id: 's-french', cat: 'seams', t: 'Couture anglaise (fine, sans bord brut visible)', lvl: 2, time: '25 min',
      intro: 'Pour les tissus fins et transparents (voile, mousseline) : la couture encadre ses propres bords bruts et n\'a pas besoin de surfilage.',
      tools: ['pins', 'iron', 'snips', 'thread'],
      set: S('straight', 2.5, 0, 3, 'universal', '70/10', 'Polyester fin'),
      steps: [
        { t: 'Envers contre envers', d: 'Contrairement à la couture classique, on pose d\'abord ENVERS contre ENVERS.', i: ['xs', 'french', 1] },
        { t: 'Piquer à 7 mm', d: 'Pique à 7 mm du bord brut.', i: ['xs', 'french', 1] },
        { t: 'Recouper', d: 'Coupe la marge à 3 mm de la piqûre.', i: ['xs', 'french', 1] },
        { t: 'Plier sur la couture', d: 'Replie le tissu pour mettre ENDROIT contre ENDROIT, en pliant exactement sur la première piqûre. Repasse.', i: ['xs', 'french', 2] },
        { t: 'Piquer à 8 mm', d: 'Pique à 8 mm de ce pli : le bord brut est enfermé dans la couture.', i: ['xs', 'french', 2] }
      ]
    },

    {
      id: 's-flatfell', cat: 'seams', t: 'Couture rabattue (jean, chemise, sport)', lvl: 2, time: '25 min',
      intro: 'Couture solide à deux piqûres visibles à l\'endroit. Typique du jean et des chemises.',
      tools: ['pins', 'iron', 'snips', 'jeanthread'],
      set: S('straight', 3, 0, 4, 'universal', '90/14 – 100/16', 'Fil jean ou polyester'),
      steps: [
        { t: 'Piquer envers contre envers', d: 'Superpose les pièces envers contre envers et pique à 1,5 cm.', i: ['xs', 'flatfell', 1] },
        { t: 'Recouper', d: 'Recoupe une des marges à 3 mm.', i: ['xs', 'flatfell', 1] },
        { t: 'Rabattre', d: 'Plie la grande marge sur la petite, repasse bien à plat.', i: ['xs', 'flatfell', 2] },
        { t: 'Piquer au bord', d: 'Pique à 2 mm du pli ; deuxième piqûre à 7-8 mm.', i: ['xs', 'flatfell', 2] }
      ]
    },

    {
      id: 's-curve', cat: 'seams', t: 'Coudre courbes et angles', lvl: 2, time: '20 min',
      intro: 'Pour que col, emmanchure, encolure ou angle se plaquent à plat après avoir été retournés, il faut entailler les marges.',
      tools: ['snips', 'iron', 'pins'],
      set: S('straight', 2, 0, 4, 'universal', '80/12', std, 'Points plus petits (L 2) dans les courbes.'),
      steps: [
        { t: 'Coudre doucement', d: 'Vitesse réduite, aiguille piquée pour pivoter au besoin. Guide le tissu du bout des doigts sans tirer.', i: ['pl', 'curve-sew'] },
        { t: 'Courbe convexe (bombée)', d: 'Coupe de petits V dans la marge, sans couper la piqûre.', i: ['pl', 'clip-curve'] },
        { t: 'Courbe concave (creuse)', d: 'Fais de petites entailles perpendiculaires à la couture (à 1 mm de la piqûre).', i: ['pl', 'clip-curve'] },
        { t: 'Angles', d: 'Coupe l\'angle en biais à 2 mm de la couture avant de retourner.', i: ['pl', 'clip-corner'] },
        { t: 'Pivoter', d: 'Pour un angle droit : aiguille baissée, pied relevé, pivote, pied baissé.', i: ['pl', 'pivot'] }
      ]
    },

    {
      id: 's-topstitch', cat: 'seams', t: 'Surpiqûre décorative', lvl: 2, time: '15 min',
      intro: 'Une piqûre visible à l\'endroit pour renforcer un bord (col, poche, ceinture) et lui donner un aspect fini.',
      tools: ['ruler', 'pins', 'jeanthread'],
      set: S('straight', 3, 0, 4, 'universal', '90/14 ou 100/16', 'Fil à surpiquer (jean)', 'Pour une ligne parfaitement régulière, utilise un guide ou du ruban adhésif de peintre comme repère.'),
      steps: [
        { t: 'Repasser la couture', d: 'Repasse les marges du côté où tu veux piquer.' },
        { t: 'Allonger le point', d: 'Longueur 3-3,5, fil à surpiquer, aiguille 100/16.' },
        { t: 'Guider le bord', d: 'Aligne le bord sur un repère de la plaque (par ex. 6 mm ou 1 cm).', i: ['pl', 'topstitch'] },
        { t: 'Coudre doucement', d: 'Pique à vitesse lente. Pour un virage, pivote aiguille baissée.' }
      ]
    },

    {
      id: 's-gather', cat: 'seams', t: 'Faire des fronces', lvl: 2, time: '20 min',
      intro: 'Les fronces donnent du volume (jupe, manche, volant). On fait deux rangs de grands points puis on tire les fils du dessous.',
      tools: ['pins', 'thread'],
      set: S('straight', 5, 0, 2, 'universal', '80/12', std, 'Longueur au maximum (4-5), tension à 2 pour pouvoir tirer le fil de canette.'),
      steps: [
        { t: 'Régler', d: 'Point droit, longueur maxi (4-5), tension 1-2.' },
        { t: 'Deux rangs de piqûre', d: 'Pique deux lignes parallèles, à 1 cm et 1,5 cm du bord, SANS point d\'arrêt. Laisse 10 cm de fil aux extrémités.', i: ['pl', 'gather'] },
        { t: 'Tirer les fils du dessous', d: 'Tire doucement les deux fils de canette ensemble, du côté qui doit rétrécir.', i: ['pl', 'gather'] },
        { t: 'Répartir', d: 'Répartis les fronces régulièrement jusqu\'à la longueur désirée.' },
        { t: 'Assembler', d: 'Épingle la pièce froncée sur l\'autre pièce, puis pique entre les deux rangs de fronces à tension normale (4), en lissant à la main.', i: ['pl', 'seam-pin'] }
      ]
    },

    {
      id: 's-dart', cat: 'seams', t: 'Faire une pince', lvl: 2, time: '15 min',
      intro: 'La pince donne de la forme au vêtement (poitrine, taille). C\'est un triangle piqué.',
      tools: ['chalk', 'pins', 'iron', 'tailorsham'],
      set: S('straight', 2.5, 0, 4, 'universal', '80/12', std),
      steps: [
        { t: 'Reporter', d: 'Marque les 3 points de la pince (2 en haut, 1 pointe).' },
        { t: 'Plier', d: 'Plie endroit contre endroit en faisant coïncider les deux branches, épingle.', i: ['pl', 'dart'] },
        { t: 'Piquer', d: 'Pique du bord large jusqu\'à la pointe, en effilant. Termine hors du tissu, SANS point d\'arrêt.', i: ['pl', 'dart'] },
        { t: 'Nouer', d: 'Noue les deux fils à la main à la pointe.' },
        { t: 'Repasser', d: 'Repasse la pince vers le centre (pinces de taille) ou vers le bas (poitrine), sur un jamon.' }
      ]
    },

    {
      id: 's-stretch', cat: 'seams', t: 'Coudre le jersey et les tissus extensibles', lvl: 2, time: '20 min',
      intro: 'Une couture droite classique casse quand le tissu s\'étire. Utilise un point qui suit le mouvement.',
      tools: ['clips', 'thread'],
      set: S('stretch', 3, 1, 3, 'universal', 'Aiguille jersey 75/11 – 90/14', std, 'Point stretch ou petit zigzag L 3 / l 1. Sinon double aiguille pour les ourlets.'),
      steps: [
        { t: 'Mettre l\'aiguille jersey', d: 'La pointe ronde glisse entre les mailles sans les couper.', i: ['needle', 'types'] },
        { t: 'Choisir le point', d: 'Point stretch (zigzag étroit) : il s\'étire avec le tissu.', i: ['machine', 'sel'] },
        { t: 'Ne pas tirer', d: 'Laisse les griffes entraîner le tissu. Tirer l\'étire et la couture ondule.' },
        { t: 'Marges', d: 'Les marges ne s\'effilochent pas : pas besoin de surfiler.' }
      ]
    },

    /* ================= DÉTAILS ================= */
    {
      id: 'c-zip', cat: 'details', t: 'Fermeture à glissière classique', lvl: 3, time: '45 min',
      intro: 'Une fermeture à glissière standard cousue dans une couture ouverte (côté, dos de jupe ou de robe).',
      tools: ['pins', 'iron', 'snips', 'thread'],
      set: S('straight', 2.5, 0, 4, 'zip', '80/12', std, 'Pied fermeture : positionne-le à gauche de l\'aiguille pour le premier côté, à droite pour le second (ou l\'inverse).'),
      steps: [
        { t: 'Préparer l\'ouverture', d: 'Coud la couture normale, puis les points LONGS (bâti) sur la longueur de la fermeture. Repasse ouvert.', i: ['pl', 'zip-prep'] },
        { t: 'Épingler la fermeture', d: 'Pose la fermeture à l\'envers sur la couture ouverte, dents centrées sous le bâti.', i: ['pl', 'zip-pin'] },
        { t: 'Monter le pied fermeture', d: 'Pied zip posé à droite ou à gauche de l\'aiguille pour longer les dents.', i: ['foot', 'zip'] },
        { t: 'Piquer un côté', d: 'Du haut vers le bas, à 5 mm des dents.', i: ['pl', 'zip-foot'] },
        { t: 'Piquer l\'autre côté', d: 'Reviens en haut, déplace le pied de l\'autre côté, pique de nouveau du haut vers le bas.', i: ['pl', 'zip-final'] },
        { t: 'Découdre le bâti', d: 'Découds les points longs, repasse.', i: ['pl', 'zip-final'], tip: 'Pour une fermeture invisible : même principe mais avec le pied dédié, qui se glisse sous les dents enroulées.' }
      ]
    },

    {
      id: 'c-zip-invis', cat: 'details', t: 'Fermeture invisible', lvl: 3, time: '45 min',
      intro: 'La fermeture qui disparaît dans la couture. Nécessite un pied fermeture invisible (accessoire).',
      tools: ['pins', 'iron', 'thread'],
      set: S('straight', 2.5, 0, 4, 'zip', '80/12', std, 'Pied pour fermeture invisible (acc.).'),
      steps: [
        { t: 'Déplier les dents', d: 'Avant de coudre, ouvre la fermeture et repasse les dents pour les redresser.', i: ['pl', 'zip-invisible'] },
        { t: 'Pose la fermeture sur l\'endroit', d: 'Endroit contre endroit, dents sur la ligne de couture.', i: ['pl', 'zip-pin'] },
        { t: 'Piquer', d: 'Les dents se logent dans le creux du pied : tu piques au plus près.', i: ['foot', 'zip'] },
        { t: 'Fermer le bas', d: 'Ferme la couture sous la fermeture au pied normal.' }
      ]
    },

    {
      id: 'c-bh', cat: 'details', t: 'Boutonnière (4 temps)', lvl: 3, time: '20 min',
      intro: 'Sur la plupart des Singer Tradition, la boutonnière se fait en 4 étapes : le sélecteur change de position à chaque étape. Teste toujours sur une chute.',
      tools: ['chalk', 'pins', 'unpick', 'interfacing'],
      set: S('buttonhole', 'Satin court (0,5 – 1)', 5, 4, 'bh', '80/12', std, 'Réglage : longueur à 0,5 – 1 (satin). Largeur 5. Suivre la séquence des 4 positions du sélecteur du manuel.'),
      steps: [
        { t: 'Renforcer', d: 'Colle un renfort thermocollant à l\'envers pour que la boutonnière ne se déforme pas.' },
        { t: 'Marquer', d: 'Marque la longueur : diamètre du bouton + son épaisseur (≈ +3 mm). Trace-la à la craie.', i: ['pl', 'bh-mark'] },
        { t: 'Mettre le pied', d: 'Monte le pied boutonnière 4 temps et glisse le bouton dans le support à l\'arrière.', i: ['foot', 'bh'] },
        { t: 'Les 4 temps', d: '1) barre de gauche vers le bas, 2) barre du bas, 3) barre de droite vers le haut, 4) barre du haut. Change de position du sélecteur à chaque étape, aiguille relevée.', i: ['pl', 'bh-steps'] },
        { t: 'Ouvrir', d: 'Pique une épingle à chaque extrémité (pour ne pas couper la barre) puis passe le découd-vite au centre.', i: ['pl', 'bh-cut'] },
        { t: 'Vérifier', d: 'Glisse le bouton : il doit entrer sans forcer.' }
      ]
    },

    {
      id: 'c-btn', cat: 'details', t: 'Coudre un bouton à la machine', lvl: 2, time: '10 min',
      intro: 'Beaucoup plus rapide qu\'à la main. Le bouton à 2 ou 4 trous se coud en zigzag, griffes abaissées.',
      tools: ['pins', 'bodkin'],
      set: S('zigzag', 0, 'Écart entre les trous (≈ 3 – 4)', 4, 'btn', '80/12', std, 'Longueur 0, griffes abaissées. Fais le test volant à la main avant de piquer.'),
      steps: [
        { t: 'Abaisser les griffes', d: 'Longueur à 0 et griffes abaissées.', i: ['pl', 'feeddogs'] },
        { t: 'Placer le bouton', d: 'Tiens le bouton sous le pied pose-bouton, trous alignés.', i: ['foot', 'btn'] },
        { t: 'Régler la largeur', d: 'La largeur du zigzag doit égaler l\'écart des deux trous. Tourne le volant à la main pour tester.', i: ['pl', 'btn-sew'] },
        { t: 'Piquer', d: 'Pique 8-10 points en zigzag. Pour un bouton à queue, pose une allumette dessus.', i: ['pl', 'btn-shank'] },
        { t: 'Finir', d: 'Tire les fils à l\'envers, noue et coupe.' }
      ]
    },

    {
      id: 'c-pocket', cat: 'details', t: 'Poche plaquée', lvl: 2, time: '30 min',
      intro: 'Une poche cousue à l\'extérieur d\'un vêtement (pantalon, tablier, chemise).',
      tools: ['iron', 'pins', 'chalk', 'ruler', 'jeanthread'],
      set: S('straight', 2.5, 0, 4, 'universal', '80/12', 'Fil assorti (ou à surpiquer)'),
      steps: [
        { t: 'Ourler le haut', d: 'Plie 1 puis 2 cm sur le haut de la poche et pique.', i: ['pl', 'pocket-hem'] },
        { t: 'Plier les 3 autres côtés', d: 'Replie 1,5 cm sur les trois autres côtés et repasse (utilise un gabarit en carton).', i: ['pl', 'pocket-hem'] },
        { t: 'Placer sur le vêtement', d: 'Mesure l\'emplacement, marque les coins, épingle.', i: ['pl', 'pocket-pin'] },
        { t: 'Piquer', d: 'Pique à 2 mm du bord sur 3 côtés. Renforce les coins du haut avec un petit triangle ou un rectangle de piqûres.', i: ['pl', 'pocket-sew'] }
      ]
    },

    {
      id: 'c-elastic', cat: 'details', t: 'Coulisse avec élastique (taille)', lvl: 1, time: '25 min',
      intro: 'La façon la plus simple de faire une taille : un tunnel replié dans lequel on passe un élastique.',
      tools: ['elastic', 'safety', 'iron', 'pins'],
      set: S('straight', 2.5, 0, 4, 'universal', '80/12', std, 'Laisser une ouverture de 4 cm pour passer l\'élastique.'),
      steps: [
        { t: 'Calculer la coulisse', d: 'Hauteur de coulisse = largeur de l\'élastique + 1,5 cm (1 cm de pli + 0,5 de jeu).', i: ['pl', 'casing-fold'] },
        { t: 'Plier et repasser', d: 'Plie d\'abord 1 cm vers l\'envers, puis la hauteur de coulisse. Épingle.', i: ['pl', 'casing-fold'] },
        { t: 'Piquer', d: 'Pique près du pli intérieur. Laisse 4 cm ouverts.', i: ['pl', 'casing-sew'] },
        { t: 'Passer l\'élastique', d: 'Épingle à nourrice sur le bout, fais-la glisser tout le tour de la coulisse.', i: ['pl', 'elastic-pin'] },
        { t: 'Assembler les deux bouts', d: 'Chevauche de 2 cm et coud en zigzag.', i: ['pl', 'elastic-join'] },
        { t: 'Fermer l\'ouverture', d: 'Pique l\'ouverture de 4 cm.', i: ['xs', 'casing'] }
      ]
    },

    {
      id: 'c-bias', cat: 'details', t: 'Border avec du biais (encolure, emmanchure)', lvl: 2, time: '30 min',
      intro: 'Le biais permet de finir proprement un bord courbe sans ourlet.',
      tools: ['biastape', 'iron', 'pins', 'snips'],
      set: S('straight', 2.5, 0, 4, 'universal', '80/12', std),
      steps: [
        { t: 'Choisir le biais', d: 'Biais de 2-2,5 cm de large (ou du biais fait maison).', i: ['pl', 'bias-open'] },
        { t: 'Épingler', d: 'Endroit contre endroit, bord à bord. Étire légèrement dans les courbes.', i: ['pl', 'bias-pin'] },
        { t: 'Piquer sur le pli', d: 'Pique dans le pli du biais, point d\'arrêt au début et à la fin.', i: ['pl', 'bias-pin'] },
        { t: 'Cranter', d: 'Fais de petites entailles dans la marge pour que le biais se rabatte à plat.', i: ['pl', 'clip-curve'] },
        { t: 'Rabattre et piquer', d: 'Retourne le biais vers l\'envers, repasse, pique le bord à 2 mm.', i: ['xs', 'bias'] }
      ]
    }
  );
})();
