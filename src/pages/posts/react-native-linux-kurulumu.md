---
title: React Native Linux Kurulumu
subtitle: >-
  Merhaba arkadaşlar, Linux işletim sistemleri üzerinde bir React Native
  uygulaması nasıl geliştirmek için gerekli yazılımların kurulumlarını anlatmak
  istiyorum.
date: '2020-12-26'
thumb_img_alt: react-native
content_img_alt: react-native
excerpt: >-
  Merhaba arkadaşlar, Linux işletim sistemleri üzerinde bir React Native
  uygulaması nasıl geliştirmek için gerekli yazılımların kurulumlarını anlatmak
  istiyorum.
canonical_url: ''
author: sametsunman
featured: true
template: post
thumb_img_path: images/react-native.png
content_img_path: images/react-native.png
---
Öncelikle şunu söylemeliyim Linux’ta React Native CLI ile IOS için uygulama geliştirme desteklenmiyor. O yüzden yazımızda yalnızca Android için kurulum adımlarından bahsedeceğiz.


Kendi bilgisayarımda Linux Mint 20 kurulu, ancak Ubuntu ve diğer Debian tabanlı sistemlerle kurulum, benzerlik göstermekte. Hemen uygulama geliştirmek için gereksinimlerimize bakalım.

*   NodeJS ve NPM

*   NPM

*   JDK

*   Android Studio ve SDK

*   Watchman

*   Text editörü (VS Code, ATOM, Sublime Text vb.)

*   Android Emulatörü (İsteğe Bağlı)(Genymotion vb.)

### Node JS Kurulumu

NodeJs için 10 ya da daha üst versiyonu kurmamız gerekiyor. Birden fazla kurulum yöntemi var ancak bana göre en kolay PPA ile kurulum yapmak. Dilerseniz resmi sitesinden de yardım alabilirsiniz.

<https://nodejs.org/en/download/package-manager/>

İlk adım olarak paket deposunu güncelleyin.



Sonrasında NodeJS için gerekli paketi yükleyin. Şuan son sürüm 14 versiyon olduğu için ben onu kuruyorum.



NodeJs ile birlikte npm de kurulacaktır. Ve son olarak nodejs versiyonunu kontrol edin.



Başarılı olduysa, size versiyonu verecektir.

### Java Development Kit Kurulumu

JDK da uygulama geliştirmemiz için gerekli olan bileşenlerden, kurulumu da oldukça basit. Yine gerekli durumlarda resmi site dökümasyonuna bakmanızı tavsiye ederim.

<https://www.oracle.com/java/technologies/javase-jdk15-downloads.html>

Yukarıdaki linkte öncelikle oturum açmanız gerekiyor ve sonrasında Linux x64 Debian Package (Debian kurulum paketi) indirin. İndirilen dosyayı direk açarak kurulum gerçekleştirin.

### Watchman Kurulumu

Watchman ne işe yarıyor derseniz, Facebook tarafından dosya sistemlerini izleyen ve performans açısından mutlaka önerilen bir yazılım. Kurmak için öncelikle Homebrew’i kurmak gerekiyor.

Ardından da watchman’i yükleyelim

### Android Studio Kurulumu

En önemli kısım burası, Android Studio ve Sdk kurulumu biraz zahmetli ve uzun sürmekte, sabırlı olmanız gerekiyor.

İlk adım olarak Resmi web sitesinden tar.gz dosyasını indirmeniz gerek.

<https://developer.android.com/studio>

İndirdiğiniz dosyayı bir dizine çıkarmanız gerekmekte, ben indirdiğimiz yerden local dizinine kopyalıyorum.



Daha sonra ise android studio’yu başlatmamız gerekiyor. Ancak öncesinden Menü’ye bir kısayol oluşturalım. Bunun için ise Menü’ye sağ tıklayıp yapılandıra tıklayalım. Ardından ise menü sekmesinden ‘Menü düzenleyiciyi aç’ butonuna tıklayalım. Yeni menü’ye tıklayıp komut kısmında Android Studio’yu kopyaladığımız dizinin altında bin klasöründe studio.sh dosyasını seçelim. Dilerseniz ikon da ekleyebilirsiniz. Herşey doğru şekilde yapıldıktan sonra Menü’de Android Studio’yu görebileceksiniz.

Şimdi Android Studio’yu açıp, ilk kurulumu yapalım. Bu adım internet hızınıza bağlı olarak biraz uzun sürecektir.

### Android SDK Kurulumu

Android Studio Kurulumunu yaptıktan sonra Tools>Android>SDK Manager kısmından SDK kurulumunu yapalım. Açılan pencerede sağ alttan “Show Package Details” seçimini yapalım ve sonra React Native güncel olarak Android 10'u desteklediği için menüden “Android SDK Platform 29”, “Intel x86 Atom\_64 System Image” ve “Google APIs Intel x86 Atom\_64 System Image” seçeneklerini seçerek gerekli kurulumları yapıyoruz.

