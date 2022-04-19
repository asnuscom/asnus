---
title: React - Custom Hook Nedir ve Nasıl Kullanılır?
subtitle: >-
  Hook, React'ın 18.6 versiyonu ile kodlarımıza dahil olan yapılardır. Class component yapısına gerek olmadan, function component içerisinde de state yapısını kullanabilmemize olanak tanır.
date: '2022-04-19'
thumb_img_alt: ''
content_img_alt: ''
excerpt: ''
canonical_url: ''
author: ihsansunman
template: post
thumb_img_path: images/reactCustomHook.png
content_img_path: images/reactCustomHook.png
---
Custom Hook ise tekrarlanan kodun önüne geçebilmemiz adına ortaya çıkan bir yapıdır. Bir Hook yapısını birden fazla kullanmamız gerektiğinde kullanırız. Böylelikle daha temiz bir kod yapısı elde ederiz.

Örnek bir yapıyı birlikte deneyelim: 

> İlgili kod yapısına doğrudan [bu adresten](https://codesandbox.io/s/customhook-asnus-zwl5rt) erişebilirsiniz.

Öncelik olarak customHook.js dosyası oluşturarak buraya kullanacağımız Custom Hook yapısını tanımlayalım.

```
import { useState, useEffect } from "react";

function useCustomHook(initializer, componentName) {
  // "set" diyerek hook yapımızı oluşturuyoruz.
  const [counter, setCounter] = useState(initializer);

  // setCounter'i çağırarak "counter" sayımıza +1 vereceğimiz fonksiyonu oluşturuyoruz.
  function resetCounter() {
    setCounter(counter + 1);
  }

  useEffect(() => {
    // useEffect kullanarak counter değiştiğinde console.log çıktısını sağlıyoruz.
    console.log(componentName + " butonuna " + counter + " kere tıklandı.");
  }, [counter, componentName]);
   
  // counter değiştiğinde resetCounter fonksiyonun çağrılmasını sağlıyoruz.
  return resetCounter;
}

export default useCustomHook;
```

Bu tanımları sağladığımızda Custom Hook yapımızı oluşturmuş oluyoruz. Bu Hook yapısını farklı componentlerde kullanalım. Bunun için FirstComponent.js adlı bir dosya oluşturuyoruz.

```
import React from "react";

// Custom Hook yapısını çağrıyoruz
import useCustomHook from "../useCustomHook";

function FirstComponent(props) {
  // Custom Hook yapısına 0 ve "FirstComponent" değerlerini döndüyoruz.
  const clickedButton = useCustomHook(0, "FirstComponent");

  return (
    <div>
      <h2> Bu FirstComponent'dir.</h2>
      <button onClick={clickedButton}>Tıklayınız!</button>
    </div>
  );
}

export default FirstComponent;
```

Farkı anlayabilmemiz için SecondComponent.js adlı bir dosya daha oluşturalım. Ve Custom Hook yapısına farklı değerleri döndürelim.

```
import React from "react";

import useCustomHook from "../useCustomHook";

function SecondComponent(props) {
  const clickedButton = useCustomHook(0, "SecondComponent");

  return (
    <div>
      <h2> Bu SecondComponent'dir. </h2>
      <button onClick={clickedButton}>Tıklayınız!</button>
    </div>
  );
}

export default SecondComponent;
```

Son işlem olarak bu iki yapımızı App.js de çağıralım. Ve çıktımızı kontrol edelim.

```
import React from "react";
import FirstComponent from "./components/FirstComponent";
import SecondComponent from "./components/SecondComponent";

function App() {
  return (
    <div className="App">
      <h1>Merhaba Dünya!</h1>
      <FirstComponent />
      <SecondComponent />
      <p>ASNUS</p>
    </div>
  );
}

export default App;
```

Çıktımızı aşağıdaki gibi almamız gerekmektedir. Böylelikle tek bir hook oluşturarak ayrı componentlerde ayrı değerler dönebildik. 

![Custom Hook Çıktısı][https://asnus.com/custom_hook_cikti.png]
