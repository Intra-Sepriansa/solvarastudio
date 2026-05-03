<?php

use App\Models\Portfolio;
use App\Models\User;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;

it('redirects guests to login before opening the admin project panel', function (): void {
    $this->get(route('admin.projects.index'))
        ->assertRedirect(route('login'));
});

it('forbids non-admin users from opening the admin project panel', function (): void {
    $user = User::factory()->create(['is_admin' => false]);

    $this->actingAs($user)
        ->get(route('admin.projects.index'))
        ->assertForbidden();
});

it('renders the project management panel for admins', function (): void {
    $admin = User::factory()->admin()->create();

    Portfolio::factory()->create([
        'name' => 'Office WiFi Upgrade',
        'slug' => 'office-wifi-upgrade',
        'type' => 'network',
        'is_published' => true,
        'is_featured' => true,
    ]);

    $this->actingAs($admin)
        ->get(route('admin.projects.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/projects/index')
            ->has('projects', 1)
            ->where('metrics.total', 1)
            ->where('metrics.network', 1)
            ->where('metrics.featured', 1)
            ->where('projectTypes.network', 'Network'));
});

it('lets admins create projects with image and video uploads', function (): void {
    Storage::fake('public');

    $admin = User::factory()->admin()->create();
    $cover = UploadedFile::fake()->image('network-cover.jpg', 1200, 800);
    $video = UploadedFile::fake()->create('walkthrough.mp4', 2048, 'video/mp4');

    $this->actingAs($admin)
        ->post(route('admin.projects.store'), [
            'name' => 'Office Network Upgrade',
            'slug' => 'office-network-upgrade',
            'client_name' => 'Avara Office',
            'type' => 'network',
            'category' => 'Business Network',
            'summary' => 'Upgrade jaringan kantor untuk banyak device.',
            'challenge' => 'Koneksi sering penuh saat meeting dan operasional berjalan bersamaan.',
            'result' => 'Coverage lebih merata dan bandwidth diprioritaskan untuk kebutuhan kerja.',
            'stack_text' => 'MikroTik, Ubiquiti, VLAN',
            'live_url' => 'https://example.com/network',
            'video_url' => 'https://example.com/video',
            'cover_image' => $cover,
            'video_file' => $video,
            'order' => 7,
            'is_published' => true,
            'is_featured' => true,
        ])
        ->assertRedirect(route('admin.projects.index'));

    $project = Portfolio::where('slug', 'office-network-upgrade')->firstOrFail();

    expect($project->name)->toBe('Office Network Upgrade')
        ->and($project->type)->toBe('network')
        ->and($project->client_name)->toBe('Avara Office')
        ->and($project->stack)->toBe(['MikroTik', 'Ubiquiti', 'VLAN'])
        ->and($project->is_published)->toBeTrue()
        ->and($project->is_featured)->toBeTrue();

    Storage::disk('public')->assertExists($project->cover_image_path);
    Storage::disk('public')->assertExists($project->video_path);
});

it('lets admins update projects and remove existing media', function (): void {
    Storage::fake('public');

    $admin = User::factory()->admin()->create();
    Storage::disk('public')->put('portfolio/covers/old-cover.jpg', 'cover');
    Storage::disk('public')->put('portfolio/videos/old-video.mp4', 'video');

    $project = Portfolio::factory()->create([
        'slug' => 'old-project',
        'name' => 'Old Project',
        'type' => 'web',
        'cover_image_path' => 'portfolio/covers/old-cover.jpg',
        'video_path' => 'portfolio/videos/old-video.mp4',
    ]);

    $this->actingAs($admin)
        ->post(route('admin.projects.update', $project), [
            '_method' => 'patch',
            'name' => 'Mobile App Relaunch',
            'slug' => 'mobile-app-relaunch',
            'client_name' => 'Orbit POS',
            'type' => 'mobile',
            'category' => 'Mobile Experience',
            'summary' => 'Relaunch flow mobile untuk operasional harian.',
            'challenge' => 'Flow lama terlalu panjang untuk dipakai staff cabang.',
            'result' => 'Flow dibuat lebih singkat dengan prioritas aksi utama.',
            'stack_text' => 'React Native, Laravel API',
            'order' => 3,
            'is_published' => false,
            'is_featured' => false,
            'remove_cover_image' => true,
            'remove_video_file' => true,
        ])
        ->assertRedirect(route('admin.projects.index'));

    $project->refresh();

    expect($project->slug)->toBe('mobile-app-relaunch')
        ->and($project->type)->toBe('mobile')
        ->and($project->is_published)->toBeFalse()
        ->and($project->cover_image_path)->toBeNull()
        ->and($project->video_path)->toBeNull();

    Storage::disk('public')->assertMissing('portfolio/covers/old-cover.jpg');
    Storage::disk('public')->assertMissing('portfolio/videos/old-video.mp4');
});

it('lets admins delete projects with stored media', function (): void {
    Storage::fake('public');

    $admin = User::factory()->admin()->create();
    Storage::disk('public')->put('portfolio/covers/delete-cover.jpg', 'cover');
    Storage::disk('public')->put('portfolio/videos/delete-video.mp4', 'video');

    $project = Portfolio::factory()->create([
        'cover_image_path' => 'portfolio/covers/delete-cover.jpg',
        'video_path' => 'portfolio/videos/delete-video.mp4',
    ]);

    $this->actingAs($admin)
        ->delete(route('admin.projects.destroy', $project))
        ->assertRedirect(route('admin.projects.index'));

    expect(Portfolio::query()->count())->toBe(0);
    Storage::disk('public')->assertMissing('portfolio/covers/delete-cover.jpg');
    Storage::disk('public')->assertMissing('portfolio/videos/delete-video.mp4');
});

it('seeds three admin accounts for the admin login', function (): void {
    $this->seed(DatabaseSeeder::class);

    expect(User::query()
        ->where('is_admin', true)
        ->whereIn('email', [
            'admin@solvarastudio.com',
            'web@solvarastudio.com',
            'network@solvarastudio.com',
        ])
        ->count())->toBe(3);
});
