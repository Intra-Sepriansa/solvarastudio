<?php

namespace Database\Seeders;

use App\Models\Testimonial;
use Illuminate\Database\Seeder;

class TestimonialSeeder extends Seeder
{
    public function run(): void
    {
        $testimonials = [
            [
                'name' => 'Rania Putri',
                'role' => 'Founder',
                'company' => 'Kirana Dental',
                'quote' => 'Yang paling membantu adalah prosesnya rapi. Dari awal sudah jelas halaman apa saja yang dibuat, jadi revisinya tidak melebar ke mana-mana.',
            ],
            [
                'name' => 'Daniel Arta',
                'role' => 'Operations Lead',
                'company' => 'Orbit Retail',
                'quote' => 'Dashboard-nya langsung bisa dipakai tim. Ada beberapa penyesuaian kecil, tapi komunikasinya cepat dan jelas.',
            ],
            [
                'name' => 'Mirza Halim',
                'role' => 'Partner',
                'company' => 'Nusa Legal',
                'quote' => 'Desainnya terasa profesional tanpa terlalu ramai. Konten layanan kami juga dibantu dirapikan supaya lebih mudah dipahami calon klien.',
            ],
        ];

        foreach ($testimonials as $index => $testimonial) {
            Testimonial::updateOrCreate(
                ['name' => $testimonial['name'], 'company' => $testimonial['company']],
                [...$testimonial, 'order' => $index, 'is_featured' => true],
            );
        }
    }
}
