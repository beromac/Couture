/* Couture Singer — application (SPA hors-ligne, sans dépendance) */
(function () {
  'use strict';
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const norm = s => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const view = $('#view'), titleEl = $('#title'), backBtn = $('#back'), favBtn = $('#favbtn'), stepper = $('#stepper');
  const GUIDES = window.G, DB = window.DB, ILL = window.ILL;
  const byId = {}; GUIDES.forEach(g => byId[g.id] = g);
  const catById = {}; DB.cats.forEach(c => catById[c.id] = c);

  /* ---------- stockage (jamais bloquant) ---------- */
  const KEY = 'couture-singer.v1';
  let store = { done: {}, fav: [], recent: null, calc: {} };
  try { const s = JSON.parse(localStorage.getItem(KEY) || 'null'); if (s && typeof s === 'object') store = Object.assign(store, s); } catch (e) { }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) { } }
  const doneCount = g => (store.done[g.id] || []).filter(Boolean).length;

  let toastT;
  function toast(m) { const t = $('#toast'); t.textContent = m; t.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 1800); }

  /* ---------- illustrations ---------- */
  function ill(spec, big) {
    if (!spec) return '';
    if (Array.isArray(spec[0])) return spec.map(x => ill(x, big)).join('');
    try { const fn = ILL[spec[0]]; if (!fn) return ''; return `<div class="ill${big ? ' big' : ''}">${fn.apply(null, spec.slice(1))}</div>`; }
    catch (e) { console.error('illustration', spec, e); return ''; }
  }

  /* ---------- les textes des schémas restent toujours dans le cadre ---------- */
  function fit(root) {
    $$('svg', root).forEach(svg => {
      const vb = svg.viewBox && svg.viewBox.baseVal; if (!vb || !vb.width) return;
      svg.querySelectorAll('text').forEach(t => {
        let b; try { b = t.getBBox(); } catch (e) { return; }
        if (!b.width) return;
        const max = vb.width - 8;
        if (b.width > max) { const fs = parseFloat(getComputedStyle(t).fontSize) || 10; t.style.fontSize = (fs * max / b.width * 0.97).toFixed(2) + 'px'; b = t.getBBox(); }
        let dx = 0; if (b.x < 4) dx = 4 - b.x; else if (b.x + b.width > vb.width - 4) dx = vb.width - 4 - (b.x + b.width);
        if (dx) t.setAttribute('transform', 'translate(' + dx.toFixed(1) + ' 0)');
      });
    });
  }

  /* ---------- réglages ---------- */
  function gaugeBlock(label, v, min, max) {
    if (v === null || v === undefined || v === '') return '';
    if (typeof v === 'number') return `<div class="gauge">${ILL.gauge(label, v, min, max)}</div>`;
    return `<div class="gauge"><div class="txt">${esc(v)}</div><div class="lab">${esc(label)}</div></div>`;
  }
  function settingsBox(s) {
    if (!s) return '';
    const foot = DB.feet[s.foot];
    return `<section class="setbox"><h3>⚙️ Réglages de la machine</h3>
      <div class="stitchpic">${ILL.stitch(s.stitch === 'twin' ? 'twin' : s.stitch)}<div><b>${esc(DB.stitches[s.stitch] || s.stitch)}</b><div class="sm muted">Point à choisir sur le sélecteur</div></div></div>
      <div class="gauges">${gaugeBlock('Longueur', s.len, 0, 5)}${gaugeBlock('Largeur', s.wid, 0, 6)}${gaugeBlock('Tension', s.ten, 0, 9)}</div>
      <dl class="kv">
        <dt>Pied</dt><dd>${esc(foot ? foot.n : s.foot)}</dd>
        <dt>Aiguille</dt><dd>${esc(s.needle)}</dd>
        <dt>Fil</dt><dd>${esc(s.thread)}</dd>
      </dl>
      ${foot ? `<div class="footline">${ILL.foot(s.foot).replace('<svg', '<svg class="ill"')}<div class="sm muted">${esc(foot.d)}</div></div>` : ''}
      ${s.extra ? `<div class="note">${esc(s.extra)}</div>` : ''}
      <p class="sm muted" style="margin:10px 0 0">Valeurs de départ à tester sur une chute : elles varient selon le tissu et le modèle.</p>
    </section>`;
  }

  /* ---------- calculateurs (définis dans calcs.js) ---------- */
  const CALCS = window.CALCS || {};
  function calcBox(key) {
    const c = CALCS[key]; if (!c) return '';
    const saved = (store.calc && store.calc[key]) || {};
    const fld = c.fields.map(f => {
      const val = saved[f.k] !== undefined ? saved[f.k] : f.v;
      return `<label>${esc(f.l)} (${esc(f.u)})<input data-k="${esc(f.k)}" type="number" inputmode="decimal" step="0.5" min="0" value="${esc(val)}"></label>`;
    }).join('');
    return `<section class="calc" data-calc="${esc(key)}"><h3>🧮 ${esc(c.title)}</h3><div class="fields">${fld}</div><div class="res"></div>${window.PATTERNS && window.PATTERNS.DEF[key] ? `<a class="btn alt" style="display:block;margin-top:10px" href="#/pattern/${esc(key)}">🖨️ Imprimer le patron</a>` : ''}</section>`;
  }
  function wireCalc(root) {
    $$('.calc', root).forEach(box => {
      const key = box.dataset.calc, c = CALCS[key];
      const out = $('.res', box);
      const update = () => {
        const v = {};
        $$('[data-k]', box).forEach(el => { v[el.dataset.k] = parseFloat(String(el.value).replace(',', '.')); });
        store.calc[key] = v; save();
        if (Object.values(v).some(x => !isFinite(x) || x <= 0)) { out.innerHTML = '<div><span>Renseigne toutes les mesures</span></div>'; return; }
        let r;
        try { r = c.run(v); } catch (e) { out.innerHTML = '<div><span>Calcul impossible avec ces valeurs</span></div>'; return; }
        out.innerHTML = r.rows.map(x => `<div><span>${esc(x[0])}</span><b>${esc(x[1])}</b></div>`).join('') +
          (r.warn ? `<div class="note" style="display:block">${esc(r.warn)}</div>` : '') +
          (r.pat ? ill(['pat'].concat(r.pat)) : '');
        fit(out);
      };
      box.addEventListener('input', update); box.addEventListener('change', update); update();
    });
  }

  /* ---------- vues ---------- */
  const LV = ['', 'Facile', 'Intermédiaire', 'Avancé'];
  const dots = n => '●'.repeat(n) + '○'.repeat(3 - n);
  function guideRow(g) {
    const n = doneCount(g), tot = g.steps.length, cat = catById[g.cat];
    return `<a class="row" href="#/guide/${g.id}"><span style="font-size:1.6rem">${cat.e}</span><span class="t"><b>${esc(g.t)}</b><small><span class="lvl-dots">${dots(g.lvl)}</span> ${LV[g.lvl]} · ${esc(g.time)} · ${tot} étapes</small></span>${n ? `<span class="prog">${n}/${tot}</span>` : ''}<span class="chev">›</span></a>`;
  }
  function setHead(title, opts) {
    opts = opts || {};
    titleEl.textContent = title;
    backBtn.hidden = !opts.back;
    favBtn.hidden = !opts.fav;
    if (opts.fav) { const on = store.fav.includes(opts.fav); favBtn.textContent = on ? '★' : '☆'; favBtn.setAttribute('aria-pressed', on); favBtn.dataset.id = opts.fav; }
    document.title = (title === 'Couture Singer' ? '' : title + ' · ') + 'Couture Singer';
  }
  let deferredPrompt = null;
  window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferredPrompt = e; const b = $('#installbox'); if (b) b.hidden = false; });
  window.addEventListener('appinstalled', () => { deferredPrompt = null; const b = $('#installbox'); if (b) b.hidden = true; toast('Application installée ✔'); });

  const V = {};
  V.home = () => {
    setHead('Couture Singer');
    const recent = store.recent && byId[store.recent];
    const favs = store.fav.map(id => byId[id]).filter(Boolean);
    view.innerHTML = `
      <div class="hero"><h2>Coudre pas à pas 🧵</h2><p>Machine Singer Tradition · étapes illustrées, outils et réglages pour chaque couture.</p></div>
      <div class="install" id="installbox" hidden><span style="font-size:1.8rem">📲</span><div style="flex:1"><b>Installer l'application</b><span class="sm muted">Fonctionne hors connexion</span></div><button class="btn sm" id="installbtn">Installer</button></div>
      <a class="search" href="#/search" style="text-decoration:none;color:var(--muted)"><span>🔍</span><span style="padding:12px 0">Rechercher un ourlet, un point, un outil…</span></a>
      ${recent ? `<h2>Reprendre</h2><div class="list">${guideRow(recent)}</div>` : ''}
      <h2>Que veux-tu coudre ?</h2>
      <div class="grid">${DB.cats.map(c => `<a class="tile" href="#/cat/${c.id}"><span class="e">${c.e}</span><b>${esc(c.t)}</b><small>${esc(c.d)}</small></a>`).join('')}</div>
      ${favs.length ? `<h2>★ Mes favoris</h2><div class="list">${favs.map(guideRow).join('')}</div>` : ''}
      <h2>Raccourcis</h2>
      <div class="list">
        <a class="row" href="#/guide/hem-double"><span style="font-size:1.5rem">📏</span><span class="t"><b>Faire un ourlet</b><small>Le plus demandé</small></span><span class="chev">›</span></a>
        <a class="row" href="#/patterns"><span style="font-size:1.5rem">🖨️</span><span class="t"><b>Patrons à imprimer</b><small>Taille réelle A4, jupe, robe, pantalon, T-shirt…</small></span><span class="chev">›</span></a>
        <a class="row" href="#/settings"><span style="font-size:1.5rem">⚙️</span><span class="t"><b>Réglages selon le tissu</b><small>Aiguille, longueur de point, tension</small></span><span class="chev">›</span></a>
        <a class="row" href="#/guide/r-problems"><span style="font-size:1.5rem">🛟</span><span class="t"><b>Ça ne marche pas ?</b><small>Points sautés, fil cassé, nid de fil…</small></span><span class="chev">›</span></a>
      </div>`;
    const ib = $('#installbox'); if (deferredPrompt) ib.hidden = false;
    $('#installbtn').onclick = async () => { if (!deferredPrompt) return; deferredPrompt.prompt(); try { await deferredPrompt.userChoice; } catch (e) { } deferredPrompt = null; ib.hidden = true; };
  };

  V.guides = (id) => {
    const cat = id && catById[id];
    setHead(cat ? cat.t : 'Tous les guides', { back: !!cat });
    const list = GUIDES.filter(g => !cat || g.cat === cat.id);
    view.innerHTML = `<div class="tabs"><a class="chip${!cat ? ' on' : ''}" href="#/guides">Tout</a>${DB.cats.map(c => `<a class="chip${cat && cat.id === c.id ? ' on' : ''}" href="#/cat/${c.id}">${c.e} ${esc(c.t)}</a>`).join('')}</div>
      ${cat ? `<p class="muted">${esc(cat.d)}</p>` : ''}
      <div class="list">${list.map(guideRow).join('')}</div>`;
    const on = $('.tabs .on'); if (on && on.scrollIntoView) on.scrollIntoView({ inline: 'center', block: 'nearest' });
  };

  V.guide = (id) => {
    const g = byId[id];
    if (!g) { setHead('Introuvable', { back: true }); view.innerHTML = '<p class="empty">Ce guide n\'existe pas.</p>'; return; }
    store.recent = g.id; save();
    setHead(g.t, { back: true, fav: g.id });
    const done = store.done[g.id] || [];
    const tools = (g.tools || []).map(k => ({ k, t: DB.tools[k] })).filter(x => x.t);
    view.innerHTML = `
      <div class="chips"><span class="chip lvl"><span class="lvl-dots">${dots(g.lvl)}</span> ${LV[g.lvl]}</span><span class="chip lvl">⏱ ${esc(g.time)}</span><span class="chip lvl">${g.steps.length} étapes</span></div>
      <p class="intro" style="margin-top:12px">${esc(g.intro)}</p>
      ${g.fabric ? `<p class="sm muted"><b>Tissus adaptés :</b> ${esc(g.fabric)}</p>` : ''}
      ${g.calc ? calcBox(g.calc) : ''}
      ${tools.length ? `<section class="setbox"><h3>🧰 Outils et matériel</h3><div class="toolgrid">${tools.map(x => `<a class="tl" href="#/tools/${x.k}"><span class="em" data-ph="tool:${x.k}">${x.t.e}</span><span><b>${esc(x.t.n)}</b><small>${esc(x.t.u)}</small></span></a>`).join('')}</div></section>` : ''}
      ${settingsBox(g.set)}
      <div class="cta"><button class="btn" id="go">▶ Mode pas à pas</button></div>
      <h2>Étapes détaillées</h2>
      <div id="steps">${g.steps.map((s, i) => `<article class="step${done[i] ? ' done' : ''}" data-i="${i}"><button class="num" aria-label="Marquer l'étape ${i + 1} comme faite" aria-pressed="${!!done[i]}">${done[i] ? '✓' : i + 1}</button><div class="body"><h3>${esc(s.t)}</h3><p>${esc(s.d)}</p>${ill(s.i)}${s.tip ? `<div class="tip">${esc(s.tip)}</div>` : ''}</div></article>`).join('')}</div>
      <div class="cta"><button class="btn alt" id="reset">Tout décocher</button></div>`;
    wireCalc(view);
    $('#go').onclick = () => openStepper(g, 0);
    $('#reset').onclick = () => { store.done[g.id] = []; save(); V.guide(id); };
    $$('.step .num', view).forEach(b => b.onclick = () => {
      const st = b.closest('.step'), i = +st.dataset.i; const arr = store.done[g.id] || (store.done[g.id] = []);
      arr[i] = !arr[i]; save(); st.classList.toggle('done', !!arr[i]); b.textContent = arr[i] ? '✓' : i + 1; b.setAttribute('aria-pressed', !!arr[i]);
      if (arr.filter(Boolean).length === g.steps.length) toast('Bravo, projet terminé ! 🎉');
    });
  };

  V.settings = () => {
    setHead('Réglages');
    view.innerHTML = `<p class="muted">Réglages de départ pour une Singer Tradition. Fais toujours un test sur une chute du même tissu.</p>
      <h2>Selon le tissu</h2>
      ${DB.fabrics.map(f => `<article class="fab"><h3><span style="font-size:1.4rem">${f.e}</span>${esc(f.n)}</h3>
        <dl class="kv"><dt>Aiguille</dt><dd>${esc(f.nd)}</dd><dt>Fil</dt><dd>${esc(f.th)}</dd><dt>Longueur point</dt><dd>${esc(f.len)} mm</dd><dt>Tension</dt><dd>${esc(f.ten)}</dd><dt>Pied</dt><dd>${esc(f.foot)}</dd></dl>
        <div class="tip">${esc(f.tip)}</div></article>`).join('')}
      <h2>Selon le point</h2>
      ${[['straight', 'Assemblage, ourlet, surpiqûre', 2.5, 0, 4], ['zigzag', 'Surfilage de bord brut', 2.5, 3.5, 4], ['stretch', 'Jersey, T-shirt, legging', 3, 1, 3], ['satin', 'Appliqué, bord décoratif', 0.4, 4, 4], ['blind', 'Ourlet invisible (pied dédié)', 2.5, 2.5, 4], ['buttonhole', 'Boutonnière (4 temps)', 0.5, 5, 4]].map(a => `<article class="fab"><div class="stitchpic">${ILL.stitch(a[0])}<div><b>${esc(DB.stitches[a[0]])}</b><div class="sm muted">${esc(a[1])}</div></div></div><div class="gauges">${gaugeBlock('Longueur', a[2], 0, 5)}${gaugeBlock('Largeur', a[3], 0, 6)}${gaugeBlock('Tension', a[4], 0, 9)}</div></article>`).join('')}
      <details class="card"><summary>Quel modèle Tradition ?</summary><p class="sm muted" style="margin-top:8px">Les Singer Tradition (2250, 2259, 2273, 2277, 2282…) ont les mêmes principes : sélecteur de point, molette de tension, longueur et largeur de point, pied à clipser. Le nombre de points et leur numérotation changent d'un modèle à l'autre : cherche donc le <b>pictogramme</b> du point sur ta machine, pas son numéro. Consulte aussi le manuel de ton modèle pour la boutonnière et le fonctionnement du bobineur.</p></details>`;
  };

  V.tools = (id) => {
    if (id && DB.tools[id]) {
      const t = DB.tools[id]; setHead(t.n, { back: true });
      const used = GUIDES.filter(g => (g.tools || []).includes(id));
      view.innerHTML = `<div class="card">${photoBox('tool:' + id, t.e)}<h2 style="margin:10px 0 6px">${esc(t.n)}</h2><p>${esc(t.u)}</p></div><h2>Utilisé dans</h2><div class="list">${used.map(guideRow).join('')}</div>`;
      return;
    }
    setHead('Outils et pieds');
    view.innerHTML = `<h2>Pieds de la machine</h2><div class="list">${Object.keys(DB.feet).map(k => { const f = DB.feet[k]; return `<div class="fab"><h3>${esc(f.n)}</h3>${photoBox('foot:' + k, '🦶')}<div class="ill">${ILL.foot(k)}</div><p class="sm muted" style="margin:0">${esc(f.d)}</p></div>`; }).join('')}</div>
      <h2>Aiguilles</h2><div class="ill">${ILL.needle('sizes')}</div><div class="ill">${ILL.needle('types')}</div><div class="ill">${ILL.needle('anat')}</div>
      <h2>Outils à avoir</h2><div class="list">${Object.keys(DB.tools).map(k => { const t = DB.tools[k]; return `<a class="row" href="#/tools/${k}"><span class="em2" data-ph="tool:${k}">${t.e}</span><span class="t"><b>${esc(t.n)}</b><small>${esc(t.u)}</small></span><span class="chev">›</span></a>`; }).join('')}</div>`;
  };

  V.search = () => {
    setHead('Recherche', { back: true });
    view.innerHTML = `<label class="search"><span>🔍</span><input id="q" type="search" placeholder="ourlet, zip, jersey, aiguille…" autocomplete="off" enterkeyhint="search"></label><div id="res"></div>`;
    const q = $('#q'), res = $('#res');
    const run = () => {
      const t = norm(q.value.trim());
      if (!t) { res.innerHTML = '<p class="empty">Tape un mot pour chercher dans les guides, outils et le glossaire.</p>'; return; }
      const words = t.split(/\s+/);
      const hit = s => words.every(w => norm(s).includes(w));
      const gs = GUIDES.filter(g => hit(g.t + ' ' + g.intro + ' ' + g.steps.map(s => s.t + ' ' + s.d).join(' ') + ' ' + (g.tools || []).map(k => DB.tools[k] ? DB.tools[k].n : '').join(' ')));
      const ts = Object.keys(DB.tools).filter(k => hit(DB.tools[k].n + ' ' + DB.tools[k].u));
      const gl = DB.glossary.filter(x => hit(x[0] + ' ' + x[1]));
      res.innerHTML = (gs.length ? `<h2>Guides (${gs.length})</h2><div class="list">${gs.map(guideRow).join('')}</div>` : '') +
        (ts.length ? `<h2>Outils (${ts.length})</h2><div class="list">${ts.map(k => `<a class="row" href="#/tools/${k}"><span style="font-size:1.5rem">${DB.tools[k].e}</span><span class="t"><b>${esc(DB.tools[k].n)}</b><small>${esc(DB.tools[k].u)}</small></span><span class="chev">›</span></a>`).join('')}</div>` : '') +
        (gl.length ? `<h2>Glossaire</h2><dl class="gl">${gl.map(x => `<dt>${esc(x[0])}</dt><dd>${esc(x[1])}</dd>`).join('')}</dl>` : '') +
        (!gs.length && !ts.length && !gl.length ? '<p class="empty">Aucun résultat.</p>' : '');
    };
    q.addEventListener('input', run); run(); setTimeout(() => q.focus(), 60);
  };

  V.more = () => {
    setHead('Plus');
    view.innerHTML = `
      <h2>Outils</h2>
      <div class="list"><a class="row" href="#/patterns"><span style="font-size:1.5rem">🖨️</span><span class="t"><b>Patrons à imprimer</b><small>Taille réelle ou fiche de coupe</small></span><span class="chev">›</span></a></div>
      <h2>Aide</h2>
      <details class="card" open><summary>📲 Installer sur Android</summary><ol class="sm"><li>Ouvre l'adresse de l'application dans <b>Chrome</b>.</li><li>Menu ⋮ → <b>Installer l'application</b> (ou « Ajouter à l'écran d'accueil »).</li><li>L'icône apparaît sur ton téléphone ; elle fonctionne ensuite <b>sans connexion</b>.</li></ol></details>
      <details class="card"><summary>🧵 Vocabulaire de couture</summary><dl class="gl">${DB.glossary.map(x => `<dt>${esc(x[0])}</dt><dd>${esc(x[1])}</dd>`).join('')}</dl></details>
      <details class="card"><summary>🔁 Ordre conseillé pour apprendre</summary><ol class="sm"><li>Connaître sa machine, enfiler, canette</li><li>Premier test de couture + tension</li><li>Ourlet double</li><li>Couture droite + finitions</li><li>Jupe élastique ou housse de coussin</li><li>Fermeture, boutonnière, T-shirt</li></ol></details>
      <details class="card"><summary>⚠️ À savoir</summary><p class="sm muted" style="margin-top:8px">Les réglages sont des valeurs de départ pour les Singer Tradition ; ils peuvent varier selon le modèle, le tissu et le fil. Le manuel de ta machine reste la référence pour le bobinage, la boutonnière et l'entretien. Sécurité : éteins la machine avant de changer l'aiguille ou de nettoyer, et garde les doigts loin de l'aiguille.</p></details>
      <h2>Mes données</h2>
      <div class="cta"><button class="btn alt" id="clr">Effacer progression et favoris</button></div>
      <p class="sm muted">Couture Singer v1.0 · fonctionne hors connexion · aucune donnée envoyée.</p>`;
    $('#clr').onclick = () => { if (confirm('Effacer la progression et les favoris ?')) { store = { done: {}, fav: [], recent: null, calc: {} }; save(); toast('Données effacées'); } };
  };



  /* ---------- photos des outils : photos perso (appareil du téléphone) + photos libres déposées dans photos/ ---------- */
  const idb = {
    db: null,
    open() { return new Promise((res, rej) => { if (this.db) return res(this.db); try { const r = indexedDB.open('couture-singer-photos', 1); r.onupgradeneeded = () => r.result.createObjectStore('p'); r.onsuccess = () => { this.db = r.result; res(this.db); }; r.onerror = () => rej(r.error); } catch (e) { rej(e); } }); },
    async get(k) { try { const db = await this.open(); return await new Promise(res => { const q = db.transaction('p').objectStore('p').get(k); q.onsuccess = () => res(q.result || null); q.onerror = () => res(null); }); } catch (e) { return null; } },
    async set(k, v) { try { const db = await this.open(); return await new Promise(res => { const t = db.transaction('p', 'readwrite'); t.objectStore('p').put(v, k); t.oncomplete = () => res(true); t.onerror = () => res(false); }); } catch (e) { return false; } },
    async del(k) { try { const db = await this.open(); return await new Promise(res => { const t = db.transaction('p', 'readwrite'); t.objectStore('p').delete(k); t.oncomplete = () => res(true); t.onerror = () => res(false); }); } catch (e) { return false; } }
  };
  let photoIndex = null; const urlCache = {};
  async function loadPhotoIndex() {
    if (photoIndex) return photoIndex; photoIndex = {};
    try { const r = await fetch('photos/index.json', { cache: 'no-cache' }); if (r.ok) photoIndex = await r.json(); } catch (e) { }
    return photoIndex;
  }
  async function photoFor(id) {
    const own = await idb.get(id);
    if (own) { if (urlCache[id]) URL.revokeObjectURL(urlCache[id]); urlCache[id] = URL.createObjectURL(own); return { url: urlCache[id], own: true }; }
    const idx = await loadPhotoIndex(), e = idx[id];
    return e && e.src ? { url: 'photos/' + e.src, credit: e.credit || '', link: e.link || '' } : null;
  }
  function hydrate(root) {
    $$('[data-ph]', root || document).forEach(el => {
      photoFor(el.dataset.ph).then(p => {
        const box = el.closest('[data-phbox]');
        if (!p) { if (box) { const d = $('[data-del]', box), c = $('.phcredit', box); if (d) d.hidden = true; if (c) c.textContent = 'Aucune photo pour l\'instant : prends la tienne avec le bouton 📷.'; } return; }
        el.innerHTML = `<img src="${esc(p.url)}" alt="" loading="lazy">`; el.classList.add('has');
        if (box) { const d = $('[data-del]', box), c = $('.phcredit', box); if (d) d.hidden = !p.own; if (c) c.innerHTML = p.own ? 'Ta photo (enregistrée sur ce téléphone)' : esc(p.credit) + (p.link ? ` · <a href="${esc(p.link)}" target="_blank" rel="noopener">source</a>` : ''); }
      });
    });
  }
  function photoBox(id, fallback) {
    return `<div class="phbox" data-phbox="${esc(id)}"><div class="phimg" data-ph="${esc(id)}"><span class="phfb">${fallback}</span></div><div class="phbtns"><label class="btn alt sm">📷 Ajouter ma photo<input type="file" accept="image/*" capture="environment" hidden></label><button class="btn alt sm" data-del hidden>Supprimer</button></div><div class="phcredit sm muted"></div></div>`;
  }
  async function shrink(file) {
    const bmp = await createImageBitmap(file), k = Math.min(1, 900 / Math.max(bmp.width, bmp.height)), c = document.createElement('canvas');
    c.width = Math.round(bmp.width * k); c.height = Math.round(bmp.height * k); c.getContext('2d').drawImage(bmp, 0, 0, c.width, c.height);
    return await new Promise(res => c.toBlob(res, 'image/jpeg', 0.82));
  }
  document.addEventListener('change', async e => {
    const inp = e.target; if (!inp.matches || !inp.matches('[data-phbox] input[type=file]') || !inp.files[0]) return;
    const box = inp.closest('[data-phbox]'), id = box.dataset.phbox;
    try { const blob = await shrink(inp.files[0]); if (!blob || !(await idb.set(id, blob))) throw new Error('save'); toast('Photo enregistrée ✔'); hydrate(box); }
    catch (err) { toast('Impossible d\'enregistrer la photo'); }
    inp.value = '';
  });
  document.addEventListener('click', async e => {
    const b = e.target.closest && e.target.closest('[data-phbox] [data-del]'); if (!b) return;
    const box = b.closest('[data-phbox]'), id = box.dataset.phbox;
    if (!confirm('Supprimer ta photo ?')) return;
    await idb.del(id); $('[data-ph]', box).innerHTML = '<span class="phfb">' + ($('.phimg', box).dataset.fb || '🧵') + '</span>'; $('[data-ph]', box).classList.remove('has'); hydrate(box); toast('Photo supprimée');
  });

  /* ---------- patrons imprimables ---------- */
  const PT = window.PATTERNS;
  function patValues(key) {
    const c = CALCS[key], saved = (store.calc && store.calc[key]) || {}, v = {};
    c.fields.forEach(f => { const x = parseFloat(saved[f.k]); v[f.k] = isFinite(x) && x > 0 ? x : f.v; });
    return v;
  }
  function printRoot() { let r = $('#printroot'); if (!r) { r = document.createElement('div'); r.id = 'printroot'; document.body.appendChild(r); } return r; }
  window.addEventListener('afterprint', () => { const r = $('#printroot'); if (r) r.innerHTML = ''; });
  V.patterns = () => {
    setHead('Patrons à imprimer', { back: false });
    view.innerHTML = `<p class="muted">Imprime tes patrons à la taille réelle sur du papier A4 (ou enregistre-les en PDF). Les dimensions suivent tes mesures.</p>
      <div class="list">${Object.keys(PT.DEF).map(k => { const d = PT.DEF[k]; const b = PT.build(k, patValues(k)); return `<a class="row" href="#/pattern/${k}"><span style="font-size:1.6rem">${d.tiled ? '📐' : '📄'}</span><span class="t"><b>${esc(d.title)}</b><small>${esc(b.summary.join(' · '))}</small></span><span class="chev">›</span></a>`; }).join('')}</div>
      <details class="card" style="margin-top:14px"><summary>Comment imprimer ?</summary><ol class="sm"><li>Choisis un patron, entre tes mesures.</li><li>Appuie sur <b>Imprimer</b>, puis « Enregistrer au format PDF » ou ton imprimante.</li><li>Choisis le papier <b>A4</b>, l'échelle <b>100 % / taille réelle</b> (pas « ajuster à la page »).</li><li>Vérifie que le carré de contrôle mesure bien 10 cm, puis assemble les pages au ruban adhésif.</li></ol></details>`;
  };
  V.pattern = (key) => {
    const d = PT.DEF[key];
    if (!d || !CALCS[key]) { V.patterns(); return; }
    setHead(d.title, { back: true });
    const c = CALCS[key], v = patValues(key);
    view.innerHTML = `<div class="calc" data-pat="${esc(key)}"><h3>📏 Tes mesures</h3><div class="fields">${c.fields.map(f => `<label>${esc(f.l)} (${esc(f.u)})<input data-k="${esc(f.k)}" type="number" inputmode="decimal" step="0.5" min="0" value="${esc(v[f.k])}"></label>`).join('')}</div></div>
      <div id="patout"></div>`;
    const out = $('#patout');
    const draw = () => {
      const cur = {}; let ok = true;
      $$('[data-pat] [data-k]', view).forEach(el => { const x = parseFloat(String(el.value).replace(',', '.')); cur[el.dataset.k] = x; if (!isFinite(x) || x <= 0) ok = false; });
      if (!ok) { out.innerHTML = '<p class="muted">Renseigne toutes les mesures.</p>'; return; }
      store.calc[key] = cur; save();
      const b = PT.build(key, cur);
      let h = '';
      if (b.tiled.length) {
        h += `<h2>Pièces à imprimer (taille réelle)</h2>` + b.tiled.map((t, i) => `<label class="pcs"><input type="checkbox" data-want="${esc(t.id)}" checked><span><b>${esc(t.pc.name)}</b> — ${t.pages.length} pages A4 (${t.cols} × ${t.rows})<br><small class="muted">${esc(t.pc.sub)}</small></span></label>
          <div class="ill pv"><svg viewBox="${t.bbox.map(n => Math.round(n)).join(' ').replace(/^(\S+) (\S+) (\S+) (\S+)$/, (m, x, y, X, Y) => x + ' ' + y + ' ' + (X - x) + ' ' + (Y - y))}" preserveAspectRatio="xMidYMid meet">${t.group}</svg></div><div class="tmw">${PT.tileMap(t)}</div>`).join('');
      }
      if (b.pages.length) {
        h += `<h2>${b.tiled.length ? 'Aussi inclus' : 'Fiche de coupe'}</h2>` + b.pages.map(p => `<div class="ill pv paper">${p.indexOf('<svg') === 0 ? p : p}</div>`).join('');
      }
      h += `<div class="cta"><button class="btn" id="doprint">🖨️ Imprimer / Enregistrer en PDF</button></div><p class="sm muted">Choisis « A4 » et une échelle de <b>100 %</b> dans la fenêtre d'impression. Sur Android : Imprimer → « Enregistrer au format PDF ».</p>`;
      out.innerHTML = h;
      $('#doprint').onclick = () => {
        const want = $$('[data-want]', out).filter(x => x.checked).map(x => x.dataset.want);
        if (b.tiled.length && !want.length) { toast('Coche au moins une pièce'); return; }
        printRoot().innerHTML = PT.printHtml(b, want); setTimeout(() => window.print(), 60);
      };
    };
    view.addEventListener('input', draw); draw();
  };

  /* ---------- mode pas à pas ---------- */
  let wl = null;
  async function keepAwake(on) { try { if (on && navigator.wakeLock) wl = await navigator.wakeLock.request('screen'); else if (wl) { await wl.release(); wl = null; } } catch (e) { } }
  function openStepper(g, i) {
    stepper.hidden = false; keepAwake(true);
    const n = g.steps.length;
    const draw = () => {
      const s = g.steps[i];
      stepper.innerHTML = `<div class="sh"><button id="sx" aria-label="Fermer">✕</button><b>${esc(g.t)}</b></div><div class="bar"><i style="width:${((i + 1) / n) * 100}%"></i></div>
        <div class="sb"><div class="cnt">Étape ${i + 1} sur ${n}</div><h2>${esc(s.t)}</h2>${ill(s.i, true)}<p>${esc(s.d)}</p>${s.tip ? `<div class="tip">${esc(s.tip)}</div>` : ''}</div>
        <div class="sf"><button class="btn alt" id="sp"${i === 0 ? ' disabled' : ''}>‹ Précédent</button><button class="btn" id="sn">${i === n - 1 ? 'Terminer ✓' : 'Suivant ›'}</button></div>`;
      $('#sx').onclick = close;
      $('#sp').onclick = () => { if (i > 0) { i--; draw(); } };
      $('#sn').onclick = () => { const arr = store.done[g.id] || (store.done[g.id] = []); arr[i] = true; save(); if (i < n - 1) { i++; draw(); } else { close(); V.guide(g.id); toast('Bravo ! 🎉'); } };
      $('.sb', stepper).scrollTop = 0; fit(stepper);
    };
    const close = () => { stepper.hidden = true; keepAwake(false); if ((location.hash || '').indexOf(g.id) > -1) V.guide(g.id); };
    let x0 = null;
    stepper.ontouchstart = e => { x0 = e.touches[0].clientX; };
    stepper.ontouchend = e => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; x0 = null; if (Math.abs(dx) > 70) { if (dx < 0 && i < n - 1) { i++; draw(); } else if (dx > 0 && i > 0) { i--; draw(); } } };
    draw();
  }

  /* ---------- routeur ---------- */
  function route() {
    const h = (location.hash || '#/').replace(/^#\/?/, '').split('/');
    const r = h[0] || 'home', a = decodeURIComponent(h[1] || '');
    stepper.hidden = true;
    let nav = r; if (r === 'patterns' || r === 'pattern') nav = 'more';
    { const pr = $('#printroot'); if (pr) pr.innerHTML = ''; }
    if (r === 'cat') { V.guides(a); nav = 'guides'; }
    else if (r === 'guide') { V.guide(a); nav = 'guides'; }
    else if (V[r]) V[r](a);
    else V.home();
    if (r === 'search') nav = 'guides';
    $$('#nav a').forEach(el => el.classList.toggle('on', el.dataset.r === (nav === 'cat' ? 'guides' : nav)));
    view.scrollTop = 0; fit(view); hydrate(view);
  }
  window.addEventListener('hashchange', route);
  backBtn.onclick = () => { if (history.length > 1) history.back(); else location.hash = '#/'; };
  favBtn.onclick = () => {
    const id = favBtn.dataset.id, i = store.fav.indexOf(id);
    if (i > -1) store.fav.splice(i, 1); else store.fav.push(id);
    save(); const on = store.fav.includes(id); favBtn.textContent = on ? '★' : '☆'; favBtn.setAttribute('aria-pressed', on); toast(on ? 'Ajouté aux favoris' : 'Retiré des favoris');
  };
  route();

  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => { }));
  }
  window.__app = { route, GUIDES, DB, ILL, fit };
})();
