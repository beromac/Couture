/* Couture Singer — schémas supplémentaires rattachés aux étapes des guides */
(function () {
  const P = [
    /* étapes qui n'avaient pas de schéma */
    ['b-needle', 6, ['pl', 'needle-check']], ['b-bobbin', 3, ['pl', 'bobbin-fill']], ['b-start', 1, ['pl', 'test-swatch']], ['b-start', 5, ['pl', 'guide-hands']],
    ['b-feet', 1, ['pl', 'foot-lift']], ['hem-rolled', 5, ['pl', 'thread-cut']], ['hem-stretch', 3, ['machine', 'wid']], ['hem-jean', 1, ['pl', 'measure-leg']],
    ['hem-hand', 2, ['pl', 'needle-thread']], ['hem-hand', 4, ['pl', 'hand-knot']], ['s-topstitch', 1, ['pl', 'seam-open']], ['s-topstitch', 2, ['machine', 'len']],
    ['s-topstitch', 4, ['pl', 'tape-guide']], ['s-gather', 1, [['machine', 'len'], ['pl', 'len-compare']]], ['s-gather', 4, ['pl', 'gather-spread']],
    ['s-dart', 1, ['pl', 'dart-mark']], ['s-dart', 4, ['pl', 'knot-tails']], ['s-dart', 5, ['pl', 'dart-press']], ['s-stretch', 3, ['pl', 'no-pull']],
    ['s-stretch', 4, ['pl', 'jersey-edge']], ['c-zip-invis', 4, ['pl', 'zip-invis-bottom']], ['c-bh', 1, ['pl', 'interfacing']], ['c-bh', 6, ['pl', 'button-test']],
    ['c-btn', 5, ['pl', 'btn-tie']], ['g-measure', 6, ['pl', 'ease-table']], ['r-unpick', 2, ['pl', 'unpick-pull']], ['r-unpick', 3, ['pl', 'lint-roller']],
    ['r-unpick', 4, ['pl', 'iron']], ['r-care', 1, ['pl', 'unplug']], ['r-care', 2, ['pl', 'plate-off']], ['r-care', 4, ['pl', 'oil-drop']], ['r-care', 5, ['pl', 'machine-cover']],
    /* schémas complémentaires sur des étapes déjà illustrées */
    ['b-start', 2, ['pl', 'len-compare']], ['b-start', 3, ['pl', 'foot-ud']], ['b-tension', 3, ['pl', 'lockstitch']],
    ['b-thread', 2, ['machine', 'tens']], ['b-thread', 3, ['machine', 'take']], ['b-prep', 4, ['pl', 'on-fold']],
    ['hem-double', 4, ['pl', 'hem-gauge']], ['hem-double', 5, ['pl', 'pins-good-bad']], ['hem-double', 9, ['pl', 'hem-seq']],
    ['s-straight', 1, ['pl', 'right-wrong']], ['s-straight', 2, ['pl', 'pins-good-bad']], ['s-straight', 3, ['pl', 'plate-guides']],
    ['c-zip', 2, ['pl', 'zip-anatomy']], ['g-skirt', 3, ['pl', 'skirt-tube']], ['g-skirt', 8, ['pl', 'skirt-final']], ['g-dress', 2, ['pl', 'on-fold']],
    ['g-tee', 1, ['pl', 'tee-flat']], ['g-tee', 7, ['pl', 'tee-flat']]
  ];
  const list = i => !i ? [] : (Array.isArray(i[0]) ? i : [i]);
  P.forEach(([id, n, specs]) => {
    const g = window.G.find(x => x.id === id), s = g && g.steps[n - 1];
    if (!s) { console.warn('data-extra : étape introuvable', id, n); return; }
    const add = list(specs), all = list(s.i).concat(add);
    s.i = all.length === 1 ? all[0] : all;
  });
})();
