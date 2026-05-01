<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            [
                'slug' => 'company-profile',
                'title' => 'Website company profile',
                'icon' => 'sparkles',
                'description' => 'Untuk bisnis yang butuh profil profesional, struktur jelas, dan mudah dikembangkan.',
            ],
            [
                'slug' => 'landing-page-campaign',
                'title' => 'Landing page campaign',
                'icon' => 'megaphone',
                'description' => 'Untuk promosi produk, event, ads campaign, dan validasi penawaran baru.',
            ],
            [
                'slug' => 'web-application',
                'title' => 'Web application',
                'icon' => 'activity',
                'description' => 'Untuk workflow digital, portal pelanggan, booking, katalog, atau tools operasional.',
            ],
            [
                'slug' => 'dashboard-admin-panel',
                'title' => 'Dashboard / admin panel',
                'icon' => 'layout-dashboard',
                'description' => 'Untuk mengelola data, transaksi, konten, laporan, dan aktivitas internal.',
            ],
            [
                'slug' => 'api-backend-system',
                'title' => 'API & backend system',
                'icon' => 'server',
                'description' => 'Untuk fondasi data, autentikasi, integrasi, storage, dan proses bisnis.',
            ],
            [
                'slug' => 'maintenance-optimization',
                'title' => 'Maintenance & optimization',
                'icon' => 'shield-check',
                'description' => 'Untuk menjaga performa, keamanan, bug fixing, improvement, dan update berkala.',
            ],
        ];

        foreach ($services as $index => $service) {
            Service::updateOrCreate(
                ['slug' => $service['slug']],
                [...$service, 'order' => $index, 'is_active' => true],
            );
        }
    }
}
