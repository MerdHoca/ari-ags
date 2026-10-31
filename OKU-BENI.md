# Ari'nin AGS Rehberi — Mert Hoca için kullanım kılavuzu

## 1. İnternete koyma (bir kere, ~10 dakika, ücretsiz)

GitHub Pages ile:

1. https://github.com adresinde ücretsiz hesap aç.
2. Sağ üstte **+** → **New repository** seç. İsim olarak `ari-ags` yaz, **Public** seçili kalsın, **Create repository** de.
3. Açılan sayfada **uploading an existing file** bağlantısına tıkla. Zip'ten çıkan bütün dosyaları (index.html, stil.css, … ikon-512.png) sürükleyip bırak. **Commit changes** de.
4. Üstteki **Settings** sekmesi → soldan **Pages**. *Branch* kısmında **main** seç, **Save** de.
5. 1-2 dakika sonra sayfanın üstünde adres çıkar: `https://KULLANICIADIN.github.io/ari-ags/`

Bu linki Arife'ye gönder. iPhone'da:
**Safari'de aç → alttaki Paylaş (kare ve yukarı ok) → Ana Ekrana Ekle.**
Bundan sonra hep o simgeden açsın. İlk açılıştan sonra internetsiz de çalışır.

> Önemli: iPhone'da Safari'de açılan sayfa ile ana ekrandaki simge ayrı hafıza kullanır. Arife baştan simgeyi kullanmalı. (Program bunu ona ilk açılışta zaten söylüyor.)

## 2. Dosyalar ne işe yarıyor?

| Dosya | İçinde ne var | Ne zaman değişir |
|---|---|---|
| `veri.js` | Bütün dersler, konular, videolar, süreler, zorluklar | Video/konu eklemek, çıkarmak |
| `plan.js` | Sınav tarihleri, dönemler, günlük süre seçenekleri, ders sırası, denemeler | Takvim ya da tempo değişince |
| `metinler.js` | Ayet/hadis/dua/sözler, "Bir gün" kartları, koç mesajları, rozetler, **sürpriz notlar**, yöntem sayfası | Not/söz eklemek |
| `motor.js` | Planı hesaplayan beyin | Planlama mantığı değişecekse |
| `uygulama.js` | Ekranlar ve düğmeler | Ekran/özellik değişecekse |
| `stil.css` | Renkler, yazı tipleri, animasyonlar | Görünüm değişecekse |
| `sw.js`, `manifest.webmanifest`, `ikon-*.png`, `takvim.ics` | İnternetsiz çalışma, simge, takvim | Neredeyse hiç |

**Değişiklik nasıl yapılır:** Claude'a sadece ilgili dosyayı at ve ne istediğini söyle (örn. "metinler.js'ye kardeşlerinden gelen şu notu ekle, %50'de açılsın"). Gelen dosyayı GitHub'da aynı isimle tekrar yükle (Add file → Upload files). Arife bir sonraki açılışta yeni hâlini görür. **İlerlemesi silinmez.**

## 3. Sürpriz not eklemek (kardeşler, arkadaşlar)

`metinler.js` içinde `SURPRIZLER` listesi var. Hazır satırlar `aktif: false` bekliyor. Metni yaz, `aktif: true` yap. Tetik seçenekleri:

- `ilk_konu` · `yuzde_25` · `yuzde_50` · `yuzde_75` · `zincir_7` · `deneme_1` · `faz_2` (16 Ocak)
- `bolum_tr` (Türkçe bitince), `bolum_mat0` (Sıfırdan matematik bitince) vb.
- `tarih_2027-05-07` (o gün açılır)

Not: `n1` numaralı not senin ağzından yazılmış bir örnektir ve **açık** durumdadır. Kendi cümlelerinle değiştir ya da `aktif: false` yap.

## 4. Gizli yöntem sayfası

Sağ üstteki **Mert Hoca** yazısına 3 saniye içinde 5 kez dokun. Kullanılan bilimsel yöntemler, gerekçeleri ve kaynaklarıyla açılır.

## 5. Arife'nin verisi

- Kayıtlar Arife'nin telefonunda tutulur. Pazar günleri program ona "Haftanı Mert Hoca'ya gönder" der. Rapor ve yedek dosyası WhatsApp'tan sana gelir.
- **Rapor:** Claude'a yapıştırırsan tam eksik analizi yapılır (rapor bunun için hazırlanmış bir talimat içerir).
- **Yedek (.json):** Telefon değişirse Ayarlar → Yedekten yükle.
- Gün dönümü sabah 04.00'tür: gece vardiyasından sonra 01.00'de çalışsa bile o günün paketine sayılır.
