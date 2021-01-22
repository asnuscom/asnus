---
author: ihsansunman
title: DNS Nasıl Çalışır ve Güvenlik sorunları nelerdir?
subtitle: ihsansunman
date: '2019-12-15'
thumb_img_alt: ''
content_img_alt: ''
excerpt: >-
  DNS, Domain Name System kelimelerinin kısaltılmış halidir. Türkçe karşılığı
  Alan İsimlendirme Sistemi’dir. İnternetimizin adres defterine benzetebiliriz.
  İnternette gezinmemiz için gerekli olan adresleri tutan bir sistemdir. IP
  adresini daha önceden duymuşsunuzdur. İnternette gezindiğimiz her web
  sitesinin bir IP adresi vardır. Eğer DNS olmasaydı Google ’ye girmek
  istediğimizde www.google.com adresi yerine 172.217.169.206 gibi uzun ve
  karmaşık sayılar ile web sitelere girmemiz gerekecekti.
canonical_url: ''
template: post
thumb_img_path: images/dns.png
content_img_path: images/dns.png
---
## DNS Nasıl Çalışır ve Güvenlik sorunları nelerdir?

__DNS Nedir?__

  DNS, Domain Name System kelimelerinin kısaltılmış halidir. Türkçe karşılığı Alan İsimlendirme Sistemi’dir. İnternetimizin adres defterine benzetebiliriz. İnternette gezinmemiz için gerekli olan adresleri tutan bir sistemdir.
IP adresini daha önceden duymuşsunuzdur. İnternette gezindiğimiz her web sitesinin bir IP adresi vardır. Eğer DNS olmasaydı Google ’ye girmek istediğimizde www.google.com adresi yerine 172.217.169.206 gibi uzun ve karmaşık sayılar ile web sitelere girmemiz gerekecekti. Bu hem akılda kalması çok zor hem de gereksiz bir uğraş olurdu. Bunun yerine DNS sistemi bize bu IP adresi yerine daha basit olan alan adları ile internette daha rahat gezinmemizi sağlıyor. 

__DNS Nasıl Çalışır?__

Bir web siteye girmek istedik. Adres çubuğuna girmek istediğimiz adresi girdik. Burada örnek www.google.com.tr olsun. Öncelikle tarayıcımız bu alan adını bilgisayarımızdaki çerezlere bakar. Eğer burada varsa IP adresi bulacağı için hızlı bir şekilde açacaktır. Ancak bu çerezler genelde 1 saat, 1 gün gibi bir sürede temizlenir. Girdiğimiz adres çerezlerde yoksa genelde internet sağlayıcılarımızın sunduğu DNS sunucularına gideriz. Ve orada bu alan adına karşılık gelen IP adresini bulup siteye rahatça gireriz. Peki ya bu sunucular nasıl bu kadar hızlı şekilde istediğimiz alan adının karşılığı olan IP adresi buluyor. Bu sistemi bir ağaca benzetebiliriz, dallanan bir ağaca. Örneğimize bakalım sonu tr ile bitiyor. Bu adresin hangi ülkede olduğunu belli eder. Bu sitemiz Türkiye’de bulunmakta. İkinci olarak .com yazısı ile karşılaşıyoruz. Bunlara üst düzey domain denilir. Com bir ticari kuruluş olduğunu belli eder. En sonunda ise google yani sitemizin adı yazar. Bu şekilde IP adresimizi bulunur. 

__DNS Güvenlik Sorunları Nelerdir?__

Bahsettiğim gibi bir sunucu var ve karşılık gelen IP adresi üzerinden siteye girebiliyoruz. Peki ya siber saldırganlar siz farkında olmadan karşılık gelen IP adresini değiştirdiğini düşünün. Siz bir siteye girmek istiyorsunuz ama aslında o siteye benzeyen başka bir siteye girmişsiniz. Farkında olmadan kredi kartı bilgilerini girdiğiniz anda bu bilgiler saldırganların eline geçebilir. Bu yüzden güvendiğimiz DNS servisini tercih etmenizin ne kadar önemli olduğunu anlayabiliriz. 