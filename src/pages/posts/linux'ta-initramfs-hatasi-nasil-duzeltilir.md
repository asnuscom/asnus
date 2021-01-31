---
author: ihsansunman
title: Linux'ta Initramfs Hatası Nasıl Düzeltilir?
subtitle: ihsansunman
date: '2019-12-19'
thumb_img_alt: ''
content_img_alt: ''
excerpt: >-
  Bu hata genelde disk üzerinde bir sorunla karşılaşıldığında bu hatayı
  ekranımızda görürüz. Sistem işlem anında kapandığında veya diskinizde bad
  sector gibi ciddi bir sorun oluştuğunda bu hatayı alırız. 
canonical_url: ''
template: post
thumb_img_path: images/initramfs.jpg
content_img_path: images/initramfs.jpg
---
## Initramfs Hatası Nedir? 

  Bu hata genelde disk üzerinde bir sorunla karşılaşıldığında bu hatayı ekranımızda görürüz. Sistem işlem anında kapandığında veya diskinizde bad sector gibi ciddi bir sorun oluştuğunda bu hatayı alırız. 

## Initramfs Hatası Çözümü 

Öncelikle yanımızda Linux kurulum USB’si veya CD’si olması lazım çünkü sağlam çalışan bir linux gerekiyor. Linux’u USB üzerinden başlatalım. Daha sonrasında Uç Birimi açalım.  

    sudo fsck /dev/sda1 

Yukarıdaki komutu başlatalım. Sda1 bizim dosya sistemimizin neresi olduğunu belirtir. Eğer farklı bir konuma kurulum yaptıysanız sda1 kısmını kendinize göre lütfen düzeltiniz. Fsck kısmı dosya sistemimizin durumunu kontrol eden komuttur. Sorun olduğunda ise düzeltme sağlanır. Ancak sürekli bu hatayı alıyorsanız diskinizi kontrol ediniz. Çünkü bad sector olma olasılığı yüksek. Burada ise yeni bir disk almanızı tavsiye ediyorum. 