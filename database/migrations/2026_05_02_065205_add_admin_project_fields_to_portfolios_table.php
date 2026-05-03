<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('portfolios', function (Blueprint $table): void {
            $table->string('type')->default('web')->after('category');
            $table->string('client_name')->nullable()->after('name');
            $table->text('summary')->nullable()->after('type');
            $table->string('live_url')->nullable()->after('result');
            $table->string('video_path')->nullable()->after('cover_image_path');
            $table->string('video_url')->nullable()->after('video_path');
            $table->boolean('is_featured')->default(false)->after('is_published');

            $table->index(['type', 'is_published', 'order']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('portfolios', function (Blueprint $table): void {
            $table->dropIndex(['type', 'is_published', 'order']);
            $table->dropColumn([
                'type',
                'client_name',
                'summary',
                'live_url',
                'video_path',
                'video_url',
                'is_featured',
            ]);
        });
    }
};
