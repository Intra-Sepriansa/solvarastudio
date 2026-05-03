<?php

use Inertia\Testing\AssertableInertia as Assert;

it('renders the project index page', function (): void {
    $this->get(route('projects.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('projects/index'));
});

it('renders project detail pages', function (string $slug): void {
    $this->get(route('projects.show', $slug))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('projects/show')
            ->where('slug', $slug));
})->with([
    'ciper' => 'ciper',
    'linguapath' => 'linguapath',
    'majormind' => 'majormind',
    'smanten' => 'smanten',
]);

it('returns not found for unknown project detail', function (): void {
    $this->get('/projects/unknown-project')
        ->assertNotFound();
});
