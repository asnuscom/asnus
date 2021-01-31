---
title: .NET Core Web API'da PUT ve DELETE için CORS Hatası
author: sametsunman
subtitle: >-
  Üzerinde çalıştığımız bir projede yerel makinede sorun yokken iis üzerinde
  GET,POST gibi isteklerde sorun olmazken önyüzde(React, Axios) PUT ve DELETE
  için cors hatası alıyorduk. 
date: '2020-11-26'
thumb_img_alt: web-dav
content_img_alt: web-dav
excerpt: >-
canonical_url: ''
template: post
thumb_img_path: images/webDav.png
content_img_path: images/webDav.png
---

İnternetten araşttırdığımda ise aşağıdaki yöntemi buldum.

Sorunumuz .Net Core'un Web API tarafında varsayılan olarak yalnızca GET, POST, OPTIONS ve HEAD isteklerine izin vermesinden kaynaklı. PUT ve DELETE’e izin vermek için, IIS'te Web.Config dosyasından aşağıdaki gibi WebDAV işleyicisini ve modülünü istek kanalından kaldırmanız gerekiyor. Böylece servislerimiz sorunsuzca çalışıyor


```
<system.webServer>
  .
  .
  
  <handlers>
      <remove name="WebDAV" />
    </handlers>
    
    <modules runAllManagedModulesForAllRequests="true">
      <remove name="WebDAVModule"/>
    </modules>
    
  .
  .
</system.webServer>
```


_Kaynak: https://stackoverflow.com/questions/40776787/how-to-get-cors-to-work-with-asp-net-core-web-api-server-angular-2-client_
