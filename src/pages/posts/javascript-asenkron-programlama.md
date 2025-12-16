---
author: sametsunman
title: "JavaScript'te Asenkron Programlama: Callback'ten Async/Await'e"
subtitle: >-
  Callback hell'de kaybolmuş, Promise zincirlerinde boğulmuş biri misin? Merak
  etme, JavaScript'in asenkron dünyasını en baştan, adım adım anlatıyoruz.
date: '2025-12-16'
thumb_img_alt: 'javascript async'
content_img_alt: 'javascript async'
excerpt: >-
  Callback hell'de kaybolmuş, Promise zincirlerinde boğulmuş biri misin? Merak
  etme, JavaScript'in asenkron dünyasını en baştan, adım adım anlatıyoruz.
canonical_url: ''
template: post
thumb_img_path: images/async_js.png
content_img_path: images/async_js.png
---
JavaScript tek thread'li bir dil. Yani aynı anda sadece bir iş yapabilir. Peki API'den veri çekerken sayfa nasıl donmuyor? İşte asenkron programlamanın sihri burada başlıyor.

Bu yazıda callback'lerden başlayıp, Promise'lere, oradan da async/await'e kadar tüm yolculuğu yapacağız.

## Önce Senkron vs Asenkron Nedir?

### Senkron Kod

```javascript
console.log("1");
console.log("2");
console.log("3");
// Çıktı: 1, 2, 3 (sırayla)
```

Her satır bir önceki bitmeden çalışmaz. Basit ve öngörülebilir.

### Asenkron Kod

```javascript
console.log("1");
setTimeout(() => console.log("2"), 1000);
console.log("3");
// Çıktı: 1, 3, 2
```

`setTimeout` asenkron. JavaScript "1 saniye sonra çalıştır" der ve devam eder. "3" yazdırılır, 1 saniye sonra "2" gelir.

## Callback - Her Şeyin Başladığı Yer

Callback, bir fonksiyona parametre olarak verdiğin başka bir fonksiyon. "İşin bitince bunu çağır" demek gibi.

```javascript
function veriCek(callback) {
  setTimeout(() => {
    const veri = { isim: "Ahmet", yas: 25 };
    callback(veri);
  }, 1000);
}

veriCek((sonuc) => {
  console.log(sonuc); // { isim: "Ahmet", yas: 25 }
});
```

Güzel görünüyor değil mi? Ama bekle...

### Callback Hell (Piramit of Doom)

Birden fazla asenkron işlem sırayla yapman gerekince:

```javascript
kullaniciyiGetir(1, (kullanici) => {
  siparisleriGetir(kullanici.id, (siparisler) => {
    siparisDetayGetir(siparisler[0].id, (detay) => {
      odemeGetir(detay.odemeId, (odeme) => {
        kargoTakip(odeme.kargoNo, (kargo) => {
          console.log(kargo);
          // Daha da derine inebilir...
        });
      });
    });
  });
});
```

Buna "Callback Hell" veya "Pyramid of Doom" deniyor. Okumak zor, debug etmek kabus, hata yakalamak imkansıza yakın.

### Error Handling Sorunu

```javascript
veriCek((hata, sonuc) => {
  if (hata) {
    console.error(hata);
    return;
  }
  baskaBirsey(sonuc, (hata2, sonuc2) => {
    if (hata2) {
      console.error(hata2);
      return;
    }
    // Her seviyede hata kontrolü...
  });
});
```

Her callback'te ayrı ayrı hata kontrolü. Çıldırtıcı.

## Promise - Kurtarıcı Geliyor

ES6 ile birlikte Promise geldi ve hayatımız değişti.

Promise, gelecekte bir değer döneceğini "söz veren" bir nesne. Üç durumu var:

- **pending**: Henüz sonuçlanmadı
- **fulfilled**: Başarıyla tamamlandı
- **rejected**: Hata oluştu

### Promise Oluşturma

```javascript
const soz = new Promise((resolve, reject) => {
  setTimeout(() => {
    const basarili = true;

    if (basarili) {
      resolve({ isim: "Ahmet", yas: 25 });
    } else {
      reject(new Error("Bir şeyler ters gitti"));
    }
  }, 1000);
});
```

### Promise Kullanma

```javascript
soz
  .then((sonuc) => {
    console.log(sonuc);
  })
  .catch((hata) => {
    console.error(hata);
  });
```

### Callback Hell'i Promise ile Çözme

