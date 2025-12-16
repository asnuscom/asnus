---
author: sametsunman
title: "Next.js: Modern Web Geliştirmenin Olmazsa Olmazı"
subtitle: >-
  React biliyorsun ama production'a çıkınca SEO, performans, routing derken
  kafan karışıyor mu? Next.js tam da bu sorunları çözmek için var. Gelin Next.js
  15 ile neler değişti, neler yapabiliyoruz birlikte bakalım.
date: '2025-12-01'
thumb_img_alt: 'nextjs'
content_img_alt: 'nextjs'
excerpt: >-
  React biliyorsun ama production'a çıkınca SEO, performans, routing derken
  kafan karışıyor mu? Next.js tam da bu sorunları çözmek için var. Gelin Next.js
  15 ile neler değişti, neler yapabiliyoruz birlikte bakalım.
canonical_url: ''
template: post
thumb_img_path: images/next_js.jpg
content_img_path: images/next_js.jpg
---
React harika bir kütüphane. Component mantığı, state yönetimi, hooks... Ama bir noktada fark ediyorsun ki sadece React yetmiyor. SEO için server-side rendering lazım, routing için kütüphane lazım, API yazmak için backend lazım, build optimizasyonu lazım...

İşte Next.js burada devreye giriyor. Vercel'in geliştirdiği bu framework, React'in üzerine production-ready özellikler ekliyor. Ve Next.js 15 ile işler daha da kolaylaştı.

## Next.js Nedir?

Next.js, React tabanlı bir full-stack web framework'ü. Şunları kutudan çıkar çıkmaz veriyor:

- Server-Side Rendering (SSR)
- Static Site Generation (SSG)
- File-based Routing
- API Routes
- Image Optimization
- Font Optimization
- Built-in CSS/Sass desteği
- Ve çok daha fazlası...

## Next.js 15 ile Gelen Yenilikler

### 1. React 19 Desteği

Next.js 15, React 19 ile tam uyumlu. Bu demek oluyor ki:

- **React Compiler**: Artık `useMemo` ve `useCallback` ile uğraşmana gerek yok. Compiler otomatik optimize ediyor.
- **Server Components**: Varsayılan olarak component'ler server'da render ediliyor.
- **Actions**: Form işlemleri çok daha kolay.

### 2. Turbopack Artık Stable

Development server'ı artık Turbopack ile çalışıyor. Ne demek bu?

```bash
next dev --turbo
```

- **%76 daha hızlı** local server başlatma
- **%96 daha hızlı** kod güncellemeleri (Fast Refresh)
- Büyük projelerde bile anında güncelleme

Webpack'e elveda!

### 3. Async Request API'leri

`headers`, `cookies`, `params` ve `searchParams` artık asenkron:

```javascript
// Eskiden
export default function Page({ params }) {
  const { id } = params;
}

// Next.js 15'te
export default async function Page({ params }) {
  const { id } = await params;
}
```

Neden mi? Daha iyi performans ve streaming desteği için.

### 4. Caching Değişiklikleri

Next.js 15'te caching varsayılan olarak kapalı. Bu önemli bir değişiklik:

```javascript
// Artık her seferinde fresh data çeker
const res = await fetch('https://api.example.com/data');

// Cache istiyorsan belirt
const res = await fetch('https://api.example.com/data', {
  cache: 'force-cache'
});
```

`GET` route handler'ları da artık varsayılan olarak cache'lenmiyor.

### 5. Partial Prerendering (PPR)

Sayfanın statik ve dinamik kısımlarını ayırabiliyorsun:

```javascript
// layout.js
export const experimental_ppr = true;
```

Statik kısımlar anında yüklenir, dinamik kısımlar streaming ile gelir. En iyi iki dünyanın birleşimi!

## App Router vs Pages Router

Next.js'te iki routing sistemi var. Yeni projelerde **App Router** kullan.

### App Router (Önerilen)

