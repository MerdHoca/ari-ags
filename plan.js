/* Ari'nin AGS Rehberi — PLAN AYARLARI
   Takvim, dönemler (fazlar), günlük süreler ve ders sırası buradan yönetilir.
   Burada bir şeyi değiştirmek Arife'nin ilerlemesini SİLMEZ; plan kendini yeniden hesaplar. */

window.SINAV = {
  ad: '2027 MEB-AGS',
  tarih: '2027-05-08',            // AGS (ÖSYM 2027 takvimi)
  basvuruBas: '2027-03-19',
  basvuruBit: '2027-03-29',
  gecBasvuru: '2027-04-06',
  sonuc: '2027-06-11',
  yanlisOrani: 4                  // 4 yanlış 1 doğruyu götürür
};

/* Sınavdaki 6 ders (net takibi bu derslere göre yapılır) */
window.DERSLER = [
  { id: 'tr',  ad: 'Türkçe',            kisa: 'Türkçe',   soru: 15, renk: '#D9765F', tur: 'sozel'  },
  { id: 'mat', ad: 'Matematik',         kisa: 'Mat',      soru: 15, renk: '#4F6D9A', tur: 'sayisal' },
  { id: 'eb',  ad: 'Eğitim Bilimleri',  kisa: 'Eğitim',   soru: 30, renk: '#2E9184', tur: 'sozel'  },
  { id: 'mev', ad: 'Mevzuat',           kisa: 'Mevzuat',  soru: 8,  renk: '#8A6FA8', tur: 'sozel'  },
  { id: 'tar', ad: 'Tarih',             kisa: 'Tarih',    soru: 6,  renk: '#A86A45', tur: 'sozel'  },
  { id: 'cog', ad: 'Türkiye Coğrafyası',kisa: 'Coğrafya', soru: 6,  renk: '#6E9A57', tur: 'sozel'  }
];

/* Dönemler.
   slotlar: günün içindeki "çalışma hatları". pay = o hatta ayrılan zaman oranı.
   kuyruk: o hatta sırayla işlenecek bölümler (veri.js'deki bölüm id'leri).
   Bitmiş bölümler otomatik atlanır; bir hat boşalırsa zamanı diğer hatlara geçer. */
window.FAZLAR = [
  {
    id: 1, ad: 'Temel Dönem', bas: '2026-10-31', bit: '2027-01-15',
    sureler: [60, 120, 180], varsayilan: 120, hafif: 25,
    tekrarPay: 0.2,
    slotlar: [
      { ad: 'Sayısal', pay: 0.45, kuyruk: ['mat0', 'mat'] },
      { ad: 'Sözel',   pay: 0.55, kuyruk: ['tr', 'eb-tmes', 'eb-prog', 'eb-temel', 'cog', 'eb-reh', 'eb-tymm', 'eb-gel', 'mev'] }
    ]
  },
  {
    id: 2, ad: 'Tempo Dönemi', bas: '2027-01-16', bit: '2027-04-20',
    sureler: [180, 240, 300, 360], varsayilan: 300, hafif: 60,
    tekrarPay: 0.2,
    slotlar: [
      { ad: 'Sayısal',          pay: 0.36, kuyruk: ['mat0', 'mat', 'eb-olcme'] },
      { ad: 'Eğitim Bilimleri', pay: 0.36, kuyruk: ['eb-tmes', 'eb-prog', 'eb-temel', 'eb-ogr', 'eb-tymm', 'eb-gel', 'eb-reh', 'eb-olcme'] },
      { ad: 'Genel Kültür',     pay: 0.28, kuyruk: ['tr', 'cog', 'mev', 'tar'] }
    ]
  },
  {
    id: 3, ad: 'Final Dönemi', bas: '2027-04-21', bit: '2027-05-07',
    sureler: [180, 240, 300, 360], varsayilan: 300, hafif: 60,
    tekrarPay: 0.35,
    slotlar: [
      { ad: 'Son Tekrar', pay: 0.3, kuyruk: ['mev-son'] },
      { ad: 'Kalanlar',   pay: 0.7, kuyruk: ['tr', 'mat0', 'mat', 'eb-tmes', 'eb-prog', 'eb-temel', 'eb-ogr', 'eb-tymm', 'eb-gel', 'eb-reh', 'eb-olcme', 'cog', 'mev', 'tar'] }
    ]
  }
];

/* Haftanın dinlenme günü (0 = Pazar). */
window.TATIL_GUNU = 0;

/* Denemeler: dönem 1'de belirli tarihler (mini), sonra haftalık. */
window.DENEMELER = {
  mini: ['2026-11-28', '2026-12-26', '2027-01-09'],   // 1. dönem: kısa deneme (bildiği derslerden)
  haftalikFaz2: 6,                                    // 2. dönem: her Cumartesi tam deneme
  faz3Gunler: [2, 4, 6],                              // final: Salı, Perşembe, Cumartesi
  miniDk: 60, tamDk: 150
};

/* Aralıklı tekrar: konu bittikten kaç gün sonra kısa tekrar gelsin */
window.TEKRAR_ARALIK = [1, 7, 30];
window.TEKRAR_DK = 15;            // bir kısa tekrar ≈ 15 dk (5 dk not + 10 soru)
window.ZAYIF_ESIK = 0.5;          // bir konuda başarı %50'nin altındaysa 3 gün sonra ek tekrar
