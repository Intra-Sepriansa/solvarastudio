<?php

namespace App\Http\Requests\Api\Admin;

use App\Models\Service;
use Illuminate\Foundation\Http\FormRequest;

class StoreServiceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('create', Service::class) ?? false;
    }

    /**
     * @return array<string, array<int, string>>
     */
    public function rules(): array
    {
        return [
            'slug' => ['required', 'string', 'max:120', 'unique:services,slug'],
            'title' => ['required', 'string', 'max:120'],
            'icon' => ['nullable', 'string', 'max:60'],
            'description' => ['required', 'string'],
            'order' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['nullable', 'boolean'],
        ];
    }
}
