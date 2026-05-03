<?php

namespace App\Http\Resources;

use App\Models\Portfolio;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

/**
 * @mixin Portfolio
 */
class PortfolioResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'name' => $this->name,
            'client_name' => $this->client_name,
            'category' => $this->category,
            'type' => $this->type,
            'type_label' => Portfolio::TYPES[$this->type] ?? $this->type,
            'summary' => $this->summary,
            'challenge' => $this->challenge,
            'result' => $this->result,
            'live_url' => $this->live_url,
            'stack' => $this->stack ?? [],
            'cover_image_url' => $this->cover_image_path ? Storage::url($this->cover_image_path) : null,
            'video_file_url' => $this->video_path ? Storage::url($this->video_path) : null,
            'video_url' => $this->video_url,
            'images' => collect($this->images ?? [])
                ->map(fn (string $path): string => Storage::url($path))
                ->all(),
            'order' => $this->order,
            'is_published' => $this->is_published,
            'is_featured' => $this->is_featured,
        ];
    }
}
