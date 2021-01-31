---
author: sametsunman
title: Javascript'te bir nesne dizisi nasıl sıralanır?
subtitle: >-
  Sort metoduyla bir diziyi sıralamak oldukça kolay, ancak bu dizi, bir nesne
  dizisiyse işimiz biraz daha karmaşık. Hadi bakalım.
date: '2020-03-16'
thumb_img_alt: javascript-sorting
content_img_alt: javascript-sorting
excerpt: >-
  Sort metoduyla bir diziyi sıralamak oldukça kolay, ancak bu dizi, bir nesne
  dizisiyse işimiz biraz daha karmaşık. Hadi bakalım.
canonical_url: ''
template: post
thumb_img_path: images/javascript-sorting.png
content_img_path: images/javascript-sorting.png
---
itemList adında json formatında bir nesnemiz olsun:

```
var itemList = [{id:1,name:'samet'},{id:2,name:'ihsan'},{id:3,name:'şule'},{id:4,name:'alp'},]
```

Bu listeyi isme göre alfabetik sıraya dizmek için aşağıdaki fonksiyonu kullanabiliriz:

```

  var newItemList = itemList.sort(this.compare);

  compare(a, b) {

    let comparison = 0;
    if (a.name > b.name) {
      comparison = 1;
    } else if (a.name < b.name) {
      comparison = -1;
    }
    return comparison;
  }
```

Yada ES6 kullanıyorsanız şu şekilde çok daha kısa şekilde yapabilirsiniz:

```

  var newItemList = itemList.sort((a, b) => a.name.localeCompare(b.name);
  
```