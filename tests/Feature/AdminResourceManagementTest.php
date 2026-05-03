<?php

use App\Models\ContactSubmission;
use App\Models\Faq;
use App\Models\Service;
use App\Models\Testimonial;
use App\Models\User;

it('lets admins create, update and delete services', function (): void {
    $admin = User::factory()->admin()->create();

    $this->actingAs($admin, 'sanctum')
        ->postJson('/api/admin/services', [
            'slug' => 'landing-page-campaign',
            'title' => 'Landing page campaign',
            'icon' => 'megaphone',
            'description' => 'Untuk promosi produk, event, ads campaign, dan validasi penawaran baru.',
            'order' => 1,
            'is_active' => true,
        ])
        ->assertCreated()
        ->assertJsonPath('data.slug', 'landing-page-campaign');

    $service = Service::sole();

    $this->actingAs($admin, 'sanctum')
        ->patchJson('/api/admin/services/'.$service->slug, [
            'title' => 'Landing page campaign updated',
            'order' => 2,
        ])
        ->assertOk()
        ->assertJsonPath('data.title', 'Landing page campaign updated')
        ->assertJsonPath('data.order', 2);

    $this->actingAs($admin, 'sanctum')
        ->deleteJson('/api/admin/services/'.$service->slug)
        ->assertOk();

    expect(Service::count())->toBe(0);
});

it('lets admins create, update and delete faqs', function (): void {
    $admin = User::factory()->admin()->create();

    $this->actingAs($admin, 'sanctum')
        ->postJson('/api/admin/faqs', [
            'question' => 'Apakah bisa dibuatkan admin panel?',
            'answer' => 'Bisa. Admin panel disiapkan sesuai resource yang perlu dikelola.',
            'order' => 1,
            'is_published' => true,
        ])
        ->assertCreated()
        ->assertJsonPath('data.question', 'Apakah bisa dibuatkan admin panel?');

    $faq = Faq::sole();

    $this->actingAs($admin, 'sanctum')
        ->patchJson('/api/admin/faqs/'.$faq->id, [
            'answer' => 'Bisa. Admin panel disiapkan sesuai resource, role, dan workflow harian.',
        ])
        ->assertOk()
        ->assertJsonPath('data.answer', 'Bisa. Admin panel disiapkan sesuai resource, role, dan workflow harian.');

    $this->actingAs($admin, 'sanctum')
        ->deleteJson('/api/admin/faqs/'.$faq->id)
        ->assertOk();

    expect(Faq::count())->toBe(0);
});

it('lets admins create, update and delete testimonials', function (): void {
    $admin = User::factory()->admin()->create();

    $this->actingAs($admin, 'sanctum')
        ->postJson('/api/admin/testimonials', [
            'name' => 'Rania Putri',
            'role' => 'Founder',
            'company' => 'Kirana Dental',
            'quote' => 'Prosesnya rapi dan scope dari awal jelas.',
            'is_featured' => true,
            'order' => 1,
        ])
        ->assertCreated()
        ->assertJsonPath('data.name', 'Rania Putri');

    $testimonial = Testimonial::sole();

    $this->actingAs($admin, 'sanctum')
        ->patchJson('/api/admin/testimonials/'.$testimonial->id, [
            'quote' => 'Prosesnya rapi dan revisinya tidak melebar.',
        ])
        ->assertOk()
        ->assertJsonPath('data.quote', 'Prosesnya rapi dan revisinya tidak melebar.');

    $this->actingAs($admin, 'sanctum')
        ->deleteJson('/api/admin/testimonials/'.$testimonial->id)
        ->assertOk();

    expect(Testimonial::count())->toBe(0);
});

it('lets admins review and delete contact submissions', function (): void {
    $admin = User::factory()->admin()->create();
    $submission = ContactSubmission::factory()->create([
        'name' => 'Daniel Arta',
        'project_type' => 'Dashboard / admin panel',
    ]);

    $this->actingAs($admin, 'sanctum')
        ->getJson('/api/admin/contact-submissions')
        ->assertOk()
        ->assertJsonPath('data.0.name', 'Daniel Arta');

    $this->actingAs($admin, 'sanctum')
        ->getJson('/api/admin/contact-submissions/'.$submission->id)
        ->assertOk()
        ->assertJsonPath('data.project_type', 'Dashboard / admin panel');

    $this->actingAs($admin, 'sanctum')
        ->deleteJson('/api/admin/contact-submissions/'.$submission->id)
        ->assertOk();

    expect(ContactSubmission::count())->toBe(0);
});
