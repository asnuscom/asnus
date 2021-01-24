---
title: Excelde çalışma kitabını otomatik kaydetme
subtitle: lorem-ipsum
date: '2021-01-24'
thumb_img_alt: lorem-ipsum
content_img_alt: lorem-ipsum
excerpt: lorem-ipsum
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



İyi çalışmalar...
