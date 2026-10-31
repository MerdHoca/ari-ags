/* Ari'nin AGS Rehberi — PLANLAMA MOTORU
   Ekran kodu içermez. Konu verisi (veri.js) + plan ayarları (plan.js) + Ari'nin durumu
   alınır, günlük paket ve ileriye dönük plan hesaplanır. */
(function (G) {
  'use strict';
  var GUN_MS = 86400000;

  /* ---------------- tarih yardımcıları ---------------- */
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function str(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function tarih(s) { var p = s.split('-'); return new Date(+p[0], +p[1] - 1, +p[2], 12); }
  function ekle(s, n) { var d = tarih(s); d.setDate(d.getDate() + n); return str(d); }
  function fark(a, b) { return Math.round((tarih(b) - tarih(a)) / GUN_MS); }
  function gunNo(s) { return tarih(s).getDay(); }
  function bugun() { return str(new Date()); }

  /* ---------------- indeksler ---------------- */
  var U = {}, K = {}, B = {}, DERS = {}, TUM = [], TOPLAM_SN = 0;

  function kur() {
    (G.DERSLER || []).forEach(function (d) { DERS[d.id] = d; });
    (G.BOLUMLER || []).forEach(function (b) {
      var bol = { id: b.id, ad: b.ad, ders: b.ders, hoca: b.hoca, hiz: b.hiz, soruOrani: b.soruOrani, konular: [], birimler: [], sn: 0 };
      B[b.id] = bol;
      b.konular.forEach(function (k) {
        var kon = { id: k.id, ad: k.ad, zor: k.zor, tur: k.tur, bolum: b.id, ders: b.ders, birimler: [], sn: 0 };
        K[k.id] = kon; bol.konular.push(k.id);
        k.v.forEach(function (v) {
          var izle = v.sn / 60 / (b.hiz || 1);
          var soruDk = izle * (b.soruOrani || 0);
          var soru = Math.round(soruDk / (b.ders === 'mat' ? 1.5 : 1));
          soru = Math.max(k.tur === 'tekrar' ? 5 : 6, Math.min(25, soru));
          var u = {
            id: v.id, ad: v.ad, yt: v.yt, bas: v.bas || 0, sn: v.sn,
            konu: k.id, bolum: b.id, ders: b.ders, zor: k.zor, tur: k.tur, hiz: b.hiz || 1,
            izleDk: Math.max(1, Math.round(izle)), soru: soru,
            dk: Math.max(5, Math.round(izle + soruDk))
          };
          U[u.id] = u; kon.birimler.push(u.id); bol.birimler.push(u.id); TUM.push(u.id);
          kon.sn += v.sn; bol.sn += v.sn; TOPLAM_SN += v.sn;
        });
      });
    });
  }

  function ytLink(u) {
    return 'https://www.youtube.com/watch?v=' + u.yt + (u.bas > 5 ? '&t=' + u.bas + 's' : '');
  }

  /* ---------------- dönem ---------------- */
  function faz(s) {
    var F = G.FAZLAR;
    for (var i = 0; i < F.length; i++) if (s >= F[i].bas && s <= F[i].bit) return F[i];
    if (s < F[0].bas) return F[0];
    return null; // sınav sonrası / sınav günü
  }

  function denemeTuru(s, f) {
    var D = G.DENEMELER; if (!f) return null;
    if (f.id === 1) return D.mini.indexOf(s) >= 0 ? 'mini' : null;
    if (f.id === 2) return gunNo(s) === D.haftalikFaz2 ? 'tam' : null;
    if (f.id === 3) return D.faz3Gunler.indexOf(gunNo(s)) >= 0 ? 'tam' : null;
    return null;
  }

  /* ---------------- durumdan simülasyon durumu ---------------- */
  function konuBitti(kid, izlendi) {
    var k = K[kid]; for (var i = 0; i < k.birimler.length; i++) if (!izlendi[k.birimler[i]]) return false; return true;
  }
  function konuBitisTarihi(kid, izlendi) {
    var k = K[kid], m = '';
    for (var i = 0; i < k.birimler.length; i++) { var t = izlendi[k.birimler[i]]; if (!t) return null; if (t > m) m = t; }
    return m;
  }

  // İstatistik: konu başına D/Y/B
  function konuIstat(durum, kid) {
    var d = 0, y = 0, b = 0, liste = [];
    (durum.netler || []).forEach(function (n) {
      if (n.tur === 'konu' && n.konu === kid) { d += n.d; y += n.y; b += n.b; liste.push(n); }
    });
    var top = d + y + b;
    return { d: d, y: y, b: b, top: top, basari: top ? d / top : null, net: d - y / G.SINAV.yanlisOrani, liste: liste };
  }

  function simDurum(durum) {
    var iz = {}; Object.keys(durum.izlendi || {}).forEach(function (k) { iz[k] = durum.izlendi[k]; });
    var tekrarYapildi = {}; Object.keys(durum.tekrar || {}).forEach(function (k) { tekrarYapildi[k] = durum.tekrar[k]; });
    // ekstra (zayıf konu) tekrarları
    var ekstra = [];
    var sonDusuk = {};
    (durum.netler || []).forEach(function (n) {
      if (n.tur !== 'konu' || !K[n.konu]) return;
      var top = n.d + n.y + n.b;
      if (top >= 8 && n.d / top < G.ZAYIF_ESIK) sonDusuk[n.konu] = n.tarih;
    });
    Object.keys(sonDusuk).forEach(function (kid) {
      ekstra.push({ id: 't:' + kid + ':z' + sonDusuk[kid], konu: kid, vade: ekle(sonDusuk[kid], 3), aralik: 'z' });
    });
    return { izlendi: iz, tekrar: tekrarYapildi, ekstra: ekstra, ekYapildi: Object.assign({}, durum.ekstra || {}) };
  }

  function konuBitisleri(sim) {
    if (sim.kb) return sim.kb;
    sim.kb = {};
    Object.keys(K).forEach(function (kid) {
      if (K[kid].tur === 'tekrar' || K[kid].tur === 'giris') return; // genel tekrar / tanıtım videolarının tekrarı olmaz
      var bit = konuBitisTarihi(kid, sim.izlendi); if (bit) sim.kb[kid] = bit;
    });
    return sim.kb;
  }
  function vadesiGelenTekrarlar(sim, s) {
    var out = [], kb = konuBitisleri(sim);
    Object.keys(kb).forEach(function (kid) {
      var bit = kb[kid];
      G.TEKRAR_ARALIK.forEach(function (a) {
        var id = 't:' + kid + ':' + a;
        if (sim.tekrar[id]) return;
        var vade = ekle(bit, a);
        if (vade <= s) out.push({ id: id, konu: kid, vade: vade, aralik: a });
      });
    });
    sim.ekstra.forEach(function (e) { if (e.vade <= s && !sim.tekrar[e.id]) out.push(e); });
    out.sort(function (a, b) { return a.vade < b.vade ? -1 : a.vade > b.vade ? 1 : 0; });
    return out;
  }

  /* ---------------- GÜNLÜK PAKET ---------------- */
  // dk: o gün ayrılabilecek dakika. sec.tatilYok: pazar da olsa paket üret.
  function gunPaketi(s, sim, dk, sec) {
    sec = sec || {};
    var f = faz(s);
    var paket = { tarih: s, dk: dk, ogeler: [], faz: f ? f.id : null };
    if (!f) { paket.bitti = true; return paket; }
    if (gunNo(s) === G.TATIL_GUNU && !sec.tatilYok) { paket.tatil = true; return paket; }

    var kalan = dk;
    var hafif = dk <= f.hafif + 5;

    // 1) deneme
    var dt = denemeTuru(s, f);
    if (dt && !hafif) {
      var ddk = dt === 'mini' ? G.DENEMELER.miniDk : G.DENEMELER.tamDk;
      paket.ogeler.push({ id: 'd:' + s, tip: 'deneme', tur: dt, dk: ddk });
      kalan -= ddk;
    }

    // 2) tekrarlar
    var vadeli = vadesiGelenTekrarlar(sim, s);
    var tekrarButce = hafif ? dk : Math.max(G.TEKRAR_DK, Math.round(dk * f.tekrarPay));
    var tk = 0;
    for (var i = 0; i < vadeli.length; i++) {
      var tdk = K[vadeli[i].konu].ders === 'mat' ? G.TEKRAR_DK + 5 : G.TEKRAR_DK;
      if (tk + tdk > tekrarButce + 5 || kalan - tdk < 0 && tk > 0) break;
      var t = vadeli[i];
      paket.ogeler.push({ id: t.id, tip: 'tekrar', konu: t.konu, aralik: t.aralik, dk: tdk, ders: K[t.konu].ders });
      tk += tdk; kalan -= tdk;
      if (hafif && tk >= dk - 5) break;
    }
    if (hafif) {
      if (!tk) { // tekrar yoksa en kısa sıradaki dersi ver (zor olmayan tercih)
        var aday = null;
        f.slotlar.forEach(function (sl) {
          var u = siradaki(sl.kuyruk, sim, {}, function () { return true; });
          if (u && (!aday || (u.zor < aday.zor) || (u.zor === aday.zor && u.dk < aday.dk))) aday = u;
        });
        if (aday) { paket.ogeler.push(videoOge(aday, 'Hafif gün')); }
      }
      return paket;
    }

    if (kalan < 15) return paket;

    // 3) hatlar
    var claimed = {};
    var gunIndeks = fark(f.bas, s);
    var slots = f.slotlar.map(function (sl, i) { return { sl: sl, i: i, butce: kalan * sl.pay, kullan: 0, zorKonu: null }; });
    var sira = slots.slice();
    if (gunIndeks % 2 === 1) sira.reverse();
    var zorKonu = null; // gün içinde izin verilen tek zor konu
    var soruGunuVar = false;

    function uygun(u) { return !(u.zor >= 3 && zorKonu && u.konu !== zorKonu); }

    function doldur(slot, limit) {
      var kuyruk = slot.sl.kuyruk;
      var ilk = slot.kullan === 0;
      while (slot.kullan < limit) {
        var u = siradaki(kuyruk, sim, claimed, uygun);
        if (!u) {
          // kuyruğun başı zor ve gün zaten zor konu aldıysa
          var bas = siradaki(kuyruk, sim, claimed, function () { return true; });
          if (bas && ilk && !soruGunuVar && kuyruk.indexOf('mat0') >= 0 && izlenmisMat(sim)) {
            var sdk = Math.max(25, Math.round(limit));
            paket.ogeler.push({ id: 's:' + s, tip: 'sorugunu', ders: 'mat', dk: sdk, soru: Math.round(sdk / 1.6), konular: sonMatKonular(sim) });
            slot.kullan += sdk; soruGunuVar = true;
          }
          return;
        }
        if (!ilk && slot.kullan + u.dk > limit * 1.1) return;
        if (ilk && u.dk > limit * 2.2 && limit < 30) return;
        paket.ogeler.push(videoOge(u, slot.sl.ad));
        claimed[u.id] = 1; slot.kullan += u.dk; ilk = false;
        if (u.zor >= 3 && !zorKonu) zorKonu = u.konu;
      }
    }
    sira.forEach(function (sl) { doldur(sl, sl.butce); });
    // artan zamanı hâlâ işi olan hatlara dağıt
    var artan = slots.reduce(function (a, sl) { return a + Math.max(0, sl.butce - sl.kullan); }, 0);
    if (artan > 20) {
      sira.forEach(function (sl) {
        if (artan <= 20) return;
        var once = sl.kullan; doldur(sl, sl.kullan + artan); artan -= (sl.kullan - once);
      });
    }
    // 4) konular bittiyse / zaman arttıysa: zayıf konulardan soru çalışması
    if (artan >= 30 && sec.durum) {
      var adaylar = calismaAdaylari(sec.durum, sim, s, sec.istat);
      var n = Math.min(3, Math.max(1, Math.floor(artan / 40)), adaylar.length);
      for (var c = 0; c < n; c++) {
        var cdk = Math.min(60, Math.round(artan / n));
        paket.ogeler.push({ id: 'c:' + s + ':' + adaylar[c].konu, tip: 'calisma', konu: adaylar[c].konu, ders: K[adaylar[c].konu].ders, dk: cdk, soru: Math.round(cdk / (K[adaylar[c].konu].ders === 'mat' ? 1.6 : 1.1)) });
      }
    }
    return paket;
  }

  // Biten konular arasından en zayıf / en az test edilenler; aynı dersten üst üste değil
  function calismaAdaylari(durum, sim, s, istat) {
    var liste = [];
    Object.keys(K).forEach(function (kid) {
      var k = K[kid];
      if (k.tur === 'tekrar' || k.tur === 'giris') return;
      if (!konuBittiSim(kid, sim)) return;
      var ist = istat ? (istat[kid] || { basari: null }) : konuIstat(durum, kid);
      var puan = ist.basari === null ? 0.45 : ist.basari;
      puan -= (DERS[k.ders] ? DERS[k.ders].soru : 6) / 300;   // çok sorulu derse hafif öncelik
      puan += (fark(s, '2099-01-01') % 7 === hash(kid) % 7) ? -0.05 : 0; // hafif çeşitlilik
      liste.push({ konu: kid, puan: puan });
    });
    liste.sort(function (a, b) { return a.puan - b.puan; });
    var out = [], dersler = {};
    liste.forEach(function (x) { var d = K[x.konu].ders; if (!dersler[d] && out.length < 3) { dersler[d] = 1; out.push(x); } });
    return out;
  }
  function konuBittiSim(kid, sim) { return K[kid].birimler.every(function (id) { return sim.izlendi[id]; }); }
  function hash(t) { var h = 0; for (var i = 0; i < t.length; i++) h = (h * 31 + t.charCodeAt(i)) | 0; return Math.abs(h); }

  function videoOge(u, hat) {
    return { id: u.id, tip: 'video', dk: u.dk, ders: u.ders, konu: u.konu, bolum: u.bolum, hat: hat };
  }

  function siradaki(kuyruk, sim, claimed, filtre) {
    for (var i = 0; i < kuyruk.length; i++) {
      var b = B[kuyruk[i]]; if (!b) continue;
      for (var j = 0; j < b.birimler.length; j++) {
        var id = b.birimler[j];
        if (sim.izlendi[id] || claimed[id]) continue;
        if (filtre(U[id])) return U[id];
        break; // bu bölümün sıradaki dersi uygun değil → sonraki bölüme bak
      }
    }
    return null;
  }
  function izlenmisMat(sim) {
    for (var id in sim.izlendi) if (U[id] && U[id].ders === 'mat') return true; return false;
  }
  function sonMatKonular(sim) {
    var son = {};
    Object.keys(sim.izlendi).forEach(function (id) { var u = U[id]; if (u && u.ders === 'mat') son[u.konu] = sim.izlendi[id]; });
    return Object.keys(son).sort(function (a, b) { return son[b] > son[a] ? 1 : -1; }).slice(0, 3);
  }

  function paketiUygula(sim, paket) {
    konuBitisleri(sim);
    paket.ogeler.forEach(function (o) {
      if (o.tip === 'video') {
        sim.izlendi[o.id] = paket.tarih;
        var k = K[o.konu];
        if (k.tur !== 'tekrar' && k.tur !== 'giris' && !sim.kb[o.konu] && konuBittiSim(o.konu, sim)) sim.kb[o.konu] = paket.tarih;
      }
      else if (o.tip === 'tekrar') sim.tekrar[o.id] = paket.tarih;
      else sim.ekYapildi[o.id] = paket.tarih;
    });
  }

  /* ---------------- İLERİ PLAN (simülasyon) ----------------
     bugunPaketi: bugün için dondurulmuş paket (varsa). Bugünün kalan işleri bugüne sayılır. */
  function simule(durum, bas, bugunPaketi) {
    var sim = simDurum(durum);
    var istat = {}; Object.keys(K).forEach(function (kid) { istat[kid] = konuIstat(durum, kid); });
    var gunler = {}, bolumBitis = {}, s = bas;
    var son = ekle(G.SINAV.tarih, -1);
    var guvenlik = 0;
    while (s <= son && guvenlik++ < 400) {
      var p;
      if (s === bas && bugunPaketi) p = bugunPaketi;
      else {
        var f = faz(s); if (!f) break;
        p = gunPaketi(s, sim, f.varsayilan, { durum: durum, istat: istat });
      }
      gunler[s] = p;
      paketiUygula(sim, p);
      s = ekle(s, 1);
      if (s.slice(8) === '01' || guvenlik % 7 === 0) {
        Object.keys(B).forEach(function (bid) {
          if (bolumBitis[bid]) return;
          var tamam = B[bid].birimler.every(function (id) { return sim.izlendi[id]; });
          if (tamam) bolumBitis[bid] = ekle(s, -1);
        });
      }
    }
    // kesin bitiş tarihlerini günlerden hesapla
    var bitis = {};
    Object.keys(B).forEach(function (bid) {
      var m = null, eksik = false;
      B[bid].birimler.forEach(function (id) {
        var t = durum.izlendi[id] || sim.izlendi[id];
        if (!t) eksik = true; else if (!m || t > m) m = t;
      });
      bitis[bid] = eksik ? null : m;
    });
    return { gunler: gunler, bolumBitis: bitis, sim: sim };
  }

  /* ---------------- genel hesaplar ---------------- */
  function ilerleme(durum) {
    var izlenen = 0;
    Object.keys(durum.izlendi || {}).forEach(function (id) { if (U[id]) izlenen += U[id].sn; });
    return TOPLAM_SN ? izlenen / TOPLAM_SN : 0;
  }
  function dersIlerleme(durum, dersId) {
    var top = 0, iz = 0;
    TUM.forEach(function (id) { var u = U[id]; if (u.ders !== dersId) return; top += u.sn; if (durum.izlendi[id]) iz += u.sn; });
    return { top: top, iz: iz, oran: top ? iz / top : 0 };
  }
  function bolumIlerleme(durum, bid) {
    var b = B[bid], iz = 0; b.birimler.forEach(function (id) { if (durum.izlendi[id]) iz += U[id].sn; });
    return b.sn ? iz / b.sn : 0;
  }
  function konuIlerleme(durum, kid) {
    var k = K[kid], n = 0; k.birimler.forEach(function (id) { if (durum.izlendi[id]) n++; });
    return { n: n, top: k.birimler.length };
  }

  function zincir(durum, s) {
    // bugünden geriye: pazarlar ve "bugün henüz çalışmadıysa" zinciri kırmaz
    var n = 0, d = s, ilk = true, guv = 0;
    while (guv++ < 500) {
      if (gunNo(d) === G.TATIL_GUNU && !(durum.aktivite || {})[d]) { d = ekle(d, -1); continue; }
      if ((durum.aktivite || {})[d] > 0) n++;
      else if (!ilk) break;
      ilk = false; d = ekle(d, -1);
      if (d < (durum.kurulum || d)) break;
    }
    return n;
  }

  function haftaDk(durum, s) {
    // Pazartesi başlangıçlı hafta
    var g = gunNo(s), pzt = ekle(s, -((g + 6) % 7)), top = 0, onceki = 0;
    for (var i = 0; i < 7; i++) {
      top += (durum.aktivite || {})[ekle(pzt, i)] || 0;
      onceki += (durum.aktivite || {})[ekle(pzt, i - 7)] || 0;
    }
    return { bu: Math.round(top), onceki: Math.round(onceki), pzt: pzt };
  }

  function toplamSoru(durum) {
    var t = 0;
    (durum.netler || []).forEach(function (n) {
      if (n.tur === 'konu') t += n.d + n.y + n.b;
      else if (n.dersler) Object.keys(n.dersler).forEach(function (k) { var x = n.dersler[k]; t += x.d + x.y + x.b; });
    });
    return t;
  }

  G.Motor = {
    kur: kur, U: U, K: K, B: B, DERS: DERS, TUM: TUM,
    toplamSn: function () { return TOPLAM_SN; },
    tarih: { str: str, parse: tarih, ekle: ekle, fark: fark, gunNo: gunNo, bugun: bugun },
    faz: faz, denemeTuru: denemeTuru, ytLink: ytLink,
    simDurum: simDurum, gunPaketi: gunPaketi, simule: simule, vadesiGelenTekrarlar: vadesiGelenTekrarlar,
    konuIstat: konuIstat, konuBitti: konuBitti, konuBitisTarihi: konuBitisTarihi,
    ilerleme: ilerleme, dersIlerleme: dersIlerleme, bolumIlerleme: bolumIlerleme, konuIlerleme: konuIlerleme,
    zincir: zincir, haftaDk: haftaDk, toplamSoru: toplamSoru
  };
})(typeof window !== 'undefined' ? window : globalThis);
