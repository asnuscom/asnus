---
author: sametsunman
title: Regex ile Türkçe Karakter Denetimi
subtitle: lorem-ipsum
date: '2021-01-13'
thumb_img_alt: regex
content_img_alt: regex
excerpt: lorem-ipsum
canonical_url: ''
template: post
thumb_img_path: images/regex.png
content_img_path: images/regex.png
---

```
Regex rgx = new Regex("(?:[^a-zA-Z0-9ğüşöçıİĞÜŞÖÇ!?.\\-*() ,<>'\":/=]| (?<=['\"])s)", RegexOptions.IgnoreCase | RegexOptions.CultureInvariant | RegexOptions.Compiled);
            string content = "";

            if (rgx.Matches(product.Content).Count < 150)
            {
                content = rgx.Replace(product.Content, String.Empty); 

            }
```

https://regexr.com
