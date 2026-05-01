<?php

use App\Models\Portfolio;

it('lists only published portfolios in display order', function (): void {
    Portfolio::factory()->create(['name' => 'First', 'order' => 0, 'is_published' => true]);
    Portfolio::factory()->create(['name' => 'Hidden', 'order' => 1, 'is_published' => false]);
    Portfolio::factory()->create(['name' => 'Second', 'order' => 2, 'is_published' => true]);

    $response = $this->getJson('/api/portfolios');

    $response
        ->assertOk()
        ->assertJsonCount(2, 'data')
        ->assertJsonPath('data.0.name', 'First')
        ->assertJsonPath('data.1.name', 'Second');
});

it('shows a single published portfolio by slug', function (): void {
    $portfolio = Portfolio::factory()->create([
        'slug' => 'kirana-dental',
        'name' => 'Kirana Dental',
        'is_published' => true,
    ]);

    $response = $this->getJson('/api/portfolios/'.$portfolio->slug);

    $response
        ->assertOk()
        ->assertJsonPath('data.name', 'Kirana Dental')
        ->assertJsonPath('data.slug', 'kirana-dental');
});

it('returns 404 when the portfolio is not published', function (): void {
    $portfolio = Portfolio::factory()->unpublished()->create(['slug' => 'private-work']);

    $this->getJson('/api/portfolios/'.$portfolio->slug)
        ->assertNotFound();
});
