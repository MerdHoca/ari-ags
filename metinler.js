/* Ari'nin AGS Rehberi — METİNLER
   Bütün sözler, mesajlar, notlar ve sürprizler buradadır.
   Yeni söz / not eklemek için ilgili listeye bir satır eklemek yeter. */

window.ISIM = 'Ari';

/* ---------- GÜNÜN SÖZÜ (her gün bir tanesi döner) ---------- */
window.SOZLER = [
  // Ayetler (Diyanet meali esas alınmıştır)
  { t: 'ayet', s: 'Şüphesiz zorlukla beraber bir kolaylık vardır. Evet, zorlukla beraber bir kolaylık vardır.', k: 'İnşirâh, 5-6' },
  { t: 'ayet', s: 'Allah hiç kimseye gücünün yetmediği bir şey yüklemez.', k: 'Bakara, 286' },
  { t: 'ayet', s: 'İnsan için ancak çalıştığının karşılığı vardır.', k: 'Necm, 39' },
  { t: 'ayet', s: 'O hâlde boş kaldığında yeni bir işe koyul ve ancak Rabbine yönel.', k: 'İnşirâh, 7-8' },
  { t: 'ayet', s: 'Bilesiniz ki kalpler ancak Allah\'ı anmakla huzur bulur.', k: 'Ra\'d, 28' },
  { t: 'ayet', s: 'Sabredin. Şüphesiz Allah sabredenlerle beraberdir.', k: 'Enfâl, 46' },
  { t: 'ayet', s: 'Kim Allah\'a tevekkül ederse, O ona yeter.', k: 'Talâk, 3' },
  { t: 'ayet', s: 'Hiç bilenlerle bilmeyenler bir olur mu?', k: 'Zümer, 9' },
  { t: 'ayet', s: 'Allah\'ın rahmetinden ümidinizi kesmeyin.', k: 'Zümer, 53' },
  { t: 'ayet', s: 'Oku! Yaratan Rabbinin adıyla oku.', k: 'Alak, 1' },
  // Hadisler (sahih kaynaklardan)
  { t: 'hadis', s: 'Allah katında amellerin en sevimlisi, az da olsa devamlı olanıdır.', k: 'Buhârî, Rikâk 18; Müslim, Müsâfirîn 218' },
  { t: 'hadis', s: 'Kim ilim öğrenmek için bir yola girerse, Allah ona cennete giden yolu kolaylaştırır.', k: 'Müslim, Zikir 38' },
  { t: 'hadis', s: 'Kolaylaştırın, zorlaştırmayın; müjdeleyin, nefret ettirmeyin.', k: 'Buhârî, İlim 11' },
  { t: 'hadis', s: 'Sana fayda verecek şeye sarıl, Allah\'tan yardım dile ve acizlik gösterme.', k: 'Müslim, Kader 34' },
  { t: 'hadis', s: 'Ameller niyetlere göredir.', k: 'Buhârî, Bed\'ü\'l-vahy 1' },
  { t: 'hadis', s: 'İki nimet vardır ki insanların çoğu onların kıymetini bilmez: sağlık ve boş vakit.', k: 'Buhârî, Rikâk 1' },
  { t: 'hadis', s: 'Kul, kardeşinin yardımında olduğu sürece Allah da onun yardımındadır.', k: 'Müslim, Zikir 38' },
  { t: 'hadis', s: 'İnsanlara hayrı öğretene; Allah, melekleri, gök ve yer ehli, yuvasındaki karınca ve denizdeki balık bile dua eder.', k: 'Tirmizî, İlim 19' },
  { t: 'hadis', s: 'İnsan ölünce ameli kesilir; ancak üç şey müstesna: sadaka-i câriye, faydalanılan ilim ve kendisine dua eden hayırlı evlat.', k: 'Müslim, Vasiyyet 14' },
  { t: 'hadis', s: 'Müslümanın başına gelen hiçbir yorgunluk, sıkıntı ve üzüntü yoktur ki Allah onu sebebiyle hatalarını bağışlamasın.', k: 'Buhârî, Merdâ 1; Müslim, Birr 52' },
  { t: 'hadis', s: 'Allah sizin suretlerinize ve mallarınıza bakmaz; kalplerinize ve amellerinize bakar.', k: 'Müslim, Birr 34' },
  // Dualar
  { t: 'dua', s: 'Rabbim! Göğsümü genişlet, işimi bana kolaylaştır, dilimdeki düğümü çöz ki sözümü anlasınlar.', k: 'Tâhâ, 25-28 (Hz. Mûsâ\'nın duası)' },
  { t: 'dua', s: 'Allah\'ım! Senin kolay kıldığından başka kolay yoktur. Sen dilersen zoru da kolaylaştırırsın.', k: 'İbn Hibbân, Sahîh 974' },
  { t: 'dua', s: 'Rabbim! İlmimi artır.', k: 'Tâhâ, 114' },
  { t: 'dua', s: 'Allah\'ım! Bana öğrettiklerinle beni faydalandır, bana fayda verecek olanı öğret ve ilmimi artır.', k: 'Tirmizî, Daavât 128' },
  { t: 'dua', s: 'Rabbimiz! Üzerimize sabır yağdır ve ayaklarımızı sabit kıl.', k: 'Bakara, 250' },
  { t: 'dua', s: 'Hasbünallâhü ve ni\'me\'l-vekîl. Allah bize yeter, O ne güzel vekildir.', k: 'Âl-i İmrân, 173' },
  { t: 'dua', s: 'Rabbimiz! Bize dünyada da iyilik ver, ahirette de iyilik ver.', k: 'Bakara, 201' },
  // Genel hayattan
  { t: 'soz', s: 'Damlaya damlaya göl olur.', k: 'Atasözü' },
  { t: 'soz', s: 'Emek olmadan yemek olmaz.', k: 'Atasözü' },
  { t: 'soz', s: 'Sabrın sonu selamettir.', k: 'Atasözü' },
  { t: 'soz', s: 'Hayatta en hakiki mürşit ilimdir.', k: 'Mustafa Kemal Atatürk' },
  { t: 'soz', s: 'Öğretmenler! Yeni nesil sizin eseriniz olacaktır.', k: 'Mustafa Kemal Atatürk, 1924' },
  { t: 'soz', s: 'İlim ilim bilmektir, ilim kendin bilmektir.', k: 'Yunus Emre' },
  { t: 'soz', s: 'Bin millik bir yolculuk tek bir adımla başlar.', k: 'Lao Tzu' },
  { t: 'soz', s: 'Eğitimin kökleri acıdır ama meyvesi tatlıdır.', k: 'Aristoteles\'e atfedilir' }
];

