<?php

namespace App\Http\Requests\Api;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreContactSubmissionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, array<int, string|ValidationRule>>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'min:2', 'max:100'],
            'contact' => ['required', 'string', 'min:5', 'max:150'],
            'project_type' => ['required', 'string', 'max:100'],
            'budget' => ['required', 'string', 'max:100'],
            'deadline' => ['nullable', 'string', 'max:100'],
            'message' => ['required', 'string', 'min:20', 'max:2000'],
            // Honeypot field — must be empty.
            'company' => ['nullable', 'prohibited'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Nama wajib diisi.',
            'name.min' => 'Nama minimal 2 karakter.',
            'contact.required' => 'Email atau nomor WhatsApp wajib diisi.',
            'project_type.required' => 'Jenis project wajib dipilih.',
            'budget.required' => 'Budget range wajib dipilih.',
            'message.required' => 'Pesan wajib diisi.',
            'message.min' => 'Pesan minimal 20 karakter.',
            'company.prohibited' => 'Permintaan tidak valid.',
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public function validatedData(): array
    {
        $validated = $this->validated();

        unset($validated['company']);

        return $validated;
    }
}
