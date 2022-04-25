---
title: Git ile iki projeyi birleştirme
subtitle: >-
  Merhaba arkadaşlar, bazen iki farklı projeyi birleştirmek gerekebilir. Farklı bir projeyi 
  kendi projemize entegre etmek isteriz. Veya aynı proje için iki farklı repo açılmış ve birleştirmek gerekebilir. Bu durumda bu konu size yardımcı olacaktır.
date: '2021-05-13'
thumb_img_alt: ''
content_img_alt: ''
excerpt: ''
canonical_url: ''
author: ihsansunman
template: post
thumb_img_path: images/git-project.png
content_img_path: images/git-project.png
---
İki adet repomuz olsun. Biri YENİ-PROJE, diğeri ise ESKİ-PROJE olsun. Burada yapacağımız ESKİ-PROJE dosyalarını YENİ-PROJE dosyalarının içine dahil ederek YENİ-PROJE'yi güncellemek olacaktır. Bu işlemi sağlarken git kullanmanın da güzelliğini görüyor olacağız. Demek istediğim şu; bir proje geliştiriyoruz. belli kısmı hazır olsun A kişisi bu projeyi geliştirsin. B kişisi ise bu geliştirmeden bağımsız yeri geliştirsin. Birleştirme sağlanırken bağımsız dosyalar sorunsuz entegre olurken, aynı dosyalar veya aynı satırlarda yapılan değğişiklikleri herhangi bir git sistemi (VS Code, Android Studio, Gitkraken) bize hangi kodun kalıcağını veya birleştirme sağlanıp sağlanmıyacağını soruyor olacak. Bu durum ise olası sorunları bizim kontrolümüze bırakıyor olacaktır. 

Gelelim bu işlemi nasıl sağlayacağımıza:

```
cd path/to/YENİ-PROJE
git remote add ESKİ-PROJE /path/to/ESKİ-PROJE
git fetch ESKİ-PROJE --tags
git merge --allow-unrelated-histories ESKİ-PROJE/master
git remote remove ESKİ-PROJE //Eğer ESKİ-PROJE'nin silinmesini istemiyorsanız bunu yapmayın.
```

