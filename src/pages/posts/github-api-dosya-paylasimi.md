--- 
title: Github API ile Dosya Yükleme, Düzenleme ve Silme Nasıl Yapılır? 
subtitle: >- 
  Github projenize uzaktan dosya yüklemek ve bu dosyayı düzenleme ihtiyacı duydunuz mu? 
date: 2022-11-11 
thumb_img_alt: '' 
content_img_alt: '' 
excerpt: '' 
canonical_url: '' 
author: ihsansunman 
template: post 
thumb_img_path: images/git-api.webp 
content_img_path: images/git-api.webp 
---
Şuan bu yazının bulunduğu blog Github Repo'sundan yayınlanmaktadır. Her bir yazının yayınlanması için Github Repo'suna yeni bir dosya göndermemiz gerekmektedir. Bu sebeple Github API kullanarak form yapısından dosya gönderme işlemi hazırladık. Gelin bu işlemi nasıl yaptığımızdan biraz bahsedelim.

**Dosyalara Ulaşmak**

Öncelikle Git Repo'muza ulaşabilmemiz adına `https://api.github.com/repos/asnuscom/asnus/contents` endpointini kullanabiliriz. Buradan repoya ait dosyalar ve indirme uzantılarına ulaşabiliriz. Eğer bir webform hazırlıyorsanız buradan iletişim kurulacak ise bu endpoint size dosyaları sağladığı için dosyalarınızın listesini oluşturmanıza olanak tanır.

![API Request](https://asnus.com/images/api-req.png)

**Dosya Yükleme ve Düzenleme**

Öncelikle yükleme, düzenleme ve silme işlemleri için bir tokena ihtiyacımız var. [New Token](https://github.com/settings/tokens/new) adresinden bir token almamız gerekmektedir. İzin olarak 'Repo' iznini onaylamamız yeterli olacaktır. Oluştur dediğimizde token bize verilecek. Burada dikkat edilmesi gereken nokta bu token bir kere verilecektir. Kaybetmeniz durumunda tekrar oluşturmanız gerekecektir.

```
const content = btoa(unescape(encodeURIComponent("Dosya içeriği")))
const data = JSON.stringify({
          message: `Commit Mesajı`,
          content: `${content}`,
        });
var config = {
          method: "put",
          url: `https://api.github.com/repos/${Kullanıcı İsmi}/${Repo İsmi}/contents/${Oluşturulmasını istediğiniz dosya}.txt`,
          headers: {
            Authorization: `Bearer ${Token}`,
            "Content-Type": "application/json",
          },
          data: data,
        };
axios(config)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
```

Yukarıda bulunan kod bloğunu kendi yapınıza uygun düzenliyebilirsiniz. `Dosya içeriği` yazan bölüme isterseniz bir yazıyı, isterseniz ise bir resmi koyabilirsiniz. Buraya konulan her türlü içerik Base64 formatına çevrilerek Github Reponuza iletilmektedir. Bu sebeple sorun vermemektedir. Aynı dosya ismine sahip dosya isminine ait endpointe tekrar istek attığınızda ise içerik yeni göndermiş olduğunuz haline düzenlenecektir.

**Dosya Silme**

Dosya silme işlemi yukardaki yapıya benzer bir şekilde yapılmaktadır. Bu sefer içerik göndermemize gerek bulunmamaktadır. Methodu 'DELETE' olarak düzenleyip istek attığımızda ise ilgili endpointteki dosya silinecektir. Burada yine commit mesajı yazmamız gerektiğini unutmayalım.

Bu yöntem ile projelerinize uzaktan erişebilir. Ve dilediğiniz gibi dosya gönderebilir veya silebilirsiniz.
