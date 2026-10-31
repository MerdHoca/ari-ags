/* Ari'nin AGS Rehberi — ARAYÜZ
   Ekranlar: Bugün · Plan · Konular · Netlerim  (+ Ayarlar, giriş sayfaları) */
(function () {
  'use strict';
  var M = window.Motor; M.kur();
  var T = M.tarih;
  var SURUM = '1.0';
  var ANAHTAR = 'ari-ags-v1';
  var AYLAR = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
  var GUNLER = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
  var GK = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];

  /* ================= DURUM ================= */
  var bellekModu = false;
  function yeniDurum() {
    return { v: 1, kurulum: bugun(), izlendi: {}, soru: {}, tekrar: {}, ekstra: {}, netler: [], ruh: {}, gunSure: {}, paketler: {},
      aktivite: {}, gorulen: {}, rozetler: {}, kaynaklar: [], pazarCalis: {}, ayar: { gece: 'oto' }, sonYedek: null, kapatilan: {}, basvurdu: false };
  }
  function yukle() {
    try {
      var s = localStorage.getItem(ANAHTAR);
      if (s) { var d = JSON.parse(s); return Object.assign(yeniDurum(), d); }
    } catch (e) { bellekModu = true; }
    return null;
  }
  var S = yukle();
  var ilkAcilis = !S;
  if (!S) S = yeniDurum();
  function kaydet() {
    try { localStorage.setItem(ANAHTAR, JSON.stringify(S)); } catch (e) { bellekModu = true; }
  }

  // Gün dönümü sabah 04:00 — gece vardiyasından sonra çalışınca gün karışmasın
  function bugun() { return T.str(new Date(Date.now() - 4 * 3600 * 1000)); }
  var BUGUN = bugun();

  /* ================= YARDIMCILAR ================= */
  function $(s, k) { return (k || document).querySelector(s); }
  function $$(s, k) { return Array.prototype.slice.call((k || document).querySelectorAll(s)); }
  function esc(t) { return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function uzunTarih(s) { var d = T.parse(s); return d.getDate() + ' ' + AYLAR[d.getMonth()] + ' ' + GUNLER[d.getDay()]; }
  function kisaTarih(s) { var d = T.parse(s); return d.getDate() + ' ' + AYLAR[d.getMonth()]; }
  function dkYaz(dk) { dk = Math.round(dk); if (dk < 60) return dk + ' dk'; var s = Math.floor(dk / 60), m = dk % 60; return s + ' sa' + (m ? ' ' + m + ' dk' : ''); }
  function yuzde(x) { return Math.round((x || 0) * 100); }
  function renk(ders) { return (M.DERS[ders] || {}).renk || '#999'; }
  function sec(liste, n) { return liste[((n % liste.length) + liste.length) % liste.length]; }
  function doldur(t, o) { return t.replace(/\{(\w+)\}/g, function (_, k) { return o[k] != null ? o[k] : ''; }); }
  function gunSirasi(s) { return T.fark('2026-01-01', s); }
  function hiz(h) { return h && h !== 1 ? '<span class="hiz">' + String(h).replace('.', ',') + 'x</span>' : ''; }
  var IKON = {
    oynat: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l11-6.5z"/></svg>',
    tik: '<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    kalem: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4L19 9l-4-4L4 16z"/></svg>',
    ok: '<svg class="ok-ikon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M9 6l6 6-6 6"/></svg>',
    sol: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M15 6l-6 6 6 6"/></svg>',
    sag: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M9 6l6 6-6 6"/></svg>',
    petek: '<svg viewBox="0 0 100 100" fill="currentColor"><path d="M25 10l17 10v20L25 50 8 40V20zM62 10l17 10v20L62 50 45 40V20zM43 45l17 10v20L43 85 26 75V55zM80 45l17 10v20L80 85 63 75V55z"/></svg>'
  };
  function hexSvg(oran, r) {
    // bal ile dolan altıgen
    var id = 'h' + Math.random().toString(36).slice(2, 8);
    var y = 100 - Math.max(0, Math.min(1, oran)) * 100;
    return '<svg viewBox="0 0 88 100"><defs><clipPath id="' + id + '"><path d="M44 3l40 23v48L44 97 4 74V26z"/></clipPath></defs>' +
      '<path d="M44 3l40 23v48L44 97 4 74V26z" fill="var(--zemin2)"/>' +
      '<g clip-path="url(#' + id + ')"><rect class="bal" x="0" y="' + y + '" width="88" height="100" fill="' + (r || 'var(--bal)') + '" opacity=".9"/></g>' +
      '<path d="M44 3l40 23v48L44 97 4 74V26z" fill="none" stroke="' + (r || 'var(--bal)') + '" stroke-opacity=".5" stroke-width="3"/></svg>';
  }
  function halka(oran, yazi) {
    var c = 2 * Math.PI * 26, o = Math.max(0, Math.min(1, oran));
    return '<div class="halka"><svg viewBox="0 0 64 64"><circle class="iz" cx="32" cy="32" r="26"/><circle class="dolu" cx="32" cy="32" r="26" stroke-dasharray="' + c + '" stroke-dashoffset="' + c + '" data-hedef="' + (c * (1 - o)) + '"/></svg><b>' + yazi + '</b></div>';
  }
  function halkalariCanlandir(k) {
    requestAnimationFrame(function () { requestAnimationFrame(function () {
      $$('.halka .dolu', k).forEach(function (el) { el.style.strokeDashoffset = el.getAttribute('data-hedef'); });
      $$('.cubuk i[data-w]', k).forEach(function (el) { el.style.width = el.getAttribute('data-w'); });
    }); });
  }
  function cubuk(oran, r) { return '<div class="cubuk"><i style="width:0;background:' + (r || 'var(--bal)') + '" data-w="' + Math.max(oran > 0 ? 2 : 0, yuzde(oran)) + '%"></i></div>'; }

  /* ================= GECE MODU ================= */
  function geceUygula() {
    var a = S.ayar.gece || 'oto', s = new Date().getHours();
    var gece = a === 'acik' || (a === 'oto' && (s >= 21 || s < 6));
    document.documentElement.classList.toggle('gece', gece);
    var m = $('meta[name="theme-color"]'); if (m) m.setAttribute('content', gece ? '#15120E' : '#FAF6EE');
  }

  /* ================= PAKET ================= */
  function bugununSimi() {
    // bugün tamamlananlar paketin içinde görünsün diye simülasyondan çıkarılır
    var kopya = JSON.parse(JSON.stringify({ izlendi: S.izlendi, tekrar: S.tekrar, ekstra: S.ekstra, netler: S.netler }));
    [kopya.izlendi, kopya.tekrar, kopya.ekstra].forEach(function (o) { Object.keys(o).forEach(function (k) { if (o[k] === BUGUN) delete o[k]; }); });
    return M.simDurum(kopya);
  }
  function seciliSure(f) {
    if (S.gunSure[BUGUN]) return S.gunSure[BUGUN];
    if (S.ruh[BUGUN] === 'yorgun') return f.hafif;
    return f.varsayilan;
  }
  function bugunPaket() {
    var f = M.faz(BUGUN); if (!f) return null;
    var dk = seciliSure(f);
    var p = S.paketler[BUGUN];
    if (p && p.dk === dk && p.surum === SURUM && (p.pazar || false) === !!S.pazarCalis[BUGUN]) return p;
    var yeni = M.gunPaketi(BUGUN, bugununSimi(), dk, { durum: S, tatilYok: !!S.pazarCalis[BUGUN] });
    yeni.surum = SURUM; yeni.pazar = !!S.pazarCalis[BUGUN]; yeni.bonus = (p && p.bonus) || [];
    S.paketler[BUGUN] = yeni;
    // eski paketleri hafif tut: 60 günden eskileri sil
    Object.keys(S.paketler).forEach(function (k) { if (T.fark(k, BUGUN) > 60) delete S.paketler[k]; });
    kaydet();
    return yeni;
  }
  function ogeBitti(o) {
    if (o.tip === 'video') return !!S.izlendi[o.id];
    if (o.tip === 'tekrar') return !!S.tekrar[o.id];
    return !!S.ekstra[o.id];
  }
  function tumOgeler(p) { return p ? p.ogeler.concat(p.bonus || []) : []; }

  /* ================= PLAN ÖNBELLEĞİ ================= */
  var planCache = null;
  function plan() {
    if (!planCache) planCache = M.simule(S, BUGUN, bugunPaket());
    return planCache;
  }
  function degisti() { planCache = null; kaydet(); }

  /* ================= İŞARETLEME ================= */
  function ogeTamamla(o, deger) {
    var hedef = o.tip === 'video' ? S.izlendi : o.tip === 'tekrar' ? S.tekrar : S.ekstra;
    var once = !!hedef[o.id];
    if (deger === undefined) deger = !once;
    if (deger === once) return;
    var dk = o.dk || (M.U[o.id] ? M.U[o.id].dk : 15);
    var konuOnce = o.konu ? M.konuBitti(o.konu, S.izlendi) : false;
    var bolumId = o.tip === 'video' ? M.U[o.id].bolum : null;
    var bolumOnce = bolumId ? bolumBitti(bolumId) : false;
    if (deger) { hedef[o.id] = BUGUN; S.aktivite[BUGUN] = (S.aktivite[BUGUN] || 0) + dk; }
    else { delete hedef[o.id]; S.aktivite[BUGUN] = Math.max(0, (S.aktivite[BUGUN] || 0) - dk); }
    degisti();
    if (deger && o.tip === 'video') {
      if (!konuOnce && M.konuBitti(o.konu, S.izlendi)) {
        konfeti(70);
        toast(doldur(sec(KOC.konuBitti, gunSirasi(BUGUN)), { konu: M.K[o.konu].ad }));
      }
      if (!bolumOnce && bolumBitti(bolumId)) { setTimeout(function () { konfeti(180); }, 300); }
      else if (M.U[o.id].zor >= 3) {
        setTimeout(function () { toast('Zor bir dersi bitirdin. 60 saniyelik mola?', 'Mola', molaAc); }, 900);
      }
    }
    setTimeout(kutlamaKontrol, 700);
  }
  function bolumBitti(bid) { return M.B[bid].birimler.every(function (id) { return S.izlendi[id]; }); }
  var KOC = window.KOC;

  /* ================= ROZET & SÜRPRİZ ================= */
  function kazanilanlar() {
    var k = {}, il = M.ilerleme(S), z = M.zincir(S, BUGUN), sr = M.toplamSoru(S);
    if (Object.keys(S.izlendi).length) k.ilk_video = 1;
    if (Object.keys(M.K).some(function (kid) { return M.K[kid].tur !== 'giris' && M.konuBitti(kid, S.izlendi); })) k.ilk_konu = 1;
    [10, 25, 50, 75, 100].forEach(function (y) { if (il * 100 >= y - 0.01) k['yuzde_' + y] = 1; });
    [3, 7, 14, 30].forEach(function (y) { if (z >= y) k['zincir_' + y] = 1; });
    [100, 500, 1000, 2500].forEach(function (y) { if (sr >= y) k['soru_' + y] = 1; });
    if (S.netler.some(function (n) { return n.tur === 'deneme'; })) k.deneme_1 = 1;
    if (BUGUN >= window.FAZLAR[1].bas) k.faz_2 = 1;
    Object.keys(M.B).forEach(function (bid) { if (bolumBitti(bid)) { k['ders_' + bid] = 1; k['bolum_' + bid] = 1; } });
    k['tarih_' + BUGUN] = 1;
    return k;
  }
  var kuyrukModal = [];
  function kutlamaKontrol() {
    var k = kazanilanlar();
    Object.keys(k).forEach(function (id) {
      if (id.indexOf('tarih_') === 0 || id.indexOf('bolum_') === 0) return;
      if (S.rozetler[id]) return;
      S.rozetler[id] = BUGUN;
      var r = (window.ROZETLER || []).filter(function (x) { return x.id === id; })[0];
      if (!r && id.indexOf('ders_') === 0) { var b = M.B[id.slice(5)]; r = { id: id, ad: b.ad, s: b.ad + ' bölümünün tamamını bitirdin!' }; }
      if (r && !(ilkAcilis && id === 'faz_2')) kuyrukModal.push({ tur: 'rozet', r: r });
    });
    (window.SURPRIZLER || []).forEach(function (n) {
      if (!n.aktif || S.gorulen[n.id]) return;
      if (k[n.tetik]) { S.gorulen[n.id] = BUGUN; kuyrukModal.push({ tur: 'not', n: n }); }
    });
    kaydet();
    siradakiModal();
  }
  var modalAcik = false;
  function siradakiModal() {
    if (modalAcik || !kuyrukModal.length) return;
    var m = kuyrukModal.shift(); modalAcik = true;
    if (m.tur === 'rozet') {
      ortaAc('<div class="rozet-hex">' + hexSvg(1) + '</div><div class="etiket">Yeni rozet</div><h2>' + esc(m.r.ad) + '</h2><p>' + esc(m.r.s) + '</p><button class="btn ana tam" data-a="ortaKapat">Devam</button>');
      konfeti(120);
    } else {
      ortaAc('<div class="zarf"><div class="govde"></div><div class="kalp">💌</div><div class="kapak"></div></div><div class="etiket">' + esc(m.n.kimden) + '\'dan bir notun var</div>' +
        '<div style="height:12px"></div><p class="mektup">' + esc(m.n.metin) + '</p><div class="mektup-kimden">— ' + esc(m.n.kimden) + '</div><button class="btn bal tam" data-a="ortaKapat">Teşekkürler</button>');
    }
  }

  /* ================= KATMANLAR ================= */
  var katman = $('#katman');
  var SHEET_UST = '<div class="tutamac"></div><button class="sheet-kapat" data-a="sheetKapat" aria-label="Kapat">×</button>';
  function sheetAc(html, sinif) {
    var mevcut = $('.sheet.acik', katman);
    if (mevcut && !mevcut.classList.contains('kapaniyor')) {
      var kaydirma = mevcut.scrollTop;
      mevcut.className = 'sheet acik ' + (sinif || ''); mevcut.innerHTML = SHEET_UST + html;
      mevcut.scrollTop = kaydirma; return mevcut;
    }
    sheetKapat(true);
    var p = document.createElement('div'); p.className = 'perde'; p.setAttribute('data-a', 'sheetKapat');
    var s = document.createElement('div'); s.className = 'sheet ' + (sinif || ''); s.innerHTML = SHEET_UST + html;
    katman.appendChild(p); katman.appendChild(s);
    requestAnimationFrame(function () { p.classList.add('acik'); s.classList.add('acik'); });
    return s;
  }
  function sheetKapat(hemen) {
    var p = $('.perde', katman), s = $('.sheet', katman);
    if (!s) return;
    if (molaZamanlayici) { clearInterval(molaZamanlayici); molaZamanlayici = null; }
    if (hemen === true) { $$('.perde:not(.orta-perde), .sheet', katman).forEach(function (x) { x.remove(); }); return; }
    p && p.classList.remove('acik'); s.classList.remove('acik'); s.classList.add('kapaniyor');
    setTimeout(function () { p && p.remove(); s.remove(); }, 340);
  }
  function ortaAc(html) {
    var o = document.createElement('div'); o.className = 'ortala'; o.innerHTML = '<div class="kutu">' + html + '</div>';
    var p = document.createElement('div'); p.className = 'perde orta-perde';
    katman.appendChild(p); katman.appendChild(o);
    requestAnimationFrame(function () { p.classList.add('acik'); o.classList.add('acik'); });
  }
  function ortaKapat() {
    var o = $('.ortala', katman), p = $('.orta-perde', katman);
    if (o) { o.classList.remove('acik'); p && p.classList.remove('acik'); setTimeout(function () { o.remove(); p && p.remove(); modalAcik = false; siradakiModal(); }, 300); }
  }
  var sorCb = null;
  function sor(baslik, aciklama, sec, cb) {
    sec = sec || {}; sorCb = cb; modalAcik = true;
    ortaAc('<h2>' + esc(baslik) + '</h2>' + (aciklama ? '<p>' + esc(aciklama) + '</p>' : '') +
      (sec.girdi ? '<input class="yaz" id="sorGirdi" placeholder="' + esc(sec.girdi) + '" style="margin-bottom:16px" autocomplete="off">' : '') +
      '<div class="satir"><button class="btn ince" style="flex:1" data-a="sorIptal">Vazgeç</button><button class="btn ' + (sec.tehlike ? '' : 'ana') + '" style="flex:1;' + (sec.tehlike ? 'background:var(--uyari);color:#fff' : '') + '" data-a="sorTamam">' + esc(sec.tamam || 'Tamam') + '</button></div>');
    setTimeout(function () { var g = $('#sorGirdi'); if (g) g.focus(); }, 350);
  }
  var toastZ;
  function toast(msg, eylemAd, eylem) {
    var t = $('.toast'); if (t) t.remove();
    t = document.createElement('div'); t.className = 'toast';
    t.innerHTML = '<span>' + esc(msg) + '</span>' + (eylemAd ? '<button>' + esc(eylemAd) + '</button>' : '');
    document.body.appendChild(t);
    if (eylem) t.querySelector('button').onclick = function () { t.remove(); eylem(); };
    requestAnimationFrame(function () { t.classList.add('acik'); });
    clearTimeout(toastZ); toastZ = setTimeout(function () { t.classList.remove('acik'); setTimeout(function () { t.remove(); }, 400); }, eylemAd ? 5200 : 3200);
  }

  /* ================= KONFETİ (altıgen bal parçacıkları) ================= */
  var kv = $('#konfeti'), kx = kv.getContext('2d'), parc = [], kAnim = null;
  function konfeti(n) {
    if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    kv.width = innerWidth * devicePixelRatio; kv.height = innerHeight * devicePixelRatio; kv.style.width = innerWidth + 'px'; kv.style.height = innerHeight + 'px';
    var renkler = ['#E3A43A', '#F2C46B', '#D9765F', '#2E9184', '#4F6D9A', '#6E9A57', '#8A6FA8'];
    for (var i = 0; i < n; i++) parc.push({ x: innerWidth / 2 + (Math.random() - .5) * 80, y: innerHeight * .42, vx: (Math.random() - .5) * 11, vy: -Math.random() * 13 - 4,
      r: Math.random() * 6 + 4, a: Math.random() * 6, va: (Math.random() - .5) * .3, c: renkler[i % renkler.length], o: 1 });
    if (!kAnim) kAnim = requestAnimationFrame(kAdim);
  }
  function kAdim() {
    var d = devicePixelRatio; kx.setTransform(d, 0, 0, d, 0, 0); kx.clearRect(0, 0, innerWidth, innerHeight);
    parc = parc.filter(function (p) { return p.o > 0.02 && p.y < innerHeight + 40; });
    parc.forEach(function (p) {
      p.vy += .32; p.vx *= .99; p.x += p.vx; p.y += p.vy; p.a += p.va; if (p.vy > 2) p.o -= .012;
      kx.save(); kx.globalAlpha = p.o; kx.translate(p.x, p.y); kx.rotate(p.a); kx.fillStyle = p.c; kx.beginPath();
      for (var i = 0; i < 6; i++) { var aa = Math.PI / 3 * i; kx.lineTo(Math.cos(aa) * p.r, Math.sin(aa) * p.r); }
      kx.closePath(); kx.fill(); kx.restore();
    });
    kAnim = parc.length ? requestAnimationFrame(kAdim) : (kx.clearRect(0, 0, innerWidth, innerHeight), null);
  }

  /* ================= ÜST BİLGİ ================= */
  function ustYaz() {
    $('#ustTarih').textContent = uzunTarih(BUGUN);
    var g = T.fark(BUGUN, window.SINAV.tarih);
    $('#ustGeri').innerHTML = g > 0 ? 'AGS\'ye <b class="num">' + g + '</b> gün' : g === 0 ? 'Bugün sınav günü 🤲' : 'Sınav tamamlandı';
  }

  /* ================= BUGÜN ================= */
  function kocMesaji(f) {
    var dun = T.ekle(BUGUN, -1), n = gunSirasi(BUGUN);
    if (S.ruh[BUGUN] === 'yorgun') return sec(KOC.yorgun, n);
    if (dun >= S.kurulum && T.gunNo(dun) !== window.TATIL_GUNU && !S.aktivite[dun] && Object.keys(S.aktivite).length) return sec(KOC.dunKacti, n);
    var aday = [];
    // trend
    var enIyi = null;
    Object.keys(M.K).forEach(function (kid) {
      var l = M.konuIstat(S, kid).liste; if (l.length < 2) return;
      var a = l[0], b = l[l.length - 1], ta = a.d + a.y + a.b, tb = b.d + b.y + b.b; if (!ta || !tb) return;
      var fa = a.d / ta, fb = b.d / tb;
      if (fb - fa >= 0.1 && T.fark(b.tarih, BUGUN) <= 7 && (!enIyi || fb - fa > enIyi.f)) enIyi = { f: fb - fa, k: kid, a: yuzde(fa), b: yuzde(fb) };
    });
    if (enIyi) aday.push(doldur(sec(KOC.trend, n), { konu: M.K[enIyi.k].ad, a: enIyi.a, b: enIyi.b }));
    var z = M.zincir(S, BUGUN);
    if (z >= 3) aday.push(doldur(sec(KOC.zincir, n), { n: z }));
    var h = M.haftaDk(S, BUGUN);
    if (h.bu > h.onceki && h.onceki > 0) aday.push(doldur(KOC.hafta[0], { dk: h.bu, fark: h.bu - h.onceki }));
    // tahmin: ilk bitmemiş bölüm
    var pl = plan(), oncelik = null;
    (f ? f.slotlar : []).some(function (sl) { return sl.kuyruk.some(function (b) { if (!bolumBitti(b) && M.B[b] && pl.bolumBitis[b] && M.bolumIlerleme(S, b) > 0) { oncelik = b; return true; } }); });
    if (oncelik) aday.push(doldur(sec(KOC.tahmin, n), { bolum: M.B[oncelik].ad, tarih: kisaTarih(pl.bolumBitis[oncelik]) }));
    aday.push(doldur(sec(KOC.genel, n), { gun: T.fark(BUGUN, window.SINAV.tarih), yuzde: yuzde(M.ilerleme(S)) }));
    if (!Object.keys(S.izlendi).length) return doldur(sec(KOC.karsilama, n), { isim: window.ISIM });
    return sec(aday, n);
  }
  function selamYaz() {
    var s = new Date().getHours();
    return (s < 5 ? 'İyi geceler' : s < 12 ? 'Günaydın' : s < 18 ? 'İyi günler' : 'İyi akşamlar') + ', ' + esc(window.ISIM);
  }

  function ogeHtml(o) {
    var bitti = ogeBitti(o), r = renk(o.ders), ust = '', ad = '', detay = '', eylem = '';
    if (o.tip === 'video') {
      var u = M.U[o.id];
      ust = esc(M.DERS[u.ders].ad) + ' · ' + esc(M.K[u.konu].ad);
      ad = esc(u.ad);
      detay = u.izleDk + ' dk video' + hiz(u.hiz) + ' · ' + u.soru + ' soru';
      var soruOk = S.soru[o.id];
      eylem = '<a class="mini izle" href="' + M.ytLink(u) + '" target="_blank" rel="noopener">' + IKON.oynat + 'İzle</a>' +
        '<button class="mini ' + (soruOk ? 'ok' : '') + '" data-a="soruGir" data-id="' + o.id + '">' + IKON.kalem + (soruOk ? u.soru + ' soru ✓' : u.soru + ' soru çöz') + '</button>';
    } else if (o.tip === 'tekrar') {
      ust = esc(M.DERS[o.ders].ad) + ' · ' + (o.aralik === 'z' ? 'Güçlendirme' : 'Kısa tekrar');
      ad = esc(M.K[o.konu].ad);
      detay = 'Notlarına 5 dk göz at, sonra 10 soru çöz · ' + o.dk + ' dk';
      eylem = '<button class="mini" data-a="konuTest" data-konu="' + o.konu + '" data-soru="10">' + IKON.kalem + 'Sonucu gir</button>';
    } else if (o.tip === 'calisma') {
      ust = esc(M.DERS[o.ders].ad) + ' · Soru çalışması';
      ad = esc(M.K[o.konu].ad);
      detay = '~' + o.soru + ' soru · ' + o.dk + ' dk';
      eylem = '<button class="mini" data-a="konuTest" data-konu="' + o.konu + '" data-soru="' + o.soru + '">' + IKON.kalem + 'Sonucu gir</button>';
    } else if (o.tip === 'sorugunu') {
      r = renk('mat'); ust = 'Matematik · Soru günü';
      ad = 'Bugün yeni konu yok, pekiştirme var';
      detay = (o.konular || []).map(function (k) { return M.K[k].ad; }).join(', ') + ' · ~' + o.soru + ' soru';
      eylem = '<button class="mini" data-a="konuTest" data-konu="' + ((o.konular || [])[0] || '') + '" data-soru="' + o.soru + '">' + IKON.kalem + 'Sonucu gir</button>';
    } else if (o.tip === 'deneme') {
      r = 'var(--murekkep)'; ust = o.tur === 'mini' ? 'Mini deneme' : 'Deneme günü';
      ad = o.tur === 'mini' ? 'Bildiğin derslerden kısa bir deneme' : 'Tam deneme · 80 soru, 110 dk';
      detay = o.tur === 'mini' ? 'Bitirdiğin derslerden 30-40 soru · sonra yanlışlarına bak' : 'Ardından 30-40 dk yanlış analizi';
      eylem = '<button class="mini izle" data-a="denemeBasla" data-id="' + o.id + '">Başla</button>';
    }
    return '<div class="oge ' + (bitti ? 'bitti' : '') + '" data-oge="' + esc(o.id) + '"><span class="renk" style="background:' + r + '"></span>' +
      '<div class="govde"><div class="hat">' + ust + '</div><div class="ad">' + ad + '</div><div class="detay">' + detay + '</div><div class="eylem">' + eylem + '</div></div>' +
      '<button class="tik ' + (bitti ? 'on' : '') + '" data-a="tikla" data-id="' + esc(o.id) + '" aria-label="Tamamlandı">' + IKON.tik + '</button></div>';
  }

  function sozKarti() {
    var L = window.SOZLER, s = sec(L, gunSirasi(BUGUN) * 7);
    var tur = { ayet: 'Ayet-i Kerîme', hadis: 'Hadis-i Şerîf', dua: 'Dua', soz: 'Günün sözü' }[s.t];
    return '<div class="kart soz"><span class="petek-arka">' + IKON.petek + '</span><div class="tur">' + tur + '</div><blockquote>' + esc(s.s) + '</blockquote><cite>' + esc(s.k) + '</cite></div>';
  }
  function hayalKarti() {
    var n = gunSirasi(BUGUN);
    if (n % 2) return '';
    var konular = ['kardes', 'sinif', 'akademi', 'gelecek'], konu = konular[(n / 2) % 4];
    var L = window.HAYAL.filter(function (h) { return h.konu === konu; });
    var h = sec(L, Math.floor(n / 8));
    return '<div class="kart hayal"><div class="etiket">Bir gün</div><p>' + esc(h.s) + '</p></div>';
  }

  function bannerlar() {
    var out = '';
    var ios = /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    var standalone = navigator.standalone || (window.matchMedia && matchMedia('(display-mode: standalone)').matches);
    var cerceve = window.self !== window.top;
    if (ios && !standalone && !cerceve && !S.kapatilan.kur)
      out += '<div class="banner"><div style="flex:1"><b>Önemli:</b> Rehberi uygulama gibi kullanmak ve kayıtlarının kaybolmaması için Safari\'de alttaki <b>Paylaş</b> düğmesine dokun → <b>Ana Ekrana Ekle</b>. Sonra hep o simgeden aç.</div><button class="kapat" data-a="bannerKapat" data-k="kur">×</button></div>';
    if (bellekModu && !cerceve) out += '<div class="banner"><div><b>Dikkat:</b> Bu tarayıcı kayıt yapmaya izin vermiyor. Lütfen rehberi Safari\'den, ana ekrana ekleyerek aç.</div></div>';
    var s = window.SINAV;
    if (BUGUN >= T.ekle(s.basvuruBas, -14) && BUGUN <= s.gecBasvuru && !S.basvurdu)
      out += '<div class="kart" style="border-left:3px solid var(--uyari)"><div class="etiket" style="color:var(--uyari)">AGS başvurusu</div><p style="margin:6px 0 12px">Başvurular <b>' + kisaTarih(s.basvuruBas) + ' – ' + kisaTarih(s.basvuruBit) + '</b> arasında (geç başvuru: ' + kisaTarih(s.gecBasvuru) + '). ÖSYM AİS üzerinden yapılır.</p><div class="satir"><a class="btn ince" href="' + takvimLink() + '" download="AGS-takvim.ics">Takvime ekle</a><button class="btn ana" data-a="basvurdum">Başvurdum ✓</button></div></div>';
    var yedekGun = S.sonYedek ? T.fark(S.sonYedek, BUGUN) : 99;
    if ((T.gunNo(BUGUN) === window.TATIL_GUNU || yedekGun > 8) && Object.keys(S.aktivite).length && yedekGun >= 6 && T.fark(S.kurulum, BUGUN) >= 6 && S.kapatilan.yedek !== BUGUN)
      out += '<div class="kart"><div class="etiket">Haftalık</div><h3 style="font-size:18px;margin:4px 0 6px">Haftanı Mert Hoca\'ya gönder</h3><p class="alt-yazi" style="margin:0 0 12px">Raporun ve yedeğin WhatsApp\'tan gider. Telefonuna bir şey olsa bile hiçbir şey kaybolmaz.</p>' +
        '<div class="satir" style="flex-wrap:wrap"><button class="btn ana" data-a="raporGonder">Raporu gönder</button><button class="btn ince" data-a="yedekPaylas">Yedeği gönder</button><button class="btn" style="color:var(--soluk)" data-a="bannerKapat" data-k="yedek" data-gun="1">Sonra</button></div></div>';
    return out;
  }

  function renderBugun() {
    var el = $('#s-bugun'), f = M.faz(BUGUN), h = '';
    if (f) h += bannerlar();
    if (!f) {
      var g = T.fark(BUGUN, window.SINAV.tarih);
      h += '<div class="selam"><h1>' + (g === 0 ? 'Bugün o gün, ' + esc(window.ISIM) : 'Emeğine sağlık, ' + esc(window.ISIM)) + '</h1><p>' +
        (g === 0 ? 'Bildiğin her şey yanında. Derin bir nefes al, soruları sırayla ve sakin çöz. Kalbin hızlıysa bu heyecan senin enerjin.' : 'Aylardır verdiğin emek bir yere gitmez. Şimdi sonuçları bekleme vakti; kendine iyi bak.') + '</p></div>' + sozKarti();
      el.innerHTML = h; return;
    }
    h += '<div class="selam"><h1>' + selamYaz() + '</h1><p>' + esc(kocMesaji(f)) + '</p></div>';

    var tatil = T.gunNo(BUGUN) === window.TATIL_GUNU && !S.pazarCalis[BUGUN];
    if (tatil) {
      var hf = M.haftaDk(S, BUGUN);
      h += '<div class="kart tamam-kart"><div class="buyuk">🌿</div><h2>Bugün dinlenme günü</h2><p class="alt-yazi">Bu hafta <b class="num">' + dkYaz(hf.bu) + '</b> çalıştın. Dinlenmek de öğrenmenin parçası: beyin bugün öğrendiklerini yerleştiriyor.</p>' +
        '<button class="btn ince" data-a="pazarCalis">Yine de biraz çalışmak istiyorum</button></div>';
      h += sozKarti() + hayalKarti();
      el.innerHTML = h; halkalariCanlandir(el); return;
    }

    if (!S.ruh[BUGUN]) {
      h += '<div class="soru-baslik">Bugün nasılsın?</div><div class="ruh">' +
        '<button data-a="ruh" data-v="iyi"><span>😊</span>İyiyim</button><button data-a="ruh" data-v="orta"><span>😐</span>İdare eder</button><button data-a="ruh" data-v="yorgun"><span>😩</span>Yorgunum</button></div>';
    }
    var secili = seciliSure(f);
    h += '<div class="soru-baslik">Bugün ne kadar vaktin var?</div><div class="secim">';
    f.sureler.forEach(function (d) { h += '<button class="chip ' + (secili === d ? 'secili' : '') + '" data-a="sure" data-v="' + d + '">' + (d / 60) + ' saat</button>'; });
    h += '<button class="chip ' + (secili === f.hafif ? 'secili' : '') + '" data-a="sure" data-v="' + f.hafif + '">😴 Az vaktim var</button></div>';

    var p = bugunPaket(), og = tumOgeler(p);
    var top = 0, yap = 0; og.forEach(function (o) { top += o.dk; if (ogeBitti(o)) yap += o.dk; });
    var hepsi = og.length && og.every(ogeBitti);
    h += '<div class="kart" id="paket"><div class="paket-ust">' + halka(top ? yap / top : 0, (top ? yuzde(yap / top) : 0) + '%') +
      '<div><div class="etiket">' + esc(f.ad) + '</div><h2>Bugünkü paketin</h2><div class="alt-yazi num">' + og.length + ' iş · yaklaşık ' + dkYaz(top) + '</div></div></div>';
    if (!og.length) h += '<p class="ipucu">Bugün için planlanmış iş kalmadı. Netlerim sekmesinden soru çözüp sonuç girebilirsin.</p>';
    og.forEach(function (o) { h += ogeHtml(o); });
    h += '</div>';
    if (hepsi) {
      h += '<div class="kart tamam-kart"><div class="buyuk">🍯</div><h2>' + esc(doldur(sec(KOC.paketBitti, gunSirasi(BUGUN)), { isim: window.ISIM })) + '</h2>' +
        '<p class="alt-yazi">Yarınki paketin, bugün bitirdiklerine göre hazırlanacak.</p><button class="btn ince" data-a="bonus">Biraz daha çalışmak istiyorum</button></div>';
    }
    h += sozKarti() + hayalKarti();
    h += '<div style="text-align:center;margin:18px 0 6px"><button class="mini" data-a="mola">🌿 Mini mola</button></div>';
    el.innerHTML = h;
    halkalariCanlandir(el);
  }

  /* ================= PLAN ================= */
  var planGorunum = 'hafta', haftaKaydir = 0, aySecim = null, ayKaydir = 0;
  function gunOgeleri(s) {
    if (s < BUGUN) { var p = S.paketler[s]; return p ? tumOgeler(p) : []; }
    var g = plan().gunler[s]; return g ? tumOgeler(g) : [];
  }
  function ogeKisa(o) {
    if (o.tip === 'video') return M.K[o.konu].ad;
    if (o.tip === 'tekrar') return 'Tekrar · ' + M.K[o.konu].ad;
    if (o.tip === 'calisma') return 'Soru · ' + M.K[o.konu].ad;
    if (o.tip === 'sorugunu') return 'Matematik soru günü';
    if (o.tip === 'deneme') return o.tur === 'mini' ? 'Mini deneme' : 'Tam deneme';
    return '';
  }
  function grupla(og) {
    // aynı konudan birden çok video → tek satır
    var out = [], son = {};
    og.forEach(function (o) {
      var key = o.tip + ':' + (o.konu || o.id);
      if (o.tip === 'video' && son[key]) { son[key].n++; son[key].dk += o.dk; son[key].bitti = son[key].bitti && ogeBitti(o); return; }
      var x = { o: o, n: 1, dk: o.dk, bitti: ogeBitti(o) }; out.push(x); son[key] = x;
    });
    return out;
  }
  function zamanSeridi() {
    var F = window.FAZLAR, bas = F[0].bas, son = window.SINAV.tarih, top = T.fark(bas, son);
    var renkler = ['#E9C27A', '#E3A43A', '#B77B16'];
    var h = '<div class="zaman"><div class="serit">';
    F.forEach(function (f, i) { h += '<i style="flex:' + (T.fark(f.bas, f.bit) + 1) + ';background:' + renkler[i] + '"></i>'; });
    var oran = Math.max(0, Math.min(1, T.fark(bas, BUGUN) / top));
    h += '</div><div class="im"><span style="left:' + (oran * 100) + '%"></span></div><div class="etiketler">';
    F.forEach(function (f) { h += '<span style="flex:' + (T.fark(f.bas, f.bit) + 1) + '">' + f.ad.replace(' Dönemi', '') + '<br>' + kisaTarih(f.bas) + '</span>'; });
    h += '<span style="flex:0;white-space:nowrap;text-align:right">Sınav<br>' + kisaTarih(son) + '</span></div></div>';
    return h;
  }
  function renderPlan() {
    var el = $('#s-plan'), h = '';
    h += '<div class="selam"><h1>Plan</h1><p>Plan her gün yaptıklarına göre kendini yeniden hesaplar.</p></div>';
    h += '<div class="kart">' + zamanSeridi() + '</div>';
    h += '<div class="segment"><button class="' + (planGorunum === 'hafta' ? 'secili' : '') + '" data-a="planGor" data-v="hafta">Hafta</button><button class="' + (planGorunum === 'ay' ? 'secili' : '') + '" data-a="planGor" data-v="ay">Ay</button><button class="' + (planGorunum === 'bitis' ? 'secili' : '') + '" data-a="planGor" data-v="bitis">Dersler</button></div>';
    if (planGorunum === 'hafta') h += haftaHtml();
    else if (planGorunum === 'ay') h += ayHtml();
    else h += bitisHtml();
    el.innerHTML = h; halkalariCanlandir(el);
  }
  function haftaBasi(s) { var g = T.gunNo(s); return T.ekle(s, -((g + 6) % 7)); }
  function haftaHtml() {
    var pzt = T.ekle(haftaBasi(BUGUN), haftaKaydir * 7), h = '';
    h += '<div class="hafta-nav"><button data-a="hafta" data-v="-1" aria-label="Önceki hafta">' + IKON.sol + '</button><b style="font-family:var(--serif)">' + kisaTarih(pzt) + ' – ' + kisaTarih(T.ekle(pzt, 6)) + '</b><button data-a="hafta" data-v="1" aria-label="Sonraki hafta">' + IKON.sag + '</button></div>';
    for (var i = 0; i < 7; i++) {
      var s = T.ekle(pzt, i), og = gunOgeleri(s), cls = s === BUGUN ? 'bugun' : s < BUGUN ? 'gecmis' : '';
      var toplam = og.reduce(function (a, o) { return a + o.dk; }, 0);
      h += '<div class="gun ' + cls + '"><div class="gb"><b>' + GUNLER[T.gunNo(s)] + '</b><small>' + kisaTarih(s) + (toplam ? ' · ' + dkYaz(toplam) : '') + '</small>' + (s === BUGUN ? '<span class="bosluk"></span><small style="color:var(--bal-koyu);font-weight:700">BUGÜN</small>' : '') + '</div>';
      if (s > window.SINAV.tarih) { h += '<small class="alt-yazi">—</small></div>'; continue; }
      if (s === window.SINAV.tarih) { h += '<ul><li>🤲 AGS sınav günü</li></ul></div>'; continue; }
      if (!og.length) h += '<small class="alt-yazi">' + (T.gunNo(s) === window.TATIL_GUNU ? '🌿 Dinlenme' : s < BUGUN ? (S.aktivite[s] ? 'Çalışıldı · ' + dkYaz(S.aktivite[s]) : s < S.kurulum ? '—' : 'Kayıt yok') : '—') + '</small>';
      else {
        h += '<ul>';
        grupla(og).forEach(function (x) {
          h += '<li class="' + (x.bitti && s <= BUGUN ? 'ok' : '') + '"><span class="nokta" style="background:' + (x.o.tip === 'deneme' ? 'var(--murekkep)' : renk(x.o.ders)) + '"></span>' + esc(ogeKisa(x.o)) + (x.n > 1 ? ' <small class="alt-yazi">×' + x.n + '</small>' : '') + '</li>';
        });
        h += '</ul>';
      }
      h += '</div>';
    }
    h += '<button class="btn ince tam" style="margin-top:8px" data-a="yazdir">🖨 Bu haftayı yazdır</button>';
    return h;
  }
  function ayHtml() {
    var b = T.parse(BUGUN); b.setDate(1); b.setMonth(b.getMonth() + ayKaydir);
    var yil = b.getFullYear(), ay = b.getMonth(), ilk = T.str(b);
    var gunSay = new Date(yil, ay + 1, 0).getDate(), bos = (b.getDay() + 6) % 7;
    var pl = plan(), bitisler = {};
    window.DERSLER.forEach(function (d) { var t = dersBitis(pl, d.id).tarih; if (t && t >= BUGUN) (bitisler[t] = bitisler[t] || []).push(d.id); });
    var h = '<div class="hafta-nav"><button data-a="ay" data-v="-1">' + IKON.sol + '</button><b style="font-family:var(--serif)">' + AYLAR[ay] + ' ' + yil + '</b><button data-a="ay" data-v="1">' + IKON.sag + '</button></div><div class="kart" style="padding:12px"><div class="ay">';
    ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'].forEach(function (g) { h += '<div class="hb">' + g + '</div>'; });
    for (var i = 0; i < bos; i++) h += '<div class="g bos"></div>';
    var SN = window.SINAV;
    for (var d = 1; d <= gunSay; d++) {
      var s = T.ekle(ilk, d - 1), og = gunOgeleri(s), cls = [];
      if (s === BUGUN) cls.push('bugun');
      if (T.gunNo(s) === window.TATIL_GUNU && !og.length) cls.push('tatil');
      if (s === SN.tarih) cls.push('sinav');
      if (s >= SN.basvuruBas && s <= SN.basvuruBit) cls.push('basvuru');
      if (s === aySecim) cls.push('secili');
      var dersler = {}; og.forEach(function (o) { if (o.ders) dersler[o.ders] = 1; });
      var isaret = '';
      if (og.some(function (o) { return o.tip === 'deneme'; })) isaret += '◆';
      if (bitisler[s]) isaret += '★';
      h += '<button class="g ' + cls.join(' ') + '" data-a="aySec" data-v="' + s + '">' + d + '<span class="noktalar">' + Object.keys(dersler).map(function (k) { return '<i style="background:' + renk(k) + '"></i>'; }).join('') + '</span>' + (isaret ? '<span class="isaret">' + isaret + '</span>' : '') + '</button>';
    }
    h += '</div><div class="lejant">' + window.DERSLER.map(function (d) { return '<span><i style="background:' + d.renk + '"></i>' + d.kisa + '</span>'; }).join('') + '<span>◆ deneme</span><span>★ ders biter</span><span><i style="background:none;box-shadow:0 0 0 1.5px var(--uyari) inset;border-radius:3px"></i>başvuru</span></div></div>';
    if (aySecim && aySecim.slice(0, 7) === ilk.slice(0, 7)) {
      var og2 = gunOgeleri(aySecim);
      h += '<div class="gun"><div class="gb"><b>' + uzunTarih(aySecim) + '</b></div>';
      if (aySecim === SN.tarih) h += '<ul><li>🤲 AGS sınav günü</li></ul>';
      else if (!og2.length) h += '<small class="alt-yazi">' + (T.gunNo(aySecim) === window.TATIL_GUNU ? '🌿 Dinlenme günü' : 'Plan yok') + '</small>';
      else { h += '<ul>'; grupla(og2).forEach(function (x) { h += '<li class="' + (x.bitti && aySecim <= BUGUN ? 'ok' : '') + '"><span class="nokta" style="background:' + (x.o.tip === 'deneme' ? 'var(--murekkep)' : renk(x.o.ders)) + '"></span>' + esc(ogeKisa(x.o)) + (x.n > 1 ? ' <small class="alt-yazi">×' + x.n + '</small>' : '') + '</li>'; }); h += '</ul>'; }
      if (bitisler[aySecim]) h += '<p class="alt-yazi" style="margin:8px 0 0">★ ' + bitisler[aySecim].map(function (b) { return M.B[b].ad; }).join(', ') + ' bu gün bitiyor</p>';
      h += '</div>';
    }
    return h;
  }
  // Bir dersin tahmini bitişi: o derse ait konu bölümlerinin en geç bitişi (son tekrar videoları hariç)
  function dersBitis(pl, did) {
    var bolumler = Object.keys(M.B).filter(function (b) {
      return M.B[b].ders === did && !M.B[b].konular.every(function (k) { return M.K[k].tur === 'tekrar'; });
    });
    if (bolumler.every(bolumBitti)) return { bitti: true };
    var m = null;
    for (var i = 0; i < bolumler.length; i++) { var t = pl.bolumBitis[bolumler[i]]; if (!t) return { tarih: null }; if (!m || t > m) m = t; }
    return { tarih: m };
  }
  function bitisHtml() {
    var pl = plan(), h = '<div class="kart">';
    var liste = window.DERSLER.map(function (d) { return { d: d, b: dersBitis(pl, d.id) }; });
    liste.sort(function (x, y) { var a = x.b.bitti ? '0' : (x.b.tarih || '9'), b = y.b.bitti ? '0' : (y.b.tarih || '9'); return a < b ? -1 : a > b ? 1 : 0; });
    liste.forEach(function (x) {
      var o = M.dersIlerleme(S, x.d.id).oran;
      h += '<div class="bitis-satir"><div class="ba"><b style="font-size:15px">' + esc(x.d.ad) + '</b> <small class="alt-yazi">· ' + x.d.soru + ' soru</small>' + cubuk(o, x.d.renk) + '</div><div class="bt">' +
        (x.b.bitti ? '<b style="color:var(--iyi)">✓ bitti</b>' : x.b.tarih ? 'tahmini<br><b style="color:var(--murekkep)">' + kisaTarih(x.b.tarih) + '</b>' : '—') + '</div></div>';
    });
    h += '</div><p class="ipucu">Konular bittikten sonra kalan günler tekrar, soru çalışması ve denemeyle geçer. Tahminler varsayılan günlük süreyle (1. dönem 2 saat, sonrası 5 saat) hesaplanır.</p>';
    return h;
  }

  /* ================= KONULAR ================= */
  var dersAcik = null, konuAcik = {};
  function renderKonular() {
    var el = $('#s-konular'), h = '';
    if (dersAcik) { el.innerHTML = dersDetay(dersAcik); halkalariCanlandir(el); return; }
    var il = M.ilerleme(S), kalanSn = M.toplamSn() * (1 - il);
    h += '<div class="selam"><h1>Konular</h1></div>';
    h += '<div class="kart genel">' + halka(il, yuzde(il) + '%') + '<div><div class="etiket">Toplam yol</div><div style="font-family:var(--serif);font-size:20px;margin:2px 0">' +
      Object.keys(S.izlendi).filter(function (k) { return M.U[k]; }).length + ' / ' + M.TUM.length + ' ders</div><div class="alt-yazi">Kalan video ≈ ' + Math.round(kalanSn / 3600) + ' saat</div></div></div>';
    window.DERSLER.forEach(function (d) {
      var p = M.dersIlerleme(S, d.id);
      var konular = Object.keys(M.K).filter(function (k) { return M.K[k].ders === d.id; });
      var biten = konular.filter(function (k) { return M.konuBitti(k, S.izlendi); }).length;
      h += '<button class="ders-kart" data-a="dersAc" data-v="' + d.id + '"><span class="hex">' + hexSvg(p.oran, d.renk) + '</span><span class="bilgi"><b>' + d.ad + '</b><span class="alt-yazi">' + biten + ' / ' + konular.length + ' konu · sınavda ' + d.soru + ' soru</span>' + cubuk(p.oran, d.renk) + '</span><span class="yuzde">%' + yuzde(p.oran) + '</span></button>';
    });
    el.innerHTML = h; halkalariCanlandir(el);
  }
  function dersDetay(did) {
    var d = M.DERS[did], h = '<button class="geri-btn" data-a="dersKapat">' + IKON.sol + 'Konular</button>';
    h += '<div class="selam" style="padding-top:2px"><h1>' + esc(d.ad) + '</h1><p>Sınavda ' + d.soru + ' soru · %' + yuzde(M.dersIlerleme(S, did).oran) + ' tamamlandı</p></div>';
    var konular = Object.keys(M.K).filter(function (k) { return M.K[k].ders === did; });
    h += '<div class="kart"><div class="petek">';
    konular.forEach(function (kid) { var ki = M.konuIlerleme(S, kid); h += '<span class="h" title="' + esc(M.K[kid].ad) + '">' + hexSvg(ki.n / ki.top, d.renk) + '</span>'; });
    h += '</div></div>';
    Object.keys(M.B).filter(function (b) { return M.B[b].ders === did; }).forEach(function (bid) {
      var b = M.B[bid];
      h += '<div class="bolum-bas"><h3>' + esc(b.ad) + '</h3><div class="alt-yazi">' + esc(b.hoca) + (b.hiz !== 1 ? ' · önerilen hız ' + String(b.hiz).replace('.', ',') + 'x' : '') + '</div></div>';
      b.konular.forEach(function (kid) {
        var k = M.K[kid], ki = M.konuIlerleme(S, kid), ist = M.konuIstat(S, kid), acik = konuAcik[kid];
        var rb = ist.basari === null ? '' : '<span class="rozetcik" style="background:' + (ist.basari >= .7 ? 'color-mix(in srgb,var(--iyi) 16%,transparent);color:var(--iyi)' : ist.basari >= .5 ? 'var(--bal-acik);color:var(--bal-koyu)' : 'color-mix(in srgb,var(--uyari) 15%,transparent);color:var(--uyari)') + '">%' + yuzde(ist.basari) + '</span>';
        h += '<div class="konu ' + (acik ? 'acik' : '') + '"><button data-a="konuAc" data-v="' + kid + '"><span class="hex" style="width:22px;height:25px;flex:none">' + hexSvg(ki.n / ki.top, d.renk) + '</span><span class="kad">' + esc(k.ad) + '</span>' + rb + '<span class="say">' + ki.n + '/' + ki.top + '</span>' + IKON.ok + '</button><div class="videolar">';
        k.birimler.forEach(function (id) {
          var u = M.U[id], on = !!S.izlendi[id];
          h += '<div class="video"><button class="tik ' + (on ? 'on' : '') + '" data-a="videoTik" data-id="' + id + '">' + IKON.tik + '</button><span class="vad">' + esc(u.ad) + '<small>' + u.izleDk + ' dk' + (on ? ' · ' + kisaTarih(S.izlendi[id]) : '') + '</small></span><a class="oynat" href="' + M.ytLink(u) + '" target="_blank" rel="noopener" aria-label="YouTube\'da aç">' + IKON.oynat + '</a></div>';
        });
        h += '<div class="satir" style="padding:8px 4px 2px"><button class="mini" data-a="konuTest" data-konu="' + kid + '" data-soru="10">' + IKON.kalem + 'Test sonucu gir</button>' + (ist.top ? '<span class="alt-yazi" style="font-size:12.5px">' + ist.top + ' soru · ' + ist.d + 'D ' + ist.y + 'Y ' + ist.b + 'B</span>' : '') + '</div></div></div>';
      });
    });
    return h;
  }

  /* ================= NETLERİM ================= */
  function dersBasari(did, gun) {
    var d = 0, y = 0, b = 0;
    S.netler.forEach(function (n) { if (n.tur === 'konu' && M.K[n.konu] && M.K[n.konu].ders === did && (!gun || T.fark(n.tarih, BUGUN) <= gun)) { d += n.d; y += n.y; b += n.b; } });
    var t = d + y + b; return { t: t, o: t ? d / t : null };
  }
  function denemeNet(n) {
    var top = 0; Object.keys(n.dersler).forEach(function (k) { var x = n.dersler[k]; top += x.d - x.y / window.SINAV.yanlisOrani; }); return top;
  }
  function renderNetler() {
    var el = $('#s-netler'), h = '';
    h += '<div class="selam"><h1>Netlerim</h1><p>Çözdüğün her test bir harita. Ne kadar çok girersen, rehber o kadar isabetli yönlendirir.</p></div>';
    h += '<div class="satir" style="gap:10px;margin:14px 0"><button class="btn ana" style="flex:1" data-a="konuTest">+ Konu testi</button><button class="btn bal" style="flex:1" data-a="denemeGir">+ Deneme</button></div>';
    h += '<div class="ikili"><div class="kart"><div class="etiket">Derslere göre başarı</div><div style="margin-top:8px">';
    window.DERSLER.forEach(function (d) {
      var b = dersBasari(d.id);
      h += '<div class="ders-basari"><span class="ba">' + d.kisa + '</span>' + cubuk(b.o || 0, d.renk) + '<span class="yuzde">' + (b.o === null ? '<small class="alt-yazi">—</small>' : '%' + yuzde(b.o)) + '</span></div>';
    });
    h += '</div><p class="alt-yazi" style="font-size:12.5px;margin:8px 0 0">Başarı = doğru ÷ çözülen soru · Toplam ' + M.toplamSoru(S) + ' soru</p></div>';
    // deneme grafiği
    var den = S.netler.filter(function (n) { return n.tur === 'deneme'; }).sort(function (a, b) { return a.tarih < b.tarih ? -1 : 1; });
    h += '<div class="kart grafik"><div class="etiket">Deneme netlerin</div>';
    if (!den.length) h += '<p class="ipucu">İlk denemeni girdiğinde netlerinin yükselişini burada göreceksin.</p>';
    else h += cizgiGrafik(den.map(function (n) { return { e: kisaTarih(n.tarih).replace(/ \S+$/, function (m) { return ' ' + m.trim().slice(0, 3); }), v: denemeNet(n) }; }));
    h += '</div></div>';
    // zayıflar
    var zayif = Object.keys(M.K).map(function (k) { var i = M.konuIstat(S, k); return { k: k, i: i }; }).filter(function (x) { return x.i.top >= 8 && x.i.basari < 0.6; }).sort(function (a, b) { return a.i.basari - b.i.basari; }).slice(0, 6);
    h += '<div class="kart"><div class="etiket">Güçlendirilecek konular</div><div style="margin-top:6px">';
    if (!zayif.length) h += '<p class="ipucu">Şimdilik dikkat isteyen konu yok. 👏</p>';
    zayif.forEach(function (x) { h += '<div class="zayif"><span class="nokta" style="width:9px;height:9px;border-radius:50%;background:' + renk(M.K[x.k].ders) + '"></span><span style="flex:1">' + esc(M.K[x.k].ad) + '</span><span class="yuzde" style="color:var(--uyari)">%' + yuzde(x.i.basari) + '</span></div>'; });
    h += '</div><p class="alt-yazi" style="font-size:12.5px;margin:8px 0 0">Bu konular otomatik olarak tekrar listene eklenir.</p></div>';
    // rapor
    h += '<div class="kart duz"><div class="etiket">Analiz raporu</div><p class="alt-yazi" style="margin:6px 0 12px">Bütün çalışma ve net verilerin tek bir metinde. Mert Hoca\'ya gönderirsen ayrıntılı eksik analizi çıkarabilir.</p>' +
      '<div class="satir"><button class="btn ana" style="flex:1" data-a="raporGonder">📤 Mert Hoca\'ya gönder</button><button class="btn ince" data-a="raporKopyala">Kopyala</button></div></div>';
    // son kayıtlar
    var son = S.netler.slice().sort(function (a, b) { return a.tarih < b.tarih ? 1 : a.tarih > b.tarih ? -1 : 0; }).slice(0, 15);
    h += '<div class="kart"><div class="etiket">Son kayıtlar</div><div style="margin-top:6px">';
    if (!son.length) h += '<p class="ipucu">Henüz kayıt yok.</p>';
    son.forEach(function (n) {
      var baslik, alt;
      if (n.tur === 'deneme') { baslik = 'Deneme' + (n.kaynak ? ' · ' + esc(n.kaynak) : ''); alt = kisaTarih(n.tarih) + ' · ' + denemeNet(n).toFixed(2).replace('.', ',') + ' net'; }
      else { baslik = esc(M.K[n.konu] ? M.K[n.konu].ad : n.konu); alt = kisaTarih(n.tarih) + ' · ' + n.d + 'D ' + n.y + 'Y ' + n.b + 'B' + (n.kaynak ? ' · ' + esc(n.kaynak) : ''); }
      h += '<div class="kayit"><span class="nokta" style="width:9px;height:9px;border-radius:50%;background:' + (n.tur === 'deneme' ? 'var(--murekkep)' : renk(M.K[n.konu] && M.K[n.konu].ders)) + '"></span><span class="ka">' + baslik + '<small>' + alt + '</small></span><button class="sil" data-a="netSil" data-id="' + n.id + '" aria-label="Sil">×</button></div>';
    });
    h += '</div></div>';
    el.innerHTML = h; halkalariCanlandir(el);
  }
  function cizgiGrafik(v) {
    var W = 320, H = 130, maxV = Math.max(20, Math.ceil(Math.max.apply(null, v.map(function (x) { return x.v; })) / 10) * 10 + 5), n = v.length;
    var xs = function (i) { return n === 1 ? W / 2 : 16 + i * (W - 32) / (n - 1); }, ys = function (y) { return H - 18 - (Math.max(0, y) / maxV) * (H - 34); };
    var yol = v.map(function (p, i) { return (i ? 'L' : 'M') + xs(i).toFixed(1) + ' ' + ys(p.v).toFixed(1); }).join(' ');
    var alan = yol + ' L' + xs(n - 1) + ' ' + (H - 18) + ' L' + xs(0) + ' ' + (H - 18) + ' Z';
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '"><path class="alan" d="' + alan + '"/><path class="cizgi" d="' + yol + '"/>';
    v.forEach(function (p, i) { s += '<circle class="nokta" cx="' + xs(i) + '" cy="' + ys(p.v) + '" r="4.5"/>'; if (i === n - 1 || n <= 6) s += '<text x="' + xs(i) + '" y="' + (ys(p.v) - 10) + '" text-anchor="middle" style="font-weight:700;fill:var(--murekkep)">' + p.v.toFixed(1).replace('.', ',') + '</text>'; if (n <= 8 || i % Math.ceil(n / 6) === 0) s += '<text x="' + xs(i) + '" y="' + (H - 2) + '" text-anchor="middle">' + esc(p.e) + '</text>'; });
    return s + '</svg>';
  }

  /* ================= NET GİRİŞ SAYFALARI ================= */
  function stepper(ad, deger, max) {
    return '<div class="stepper" data-st="' + ad + '"><button data-a="st" data-y="-1">−</button><input type="number" inputmode="numeric" min="0" max="' + (max || 200) + '" value="' + deger + '" data-alan="' + ad + '"><button data-a="st" data-y="1">+</button></div>';
  }
  var netForm = null;
  function konuTestAc(kid, soru, birimId) {
    var d0 = kid && M.K[kid] ? M.K[kid].ders : (sonDers() || 'tr');
    netForm = { tur: 'konu', ders: d0, konu: kid && M.K[kid] ? kid : null, kaynak: S.kaynaklar[0] || '', birim: birimId || null, toplam: +soru || 10 };
    konuTestCiz();
  }
  function sonDers() { var n = S.netler.filter(function (x) { return x.tur === 'konu' && M.K[x.konu]; }).pop(); return n ? M.K[n.konu].ders : null; }
  function konuTestCiz() {
    var f = netForm, h = '<h2>Konu testi</h2>';
    h += '<div class="alan-et">Ders</div><div class="secim kaydir">' + window.DERSLER.map(function (d) { return '<button class="chip ' + (f.ders === d.id ? 'secili' : '') + '" data-a="nfDers" data-v="' + d.id + '">' + d.kisa + '</button>'; }).join('') + '</div>';
    var konular = Object.keys(M.K).filter(function (k) { return M.K[k].ders === f.ders && M.K[k].tur !== 'giris'; });
    konular.sort(function (a, b) { var ia = M.konuIlerleme(S, a).n > 0 ? 0 : 1, ib = M.konuIlerleme(S, b).n > 0 ? 0 : 1; return ia - ib; });
    if (!f.konu || M.K[f.konu].ders !== f.ders) f.konu = konular[0];
    h += '<div class="alan-et">Konu</div><select class="sec" data-a="nfKonu">' + konular.map(function (k) { return '<option value="' + k + '" ' + (k === f.konu ? 'selected' : '') + '>' + esc(M.K[k].ad) + (M.konuIlerleme(S, k).n ? '' : ' (henüz başlanmadı)') + '</option>'; }).join('') + '</select>';
    h += '<div class="alan-et">Kaynak <span style="font-weight:400">(isteğe bağlı)</span></div><div class="secim kaydir">' +
      '<button class="chip ' + (!f.kaynak ? 'secili' : '') + '" data-a="nfKaynak" data-v="">Belirtme</button>' +
      S.kaynaklar.map(function (k) { return '<button class="chip ' + (f.kaynak === k ? 'secili' : '') + '" data-a="nfKaynak" data-v="' + esc(k) + '">' + esc(k) + '</button>'; }).join('') +
      '<button class="chip" data-a="nfKaynakYeni">+ Yeni</button></div>';
    h += '<div class="alan-et">Sonuç</div>';
    h += '<div class="adim"><span class="ae">Soru sayısı</span>' + stepper('toplam', f.toplam) + '</div>';
    h += '<div class="adim"><span class="ae" style="color:var(--iyi)">Doğru</span>' + stepper('d', f.d || 0) + '</div>';
    h += '<div class="adim"><span class="ae" style="color:var(--uyari)">Yanlış</span>' + stepper('y', f.y || 0) + '</div>';
    h += '<div class="net-ozet" id="nfOzet"></div>';
    h += '<button class="btn ana tam" data-a="nfKaydet">Kaydet</button>';
    sheetAc(h);
    nfOzet();
  }
  function nfDegerler() {
    var g = function (a) { var i = $('.sheet input[data-alan="' + a + '"]'); return i ? Math.max(0, parseInt(i.value, 10) || 0) : 0; };
    return { toplam: g('toplam'), d: g('d'), y: g('y') };
  }
  function nfOzet() {
    var v = nfDegerler(), b = Math.max(0, v.toplam - v.d - v.y), net = v.d - v.y / window.SINAV.yanlisOrani;
    var o = $('#nfOzet'); if (!o) return;
    var uyari = v.d + v.y > v.toplam;
    o.innerHTML = '<div><b class="num">' + b + '</b><small>Boş</small></div><div><b class="num">' + net.toFixed(2).replace('.', ',') + '</b><small>Net</small></div><div><b class="num">' + (v.toplam ? '%' + yuzde(v.d / v.toplam) : '—') + '</b><small>Başarı</small></div>' +
      (uyari ? '<div style="flex-basis:100%;color:var(--uyari);font-size:13px">Doğru + yanlış, soru sayısından fazla olamaz</div>' : '');
    o.style.flexWrap = 'wrap';
  }
  function nfKaydet() {
    var v = nfDegerler(), f = netForm;
    if (!v.toplam) { toast('Soru sayısını gir'); return; }
    if (v.d + v.y > v.toplam) { toast('Doğru + yanlış, soru sayısını geçemez'); return; }
    var kayit = { id: 'n' + Date.now().toString(36), tur: 'konu', tarih: BUGUN, konu: f.konu, kaynak: f.kaynak || '', d: v.d, y: v.y, b: v.toplam - v.d - v.y };
    S.netler.push(kayit);
    if (f.birim) S.soru[f.birim] = BUGUN;
    if (f.kaynak && S.kaynaklar.indexOf(f.kaynak) < 0) S.kaynaklar.unshift(f.kaynak);
    if (f.kaynak) { S.kaynaklar = [f.kaynak].concat(S.kaynaklar.filter(function (k) { return k !== f.kaynak; })).slice(0, 8); }
    degisti(); sheetKapat();
    var oran = v.d / v.toplam;
    toast(oran >= .8 ? 'Kaydedildi. %' + yuzde(oran) + ' — çok iyi!' : oran >= .5 ? 'Kaydedildi. %' + yuzde(oran) + ', sağlam gidiyor.' : 'Kaydedildi. Bu konuyu birkaç gün sonra kısa bir tekrarla güçlendireceğiz.');
    renderAktif(); setTimeout(kutlamaKontrol, 500);
  }

  var denemeForm = null;
  function denemeGirAc(ogeId) {
    denemeForm = { oge: ogeId || null, kaynak: '' };
    var h = '<h2>Deneme sonucu</h2><div class="alan-et">Yayın / deneme adı <span style="font-weight:400">(isteğe bağlı)</span></div><input class="yaz" data-alan="dKaynak" placeholder="Örn. Pegem 3. deneme" value="">';
    h += '<div class="alan-et">Her ders için doğru ve yanlış</div>';
    window.DERSLER.forEach(function (d) {
      h += '<div class="deneme-satir" data-ders="' + d.id + '"><span class="de"><span style="color:' + d.renk + '">●</span> ' + d.kisa + '<small>' + d.soru + ' soru</small></span>' +
        '<div><div style="font-size:11px;color:var(--iyi);text-align:center;font-weight:600">Doğru</div>' + stepper(d.id + '_d', 0, d.soru) + '</div><div><div style="font-size:11px;color:var(--uyari);text-align:center;font-weight:600">Yanlış</div>' + stepper(d.id + '_y', 0, d.soru) + '</div></div>';
    });
    h += '<div class="net-ozet" id="dOzet"></div><button class="btn ana tam" data-a="denemeKaydet">Kaydet</button>';
    sheetAc(h); dOzet();
  }
  function dDegerler() {
    var o = {}, g = function (a) { var i = $('.sheet input[data-alan="' + a + '"]'); return i ? Math.max(0, parseInt(i.value, 10) || 0) : 0; };
    window.DERSLER.forEach(function (d) { var dd = Math.min(d.soru, g(d.id + '_d')), yy = Math.min(d.soru - dd, g(d.id + '_y')); o[d.id] = { d: dd, y: yy, b: d.soru - dd - yy }; });
    return o;
  }
  function dOzet() {
    var v = dDegerler(), d = 0, y = 0;
    Object.keys(v).forEach(function (k) { d += v[k].d; y += v[k].y; });
    var el = $('#dOzet'); if (el) el.innerHTML = '<div><b class="num">' + d + '</b><small>Doğru</small></div><div><b class="num">' + y + '</b><small>Yanlış</small></div><div><b class="num">' + (d - y / 4).toFixed(2).replace('.', ',') + '</b><small>Net / 80</small></div>';
  }
  function denemeKaydet() {
    var v = dDegerler(), ka = ($('.sheet input[data-alan="dKaynak"]') || {}).value || '';
    var top = 0; Object.keys(v).forEach(function (k) { top += v[k].d + v[k].y; });
    if (!top) { toast('En az bir ders için sonuç gir'); return; }
    S.netler.push({ id: 'n' + Date.now().toString(36), tur: 'deneme', tarih: BUGUN, kaynak: ka.trim(), dersler: v });
    if (denemeForm && denemeForm.oge) S.ekstra[denemeForm.oge] = BUGUN;
    degisti(); sheetKapat(); konfeti(90);
    toast('Deneme kaydedildi. Şimdi yanlışlarına bakma zamanı — en değerli kısım orası.');
    renderAktif(); setTimeout(kutlamaKontrol, 600);
  }

  /* Deneme öncesi: kafanı boşalt */
  function denemeBasla(id) {
    var D = window.DENEME_ONCESI;
    var h = '<h2>' + esc(D.baslik) + '</h2><p class="alt-yazi" style="margin-top:-4px">' + esc(D.aciklama) + '</p><textarea class="yaz birak" id="kafa" placeholder="Aklımdan geçenler…"></textarea>' +
      '<p style="font-family:var(--serif);font-size:16.5px;margin:14px 2px">' + esc(D.heyecan) + '</p>' +
      '<div class="satir"><button class="btn ana" style="flex:1" data-a="biraktim" data-id="' + id + '">Bıraktım</button><button class="btn ince" data-a="denemeGir" data-id="' + id + '">Sonucu gir</button></div>';
    sheetAc(h);
  }

  /* Mini mola */
  var molaZamanlayici = null;
  function molaAc() {
    var Mo = window.MOLA;
    sheetAc('<h2 style="text-align:center">' + esc(Mo.baslik) + '</h2><div class="nefes" id="nefes"><div class="halo"></div><div class="daire"></div><div class="say" id="nefesSay">60</div></div><div class="nefes-yazi" id="nefesYazi">Hazır olduğunda başla</div><button class="btn ana tam" data-a="molaBasla">Başla</button>');
  }
  function molaBasla(btn) {
    var n = $('#nefes'); if (!n) return;
    btn.style.display = 'none'; n.classList.add('calis');
    var bas = Date.now(), A = window.MOLA.adimlar;
    if (molaZamanlayici) clearInterval(molaZamanlayici);
    molaZamanlayici = setInterval(function () {
      var g = (Date.now() - bas) / 1000, kalan = Math.max(0, 60 - Math.floor(g)), faz = g % 10;
      var y = $('#nefesYazi'), s = $('#nefesSay'); if (!y) { clearInterval(molaZamanlayici); return; }
      s.textContent = kalan;
      y.textContent = faz < 4 ? A[0] : faz < 5 ? A[1] : A[2];
      if (kalan <= 0) { clearInterval(molaZamanlayici); molaZamanlayici = null; n.classList.remove('calis'); y.textContent = window.MOLA.bitis; s.textContent = '✓'; }
    }, 200);
  }

  /* ================= RAPOR ================= */
  function rapor() {
    var L = [], SN = window.SINAV, f = M.faz(BUGUN);
    L.push('# AGS HAZIRLIK RAPORU — ' + window.ISIM);
    L.push('Rapor tarihi: ' + uzunTarih(BUGUN) + ' · Sınav: ' + kisaTarih(SN.tarih) + ' 2027 (' + T.fark(BUGUN, SN.tarih) + ' gün kaldı) · Dönem: ' + (f ? f.ad : '-'));
    L.push('');
    L.push('Bu bir öğretmen adayının MEB-AGS hazırlık verisidir. Sınav 80 soru: Sözel 15, Sayısal 15, Tarih 6, Türkiye Coğrafyası 6, Eğitim Bilimleri ve TMES 30, Mevzuat 8. 4 yanlış 1 doğruyu götürür. Aday çalışırken vardiyalı işte çalışıyor; matematik ve eğitim bilimlerinde ön bilgisi az. Lütfen aşağıdaki verilere göre: (1) konu bazında eksik analizi, (2) en çok puan kazandıracak 5 öncelik, (3) önümüzdeki 2 hafta için somut öneriler, (4) gerçekçi ve motive edici kısa bir değerlendirme yaz.');
    L.push('');
    var h = M.haftaDk(S, BUGUN), z = M.zincir(S, BUGUN);
    L.push('## Genel');
    L.push('- Toplam video ilerlemesi: %' + yuzde(M.ilerleme(S)) + ' (' + Object.keys(S.izlendi).filter(function (k) { return M.U[k]; }).length + '/' + M.TUM.length + ' ders)');
    L.push('- Bu hafta: ' + h.bu + ' dk · geçen hafta: ' + h.onceki + ' dk · aralıksız gün: ' + z);
    L.push('- Toplam çözülen soru (girilen): ' + M.toplamSoru(S));
    var ruh = { iyi: 0, orta: 0, yorgun: 0 }; Object.keys(S.ruh).forEach(function (k) { if (T.fark(k, BUGUN) <= 14) ruh[S.ruh[k]]++; });
    L.push('- Son 14 gün ruh hâli: iyi ' + ruh.iyi + ', orta ' + ruh.orta + ', yorgun ' + ruh.yorgun);
    var son4 = []; for (var w = 3; w >= 0; w--) { var hh = M.haftaDk(S, T.ekle(BUGUN, -7 * w)); son4.push(hh.bu); }
    L.push('- Son 4 haftanın dakikaları: ' + son4.join(' → '));
    L.push('');
    L.push('## Dersler');
    window.DERSLER.forEach(function (d) {
      var p = M.dersIlerleme(S, d.id), b = dersBasari(d.id), b30 = dersBasari(d.id, 30);
      L.push('- ' + d.ad + ' (' + d.soru + ' soru): video %' + yuzde(p.oran) + ' · konu testi başarı ' + (b.o === null ? '-' : '%' + yuzde(b.o) + ' (' + b.t + ' soru)') + ' · son 30 gün ' + (b30.o === null ? '-' : '%' + yuzde(b30.o)));
    });
    L.push('');
    L.push('## Konu bazında (konu | video | çözülen | D/Y/B | başarı | test geçmişi)');
    window.DERSLER.forEach(function (d) {
      L.push('### ' + d.ad);
      Object.keys(M.K).filter(function (k) { return M.K[k].ders === d.id && M.K[k].tur !== 'giris'; }).forEach(function (kid) {
        var ki = M.konuIlerleme(S, kid), ist = M.konuIstat(S, kid);
        if (!ki.n && !ist.top) return;
        var gecmis = ist.liste.map(function (n) { var t = n.d + n.y + n.b; return kisaTarih(n.tarih) + ':%' + (t ? yuzde(n.d / t) : 0) + '(' + t + ')'; }).join(', ');
        L.push('- ' + M.K[kid].ad + ' | ' + ki.n + '/' + ki.top + ' | ' + ist.top + ' | ' + ist.d + '/' + ist.y + '/' + ist.b + ' | ' + (ist.basari === null ? '-' : '%' + yuzde(ist.basari)) + ' | ' + (gecmis || '-'));
      });
    });
    var bas = Object.keys(M.K).filter(function (k) { return !M.konuIlerleme(S, k).n; }).length;
    L.push('(Henüz başlanmamış konu sayısı: ' + bas + ')');
    L.push('');
    var den = S.netler.filter(function (n) { return n.tur === 'deneme'; }).sort(function (a, b) { return a.tarih < b.tarih ? -1 : 1; });
    L.push('## Denemeler');
    if (!den.length) L.push('- Henüz deneme girilmedi.');
    den.forEach(function (n) {
      L.push('- ' + kisaTarih(n.tarih) + (n.kaynak ? ' (' + n.kaynak + ')' : '') + ': toplam ' + denemeNet(n).toFixed(2) + ' net · ' + window.DERSLER.map(function (d) { var x = n.dersler[d.id]; return d.kisa + ' ' + x.d + 'D/' + x.y + 'Y'; }).join(', '));
    });
    var kay = {}; S.netler.forEach(function (n) { if (n.kaynak) kay[n.kaynak] = 1; });
    if (Object.keys(kay).length) { L.push(''); L.push('Kullanılan kaynaklar: ' + Object.keys(kay).join(', ')); }
    var pl = plan(); L.push(''); L.push('## Plan tahminleri (bu tempoyla bitiş)');
    window.DERSLER.forEach(function (d) { var x = dersBitis(pl, d.id); L.push('- ' + d.ad + ': ' + (x.bitti ? 'bitti' : x.tarih ? kisaTarih(x.tarih) : '-')); });
    L.push(''); L.push('— Ari\'nin AGS Rehberi · Mert Hoca');
    return L.join('\n');
  }
  function paylasMetin(metin, baslik) {
    if (navigator.share) { navigator.share({ title: baslik, text: metin }).catch(function () {}); return; }
    kopyala(metin);
    window.open('https://wa.me/?text=' + encodeURIComponent(metin.slice(0, 3500)), '_blank');
  }
  function kopyala(metin) {
    var tamam = function () { toast('Panoya kopyalandı'); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(metin).then(tamam, function () { eskiKopya(metin); tamam(); });
    else { eskiKopya(metin); tamam(); }
  }
  function eskiKopya(t) { var a = document.createElement('textarea'); a.value = t; document.body.appendChild(a); a.select(); try { document.execCommand('copy'); } catch (e) {} a.remove(); }

  /* ================= YEDEK ================= */
  function yedekMetni() { return JSON.stringify({ uygulama: 'ari-ags', surum: 1, tarih: BUGUN, durum: S }); }
  function yedekPaylas() {
    var ad = 'Ari-AGS-yedek-' + BUGUN + '.json', metin = yedekMetni();
    S.sonYedek = BUGUN; kaydet();
    try {
      var dosya = new File([metin], ad, { type: 'application/json' });
      if (navigator.canShare && navigator.canShare({ files: [dosya] })) { navigator.share({ files: [dosya], title: 'Ari AGS yedek' }).catch(function () {}); return; }
    } catch (e) {}
    var a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([metin], { type: 'application/json' })); a.download = ad; document.body.appendChild(a); a.click(); a.remove();
    toast('Yedek dosyası indirildi');
  }
  function yedekYukle(metin) {
    try {
      var j = JSON.parse(metin);
      if (j.uygulama !== 'ari-ags' || !j.durum) throw 0;
      sor('Yedek yüklensin mi?', kisaTarih(j.tarih) + ' tarihli yedek, bu cihazdaki kayıtların yerini alacak.', { tamam: 'Yükle' }, function () {
        S = Object.assign(yeniDurum(), j.durum); degisti(); sheetKapat(); renderAktif(); toast('Yedek yüklendi ✓');
      });
    } catch (e) { toast('Bu dosya geçerli bir yedek değil'); }
  }
  function takvimLink() {
    if (/^https?:/.test(location.protocol) && window.self === window.top) return 'takvim.ics';
    return 'data:text/calendar;charset=utf-8,' + encodeURIComponent(icsMetni());
  }
  function icsMetni() {
    var SN = window.SINAV, f = function (s) { return s.replace(/-/g, ''); };
    var ev = function (id, bas, bit, ad) { return ['BEGIN:VEVENT', 'UID:' + id + '@ari-ags', 'DTSTAMP:20261031T000000Z', 'DTSTART;VALUE=DATE:' + f(bas), 'DTEND;VALUE=DATE:' + f(T.ekle(bit, 1)), 'SUMMARY:' + ad,
      'BEGIN:VALARM', 'TRIGGER:-P1D', 'ACTION:DISPLAY', 'DESCRIPTION:' + ad, 'END:VALARM', 'END:VEVENT'].join('\r\n'); };
    return ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Ari AGS Rehberi//TR', ev('basvuru', SN.basvuruBas, SN.basvuruBit, 'AGS başvuruları (ÖSYM AİS)'), ev('gec', SN.gecBasvuru, SN.gecBasvuru, 'AGS geç başvuru günü'),
      ev('sinav', SN.tarih, SN.tarih, 'MEB-AGS sınavı'), ev('sonuc', SN.sonuc, SN.sonuc, 'AGS sonuçları'), 'END:VCALENDAR'].join('\r\n');
  }

  /* ================= AYARLAR ================= */
  function ayarlarAc() {
    var g = S.ayar.gece || 'oto';
    var h = '<h2>Ayarlar</h2><div class="kart" style="padding:4px 14px">' +
      '<button class="ayar-satir" data-a="yedekPaylas">💾<span>Yedeği paylaş<small>WhatsApp, AirDrop ya da Dosyalar\'a kaydet. Diğer cihaza aktarmak için de bu.</small></span></button>' +
      '<label class="ayar-satir" style="cursor:pointer">📥<span style="flex:1">Yedekten yükle<small>Daha önce paylaştığın yedek dosyasını seç</small></span><input type="file" accept=".json,application/json" data-a="yedekDosya" style="display:none"></label>' +
      '<a class="ayar-satir" href="' + takvimLink() + '" download="AGS-takvim.ics" style="text-decoration:none">📅<span>Takvimime ekle<small>Başvuru, sınav ve sonuç tarihleri hatırlatmalı</small></span></a>' +
      '<button class="ayar-satir" data-a="raporGonder">📤<span>Raporu Mert Hoca\'ya gönder</span></button></div>' +
      '<div class="alan-et">Gece modu</div><div class="segment"><button class="' + (g === 'oto' ? 'secili' : '') + '" data-a="gece" data-v="oto">Otomatik</button><button class="' + (g === 'acik' ? 'secili' : '') + '" data-a="gece" data-v="acik">Açık</button><button class="' + (g === 'kapali' ? 'secili' : '') + '" data-a="gece" data-v="kapali">Kapalı</button></div>' +
      '<p class="alt-yazi" style="font-size:13px">Otomatik: akşam 21.00\'den sonra ekran koyulaşır.</p>' +
      '<div class="kart duz" style="font-size:14px"><b>Ana ekrana ekleme (iPhone)</b><br>Safari\'de bu sayfayı aç → alttaki <b>Paylaş</b> (kare ve ok) → <b>Ana Ekrana Ekle</b>. Sonra hep o simgeden aç; kayıtlar orada tutulur.</div>' +
      '<p class="alt-yazi" style="font-size:12.5px;text-align:center;margin-top:18px">Ari\'nin AGS Rehberi · sürüm ' + SURUM + '<br>Mert Hoca tarafından, sevgiyle hazırlandı.</p>' +
      '<button class="btn tam" style="color:var(--uyari);margin-top:6px" data-a="sifirla">Her şeyi sıfırla</button>';
    sheetAc(h);
  }

  /* ================= YAZDIR ================= */
  function yazdir() {
    var pzt = T.ekle(haftaBasi(BUGUN), haftaKaydir * 7), h = '<div class="fil">Mert Hoca</div><h1>Ari\'nin haftalık planı</h1><div class="alt-yazi">' + kisaTarih(pzt) + ' – ' + kisaTarih(T.ekle(pzt, 6)) + ' · AGS\'ye ' + T.fark(pzt, window.SINAV.tarih) + ' gün</div><table>';
    for (var i = 0; i < 7; i++) {
      var s = T.ekle(pzt, i), og = gunOgeleri(s);
      h += '<tr><th>' + GUNLER[T.gunNo(s)] + '<br><small>' + kisaTarih(s) + '</small></th><td>' + (og.length ? grupla(og).map(function (x) { return '<div><span class="kutucuk"></span>' + esc(ogeKisa(x.o)) + (x.n > 1 ? ' (' + x.n + ' video)' : '') + '</div>'; }).join('') : (T.gunNo(s) === window.TATIL_GUNU ? 'Dinlenme' : '—')) + '</td></tr>';
    }
    $('#yazdir').innerHTML = h + '</table>';
    window.print();
  }

  /* ================= YÖNTEM (gizli) ================= */
  var filigranDokunma = [];
  $('#filigran').addEventListener('click', function () {
    var t = Date.now(); filigranDokunma = filigranDokunma.filter(function (x) { return t - x < 3000; }); filigranDokunma.push(t);
    if (filigranDokunma.length >= 5) { filigranDokunma = []; sheetAc('<div class="yontem">' + window.YONTEM_HTML + '</div>'); }
  });
  $('#filigran').style.pointerEvents = 'auto';

  /* ================= GİRİŞ (ilk açılış) ================= */
  function hosgeldin() {
    ortaAc('<div class="rozet-hex" style="width:90px;height:100px">' + hexSvg(0.62) + '</div><h2>Hoş geldin ' + esc(window.ISIM) + '</h2>' +
      '<p style="text-align:left">Bu rehber her gün sana ne yapacağını söyler; gerisini o düşünür.<br><br>• Her gün <b>kaç saatin olduğunu</b> seç, paketin ona göre hazırlansın.<br>• Videoyu izleyince <b>tikle</b>, soruları çözünce <b>sonucu gir</b>.<br>• Kaçırdığın gün olursa dert etme; plan kendini yeniden düzenler.</p>' +
      '<button class="btn bal tam" data-a="ortaKapat">Başlayalım</button>');
    modalAcik = true;
  }

  /* ================= SEKME ================= */
  var aktif = 'bugun';
  function renderAktif() {
    ustYaz();
    if (aktif === 'bugun') renderBugun(); else if (aktif === 'plan') renderPlan(); else if (aktif === 'konular') renderKonular(); else renderNetler();
  }
  function sekme(ad) {
    aktif = ad;
    $$('nav.alt button').forEach(function (b) { b.classList.toggle('aktif', b.getAttribute('data-sekme') === ad); });
    $$('.sayfa').forEach(function (s) { s.classList.toggle('aktif', s.id === 's-' + ad); });
    renderAktif(); window.scrollTo(0, 0);
  }
  $$('nav.alt button').forEach(function (b) { b.addEventListener('click', function () { sekme(b.getAttribute('data-sekme')); }); });

  /* ================= OLAYLAR ================= */
  function ogeBul(id) { return tumOgeler(S.paketler[BUGUN]).filter(function (o) { return o.id === id; })[0]; }
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-a]'); if (!el) return;
    var a = el.getAttribute('data-a'), v = el.getAttribute('data-v'), id = el.getAttribute('data-id');
    if (el.tagName === 'SELECT' || (el.tagName === 'INPUT' && el.type === 'file')) return;
    switch (a) {
      case 'tikla': {
        var o = ogeBul(id); if (!o) return;
        var yeni = !ogeBitti(o);
        ogeTamamla(o, yeni);
        el.classList.toggle('on', yeni); if (yeni) el.classList.add('pop');
        var satir = el.closest('.oge'); if (satir) satir.classList.toggle('bitti', yeni);
        setTimeout(renderBugun, yeni ? 650 : 50);
        break;
      }
      case 'videoTik': {
        var u = M.U[id]; var oo = { id: id, tip: 'video', dk: u.dk, konu: u.konu, ders: u.ders };
        var y2 = !S.izlendi[id]; ogeTamamla(oo, y2); el.classList.toggle('on', y2); if (y2) el.classList.add('pop');
        setTimeout(renderKonular, 500); break;
      }
      case 'soruGir': { var uu = M.U[id]; konuTestAc(uu.konu, uu.soru, id); break; }
      case 'konuTest': konuTestAc(el.getAttribute('data-konu'), el.getAttribute('data-soru')); break;
      case 'denemeGir': denemeGirAc(id || null); break;
      case 'denemeBasla': denemeBasla(id); break;
      case 'biraktim': { var k = $('#kafa'); if (k) { k.classList.add('ucur'); setTimeout(function () { k.value = ''; k.classList.remove('ucur'); k.placeholder = 'Bıraktın. Şimdi sadece sorular var. Başarılar 🤲'; }, 1400); } break; }
      case 'ruh': S.ruh[BUGUN] = v; degisti(); toast(window.MOOD[v]); renderBugun(); if (v === 'yorgun') setTimeout(function () { toast('İstersen önce 60 saniye nefes al.', 'Mola', molaAc); }, 3400); break;
      case 'sure': S.gunSure[BUGUN] = +v; degisti(); renderBugun(); break;
      case 'bonus': {
        var p = S.paketler[BUGUN], sim = M.simDurum(S);
        var ek = M.gunPaketi(BUGUN, sim, 45, { durum: S, tatilYok: true }).ogeler.filter(function (o) { return o.tip === 'video' || o.tip === 'calisma'; });
        var var_ = {}; tumOgeler(p).forEach(function (o) { var_[o.id] = 1; });
        ek = ek.filter(function (o) { return !var_[o.id]; });
        if (!ek.length) { toast('Planlanacak yeni iş kalmadı, harikasın!'); break; }
        p.bonus = (p.bonus || []).concat(ek); degisti(); renderBugun(); toast('Pakete ' + ek.length + ' iş eklendi'); break;
      }
      case 'pazarCalis': S.pazarCalis[BUGUN] = true; degisti(); renderBugun(); break;
      case 'mola': molaAc(); break;
      case 'molaBasla': molaBasla(el); break;
      case 'sheetKapat': sheetKapat(); break;
      case 'ortaKapat': ortaKapat(); break;
      case 'bannerKapat': S.kapatilan[el.getAttribute('data-k')] = el.getAttribute('data-gun') ? BUGUN : true; kaydet(); renderBugun(); break;
      case 'basvurdum': S.basvurdu = true; kaydet(); konfeti(80); toast('Başvuru tamam! Bir adım daha 💪'); renderBugun(); break;
      case 'raporGonder': paylasMetin(rapor(), 'Ari AGS raporu'); S.kapatilan.yedek = BUGUN; kaydet(); break;
      case 'raporKopyala': kopyala(rapor()); break;
      case 'yedekPaylas': yedekPaylas(); break;
      case 'ayarlar': ayarlarAc(); break;
      case 'gece': S.ayar.gece = v; kaydet(); geceUygula(); ayarlarAc(); break;
      case 'sifirla': sor('Her şey silinsin mi?', 'Bütün ilerleme, netler ve notlar silinir. Emin isen kutuya SIFIRLA yaz.', { girdi: 'SIFIRLA', tamam: 'Sil', tehlike: true }, function (v) { if ((v || '').trim().toUpperCase() === 'SIFIRLA') { S = yeniDurum(); degisti(); sheetKapat(); renderAktif(); toast('Sıfırlandı'); } else toast('Silinmedi'); }); break;
      case 'sorTamam': { var cb = sorCb, g = $('#sorGirdi'), val = g ? g.value : ''; sorCb = null; ortaKapat(); if (cb) cb(val); break; }
      case 'sorIptal': sorCb = null; ortaKapat(); break;
      case 'planGor': planGorunum = v; renderPlan(); break;
      case 'hafta': haftaKaydir += +v; renderPlan(); break;
      case 'ay': ayKaydir += +v; aySecim = null; renderPlan(); break;
      case 'aySec': aySecim = aySecim === v ? null : v; renderPlan(); break;
      case 'yazdir': yazdir(); break;
      case 'dersAc': dersAcik = v; konuAcik = {}; renderKonular(); window.scrollTo(0, 0); break;
      case 'dersKapat': dersAcik = null; renderKonular(); window.scrollTo(0, 0); break;
      case 'konuAc': konuAcik[v] = !konuAcik[v]; el.parentNode.classList.toggle('acik', !!konuAcik[v]); break;
      case 'netSil': sor('Bu kayıt silinsin mi?', '', { tamam: 'Sil', tehlike: true }, function () { S.netler = S.netler.filter(function (n) { return n.id !== id; }); degisti(); renderNetler(); }); break;
      case 'st': {
        var st = el.closest('.stepper'), inp = st.querySelector('input'), mx = +inp.max || 200;
        inp.value = Math.max(0, Math.min(mx, (parseInt(inp.value, 10) || 0) + (+el.getAttribute('data-y'))));
        if (navigator.vibrate) navigator.vibrate(5);
        nfOzet(); dOzet(); break;
      }
      case 'nfDers': netForm.ders = v; netForm.konu = null; nfSakla(); konuTestCiz(); break;
      case 'nfKaynak': netForm.kaynak = v; nfSakla(); konuTestCiz(); break;
      case 'nfKaynakYeni': nfSakla(); sor('Yeni kaynak', 'Kitabın ya da yayının kısa adı', { girdi: 'Örn. Pegem, Yediiklim…', tamam: 'Ekle' }, function (ad) { if (ad && ad.trim()) { netForm.kaynak = ad.trim().slice(0, 30); if (S.kaynaklar.indexOf(netForm.kaynak) < 0) S.kaynaklar.unshift(netForm.kaynak); kaydet(); } konuTestCiz(); }); break;
      case 'nfKaydet': nfKaydet(); break;
      case 'denemeKaydet': denemeKaydet(); break;
    }
  });
  function nfSakla() { var v = nfDegerler(); netForm.toplam = v.toplam; netForm.d = v.d; netForm.y = v.y; }
  document.addEventListener('input', function (e) { if (e.target.closest('.sheet .stepper')) { nfOzet(); dOzet(); } });
  document.addEventListener('change', function (e) {
    var t = e.target;
    if (t.getAttribute('data-a') === 'nfKonu') netForm.konu = t.value;
    if (t.getAttribute('data-a') === 'yedekDosya' && t.files && t.files[0]) { var r = new FileReader(); r.onload = function () { yedekYukle(r.result); }; r.readAsText(t.files[0]); }
  });

  /* gün değişimi / uygulamaya geri dönüş */
  function tazele() {
    var b = bugun(); geceUygula();
    if (b !== BUGUN) { BUGUN = b; planCache = null; renderAktif(); setTimeout(kutlamaKontrol, 400); }
    else if (aktif === 'bugun') renderBugun();
  }
  document.addEventListener('visibilitychange', function () { if (!document.hidden) tazele(); });
  setInterval(function () { geceUygula(); if (bugun() !== BUGUN) tazele(); }, 60000);

  /* ================= BAŞLAT ================= */
  geceUygula();
  kaydet();
  sekme('bugun');
  if (ilkAcilis) hosgeldin();
  setTimeout(kutlamaKontrol, 800);
  if ('serviceWorker' in navigator && /^https?:/.test(location.protocol) && window.self === window.top) {
    navigator.serviceWorker.register('sw.js').catch(function () {});
  }
})();