/* ---------- HAYAL KARTLARI (aralara serpiştirilir) ----------
   konu: kardes | sinif | akademi | gelecek  */
window.HAYAL = [
  { konu: 'kardes', s: 'Bir gün kardeşlerinden biri arkadaşlarına "ablam öğretmen" diyecek. O cümlenin bir parçası bugünkü çalışmandan yapılıyor.' },
  { konu: 'kardes', s: 'Kardeşlerin seni izliyor. Yorgunken bile oturup çalışan bir abla, onlara anlatılacak her nasihatten daha güçlü bir ders.' },
  { konu: 'kardes', s: 'Onlara rahat bir hayat kurmak bir dilekti. Bugünkü paketinle o dilek bir plana dönüştü.' },
  { konu: 'kardes', s: 'Bayram sabahı kardeşlerine "bu sefer benden" demenin tadını şimdiden düşün. Oraya giden yol bu ekrandan geçiyor.' },
  { konu: 'sinif', s: 'Mutfakta ayakta geçen uzun saatler, ocağın sıcağı, bitmeyen vardiyalar… Sınıfta ise zil çalar, ders biter. Akşam senin, hafta sonu senin.' },
  { konu: 'sinif', s: 'Bir yemek bir öğünde biter. Öğrettiğin bir şey ise bir ömür kullanılır.' },
  { konu: 'sinif', s: 'Haziran sonu karne günü… Sonra yaz tatili. Bir de şubatta yarıyıl tatili. Bu takvim bir gün senin takvimin olacak.' },
  { konu: 'sinif', s: 'Vardiya listesi beklemek yok. Ders programın dönem başında belli olur, hayatını ona göre kurarsın.' },
  { konu: 'sinif', s: 'Mutfakta da sabır, ölçü ve düzen gerekiyordu. Sen bunları zaten biliyorsun; sadece yeni bir mutfağa, sınıfa taşıyacaksın.' },
  { konu: 'akademi', s: 'Millî Eğitim Akademisi\'nde hazırlık eğitimi süresince her ay ödeme yapılıyor. Yani kazandığın gün, emeğinin karşılığı da başlıyor.' },
  { konu: 'akademi', s: 'Akademide eğitimini başarıyla bitirenler öğretmen olarak göreve başlıyor. Bugün çözdüğün sorular o kapının anahtarını yontuyor.' },
  { konu: 'akademi', s: 'Akademide yanında, senin gibi geceleri çalışmış, senin gibi pes etmemiş insanlar olacak. Orada yeni dostlukların seni bekliyor.' },
  { konu: 'akademi', s: 'Akademide teorik dersler ve gerçek okullarda uygulamalar var. Yani sınıfa yalnız ve hazırlıksız girmeyeceksin; elinden tutulacak.' },
  { konu: 'gelecek', s: 'Bir gün tahtanın önünde duracaksın ve sınıftan biri, bir zamanlar senin anlamadığın bir konuyu senden öğrenecek.' },
  { konu: 'gelecek', s: 'Şu an zorlandığın her konu, ileride öğrencilerine "ben de zorlanmıştım" diyebileceğin bir hikâye.' },
  { konu: 'gelecek', s: 'Mayıs\'ta sınav salonundan çıktığın an, bu ekranda işaretlediğin her tik yanında olacak.' }
];

