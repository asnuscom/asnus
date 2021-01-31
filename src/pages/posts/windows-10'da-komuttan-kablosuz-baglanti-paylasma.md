---
author: ihsansunman
title: Windows 10'da Komuttan Kablosuz Bağlantı Paylaşma
subtitle: >-
  Merhaba arkadaşlar bazen ethernetten (kablolu bağlantı) bazen ise wi-fi
  (kablosuz bağlantı) ile gelen internetin bilgisayar aracılığı ile tekrar
  kablosuz bir şekilde paylaşmamız gerekir. Yeni bilgisayarlarda "Mobil Etkin
  Nokta" sekmesi ile paylaşım sağlayabiliyoruz. Ancak eski sürüm Windows 10 ve
  eski bilgisayarlarımızda bu sekme çıkmıyor. Bundan dolayı Komut İstemcisinden
  kablosuz bağlantı paylaşmayı görelim:
date: '2020-04-12'
thumb_img_alt: ''
content_img_alt: ''
excerpt: >-
  Merhaba arkadaşlar bazen ethernetten (kablolu bağlantı) bazen ise wi-fi
  (kablosuz bağlantı) ile gelen internetin bilgisayar aracılığı ile tekrar
  kablosuz bir şekilde paylaşmamız gerekir. Yeni bilgisayarlarda "Mobil Etkin
  Nokta" sekmesi ile paylaşım sağlayabiliyoruz. Ancak eski sürüm Windows 10 ve
  eski bilgisayarlarımızda bu sekme çıkmıyor.
canonical_url: ''
template: post
thumb_img_path: images/cmd2.png
content_img_path: images/cmd2.png
---
*   Öncelikle arama kısmına "cmd" yazarak komut istemcimizi bulduktan sonra yönetici olarak başlatalım.

![image](https://raw.githubusercontent.com/asnuscom/asnus/master/static/images/cmd1.png)

*   Daha sonra ilk komutumuzu yazıyoruz:
    "`netsh wlan set hostednetwork mode=allow ssid=asnus key=ihsansunman`"
    Burada ssid paylaştışımız internetin adını ve key ise şifresini belirtir. Bunları kendimize göre ayarlıyalım. (Boşluk kullanmıyalım hata alabilirsiniz.)

![image2](https://raw.githubusercontent.com/asnuscom/asnus/master/static/images/cmd2.png)

*   Komutu girdikten sonra successfully yazısını görürsek başarılı olmuştur anlamına gelir.
*   Ayarımızı yaptıktan sonra paylaşımı başlatmak için şu komutu çalıştıralım: "`netsh wlan start hostednetwork`"
*   “The hosted network started.” bildirimini gördükten sonra Ağ Paylaşım Merkezini açıyoruz.
*   Bağdaştırıcı Ayarlarını Değiştirin sekmesine giriyoruz.

![image3](https://raw.githubusercontent.com/asnuscom/asnus/master/static/images/cmd3.png)

*   Ağ Bağlantılarında hangi internetimizi paylaşmak istiyorsak ona sağ tıklayıp paylaşım sekmesine geliyoruz.
*   “Diğer ağ kullanıcıları, bu bilgisayarın internet bağlantısı yoluyla bağlansın“ seçeneğini seçip yeni oluşturduğumuz “Yerel Ağ Bağlantısı” seçeneğini seçip tamam diyoruz.

![image4](https://raw.githubusercontent.com/asnuscom/asnus/master/static/images/cmd4.png)

Telefon, tablet veya başka bir cihazdan kontrol ettiğiniz taktirde seçtiğiniz ssid ismini görüyor olacaksınız. İyi internette gezinmeler dilerim.
