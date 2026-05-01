<?php

namespace App\Http\Resources;

use App\Models\Testimonial;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

/**
 * @mixin Testimonial
 */
class TestimonialResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'role' => $this->role,
            'company' => $this->company,
            'quote' => $this->quote,
            'image_url' => $this->image_path ? Storage::url($this->image_path) : null,
            'is_featured' => $this->is_featured,
            'order' => $this->order,
        ];
    }
}
