<?php

use App\Models\Portfolio;
use App\Models\User;

it('forbids non-admin authenticated users from listing portfolios', function (): void {
    $user = User::factory()->create(['is_admin' => false]);
    Portfolio::factory()->count(2)->create();

    $this->actingAs($user, 'sanctum')
        ->getJson('/api/admin/portfolios')
        ->assertForbidden();
});

it('lets admins create, update and delete portfolios', function (): void {
    $admin = User::factory()->admin()->create();

    $this->actingAs($admin, 'sanctum')
        ->postJson('/api/admin/portfolios', [
            'slug' => 'kirana-dental',
            'name' => 'Kirana Dental',
            'category' => 'Clinic Website & Booking Flow',
            'challenge' => 'Klinik butuh website yang terasa premium.',
            'result' => 'Struktur layanan lebih jelas.',
            'stack' => ['React', 'Laravel'],
        ])
        ->assertCreated()
        ->assertJsonPath('data.slug', 'kirana-dental');

    $portfolio = Portfolio::sole();

    $this->actingAs($admin, 'sanctum')
        ->patchJson('/api/admin/portfolios/'.$portfolio->slug, [
            'name' => 'Kirana Dental (Updated)',
        ])
        ->assertOk()
        ->assertJsonPath('data.name', 'Kirana Dental (Updated)');

    $this->actingAs($admin, 'sanctum')
        ->deleteJson('/api/admin/portfolios/'.$portfolio->slug)
        ->assertOk();

    expect(Portfolio::count())->toBe(0);
});
