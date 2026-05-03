# Solvara Studio

Landing page dan REST API untuk **Solvara Studio**, studio digital untuk website, aplikasi web, dashboard, backend/API, dan sistem bisnis yang rapi sejak scope awal.

Stack utama:

- Laravel 13, Fortify, Sanctum, Wayfinder, Inertia v3
- React 19, TypeScript, Vite, Tailwind CSS v4
- Motion, Lucide React, React Hook Form, Zod
- MySQL untuk production/Docker, SQLite untuk test
- Redis untuk cache, queue, dan session jika tersedia
- Pest 4, PHP Pint, ESLint, Prettier

## Local Development

### Herd

Project ini tersedia lewat Laravel Herd:

```bash
composer install
npm install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan wayfinder:generate --with-form --no-interaction
npm run build
```

URL:

- Landing page: `http://solvarastudio.test`
- API base: `http://solvarastudio.test/api`

Untuk development frontend aktif:

```bash
composer run dev
```

### Docker

Docker Compose menyiapkan `app`, `nginx`, `mysql`, `redis`, dan `vite`.

```bash
cp .env.example .env
docker compose up -d --build
docker compose exec app composer install
docker compose exec app php artisan key:generate
docker compose exec app php artisan migrate --seed
docker compose exec app php artisan wayfinder:generate --with-form --no-interaction
```

URL Docker:

- Nginx/Laravel: `http://localhost:8080`
- Vite: `http://localhost:5173`
- MySQL host port: `3307`
- Redis host port: `6380`

Admin user dibuat oleh `database/seeders/DatabaseSeeder.php` saat menjalankan seeder.
Jangan simpan password admin plaintext di dokumentasi atau file yang dipush ke repository.
Untuk environment baru, set password admin secara lokal setelah seeding dan ganti sebelum production.

## Frontend

Landing page aktif ada di `resources/js/pages/welcome.tsx`.

Section yang tersedia:

- Navbar
- Hero dengan custom workspace mockup
- Social proof band
- Services
- Process
- Selected Work
- Why Solvara
- Tech & Quality
- Testimonials
- FAQ accordion
- Contact CTA + form
- Footer

Contact form memakai React Hook Form + Zod dan submit ke Wayfinder route `POST /api/contact`.

Jika route berubah, regenerate Wayfinder:

```bash
php artisan wayfinder:generate --with-form --no-interaction
```

## API

OpenAPI static tersedia di `openapi.yaml`. Scribe/Swagger package belum ditambahkan karena penambahan dependency perlu approval.

### Public

| Method | Path | Notes |
| --- | --- | --- |
| POST | `/api/contact` | Contact submission. Rate limit 5/menit dan 30/hari per IP. Honeypot `company` harus kosong. |
| GET | `/api/services` | Service aktif, urut `order`. |
| GET | `/api/services/{slug}` | Detail service aktif. |
| GET | `/api/portfolios` | Portfolio published, urut `order`. |
| GET | `/api/portfolios/{slug}` | Detail portfolio published. |
| GET | `/api/testimonials` | Featured testimonials. |
| GET | `/api/faqs` | FAQ published, urut `order`. |

### Admin

Admin API memakai Sanctum bearer token.

```http
Authorization: Bearer <token>
Accept: application/json
```

| Method | Path | Notes |
| --- | --- | --- |
| POST | `/api/admin/login` | Return `token` dan `user`. |
| GET | `/api/admin/me` | User aktif. |
| POST | `/api/admin/logout` | Revoke current token. |
| GET/POST/PATCH/DELETE | `/api/admin/portfolios` | CRUD portfolio. |
| GET/POST/PATCH/DELETE | `/api/admin/services` | CRUD services. |
| GET/POST/PATCH/DELETE | `/api/admin/testimonials` | CRUD testimonials. |
| GET/POST/PATCH/DELETE | `/api/admin/faqs` | CRUD FAQs. |
| GET/DELETE | `/api/admin/contact-submissions` | Inbox contact submissions. |

## Quality

Run focused backend tests:

