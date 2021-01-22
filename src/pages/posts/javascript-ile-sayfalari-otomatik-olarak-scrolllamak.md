---
title: Javascript ile sayfaları otomatik olarak scroll'lamak
subtitle: >-
  Twitter, facebook gibi akış sayfaları yüklemek için farenizin tekerini
  kullanarak sürüklemeniz gerekmektedir. Bunu javascript ile otomatik
  yapabilirsiniz.
date: '2020-07-17'
thumb_img_alt: infinityScroll
content_img_alt: infinityScroll
excerpt: >-
  Twitter, facebook gibi akış sayfaları yüklemek için farenizin tekerini
  kullanarak sürüklemeniz gerekmektedir. Bunu javascript ile otomatik
  yapabilirsiniz.
canonical_url: ''
template: post
thumb_img_path: images/infinityScroll.png
content_img_path: images/infinityScroll.png
---
Yukarıdaki gibi tarayıcınızın F12'ye basarak ya da sağ tıkta öğeyi incele diyerek geliştirici sayfasını açın. Konsol bölümüne aşağıdaki kodu yapıştırın.

```
function pageScroll() {window.scrollBy(0,100);scrolldelay = setTimeout(pageScroll,1);}pageScroll();
```

Böylece sayfa otomatik olarak aşağı inecek ve tüm sayfa yüklenecek. Sayfanın sonu varsa sonuna ulaşabileceksiniz.