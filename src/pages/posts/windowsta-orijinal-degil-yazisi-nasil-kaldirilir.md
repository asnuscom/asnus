---
author: sametsunman
title: Windows'ta "Windows Orijinal Değil" Yazısı Nasıl Kaldırılır?
subtitle: >-
  Windows'umuz orijinal lisansına sahip olmadığımız taktirde, sağ alt köşede
  uyarı metni verir. Bu durum oldukça can sıkıcı olabilir. Çünkü tüm ekranlarda
  göze batarken, aynı zamanda arkaplan resmi de değiştirmemize izin vermez. Hadi
  nasıl kaldırabileceğimize bakalım.
date: '2019-12-02'
thumb_img_alt: windows-original-uyarisi
content_img_alt: windows-original-uyarisi
excerpt: >-
  Windows'umuz orijinal lisansına sahip olmadığımız taktirde, sağ alt köşede
  uyarı metni verir. Bu durum oldukça can sıkıcı olabilir. Çünkü tüm ekranlarda
  göze batarken, aynı zamanda arkaplan resmi de değiştirmemize izin vermez. Hadi
  nasıl kaldırabileceğimize bakalım.
canonical_url: lorem-ipsum
template: post
thumb_img_path: images/windows-original-uyarisi.jpg
content_img_path: images/windows-original-uyarisi.jpg
---
Notepad yada başka bir yazı düzenleyici programı açın ve aşağıdaki komutları yapıştırın.

```
@echo off
taskkill /F /IM explorer.exe
explorer.exe
exit
```

Farklı Kaydet (Ctrl+Shift+S) yaparak ".txt" formatını ".bat" formatına çevirin. Daha sonra kaydedip dosyaya sağ tıklayarak "Yönetici olarak çalıştır"a tıklayın.

Bilgisayarınızı yeniden başlattığınızda yazı kaybolmuş olacak