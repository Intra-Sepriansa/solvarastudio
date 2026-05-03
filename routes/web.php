<?php

use App\Http\Controllers\Admin\ProjectController as AdminProjectController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::inertia('/', 'welcome')->name('home');
Route::inertia('/projects', 'projects/index')->name('projects.index');
Route::get('/projects/{project}', fn (string $project) => Inertia::render('projects/show', [
    'slug' => $project,
]))
    ->whereIn('project', ['ciper', 'linguapath', 'majormind', 'smanten'])
    ->name('projects.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

Route::middleware(['auth', 'verified', 'admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function (): void {
        Route::redirect('/', '/admin/projects')->name('index');
        Route::resource('projects', AdminProjectController::class)
            ->only(['index', 'store', 'update', 'destroy']);
    });

require __DIR__.'/settings.php';
