---
title: VS Code'da Github deposuna Proje Aktarmak
subtitle: ''
date: '2021-01-30'
thumb_img_alt: ''
content_img_alt: ''
excerpt: lorem-ipsum
canonical_url: ''
author: ihsansunman
template: post
thumb_img_path: images/git0.png
content_img_path: images/git0.png
---
Merhaba arkadaşlar, günümüzde birçok proje VS Code ile yazılmakta. Ve bu projeleri GitHub depolarında saklıyoruz. Peki yeni başlayanlar için bu bağlantıyı nasıl sağlayacağız ve güncellemeleri nasıl yapacağız bunu öğreneceğiz.

Öncelik olarak VS Code üzerinden yeni bir depo oluşturalım. Sol menüden "Source Control" kısmına girerek "Publish to GitHub"  butonuna tıklayarak üst kısımda çıkan bölmeden ayarlamaları yaparak depoyu oluşturuyoruz.

![](https://raw.githubusercontent.com/asnuscom/asnus/master/static/images/git1.png)

![]()

Daha sonrasında yeni bir terminal başlatmak adına yukarıdaki menüden  Terminal > New Terminal tuşlamalarını yaparak terminalimizi başlatalım.  Açılan terminale daha öncesinde de \[şu konuda]\(https://asnus.com/posts/projede-git-kullanici-adi-ve-epostasi-nasil-degistirilir/) bahsettiğimiz gibi GitHub kullanıcı adı ve mail adreslerimizi ayarlıyalım. 

\`\`\`

PS D:\Github\test> git config user.name "KULLANICIADI"
PS D:\Github\test> git config user.email "KULLANICIADI@MAIL.COM"
PS D:\Github\test> git remote add origin https://github.com/ihsansunman/test.git
PS D:\Github\test> git branch -M main
PS D:\Github\test> git push -u origin main

\`\`\`

Artık dosyalarımızın GitHub depomuzda olduğunu göreceksiniz. Ayarlamalarımızı da yaptıktan sonra düzenlemelerimizi işlemek (commit) için yine "Source Control" üzerinden aşağıda bulunan görselde "MESAJINIZ" yazan yere yapılan değişiklikleri yazarak yukarıda bulanan tik (check) işaretine basarak değğişiklerimizi ayarlıyalım. Ve en son halini görselde bulunan "Push" seçeneği ile GitHub ile eşitleyelim. Artık bu şekilde deponuzu güncelleyebilirsiniz. 

![](https://raw.githubusercontent.com/asnuscom/asnus/master/static/images/git2.png)

İyi Kodlamalar.
