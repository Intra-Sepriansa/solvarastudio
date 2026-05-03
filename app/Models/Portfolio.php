<?php

namespace App\Models;

use Database\Factories\PortfolioFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'slug',
    'name',
    'client_name',
    'category',
    'type',
    'summary',
    'challenge',
    'result',
    'live_url',
    'stack',
    'cover_image_path',
    'video_path',
    'video_url',
    'images',
    'order',
    'is_published',
    'is_featured',
])]
class Portfolio extends Model
{
    /** @use HasFactory<PortfolioFactory> */
    use HasFactory;

    /**
     * @var array<string, string>
     */
    public const TYPES = [
        'web' => 'Web',
        'mobile' => 'Mobile',
        'network' => 'Network',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'stack' => 'array',
            'images' => 'array',
            'order' => 'integer',
            'is_published' => 'boolean',
            'is_featured' => 'boolean',
        ];
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('is_published', true)->orderBy('order');
    }

    public function scopeOfType(Builder $query, string $type): Builder
    {
        return $query->where('type', $type);
    }
}
