---
author: sametsunman
title: "Git: Herkesin Kafasını Karıştıran Şeyler"
subtitle: >-
  Git öğrenmeye başladığında her şey güzel gider. Sonra bir gün "detached HEAD"
  görürsün ve panik başlar. Bu yazıda git'in kafanı karıştıran taraflarını
  açıklıyoruz.
date: '2025-12-16'
thumb_img_alt: 'git'
content_img_alt: 'git'
excerpt: >-
  Git öğrenmeye başladığında her şey güzel gider. Sonra bir gün "detached HEAD"
  görürsün ve panik başlar. Bu yazıda git'in kafanı karıştıran taraflarını
  açıklıyoruz.
canonical_url: ''
template: post
thumb_img_path: images/git_banner.png
content_img_path: images/git_banner.png
---
Git kullanmaya başladığında `add`, `commit`, `push` öğrenirsin. "Ne varmış bunda?" dersin. Sonra bir gün conflict çıkar, `detached HEAD` uyarısı görürsün, yanlışlıkla bir şeyleri silersin... Ve o an anlarsın ki git derin bir okyanus.

Gel, bu okyanusta kaybolmamak için en kafa karıştıran şeyleri konuşalım.

## 1. merge vs rebase - Ezelı Tartışma

İki branch'i birleştirmek istiyorsun. İki seçenek var:

### merge

```bash
git checkout main
git merge feature
```

Bu, feature branch'indeki değişiklikleri main'e getirir ve bir "merge commit" oluşturur. Tarihçe şöyle görünür:

```
*   Merge branch 'feature'
|\
| * feature commit 2
| * feature commit 1
* | main commit
|/
* ortak commit
```

### rebase

```bash
git checkout feature
git rebase main
```

Bu, feature branch'ini alır ve main'in ucuna "yapıştırır". Sanki feature'ı main'den yeni başlatmışsın gibi olur:

```
* feature commit 2
* feature commit 1
* main commit
* ortak commit
```

### Hangisini Kullanmalı?

- **merge**: Tarihçeyi olduğu gibi korumak istiyorsan. Takım çalışmasında genelde daha güvenli.
- **rebase**: Temiz, düz bir tarihçe istiyorsan. Ama dikkat: **paylaşılmış branch'lerde rebase yapma!** Başkalarının işini mahvedersin.

Altın kural: "Kendi local branch'inde rebase yap, paylaşılmış branch'lerde merge yap."

## 2. reset vs revert - Geri Alma İşleri

Bir commit'i geri almak istiyorsun. Ama nasıl?

### git reset

Commit'leri tarihten siler (aslında silmez ama öyle görünür):

```bash
# Son commit'i geri al, değişiklikleri staged tut
git reset --soft HEAD~1

# Son commit'i geri al, değişiklikleri unstaged tut
git reset --mixed HEAD~1

# Son commit'i geri al, değişiklikleri tamamen sil
git reset --hard HEAD~1
```

**Dikkat:** `--hard` tehlikelidir. Kaydedilmemiş değişikliklerin gider.

### git revert

Commit'i geri alan yeni bir commit oluşturur:

```bash
git revert abc123
```

Tarihçeyi değiştirmez, sadece "bu commit'i geri aldım" diye yeni bir commit ekler.

### Hangisini Kullanmalı?

- **reset**: Local'de, henüz push etmediğin commit'ler için
- **revert**: Push ettiğin, başkalarıyla paylaştığın commit'ler için

## 3. Detached HEAD - Bu Da Ne?

Şu mesajı gördüğünde panik yapma:

```
You are in 'detached HEAD' state...
```

Bu sadece şu anlama geliyor: Bir branch'te değilsin, direkt bir commit'e bakıyorsun.

Nasıl olur?

```bash
git checkout abc123  # Bir commit hash'ine checkout
git checkout v1.0    # Bir tag'e checkout
```

Bu durumda yaptığın commit'ler hiçbir branch'e ait olmaz. Kaybolabilirler!

### Çözüm

```bash
# Ya bir branch oluştur
git checkout -b yeni-branch

# Ya da mevcut branch'ine geri dön
git checkout main
```

## 4. Staging Area - Neden Var Bu?

Yeni başlayanlar hep sorar: "Neden direkt commit etmiyoruz? Bu `add` ne işe yarıyor?"

Staging area (index), commit'e neyin gireceğini seçmeni sağlar. Diyelim 5 dosya değiştirdin ama sadece 3'ünü commit etmek istiyorsun:

```bash
git add dosya1.js dosya2.js dosya3.js
git commit -m "Sadece bu üçü"
```

Hatta bir dosyanın sadece bazı satırlarını bile seçebilirsin:

```bash
git add -p dosya.js
```

Bu sana her değişikliği tek tek sorar: "Bunu ekleyeyim mi?"

## 5. Stash - Değişiklikleri Kenara Koy

Bir şey üzerinde çalışıyorsun, acil başka branch'e geçmen gerekti. Ama commit etmek istemiyorsun çünkü iş yarım.

```bash
# Değişiklikleri sakla
git stash

# Başka branch'e geç, işini yap
git checkout main
# ...

# Geri dön ve değişiklikleri geri al
git checkout feature
git stash pop
```

### Stash İpuçları

