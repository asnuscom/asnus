---
author: ihsansunman
title: Linux-XFCE Cihazlarda VNC Bağlantısında Görüntü Gelmemesi
subtitle: ihsansunman
date: '2020-04-09'
thumb_img_alt: VNC
content_img_alt: VNC
excerpt: >-
  Linux cihazıma TightVNC Server kurdum ancak VNC ile bağlanmaya çalıştığımda
  gri bir ekran karşıladı beni. Aslında böyle bir ekran bizi karşıladığında
  sorunsuzca bağlandık demektir. Ancak bağlantı ekranımızda gerekli bileşenleri
  cihazımız otomatik açmadığını anlarız.
canonical_url: ''
template: post
thumb_img_path: images/w2CQO.png
content_img_path: images/w2CQO.png
---
Kök dosya sistemimizde ~/.vnc/xstartup dosyasını yönetici izni ile açalım.

    #!/bin/sh

    xrdb $HOME/.Xresources
    xsetroot -solid grey
    #x-terminal-emulator -geometry 80x24+10+10 -ls -title "$VNCDESKTOP Desktop" &
    #x-window-manager &
    # Fix to make GNOME work
    export XKL_XMODMAP_DISABLE=1
    /etc/X11/Xsession
    startxfce4 &

Yukardakine benzer bir metin bizi karşılayacaktır. Sonuna şu ibareleri eklersek sorun düzelecektir.

    #!/bin/sh

    xrdb $HOME/.Xresources
    xsetroot -solid grey
    x-terminal-emulator -geometry 80x24+10+10 -ls -title "$VNCDESKTOP Desktop" &
    x-window-manager &
    # Fix to make GNOME work
    export XKL_XMODMAP_DISABLE=1
    unset SESSION_MANAGER
    unset DBUS_SESSION_BUS_ADDRESS

    /etc/X11/Xsession

    xfce4-panel &
    xfsettingsd &
    xfwm4 &
    xfdesktop &
    pcmanfm &
    xfce4-terminal &
