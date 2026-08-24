# The StartupNav

Startupları ve aldıkları yatırımları inceleyen profesyonel blog.

## Tech Stack

- **Next.js 16** (App Router) + **Tailwind CSS 4**
- **SQLite** + **Prisma ORM** (yazılar & bülten aboneleri)
- **Resend** (yeni yazı bildirim mailleri)

Tasarım, Zola Tumblr temasının renkleri, tipografisi (PT Sans + Inconsolata) ve şeritli post kartlarından uyarlanmıştır.

## Kurulum

```bash
npm install
cp .env.example .env
npm run db:setup
npm run dev
```

Site: [http://localhost:3000](http://localhost:3000)

## Ortam Değişkenleri

| Değişken | Açıklama |
|----------|----------|
| `DATABASE_URL` | SQLite yolu (`file:./dev.db`) |
| `ADMIN_PASSWORD` | `/admin` ve bildirim API şifresi |
| `RESEND_API_KEY` | Resend API anahtarı |
| `RESEND_FROM_EMAIL` | Gönderen adresi |
| `NEXT_PUBLIC_SITE_URL` | Canlı site URL'si |

## Özellikler

- Ana sayfada yazı listesi (Tumblr post kartı düzeni)
- Yazı detay: başlık, startup adı, yatırım, metin, tarih, görsel
- Gizli admin: `/admin` — şifre ile yeni yazı + isteğe bağlı mail
- Sidebar bülten formu → SQLite'a kayıt
- Yeni yazıda abonelere: `The StartupNav: Yeni Yazı Yayınlandı - [Başlık]`

## API

```bash
# Bültene abone
curl -X POST /api/newsletter -H 'Content-Type: application/json' \
  -d '{"email":"test@ornek.com"}'

# Bildirim tetikle
curl -X POST /api/notify \
  -H "Authorization: Bearer $ADMIN_PASSWORD" \
  -H 'Content-Type: application/json' \
  -d '{"slug":"yazı-slug"}'
```

## Vercel

1. Repo'yu Vercel'e bağla.
2. Environment variables ekle.
3. **Önemli:** Vercel'de yerel SQLite kalıcı değildir. Ücretsiz [Turso](https://turso.tech) (libSQL/SQLite) veya Neon/Postgres kullanmanı öneririm. Geliştirme ve demolar için yerel SQLite yeterlidir.

```bash
npm run build
```

Build sırasında `prisma generate` otomatik çalışır.
