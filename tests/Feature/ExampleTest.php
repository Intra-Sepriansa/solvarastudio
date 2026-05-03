<?php

use Inertia\Testing\AssertableInertia as Assert;

test('renders the home landing page', function (): void {
    $this->get(route('home'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('welcome'));
});