```bash
# Stash'e isim ver
git stash save "Login sayfası yarım kaldı"

# Stash listesini gör
git stash list

# Belirli bir stash'i geri al
git stash apply stash@{2}

# Stash'i silmeden uygula
git stash apply

# Stash'i uygula ve sil
git stash pop
```

## 6. Cherry-pick - Tek Commit Seç Al

Başka bir branch'ten sadece bir commit'i almak istiyorsun:

```bash
git cherry-pick abc123
```

Bu, o commit'i alır ve şu anki branch'ine uygular. Çok kullanışlı ama dikkatli ol, aynı değişiklik iki yerde olunca ileride conflict çıkabilir.

## 7. Conflict Çözme - Kaçınılmaz Son

İki kişi aynı satırı değiştirince conflict çıkar:

```
<<<<<<< HEAD
const x = 1;
=======
const x = 2;
>>>>>>> feature
```

Bu şu demek:
- `<<<<<<< HEAD` ile `=======` arası: Senin branch'indeki versiyon
- `=======` ile `>>>>>>> feature` arası: Gelen branch'teki versiyon

### Nasıl Çözersin?

1. Dosyayı aç
2. Hangisi doğruysa onu bırak, diğerini ve işaretleri sil
3. `git add dosya.js`
4. `git commit`

Ya da ikisini birleştir:

```javascript
const x = 3; // İkisinin ortası bir değer
```

### VS Code Kullanıyorsan

VS Code conflict'leri çok güzel gösteriyor. "Accept Current", "Accept Incoming", "Accept Both" butonları var. Hayat kurtarıcı.

## 8. reflog - Git'in Gizli Süper Gücü

Bir şeyleri mahvettin, commit'lerin kayboldu mu? Panik yapma:

```bash
git reflog
```

Bu, yaptığın her şeyin kaydını tutar. Reset, checkout, merge... Hepsi burada.

```
abc123 HEAD@{0}: reset: moving to HEAD~1
def456 HEAD@{1}: commit: Önemli değişiklik
ghi789 HEAD@{2}: checkout: moving from main to feature
```

Kayıp commit'ini buldun mu?

```bash
git checkout def456
# veya
git reset --hard def456
```

**reflog hayat kurtarır.** Unutma.

## 9. .gitignore Çalışmıyor!

`.gitignore`'a ekledin ama dosya hala takip ediliyor? Çünkü dosya zaten git'e eklenmişti.

```bash
# Önce git'ten kaldır (dosyayı silmez)
git rm --cached dosya.txt

# Sonra commit et
git commit -m "dosya.txt artık takip edilmiyor"
```

Klasör için:

```bash
git rm -r --cached klasor/
```

## 10. Upstream ve Origin - Kim Bu İnsanlar?

- **origin**: Senin remote repository'n (genelde GitHub'daki repo)
- **upstream**: Fork ettiğin orijinal repository

```bash
# Origin'i gör
git remote -v

# Upstream ekle (fork'larda)
git remote add upstream https://github.com/orijinal/repo.git

# Upstream'den güncelleme al
git fetch upstream
git merge upstream/main
```

## 11. git pull vs git fetch

### fetch

Sadece remote'taki değişiklikleri indirir, birleştirmez:

```bash
git fetch origin
```

Sonra istersen incele:

```bash
git log origin/main
git diff main origin/main
```

### pull

fetch + merge yapar:

```bash
git pull origin main
# Şuna eşit:
# git fetch origin
# git merge origin/main
```

**Tavsiye:** Önce `fetch` yap, bak ne gelmiş, sonra `merge` yap. Daha kontrollü.

## 12. Commit Mesajı Yazma Sanatı

Kötü commit mesajları:

```
fix
asdasd
wip
değişiklik yaptım
```

İyi commit mesajları:

```
feat: Kullanıcı giriş sayfası eklendi
fix: Login butonunun tıklanmama sorunu düzeltildi
refactor: Auth servisindeki tekrar eden kod temizlendi
docs: README'ye kurulum adımları eklendi
```

### Conventional Commits

Bu format çok yaygın:

```
<tip>: <açıklama>

[opsiyonel gövde]

[opsiyonel footer]
```

Tipler:
- `feat`: Yeni özellik
- `fix`: Bug düzeltme
- `docs`: Dokümantasyon
- `style`: Kod formatı (işlevsel değişiklik yok)
- `refactor`: Kod düzenleme
- `test`: Test ekleme
- `chore`: Build, config değişiklikleri

## Bonus: Faydalı Alias'lar

`.gitconfig` dosyana ekle:

```ini
[alias]
    st = status
    co = checkout
    br = branch
    ci = commit
    lg = log --oneline --graph --decorate
    unstage = reset HEAD --
    last = log -1 HEAD
    undo = reset --soft HEAD~1
```

Artık `git st` yazman yeterli.

## Son Söz

Git başta zor görünür ama mantığını kavradıktan sonra vazgeçilmez oluyor. En önemli şey: **Deney yap, ama önemli projelerde değil!**

Bir test repository'si oluştur, içinde her şeyi dene. Reset yap, rebase yap, conflict oluştur, çöz. Korkmadan öğrenirsin.

Ve unutma: `git reflog` her zaman arkanda.

---

*Git ile ilgili sorularını yorumlarda paylaş. Hangi komut kafanı karıştırıyor?*
