<?php

namespace App\Http\Requests\Api\Admin;

use App\Models\Portfolio;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePortfolioRequest extends FormRequest
{
    public function authorize(): bool
    {
        $portfolio = $this->route('portfolio');

        return $this->user()?->can('update', $portfolio) ?? false;
    }

    /**
     * @return array<string, array<int, mixed>>
     */
    public function rules(): array
    {
        $portfolio = $this->route('portfolio');
        $portfolioId = is_object($portfolio) ? $portfolio->id : $portfolio;

        return [
            'slug' => ['sometimes', 'required', 'string', 'max:255', Rule::unique('portfolios', 'slug')->ignore($portfolioId)],
            'name' => ['sometimes', 'required', 'string', 'max:150'],
            'client_name' => ['nullable', 'string', 'max:150'],
            'category' => ['sometimes', 'required', 'string', 'max:150'],
            'type' => ['nullable', 'string', Rule::in(array_keys(Portfolio::TYPES))],
            'summary' => ['nullable', 'string', 'max:700'],
            'challenge' => ['sometimes', 'required', 'string'],
            'result' => ['sometimes', 'required', 'string'],
            'live_url' => ['nullable', 'url', 'max:255'],
            'stack' => ['nullable', 'array'],
            'stack.*' => ['string', 'max:80'],
            'cover_image_path' => ['nullable', 'string', 'max:255'],
            'video_path' => ['nullable', 'string', 'max:255'],
            'video_url' => ['nullable', 'url', 'max:255'],
            'images' => ['nullable', 'array'],
            'images.*' => ['string', 'max:255'],
            'order' => ['nullable', 'integer', 'min:0'],
            'is_published' => ['nullable', 'boolean'],
            'is_featured' => ['nullable', 'boolean'],
        ];
    }
}
