<?php

use App\Models\Testimonial;

it('lists only featured testimonials', function (): void {
    Testimonial::factory()->create(['name' => 'Featured A', 'order' => 0, 'is_featured' => true]);
    Testimonial::factory()->notFeatured()->create(['name' => 'Hidden']);
    Testimonial::factory()->create(['name' => 'Featured B', 'order' => 1, 'is_featured' => true]);

    $response = $this->getJson('/api/testimonials');

    $response
        ->assertOk()
        ->assertJsonCount(2, 'data')
        ->assertJsonPath('data.0.name', 'Featured A')
        ->assertJsonPath('data.1.name', 'Featured B');
});
