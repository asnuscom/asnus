---
author: sametsunman
title: .NET Core 3'te Coravel kullanarak arkaplanda çalışan job oluşturma
subtitle: >-
  Net Core'u bilmeyen yoktur, günümüzde  yaygın kullanılan bir framework.
  Platformlar arası, mimariler arasında tutarlı, komut satırı araçları, esnek
  dağıtım, uyumlu, açık kaynak gibi özelliklere sahip olması ve Microsoft
  tarafından desteklenmesi ön plana çıkıyor.
date: '2020-03-09'
thumb_img_alt: coravel
content_img_alt: ''
excerpt: >-
  Net Core'u bilmeyen yoktur, günümüzde  yaygın kullanılan bir framework.
  Platformlar arası, mimariler arasında tutarlı, komut satırı araçları, esnek
  dağıtım, uyumlu, açık kaynak gibi özelliklere sahip olması ve Microsoft
  tarafından desteklenmesi ön plana çıkıyor.
canonical_url: ''
template: post
content_img_path: images/coravel.png
---
Worker servisleri, .NET Core 3 tarafından sunulan yeni bir şablon. Şimdi, .NET Core 3 Worker hizmetini ve Coravel'i birleştirerek bir zamanlayıcı job'ını nasıl uygulanacağını görelim .

__Worker Servisi nedir?__
Worker Servisi, e-posta gönderme, sms gönderme, olay yayını, belirli bir zamanda bazı verileri tetikleme, maaş hesaplaması vb. gibi fonksiyonları arkaplanda gerçekleşterebilir.

Bir örnekle anlayalım:

__Önkoşul__
.NET Core 3 SDK'yı resmi Microsoft sitesinden [indirin](https://dotnet.microsoft.com/download/dotnet-core/3.0).

__Yeni bir klasör oluşturma__
Bu klasörde aşağıdaki komutu çalıştırın. Bu worker servisinin bir şablonu kullanarak örnek bir konsol uygulaması oluşturur.

```
dotnet new worker  
```

![images/netcore-worker.png](/images/netcore-worker.png)

Projeyi Visual Studio'da açalım. Progam.cs dosyası aşağıdaki gibi görünecek.

```
using System;  
using System.Collections.Generic;  
using System.Linq;  
using System.Threading.Tasks;  
using Microsoft.Extensions.DependencyInjection;  
using Microsoft.Extensions.Hosting;  
  
namespace CoreWorkerServiceSchedularJob  
{  
    public class Program  
    {  
        public static void Main(string[] args)  
        {  
            CreateHostBuilder(args).Build().Run();  
        }  
  
        public static IHostBuilder CreateHostBuilder(string[] args) =>  
            Host.CreateDefaultBuilder(args)  
                .ConfigureServices((hostContext, services) =>  
                {  
                    services.AddHostedService<Worker>();  
                });  
    }  
}  
```

__Coravel'i yapılandırılması__

NuGet Package konsolunda aşağıdaki komutu çalıştırın.

```
dotnet add package coravel  
```

__Invocable uygulama__

"Job çalıştırıldı....... !!!" gibi bir metni yazdığımız sınıfımıza (CoreWorkerServiceSchedularJob.cs) ekleyelim.

```
using Coravel.Invocable;  
using System;  
using System.Collections.Generic;  
using System.Text;  
using System.Threading.Tasks;  
  
namespace CoreWorkerServiceSchedularJob  
{  
    class MyFirstJob  : IInvocable  
    {  
        public Task Invoke()  
        {  
            Console.WriteLine("Job çalıştırıldı.......!!!" + DateTime.Now.ToString());  
            return Task.CompletedTask;  
        }  
    }  
}  
```

__Job'ı kaydetme ve zamanı belirtme__

Şimdi işimizi .NET Core'un service container'ına kaydedelim ve beş saniye için zamanı belirleyelim. İsterseniz başka bir sıklık belirtebilir yada spesifik bir zaman belirleyebilirsiniz. Program.cs dosyasının son kodu aşağıdaki gibidir.

```
using System;  
using System.Collections.Generic;  
using System.Linq;  
using System.Threading.Tasks;  
using Coravel;  
using Microsoft.Extensions.DependencyInjection;  
using Microsoft.Extensions.Hosting;  
  
namespace CoreWorkerServiceSchedularJob  
{  
    public class Program  
    {  
        public static void Main(string[] args)  
        {  
            IHost host = CreateHostBuilder(args).Build();  
            host.Services.UseScheduler(scheduler => {  
                
                // Remind schedular to repeat the same job in every five-second   
                scheduler  
                    .Schedule<MyFirstJob>()  
                    .EveryFiveSeconds();  
  
  
            });  
            host.Run();  
        }  
  
        public static IHostBuilder CreateHostBuilder(string[] args) =>  
            Host.CreateDefaultBuilder(args)  
                .ConfigureServices(services =>  
                {  
                    services.AddScheduler();  
  
                    // register job with container  
                    services.AddTransient<MyFirstJob>();  
                });  
    };  
}  
```

__Uygulamayı çalıştırma zamanı__

Uygulamanın çıktısına bakalım.

![images/coravel.png](/images/coravel.png)

.NET Core 3 ve Worker hizmeti şablonu ve Coravel paketinin bir kombinasyonuyla sadece 5 dakikalık sürede bir zamanlayıcı görevi oluşturmuş olduk.

Kolay gelsin!