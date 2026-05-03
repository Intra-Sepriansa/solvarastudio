<?php

namespace Database\Factories;

use App\Models\Portfolio;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Portfolio>
 */
class PortfolioFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->unique()->company();

        return [
            'slug' => Str::slug($name).'-'.fake()->unique()->randomNumber(5),
            'name' => $name,
            'client_name' => fake()->company(),
            'type' => fake()->randomElement(['web', 'mobile', 'network']),
            'category' => fake()->randomElement([
                'Website & Web Application',
                'Mobile Experience',
                'Business Network',
                'Server & Cloud',
                'CCTV & Security',
            ]),
            'summary' => fake()->sentence(12),
            'challenge' => fake()->paragraph(2),
            'result' => fake()->paragraph(2),
            'stack' => fake()->randomElements(['React', 'Laravel', 'MySQL', 'Tailwind', 'Sanctum', 'Storage', 'SEO'], 4),
            'live_url' => fake()->optional()->url(),
            'cover_image_path' => null,
            'video_path' => null,
            'video_url' => fake()->optional()->url(),
            'images' => [],
            'order' => fake()->numberBetween(0, 20),
            'is_published' => true,
            'is_featured' => false,
        ];
    }

    public function unpublished(): static
    {
        return $this->state(fn (array $attributes): array => [
            'is_published' => false,
        ]);
    }
}
