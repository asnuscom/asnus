---
author: sametsunman
title: JavaScript ile Harflerden Avatar Resmi Oluşturma
subtitle: ''
date: '2019-11-03'
thumb_img_alt: canvas-avatar
content_img_alt: canvas-avatar
excerpt: >-
  Kullanıcıların profil resmi olmadığında insan silüeti göstermek yerine isminin
  baş harflerinden bir resim oluşturabiliriz. Böylece her kullanıcının kendine
  özgü profil resmi olacak. Hadi Javascript ile nasıl yapıldığına bakalım.
canonical_url: ''
template: post
thumb_img_path: images/canvasAvatar.jpg
content_img_path: images/canvasAvatar.jpg
---
Kullanıcıların profil resmi olmadığında insan silüeti göstermek yerine isminin baş harflerinden bir resim oluşturabiliriz. Böylece her kullanıcının kendine özgü profil resmi olacak. Hadi Javascript ile nasıl yapıldığına bakalım.

```
          <canvas
            className="user-avatar rounded-circle mr-2"
            id="canvas"
            width="50"
            height="50"
            alt="User Avatar"></canvas>
```

Html kodumuzu body kısmına ekleyelim

```
<script>
    //Adımızı tanımlıyoruz
    var name = 'Samet Sunman';
    //Adımızın başharfini ve soyadımızın başharfini buluyoruz
    var initial = name.charAt(0) + name.charAt(name.search(" ") + 1);
    //Renk belirlemek için rastgele bir sayı belirliyoruz
    var color = Math.floor(Math.random() * 360);

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var radius = canvas.height / 2;

    ctx.translate(radius, radius);
    
    //Bir daire oluşturuyoruz
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'hsl(' + color + ', 100%, 30%)';
    ctx.fill();

    //Harfleri de dairenin üzerine ekliyoruz
    ctx.beginPath();
    ctx.font = "25px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(initial, 0, 9);
</script>
```

İşte bu kadar, ismimizin baş harflerinden rasfele renklerden avatar yapmış olduk.