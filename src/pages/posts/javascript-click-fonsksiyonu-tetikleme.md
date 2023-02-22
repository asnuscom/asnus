--- 
title: Javascript ile bir elementin click fonksiyonu nasıl tetiklenir? 
subtitle: >- 
  JQuery kullanmadan pure javascript ile bir html elementinin tıklanması nasıl tetikleneceğini inceleyelim. 
date: 2023-01-13 
thumb_img_alt: '' 
content_img_alt: '' 
excerpt: '' 
canonical_url: '' 
author: sametsunman 
template: post 
thumb_img_path: images/javascript-click-trigger.jpg 
content_img_path: images/javascript-click-trigger.jpg 
---

Bu aslında JQuery ile oldukça basit.
Örneğin 'blah' id'li bir element aşağıdaki kod ile basitçe tetiklenebilir.

```
$('#blah').trigger('click');
```

Ancak, temel javascriptte bir kaç kod daha yazılmalı. Bu durumda aşağıdaki şekilde kullanabiliyoruz.

```
var event = document.createEvent("Event");
event.initEvent("click", false, true);
var element = document.getElementById("blah");
element.dispatchEvent(event);
```

Burdana sonrası sizin hayal gücünüze bağlı, ister bunu bir fonksiyon içerisinde kullanın, isterseniz de modern ulaşamadığınız javascript kütüphaneleri için kullanın.

Örneğin aşağıdaki örnekte ben, 'devextreme' kütüphanesindeki delete butonunu tetiklemek için kullandım:
![](http://asnus.com/images/javascript-click-trigger.jpg)

