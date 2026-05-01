# Solvara Studio

Editorial landing page dan API backend untuk **Solvara Studio**, dibangun di atas Laravel 13 + Inertia v3 + React 19 + Tailwind v4 + Sanctum.

Repo ini berisi:

- Landing page premium (12 section) dengan custom mockup composition di hero, animasi Framer Motion, dan kontak form dengan validasi React Hook Form + Zod.
- REST API publik untuk Services, Portfolios, Testimonials, FAQs, dan Contact form dengan rate limit + honeypot.
- Admin REST API berbasis Sanctum (login token, CRUD untuk semua resource, plus inbox contact submissions).
- Pest test suite (58 test, 208 assertion) yang menutup contact form, rate limit, admin auth, public API, dan admin authorization.

---

## Tech Stack

**Backend**

- PHP 8.4+
- Laravel 13 (Inertia v3, Fortify, Wayfinder)
- Laravel Sanctum 4 untuk admin API token
- SQLite (default development) / MySQL (production)
- Pest 4 untuk testing
- Laravel Pint untuk formatting

**Frontend**

- React 19 + TypeScript
- Vite + Tailwind CSS v4 (CSS-first config)
- Framer Motion (animasi reveal & stagger)
- React Hook Form + Zod
- Lucide React icons
- Inertia React adapter

---

## Quick Start (Local)

```bash
# 1. Install dependencies
composer install
npm install

# 2. Setup environment
cp .env.example .env
php artisan key:generate

# 3. Database (default sqlite)
touch database/database.sqlite
php artisan migrate --seed

# 4. Run dev (server + queue + vite)
composer run dev
```

Aplikasi tersedia di:

- **Frontend / landing page**: `http://localhost:8000/`
- **API base**: `http://localhost:8000/api`

Default admin user (dari seeder):

| Field    | Value                          |
| -------- | ------------------------------ |
| Email    | `admin@solvarastudio.com`      |
| Password | `password`                     |

> Ganti kredensial admin sebelum deploy production.

---

## API Endpoints

### Public

| Method | Path                              | Notes                                            |
| ------ | --------------------------------- | ------------------------------------------------ |
| POST   | `/api/contact`                    | Submit contact form. Rate limit 5/menit, 30/hari per IP. Honeypot field `company` harus kosong. |
| GET    | `/api/services`                   | Daftar service aktif (urutan `order`).           |
| GET    | `/api/services/{slug}`            | Detail service per slug.                         |
| GET    | `/api/portfolios`                 | Daftar portfolio yang dipublish.                 |
| GET    | `/api/portfolios/{slug}`          | Detail portfolio per slug.                       |
| GET    | `/api/testimonials`               | Daftar testimonial featured.                     |
| GET    | `/api/faqs`                       | Daftar FAQ yang dipublish.                       |

### Admin (Sanctum bearer token)

| Method | Path                                       | Notes                                                  |
| ------ | ------------------------------------------ | ------------------------------------------------------ |
| POST   | `/api/admin/login`                         | Login. Return `token` + `user`. Rate limit 10/menit/IP. |
| POST   | `/api/admin/logout`                        | Revoke current token.                                  |
| GET    | `/api/admin/me`                            | User saat ini.                                         |
| GET    | `/api/admin/contact-submissions`           | List inbox (paginate 20).                              |
| GET    | `/api/admin/contact-submissions/{id}`      | Detail inbox.                                          |
| DELETE | `/api/admin/contact-submissions/{id}`      | Hapus.                                                 |
| `apiResource` | `/api/admin/portfolios`             | index/store/show/update/destroy.                       |
| `apiResource` | `/api/admin/services`               | index/store/show/update/destroy.                       |
| `apiResource` | `/api/admin/testimonials`           | index/store/show/update/destroy.                       |
| `apiResource` | `/api/admin/faqs`                   | index/store/show/update/destroy.                       |

Header authorization untuk admin endpoint:

```
Authorization: Bearer <token>
Accept: application/json
```

---

## Database Schema

### `contact_submissions`

| Column        | Type                |
| ------------- | ------------------- |
| name          | string(100)         |
| contact       | string(150)         |
| project_type  | string(100)         |
| budget        | string(100)         |
| deadline      | string(100), null   |
| message       | text                |
| ip_address    | string(45)          |
| user_agent    | string(255)         |
| handled_at    | timestamp, null     |

