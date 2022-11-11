--- 
title: Javascript'te bir array object'nin içindeki veriler nasıl toplanır? 
subtitle: >- 
  Fonksiyon kullanarak bir nesne dizisinin içerisindeki belirli bir niteliklerin toplamını getirebiliriz. 
date: 2022-11-10 
thumb_img_alt: '' 
content_img_alt: '' 
excerpt: '' 
canonical_url: '' 
author: sametsunman 
template: post 
thumb_img_path: images/sumFloatingArray.png 
content_img_path: images/sumFloatingArray.png 
---
Aşağıdaki fonksiyonu kullanarak bir nesne içerisindeki belirli bir properties'lerin toplamını verir. 
arr: Array object'sini ifade eder.
name: Property ismini ifade eder.

```
	const sumFloatingArray = (arr, name) => {
		return parseFloat(arr.reduce((acc, obj) => acc + (parseFloat(obj[name]) ?? 0.0), 0) || 0);
	};
```