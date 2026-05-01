<?php

namespace App\Http\Requests\Api\Admin;

use App\Models\Portfolio;
use Illuminate\Foundation\Http\FormRequest;

class StorePortfolioRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('create', Portfolio::class) ?? false;
    }

    /**
     * @return array<string, array<int, string>>
     */
    public function rules(): array
    {
        return [
            'slug' => ['required', 'string', 'max:255', 'unique:portfolios,slug'],
            'name' => ['required', 'string', 'max:150'],
            'category' => ['required', 'string', 'max:150'],
            'challenge' => ['required', 'string'],
            'result' => ['required', 'string'],
            'stack' => ['nullable', 'array'],
            'stack.*' => ['string', 'max:80'],
            'cover_image_path' => ['nullable', 'string', 'max:255'],
            'images' => ['nullable', 'array'],
            'images.*' => ['string', 'max:255'],
            'order' => ['nullable', 'integer', 'min:0'],
            'is_published' => ['nullable', 'boolean'],
        ];
    }
}