```javascript
kullaniciyiGetir(1)
  .then(kullanici => siparisleriGetir(kullanici.id))
  .then(siparisler => siparisDetayGetir(siparisler[0].id))
  .then(detay => odemeGetir(detay.odemeId))
  .then(odeme => kargoTakip(odeme.kargoNo))
  .then(kargo => console.log(kargo))
  .catch(hata => console.error("Bir yerde hata oluştu:", hata));
```

Düz bir zincir! Okunması çok daha kolay. Ve tek bir `catch` tüm hataları yakalar.

### Promise Metodları

#### Promise.all - Hepsini Bekle

Birden fazla Promise'i paralel çalıştır, hepsi bitince devam et:

```javascript
const p1 = fetch('/api/kullanici');
const p2 = fetch('/api/urunler');
const p3 = fetch('/api/kampanyalar');

Promise.all([p1, p2, p3])
  .then(([kullanici, urunler, kampanyalar]) => {
    console.log("Hepsi geldi!");
  })
  .catch(hata => {
    // Herhangi biri başarısız olursa burası çalışır
  });
```

**Dikkat:** Biri bile reject olursa, tümü başarısız sayılır.

#### Promise.allSettled - Hepsinin Sonucunu Al

Hepsi bitsin, başarılı veya başarısız farketmez:

```javascript
Promise.allSettled([p1, p2, p3])
  .then(sonuclar => {
    sonuclar.forEach(sonuc => {
      if (sonuc.status === 'fulfilled') {
        console.log('Başarılı:', sonuc.value);
      } else {
        console.log('Başarısız:', sonuc.reason);
      }
    });
  });
```

#### Promise.race - İlk Gelen Kazanır

Hangisi önce biterse onun sonucunu al:

```javascript
const yavas = new Promise(resolve => setTimeout(() => resolve('Yavaş'), 2000));
const hizli = new Promise(resolve => setTimeout(() => resolve('Hızlı'), 500));

Promise.race([yavas, hizli])
  .then(sonuc => console.log(sonuc)); // "Hızlı"
```

Timeout mekanizması için kullanışlı:

```javascript
const timeout = new Promise((_, reject) =>
  setTimeout(() => reject(new Error('Zaman aşımı!')), 5000)
);

Promise.race([fetch('/api/veri'), timeout])
  .then(sonuc => console.log(sonuc))
  .catch(hata => console.error(hata)); // 5 saniyede cevap gelmezse hata
```

#### Promise.any - İlk Başarılı Olan

race'e benzer ama sadece başarılı olanları dikkate alır:

```javascript
Promise.any([p1, p2, p3])
  .then(ilkBasarili => console.log(ilkBasarili));
```

Hepsi reject olursa `AggregateError` fırlatır.

## Async/Await - Promise'in Şeker Kaplaması

ES2017 ile gelen async/await, Promise'leri senkron kod gibi yazmamızı sağlar.

### Temel Kullanım

```javascript
async function veriGetir() {
  const sonuc = await fetch('/api/kullanici');
  const veri = await sonuc.json();
  return veri;
}
```

`await` kelimesi Promise'in resolve olmasını bekler. Ama sadece `async` fonksiyonların içinde kullanabilirsin.

### Callback Hell'i Async/Await ile Çözme

Hatırla o korkunç piramidi:

```javascript
async function tumSurec() {
  const kullanici = await kullaniciyiGetir(1);
  const siparisler = await siparisleriGetir(kullanici.id);
  const detay = await siparisDetayGetir(siparisler[0].id);
  const odeme = await odemeGetir(detay.odemeId);
  const kargo = await kargoTakip(odeme.kargoNo);

  console.log(kargo);
}
```

Senkron kod gibi görünüyor ama asenkron çalışıyor. Güzel değil mi?

### Hata Yakalama

```javascript
async function veriGetir() {
  try {
    const sonuc = await fetch('/api/kullanici');
    const veri = await sonuc.json();
    return veri;
  } catch (hata) {
    console.error("Hata oluştu:", hata);
    throw hata; // Hatayı yukarı fırlat
  }
}
```

`try/catch` kullan. Bildiğin senkron hata yakalama gibi.

### Paralel İşlemler

Dikkat! Bu yavaş:

```javascript
async function yavas() {
  const a = await islem1(); // 2 saniye
  const b = await islem2(); // 2 saniye
  // Toplam: 4 saniye
}
```