/* ---------- KOÇ MESAJLARI ----------
   Program bunları Ari'nin gerçek verisiyle doldurur. {…} içleri otomatik gelir. */
window.KOC = {
  karsilama: ['Hoş geldin {isim}. Bugünkü paketin hazır.', 'Merhaba {isim}, bugün de bir adım.', '{isim}, bugün senin için hafif ama işe yarar bir plan çıkardım.'],
  zincir: ['{n} gündür aralıksız devam ediyorsun. Bu süreklilik, tek seferlik yoğun çalışmadan çok daha değerli.', 'Zincirin {n} gün oldu. Az ama her gün — işin sırrı tam olarak bu.'],
  dunKacti: ['Dün ara verdin; bugün tazesin. Kaçan iş sessizce yeniden dağıtıldı, telafiye gerek yok.', 'Bir gün dinlenmek planın parçası. Kaldığın yerden hafifçe devam ediyoruz.'],
  tahmin: ['Bu tempoyla {bolum} {tarih} gibi bitiyor.', '{bolum} için çizgi belli: tahmini bitiş {tarih}.'],
  trend: ['{konu} konusunda son testlerin %{a} → %{b}. Bu tesadüf değil, emek.', '{konu}: %{a}\'dan %{b}\'ye çıktın. Bunu kimse sana veremezdi, sen aldın.'],
  hafta: ['Bu hafta {dk} dakika çalıştın, geçen haftadan {fark} dakika fazla.', 'Bu hafta {dk} dakika. Geçen haftanın üzerindesin.'],
  genel: ['Sınava {gun} gün var. Bugün yapacağın küçük iş, o günün büyük rahatlığı.', 'Toplam yolun %{yuzde}\'ini tamamladın. Her işaret, gerçek bir ilerleme.', 'Bugün mükemmel olmak zorunda değil; sadece başlamak yeterli.'],
  paketBitti: ['Bugünkü paketin tamam! Dinlenmeyi hak ettin.', 'Paket bitti {isim}. Bugün kendine teşekkür et.', 'Tamamdır! Bugünü kazandın.'],
  konuBitti: ['"{konu}" bitti. Bunu yarın kısa bir tekrarla demleyeceğiz.', '"{konu}" tamam. Bir petek daha doldu.'],
  yorgun: ['Yorgun günler de sayılır. Bugün sadece kısa bir dokunuş yeter.', 'Bugün kendine nazik ol. Küçük bir adım, hiç adım atmamaktan çok iyidir.']
};

