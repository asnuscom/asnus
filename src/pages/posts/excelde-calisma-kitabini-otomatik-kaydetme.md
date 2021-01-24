---
title: Excelde çalışma kitabını otomatik kaydetme
subtitle: ''
date: '2021-01-24'
thumb_img_alt: lorem-ipsum
content_img_alt: lorem-ipsum
excerpt: >-
  Merhaba arkadaşlar, İş yerimde elektrik kesintisinden dolayı önemli bilgiler
  kayboluyordu, buna çözüm üretmek adına çalışma kitabını otomatik kaydetmeyi
  öğrendim ve uyguladım, Bunu sizlerle paylaşmak istedim umarım yararlı olur.
canonical_url: lorem-ipsum
author: sulesavas
template: post
---
Merhaba arkadaşlar,

İş yerimde elektrik kesintisinden dolayı önemli bilgiler kayboluyordu, buna çözüm üretmek adına çalışma kitabını otomatik kaydetmeyi öğrendim ve uyguladım, Bunu sizlerle paylaşmak istedim umarım yararlı olur.

Öncelikle Excel dosyamızı açalım. Geliştirici sekmesini aktif edelim.

*   Geliştirici sekmesini aktif etmek için;

    Dosya sekmesine tıklıyoruz aşağıda yer alan seçeneklere tıklayıp sol taraftaki şeridi özelleştir bölümünden geliştirici kutucuğunu aktif edip tamama tıklıyoruz. Geliştirici sekmemiz aktif oldu  :)

Şimdi geliştirici sekmesinden Visual Basic e tıklayalım. Açılan pencerede Insert kısmından yeni Module ekleyelim. Sonrasında ise açılan pencereye aşağıdaki kodları yapıştıralım.

'''

 Sub OtoKaydetme()

Dim wb As Workbook
Dim durtime As Integer
durtime = 1

    

With Application
.DisplayAlerts = False
.EnableEvents = False
For Each wb In Application.Workbooks
If Not wb.ReadOnly And Windows(wb.Name).Visible Then
wb.Save

        End If
    Next wb
    .DisplayAlerts = False
    .EnableEvents = True
    .OnTime Now + TimeValue("00:00:05"), "OtoKaydetme"

End With

Exit Sub

sonlandir:

End Sub

'''

*   Şimdi ise soldan BuÇalışmaKitabı dosyasını açıyoruz ve üstteki General yazan açılır menüden Workbook u seçelim ve alttaki kodu yapıştıralım.

Private Sub Workbook_Open()

Call OtoKaydetmeModule.OtoKaydetme

End Sub



Böylece yapmış olduğumuz Module ü 5 sn de bir çağıracak ve sayfamız otomatik kaydolacak.







İyi çalışmalar...
