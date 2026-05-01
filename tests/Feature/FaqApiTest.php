<?php

use App\Models\Faq;

it('lists only published faqs in display order', function (): void {
    Faq::factory()->create(['question' => 'A?', 'order' => 0, 'is_published' => true]);
    Faq::factory()->unpublished()->create(['question' => 'Hidden?', 'order' => 1]);
    Faq::factory()->create(['question' => 'B?', 'order' => 2, 'is_published' => true]);

    $response = $this->getJson('/api/faqs');

    $response
        ->assertOk()
        ->assertJsonCount(2, 'data')
        ->assertJsonPath('data.0.question', 'A?')
        ->assertJsonPath('data.1.question', 'B?');
});
