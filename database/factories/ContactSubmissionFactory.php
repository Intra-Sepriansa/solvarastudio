<?php

namespace Database\Factories;

use App\Models\ContactSubmission;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ContactSubmission>
 */
class ContactSubmissionFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'contact' => fake()->safeEmail(),
            'project_type' => fake()->randomElement([
                'Company profile',
                'Landing page',
                'Web application',
                'Dashboard / admin panel',
                'Backend / API',
                'Maintenance',
                'Belum yakin',
            ]),
            'budget' => fake()->randomElement([
                '< Rp5 juta',
                'Rp5–10 juta',
                'Rp10–25 juta',
                'Rp25–50 juta',
                '> Rp50 juta',
                'Ingin diskusi dulu',
            ]),
            'deadline' => fake()->randomElement([
                'Secepatnya',
                '2–4 minggu',
                '1–2 bulan',
                '3 bulan+',
                'Fleksibel',
                null,
            ]),
            'message' => fake()->paragraph(3),
            'ip_address' => fake()->ipv4(),
            'user_agent' => fake()->userAgent(),
            'handled_at' => null,
        ];
    }

    public function handled(): static
    {
        return $this->state(fn (array $attributes): array => [
            'handled_at' => now(),
        ]);
    }
}
