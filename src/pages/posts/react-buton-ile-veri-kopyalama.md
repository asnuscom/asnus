---
title: React'te Component içindeki yazı nasıl panoya kopyalanır?
subtitle: >-
  Bir buton yardımıyla, component içindeki metini ya da zengin veriyi pano'ya(clipboard'a) nasıl kopyalanacağını anlatacağım.
date: '2022-10-05'
thumb_img_alt: ''
content_img_alt: ''
excerpt: ''
canonical_url: ''
author: sametsunman
template: post
thumb_img_path: images/copyToClipBoard.jpg
content_img_path: images/copyToClipBoard.jpg
---

React projemde aşağıdaki gibi farklı componentlerden oluşan bir yapım vardı. Buradaki tüm yazılanları müşteri bir buton yardımı ile kopyalamak istiyordu. 


![useMemo Çıktısı](https://asnus.com/images/copyToClipBoard.png)

Bunun için bir fonksiyon tanımlayıp buton ile çağırarak yazıların kopyalanmasını sağlayabildik. Fonksiyonumuz aşağıdaki gibi:

```

const childRef = useRef();

const copyToClipBoard = () => {

  
  const range = document.createRange();
  range.selectNode(childRef.current);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  document.execCommand('copy');
  window.getSelection().removeAllRanges();
  
}


```

Yukarıdaki ref.current'i useRef ile kopyalamak istediğimiz component'e tanımladık.

```

return(
<div>
  <div ref={childRef}>
    <span style={{color:red}}>Kopyalanacak Veri</span>
  </div>
  <button onClick={() => copyToClipBoard()}>Kopyala</button>
</div>
)

```

İşte bu kadar! Butona tıklayarak yazımızı stil ile beraber panoya kopyalayabilir istediğimiz yere yapıştırabiliriz.

