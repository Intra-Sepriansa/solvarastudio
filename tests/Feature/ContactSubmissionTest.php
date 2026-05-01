<?php

use App\Models\ContactSubmission;
use Illuminate\Cache\RateLimiter;

beforeEach(function (): void {
    app(RateLimiter::class)->clear('contact-form|127.0.0.1');
});

/**
 * @return array<string, mixed>
 */
function validContactPayload(array $overrides = []): array
{
    return array_merge([
        'name' => 'Rania Putri',
        'contact' => 'rania@example.com',
        'project_type' => 'Company profile',
        'budget' => 'Rp10–25 juta',
        'deadline' => '2–4 minggu',
        'message' => 'Halo, saya butuh bantuan membuat website company profile untuk klinik kami.',
    ], $overrides);
}

it('stores a valid contact submission', function (): void {
    $response = $this->postJson('/api/contact', validContactPayload());

    $response
        ->assertCreated()
        ->assertJsonPath('data.name', 'Rania Putri')
        ->assertJsonPath('data.project_type', 'Company profile');

    expect(ContactSubmission::count())->toBe(1);

    $submission = ContactSubmission::sole();
    expect($submission->ip_address)->not->toBeNull();
});

it('rejects a contact submission missing required fields', function (): void {
    $response = $this->postJson('/api/contact', validContactPayload([
        'name' => '',
        'contact' => '',
        'message' => '',
    ]));

    $response
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['name', 'contact', 'message']);

    expect(ContactSubmission::count())->toBe(0);
});

it('rejects a contact submission with a too-short message', function (): void {
    $response = $this->postJson('/api/contact', validContactPayload([
        'message' => 'pendek',
    ]));

    $response
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['message']);
});

it('rejects a contact submission when the honeypot field is filled', function (): void {
    $response = $this->postJson('/api/contact', validContactPayload([
        'company' => 'Spam Corp',
    ]));

    $response
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['company']);

    expect(ContactSubmission::count())->toBe(0);
});

it('throttles excessive contact submissions from the same ip', function (): void {
    foreach (range(1, 5) as $i) {
        $this->postJson('/api/contact', validContactPayload([
            'message' => 'Pesan untuk discovery awal nomor '.$i.' dengan deskripsi yang cukup panjang.',
        ]))->assertCreated();
    }

    $this->postJson('/api/contact', validContactPayload())
        ->assertStatus(429);
});
