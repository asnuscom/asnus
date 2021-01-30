---
author: sametsunman
title: Apache Maven Windows'a nasıl yüklenir?
subtitle: >-
  Maven bir proje yönetim aracıdır. Gelişiricilere projenin tüm yaşam döngüsüne
  müdahale edebileceği bir yapı sağlar. Proje kurulumu ve yeniden
  kullanılabilirliği kolaylaştırır. Geliştirme sürecini basitleştirir ve bu
  süreci standart hale getirir. Bunlara ek olarak proje bağımlılıklarını
  yönetmesi de Maven’ın en önemli özelliklerinden birisidir.
date: '2019-12-22'
thumb_img_alt: apache-maven
content_img_alt: apache-maven
excerpt: >-
canonical_url: ''
template: post
thumb_img_path: 
content_img_path: images/apache-maven.jpg
---
Apache Maven'in resmi sitesinde kurulumu biraz kafa karıştırıcı bulunabilir. Bu yüzden türkçe yönerge iyi olacağını düşündüm.

__Maven Kurulumu__

Önkoşullar: JDK 1.6 ya da daha üst sürümünün sisteminizde kurulu olması.


1. https://maven.apache.org/download.cgi linkine tıklayarak Maven’ın kendi sitesinden işletim sistemimize uygun olan sürümünü indiriyoruz. Kararsızsanız "Binary zip archive" olanını indirebilirsiniz.

2. İndirdiğiniz .zip uzantılı dosyayı istediğiniz yere çıkartabilirsiniz. Kuruluma gerek yoktur. Genelde C dizinine çıkartılır. Burada C içerisinde apps isimli klasöre çıkartılmış örnek üzerinden gideceğiz.

3. Kuruluma devam etmeden önce Ortam Değişkenlerinde JAVA_HOME değişkeninin tanımlandığını kontrol ediyoruz. Eğer yoksa aşağıdaki resimdeki gibi tanımlayabilirsiniz

Kontrol Paneli>Sistem Özellikleri>Gelişmiş>Ortam değişiklikleri

4. Şimdi Maven için M2_HOME ve MAVEN_HOME ortam değişkenlerini tanımlayacağız. Maven’ı nereye çıkarttıysak o dizini belirteceğiz.

![images/apache-47.png](/images/apache-47.png)

5. Son olarak yine aynı sayfadaki path değişkenine tıklayıp edit dedikten sonra en sona gidip bir noktalı virgül koyuyoruz. Ardından %M2_HOME%\bin tanımını ekliyoruz. Bu işlemi Maven komutlarını her yerden çalıştırabilmek için yapıyoruz.

![images/apache-57.png](/images/apache-57.png)

6. Maven kurulum işlemleri bu kadar. Şimdi windows komut istemini açarak mvn –version yazalım. Eğer görseldeli gibi benzer bir yazı ile karşılaşırsanız Maven düzgün bir şekilde yüklenmiş demektir.

![images/apache-64.png](/images/apache-64.png)
