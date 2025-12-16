---
author: sametsunman
title: "React Hooks: Kafanı Karıştırmadan Öğren"
subtitle: >-
  useState, useEffect, useRef derken kafan mı karıştı? Merak etme, hepimiz
  oradan geçtik. Bu yazıda React Hooks'u sanki kahve içerken sohbet ediyormuşuz
  gibi anlatacağım.
date: '2025-12-05'
thumb_img_alt: 'react hooks'
content_img_alt: 'react hooks'
excerpt: >-
  useState, useEffect, useRef derken kafan mı karıştı? Merak etme, hepimiz
  oradan geçtik. Bu yazıda React Hooks'u sanki kahve içerken sohbet ediyormuşuz
  gibi anlatacağım.
canonical_url: ''
template: post
thumb_img_path: images/react-hooks.png
content_img_path: images/react-hooks.png
---
Hatırlıyor musun, eskiden React'ta class component yazardık? `this.state`, `this.setState`, `componentDidMount`... Bir sürü şey ezberlemen gerekirdi. Sonra 2019'da React ekibi dedi ki: "Yeter artık, hayatınızı kolaylaştıralım." Ve Hooks doğdu.

Şimdi gel, bu hook'ları bir güzel anlatalım.

## useState - En Temel Arkadaşın

Diyelim ki bir sayaç yapıyorsun. Eskiden class component yazıp `this.state` falan derdin. Şimdi?

```javascript
import { useState } from 'react';

function Sayac() {
  const [sayi, setSayi] = useState(0);

  return (
    <div>
      <p>Sayı: {sayi}</p>
      <button onClick={() => setSayi(sayi + 1)}>Artır</button>
    </div>
  );
}
```

İşte bu kadar. `useState(0)` diyorsun, sana iki şey veriyor:
- `sayi`: Şu anki değer
- `setSayi`: Değeri değiştirmek için kullanacağın fonksiyon

Parantez içindeki `0` başlangıç değeri. String, array, object ne istersen koyabilirsin.

### Küçük Bir İpucu

State'i güncellerken önceki değere ihtiyacın varsa, şöyle yap:

```javascript
setSayi(oncekiDeger => oncekiDeger + 1);
```

Neden mi? Çünkü React bazen state güncellemelerini toplu yapar. Bu şekilde her zaman en güncel değeri alırsın.

## useEffect - Yan Etkilerin Kralı

"Yan etki" kulağa kötü bir şey gibi geliyor ama değil. API'den veri çekmek, DOM'u manuel değiştirmek, timer kurmak... Bunların hepsi yan etki.

```javascript
import { useState, useEffect } from 'react';

function Profil({ userId }) {
  const [kullanici, setKullanici] = useState(null);

  useEffect(() => {
    // Component yüklendiğinde veya userId değiştiğinde çalışır
    fetch(`/api/kullanici/${userId}`)
      .then(res => res.json())
      .then(data => setKullanici(data));
  }, [userId]); // Bağımlılık dizisi

  if (!kullanici) return <p>Yükleniyor...</p>;
  return <h1>{kullanici.isim}</h1>;
}
```

O sondaki `[userId]` çok önemli. React'a "sadece userId değiştiğinde bu effect'i tekrar çalıştır" diyorsun.

### Bağımlılık Dizisi Olayı

- `[]` (boş dizi): Sadece component ilk yüklendiğinde çalışır
- `[userId]`: userId her değiştiğinde çalışır
- Hiç yazmazsan: Her render'da çalışır (genelde istemezsin bunu)

### Temizlik Yapma

Bir timer kurdun veya bir event listener ekledin. Component kaldırılınca bunları temizlemen lazım, yoksa memory leak olur:

```javascript
useEffect(() => {
  const timer = setInterval(() => {
    console.log('Tick!');
  }, 1000);

  // Cleanup fonksiyonu
  return () => {
    clearInterval(timer);
  };
}, []);
```

## useRef - DOM'a Dokunmak İstediğinde

Bazen bir input'a focus vermek veya bir elementin boyutunu ölçmek istersin. İşte useRef bunun için:

```javascript
import { useRef } from 'react';

function Form() {
  const inputRef = useRef(null);

  const focusla = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focusla}>Input'a Focusla</button>
    </div>
  );
}
```

### useRef'in Gizli Süper Gücü

useRef sadece DOM için değil. Render'lar arasında bir değeri saklamak istiyorsan ama bu değer değiştiğinde yeniden render olmasını istemiyorsan, useRef kullan:

```javascript
function Zamanlayici() {
  const renderSayisi = useRef(0);

  renderSayisi.current += 1;

  console.log(`Bu component ${renderSayisi.current} kez render oldu`);

  // ...
}
```

## useMemo - Gereksiz Hesaplamaları Önle

Diyelim ki çok ağır bir hesaplama yapıyorsun. Her render'da tekrar hesaplanmasını istemezsin:

```javascript
import { useMemo } from 'react';

function Liste({ items, filtre }) {
  const filtrelenmisListe = useMemo(() => {
    console.log('Filtreleme yapılıyor...');
    return items.filter(item => item.includes(filtre));
  }, [items, filtre]);

  return (
    <ul>
      {filtrelenmisListe.map(item => <li key={item}>{item}</li>)}
    </ul>
  );
}
```

