--- 
title: React Native'de ENV Dosyası Nasıl Oluşturulur ve Nasıl Kullanılır? 
subtitle: >- 
  `.env` dosyası, bir proje için kullanılacak ortam değişkenlerinin (environment variables) tutulduğu bir dosyadır. Bu dosya, projenin çalıştırılacağı ortamda (örneğin, test ortamı, üretim ortamı gibi) değişebilecek olan değerlerin tutulduğu bir yerdir. 
date: 2023-01-02 
thumb_img_alt: '' 
content_img_alt: '' 
excerpt: '' 
canonical_url: '' 
author: ihsansunman 
template: post 
thumb_img_path: images/react-native-env.png 
content_img_path: images/react-native-env.png 
---

Örneğin, bir web uygulamasında kullanılan bir veritabanının adresi ve kullanıcı adı gibi bilgilerin tutulduğu bir dosya olabilir.

`.env` dosyaları genellikle bir projenin kaynak kodu ile birlikte saklanır, ancak projenin çalıştırılacağı ortamdan bağımsızdır ve bu nedenle projenin kaynak kodu deposuna yüklenmez. Bu sayede, projenin farklı ortamlarda çalıştırılması sırasında çevre değişkenlerinin değerleri değiştirilebilir.

Öncelik olarak `react-native-dotenv` paketini projemize yükleyelim.

```
npm i react-native-dotenv
```

Projemizde bulunan `babel` çeviricinin yeni eklediğimiz pakete uyumunu sağlayabilmek adına yapılandırmalarını sağlıyalım. Projemizde bulunan `babel.configure.js` dosyasını düzenliyelim. İçerisine aşağıdaki ayarlamaları sağlıyalım.

```
module.exports = {
  "plugins": [
    ["module:react-native-dotenv", {
      "moduleName": "@env",
      "path": ".env",
      "blacklist": null,
      "whitelist": null,
      "safe": false,
      "allowUndefined": true
    }]
  ]
}
```

Ortam değişkinleri için gerekli ayarlamaları sağladık. Sıra kullanımına geldi. Projemize `.env` isminde bir dosya açalım. İçerisine kullanacağımız değişkenleri belirleyelim.

![env-code](https://asnus.com/images/env-code.png)

Daha sonra oluşturduğumuz bu değişkenleri kullanacağımız dosya içerisinde değişkenlerimizi çağırıp işlemleri sağlayabiliriz.

```
import { API_KEY, APP_NAME, APP_VERSION, AUTH_DOMAIN } from '@env';

console.log(APP_NAME); // Çıktı Olarak "Asnus" ifadesi gelecektir.
```

Bu blog yazısında `react-native` projemizde ortam değişkenlerini nasıl kullanacağımıza baktık. `react-native-dotenv` npm paketini kurduktan sonra `babel.config.js` dosyamızı yapılandırdık. Son olarak, bir env dosyası oluşturduk ve kullanmak istediğimiz dosyada/kaynak kodda ortam değişkenini içe aktardık.