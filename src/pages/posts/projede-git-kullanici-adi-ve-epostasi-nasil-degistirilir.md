---
author: sametsunman
title: Projede Git kullanıcı adı ve e-postası nasıl değiştirilir?
subtitle: >-
  Git'e projemizi atarken mevcut adımızı değiştirmek istersek config ayarlarını
  değiştirmemiz gerekiyor. 
date: '2020-10-19'
thumb_img_alt: github-config
content_img_alt: github-config
excerpt: >-
  Git'e projemizi atarken mevcut adımızı değiştirmek istersek config ayarlarını
  değiştirmemiz gerekiyor. 
canonical_url: ''
template: post
content_img_path: images/github-config.png
thumb_img_path: images/github-config.png
---
## Global olarak ayarları değiştirmek
1. Komut çalıştırın (ör: git bash)
2. Kullanıcı adınızı ayarlayın:
`git config --global user.name "İSİM SOYİSİM"`
3. E-Postanızı ayarlayın:
`git config --global user.email "ORNEK@asnus.com"`
4. Son olarak e-posta ve kullanıcı adınızı teyit edin
```
# kullanıcı adı gösterme
git config user.name

# e-posta gösterme
git config user.email
```

## Tek bir proje dizini için ayarları değiştirmek
1. Komut çalıştırın (ör: git bash) ve ilgili klasörü gidin(ör: cd C:\repos)
2. Kullanıcı adınızı ayarlayın:
`git config user.name  "İSİM SOYİSİM"`
3. E-Postanızı ayarlayın:
`git config user.email "ORNEK@asnus.com"`
4. Son olarak e-posta ve kullanıcı adınızı teyit edin
```
# kullanıcı adı gösterme
git config user.name

# e-posta gösterme
git config user.email
```