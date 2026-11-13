/* Couture Singer — bibliothèque d'illustrations SVG (partie 1 : machine, aiguilles, pieds, coupes, jauges) */
(function () {
  const V = { ink: 'var(--ink)', R: 'var(--fabR)', Rd: 'var(--fabRd)', W: 'var(--fabW)', Wd: 'var(--fabWd)', T: 'var(--thread)', T2: 'var(--thread2)', H: 'var(--hl)', M: 'var(--muted)', P: 'var(--paper)', S: 'var(--steel)', B: 'var(--body)', Ln: 'var(--line)' };
  const st = (f, s, w, x) => `style="fill:${f};stroke:${s};stroke-width:${w}${x || ''}"`;
  const rect = (x, y, w, h, f = 'none', s = V.ink, sw = 1.4, r = 0) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" ${st(f, s, sw)}/>`;
  const line = (x1, y1, x2, y2, s = V.ink, sw = 1.4, d = '') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" ${st('none', s, sw, (d ? ';stroke-dasharray:' + d : '') + ';stroke-linecap:round')}/>`;
  const circ = (x, y, r, f = 'none', s = V.ink, sw = 1.4) => `<circle cx="${x}" cy="${y}" r="${r}" ${st(f, s, sw)}/>`;
  const ell = (x, y, rx, ry, f = 'none', s = V.ink, sw = 1.4) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" ${st(f, s, sw)}/>`;
  const path = (d, f = 'none', s = V.ink, sw = 1.4, x = '') => `<path d="${d}" ${st(f, s, sw, ';stroke-linejoin:round;stroke-linecap:round' + x)}/>`;
  const poly = (pts, f = 'none', s = V.ink, sw = 1.4) => path('M' + pts.map(p => p.join(' ')).join('L') + 'z', f, s, sw);
  const text = (x, y, s, o = {}) => `<text x="${x}" y="${y}" style="font:${o.w || 600} ${o.s || 11}px system-ui,-apple-system,Segoe UI,Roboto,sans-serif;fill:${o.c || V.ink};text-anchor:${o.a || 'middle'}">${s}</text>`;
  const arrow = (x1, y1, x2, y2, c = V.H) => {
    const a = Math.atan2(y2 - y1, x2 - x1), l = 10, p = d => [(x2 - l * Math.cos(a + d)).toFixed(1), (y2 - l * Math.sin(a + d)).toFixed(1)];
    const [ax, ay] = p(0.45), [bx, by] = p(-0.45);
    return line(x1, y1, x2 - 5 * Math.cos(a), y2 - 5 * Math.sin(a), c, 3) + `<path d="M${x2} ${y2}L${ax} ${ay}L${bx} ${by}z" style="fill:${c};stroke:${c};stroke-width:1;stroke-linejoin:round"/>`;
  };
  const badge = (x, y, n, c = V.H) => circ(x, y, 9.5, c, V.ink, 1.2) + text(x, y + 4, n, { s: 11, w: 800 });
  const wrap = (b, vb = '0 0 320 190') => `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" role="img" focusable="false">${b}</svg>`;
  const fab = (x, y, w, h, side = 'R', r = 3) => rect(x, y, w, h, side === 'R' ? V.R : V.W, V.ink, 1.2, r);
  const dim = (x1, y1, x2, y2, label, o = {}) => {
    const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
    const horiz = Math.abs(y2 - y1) < Math.abs(x2 - x1);
    return line(x1, y1, x2, y2, V.H, 2) + line(x1, y1 - (horiz ? 4 : 0), x1, y1 + (horiz ? 4 : 0), V.H, 2) + line(x1 - (horiz ? 0 : 4), y1, x1 + (horiz ? 0 : 4), y1, V.H, 2) +
      line(x2, y2 - (horiz ? 4 : 0), x2, y2 + (horiz ? 4 : 0), V.H, 2) + line(x2 - (horiz ? 0 : 4), y2, x2 + (horiz ? 0 : 4), y2, V.H, 2) +
      text(o.tx !== undefined ? o.tx : (horiz ? mx : mx + 6), o.ty !== undefined ? o.ty : (horiz ? my - 6 : my + 4), label, { s: o.s || 10.5, a: o.a || (horiz ? 'middle' : 'start'), w: 700 });
  };
  const layer = (d, col = V.R, w = 6) => path(d, 'none', V.ink, w + 2.6) + path(d, 'none', col, w);
  const thread = (d, c = V.T, w = 2) => path(d, 'none', c, w);
  const stitchRow = (x1, y, x2, c = V.T, vert = false) => { let s = ''; for (let x = x1; x < x2; x += 10) s += vert ? line(y, x, y, x + 6, c, 2.4) : line(x, y, x + 6, y, c, 2.4); return s; };

  /* ---------- Machine ---------- */
  const MP = {
    spool: [232, 31, 'Porte-bobine', 232, 11], take: [44, 42, 'Releveur', 44, 24], tens: [84, 42, 'Tension', 84, 24],
    sel: [118, 98, 'Point', 118, 126], len: [166, 98, 'Longueur', 166, 126], wid: [214, 98, 'Largeur', 214, 126],
    rev: [240, 134, 'Marche arrière', 240, 163], wheel: [296, 98, 'Volant', 296, 66], lift: [112, 26, 'Levier du pied', 122, 22],
    foot: [58, 150, 'Pied', 58, 182], needle: [58, 128, 'Aiguille', 88, 134]
  };
  function bodyShape(dimm) {
    let b = rect(14, 146, 292, 26, V.S, V.ink, 1.4, 8);
    b += path('M14 146V70Q14 54 30 54H24V38Q24 30 32 30H92Q100 30 100 38V54H290Q306 54 306 70V146Z', V.B, V.ink, 1.6);
    return b;
  }
  function machine(hl) {
    let b = bodyShape();
    b += line(58, 66, 58, 138, V.ink, 3) + line(58, 138, 58, 156, V.ink, 1.4) + rect(46, 140, 24, 6, V.S, V.ink, 1.2, 2) + rect(30, 146, 80, 4, V.Wd, V.ink, 1);
    b += rect(222, 4, 20, 26, V.T, V.ink, 1.2, 2) + line(224, 12, 240, 12, V.P, 1) + line(224, 20, 240, 20, V.P, 1) + line(232, 30, 232, 54, V.ink, 2.4);
    b += circ(296, 98, 22, V.S, V.ink, 1.6) + circ(296, 98, 8, V.B, V.ink, 1.4);
    b += rect(228, 128, 24, 12, V.P, V.ink, 1.4, 4) + text(240, 138, 'R', { s: 9, w: 800 });
    [['sel', 118, 98], ['len', 166, 98], ['wid', 214, 98]].forEach(d => { b += circ(d[1], d[2], 14, V.P, V.ink, 1.5) + line(d[1], d[2], d[1] + 8, d[2] - 8, V.ink, 2.4); });
    b += circ(84, 42, 9, V.P, V.ink, 1.5) + line(84, 42, 90, 36, V.ink, 2) + line(44, 36, 44, 50, V.ink, 3) + circ(44, 36, 4, V.P, V.ink, 1.4);
    b += path('M104 34l12-12', 'none', V.ink, 3);
    Object.keys(MP).forEach(k => {
      const p = MP[k], on = k === hl;
      if (on) b += circ(p[0], p[1], 19, 'none', V.H, 4);
      if (['spool', 'take', 'tens', 'sel', 'len', 'wid', 'rev', 'wheel', 'lift', 'foot', 'needle'].includes(k))
        b += text(p[3], p[4], p[2], { s: on ? 10.5 : 8.5, w: on ? 800 : 500, c: on ? V.ink : V.M, a: k === 'lift' || k === 'needle' ? 'start' : 'middle' });
    });
    return wrap(b);
  }

  /* ---------- Enfilage ---------- */
  const TP = [[232, 31], [190, 40], [84, 44], [84, 70], [44, 40], [44, 100], [58, 150]];
  const TL = ['Bobine sur le porte-bobine', 'Guide-fil du haut', 'Disques de tension', 'Canal vers le bas', 'Releveur de fil', 'Guide de la barre', 'Chas de l\'aiguille'];
  function thread_(n) {
    n = Math.max(1, Math.min(7, n));
    let b = `<g style="opacity:.55">${bodyShape()}</g>` + rect(222, 4, 20, 26, V.T, V.ink, 1.2, 2) + line(58, 66, 58, 150, V.ink, 3);
    let pts = [TP[0]];
    const route = [[232, 31], [190, 40], [100, 40], [84, 44], [84, 70], [64, 70], [44, 62], [44, 40], [44, 100], [58, 100], [58, 150]];
    const idx = [0, 1, 3, 4, 6, 9, 10];
    const upto = idx[n - 1];
    b += path('M' + route.slice(0, upto + 1).map(p => p.join(' ')).join('L'), 'none', V.T, 2.6);
    TP.forEach((p, i) => { b += i < n ? badge(p[0], p[1], i + 1) : circ(p[0], p[1], 6, 'none', V.M, 1.2); });
    b += text(160, 178, n + '. ' + TL[n - 1], { s: 12.5, w: 800 });
    return wrap(b);
  }

  /* ---------- Canette ---------- */
  function bobbinTop(extra) {
    let b = rect(40, 18, 240, 154, V.S, V.ink, 1.5, 16) + rect(50, 28, 220, 134, V.B, V.ink, 1, 10) + circ(150, 95, 56, V.P, V.ink, 1.4) + circ(150, 95, 34, V.T, V.ink, 1.4);
    for (let r = 14; r < 34; r += 5) b += circ(150, 95, r, 'none', V.P, 1);
    b += circ(150, 95, 9, V.S, V.ink, 1.4);
    return b + (extra || '');
  }
  function bobbin(stage) {
    let b = '';
    if (stage === 'wind') {
      b = rect(20, 56, 40, 56, V.T, V.ink, 1.4, 4) + line(40, 112, 40, 128, V.ink, 3) + rect(14, 128, 52, 8, V.S, V.ink, 1.2, 3);
      b += path('M60 70 L112 40 L150 62 L196 62', 'none', V.T, 2.4) + circ(112, 40, 5, V.P, V.ink, 1.4) + circ(150, 62, 9, V.S, V.ink, 1.4) + line(144, 56, 156, 68, V.ink, 1.2);
      b += rect(196, 52, 40, 22, V.T, V.ink, 1.4, 3) + rect(190, 48, 4, 30, V.S, V.ink, 1.2) + rect(236, 48, 4, 30, V.S, V.ink, 1.2) + circ(215, 63, 5, V.S, V.ink, 1.2);
      b += arrow(270, 110, 244, 110) + text(268, 128, 'Pousser le bobineur', { s: 10.5, a: 'end' }) + text(268, 141, 'vers la droite', { s: 10.5, a: 'end' });
      b += text(112, 28, 'Guide-fil', { s: 10 }) + text(150, 88, 'Pré-tension', { s: 10 }) + text(215, 98, 'Canette', { s: 10 }) + text(40, 150, 'Bobine', { s: 10 });
      return wrap(b);
    }
    if (stage === 'insert') {
      b = bobbinTop() + path('M150 33 A62 62 0 0 0 88 95', 'none', V.H, 4) + `<path d="M88 95L79 84L97 84z" style="fill:${V.H};stroke:${V.H};stroke-width:1"/>`;
      b += text(160, 11, 'Le fil se déroule dans le sens inverse', { s: 10, w: 700 }) + text(160, 183, 'des aiguilles d\'une montre (vue de dessus)', { s: 10, w: 700 });
      return wrap(b);
    }
    if (stage === 'slot') {
      b = bobbinTop() + path('M150 62 L206 62 L206 128 L236 150', 'none', V.T2, 3);
      b += path('M206 86 l6 4 -12 6 12 6 -12 6 6 4', 'none', V.ink, 1.5) + text(250, 92, 'Ressort de', { s: 9.5, a: 'start' }) + text(250, 104, 'tension', { s: 9.5, a: 'start' });
      b += text(262, 160, 'Coupe-fil', { s: 9.5 }) + badge(150, 42, 1) + badge(206, 140, 2) + text(160, 184, 'Suivre le tracé gravé sur la plaque', { s: 10.5, w: 700 });
      return wrap(b);
    }
    if (stage === 'tail') {
      b = bobbinTop() + path('M150 62 L206 62 L206 128 L236 150 L300 168', 'none', V.T2, 3) + dim(236, 178, 300, 178, '≈ 10 cm', { ty: 172 });
      return wrap(b);
    }
    /* up : remonter le fil */
    b = rect(40, 120, 240, 20, V.S, V.ink, 1.4, 4) + circ(160, 130, 5, V.ink) + line(160, 20, 160, 118, V.ink, 3) + `<path d="M160 118L156 106L164 106z" style="fill:${V.ink}"/>`;
    b += path('M160 112 C140 100 140 70 160 70 C180 70 180 100 160 112', 'none', V.T, 2.5) + path('M160 112 L160 150 L170 168 L240 168', 'none', V.T2, 2.5);
    b += arrow(200, 40, 200, 90) + text(212, 58, 'Tirez le fil', { s: 10.5, a: 'start' }) + text(212, 72, 'du dessus', { s: 10.5, a: 'start' });
    b += text(60, 160, 'Plaque à aiguille', { s: 10, a: 'start', c: V.M }) + text(16, 44, 'Boucle du fil', { s: 10.5, a: 'start' }) + text(16, 57, 'de canette', { s: 10.5, a: 'start' }) + arrow(70, 64, 146, 92);
    return wrap(b);
  }

  /* ---------- Aiguilles ---------- */
  function needle(v) {
    let b = '';
    if (v === 'anat') {
      b += rect(96, 12, 30, 44, V.S, V.ink, 1.5, 4) + line(126, 12, 126, 56, V.H, 4) + rect(103, 56, 16, 6, V.S, V.ink, 1.2) + path('M105 62H117L115 126L111 150L107 126Z', V.S, V.ink, 1.5) + line(108, 66, 108, 116, V.ink, 1.2) + ell(111, 118, 2, 6, V.P, V.ink, 1.2);
      [['Tige (fixée dans la barre)', 30, 30], ['Côté plat → vers l\'ARRIÈRE', 126, 12], ['Fût', 90, 62], ['Rainure (côté avant)', 108, 84], ['Chas (œil)', 118, 118], ['Pointe', 111, 148]].forEach((l, i) => {
        const y = [34, 20, 74, 94, 122, 148][i];
        b += text(150, y, l[0], { s: 11, a: 'start', w: i === 1 ? 800 : 600 }) + line(138, y - 3, l[2] > 100 ? l[2] + 14 : 126, y - 3, V.M, 1);
      });
      return wrap(b);
    }
    if (v === 'insert') {
      b += rect(86, 14, 56, 56, V.B, V.ink, 1.5, 6) + rect(98, 70, 32, 14, V.S, V.ink, 1.3) + line(114, 84, 114, 150, V.ink, 3) + circ(148, 40, 8, V.S, V.ink, 1.5) + line(142, 34, 154, 46, V.ink, 1.5);
      b += text(160, 36, 'Vis de fixation', { s: 10.5, a: 'start' }) + text(160, 49, 'à desserrer', { s: 10.5, a: 'start' }) + arrow(114, 168, 114, 140) + text(130, 168, 'Poussez à fond', { s: 10.5, a: 'start' });
      b += path('M246 100 A22 22 0 1 0 246 144 Z', V.S, V.ink, 1.6) + text(246, 92, 'ARRIÈRE', { s: 10, w: 800 }) + text(246, 158, 'AVANT', { s: 10, w: 800 }) + text(262, 124, 'plat', { s: 9.5, a: 'start', c: V.M }) + text(220, 126, '(vue de dessus)', { s: 8.5, a: 'end', c: V.M });
      b += text(268, 125, '', {});
      return wrap(b);
    }
    if (v === 'sizes') {
      const S = [['60/8', 'Voile, soie'], ['70/10', 'Tissus fins'], ['80/12', 'Coton, lin'], ['90/14', 'Jersey, laine'], ['100/16', 'Jean, toile'], ['110/18', 'Très épais']];
      S.forEach((s, i) => { const x = 28 + i * 52; b += line(x, 30, x, 120, V.ink, 1.2 + i * 1.1) + path(`M${x - 1 - i * .4} 120L${x} 136L${x + 1 + i * .4} 120`, V.ink, V.ink, 1) + text(x, 154, s[0], { s: 11.5, w: 800 }) + text(x, 168, s[1], { s: 8.5, c: V.M, w: 500 }); });
      b += text(160, 14, 'Plus le chiffre est grand, plus l\'aiguille est grosse', { s: 10.5 });
      return wrap(b);
    }
    /* types */
    const T = [['Universelle', 'M0 0L-5 -50H5Z', 'Pointe fine : tissus tissés'], ['Stretch / jersey', 'M0 0Q-8 -10 -5 -50H5Q8 -10 0 0Z', 'Pointe ronde : jersey'], ['Jeans', 'M0 0L-3 -56H3Z', 'Pointe très fine et rigide']];
    T.forEach((t, i) => { const x = 60 + i * 100; b += `<g transform="translate(${x} 120)">${path(t[1], V.S, V.ink, 1.6)}</g>` + text(x, 140, t[0], { s: 11, w: 800 }) + text(x, 155, t[2], { s: 8.5, c: V.M, w: 500 }) + rect(x - 6, 20, 12, 44, V.S, V.ink, 1.2, 2); });
    return wrap(b);
  }

  /* ---------- Pieds ---------- */
  const FN = { universal: 'Pied universel (zigzag)', zip: 'Pied fermeture à glissière', bh: 'Pied boutonnière', blind: 'Pied ourlet invisible', btn: 'Pied pose-bouton', rolled: 'Pied ourleur (roulotté)', walk: 'Pied de couture droite' };
  function foot(t) {
    let b = rect(148, 8, 24, 34, V.S, V.ink, 1.4, 3);
    if (t === 'zip') {
      b += path('M96 42H190V138H96Z', V.S, V.ink, 1.5) + rect(96, 92, 40, 46, V.P, V.ink, 1.2) + line(156, 42, 156, 138, V.ink, 1.2, '3 3');
      b += text(116, 118, 'encoche', { s: 9, c: V.M }) + arrow(210, 100, 192, 100) + text(214, 96, 'Dents de la', { s: 9.5, a: 'start' }) + text(214, 108, 'fermeture', { s: 9.5, a: 'start' });
    } else if (t === 'bh') {
      b += rect(86, 42, 148, 100, V.S, V.ink, 1.5, 6) + rect(98, 52, 124, 30, V.W, V.ink, 1.2, 3) + circ(160, 67, 11, V.P, V.ink, 1.3) + rect(150, 92, 20, 42, V.P, V.ink, 1.3, 3);
      b += text(160, 156, 'Support du bouton (en haut) · fente de la boutonnière', { s: 9.5, c: V.M });
    } else if (t === 'blind') {
      b += rect(106, 42, 108, 84, V.S, V.ink, 1.5, 4) + rect(158, 42, 6, 100, V.ink, V.ink, 1) + rect(122, 56, 20, 56, V.P, V.ink, 1.2) + rect(174, 56, 28, 56, V.P, V.ink, 1.2);
      b += arrow(250, 120, 168, 120) + text(254, 116, 'Lame-guide', { s: 10, a: 'start' }) + text(254, 129, 'contre le pli', { s: 10, a: 'start' });
    } else if (t === 'btn') {
      b += rect(98, 42, 124, 70, V.S, V.ink, 1.5, 6) + rect(106, 52, 108, 50, V.P, V.ink, 1.2, 4) + circ(160, 77, 22, V.W, V.ink, 1.5) + circ(152, 77, 3, V.ink) + circ(168, 77, 3, V.ink);
      b += text(160, 132, 'Le bouton est tenu en place', { s: 10, c: V.M }) + text(160, 146, 'et les griffes sont abaissées', { s: 10, c: V.M });
    } else if (t === 'rolled') {
      b += rect(110, 42, 100, 82, V.S, V.ink, 1.5, 4) + path('M130 60 A14 14 0 1 1 130 88 A9 9 0 1 1 130 72', 'none', V.ink, 2) + rect(150, 56, 40, 52, V.P, V.ink, 1.2);
      b += arrow(76, 140, 112, 108) + text(30, 150, 'Le tissu s\'enroule', { s: 10, a: 'start' }) + text(30, 163, 'dans la spirale', { s: 10, a: 'start' });
    } else {
      b += rect(96, 42, 128, 24, V.S, V.ink, 1.5, 3) + rect(96, 66, 40, 70, V.S, V.ink, 1.5, 3) + rect(184, 66, 40, 70, V.S, V.ink, 1.5, 3) + line(160, 70, 160, 130, V.M, 1, '3 3') + text(160, 106, 'passage', { s: 9, c: V.M }) + text(160, 118, 'de l\'aiguille', { s: 9, c: V.M });
    }
    b += text(160, 182, FN[t] || FN.universal, { s: 11.5, w: 800 });
    return wrap(b);
  }

  /* ---------- Jauges de réglage ---------- */
  function gauge(label, val, min, max, unit) {
    const cx = 55, cy = 58, r = 38, pt = f => { const a = Math.PI * f; return [(cx - r * Math.cos(a)).toFixed(1), (cy - r * Math.sin(a)).toFixed(1)]; };
    const arc = (f1, f2, c, w) => { const p1 = pt(f1), p2 = pt(f2); return `<path d="M${p1[0]} ${p1[1]}A${r} ${r} 0 0 1 ${p2[0]} ${p2[1]}" style="fill:none;stroke:${c};stroke-width:${w};stroke-linecap:round"/>`; };
    let b = arc(0, 1, V.Ln, 8), shown, f;
    const fr = x => Math.max(0, Math.min(1, (x - min) / (max - min)));
    if (Array.isArray(val)) { b += arc(Math.min(fr(val[0]), .985), Math.max(fr(val[1]), .03), V.T, 8); shown = val[0] + '–' + val[1]; }
    else if (typeof val === 'number') { f = fr(val); b += arc(0, Math.max(f, .02), V.T, 8); const p = pt(f); b += circ(p[0], p[1], 5.5, V.H, V.ink, 1.5); shown = String(val).replace('.', ','); }
    else { b += arc(0.35, 0.65, V.H, 8); shown = val; }
    b += text(cx, cy + 2, String(shown).replace(/\./g, ','), { s: String(shown).length > 6 ? 11 : 15, w: 800 }) + text(cx, 77, label, { s: 10.5, c: V.M, w: 600 });
    b += text(14, 70, String(min), { s: 9, c: V.M, w: 500 }) + text(96, 70, String(max), { s: 9, c: V.M, w: 500 });
    return wrap(b, '0 0 110 84');
  }

  /* ---------- Symboles de points ---------- */
  function stitch(k) {
    let b = rect(0, 0, 120, 34, V.R, 'none', 0), d = '';
    if (k === 'straight') d = path('M8 17H112', 'none', V.T, 2.2, ';stroke-dasharray:7 3');
    else if (k === 'zigzag') { d = 'M8 26'; for (let x = 8; x < 112; x += 8) d += `L${x + 4} 8L${x + 8} 26`; d = path(d, 'none', V.T, 2); }
    else if (k === 'satin') { d = 'M8 26'; for (let x = 8; x < 112; x += 3) d += `L${x + 1.5} 8L${x + 3} 26`; d = path(d, 'none', V.T, 1.6); }
    else if (k === 'blind') { d = path('M6 26H40L44 10L48 26H70L74 10L78 26H100L104 10L108 26', 'none', V.T, 2.2); }
    else if (k === 'stretch') { d = 'M8 22'; for (let x = 8; x < 108; x += 14) d += `L${x + 5} 12L${x + 10} 22L${x + 14} 22`; d = path(d, 'none', V.T, 2); }
    else if (k === 'overlock') { d = path('M8 22H112', 'none', V.T, 1.8) + path((() => { let s = 'M8 8'; for (let x = 8; x < 108; x += 10) s += `L${x + 5} 22L${x + 10} 8`; return s; })(), 'none', V.T, 1.6); }
    else if (k === 'buttonhole') { d = rect(20, 7, 80, 20, 'none', 'none', 0) + path('M24 9H96M24 25H96', 'none', V.T, 3) + path('M22 9V25M98 9V25', 'none', V.T, 4); }
    else if (k === 'twin') { d = path('M8 12H112M8 22H112', 'none', V.T, 2.2, ';stroke-dasharray:7 3'); }
    return wrap(b + d, '0 0 120 34');
  }

  /* ---------- Coupes de tissu ---------- */
  function xs(type, stage) {
    let b = '';
    if (type === 'hem2') {
      b += layer('M150 8V138Q150 146 156 146Q162 146 162 138V90Q162 82 168 82Q174 82 174 90V106', V.R, 6);
      b += thread('M138 120H186', V.T, 2.6) + text(66, 44, 'ENDROIT', { s: 11, w: 800, c: V.Rd }) + text(66, 58, '(côté visible)', { s: 9.5, c: V.M });
      b += dim(212, 82, 212, 146, '', {}) + text(220, 118, 'hauteur', { s: 10.5, a: 'start' }) + text(220, 131, 'd\'ourlet', { s: 10.5, a: 'start' });
      b += text(196, 70, 'Bord brut caché', { s: 10.5, a: 'start' }) + arrow(198, 74, 177, 98);
      b += text(196, 44, 'Piqûre', { s: 11, a: 'start', w: 800 }) + arrow(194, 48, 182, 116);
      b += text(100, 174, 'Pli de l\'ourlet', { s: 10.5, a: 'start' }) + arrow(150, 168, 156, 150);
    } else if (type === 'hem1') {
      b += layer('M150 8V138L156 146L162 138V100', V.R, 6) + path('M159 96L165 96M156 100L168 100L162 104', 'none', V.T2, 2) + thread('M138 118H186', V.T, 2.6) + text(236, 122, 'Piqûre', { s: 11, a: 'start' }) + arrow(236, 116, 192, 118);
      b += text(190, 96, 'Bord surfilé (zigzag)', { s: 10.5, a: 'start' }) + arrow(188, 92, 168, 100) + text(70, 40, 'ENDROIT', { s: 11, w: 800, c: V.Rd });
    } else if (type === 'blind') {
      b += layer('M38 118H290', V.W, 6) + layer('M290 104H92Q76 104 76 97Q76 90 92 90H290', V.R, 6);
      b += thread('M44 118L56 118L78 100', V.T, 2.4) + circ(78, 100, 3, V.T, V.ink, 1) + dim(38, 150, 78, 150, '≈ 5 mm', { ty: 164 });
      b += text(200, 78, 'Vêtement (replié sur lui-même)', { s: 10.5 }) + text(200, 140, 'Ourlet (envers)', { s: 10.5 }) + text(160, 176, 'La piqûre n\'accroche qu\'un fil du pli', { s: 10.5, w: 700 });
    } else if (type === 'french') {
      if (stage === 1) {
        b += layer('M30 80H250', V.R, 6) + layer('M30 92H250', V.W, 6) + line(210, 66, 210, 108, V.T, 3, '5 3') + dim(210, 122, 250, 122, '7 mm', { ty: 138 });
        b += text(30, 58, 'Envers contre envers', { s: 11.5, a: 'start', w: 800 }) + text(30, 150, '1) Piquer à 7 mm du bord, puis recouper à 3 mm', { s: 10.5, a: 'start' }) + path('M232 66L246 100M246 66L232 100', 'none', V.Rd, 2);
      } else {
        b += layer('M30 70H200Q214 70 214 84Q214 98 200 98H30', V.R, 6) + path('M206 76V92', 'none', V.W, 4) + line(186, 58, 186, 110, V.T, 3, '5 3') + dim(186, 128, 214, 128, '8 mm', { ty: 144 });
        b += text(30, 46, '2) Plier sur la 1re piqûre (endroit contre endroit)', { s: 11, a: 'start', w: 800 }) + text(30, 160, 'Marge brute enfermée dans la couture', { s: 10.5, a: 'start' }) + arrow(130, 150, 204, 90);
      }
    } else if (type === 'flatfell') {
      if (stage === 1) {
        b += layer('M30 80H260', V.R, 6) + layer('M30 92H260', V.R, 6) + line(190, 66, 190, 108, V.T, 3, '5 3') + path('M190 100H236', 'none', V.M, 1.2) + text(30, 56, '1) Envers contre envers, piquer à 1,5 cm', { s: 11, a: 'start', w: 800 });
        b += text(30, 140, '2) Recouper la marge du dessous à 3 mm', { s: 10.5, a: 'start' }) + path('M214 112L232 104', 'none', V.Rd, 2);
      } else {
        b += layer('M30 96H290', V.R, 6) + layer('M156 96V86H208V93', V.R, 5) + line(156, 76, 156, 108, V.T, 2.6, '4 3') + line(204, 76, 204, 106, V.T, 2.6, '4 3');
        b += text(30, 56, '3) Rabattre la grande marge sur la petite', { s: 11.5, a: 'start', w: 800 }) + text(30, 140, 'Deux piqûres visibles, aucun bord brut', { s: 10.5, a: 'start' });
      }
    } else if (type === 'rolled') {
      b += layer('M30 92H206A9 9 0 0 1 206 110H196', V.R, 5) + line(196, 78, 196, 120, V.T, 2.8, '4 3') + text(30, 60, 'Ourlet roulotté : 3 mm replié deux fois', { s: 11.5, a: 'start', w: 800 }) + text(30, 150, 'Piquer au ras du pli', { s: 10.5, a: 'start' }) + arrow(110, 140, 194, 112);
    } else if (type === 'bias') {
      b += layer('M30 94H246', V.R, 6) + layer('M180 80H252A14 14 0 0 1 252 108H180', V.W, 5) + line(206, 70, 206, 118, V.T, 2.8, '4 3');
      b += text(30, 60, 'Biais enveloppant le bord du tissu', { s: 11.5, a: 'start', w: 800 }) + text(256, 144, 'Biais', { s: 10.5 }) + text(110, 126, 'Tissu', { s: 10.5, c: V.M }) + text(206, 140, 'Piqûre', { s: 10 });
    } else if (type === 'casing') {
      b += layer('M150 176V44Q150 34 160 34Q170 34 170 44V112L176 104', V.R, 6) + rect(153, 46, 14, 56, V.W, V.ink, 1, 2) + line(140, 112, 186, 112, V.T, 2.8, '4 3');
      b += text(196, 70, 'Élastique', { s: 11, a: 'start', w: 800 }) + text(196, 84, 'dans la coulisse', { s: 11, a: 'start' }) + arrow(194, 76, 169, 76) + text(196, 118, 'Piqûre au bord du pli', { s: 10.5, a: 'start' }) + text(70, 50, 'Taille', { s: 11, w: 800 });
    } else if (type === 'seam') {
      b += layer('M30 96H150', V.R, 6) + layer('M150 96H290', V.R, 6) + layer('M150 96L130 80H100', V.W, 4) + layer('M150 96L170 80H200', V.W, 4);
      b += line(150, 80, 150, 112, V.T, 2.6, '4 3') + text(150, 150, 'Couture ouverte au fer : marges écartées', { s: 11, w: 700 });
    }
    return wrap(b);
  }

  /* ---------- Problèmes de couture ---------- */
  function trouble(k) {
    const patch = (x, who) => rect(x, 24, 130, 100, who === 'top' ? V.R : V.W, V.ink, 1.3, 6);
    const lbl = (x, t) => text(x + 65, 142, t, { s: 11, w: 800 });
    let b = patch(16, 'top') + patch(174, 'bot') + lbl(16, 'DESSUS') + lbl(174, 'DESSOUS');
    const straightTop = (c) => path('M28 74H134', 'none', c, 2.4, ';stroke-dasharray:6 3');
    const loops = (x0, c) => { let d = 'M' + x0 + ' 74'; for (let x = x0; x < x0 + 100; x += 14) d += `q4 -20 8 -14t6 14`; return path(d, 'none', c, 2.2); };
    if (k === 'ok') {
      b += straightTop(V.T) + path('M186 74H292', 'none', V.T2, 2.4, ';stroke-dasharray:6 3') + text(160, 172, 'Points réguliers : tension correcte', { s: 11, w: 800 });
    } else if (k === 'loose') {
      b += straightTop(V.T) + loops(188, V.T) + text(160, 170, 'Boucles du fil du dessus sous le tissu', { s: 11, w: 800 }) + text(160, 184, '→ augmenter la tension (ou ré-enfiler pied relevé)', { s: 10 });
    } else if (k === 'tight') {
      b += straightTop(V.T) + circ(50, 74, 2.6, V.T2) + circ(74, 74, 2.6, V.T2) + circ(98, 74, 2.6, V.T2) + circ(122, 74, 2.6, V.T2) + path('M186 74H292', 'none', V.T2, 2.4) + text(160, 170, 'Le fil du dessous remonte sur l\'endroit', { s: 11, w: 800 }) + text(160, 184, '→ diminuer la tension du dessus', { s: 10 });
    } else if (k === 'pucker') {
      b += path('M28 74q10 -9 20 0t20 0t20 0t20 0t20 0', 'none', V.T, 2.4) + path('M186 74q10 9 20 0t20 0t20 0t20 0t20 0', 'none', V.T2, 2.4) + text(160, 170, 'Tissu froncé le long de la couture', { s: 11, w: 800 }) + text(160, 184, '→ tension trop forte, aiguille trop grosse, points trop courts', { s: 10 });
    } else if (k === 'skip') {
      b += path('M28 74H56M76 74H100M122 74H134', 'none', V.T, 2.4) + path('M186 74H214M234 74H258M280 74H292', 'none', V.T2, 2.4) + text(160, 170, 'Points sautés', { s: 11, w: 800 }) + text(160, 184, '→ aiguille neuve et adaptée, bien enfoncée, plat vers l\'arrière', { s: 10 });
    } else if (k === 'nest') {
      let d = 'M190 60'; for (let i = 0; i < 12; i++) d += `C${196 + (i * 37) % 80} ${50 + (i * 53) % 60} ${200 + (i * 29) % 70} ${50 + (i * 41) % 60} ${190 + (i * 47) % 90} ${58 + (i * 31) % 50}`;
      b += straightTop(V.T) + path(d, 'none', V.T, 1.8) + text(160, 170, 'Nid de fil sous le tissu', { s: 11, w: 800 }) + text(160, 184, '→ ré-enfiler avec le pied RELEVÉ, vérifier la canette', { s: 10 });
    }
    return wrap(b);
  }

  /* ---------- Mesures du corps ---------- */
  function body(hl) {
    let b = circ(160, 20, 13, V.W, V.ink, 1.4) + path('M148 42C140 48 118 50 112 56C106 70 118 76 118 80C120 96 130 104 130 114C128 130 114 138 114 150L116 176H204L206 150C206 138 192 130 190 114C190 104 200 96 202 80C202 76 214 70 208 56C202 50 180 48 172 42Z', V.R, V.ink, 1.5);
    const M = { chest: [80, 112, 208, 'Poitrine'], waist: [114, 128, 192, 'Taille'], hip: [150, 108, 212, 'Bassin'] };
    Object.keys(M).forEach(k => { const m = M[k], on = k === hl; b += line(m[1], m[0], m[2], m[0], on ? V.H : V.M, on ? 4 : 1.5, on ? '' : '4 3') + text(m[2] + 6, m[0] + 4, m[3], { s: on ? 12 : 10, a: 'start', w: on ? 800 : 500 }); });
    const on = hl === 'len';
    b += line(244, 44, 244, 176, on ? V.H : V.M, on ? 4 : 1.5, on ? '' : '4 3') + text(250, 112, 'Longueur', { s: on ? 12 : 10, a: 'start', w: on ? 800 : 500 }) + line(238, 44, 250, 44, V.M, 1.4) + line(238, 176, 250, 176, V.M, 1.4);
    if (hl === 'neck') b += line(148, 41, 172, 41, V.H, 4) + text(190, 40, 'Tour de cou', { s: 12, a: 'start', w: 800 });
    return wrap(b);
  }

  /* ---------- Patrons ---------- */
  function pat(kind, labels) {
    let b = '';
    const L = labels || [];
    if (kind === 'rect') {
      const n = L.length, avail = 260, w = Math.min(150, (avail - (n - 1) * 30) / n), tot = n * w + (n - 1) * 30, x0 = 46 + (avail - tot) / 2;
      L.forEach((l, i) => {
        const x = x0 + i * (w + 30); const h = 100; b += rect(x, 30, w, h, V.W, V.ink, 1.4, 3) + line(x, 30 + 12, x + w, 30 + 12, V.M, 1, '3 3');
        b += text(x + w / 2, 86, l[0], { s: 11, w: 800 }) + text(x + w / 2, 100, l[3] || '', { s: 9, c: V.M, w: 500 }) + dim(x, 144, x + w, 144, l[1], { ty: 160 }) + dim(x - 6, 30, x - 6, 130, l[2], { tx: x - 12, ty: 84, a: 'end' });
      });
      return wrap(b);
    }
    if (kind === 'tee') {
      b += path('M120 20Q160 38 200 20L250 48L284 100L248 118L228 92V172H92V92L72 118L36 100L70 48Z', V.W, V.ink, 1.5) + path('M120 20Q160 38 200 20', 'none', V.H, 3);
      b += text(160, 54, 'A', { s: 13, w: 800 }) + text(160, 130, 'Corps (sur le pli)', { s: 11, w: 800 }) + text(262, 76, 'B', { s: 12, w: 800 }) + text(160, 186, 'D = ourlet 3 cm', { s: 10.5 }) + text(58, 80, 'B', { s: 12, w: 800 });
      b += text(160, 12, 'A = encolure · B = manche · C = emmanchure', { s: 10, c: V.M }) + text(230, 74, 'C', { s: 11, w: 800 });
      return wrap(b);
    }
    if (kind === 'pants') {
      b += path('M70 14H210V50L248 176H170L140 70L110 176H32L70 50Z', V.W, V.ink, 1.5) + text(140, 34, 'Taille', { s: 11, w: 800 }) + text(140, 120, 'Entrejambe', { s: 10.5, w: 700 }) + line(140, 70, 140, 176, V.M, 1, '4 3') + text(70, 174, 'Bas', { s: 10 }) + text(210, 174, 'Bas', { s: 10 });
      b += text(262, 100, 'Côté', { s: 10.5, a: 'start' }) + text(258, 112, '(couture)', { s: 9.5, a: 'start', c: V.M }) + text(262, 20, 'Faire 4 pièces :', { s: 10, a: 'end', c: V.M }) + text(262, 32, '2 devants + 2 dos', { s: 10, a: 'end', c: V.M });
      return wrap(b);
    }
    if (kind === 'dress') {
      b += path('M104 20Q130 40 156 20L170 20Q196 40 222 20L240 24Q250 60 232 86L274 176H46L88 86Q70 60 80 24Z', V.W, V.ink, 1.5);
      b += text(160, 12, 'Moitié devant ou dos', { s: 10, c: V.M }) + text(163, 120, 'Trapèze', { s: 12, w: 800 }) + text(100, 40, 'épaule', { s: 9, c: V.M }) + text(164, 52, 'encolure', { s: 9, c: V.M }) + text(110, 76, 'emmanchure', { s: 9, c: V.M }) + text(160, 186, 'ourlet', { s: 10.5 });
      return wrap(b);
    }
    return wrap(b);
  }

  window.IL = { V, st, rect, line, circ, ell, path, poly, text, arrow, badge, wrap, fab, dim, layer, thread, stitchRow };
  window.ILCORE = { machine, thread: thread_, bobbin, needle, foot, gauge, stitch, xs, trouble, body, pat, FN };
})();
