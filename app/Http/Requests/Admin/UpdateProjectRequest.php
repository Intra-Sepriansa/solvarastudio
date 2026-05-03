<?php

namespace App\Http\Requests\Admin;

use App\Models\Portfolio;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;

class UpdateProjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        return (bool) $this->user()?->is_admin;
    }

    /**
     * @return array<string, array<int, mixed>>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:150'],
            'slug' => ['nullable', 'string', 'max:180'],
            'client_name' => ['nullable', 'string', 'max:150'],
            'type' => ['required', 'string', Rule::in(array_keys(Portfolio::TYPES))],
            'category' => ['required', 'string', 'max:150'],
            'summary' => ['nullable', 'string', 'max:700'],
            'challenge' => ['required', 'string', 'max:3000'],
            'result' => ['required', 'string', 'max:3000'],
            'stack_text' => ['nullable', 'string', 'max:1000'],
            'live_url' => ['nullable', 'url', 'max:255'],
            'video_url' => ['nullable', 'url', 'max:255'],
            'cover_image' => ['nullable', File::image()->max(5 * 1024)],
            'video_file' => ['nullable', File::types(['mp4', 'mov', 'webm'])->max(100 * 1024)],
            'order' => ['nullable', 'integer', 'min:0'],
            'is_published' => ['nullable', 'boolean'],
            'is_featured' => ['nullable', 'boolean'],
            'remove_cover_image' => ['nullable', 'boolean'],
            'remove_video_file' => ['nullable', 'boolean'],
        ];
    }
}