Her await bir öncekinin bitmesini bekliyor. Ama işlemler birbirinden bağımsızsa:

```javascript
async function hizli() {
  const [a, b] = await Promise.all([
    islem1(),
    islem2()
  ]);
  // Toplam: 2 saniye (paralel çalışır)
}
```

Ya da şöyle:

```javascript
async function hizli2() {
  const p1 = islem1(); // Başlat
  const p2 = islem2(); // Başlat

  const a = await p1; // Bekle
  const b = await p2; // Bekle
}
```

### Arrow Function ile

```javascript
const veriGetir = async () => {
  const sonuc = await fetch('/api/veri');
  return sonuc.json();
};
```

### IIFE (Immediately Invoked Function Expression)

Top-level await yoksa (eski Node.js veya browser):

```javascript
(async () => {
  const veri = await veriGetir();
  console.log(veri);
})();
```

### Top-Level Await

ES2022 ve modern ortamlarda modül içinde direkt kullanabilirsin:

```javascript
// module.js
const veri = await fetch('/api/veri');
export default veri;
```

## Gerçek Dünya Örneği

Bir kullanıcı profil sayfası düşün:

```javascript
async function profilSayfasiniYukle(userId) {
  try {
    // Paralel istekler
    const [kullanici, gonderiler, takipciler] = await Promise.all([
      fetch(`/api/kullanici/${userId}`).then(r => r.json()),
      fetch(`/api/kullanici/${userId}/gonderiler`).then(r => r.json()),
      fetch(`/api/kullanici/${userId}/takipciler`).then(r => r.json())
    ]);

    return {
      kullanici,
      gonderiler,
      takipciler,
      yuklenmeTarihi: new Date()
    };
  } catch (hata) {
    console.error('Profil yüklenemedi:', hata);
    return null;
  }
}

// Kullanım
const profil = await profilSayfasiniYukle(123);
if (profil) {
  renderProfil(profil);
} else {
  gosterHataMesaji();
}
```

## Yaygın Hatalar ve Çözümleri

### 1. await Unutmak

```javascript
// YANLIŞ
async function hatali() {
  const veri = fetch('/api/veri'); // Promise döner, veri değil!
  console.log(veri); // Promise { <pending> }
}

// DOĞRU
async function dogru() {
  const response = await fetch('/api/veri');
  const veri = await response.json();
  console.log(veri);
}
```

### 2. forEach ile await

```javascript
// YANLIŞ - await çalışmaz!
ids.forEach(async (id) => {
  await islem(id);
});

// DOĞRU - for...of kullan
for (const id of ids) {
  await islem(id);
}

// VEYA - paralel çalıştır
await Promise.all(ids.map(id => islem(id)));
```

### 3. Reject'i Yakalamamak

```javascript
// YANLIŞ - hata yakalanmaz
async function tehlikeli() {
  const veri = await fetch('/api/veri');
  return veri.json();
}
tehlikeli(); // Hata olursa? Unhandled rejection!

// DOĞRU
tehlikeli().catch(hata => console.error(hata));

// VEYA
try {
  await tehlikeli();
} catch (hata) {
  console.error(hata);
}
```

## Özet: Hangisini Ne Zaman Kullan?

| Yöntem | Ne Zaman |
|--------|----------|
| Callback | Event listener'lar, basit tek seferlik işler |
| Promise | Kütüphane yazıyorsan, zincirleme işlemler |
| Async/Await | Çoğu durumda (en okunabilir) |
| Promise.all | Paralel bağımsız işlemler |
| Promise.race | Timeout, ilk cevap yeter senaryoları |

## Son Söz

JavaScript'in asenkron yapısı başta kafa karıştırıcı olabilir. Ama mantığını kavradıktan sonra çok güçlü bir araç haline geliyor.

Şunu unutma:
- **Callback**: Tarihin tozlu sayfaları (ama hala event'lerde kullanılıyor)
- **Promise**: Callback hell'in ilacı
- **Async/Await**: Promise'in okunabilir hali

Günümüzde async/await tercih ediliyor. Kod daha temiz, hata ayıklama daha kolay. Ama Promise'leri de iyi anla çünkü async/await'in altında Promise var.

Pratik yap, gerçek projeler yaz. Bir süre sonra asenkron düşünmek doğal gelecek.

---

*Asenkron JavaScript hakkında soruların varsa yorumlarda paylaş. Hep birlikte öğrenelim!*
