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
            'category' => $this->category,
            'challenge' => $this->challenge,
            'result' => $this->result,
            'stack' => $this->stack ?? [],
            'cover_image_url' => $this->cover_image_path ? Storage::url($this->cover_image_path) : null,
            'images' => collect($this->images ?? [])
                ->map(fn (string $path): string => Storage::url($path))
                ->all(),
            'order' => $this->order,
            'is_published' => $this->is_published,
        ];
    }
}