```
app/
├── page.js           → /
├── about/
│   └── page.js       → /about
├── blog/
│   ├── page.js       → /blog
│   └── [slug]/
│       └── page.js   → /blog/:slug
└── layout.js         → Tüm sayfalara uygulanır
```

### Temel Dosyalar

- `page.js` - Sayfa component'i
- `layout.js` - Paylaşılan layout
- `loading.js` - Loading UI (otomatik Suspense)
- `error.js` - Error boundary
- `not-found.js` - 404 sayfası

## Server Components vs Client Components

Next.js 15'te varsayılan olarak tüm component'ler **Server Component**.

### Server Component

```javascript
// Bu server'da çalışır (varsayılan)
async function KullaniciListesi() {
  const kullanicilar = await db.kullanici.findMany();

  return (
    <ul>
      {kullanicilar.map(k => <li key={k.id}>{k.isim}</li>)}
    </ul>
  );
}
```

Avantajları:
- Direkt veritabanına erişebilirsin
- API key'leri güvenle kullanabilirsin
- Bundle size küçülür (bu kod client'a gitmez)

### Client Component

```javascript
'use client'; // Bu satır şart!

import { useState } from 'react';

function Sayac() {
  const [sayi, setSayi] = useState(0);

  return (
    <button onClick={() => setSayi(sayi + 1)}>
      Tıklama: {sayi}
    </button>
  );
}
```

Ne zaman Client Component kullanmalı?
- `useState`, `useEffect` gibi hook'lar
- Event listener'lar (`onClick`, `onChange`...)
- Browser API'leri (`window`, `localStorage`...)
- Class component'ler

## Data Fetching

### Server Component'lerde

```javascript
async function Blog() {
  // Direkt async/await kullan
  const posts = await fetch('https://api.example.com/posts')
    .then(res => res.json());

  return (
    <ul>
      {posts.map(post => <li key={post.id}>{post.title}</li>)}
    </ul>
  );
}
```

### Cache Kontrolü

```javascript
// Her istekte fresh data
fetch(url, { cache: 'no-store' });

// Cache'le (varsayılan değil artık!)
fetch(url, { cache: 'force-cache' });

// Belirli süre cache'le
fetch(url, { next: { revalidate: 3600 } }); // 1 saat
```

### Revalidation

```javascript
// Sayfa seviyesinde
export const revalidate = 60; // 60 saniyede bir yenile

// On-demand revalidation
import { revalidatePath, revalidateTag } from 'next/cache';

revalidatePath('/blog');
revalidateTag('posts');
```

## Server Actions

Form işlemleri artık çok kolay. API route yazmana gerek yok!

```javascript
// actions.js
'use server';

export async function kullaniciEkle(formData) {
  const isim = formData.get('isim');
  const email = formData.get('email');

  await db.kullanici.create({
    data: { isim, email }
  });

  revalidatePath('/kullanicilar');
}
```

```javascript
// page.js
import { kullaniciEkle } from './actions';

export default function KullaniciFormu() {
  return (
    <form action={kullaniciEkle}>
      <input name="isim" placeholder="İsim" />
      <input name="email" placeholder="E-posta" />
      <button type="submit">Ekle</button>
    </form>
  );
}
```

JavaScript disable olsa bile çalışır!

### useFormStatus ile Loading

```javascript
'use client';
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

### useActionState ile Form State

```javascript
'use client';
import { useActionState } from 'react';
import { girisYap } from './actions';

function GirisFormu() {
  const [state, action, pending] = useActionState(girisYap, null);

  return (
    <form action={action}>
      <input name="email" />
      <input name="sifre" type="password" />
      {state?.hata && <p className="error">{state.hata}</p>}
      <button disabled={pending}>Giriş Yap</button>
    </form>
  );
}
```

## Metadata ve SEO

```javascript
// Statik metadata
export const metadata = {
  title: 'Sayfa Başlığı',
  description: 'Sayfa açıklaması',
  openGraph: {
    title: 'OG Başlık',
    description: 'OG Açıklama',
    images: ['/og-image.jpg'],
  },
};

// Dinamik metadata
export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);

  return {
    title: post.title,
    description: post.excerpt,
  };
}
```

## Image Optimization

```javascript
import Image from 'next/image';

