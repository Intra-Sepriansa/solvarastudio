<?php

namespace Database\Factories;

use App\Models\Testimonial;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Testimonial>
 */
class TestimonialFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'role' => fake()->jobTitle(),
            'company' => fake()->company(),
            'quote' => fake()->paragraph(2),
            'image_path' => null,
            'is_featured' => true,
            'order' => fake()->numberBetween(0, 20),
        ];
    }

    public function notFeatured(): static
    {
        return $this->state(fn (array $attributes): array => [
            'is_featured' => false,
        ]);
    }
}
