---
author: sametsunman
title: 'C# ve JavaScript''te E-Posta Doğrulama'
subtitle: >-
  Bir metnin e-posta olup olmadığını doğrulamak isteyebilir. Bunu iki farklı
  dilde nasıl yapabileceğimizi gösterelim
date: '2020-04-21'
thumb_img_alt: email-validation
content_img_alt: email-validation
excerpt: >-

canonical_url: ''
template: post
thumb_img_path: images/email-validation.png
content_img_path: images/email-validation.png
---
Bir metnin e-posta olup olmadağı aşağıdaki fonksiyonu kullanarak doğrulanabilir.

__c#__

```
    public void SendEmail(){
    
                            if (!ValidateEmail(mailTo))
                        {
                            MessageBox.Show("Invalid To mail address");
                            return;
                        }
    
    }

        private bool ValidateEmail(string emailAddress)
        {
            string patternStrict = @"^(([^<>()[\]\\.,;:\s@\""]+"
                + @"(\.[^<>()[\]\\.,;:\s@\""]+)*)|(\"".+\""))@"
                + @"((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}"
                + @"\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+"
                + @"[a-zA-Z]{2,}))$";
            System.Text.RegularExpressions.Regex reStrict = new System.Text.RegularExpressions.Regex(patternStrict);
            bool isStrictMatch = reStrict.IsMatch(emailAddress);
            return isStrictMatch;
        }
```

__JavaScript__

```
<script>
function SendEmail() {
                let mailTo =document.getElementById("mailTo").value;  
                
                if (!validateEmail(mailTo)) {
                    alert('Invalid To mail address.');
                    return;
                }
                }

    function ValidateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@@"]+(\.[^<>()\[\]\\.,;:\s@@"]+)*)|(".+"))@@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    </script>
```