function Profil() {
  return (
    <Image
      src="/profil.jpg"
      alt="Profil fotoğrafı"
      width={300}
      height={300}
      priority // LCP için önemli görsellerde
      placeholder="blur" // Lazy loading sırasında blur efekti
    />
  );
}
```

Next.js otomatik olarak:
- WebP/AVIF'e dönüştürür
- Responsive srcset oluşturur
- Lazy loading uygular
- Layout shift'i önler

## Route Handlers (API Routes)

```javascript
// app/api/kullanicilar/route.js
import { NextResponse } from 'next/server';

export async function GET() {
  const kullanicilar = await db.kullanici.findMany();
  return NextResponse.json(kullanicilar);
}

export async function POST(request) {
  const body = await request.json();
  const yeniKullanici = await db.kullanici.create({ data: body });
  return NextResponse.json(yeniKullanici, { status: 201 });
}
```

### Dinamik Route Handler

```javascript
// app/api/kullanicilar/[id]/route.js
export async function GET(request, { params }) {
  const { id } = await params;
  const kullanici = await db.kullanici.findUnique({ where: { id } });

  if (!kullanici) {
    return NextResponse.json({ error: 'Bulunamadı' }, { status: 404 });
  }

  return NextResponse.json(kullanici);
}
```

## Middleware

Her request'te çalışan kod:

```javascript
// middleware.js (root'ta)
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Auth kontrolü
  const token = request.cookies.get('token');

  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/giris', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/profil/:path*']
};
```

## Proje Yapısı Önerisi

```
app/
├── (auth)/
│   ├── giris/
│   │   └── page.js
│   └── kayit/
│       └── page.js
├── (main)/
│   ├── layout.js
│   ├── page.js
│   └── blog/
│       └── page.js
├── api/
│   └── kullanicilar/
│       └── route.js
├── layout.js
└── globals.css

components/
├── ui/
│   ├── Button.js
│   └── Input.js
└── Header.js

lib/
├── db.js
└── utils.js

actions/
└── kullanici.js
```

Parantez içindeki klasörler (`(auth)`, `(main)`) route group. URL'de görünmez, sadece organizasyon için.

## Deployment

Vercel'e deploy etmek çok kolay:

```bash
npm i -g vercel
vercel
```

Ya da GitHub'a push et, Vercel otomatik deploy eder.

Self-host için:

```bash
npm run build
npm start
```

Docker ile:

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Performans İpuçları

1. **Server Component'leri tercih et** - Client bundle küçülür
2. **Dynamic imports kullan** - Lazy loading

```javascript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Yükleniyor...</p>
});
```

3. **Image component'i kullan** - Otomatik optimizasyon
4. **Font optimization** - `next/font` ile

```javascript
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Layout({ children }) {
  return (
    <html className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
```

5. **Bundle Analyzer** - Neyin şişirdiğini gör

```bash
npm i @next/bundle-analyzer
```

## Son Söz

Next.js, React ekosisteminin en güçlü framework'ü. Vercel'in arkasında olması, sürekli gelişim ve mükemmel dokümantasyon ile production-ready uygulamalar yapmak hiç bu kadar kolay olmamıştı.

Next.js 15 ile gelen React 19 desteği, Turbopack, ve geliştirilmiş caching mekanizmaları framework'ü daha da güçlü kıldı.

Yeni bir proje başlıyorsan, Next.js'i kesinlikle değerlendir. Öğrenme eğrisi React biliyorsan çok düşük, kazanımlar ise çok yüksek.

---

*Next.js hakkında sorularınız varsa yorumlarda paylaşın. Birlikte öğrenelim!*
