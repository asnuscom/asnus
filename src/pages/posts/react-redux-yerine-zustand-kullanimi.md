---
author: sametsunman
title: "React'ta Redux Yerine Zustand Kullanımı"
subtitle: >-
  Redux'un karmaşık yapısından ve boilerplate kodlarından sıkıldıysanız, Zustand
  tam size göre. Minimal, hızlı ve öğrenmesi kolay bir state management
  kütüphanesi olan Zustand ile projelerinizi nasıl sadeleştirebileceğinizi
  keşfedin.
date: '2025-12-10'
thumb_img_alt: 'zustand'
content_img_alt: 'zustand'
excerpt: >-
  Redux'un karmaşık yapısından ve boilerplate kodlarından sıkıldıysanız, Zustand
  tam size göre. Minimal, hızlı ve öğrenmesi kolay bir state management
  kütüphanesi olan Zustand ile projelerinizi nasıl sadeleştirebileceğinizi
  keşfedin.
canonical_url: ''
template: post
thumb_img_path: images/redux-zustand.jpg
content_img_path: images/redux-zustand.jpg
---
State management, React uygulamalarının en kritik konularından biri. Yıllarca Redux bu alanda standart oldu, ancak son yıllarda daha minimal ve kullanımı kolay alternatifler ortaya çıktı. Bunların başında **Zustand** geliyor.

## Redux'un Sorunları

Redux güçlü bir araç, ancak bazı dezavantajları var:

- **Çok fazla boilerplate kod**: Action types, action creators, reducers, store configuration...
- **Öğrenme eğrisi yüksek**: Yeni başlayanlar için kavramları anlamak zor
- **Dosya yapısı karmaşık**: Basit bir state için bile birden fazla dosya gerekebiliyor
- **Bundle size**: Redux + React-Redux birlikte oldukça büyük

## Zustand Nedir?

Zustand (Almanca "durum" anlamına gelir), minimalist bir state management kütüphanesidir. Sadece **~1KB** boyutunda ve sıfır bağımlılığa sahip.

## Zustand'ın Avantajları

### 1. Minimal Boilerplate

Redux'ta basit bir counter için:

```javascript
// Redux - actions.js
export const INCREMENT = 'INCREMENT';
export const increment = () => ({ type: INCREMENT });

// Redux - reducer.js
const counterReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    default:
      return state;
  }
};

// Redux - store.js
import { createStore } from 'redux';
export const store = createStore(counterReducer);

// Redux - Component
import { useSelector, useDispatch } from 'react-redux';
const Counter = () => {
  const count = useSelector(state => state.count);
  const dispatch = useDispatch();
  return <button onClick={() => dispatch(increment())}>{count}</button>;
};
```

Zustand'da aynı işlem:

```javascript
// Zustand - store.js
import { create } from 'zustand';

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

// Zustand - Component
const Counter = () => {
  const { count, increment } = useStore();
  return <button onClick={increment}>{count}</button>;
};
```

Farkı görüyor musunuz? **Tek dosya, tek hook, işlem tamam.**

### 2. Provider Gerekmez

Redux'ta uygulamanızı `<Provider>` ile sarmalamanız gerekir. Zustand'da buna gerek yok:

```javascript
// Redux
<Provider store={store}>
  <App />
</Provider>

// Zustand - Direkt kullan, sarmalama yok!
<App />
```

### 3. TypeScript Desteği Mükemmel

Zustand, TypeScript ile sorunsuz çalışır:

```typescript
interface BearState {
  bears: number;
  increase: (by: number) => void;
}

const useBearStore = create<BearState>()((set) => ({
  bears: 0,
  increase: (by) => set((state) => ({ bears: state.bears + by })),
}));
```

### 4. Async İşlemler Çok Kolay

Redux'ta async işlemler için Redux Thunk veya Redux Saga gerekir. Zustand'da direkt yazabilirsiniz:

```javascript
const useStore = create((set) => ({
  users: [],
  loading: false,
  fetchUsers: async () => {
    set({ loading: true });
    const response = await fetch('/api/users');
    const users = await response.json();
    set({ users, loading: false });
  },
}));
```

### 5. Seçici (Selector) Performansı

Zustand, sadece kullandığınız state parçası değiştiğinde component'i yeniden render eder:

```javascript
// Sadece 'bears' değiştiğinde render olur
const bears = useBearStore((state) => state.bears);

// Sadece 'fish' değiştiğinde render olur
const fish = useBearStore((state) => state.fish);
```

### 6. Middleware Desteği

Persist, devtools, immer gibi middleware'ler kolayca eklenebilir:

```javascript
import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

const useStore = create(
  devtools(
    persist(
      (set) => ({
        count: 0,
        increment: () => set((state) => ({ count: state.count + 1 })),
      }),
      { name: 'counter-storage' }
    )
  )
);
```

### 7. LocalStorage Entegrasyonu

`persist` middleware ile state'inizi otomatik olarak localStorage'a kaydedebilirsiniz:

```javascript
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set) => ({
      theme: 'light',
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'app-settings',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
```

### 8. React Dışında da Kullanılabilir

Zustand, vanilla JavaScript'te de çalışır:

```javascript
const { getState, setState, subscribe } = useStore;

// React olmadan state'e erişim
console.log(getState().count);

// State değişikliklerini dinleme
subscribe((state) => console.log('State changed:', state));
```

## Redux vs Zustand Karşılaştırma Tablosu

| Özellik | Redux | Zustand |
|---------|-------|---------|
| Bundle Size | ~7KB + React-Redux ~5KB | ~1KB |
| Boilerplate | Çok | Minimal |
| Öğrenme Eğrisi | Yüksek | Düşük |
| Provider Gerekli | Evet | Hayır |
| TypeScript | Ek ayar gerekli | Doğal destek |
| Async İşlemler | Middleware gerekli | Doğrudan |
| DevTools | Redux DevTools | Aynı DevTools |
| Middleware | Evet | Evet |

## Ne Zaman Redux, Ne Zaman Zustand?

**Zustand tercih edin:**
- Küçük-orta ölçekli projeler
- Hızlı prototipleme
- Basit state yönetimi
- Yeni projelere başlarken

**Redux tercih edin:**
- Çok büyük ve karmaşık uygulamalar
- Time-travel debugging kritikse
- Takım zaten Redux'a alışkınsa
- Strict unidirectional data flow gerekiyorsa

## Kurulum

```bash
npm install zustand
# veya
yarn add zustand
```

## Sonuç

Zustand, React state management'ı için mükemmel bir alternatif. Daha az kod yazarak daha çok iş yapmanızı sağlıyor. Redux'un sunduğu özelliklerin çoğunu çok daha basit bir API ile sunuyor.

Yeni bir projeye başlıyorsanız veya mevcut projenizi sadeleştirmek istiyorsanız, Zustand'ı denemenizi şiddetle tavsiye ederim. Bir kere kullandıktan sonra Redux'a geri dönmek istemeyeceksiniz!

---

*Zustand hakkında sorularınız varsa yorumlarda belirtebilirsiniz. İyi kodlamalar!*
