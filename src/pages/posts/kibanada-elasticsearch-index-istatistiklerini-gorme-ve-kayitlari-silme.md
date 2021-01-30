---
author: sametsunman
title: Kibana'da ElasticSearch index istatistiklerini görme ve kayıtları silme
subtitle: >-
  Kibana üzerinden elastic search verilerini silmek ve veri istatistiklerini
  görmek oldukça kolay, hadi bakalım.
date: '2020-08-24'
thumb_img_alt: kibana
content_img_alt: kibana
excerpt: >-
canonical_url: ''
template: post
thumb_img_path: images/kibana.png
content_img_path: images/kibana.png
---
Kibana'daki bir index'e ait bilgileri görmek istiyorsak aşağıdaki komutu Dev Tools sekmesinden konsola yazabiliriz.

```
GET /index_name/_stats
```

Eğer bir index'in altındaki belli bir aralıktaki kayıtları silmek istiyorsak da 'lt parametresine zaman aralığı vererek  kayıtları silebiliriz. Aşağıdaki kayıtta bugünden itibaren son 1 ayın kayıtlarını silecek

```
DELETE /anlik_mail/
{
"query": {
"range": {
"@timestamp": {
"lt": "now-30d"
}
}
}
}
```
