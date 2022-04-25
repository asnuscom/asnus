---
title: React - Nedir Bu React?
subtitle: >-
  React nedir sorusuna verilebilecek en kısa cevap "Javascript Kütüphanesi" olacaktır.
  Peki neden buna ihtiyaç duyduk? Neden kütüphane oluşturulması gerekti, bunları cevaplamamız gerekir.
date: '2022-04-15'
thumb_img_alt: ''
content_img_alt: ''
excerpt: ''
canonical_url: ''
author: ihsansunman
template: post
thumb_img_path: images/react-1.png
content_img_path: images/react-1.png
---
Vanilla Javascript'te _(console veya document çıktı sunan, JQuery gibi her hangi bir kütüphaneye sahip olmayan Javascript'in yalın halidir.)_ efor sarf ederek yaptığımız bir işlemi React ile daha az efor ve kod yapısı ile yapabiliriz.

Javascript imperative bir programlama dilidir. Yani her işlemi tek tek açıklamamız ve bildirmemiz gereken bir yapısı vardır. Örneğin bir H1 elementi oluşturalım ve bunu sayfamızın "body" kısmına ekleyelim. 

```
const siteHeader = document.createElement("h1");  
siteHeader.innerHtml = "Siteme Hoşgeldiniz"; 
document.body.append(siteHeader);
```

Burada Vanilla Javascript kullanarak öncelik olarak h1 elementi oluşturduk. İçerisine "Siteme Hoşgeldiniz" yazısını yazdırdık. Son olarak ise body kısmına bu elementimizi aktarmış olduk.

Aynı işlemi declarative programlama kullanan react ile yaptığımızda ise sadece ne yapmak istediğimizi bildirmemiz yeterli olacaktır.

```
return(
     <h1>Siteme Hoşgeldiniz</h1>
)
```

Gördüğünüz gibi XML yapısı gibi sadece tagleme yaparak react kütüphanesine h1 elementi içerisine yazı yazdırmak istediğimizi bildirdik. Daha az kod ile aynı çıktıyı almış olduk. 

Burada dikkat etmemiz gereken unsur ise return dönerken wrapper element kullanmamız gerektiği olacaktır. Tek çıktı yapması sebebi ile return içerisinde tek bir element olmalı. Diğer elementler bu elemente dahil olmalıdır. 

```
return(
    <div>Hello</div>
    <div>React</div>
)
```

Bu şekilde olduğunda iki farklı element olduğundan hata alırız. Ancak bu iki elementi tek bir element içerisinde döndürdüğümüzde hata almadan çıktımızı görürüz.

```
return(
    <div>
    <div>Hello</div>
    <div>React</div>
    </div>
)
```
