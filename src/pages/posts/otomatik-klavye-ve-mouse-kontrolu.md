--- 
title: Bilgisayarınızı uyanık tutun. Mouse otomatik olarak nasıl hareket ettirilir? Klavye tuşuna nasıl otomatik bastırılır? 
subtitle: >- 
  Bazı durumlarda bilgisayarımız uyku moduna geçmemesi için klavyeden tuşa basmalı ya da mouse'u hareket ettirmeliyiz. Uykuya geçme süresini bilgisayar ayarlarından değiştirebiliriz. Peki ya değiştiremediğimiz durumlarda ne yapabiliriz? 
date: 2022-11-11 
thumb_img_alt: '' 
content_img_alt: '' 
excerpt: '' 
canonical_url: '' 
author: sametsunman 
template: post 
thumb_img_path: images/mouse-and-keyboard.jpg 
content_img_path: images/mouse-and-keyboard.jpg 
---

**1. Yazılım yolu ile fare ve klavye hareketlerini kaydetme**

En basit ve en güzel yöntemlerden biri budur. Bilgisayarınıza kurduğunuz programlarla, mouse'unuzu ya da klavye'nizi programlayabilirsiniz.
	
Örnek olarak;
*  [AutoMouser](https://www.gezginler.net/indir/automouser.html)

![](https://www.gezginler.net/indir/resim-grafik/t_automouser-1405699871.jpg)

Klavye ve Fare Otomatik Tıklama Programı ile ister farenizin isterse klavyenizin belirlediğiniz tuşları veya hareketleri otomatik olarak istediğiniz zamanda ve istediğiniz tekrarda yapmasını sağlayabilirsiniz.
		
		
*  [Ghost Mouse](https://www.gezginler.net/indir/ghost-mouse.html)

![](https://www.gezginler.net/indir/resim-grafik/t_ghost-mouse-1400243050.jpg)


Küçük boyutu ve basit arayüzüyle kullanım kolaylığı sunan Ghost Mouse oyun ve çeşitli programlarda gerçekleştirmeniz gereken mouse hareketlerini otomatik hale getirerek zaman ve enerji tasarrufu sağlar.
		
		
		
		
**2. Script ile**

Bilgisayarda basitçe oluşturacağımız kod satırlarıyla da otomatik olarak klavyedeki belirli süre içersinde otomatik olarak tuşlara bastırabiliriz.

***1.Yol***

Hemen bir not defteri açıp aşağıdaki kodları yazın:

	`
	set wsc = CreateObject("WScript.Shell")
	Do
		WScript.Sleep(5*60*1000)
		wsc.SendKeys("{F13}")
	Loop
	`
	
Daha sonrasında ise bu belgeyi farklı kaydederek noSleep.vbs adıyla kaydedin. Kaydettiğiniz dosyayı açtığınızda 5 dakikada bir klavyemizde gizli olan F13 tuşuna basılacak. Böylece bilgisayarımız uyku moduna girmeyecektir. Dilerseniz F13 yerine NUMLOCK yada diğer tuş kombinasyonlarını yazabilirsiniz. Yine aynı şekilde sayılarla oynayarak süreyi düşürebilir ya da arttırabilirsiniz.

***2.Yol***

Bence en güzel ve en işe yarayan yöntem bu. Çünkü herhangi bir admin yetkisi istemiyor.

Bir not defterinde aşağıdaki kod satırlarını yazın.

	`
	 $MYJOB = Start-Job -ScriptBlock {
		$MOVEMENTSIZE = 10
		$SLEEPTIME = 60

		Add-Type -AssemblyName System.Windows.Forms
			while ($true) { 
				$POSITION = [windows.Forms.Cursor]::Position
				$POSITION.x += $MOVEMENTSIZE
				$POSITION.y += $MOVEMENTSIZE
				[windows.Forms.Cursor]::Position = $POSITION
				Start-Sleep -Seconds $SLEEPTIME
				$POSITION = [windows.Forms.Cursor]::Position
				$POSITION.x -= $MOVEMENTSIZE
				$POSITION.y -= $MOVEMENTSIZE
				[Windows.Forms.Cursor]::Position = $POSITION
				Start-Sleep -Seconds $SLEEPTIME
				[windows.Forms.SendKeys]::Sendwait('[F13}')
			}
		}
	`
	
![](https://asnus.com/images/noSleep2.png)
	
Bu kodları noSleep.ps1 adıyla kaydedebilirsiniz. Sonrasında kaydedilen dosyaya sağ tıklayarak düzenleye basın. Dosya PowerShell ISE'de açılacaktır. Run tuşuna basarak komutlarımız çalışmaya başlayacaktır. Burada yapılan işlemler 60 snde bir mouse'u hareket ettirmek ve klavyede F13 tuşuna basmaktır. Dilerseniz süreyi ve tuşu ayarlayabilirsiniz.
	
**3. Video yardımıyla**

Bir diğer yöntemiz ise video oynatmak. Evet, böyle bir yöntem mevcut. Yukarıdaki durumlar işe yaramadığında, örneğin bilgisayarınıza yazılım kurma izniniz yoksa bu yöntemi deneyebilirsiniz.
	
![](https://i.ytimg.com/vi/v4bav9V9Bi8/maxresdefault.jpg)
	
Kullanımı ise gayet basit. Aşağıdaki videoları tabletinizde ya da telefonunuzda açın. Daha sonrasında ise üzerine mouse'unuzu yerleştirin. İşte bu kadar!
		
*  [Mouse Mover/Jiggler | Manipulation | Cheat | 2 Hours Video](https://www.youtube.com/watch?v=gVs0unbKAN4&t=12s)
*  [Mouse jiggler 100 % working ( WOW ) simply superb](https://www.youtube.com/watch?v=cYCmQBDvHlY)
*  [Mouse Jiggler 2 Hours - Keep Computer Awake](https://www.youtube.com/watch?v=S-bmhahLdEU)


Tabi bu yöntem maalesef her mouse ile çalışmayabilir. Size tavsiyem kırmızı ışıklı mouse ile denemeniz.


**4. Araç yardımıyla**

Bu yöntem video yöntemine benziyor. Satın alacağınız bir alet ile mouse'unuzu hareket ettirebilirsiniz.


[](https://c1.neweggimages.com/ProductImageCompressAll1280/ASSAD2204050E15URF6.jpg)


Ülkemizde satışına rastlamadım. Ancak Aliexpress ya da Amazon üzerinden kolaylıkla sipariş edebilirsiniz.

*  [Aliexpress Mouse Jiggler](https://tr.aliexpress.com/item/1005002536221819.html?gatewayAdapt=glo2tur)
*  [Amazon WiebeTech Programmable Mouse Jiggler](https://www.amazon.com/WiebeTech-Programmable-Mouse-Jiggler-MJ-3/dp/B00MTZY7Y4)
*  [Amazon CHOKMAX Mouse Jiggler, Undetectable Mouse Mover](https://www.amazon.com/CHOKMAX-Undetectable-Simulate-Automatic-Movement/dp/B09Z1Q66YB)
*  [N11 Tech8 Mouse Jiggler](https://www.n11.com/urun/tech8-mouse-jiggler-tespit-edilemez-yazilimsiz-mouse-pad-sanat-19630385?magaza=bonusticaret)

Hadi sağlıcakla!
