---
title: Production Mod'da React Sayfa Yenilerken 404 Not Found Sorunu
subtitle: >-
  React uygulamanızı development mod'da çalıştırırken sorun yok ancak production
  mod'da yani server'a deploy ettiğinizde sayfayı yenilediğinizde yada yeni
  sekmede açtığınızda sayfa bulunamadı hatası alıyorsanız çözümü burada.
date: '2020-02-21'
thumb_img_alt: 404-not-found
content_img_alt: 404-not-found
excerpt: >-
  React uygulamanızı development mod'da çalıştırırken sorun yok ancak production
  mod'da yani server'a deploy ettiğinizde sayfayı yenilediğinizde yada yeni
  sekmede açtığınızda sayfa bulunamadı hatası alıyorsanız çözümü burada.
canonical_url: ''
template: post
content_img_path: images/404-not-found.png
thumb_img_path: images/royal-owl.png
---
Sunucunuzun config ayarlarını hangisini kullanıyorsanız aşağıdaki şekilde güncelleyin. Bu şekilde sayfalarınız doğru şekilde yönlendirilecek.


__Express__
```
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'path/to/your/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})
```

__Appache (.htaccess)__
```
RewriteBase /
RewriteRule ^index\.html$ - [L]
 RewriteCond %{REQUEST_FILENAME} !-f
 RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

__Nginx (.conf)__
```
location / {
  if (!-e $request_filename){
    rewrite ^(.*)$ /index.html break;
  }
}
```

__IIS (web.config)__
```
<configuration>
    <system.webServer>
<rewrite>
  <rules>
    <rule name="Rule1" stopProcessing="true">
      <match url="^index\.html$" ignoreCase="false" />
      <action type="None" />
    </rule>
    <rule name="Imported Rule 2" stopProcessing="true">
      <match url="." ignoreCase="false" />
      <conditions>
        <add input="{REQUEST_FILENAME}" matchType="IsFile" ignoreCase="false" negate="true" />
        <add input="{REQUEST_FILENAME}" matchType="IsDirectory" ignoreCase="false" negate="true" />
      </conditions>
      <action type="Rewrite" url="/index.html" />
    </rule>
  </rules>
</rewrite>
    </system.webServer>
</configuration>

```