---
title: .NET Core Projesi Ubuntu Nginx Sunucu Üzerinde Nasıl Yayınlanır?
subtitle: ''
date: '2019-09-23'
thumb_img_alt: netcore-linux-nginx
content_img_alt: netcore-linux-nginx
excerpt: "Merhaba arkadaşlar. Bu yazımda başlıktan da anlaşıldığı gibi Asp.Net ile kodladığımız bir projeyi web ortamında yayınlayıp kullanılabilir hale getirme konusuna değineceğim. Bildiğiniz gibi web uygulamalarını tamamladığımız\_ zaman internet ortamına o haliyle yükleyemeyiz. Web ortamında çalışabilecek hale getirmek için projelerimizi publish etmemiz gerekir. Hadi nasıl yapıldığına bakalım."
canonical_url: denmeee
template: post
thumb_img_path: images/cover.svg
content_img_path: images/cover.svg
---
Merhaba arkadaşlar. Bu yazımda başlıktan da anlaşıldığı gibi Asp.Net ile kodladığımız bir projeyi web ortamında yayınlayıp kullanılabilir hale getirme konusuna değineceğim. Bildiğiniz gibi web uygulamalarını tamamladığımız  zaman internet ortamına o haliyle yükleyemeyiz. Web ortamında çalışabilecek hale getirmek için projelerimizi publish etmemiz gerekir. Hadi nasıl yapıldığına bakalım.

İlk önce terminal üzerinden .NET Core sdk'sını ve runtime'ını kuralım:

```
wget -q https://packages.microsoft.com/config/ubuntu/18.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb
sudo add-apt-repository universe
sudo apt-get install apt-transport-https
sudo apt-get update
sudo apt-get install dotnet-sdk-2.2
sudo apt-get install aspnetcore-runtime-2.2
```

Şimdi ise projemizi yayınlayalım:

```
dotnet publish --configuration Release
```

Projemizin dosyaları şu dizinde bulunacak, "bin/Release/<framework_adi>/Publish"

Uygulamayı test edelim:

Komut satırından uygulamayı çalıştırın: dotnet <uygulama_adi>.dll.
Bir tarayıcıda, uygulamanın Linux üzerinde varsayılan olarak http://localhost:5000 adresinde çalışıyor olmalı.

Nginx'i kuralım:

```
sudo apt-get install nginx
sudo service nginx start
sudo service nginx status
```

Ve config dosyalarını düzeltelim:

```
sudo nano /etc/nginx/sites-available/default
```

aşağıdaki şekilde düzeltelim:

```
server 
{
   listen 81; 
   location / 
   {      
      proxy_pass http://localhost:5000;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection keep-alive;
      proxy_set_header Host $host;
      proxy_cache_bypass $http_upgrade;
   }
}
```

Yaptığımız değişiklikleri kaydedelim:

```
sudo nginx -t
sudo nginx -s reload
```

Nginx'in yazılacak WebAPI servisi özelinde ilgili Kestrel Process'ini ayağa kaldıracağını bilmesi gerekiyor. IIS'in Worker Process çalışma modeline benzer bir yaklaşım olarak düşünelim. Bunun için service uzantılı bir dosya yazmak lazım. 

```
sudo gedit /etc/systemd/system/kestrel-<proje-adi>.service
```

Şu şekilde dosyayı düzenleyelim:

```
[Unit]
Description=BaseWebAPI(Standard Asp.Net Web API 2.0 project) on NGinx
 
[Service]
WorkingDirectory=/var/www/<Proje-Klasörü>
ExecStart=/usr/bin/dotnet/ /var/www/<Proje-Klasörü>/<Proje-Adi>.dll
Restart=always
RestartSec=30
SyslogIdentifier=dotnet-<Proje-Adi>
User=www-data
Environment=ASPNETCORE_ENVIRONMENT=Production
Environment=DOTNET_PRINT_TELEMETRY_MESSAGE=false
 
[Install]
WantedBy=multi-user.target
```

Ve son olarak servislerimizi çalıştıralım:

```
sudo systemctl enable kestrel-baseapi.service
sudo systemctl start kestrel-baseapi.service
```

Bu da nginx'i yeniden çalıştırıyor:

```
sudo service nginx restart
```


İşte bu kadar, sitemiz yayında :)