### `services` / `portfolios` / `testimonials` / `faqs`

- `services` (slug, title, icon, description, order, is_active)
- `portfolios` (slug, name, category, challenge, result, stack[], cover_image_path, images[], order, is_published)
- `testimonials` (name, role, company, quote, image_path, is_featured, order)
- `faqs` (question, answer, order, is_published)

`stack` dan `images` di portfolio dicasting otomatis ke array via `protected function casts()`.

---

## Testing

```bash
php artisan test --compact
```

Test suite menutup:

- Contact form valid/invalid submission
- Rate limit contact form (5/menit)
- Honeypot field validation
- Admin Sanctum login (valid, wrong password, non-admin)
- Unauthenticated/forbidden admin endpoint
- Admin CRUD portfolios (acting as admin)
- Public API listing dan ordering untuk services, portfolios, testimonials, faqs

---

## Code Quality

```bash
# PHP
vendor/bin/pint --dirty --format agent

# Frontend
npm run lint:check
npm run format:check
npm run types:check
npm run build
```

CI menjalankan ini otomatis di `.github/workflows/lint.yml` dan `.github/workflows/tests.yml`.

---

## Deployment Checklist

### VPS (Nginx + PHP-FPM)

1. Server requirement: PHP 8.4+, MySQL 8 / MariaDB 11, Redis (opsional, untuk queue/cache).
2. Clone repo, `composer install --no-dev --optimize-autoloader`, `npm ci && npm run build`.
3. Setup `.env` production:
   - `APP_ENV=production`
   - `APP_DEBUG=false`
   - `DB_CONNECTION=mysql` (atau sesuai infra)
   - `QUEUE_CONNECTION=redis` (jika tersedia)
   - `SESSION_DRIVER=redis` (jika tersedia)
   - `SANCTUM_STATEFUL_DOMAINS=` jika admin SPA dipanggil cookie-based.
