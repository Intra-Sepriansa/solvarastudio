<?php

namespace Database\Seeders;

use App\Models\Portfolio;
use Illuminate\Database\Seeder;

class PortfolioSeeder extends Seeder
{
    public function run(): void
    {
        $portfolios = [
            [
                'slug' => 'kirana-dental',
                'name' => 'Kirana Dental',
                'category' => 'Clinic Website & Booking Flow',
                'challenge' => 'Klinik butuh website yang terasa premium, mudah dipahami pasien baru, dan punya alur booking sederhana.',
                'result' => 'Struktur layanan lebih jelas, halaman mobile lebih nyaman, dan tim admin mendapat alur inquiry yang lebih rapi.',
                'stack' => ['React', 'Laravel', 'MySQL', 'WhatsApp Flow'],
            ],
            [
                'slug' => 'nusa-legal',
                'name' => 'Nusa Legal',
                'category' => 'Company Profile & Lead Capture',
                'challenge' => 'Firma hukum ingin tampil kredibel tanpa terasa kaku, sekaligus memudahkan calon klien memilih layanan.',
                'result' => 'Konten layanan dibuat lebih terstruktur, inquiry masuk dengan konteks awal, dan halaman mudah diperbarui.',
                'stack' => ['React', 'Tailwind', 'Laravel CMS'],
            ],
            [
                'slug' => 'orbit-pos',
                'name' => 'Orbit POS',
                'category' => 'Internal Dashboard',
                'challenge' => 'Tim operasional membutuhkan panel untuk melihat transaksi, stok, cabang, dan aktivitas harian.',
                'result' => 'Dashboard dibuat ringkas dengan filter data, role admin, dan tampilan yang nyaman untuk penggunaan harian.',
                'stack' => ['Laravel REST API', 'React', 'Sanctum', 'MySQL'],
            ],
            [
                'slug' => 'avara-property',
                'name' => 'Avara Property',
                'category' => 'Listing Website',
                'challenge' => 'Brand properti membutuhkan katalog unit yang mudah ditelusuri dan tetap terasa elegan.',
                'result' => 'Listing lebih terorganisir, inquiry unit lebih spesifik, dan konten properti bisa dikelola dari admin.',
                'stack' => ['React', 'Laravel', 'Storage', 'SEO'],
            ],
        ];

        foreach ($portfolios as $index => $portfolio) {
            Portfolio::updateOrCreate(
                ['slug' => $portfolio['slug']],
                [...$portfolio, 'order' => $index, 'is_published' => true],
            );
        }
    }
}
