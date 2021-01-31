---
author: sametsunman
title: Windows Forms uygulamasına nasıl konsol bağlanabilir?
subtitle: >-
  Daha önce oluşturduğumuz Forms uygulamasında çeşitli sebeplerden dolayı konsol
  uygulaması da kullanmak isteyebiliriz. Nasıl yapılacağına bakalım.
date: '2020-07-17'
thumb_img_alt: win-forms-console
content_img_alt: win-forms-console
excerpt: >-
  Daha önce oluşturduğumuz Forms uygulamasında çeşitli sebeplerden dolayı konsol
  uygulaması da kullanmak isteyebiliriz. Nasıl yapılacağına bakalım.
canonical_url: ''
template: post
content_img_path: images/win-forms-console.jpg
thumb_img_path: images/win-forms-console.jpg
---
__1. Yöntem__

Windows Form oluşturun...

Sonra: Project Properties (Proje Tercihleri) -> Application (Uygulama) -> Output Type (Çıkış Türü) -> Console Application (Konsol Uygulaması)

__2. Yöntem__

Aşağıdaki kodu Form1_Load ya da Main metoduna yazarak, WinForms uygulamasında konsolu kullanabilirsiniz.

```
using System.Runtime.InteropServices;

private void Form1_Load(object sender, EventArgs e)
{
    CreateConsole();
    Console.WriteLine("Hello World!");

}

[DllImport("kernel32.dll", SetLastError = true)]
[return: MarshalAs(UnmanagedType.Bool)]
static extern bool CreateConsole();
```



Böyle Form ve Konsol uygulaması birlikte çalışmış olacak. İyi çalışmalar