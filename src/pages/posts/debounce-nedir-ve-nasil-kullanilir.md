--- 
title: Debounce Nedir ve Nasıl Kullanılır? 
subtitle: >- 
  Debounce, sürekli olarak tekrarlanan işlemleri kontrol altına almak için kullanılan bir tekniktir. Örneğin, bir kullanıcının bir arama kutusuna metin girdiğini ve bu metni kullanarak bir servise istek göndermeyi düşünelim. Kullanıcı her tuşa bastığında, isteği hemen göndermek yerine belirli bir zaman dilimi sonunda göndermek isteyebilirsiniz. Bu, her tuşa basışta servisiniz üzerinde gereksiz bir yük oluşturmaktan kaçınmanıza yardımcı olur. 
date: 2023-09-25 
thumb_img_alt: '' 
content_img_alt: '' 
excerpt: '' 
canonical_url: '' 
author: ihsansunman 
template: post 
thumb_img_path: images/debounceMain.png 
content_img_path: images/debounceMain.png 
---

## Debounce Nasıl Çalışır?

Örnek üzerinden devam edelim. Kullanıcı bir **<input />** alanına aramak istediği kelimeyi yazdığında, bu kelime ile ilgili sonuçların görüntülendiği bir yapı hayal edin. Bu girdi değeri her değiştiğinde ilgili servise giderek sonuçları alacağımız bir fonksiyonumuz olsun. Ancak her tuşa bastığınızda bu işlevi çağırmak, servisinizi gereksiz yere yorabilir. İşte burada bir zamanlayıcı kullanabilirsiniz. Bu, her tuşa bastığınızda işlevin her çalıştırıldığında zamanlayıcı sıfırlanır. Bu sayede isteği göndermek için belirli bir zaman dilimini bekler. Kullanıcı yeni bir giriş yapmadıkça zamanlayıcı sıfırlanmaz ve belirlediğiniz süre sonunda istek gönderilir.

![nondebounce](https://asnus.com/images/nondebounce.png)

Yukarıda örneğini göstermiş olduğum gibi kullanıcı her bir harfi değiştirdiğinde servisimize giderek bir istek atıyoruz.  Aşağıdaki örnekte ise kullanıcı veri girişini tamamlandığında isteği gönderecektir.

![debounce](https://asnus.com/images/debounce.png)

Örnekleri canlı olarak da inceleyebilirsiniz.

[https://codesandbox.io/embed/asnus-nondebounce-ffkv9h?fontsize=14&hidenavigation=1&theme=dark](https://codesandbox.io/embed/asnus-nondebounce-ffkv9h?fontsize=14&hidenavigation=1&theme=dark)

[https://codesandbox.io/embed/asnus-debounce-dp279x?fontsize=14&hidenavigation=1&theme=dark](https://codesandbox.io/embed/asnus-debounce-dp279x?fontsize=14&hidenavigation=1&theme=dark)

## Debounce Nasıl Kullanılır?

JavaScript(ES6) ve React için debounce kullanımını inceleyelim. 400ms olarak belirlediğimiz zaman boyunca yeniden fonksiyonumuz çalıştırılmadığı durumda yazdığımız fonksiyon çalışacaktır. Ancak fonksiyon her çağrıldığında verdiğimiz zamanlayıcı sıfırlayacaktır. Verilen zamanı yapımıza uygun değiştirebiliriz. Bu yapıyı dilediğimiz yazılım diline uygun düzenleyebiliriz.

```jsx
let timer;
function getSearchResults(){
	  clearTimeout(timer);
    timer = setTimeout(() => { 
			/* İlgili işlemleri yapacak fonksiyonumuz */ 
		}, 400);
}
```

```jsx
import { useRef } from 'react';

const timerRef = useRef(null);

const getSearchResults = () => {
		clearTimeout(timerRef .current);
		timerRef.current = setTimeout(() => {
			/* İlgili işlemleri yapacak fonksiyonumuz */
		}, 400);
	};
```

Yukarıda vermiş olduğum örnekte yorum satırı olarak verdiğim satıra kullanıcının etkileşimin bitmesi durumunda sistemimize yaptırmak istediğimiz işlemi yazabiliriz. Görüldüğü gibi bu sistemi kurmak oldukça basittir. Basitliği yanı sıra, belirli sorunları çözmede de yardımcı olabilir.