/* ---------- STRES / NEFES ---------- */
window.MOLA = {
  baslik: 'Mini mola',
  adimlar: ['Daire büyürken burnundan nefes al', 'Kısa bir an tut', 'Daire küçülürken ağzından yavaşça ver'],
  bitis: 'Güzel. Omuzlarını bir kez bırak ve devam et.'
};
window.DENEME_ONCESI = {
  baslik: 'Başlamadan önce 3 dakika',
  aciklama: 'Aklında dönen ne varsa buraya yaz: korku, endişe, yapılacaklar… Kimse okumayacak, kaydedilmeyecek. Yazdıktan sonra "Bıraktım" de.',
  heyecan: 'Kalbin hızlı atıyorsa bu iyi bir işaret: vücudun hazırlanıyor. Bu heyecan, enerjin.'
};
window.MOOD = {
  iyi: 'Harika, enerjin yerinde. Paketin hazır.',
  orta: 'Normal bir gün. Normal günler işi bitirir.',
  yorgun: 'Anlaşıldı. Bugünü hafiflettim; az da olsa devam, çok kıymetli.'
};

/* ---------- ROZETLER ---------- */
window.ROZETLER = [
  { id: 'ilk_video', ad: 'İlk adım', s: 'İlk dersini işaretledin. Yolculuk başladı.' },
  { id: 'ilk_konu', ad: 'İlk petek', s: 'İlk konunu bitirdin. Bir petek doldu!' },
  { id: 'yuzde_10', ad: '%10', s: 'Yolun onda birini geride bıraktın.' },
  { id: 'yuzde_25', ad: 'Çeyrek yol', s: 'Yolun dörtte biri tamam.' },
  { id: 'yuzde_50', ad: 'Yarı yol', s: 'Yarıdasın! Buradan sonrası iniş.' },
  { id: 'yuzde_75', ad: 'Son çeyrek', s: 'Dörtte üç tamam. Bitiş görünüyor.' },
  { id: 'yuzde_100', ad: 'Petek doldu', s: 'Bütün konular bitti. Şimdi sadece cilalıyoruz.' },
  { id: 'zincir_3', ad: '3 gün', s: '3 gün aralıksız.' },
  { id: 'zincir_7', ad: '1 hafta', s: 'Bir haftalık zincir.' },
  { id: 'zincir_14', ad: '2 hafta', s: 'İki haftadır bırakmadın.' },
  { id: 'zincir_30', ad: '30 gün', s: 'Bir aylık süreklilik. Bu artık bir alışkanlık.' },
  { id: 'soru_100', ad: '100 soru', s: '100 soruyu geride bıraktın.' },
  { id: 'soru_500', ad: '500 soru', s: '500 soru! Elin alıştı.' },
  { id: 'soru_1000', ad: '1000 soru', s: 'Bin soru. Bu bir dönüm noktası.' },
  { id: 'soru_2500', ad: '2500 soru', s: '2500 soru. Sınav salonu artık tanıdık gelecek.' },
  { id: 'deneme_1', ad: 'İlk deneme', s: 'İlk denemeni çözdün. Artık nerede olduğunu biliyorsun.' },
  { id: 'faz_2', ad: 'Tempo dönemi', s: 'Yeni dönem başladı. Temeli attın, şimdi binayı yükseltiyoruz.' }
  // Her ders bitişi için otomatik rozet üretilir: "ders_<bolumId>"
];

/* ---------- SÜRPRİZ NOTLAR ----------
   Belirli anlarda açılan mektuplar. Arife önceden göremez.
   tetik seçenekleri:
     'ilk_video' · 'ilk_konu' · 'yuzde_10/25/50/75/100' · 'zincir_7' vb.
     'bolum_<id>'  (örn. 'bolum_tr' → Türkçe bitince)
     'tarih_2027-05-07'  (o gün açılır)
     'faz_2' (16 Ocak) · 'deneme_1' (ilk deneme)
   aktif: false olanlar görünmez. Yeni not eklemek için bir satır kopyalayın. */
