<?php

use App\Models\Service;

it('lists active services in display order', function (): void {
    Service::factory()->create(['title' => 'Active A', 'order' => 0, 'is_active' => true]);
    Service::factory()->inactive()->create(['title' => 'Hidden', 'order' => 1]);
    Service::factory()->create(['title' => 'Active B', 'order' => 2, 'is_active' => true]);

    $response = $this->getJson('/api/services');

    $response
        ->assertOk()
        ->assertJsonCount(2, 'data')
        ->assertJsonPath('data.0.title', 'Active A')
        ->assertJsonPath('data.1.title', 'Active B');
});
