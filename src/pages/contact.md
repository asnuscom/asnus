---
title: İletişim
hide_title: false
sections:
  - section_id: contact-form
    type: section_form
    content: Aşağıdaki formu eksiksiz doldurarak bizimle iletişime geçebilirsiniz.
    form_id: contactForm
    form_action: https://mailthis.to/destek@asnus.com
    form_fields:
      - input_type: text
        name: isim
        label: İsim
        default_value: İsminiz
        is_required: true
      - input_type: email
        name: email
        label: E-mail
        default_value: E-mail adresiniz
        is_required: true
      - input_type: select
        name: konu
        label: Konu
        default_value: Konunuz
        options:
          - Hata Ve Öneri
          - Sponsorluk
          - Diğer
      - input_type: textarea
        name: mesaj
        label: Mesaj
        default_value: Mesajınız
      - input_type: checkbox
        name: onay
        label: >-
          Bu formun, benimle iletişime geçilebilmesi için gönderilen bilgilerimi
          sakladığını biliyor ve onaylıyorum.
    submit_label: Gönder
template: advanced
---
