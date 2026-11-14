/* Couture Singer — patrons imprimables : pièces à l'échelle 1:1 découpées en pages A4, fiches de coupe */
(function () {
  'use strict';
  const FW = 140, S = 10;                       // laize (cm) ; 1 cm = 10 unités (mm)
  const SX = 180, SY = 267, OV = 10, PW = 190, PH = 277;  // pas de découpe A4 (mm), recouvrement, zone imprimable
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const num = x => String(Math.round(x * 2) / 2).replace('.', ',');
  const bez = (a, b, c, d, n) => { n = n || 18; const o = []; for (let i = 0; i <= n; i++) { const t = i / n, u = 1 - t; o.push([u * u * u * a[0] + 3 * u * u * t * b[0] + 3 * u * t * t * c[0] + t * t * t * d[0], u * u * u * a[1] + 3 * u * u * t * b[1] + 3 * u * t * t * c[1] + t * t * t * d[1]]); } return o; };
  const area = p => { let a = 0; for (let i = 0; i < p.length; i++) { const q = p[(i + 1) % p.length]; a += p[i][0] * q[1] - q[0] * p[i][1]; } return a / 2; };
  const inPoly = (p, pt) => { let c = false; for (let i = 0, j = p.length - 1; i < p.length; j = i++) { if ((p[i][1] > pt[1]) !== (p[j][1] > pt[1]) && pt[0] < (p[j][0] - p[i][0]) * (pt[1] - p[i][1]) / (p[j][1] - p[i][1]) + p[i][0]) c = !c; } return c; };
  const fmt = n => (Math.round(n * 100) / 100);

  /* ----- définition des pièces (cm, y vers le bas, sens horaire) ----- */
  function pantsLeg(v) {
    const w = (v.hip + 16) / 4 + 3, ext = v.hip / 16 + 1.5, H = v.len + 4 + v.el + 1.5, cas = v.el + 1.5;
    const yc = cas + v.rise + 1.5, W2 = w + ext, hemW = (w + ext) * 0.65, tx = (W2 - hemW) / 2;
    const cr = bez([w, yc - 18], [w + ext * 0.1, yc - 6], [W2 - ext * 0.5, yc], [W2, yc]);
    return { name: 'JAMBE', sub: '× 4 : 2 devants + 2 dos (en miroir)', gx: W2 / 2, gy: [cas + 8, H - 10], cas, hem: 4,
      edges: [{ t: 'top', p: [[0, 0], [w, 0]] }, { t: 'seam', p: [[w, 0], [w, yc - 18]] }, { t: 'seam', p: cr }, { t: 'seam', p: [[W2, yc], [W2 - tx, H]] }, { t: 'hem', p: [[W2 - tx, H], [tx, H]] }, { t: 'seam', p: [[tx, H], [0, yc], [0, 0]] }],
      marks: [{ x: W2, y: yc, t: 'Entrejambe' }],
      notes: ['Marge de couture 1,5 cm comprise (pointillés = ligne de couture).', 'Haut : coulisse ' + num(cas) + ' cm (pli 1 cm + élastique).', 'Bas : ourlet 4 cm (1 + 3).'] };
  }
  function dressHalf(v, front) {
    const big = Math.max(v.c, v.hip), top = (big + 10) / 4 + 1.5, hem = top + 10, H = v.len + 1.5 + 4, d = v.c / 8 + 11;
    const nw = 11, nd = front ? 9.5 : 3.5, sx = top - 4;
    const neck = bez([0, nd], [nw * 0.55, nd], [nw, nd * 0.5], [nw, 0]);
    const arm = bez([sx, 2.5], [sx - 2, d * 0.4], [top - 3.5, d * 0.8], [top, d]);
    return { name: front ? 'ROBE — DEVANT' : 'ROBE — DOS', sub: '× 1, coupé SUR LE PLI du tissu', gx: 8, gy: [d + 8, H - 12], hem: 4, foldNote: true,
      edges: [{ t: 'bias', p: neck }, { t: 'seam', p: [[nw, 0], [sx, 2.5]] }, { t: 'bias', p: arm }, { t: 'seam', p: [[top, d], [hem, H]] }, { t: 'hem', p: [[hem, H], [0, H]] }, { t: 'fold', p: [[0, H], [0, nd]] }],
      marks: [],
      notes: ['Encolure et emmanchure : marge 1 cm pour le biais.', 'Côté : marge 1,5 cm (pointillés = couture).', 'Bas : ourlet 4 cm (1 + 3).'] };
  }

  /* ----- rendu d'une pièce (unités mm) ----- */
  function outline(pc) { const o = []; pc.edges.forEach(e => e.p.forEach((q, i) => { if (o.length && i === 0) return; o.push(q); })); return o; }
  function offsetPts(p, d, sign) {
    return p.map((q, i) => {
      const segs = []; if (i > 0) segs.push([q[0] - p[i - 1][0], q[1] - p[i - 1][1]]); if (i < p.length - 1) segs.push([p[i + 1][0] - q[0], p[i + 1][1] - q[1]]);
      let nx = 0, ny = 0; segs.forEach(s => { const l = Math.hypot(s[0], s[1]) || 1; const n = sign > 0 ? [-s[1] / l, s[0] / l] : [s[1] / l, -s[0] / l]; nx += n[0]; ny += n[1]; });
      const l = Math.hypot(nx, ny) || 1; return [q[0] + nx / l * d, q[1] + ny / l * d];
    });
  }
  const P = (pts, close) => 'M' + pts.map(q => fmt(q[0] * S) + ' ' + fmt(q[1] * S)).join('L') + (close ? 'Z' : '');
  const T = (x, y, s, size, o) => { o = o || {}; return `<text x="${fmt(x)}" y="${fmt(y)}" font-size="${size || 4}" font-family="Arial,Helvetica,sans-serif" font-weight="${o.w || 600}" fill="${o.c || '#000'}" text-anchor="${o.a || 'middle'}"${o.r ? ` transform="rotate(${o.r} ${fmt(x)} ${fmt(y)})"` : ''}>${esc(s)}</text>`; };
  function pieceSvg(pc) {
    const pts = outline(pc), A = area(pts), sign = A > 0 ? 1 : -1;
    let g = `<path d="${P(pts, true)}" fill="#fff" stroke="#000" stroke-width="0.7" stroke-linejoin="round"/>`;
    pc.edges.forEach(e => {
      if (e.t === 'seam') g += `<path d="${P(offsetPts(e.p, 1.5, sign))}" fill="none" stroke="#444" stroke-width="0.35" stroke-dasharray="3 2"/>`;
      if (e.t === 'bias') g += `<path d="${P(offsetPts(e.p, 1, sign))}" fill="none" stroke="#444" stroke-width="0.35" stroke-dasharray="3 2"/>`;
    });
    const xs = pts.map(q => q[0]), ys = pts.map(q => q[1]), minx = Math.min.apply(0, xs), maxx = Math.max.apply(0, xs), maxy = Math.max.apply(0, ys), miny = Math.min.apply(0, ys);
    if (pc.hem) { const y = maxy - pc.hem; g += `<line x1="${fmt(minx * S)}" y1="${fmt(y * S)}" x2="${fmt(maxx * S)}" y2="${fmt(y * S)}" stroke="#444" stroke-width="0.35" stroke-dasharray="8 2 1 2"/>` + T(minx * S + 40, y * S - 2, 'bord fini de l\'ourlet', 3, { w: 500, c: '#444' }); }
    if (pc.cas) { const y = miny + pc.cas; g += `<line x1="${fmt(minx * S)}" y1="${fmt(y * S)}" x2="${fmt(maxx * S)}" y2="${fmt(y * S)}" stroke="#444" stroke-width="0.35" stroke-dasharray="8 2 1 2"/>` + T(minx * S + 40, y * S + 4, 'haut fini (coulisse)', 3, { w: 500, c: '#444' }); }
    if (pc.foldNote) { const fe = pc.edges.find(e => e.t === 'fold'), y1 = fe.p[1][1], y0 = fe.p[0][1], my = (y0 + y1) / 2; g += `<line x1="0" y1="${fmt(y1 * S)}" x2="0" y2="${fmt(y0 * S)}" stroke="#000" stroke-width="1.4"/>` + T(-4, my * S, 'SUR LE PLI DU TISSU', 4, { w: 800, r: -90, a: 'middle' }) + `<path d="M${-6} ${fmt((y1 + 4) * S)}l3 8h-6z M${-6} ${fmt((y0 - 4) * S)}l3 -8h-6z" fill="#000" transform="translate(3 0)"/>`; }
    const gx = pc.gx * S, gy0 = pc.gy[0] * S, gy1 = pc.gy[1] * S;
    g += `<line x1="${fmt(gx)}" y1="${fmt(gy0)}" x2="${fmt(gx)}" y2="${fmt(gy1)}" stroke="#000" stroke-width="0.8"/><path d="M${fmt(gx)} ${fmt(gy0)}l-3 9h6zM${fmt(gx)} ${fmt(gy1)}l-3 -9h6z" fill="#000"/>` + T(gx - 3, (gy0 + gy1) / 2, 'DROIT-FIL', 3.4, { r: -90, w: 700 });
    const cx = (minx + maxx) / 2 * S + 8, cy = (miny + maxy) / 2 * S - 20;
    g += T(cx, cy, pc.name, 7, { w: 800 }) + T(cx, cy + 8, pc.sub, 3.6, { w: 500 }) + T(cx, cy + 14, 'Taille : ' + num(maxx - minx) + ' × ' + num(maxy - miny) + ' cm', 3.4, { w: 500, c: '#444' });
    (pc.marks || []).forEach(m => { g += `<circle cx="${fmt(m.x * S)}" cy="${fmt(m.y * S)}" r="2" fill="#000"/>` + T(m.x * S - 4, m.y * S - 3, m.t, 3.2, { a: 'end', w: 700 }); });
    return { g, pts, bbox: [minx * S - (pc.foldNote ? 16 : 6), miny * S - 5, maxx * S + 5, maxy * S + 5] };
  }

  /* ----- découpe en pages A4 ----- */
  let uid = 0;
  function tiles(pc, label) {
    const r = pieceSvg(pc), b = r.bbox, W = b[2] - b[0], H = b[3] - b[1];
    const cols = Math.max(1, Math.ceil((W - OV) / SX)), rows = Math.max(1, Math.ceil((H - OV) / SY));
    // contour échantillonné tous les 4 mm (pour savoir quelles pages ne sont pas vides)
    const dense = []; for (let i = 0; i < r.pts.length - 1; i++) { const a = r.pts[i], c = r.pts[i + 1], L = Math.hypot(c[0] - a[0], c[1] - a[1]) * S, n = Math.max(1, Math.ceil(L / 4)); for (let k = 0; k < n; k++) dense.push([(a[0] + (c[0] - a[0]) * k / n) * S, (a[1] + (c[1] - a[1]) * k / n) * S]); }
    const poly = r.pts.map(q => [q[0] * S, q[1] * S]);
    const list = [];
    for (let rr = 0; rr < rows; rr++) for (let cc = 0; cc < cols; cc++) {
      const x = b[0] + cc * SX, y = b[1] + rr * SY;
      const inside = pt => pt[0] >= x && pt[0] <= x + PW && pt[1] >= y && pt[1] <= y + PH;
      const has = dense.some(inside) || [[x, y], [x + PW, y], [x, y + PH], [x + PW, y + PH], [x + PW / 2, y + PH / 2]].some(q => inPoly(poly, q));
      list.push({ c: cc, r: rr, x, y, has, id: String.fromCharCode(65 + cc) + (rr + 1) });
    }
    const pages = list.filter(t => t.has).map(t => {
      const id = 'cp' + (++uid);
      let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 297" width="210mm" height="297mm"><defs><clipPath id="${id}"><rect x="10" y="10" width="${PW}" height="${PH}"/></clipPath></defs>`;
      s += `<rect x="10" y="10" width="${PW}" height="${PH}" fill="none" stroke="#bbb" stroke-width="0.3"/>`;
      if (t.c < cols - 1) s += `<rect x="${10 + PW - OV}" y="10" width="${OV}" height="${PH}" fill="#000" fill-opacity=".05"/>`;
      if (t.r < rows - 1) s += `<rect x="10" y="${10 + PH - OV}" width="${PW}" height="${OV}" fill="#000" fill-opacity=".05"/>`;
      s += `<g clip-path="url(#${id})"><g transform="translate(${fmt(10 - t.x)} ${fmt(10 - t.y)})">${r.g}</g></g>`;
      [[10, 10], [200, 10], [10, 287], [200, 287]].forEach(q => { s += `<path d="M${q[0] - 4} ${q[1]}h8M${q[0]} ${q[1] - 4}v8" stroke="#000" stroke-width="0.4"/>`; });
      s += T(105, 6, label + ' — page ' + t.id + '  (colonne ' + (t.c + 1) + '/' + cols + ', ligne ' + (t.r + 1) + '/' + rows + ')', 3.6, { w: 700 });
      s += T(12, 293, 'Imprimer à 100 % — règle de contrôle (5 cm) :', 3, { a: 'start', w: 500, c: '#555' }) + `<path d="M82 291.5h50M82 290v3M132 290v3" stroke="#000" stroke-width="0.4"/>` + T(107, 289, '5 cm', 3, { w: 600 }) + (cols * rows > 1 ? T(200, 293, 'Zones grisées : superposer et coller', 3, { a: 'end', w: 500, c: '#555' }) : '');
      return s + '</svg>';
    });
    return { pages, cols, rows, list, label, group: r.g, bbox: b };
  }
  function tileMap(t) {
    const cw = 26, ch = 20; let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${t.cols * cw + 4} ${t.rows * ch + 4}" style="width:${Math.min(60, t.cols * 18)}mm;height:auto">`;
    t.list.forEach(x => { s += `<rect x="${2 + x.c * cw}" y="${2 + x.r * ch}" width="${cw - 1}" height="${ch - 1}" fill="${x.has ? '#fff' : '#eee'}" stroke="#000" stroke-width="0.6" ${x.has ? '' : 'stroke-dasharray="2 2"'}/><text x="${2 + x.c * cw + cw / 2}" y="${2 + x.r * ch + ch / 2 + 3}" font-size="9" text-anchor="middle" font-family="Arial" font-weight="700" fill="${x.has ? '#000' : '#999'}">${x.has ? x.id : '—'}</text>`; });
    return s + '</svg>';
  }

  /* ----- fiche de coupe (plan à l'échelle) ----- */
  function planSvg(items, fw) {
    let x = 0, y = 0, rowH = 0; const put = [];
    items.forEach(it => { for (let k = 0; k < it.c; k++) { if (x + it.w > fw + 0.01 && x > 0) { x = 0; y += rowH + 2; rowH = 0; } put.push({ it, x, y }); x += it.w + 1; rowH = Math.max(rowH, it.h); } });
    const tot = y + rowH, sc = Math.min(PW / fw, 150 / tot);
    let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${fmt(fw * sc + 2)} ${fmt(tot * sc + 8)}" style="width:190mm;height:auto"><rect x="1" y="1" width="${fmt(fw * sc)}" height="${fmt(tot * sc + 6)}" fill="#fafafa" stroke="#999" stroke-width="0.3" stroke-dasharray="2 1"/>`;
    put.forEach(p => {
      const X = 1 + p.x * sc, Y = 1 + p.y * sc, W = p.it.w * sc, H = p.it.h * sc;
      s += `<rect x="${fmt(X)}" y="${fmt(Y)}" width="${fmt(W)}" height="${fmt(H)}" fill="#fff" stroke="#000" stroke-width="0.5"/>`;
      if (p.it.neck) s += `<path d="M${fmt(X + W / 2 - 9 * sc)} ${fmt(Y)}C${fmt(X + W / 2 - 9 * sc)} ${fmt(Y + p.it.neck * sc * .9)} ${fmt(X + W / 2 - 4 * sc)} ${fmt(Y + p.it.neck * sc)} ${fmt(X + W / 2)} ${fmt(Y + p.it.neck * sc)}C${fmt(X + W / 2 + 4 * sc)} ${fmt(Y + p.it.neck * sc)} ${fmt(X + W / 2 + 9 * sc)} ${fmt(Y + p.it.neck * sc * .9)} ${fmt(X + W / 2 + 9 * sc)} ${fmt(Y)}" fill="#eee" stroke="#000" stroke-width="0.4"/>`;
      const cx = X + W / 2, cy = Y + H / 2, fs = Math.max(2.2, Math.min(4.6, W / 14));
      s += `<line x1="${fmt(cx)}" y1="${fmt(Y + H * .18)}" x2="${fmt(cx)}" y2="${fmt(Y + H * .82)}" stroke="#777" stroke-width="0.3"/><path d="M${fmt(cx)} ${fmt(Y + H * .18)}l-1.2 2.6h2.4zM${fmt(cx)} ${fmt(Y + H * .82)}l-1.2 -2.6h2.4z" fill="#777"/>`;
      if (H < 9) { const f2 = Math.max(1.8, Math.min(3.2, H * .5)); s += `<text x="${fmt(cx)}" y="${fmt(cy + f2 / 3)}" font-size="${fmt(f2)}" font-family="Arial" font-weight="700" text-anchor="middle">${esc(p.it.n)} ${num(p.it.w)} × ${num(p.it.h)} cm</text>`; return; }
      s += `<text x="${fmt(cx + 1)}" y="${fmt(cy - 1)}" font-size="${fmt(fs)}" font-family="Arial" font-weight="700" text-anchor="middle">${esc(p.it.n)}</text><text x="${fmt(cx + 1)}" y="${fmt(cy + fs)}" font-size="${fmt(fs * .8)}" font-family="Arial" text-anchor="middle" fill="#333">${num(p.it.w)} × ${num(p.it.h)} cm</text>`;
    });
    return { svg: s + '</svg>', scale: sc };
  }
  function coverHtml(title, params, extra) {
    return `<h1>${esc(title)}</h1><table class="pt">${params.map(p => `<tr><td>${esc(p[0])}</td><td><b>${esc(p[1])}</b></td></tr>`).join('')}</table>${extra || ''}`;
  }

  /* ----- les 6 patrons ----- */
  const DEF = {
    skirt: { title: 'Jupe à taille élastique', plan: true, fields: 'skirt' },
    pillow: { title: 'Housse de coussin à rabat', plan: true, fields: 'pillow' },
    tote: { title: 'Sac cabas', plan: true, fields: 'tote' },
    tee: { title: 'T-shirt à épaules tombantes', plan: true, template: true, fields: 'tee' },
    pants: { title: 'Pantalon à taille élastique', tiled: true, fields: 'pants' },
    dress: { title: 'Robe trapèze', tiled: true, fields: 'dress' }
  };

  function build(key, v, opt) {
    opt = opt || {};
    const d = DEF[key], out = { key, title: d.title, tiled: [], pages: [], summary: [] };
    const cover = [];
    let items = [], steps = [], params = [];
    if (key === 'skirt') {
      const w = v.hip * v.full + 3, h = v.len + 4 + v.el + 1.5, n = Math.max(1, Math.ceil(w / FW)), pw = (w + (n - 1) * 3) / n;
      items = [{ n: 'Jupe', w: pw, h, c: n }];
      params = [['Tour de bassin', num(v.hip) + ' cm'], ['Longueur finie', num(v.len) + ' cm'], ['Ampleur', '× ' + String(v.full).replace('.', ',')], ['Élastique', num(v.waist * 0.9 + 2) + ' cm × ' + num(v.el) + ' cm de large']];
      steps = ['Fermer le côté (1,5 cm), surfiler, repasser ouvert.', 'Ourlet bas : 1 cm puis 3 cm, piquer à 2 mm.', 'Haut : 1 cm puis ' + num(v.el + .5) + ' cm, piquer en laissant 4 cm ouverts.', 'Passer l\'élastique, le raccorder, fermer l\'ouverture.'];
      if (n > 1) steps.unshift('Le tissu est trop étroit : couper ' + n + ' lés et les assembler par des coutures verticales (déjà prévues dans les largeurs).');
    } else if (key === 'pillow') {
      const c = v.s - 2, fw = c + 3, bh = c / 2 + 8 + 1.5 + 3;
      items = [{ n: 'Devant', w: fw, h: fw, c: 1 }, { n: 'Dos', w: fw, h: bh, c: 2 }];
      params = [['Coussin', num(v.s) + ' × ' + num(v.s) + ' cm'], ['Housse finie', num(c) + ' × ' + num(c) + ' cm']];
      steps = ['Ourler un bord large de chaque dos (1 cm + 2 cm).', 'Poser le devant à l\'endroit, puis les 2 dos endroit contre endroit, ourlets au centre, qui se chevauchent.', 'Piquer tout le tour à 1,5 cm, couper les angles, retourner.'];
    } else if (key === 'tote') {
      const bw = v.w + 3, bh = v.h + 1.5 + 4, sl = v.a + 6;
      items = [{ n: 'Corps', w: bw, h: bh, c: 2 }, { n: 'Anse', w: sl, h: 10, c: 2 }];
      params = [['Sac fini', num(v.w) + ' × ' + num(v.h) + ' cm'], ['Anses', num(v.a) + ' cm']];
      steps = ['Anses : plier en 4 dans la longueur (2,5 cm), piquer les 2 bords.', 'Ourlet du haut du corps : 1 cm + 3 cm.', 'Poser les anses (rectangle renforcé + croix), assembler les 3 côtés.'];
    } else if (key === 'tee') {
      const bw = (v.c + v.ease) / 2 + 3, bh = v.len + 1.5 + 2.5, dd = v.c / 8 + 10, sw = 2 * dd + 3, sh = v.sl + 1.5 + 2.5;
      items = [{ n: 'Devant', w: bw, h: bh, c: 1, neck: 7 }, { n: 'Dos', w: bw, h: bh, c: 1, neck: 2 }, { n: 'Manche', w: sw, h: sh, c: 2 }, { n: 'Bande encolure', w: 38, h: 5, c: 1 }];
      params = [['Poitrine', num(v.c) + ' cm'], ['Aisance', num(v.ease) + ' cm'], ['Longueur', num(v.len) + ' cm'], ['Manche', num(v.sl) + ' cm'], ['Prof. d\'emmanchure', num(dd) + ' cm']];
      steps = ['Couper encolure avec le gabarit 1:1 (page suivante).', 'Assembler les épaules, poser la bande d\'encolure (étirée à 85 %).', 'Poser les manches à plat (largeur de manche = 2 × emmanchure), puis fermer côtés et dessous de manche.', 'Ourlets : double aiguille.'];
    }
    if (d.plan) {
      const pl = planSvg(items, FW);
      out.pages.push(`<div class="plan"><div class="ph">${coverHtml('Fiche de coupe — ' + d.title, params)}</div><p class="s">Plan de coupe à l'échelle ≈ 1:${fmt(10 / pl.scale)} (laize ${FW} cm). Marges de couture incluses. Pièces à poser dans le sens du droit-fil (flèche).</p>${pl.svg}<table class="pt pc"><tr><th>Pièce</th><th>Dimensions à couper</th><th>Quantité</th></tr>${items.map(i => `<tr><td>${esc(i.n)}</td><td>${num(i.w)} × ${num(i.h)} cm</td><td>× ${i.c}</td></tr>`).join('')}</table><ol class="st">${steps.map(s => `<li>${esc(s)}</li>`).join('')}</ol><p class="s">Dimensions calculées par l'application : tracer directement sur le tissu à la règle et à la craie.</p></div>`);
      out.summary.push('1 fiche de coupe');
    }
    if (d.template) {
      const R = 10; const nf = 7, nb = 2, W = 90;
      const curve = (dp, oy) => `<path d="M0 ${oy + dp * R}C${W * .45} ${oy + dp * R} ${W} ${oy + dp * R * .55} ${W} ${oy}" fill="none" stroke="#000" stroke-width="0.7"/><line x1="0" y1="${oy}" x2="${W}" y2="${oy}" stroke="#000" stroke-width="0.5"/><line x1="0" y1="${oy - 6}" x2="0" y2="${oy + dp * R + 8}" stroke="#000" stroke-width="1.4"/>`;
      let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 297" width="210mm" height="297mm"><g transform="translate(60 40)">${curve(nf, 0).replace(/<line x1="0" y1="-6"[^>]*>/, '')}</g>`;
      s += `<g transform="translate(60 40)">${T(-6, nf * R * .5, 'PLI', 4, { r: -90, w: 800 })}<line x1="0" y1="-8" x2="0" y2="${nf * R + 10}" stroke="#000" stroke-width="1.4"/>${T(W / 2, -4, 'Ligne d\'épaule (haut de la pièce)', 3.6, { w: 600 })}${T(W / 2 + 6, nf * R * .62, 'ENCOLURE DEVANT — 7 cm de profondeur', 3.6, { a: 'start', w: 700 })}</g>`;
      s += `<g transform="translate(60 140)">${curve(nb, 0).replace(/<line x1="0" y1="-6"[^>]*>/, '')}${T(-6, nb * R * .5 + 6, 'PLI', 4, { r: -90, w: 800 })}<line x1="0" y1="-8" x2="0" y2="${nb * R + 10}" stroke="#000" stroke-width="1.4"/>${T(W / 2 + 6, nb * R + 12, 'ENCOLURE DOS — 2 cm de profondeur', 3.6, { a: 'start', w: 700 })}</g>`;
      s += T(105, 16, 'GABARIT D\'ENCOLURE — T-shirt (échelle 1:1)', 5.5, { w: 800 }) + T(105, 24, 'Imprimer à 100 % · vérifier : le carré doit mesurer 5 × 5 cm', 3.6, { w: 500, c: '#444' });
      s += `<rect x="160" y="12" width="50" height="0" /><rect x="150" y="196" width="50" height="50" fill="none" stroke="#000" stroke-width="0.5"/>` + T(175, 223, '5 × 5 cm', 3.6, { w: 700 });
      s += T(105, 200, 'Mode d\'emploi', 4.5, { a: 'middle', w: 800 }) + ['1. Découper le gabarit en suivant la courbe (demi-encolure).', '2. Plier la pièce du T-shirt en deux dans sa largeur (pli au centre).', '3. Poser le trait « PLI » du gabarit sur le pli, la ligne d\'épaule sur le bord du haut.', '4. Tracer la courbe à la craie et découper. Ouverture finie : 18 cm.', '5. Coudre la bande d\'encolure à 1 cm du bord.'].map((t, i) => T(20, 212 + i * 8, t, 3.8, { a: 'start', w: 500 })).join('');
      s += '</svg>';
      out.pages.push(s); out.summary.push('1 gabarit d\'encolure 1:1');
    }
    if (d.tiled) {
      const pcs = key === 'pants' ? [pantsLeg(v)] : [dressHalf(v, true), dressHalf(v, false)];
      pcs.forEach(pc => {
        const t = tiles(pc, d.title + ' — ' + pc.name);
        t.pc = pc; t.id = pc.name; out.tiled.push(t);
      });
      params = key === 'pants' ? [['Tour de bassin', num(v.hip) + ' cm'], ['Longueur extérieure', num(v.len) + ' cm'], ['Montant', num(v.rise) + ' cm'], ['Élastique', num(v.waist * 0.9 + 2) + ' cm × ' + num(v.el) + ' cm']] : [['Poitrine', num(v.c) + ' cm'], ['Bassin', num(v.hip) + ' cm'], ['Longueur', num(v.len) + ' cm']];
      out.params = params;
      out.tiled.forEach(t => out.summary.push(t.pc.name + ' : ' + t.pages.length + ' pages A4'));
    }
    return out;
  }

  /* HTML complet à imprimer : couverture + pages (chaque pièce sélectionnée) */
  function printHtml(b, want) {
    let h = '';
    if (b.tiled.length) {
      const sel = b.tiled.filter(t => !want || want.indexOf(t.id) > -1);
      const total = sel.reduce((n, t) => n + t.pages.length, 0);
      h += `<div class="pp cover">${coverHtml('Patron — ' + b.title, b.params)}
        <p class="s"><b>Imprime à 100 % (« taille réelle »), sans mise à l'échelle ni « ajuster à la page ».</b></p>
        <div class="tsq"><span>Contrôle : 5 × 5 cm</span></div>
        <h2>Assemblage (${total} pages)</h2>${sel.map(t => `<div class="tm"><b>${esc(t.pc.name)}</b><br> — ${t.pages.length} pages (${t.cols} colonne${t.cols > 1 ? 's' : ''} × ${t.rows} ligne${t.rows > 1 ? 's' : ''})<br>${tileMap(t)}</div>`).join('')}
        <ol class="st"><li>Découper les marges blanches au ras du cadre gris.</li><li>Aligner les croix et superposer les zones grisées (recouvrement 1 cm), coller avec du ruban adhésif.</li><li>Découper en suivant le <b>trait plein</b> (marges de couture comprises). Pointillés = ligne de couture.</li><li>Reporter le repère de droit-fil parallèlement à la lisière du tissu.</li></ol>
        <p class="s">Patron simplifié : fais d'abord un essai dans un drap ou un tissu peu cher.</p></div>`;
      sel.forEach(t => t.pages.forEach(p => { h += `<div class="pp">${p}</div>`; }));
    }
    b.pages.forEach(p => { h += `<div class="pp">${p}</div>`; });
    return h;
  }

  window.PATTERNS = { DEF, build, printHtml, tileMap, FW };
})();