4. Migrate: `php artisan migrate --force`.
5. Cache config + routes: `php artisan config:cache && php artisan route:cache && php artisan view:cache && php artisan event:cache`.
6. Storage symlink: `php artisan storage:link`.
7. Permissions: pastikan `storage/`, `bootstrap/cache/` writable oleh user PHP-FPM.
8. SSL: terminasi di Nginx (Certbot / Let's Encrypt).
9. Queue worker (jika dipakai): supervised via Supervisor `php artisan queue:work --sleep=3 --tries=3`.
10. Scheduler: cron entry `* * * * * cd /var/www/solvarastudio && php artisan schedule:run >> /dev/null 2>&1`.

### Laravel Cloud

Repo kompatibel dengan Laravel Cloud — push branch `main`, set environment variable, lalu attach resource (Postgres/MySQL + Redis).

---

## Rekomendasi Improvement UI/UX & Copywriting

Setelah landing page live, berikut prioritas iteratif untuk meningkatkan konversi dan kepercayaan, berdasarkan pola yang sering muncul di studio digital sejenis.

### 1. Memperkuat hero

- Ganti hero subcopy dengan **satu kalimat outcome konkret** dari klien yang ada, misal: "Kami merancang website klinik yang membuat Kirana Dental terima 3x lebih banyak inquiry konsisten." Outcome sebelum proses lebih efektif.
- Tambahkan **micro-credentials** di bawah CTA (misal: "12 project release · 4 industri · 2 tahun") yang memperkuat trust tanpa terlihat sales.
- Pertimbangkan A/B test: hero saat ini (text + custom mockup) vs hero dengan **looping stage preview** (timeline scroll otomatis), karena interactive timeline biasanya menaikkan dwell-time hero 1.5-2x.

### 2. Meningkatkan konversi

- Tambah **secondary path** yang lebih ringan dari "Konsultasi Project": misal "Lihat estimasi 2 menit" yang membawa ke kalkulator scope ringan (range hanya). Ini menangkap user yang belum siap bicara langsung tapi tetap tertarik.
- Pasang **chat WhatsApp persistent** kecil di pojok kanan bawah dengan pesan default (`Halo Solvara, saya butuh diskusi ringan soal {project_type}…`). WhatsApp adalah primary contact channel di Indonesia — bukan email.
- Kurangi field opsional di form contact: `deadline` bisa dipindah ke step kedua/inline reveal setelah `budget` dipilih, agar perceived effort awal lebih ringan.

### 3. Memperkuat trust

- Tambahkan section kecil **"Yang sering ditanyakan klien sebelum mulai"** sebelum FAQ formal — pertanyaan pendek seperti "Apakah saya harus sudah punya domain?" yang sangat khas pemilik bisnis non-teknis.
- Sertakan **logo bar grid kecil** klien (atau 4-6 industry tag jika belum boleh display logo) sebagai band tipis di antara Hero dan Services.
- Tambahkan **"Apa yang Anda dapat di akhir project"** — bullet kecil di atas CTA contact: domain konfigurasi, dokumentasi admin, SOP update, file design source. Ini menjawab kekhawatiran handover yang jarang dieksplisit.

### 4. Memperkuat portfolio proof

- Setiap project butuh **"Before-After 1 metric"** mini: waktu loading, jumlah click yang diperlukan untuk action, atau jumlah inquiry per minggu. Bahkan satu metric saja sudah jauh lebih kuat dari challenge/result naratif.
- Tambah **micro-screenshot** detail per project (3-4 thumbnails) yang muncul on hover atau tap. Saat ini portfolio masih mengandalkan deskripsi — visual detail meningkatkan kredibilitas teknis.
- Pertimbangkan **case study page penuh** (Inertia route `/work/{slug}`) untuk 2 project terbaik. Long-form case study dengan timeline dan keputusan teknis biasanya jadi rujukan saat klien internal mendiskusikan vendor.

### 5. Meningkatkan completion contact form

- Form saat ini sudah ringkas. Pengukuran berikutnya: tambahkan **inline character count** di textarea pesan ("min 20 karakter") dengan progress bar tipis — research menunjukkan ini meningkatkan completion 8-12%.
- **Auto-format nomor WhatsApp**: deteksi input yang dimulai dengan `08` atau `62` dan format ulang ke `+62 ...` real-time. Field `contact` yang menerima email atau telepon saat ini terlalu fleksibel — UX bisa lebih ramah dengan toggle `Email | WhatsApp`.
- Setelah submit sukses, jangan hanya tampilkan success message statis. Tampilkan **"Apa yang terjadi selanjutnya"** dalam 3 step (1: review scope, 2: discovery call dijadwalkan, 3: dokumen scope draft). Ini menahan ekspektasi klien dan mengurangi pertanyaan follow-up "kapan dibalas?".

### 6. Membuat copywriting lebih spesifik (begitu data klien nyata tersedia)

- Ganti semua deskripsi service dari benefit-style (`untuk bisnis yang butuh profil profesional`) ke **outcome-based dengan angka**: `Profil bisnis 5-7 halaman, siap publish dalam 14 hari kerja, dengan struktur SEO baseline lengkap`. Lebih spesifik menaikkan trust signal sekaligus pre-qualify lead.
- FAQ saat ini bagus — tambahkan **2 FAQ baru** setelah ada beberapa project: (a) "Apakah bisa transfer akses ke developer internal saya nanti?", (b) "Bagaimana skema revisi setelah launch?". Keduanya selalu muncul di project nyata, bukan di template.
- Testimonial: minta klien menjawab format spesifik **"sebelum kami bekerja sama, saya mengira ... ternyata ..."**. Format kontras ini lebih persuasif daripada quote evaluative biasa.
- Process section saat ini editorial yang baik. Setelah delivered project pertama, tambah **timestamp realistik per step** (Discovery 2-3 hari, UX struktur 3-5 hari, dst). Klien bisnis kecil sangat butuh visibilitas timeline konkret.

---

## Skills (untuk kontributor AI)

Repo ini menyertakan domain skills di `.agents/skills/` dan `.claude/skills/`. Skills yang sudah dipasang:

- `pest-testing` — Pest 4 patterns
- `laravel-best-practices` — Laravel patterns
- `inertia-react-development` — Inertia v3 + React 19
- `wayfinder-development` — Laravel Wayfinder route generation
- `fortify-development` — Authentication via Fortify
- `tailwindcss-development` — Tailwind v4 patterns

Aktifkan skill terkait ketika bekerja di domain tersebut.

---

## License

MIT.
