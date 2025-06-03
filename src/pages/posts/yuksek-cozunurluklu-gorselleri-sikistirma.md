--- 
title: Yüksek Çözünürlüklü Görselleri Sıkıştırma (Compressor.JS) 
subtitle: >- 
  Firebase gibi sistemlerin bir kotası bulunur. Bu sistemlere yüksek çözünürlüklü görseller yüklendiği taktirde istek indirme kotaları çok hızlı bir şekilde dolmaktadır. Bu gibi sorunları çözebilmek için resimlerin kalitesinden çok fazla ödün vermeden veri boyutlarını düşürmeği sağlayabiliriz. 
date: 2023-02-22 
thumb_img_alt: '' 
content_img_alt: '' 
excerpt: '' 
canonical_url: '' 
author: ihsansunman 
template: post 
thumb_img_path: images/Ekran görüntüsü_20230222_101735.png 
content_img_path: images/Ekran görüntüsü_20230222_101735.png 
---

Bu işlemi yapabilmek için [Compressor.js](https://github.com/fengyuanchen/compressorjs) isimli kütüphane bize yardımcı olacaktır. Aşağıda bulunan görsel giriş ve çıkış görsellerimizi göstermektedir. Fark edilemiyecek kadar küçük bir kayıp ile 2MB boyutlardan 50KB gibi boyutlara inebiliriz.

![Untitled](https://asnus.com/images/Untitled.png)

Öncelikle kütüphanemizi projemize dahil edelim.

```jsx
npm install compressorjs
```

Aşağıda bulunan örnek bir React projesinde olacaktır.  İlgili kütüphaneyi çağırarak %40 kalite düşürerek yeni bir görsel oluşturmasını sağlayalım.

```jsx
import React, { useState } from "react";
import Compressor from "compressorjs";

const FileInput = () => {
  const [file, setFile] = useState(null);

  const compressorImage = (file) => {
    // Eğer bir dosya gelmediyese fonksiyonu kırmak için kontrol sağlanır.
    if (!file) {
      return;
    }
    new Compressor(file, {
      // Kalite %40, genişlik ise maksimum 1000px olacak şekilde ayarlamalar verilir.
      // Bu ayarlamaları kendinize göre ayarlayabilirsiniz.
      quality: 0.4,
      maxWidth: 1000,
      success(result) {
        // Firebase File türünde veri istediği için çıkan görüntüyü dönüştürüyoruz.
        const outFile = new File([result], file.name, { type: result.type });
        // Sonuç görseli kullanabilmek için tanımlanan state'de aktarırız.
        setFile(outFile);
      },
      error(err) {
        console.log(err.message);
      },
    });
  };

  return (
    <>
      <input
        type="file"
        onChange={(event) => {
          compressorImage(event.target.files[0]);
        }}
        accept="/image/*"
      />
    </>
  );
};

export default FileInput;
```

Artık çıktımızı istediğimiz gibi kullanabiliriz. Doğrudan firebase gibi sistemlere iletebiliriz. Verilen örnekte çıkan Blob nesnesi File’a çevriliyor. Eğer Blob kullanmak isterseniz doğrudan çıkan `result` çıktısını kullanabilirsiniz.