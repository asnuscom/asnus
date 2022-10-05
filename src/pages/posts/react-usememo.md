---
title: React - useMemo Nedir ve Nasıl Kullanılır?
subtitle: >-
  useMemo, gereksiz render işleminin önüne geçmek sebebi ile değişmeyen state'lere sahip sayfaların render işlemini engeller.
date: '2022-10-05'
thumb_img_alt: ''
content_img_alt: ''
excerpt: ''
canonical_url: ''
author: ihsansunman
template: post
thumb_img_path: images/useMemo.jpg
content_img_path: images/useMemo.jpg
---
React ile hazırladığımız projede oluşturduğumuz state'leri farklı componentlere aktarmamız gerekebilir. Bu durumda state değişmese bile o componentlerin de render edilme sorunu ile karşılaşırız.

Herhangi bir props yollamadığımız durumlarda o sayfanın render edilmesini export ederken React.memo ile dışa aktarım yaptığımızda bu sorunu çözebiliriz.

```
import React from "react";

function Header() {
  return (
    <div>
      <div>Header</div>
    </div>
  );
}
export default React.memo(Header);

```

Ancak componentimize prop göndermek istediğimizde state değişmese dahi componentin de tekrar çalıştığını görürüz. Bu sorunu çözmek için ise oluşturduğumuz state'i useMemo kullanarak oluşturmamızdır. 

![useMemo Çıktısı](https://asnus.com/images/usememo-cikti.png)

Yukarıda görüldüğü gibi oluşturduğumuz objenin içerisi değişmesi durumunda Header componenti render ediliyor. Aşağıda bulunan kod ile inceleme sağlayabilirsiniz. 

<iframe src="https://codesandbox.io/embed/sparkling-silence-3lvgw2?autoresize=1&expanddevtools=1&fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="sparkling-silence-3lvgw2"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

[![Edit sparkling-silence-3lvgw2](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/sparkling-silence-3lvgw2?autoresize=1&expanddevtools=1&fontsize=14&hidenavigation=1&theme=dark)

Reactın bu özelliği sayesinde gereksiz renderın önüne geçebiliriz.