window.SURPRIZLER = [
  { id: 'n1', kimden: 'Mert Hoca', tetik: 'ilk_konu', aktif: true,
    metin: 'Ari, ilk konunu bitirdin. Bu programı senin için hazırlarken tek bir şeye inandım: sen bunu yaparsın. Bugün bunun ilk kanıtını gösterdin. Devam!' },
  { id: 'n2', kimden: 'Kız kardeşlerin', tetik: 'yuzde_50', aktif: false,
    metin: '(Buraya kardeşlerinden alınacak mesaj yazılacak.)' },
  { id: 'n3', kimden: 'Bir arkadaşın', tetik: 'bolum_tr', aktif: false,
    metin: '(Buraya bir arkadaştan alınacak mesaj yazılacak.)' },
  { id: 'n4', kimden: 'Bir arkadaşın', tetik: 'faz_2', aktif: false,
    metin: '(Buraya bir arkadaştan alınacak mesaj yazılacak.)' },
  { id: 'n5', kimden: 'Mert Hoca', tetik: 'tarih_2027-05-07', aktif: false,
    metin: '(Sınavdan bir gün önce açılacak not.)' }
];

/* ---------- YÖNTEMLER SAYFASI (gizli: filigrana 5 kez dokunarak açılır) ---------- */
window.YONTEM_HTML = `
<h2>Bu rehber nasıl çalışıyor?</h2>
<p class="yt-giris">Arife'ye hissettirmeden programın içine yerleştirilen öğrenme ve planlama ilkeleri, gerekçeleri ve kaynaklarıyla.</p>

<h3>1. Aralıklı tekrar</h3>
<p><b>Ne yapıyoruz:</b> Bir konu bittiğinde 1, 7 ve 30 gün sonra "kısa tekrar" olarak pakete geri geliyor. Başarı %50'nin altındaysa 3 gün sonra ek tekrar ekleniyor.</p>
<p><b>Neden:</b> Aynı süre tek seferde değil aralıklara bölünerek çalışıldığında hatırlama belirgin biçimde artar (aralıklı tekrar etkisi). Unutma eğrisi en çok ilk günlerde düşer; bu yüzden ilk tekrar ertesi gün.</p>
<p class="yt-k">Cepeda vd. (2006), Psychological Bulletin · Ebbinghaus (1885)</p>

<h3>2. Hatırlama pratiği (test etkisi)</h3>
<p><b>Ne yapıyoruz:</b> Her videonun yanında o videoya özel soru hedefi var; tekrarlar "not oku" değil "10 soru çöz" şeklinde.</p>
<p><b>Neden:</b> Bilgiyi tekrar okumak yerine hatırlamaya çalışmak, uzun süreli öğrenmeyi daha güçlü kalıcı kılar.</p>
<p class="yt-k">Roediger &amp; Karpicke (2006), Psychological Science</p>

<h3>3. Karma çalışma (sözel + sayısal aynı gün)</h3>
<p><b>Ne yapıyoruz:</b> Her gün bir sayısal ve en az bir sözel hat var. Matematik tek başına bir güne yığılmıyor.</p>
<p><b>Neden:</b> Farklı türde konuları dönüşümlü çalışmak hem sıkılmayı azaltır hem de konular arası ayrım becerisini geliştirir.</p>
<p class="yt-k">Rohrer &amp; Taylor (2007), Instructional Science</p>

<h3>4. Bilişsel yük: zor + zor aynı gün yok, uzun video ikiye bölünür</h3>
<p><b>Ne yapıyoruz:</b> Aynı günde en fazla bir yeni "zor" konu var (Matematik, istatistik, Öğrenme Psikolojisi). Çakışma olursa bir hat ya "soru günü"ne dönüşüyor ya da sıradaki orta zorluktaki bölüme geçiyor. 55 dakikadan uzun videolar kısımlara ayrılıp başlangıç saniyesiyle linkleniyor.</p>
<p><b>Neden:</b> Çalışma belleği sınırlıdır; ön bilgisi az olan öğrencide yeni ve karmaşık bilgiler üst üste bindiğinde öğrenme düşer.</p>
<p class="yt-k">Sweller (1988), Cognitive Science</p>

<h3>5. Saat değil "paket" planı</h3>
<p><b>Ne yapıyoruz:</b> Vardiyalar önceden bilinmediği için günün saatleri planlanmıyor. Arife "bugün kaç saatim var" der, paket buna göre küçülür/büyür.</p>
<p><b>Neden:</b> "Ne zaman ve ne yapacağım" belirsizliği azaldıkça başlama ihtimali artar; plan gerçek hayata uyduğunda bırakılmaz.</p>
<p class="yt-k">Gollwitzer (1999), American Psychologist — uygulama niyetleri</p>

<h3>6. Kısa dersler önce (hedef gradyanı ve küçük kazanımlar)</h3>
<p><b>Ne yapıyoruz:</b> Türkçe (11 sa) ilk sırada; ilk haftalarda hızlı biten konular ve rozetler var.</p>
<p><b>Neden:</b> İnsanlar hedefe yaklaştıkça çabasını artırır; görünür küçük ilerlemeler motivasyonun en güçlü kaynaklarındandır.</p>
<p class="yt-k">Kivetz vd. (2006), Journal of Marketing Research · Amabile &amp; Kramer (2011), The Progress Principle</p>

<h3>7. Önerilen izleme hızı</h3>
<p><b>Ne yapıyoruz:</b> Tarih ve Coğrafya 1,5x; Türkçe, Eğitim, Mevzuat 1,25x; Matematik ve istatistik normal hız.</p>
<p><b>Neden:</b> Anlatım videolarında orta düzeyde hızlandırma öğrenmeyi anlamlı düşürmeden zaman kazandırır; yoğun işlem gerektiren konularda ise normal hız korunur.</p>
<p class="yt-k">Murphy vd. (2022), Applied Cognitive Psychology</p>

<h3>8. Soru ağırlığına göre sıralama</h3>
<p><b>Ne yapıyoruz:</b> Eğitim Bilimleri (30 soru) ve Sözel/Sayısal (15'er soru) hatları her gün açık; Tarih (6 soru, 44 sa video) en sona, 1,5x hızla. Matematikte "Sıfırdan Kamp" ile çakışan ~23 saatlik video listeden çıkarıldı.</p>
<p><b>Neden:</b> Sınırlı zaman, puan getirisi en yüksek alanlara öncelikli dağıtılmalı.</p>

<h3>9. Stres yönetimi (fark ettirmeden)</h3>
<p><b>Günlük ruh hâli:</b> "Yorgunum" seçilince paket hafifler; gün kaybedilmiş sayılmaz. Kaçan günler için telafi listesi değil, sessiz yeniden dağıtım var. "Ya hep ya hiç" düşüncesi bir aksilikten sonra tamamen bırakmaya yol açabilir; bunu engelliyoruz.</p>
<p class="yt-k">Polivy &amp; Herman (1985) · Neff (2003), Self and Identity — öz-şefkat</p>
<p><b>Mini mola:</b> Yavaş nefes verme odaklı 60 saniyelik nefes animasyonu. Kısa süreli yavaş nefes egzersizlerinin kaygıyı azalttığı gösterilmiştir.</p>
<p class="yt-k">Balban vd. (2023), Cell Reports Medicine</p>
<p><b>Deneme öncesi yazma:</b> Denemeden önce endişeleri 3 dakika yazıya dökme kutusu. Sınav öncesi kaygıyı yazmak performansı artırabilir.</p>
<p class="yt-k">Ramirez &amp; Beilock (2011), Science</p>
<p><b>Heyecanı yeniden adlandırma:</b> "Sakin ol" yerine "bu heyecan enerjin" dili.</p>
<p class="yt-k">Brooks (2014), Journal of Experimental Psychology: General</p>

<h3>10. Gerçekçi geri bildirim</h3>
<p><b>Ne yapıyoruz:</b> Övgüler boş değil; her mesaj gerçek bir rakama (zincir, trend, haftalık dakika, tahmini bitiş) dayanıyor. Çaba ve süreç övülüyor.</p>
<p class="yt-k">Dweck (2006), Mindset · Hattie &amp; Timperley (2007), Review of Educational Research</p>

<h3>11. Dönemler</h3>
<p>1. dönem (15 Ocak'a kadar): günde ~2 saat, temel kurma. 2. dönem: günde ~5 saat, haftalık deneme. Final (21 Nisan – 7 Mayıs): tekrar ve deneme ağırlıklı. Sınav: 8 Mayıs 2027.</p>
`;
