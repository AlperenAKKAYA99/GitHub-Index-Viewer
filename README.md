# GitHub Index Viewer 🚀

GitHub projelerindeki HTML, CSS ve JavaScript dosyalarını bilgisayarınıza indirmeye gerek kalmadan, doğrudan tarayıcınız üzerinden canlı olarak önizlemenizi sağlayan hafif ve güvenli bir Google Chrome eklentisidir.

## 🌟 Özellikler

- **Tek Tıkla Önizleme:** GitHub reposunda bulunan `index.html` dosyasını otomatik olarak algılar ve Githack aracılığıyla anında render eder.
- **GitHub Arayüzü ile %100 Uyumlu:** Eklentinin yerleştirdiği buton, GitHub'ın kendi native CSS (`btn btn-sm` vb.) sınıflarını kullanır. Tema (Dark/Light) ne olursa olsun kusursuz görünür.
- **Dinamik Algılama:** GitHub'ın SPA (Single Page Application) yapısına tam uyumludur. Sayfalar arası geçişlerde yeniden yükleme yapmadan çalışır, repodaki geçerli `branch` (ana dal) adını otomatik tespit eder.
- **Modern ve Zarif Popup:** Güncel tasarım trendlerine uygun, şık ve karanlık mod destekli bilgilendirme penceresi.
- **Güvenli (Manifest V3):** Google Chrome'un en güncel güvenlik standartları olan Manifest V3 kurallarına uygun olarak geliştirilmiştir. Kullanıcı verisi toplamaz!

## 📥 Kurulum (Geliştirici Modu)

Eklentiyi kaynak koddan manuel olarak Chrome'a yüklemek için:

1. Bu depoyu (repository) bilgisayarınıza indirin veya klonlayın.
2. Google Chrome tarayıcınızda adres çubuğuna `chrome://extensions/` yazın ve Enter'a basın.
3. Sağ üst köşedeki **Geliştirici Modu (Developer mode)** anahtarını aktif hale getirin.
4. Sol üstte beliren **Paketlenmemiş öğe yükle (Load unpacked)** butonuna tıklayın.
5. İndirdiğiniz eklenti klasörünü seçin.

Artık eklenti kullanıma hazır! GitHub üzerinde herhangi bir repoya girdiğinizde "Index Viewer" butonunu göreceksiniz.

## 🛠️ Nasıl Çalışır?

1. Herhangi bir GitHub reposuna girin.
2. Sağ üst köşede (Yıldız ve Fork butonlarının olduğu alan) **"Index Viewer"** butonuna tıklayın.
3. Eklenti sizi otomatik olarak `https://raw.githack.com/...` adresine yönlendirecek ve projenin canlı demosunu gösterecektir.
4. Sağ panelde ekibimize destek amaçlı rastgele gelen **"Destekçi"** ilanlarımızı görebilirsiniz.

## 🛡️ Gizlilik ve Güvenlik

- Bu eklenti **hiçbir kişisel veri toplamaz, işlemez veya kayıt altına almaz.**
- Eklenti, sadece ziyaret ettiğiniz sayfanın URL'sini ve Branch bilgisini okuyarak, projenin canlı versiyonuna `raw.githack.com` üzerinden güvenli bir şekilde yönlendirme sağlar. 
- Reklam modülü (Destekçi alanı), tamamen anonim bir şekilde çalışır ve eklenti geliştiricisine ait sunucudan (alperenakkaya.dev) salt okunur API bağlantısıyla verileri çeker.

## 🤝 Destek Olun

Eğer bu eklenti işinize yaradıysa, projenin gelişerek devam etmesi için bize destek olabilirsiniz. Destek olmak ve iletişim için [alperenakkaya.dev](https://alperenakkaya.dev/) adresini ziyaret edebilirsiniz! ☕

---
**Geliştirici:** [Alperen Akkaya](https://alperenakkaya.dev/)
