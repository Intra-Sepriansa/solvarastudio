<?php

use App\Http\Controllers\Api\Admin\AuthController as AdminAuthController;
use App\Http\Controllers\Api\Admin\ContactSubmissionController as AdminContactSubmissionController;
use App\Http\Controllers\Api\Admin\FaqController as AdminFaqController;
use App\Http\Controllers\Api\Admin\PortfolioController as AdminPortfolioController;
use App\Http\Controllers\Api\Admin\ServiceController as AdminServiceController;
use App\Http\Controllers\Api\Admin\TestimonialController as AdminTestimonialController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\FaqController;
use App\Http\Controllers\Api\PortfolioController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\TestimonialController;
use Illuminate\Support\Facades\Route;

Route::middleware('throttle:contact-form')
    ->post('/contact', [ContactController::class, 'store'])
    ->name('api.contact.store');

Route::get('/services', [ServiceController::class, 'index'])->name('api.services.index');
Route::get('/services/{service:slug}', [ServiceController::class, 'show'])->name('api.services.show');

Route::get('/portfolios', [PortfolioController::class, 'index'])->name('api.portfolios.index');
Route::get('/portfolios/{portfolio:slug}', [PortfolioController::class, 'show'])->name('api.portfolios.show');

Route::get('/testimonials', [TestimonialController::class, 'index'])->name('api.testimonials.index');

Route::get('/faqs', [FaqController::class, 'index'])->name('api.faqs.index');

Route::prefix('admin')->name('api.admin.')->group(function (): void {
    Route::middleware('throttle:admin-login')
        ->post('/login', [AdminAuthController::class, 'login'])->name('login');

    Route::middleware('auth:sanctum')->group(function (): void {
        Route::get('/me', [AdminAuthController::class, 'me'])->name('me');
        Route::post('/logout', [AdminAuthController::class, 'logout'])->name('logout');

        Route::apiResource('contact-submissions', AdminContactSubmissionController::class)
            ->only(['index', 'show', 'destroy']);
        Route::apiResource('portfolios', AdminPortfolioController::class);
        Route::apiResource('services', AdminServiceController::class);
        Route::apiResource('testimonials', AdminTestimonialController::class);
        Route::apiResource('faqs', AdminFaqController::class);
    });
});
