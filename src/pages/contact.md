---
title: İletişim
hide_title: false
sections:
  - section_id: contact-form
    type: section_form
    content: To get in touch please fill the form below.
    form_id: contactForm
    form_action: /thank-you
    form_fields:
      - input_type: text
        name: name
        label: İsim
        default_value: İsminiz
        is_required: true
      - input_type: email
        name: email
        label: E-mail
        default_value: E-mail adresiniz
        is_required: true
      - input_type: select
        name: subject
        label: Konu
        default_value: Konunuz
        options:
          - Hata Ve Öneri
          - Sponsorluk
          - Diğer
      - input_type: textarea
        name: message
        label: Mesaj
        default_value: Mesajınız
      - input_type: checkbox
        name: consent
        label: >-
          Bu formun, benimle iletişime geçilebilmesi için gönderilen bilgilerimi
          sakladığını anlıyorum.
    submit_label: Gönder
template: advanced
---