`items` veya `filtre` değişmedikçe, filtreleme tekrar yapılmaz. Önceki sonuç kullanılır.

### Ama Dikkat!

Her şeyi useMemo'ya sarma. useMemo'nun kendisi de bir maliyet. Sadece gerçekten ağır işlemlerde kullan.

## useCallback - Fonksiyonları Hafızaya Al

Bu biraz useMemo'ya benziyor ama fonksiyonlar için:

```javascript
import { useCallback } from 'react';

function Uygulama() {
  const [sayi, setSayi] = useState(0);

  const pisBirsey = useCallback(() => {
    console.log('Tıklandı!');
  }, []);

  return <Buton onClick={pisBirsey} />;
}
```

`Buton` component'i `React.memo` ile sarılmışsa, `tikla` fonksiyonu her render'da yeniden oluşmaz. Böylece `Buton` gereksiz yere render olmaz.

## useContext - Prop Drilling'e Son

10 seviye derinlikte bir component'e veri mi geçirmen gerekiyor? Her seviyede prop olarak mı taşıyacaksın? Hayır!

```javascript
import { createContext, useContext } from 'react';

// Context oluştur
const TemaContext = createContext('light');

// Provider ile sar
function Uygulama() {
  return (
    <TemaContext.Provider value="dark">
      <Sayfa />
    </TemaContext.Provider>
  );
}

// Derinlerde bir yerde kullan
function DerinComponent() {
  const tema = useContext(TemaContext);
  return <div className={tema}>Tema: {tema}</div>;
}
```

Artık aradaki tüm component'lere prop geçirmene gerek yok.

## useReducer - Karmaşık State İçin

useState yetmiyorsa, birden fazla state birbiriyle bağlantılıysa, useReducer kullan:

```javascript
import { useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'artir':
      return { count: state.count + 1 };
    case 'azalt':
      return { count: state.count - 1 };
    case 'sifirla':
      return { count: 0 };
    default:
      return state;
  }
}

function Sayac() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Sayı: {state.count}</p>
      <button onClick={() => dispatch({ type: 'artir' })}>+</button>
      <button onClick={() => dispatch({ type: 'azalt' })}>-</button>
      <button onClick={() => dispatch({ type: 'sifirla' })}>Sıfırla</button>
    </div>
  );
}
```

Redux'a benziyor değil mi? Zaten Redux'un temel mantığı bu.

## React 19 ile Gelen Yenilikler

React 19 ile birkaç güzel şey geldi:

### use() - Artık Promise'leri Direkt Kullan

```javascript
import { use } from 'react';

function Kullanici({ userPromise }) {
  const kullanici = use(userPromise);
  return <h1>{kullanici.isim}</h1>;
}
```

### useFormStatus - Form Durumunu Takip Et

```javascript
import { useFormStatus } from 'react-dom';

function GonderButonu() {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending}>
      {pending ? 'Gönderiliyor...' : 'Gönder'}
    </button>
  );
}
```

### useOptimistic - İyimser Güncellemeler

Kullanıcı bir şey yaptığında, sunucu cevabını beklemeden UI'ı güncelle:

```javascript
import { useOptimistic } from 'react';

function Yorumlar({ yorumlar }) {
  const [iyimserYorumlar, iyimserEkle] = useOptimistic(
    yorumlar,
    (state, yeniYorum) => [...state, yeniYorum]
  );

  // Form gönderildiğinde iyimserEkle çağır
  // Sunucu cevabını beklemeden yorum görünür
}
```

## Kendi Hook'unu Yaz

En güzel şeylerden biri: Kendi hook'unu yazabilirsin!

```javascript
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

// Kullanımı
function Ayarlar() {
  const [tema, setTema] = useLocalStorage('tema', 'light');
  // ...
}
```

## Hook Kuralları (Bunları Ezberle!)

1. **Hook'ları sadece en üst seviyede çağır.** Döngü, koşul veya iç fonksiyonlarda kullanma.

```javascript
// YANLIŞ
if (kosul) {
  const [deger, setDeger] = useState(0);
}

// DOĞRU
const [deger, setDeger] = useState(0);
if (kosul) {
  // deger'i burada kullan
}
```

2. **Hook'ları sadece React fonksiyonlarında çağır.** Normal JavaScript fonksiyonlarında değil.

## Son Sözler

Hook'lar React'ı çok daha keyifli hale getirdi. Başta biraz kafa karıştırıcı olabilir ama bir kere alıştın mı, class component'lere geri dönmek istemezsin.

En önemli üçlü: `useState`, `useEffect`, `useRef`. Bunları iyi öğren, gerisi gelir.

Takıldığın yer olursa, React dökümantasyonu gerçekten çok iyi. Bir de pratik yap, bol bol yaz. Yazarak öğrenilir bu işler.

---

*Hooks hakkında aklına takılan bir şey varsa yorumlarda sor. Hep beraber öğrenelim!*
