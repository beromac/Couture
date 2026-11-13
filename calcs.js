/* Calculateurs de projets (dimensions de coupe, élastique, métrage) — toutes mesures en cm */
(function () {
  const r5 = x => Math.round(x * 2) / 2;                    // arrondi au 0,5 cm
  const f = x => String(r5(x)).replace('.', ',');
  const metres = (cm) => (Math.ceil((cm + 10) / 10) / 10).toFixed(1).replace('.', ',');
  const FW = 140;                                           // largeur de tissu courante (cm)
  const panels = w => Math.max(1, Math.ceil(w / FW));

  const CALCS = {
    skirt: {
      title: 'Calculateur : jupe froncée',
      fields: [
        { k: 'hip', l: 'Tour de bassin', u: 'cm', v: 95 },
        { k: 'waist', l: 'Tour de taille', u: 'cm', v: 76 },
        { k: 'len', l: 'Longueur finie (taille → ourlet)', u: 'cm', v: 60 },
        { k: 'el', l: 'Largeur de l\'élastique', u: 'cm', v: 2.5 },
        { k: 'full', l: 'Ampleur (1,5 = légère, 2 = ample)', u: '×', v: 1.5 }
      ],
      run(v) {
        const w = v.hip * v.full + 3, h = v.len + 4 + v.el + 1.5, n = panels(w);
        return {
          rows: [
            ['Rectangle à couper', f(w) + ' × ' + f(h) + ' cm'],
            ['Largeur : ampleur × bassin + 2 marges de 1,5', f(w) + ' cm'],
            ['Hauteur : longueur + ourlet 4 + coulisse ' + f(v.el + 1.5), f(h) + ' cm'],
            ['Élastique à couper', f(v.waist * 0.9 + 2) + ' cm (taille − 10 % + 2 cm de recouvrement)'],
            ['Tissu (laize 140 cm)', '≈ ' + metres(h * n) + ' m' + (n > 1 ? ' (' + n + ' lés à assembler)' : '')]
          ],
          warn: v.waist * 0.9 + 2 + 5 < v.hip * 0.7 ? '' : '',
          pat: ['rect', [['Jupe', f(w) + ' cm', f(h) + ' cm', 'sur le droit-fil']]]
        };
      }
    },
    pillow: {
      title: 'Calculateur : housse de coussin à rabat',
      fields: [{ k: 's', l: 'Côté du coussin (carré)', u: 'cm', v: 40 }],
      run(v) {
        const c = v.s - 2, fw = c + 3, bh = c / 2 + 8 + 1.5 + 3, n = 1;
        return {
          rows: [
            ['Devant (×1)', f(fw) + ' × ' + f(fw) + ' cm'],
            ['Dos (×2)', f(fw) + ' × ' + f(bh) + ' cm'],
            ['Housse finie', f(c) + ' × ' + f(c) + ' cm (2 cm plus petite : le coussin est bien rempli)'],
            ['Tissu (laize 140 cm)', '≈ ' + metres(fw + 2 * bh) + ' m']
          ],
          pat: ['rect', [['Devant', f(fw) + ' cm', f(fw) + ' cm', '×1'], ['Dos', f(fw) + ' cm', f(bh) + ' cm', '×2']]]
        };
      }
    },
    tote: {
      title: 'Calculateur : sac cabas',
      fields: [
        { k: 'w', l: 'Largeur du sac fini', u: 'cm', v: 38 },
        { k: 'h', l: 'Hauteur du sac fini', u: 'cm', v: 40 },
        { k: 'a', l: 'Longueur de l\'anse', u: 'cm', v: 60 }
      ],
      run(v) {
        const bw = v.w + 3, bh = v.h + 1.5 + 4, sl = v.a + 6;
        return {
          rows: [
            ['Corps (×2)', f(bw) + ' × ' + f(bh) + ' cm'],
            ['Anses (×2)', f(sl) + ' × 10 cm (2,5 cm de large une fois pliées)'],
            ['Tissu (laize 140 cm)', '≈ ' + metres(2 * bh + 25) + ' m']
          ],
          pat: ['rect', [['Corps', f(bw) + ' cm', f(bh) + ' cm', '×2']]]
        };
      }
    },
    tee: {
      title: 'Calculateur : T-shirt à épaules tombantes',
      fields: [
        { k: 'c', l: 'Tour de poitrine', u: 'cm', v: 92 },
        { k: 'len', l: 'Longueur finie (épaule → ourlet)', u: 'cm', v: 65 },
        { k: 'sl', l: 'Longueur de manche finie', u: 'cm', v: 22 },
        { k: 'ease', l: 'Aisance (largeur ajoutée)', u: 'cm', v: 12 }
      ],
      run(v) {
        const bw = (v.c + v.ease) / 2 + 3, bh = v.len + 1.5 + 2.5, d = v.c / 8 + 10, sw = 2 * d + 3, sh = v.sl + 1.5 + 2.5;
        return {
          rows: [
            ['Devant (×1) et dos (×1)', f(bw) + ' × ' + f(bh) + ' cm'],
            ['Manches (×2)', f(sw) + ' × ' + f(sh) + ' cm'],
            ['Profondeur d\'emmanchure', f(d) + ' cm (marque-la sur le côté, à partir de l\'épaule)'],
            ['Encolure', 'ouverture 18 cm ; profondeur 7 cm devant, 2 cm dos'],
            ['Bande d\'encolure', '≈ 38 × 5 cm — à refaire après avoir mesuré l\'encolure (× 0,85)'],
            ['Tissu (jersey, laize 150 cm)', '≈ ' + metres(2 * bh + sh + 10) + ' m']
          ],
          pat: ['rect', [['Devant / dos', f(bw) + ' cm', f(bh) + ' cm', '×2'], ['Manche', f(sw) + ' cm', f(sh) + ' cm', '×2']]]
        };
      }
    },
    pants: {
      title: 'Calculateur : pantalon à taille élastique',
      fields: [
        { k: 'hip', l: 'Tour de bassin', u: 'cm', v: 95 },
        { k: 'waist', l: 'Tour de taille', u: 'cm', v: 76 },
        { k: 'len', l: 'Longueur extérieure finie (taille → cheville)', u: 'cm', v: 98 },
        { k: 'rise', l: 'Montant (taille → entrejambe, assis)', u: 'cm', v: 28 },
        { k: 'el', l: 'Largeur de l\'élastique', u: 'cm', v: 3 }
      ],
      run(v) {
        const w = (v.hip + 16) / 4 + 3, ext = v.hip / 16 + 1.5, h = v.len + 4 + v.el + 1.5;
        return {
          rows: [
            ['Pièces à couper', '4 (2 devants + 2 dos, en miroir)'],
            ['Hauteur de chaque pièce', f(h) + ' cm'],
            ['Largeur au niveau du bassin', f(w) + ' cm'],
            ['Extension d\'entrejambe', '+ ' + f(ext) + ' cm sur le bord intérieur, à partir de ' + f(v.rise) + ' cm sous la taille, arrondie vers le haut'],
            ['Longueur d\'entrejambe finie', f(v.len - v.rise) + ' cm'],
            ['Élastique', f(v.waist * 0.9 + 2) + ' cm'],
            ['Tissu (laize 140 cm)', '≈ ' + metres(2 * h) + ' m']
          ],
          warn: 'Pantalon simplifié : fais d\'abord une toile de test (drap, vieux tissu) et ajuste avant de couper le beau tissu.',
          pat: ['pants']
        };
      }
    },
    dress: {
      title: 'Calculateur : robe trapèze',
      fields: [
        { k: 'c', l: 'Tour de poitrine', u: 'cm', v: 92 },
        { k: 'hip', l: 'Tour de bassin', u: 'cm', v: 98 },
        { k: 'len', l: 'Longueur finie (épaule → ourlet)', u: 'cm', v: 95 }
      ],
      run(v) {
        const big = Math.max(v.c, v.hip), top = (big + 10) / 4 + 1.5, hem = top + 10, h = v.len + 1.5 + 4;
        return {
          rows: [
            ['Pièces', 'devant ×1 et dos ×1, chacun coupé sur le pli du tissu'],
            ['Largeur à la poitrine (1/2 pièce)', f(top) + ' cm'],
            ['Largeur à l\'ourlet (1/2 pièce)', f(hem) + ' cm'],
            ['Hauteur', f(h) + ' cm'],
            ['Encolure', 'ouverture ≥ 22 cm de large pour passer la tête ; profondeur 8 cm devant, 2 cm dos'],
            ['Tissu (laize 140 cm)', '≈ ' + metres(2 * h) + ' m']
          ],
          warn: 'La robe est enfilée par la tête : la largeur est calculée sur le plus grand tour (poitrine ou bassin) + 10 cm.',
          pat: ['dress']
        };
      }
    }
  };
  window.CALCS = CALCS;
})();