### Ortam Değişkenlerinin Tanımlanması

Bilgisayarınızın ev dizini diye geçen kullanıcı dizinine gidin. Sağ tıklayıp gizli dosyaları göster diyin ve .bashrc dosyasını bir metin düzenleyicisi ile açıp aşağıdaki kodları en alta yapıştırın. Böyle Android kurulumlarınız diğer programlar tarafından erişilebilecek.

### Android Emülatör Kurulumu

Burada üç seçeneğimiz var, ilki android Studionun kendi emülatörünü kullanmak, ikincisi Genymotion gibi diğer yazılımları kullanmak ve diğeri ise kendi telefonumuzu kullanmak.

**Android Studio Emulator**

Tools>Android>AVD Manager’e tıklayarak diyalog penceresini açalım,ardından “Create Virtual Device” a tıklayalım, herhangi bir cihaz seçelim, indirdiğimiz sdk ile uyumlu bir emülatör yaratalım. Burda dikkat etmeniz gerekem bilgisayar ve uygulamanızla uygun bir sdk seçmeniz gerekiyor.

Herşey doğru şekilde yapıldıysa emülatörü başlatabilirsiniz.

**Genymotion**

Android Studio’nun oldukça hantal olmasından dolayı, kendi emülatörü yerine genymotion tercih edebilirsiniz. Ama öncesinde virtualbox kurmamız gerekiyor.



Ardından ise genymotion’ı kendi sitesinden sistemimize uygun olanını indirip yine klasöre çıkararak kuralım.

[https://www.genymotion.com/download/](https://medium.com/r/?url=https%3A%2F%2Fwww.genymotion.com%2Fdownload%2F)




Yukarıdaki kodda indirdiğimiz dosyayı opt dizinine taşıyoruz. Daha sonra ise yapmamız gereken gerekli izinleri vermek. Aşağıdaki kodları sırasıyla yapalım.



Kısayol oluşturmak için Android Studio’daki gibi yine menü düzenleyiciden “/opt/genymobile/genymotion/genymotion” komutunu ekleyebiliriz.

Emülatör’ü çalıştırdıktan sonra önce oturum açmamız gerekiyor, ardından da bir cihaz yaratmamız gerekiyor.

**Fiziksel Cihaz Bağlanması**

Emülatörler yerine kendi telefonumuzu da uygulamalarımız için kullanabiliriz ve bu windows işletim sistemine göre oldukça kolay, çünkü cihazımızın driver’ı otomatik yüklüyor.

Hemen anlatalım, ilk önce kurulum yapmamız gerekiyor.



Ardından Android Studio’u açalım, telefonumuzun geliştirici seçeneklerinden (Eğer telefonunuzda yoksa Android sürümünüze 5 kere tıklamanız gerekli) “USB Hata Ayıklama” seçeneğini aktifleştirelim, ardından usb kablo ile bağlayalım. Ve telefonunuza gelen hata ayıklama ile ilgili bildirimi kabul edelim. Böylece Android Studio’da sağ üstte telefonunuzu görebileceksiniz. Eğer görmüyorsanız. Uygulamada Cihaz ayarları kısmından kurulum yapmayı deneyebiliriniz.

### Visual Studio Code Kurulumu

Uyguluma geliştirmek için bir çok yardımcı aracı, eklentileri, kendine ait uçbirimi, git sistemi olması nedeniyle ben VS Code kullanıyorum. Dilerseniz başka IDE ya da kod düzenleyicisi de kullanabilirsiniz.

<https://code.visualstudio.com/Download> adresinden işletim sisteminize uygun deb paketini indirelim ve dosyayı direk açarak kuralım.

### React Native Uygulaması Oluşturulması ve Çalıştırılması

Herşey hazırsa bir uçbirim açalım ve ilk uygulamamızı oluşturalım:



Ardından oluşturduğumuz proje klasörünü VS Code’da açalım. Öncelikle terminal pencerimizden uygulamayı başlatalım.



Emülatörü çalıştıralım ya da fiziksel cihazımızı bağlayalım ve uygulamayı çalıştıralım. Ardından yeni bir terminalde şu kodu çalıştıralım:



Uygulamamızı çalıştırırken benim gibi envoriment ile ilgili hata alırsanız, öncelikle ortam değişkenlerini doğru şekilde tanımladığınızdan emin olun eğer işe yaramıyorsa “android/gradle/wrapper/gradle-wrapper.properties” dosyasında gradle versiyonuzu 6.5'e yükseltmeyi deneyin.

Herşey yolunda gittiyse ilk uygulamamız emülatörde göreceksiniz. Şimdi dilerseniz App.Js’ten başlayarak düzenleme yapabilirisiniz :)

İyi şanslar. Peace :)
