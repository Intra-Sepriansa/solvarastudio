<?php

namespace App\Http\Requests\Api\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateServiceRequest extends FormRequest
{
    public function authorize(): bool
    {
        $service = $this->route('service');

        return $this->user()?->can('update', $service) ?? false;
    }

    /**
     * @return array<string, array<int, mixed>>
     */
    public function rules(): array
    {
        $service = $this->route('service');
        $serviceId = is_object($service) ? $service->id : $service;

        return [
            'slug' => ['sometimes', 'required', 'string', 'max:120', Rule::unique('services', 'slug')->ignore($serviceId)],
            'title' => ['sometimes', 'required', 'string', 'max:120'],
            'icon' => ['nullable', 'string', 'max:60'],
            'description' => ['sometimes', 'required', 'string'],
            'order' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['nullable', 'boolean'],
        ];
    }
}
