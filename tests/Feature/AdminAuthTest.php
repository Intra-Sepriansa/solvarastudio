<?php

use App\Models\User;
use Illuminate\Cache\RateLimiter;
use Illuminate\Support\Facades\Hash;

beforeEach(function (): void {
    app(RateLimiter::class)->clear('admin-login|127.0.0.1');
});

it('issues a sanctum token to an admin with valid credentials', function (): void {
    $admin = User::factory()->admin()->create([
        'email' => 'admin@solvarastudio.com',
        'password' => Hash::make('password-secret'),
    ]);

    $response = $this->postJson('/api/admin/login', [
        'email' => $admin->email,
        'password' => 'password-secret',
        'device_name' => 'pest-test',
    ]);

    $response
        ->assertOk()
        ->assertJsonStructure(['token', 'user' => ['id', 'name', 'email', 'is_admin']])
        ->assertJsonPath('user.is_admin', true);

    expect($admin->tokens()->count())->toBe(1);
});

it('rejects login when credentials are invalid', function (): void {
    User::factory()->admin()->create([
        'email' => 'admin@solvarastudio.com',
        'password' => Hash::make('password-secret'),
    ]);

    $this->postJson('/api/admin/login', [
        'email' => 'admin@solvarastudio.com',
        'password' => 'wrong-password',
    ])->assertUnprocessable()
        ->assertJsonValidationErrors(['email']);
});

it('rejects login from a non-admin user', function (): void {
    User::factory()->create([
        'email' => 'user@solvarastudio.com',
        'password' => Hash::make('password-secret'),
        'is_admin' => false,
    ]);

    $this->postJson('/api/admin/login', [
        'email' => 'user@solvarastudio.com',
        'password' => 'password-secret',
    ])->assertUnprocessable()
        ->assertJsonValidationErrors(['email']);
});

it('blocks unauthenticated access to admin endpoints', function (): void {
    $this->getJson('/api/admin/me')->assertUnauthorized();
    $this->getJson('/api/admin/portfolios')->assertUnauthorized();
    $this->getJson('/api/admin/contact-submissions')->assertUnauthorized();
});

it('returns the authenticated admin via the me endpoint', function (): void {
    $admin = User::factory()->admin()->create();

    $this->actingAs($admin, 'sanctum')
        ->getJson('/api/admin/me')
        ->assertOk()
        ->assertJsonPath('user.id', $admin->id)
        ->assertJsonPath('user.is_admin', true);
});
