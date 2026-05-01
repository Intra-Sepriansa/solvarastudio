<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('portfolios', function (Blueprint $table): void {
            $table->id();
            $table->string('slug')->unique();
            $table->string('name');
            $table->string('category');
            $table->text('challenge');
            $table->text('result');
            $table->json('stack')->nullable();
            $table->string('cover_image_path')->nullable();
            $table->json('images')->nullable();
            $table->unsignedInteger('order')->default(0);
            $table->boolean('is_published')->default(true);
            $table->timestamps();

            $table->index(['order', 'is_published']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('portfolios');
    }
};