```bash
php artisan test --compact tests/Feature/ContactSubmissionTest.php
php artisan test --compact tests/Feature/AdminAuthTest.php
php artisan test --compact tests/Feature/AdminResourceManagementTest.php
php artisan test --compact tests/Feature/PortfolioApiTest.php tests/Feature/ServiceApiTest.php tests/Feature/TestimonialApiTest.php tests/Feature/FaqApiTest.php
```

Run full checks:

```bash
vendor/bin/pint --dirty --format agent
npm run lint:check
npm run format:check
npm run types:check
npm run build
php artisan test --compact
```

CI check-only tersedia di `.github/workflows/ci.yml`:

- install PHP/Node dependencies
- regenerate Wayfinder routes
- lint frontend
- check frontend formatting
- typecheck frontend
- build frontend
- PHP Pint check
- backend tests
- migration pretend check
- deploy placeholder

## Deployment Checklist

### VPS Nginx + PHP-FPM

1. Provision server: PHP 8.5 FPM, Composer 2, Node 22, MySQL 8/MariaDB, Redis, Nginx, Supervisor.
2. Clone repo ke `/var/www/solvarastudio/current`.
3. Install dependency:

```bash
composer install --no-dev --optimize-autoloader
npm ci
php artisan wayfinder:generate --with-form --no-interaction
npm run build
```

4. Setup `.env` production:

```dotenv
APP_ENV=production
APP_DEBUG=false
APP_URL=https://solvarastudio.com
DB_CONNECTION=mysql
CACHE_STORE=redis
QUEUE_CONNECTION=redis
SESSION_DRIVER=redis
FILESYSTEM_DISK=s3
```

5. Run:

```bash
php artisan key:generate --force
php artisan migrate --force
php artisan storage:link
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache
```

6. Use sample Nginx config: `deploy/nginx/solvarastudio.conf`.
7. Use sample Supervisor config: `deploy/supervisor/solvarastudio-worker.conf`.
8. Add scheduler cron:

```cron
* * * * * cd /var/www/solvarastudio/current && php artisan schedule:run >> /dev/null 2>&1
```

9. Issue SSL with Certbot and reload Nginx.
10. Validate contact form, admin token login, queue worker, storage URL, and production cache.

## Rekomendasi Improvement UI/UX & Copywriting

### Hero

- Tambahkan satu proof konkret begitu ada data asli, misalnya jumlah inquiry, waktu loading, atau waktu delivery.
- Mockup hero bisa dibuat lebih kuat dengan state interaktif ringan: toggle `Scope`, `Build`, `QA`, `Launch`.
- Headline sudah singkat; pertahankan ritme dan hindari klaim seperti "solusi terbaik".

### Conversion

- Tambahkan CTA WhatsApp kecil setelah user scroll melewati hero.
- Buat pilihan "Belum yakin" tetap terlihat aman, karena banyak calon klien belum bisa menulis scope.
- Setelah submit sukses, tampilkan tiga step berikutnya: review scope, jadwal discovery, estimasi awal.

### Trust

- Tambahkan logo/industry tags ketika ada klien nyata.
- Tambahkan bagian kecil "Yang didapat saat handover": akses admin, deploy note, struktur konten, dan source code.
- Tampilkan batasan kerja secara jujur, misalnya tidak semua project perlu sistem custom besar.

### Portfolio Proof

- Setiap portfolio idealnya punya satu metric: LCP, conversion rate, waktu admin input data, atau jumlah inquiry.
- Tambahkan screenshot nyata per project ketika sudah tersedia.
- Buat detail case study untuk 1-2 project terbaik sebelum menambah banyak project kecil.

### Contact Form Completion

- Tambahkan helper singkat di textarea: contoh pesan yang bagus.
- Pertimbangkan toggle `Email` / `WhatsApp` agar field contact terasa lebih jelas.
- Tambahkan character counter halus untuk `message` supaya user paham minimal 20 karakter.

### Copywriting Dengan Data Nyata

- Ganti dummy copy layanan dengan output spesifik: jumlah halaman, jenis panel, estimasi sprint, dan deliverable.
- Testimonial sebaiknya mengikuti pola "sebelum, proses, setelah" agar terasa lebih kredibel.
- FAQ perlu diperluas dari pertanyaan real calon klien setelah 5-10 inquiry pertama.
