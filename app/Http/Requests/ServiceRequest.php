<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ServiceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'features' => 'nullable|array',
            'features.*' => 'string|max:255',
            'price' => 'required|numeric|min:0',
            'duration' => 'required|integer|min:1',
            'status' => 'required|in:active,inactive',
            'is_featured' => 'boolean',
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'title.required' => 'Judul layanan harus diisi.',
            'title.max' => 'Judul layanan maksimal 255 karakter.',
            'description.required' => 'Deskripsi layanan harus diisi.',
            'price.required' => 'Harga layanan harus diisi.',
            'price.numeric' => 'Harga harus berupa angka.',
            'price.min' => 'Harga minimal 0.',
            'duration.required' => 'Durasi pengerjaan harus diisi.',
            'duration.integer' => 'Durasi harus berupa angka bulat.',
            'duration.min' => 'Durasi minimal 1 hari.',
            'status.required' => 'Status layanan harus dipilih.',
            'status.in' => 'Status yang dipilih tidak valid.',
            'features.array' => 'Fitur harus berupa array.',
            'features.*.string' => 'Setiap fitur harus berupa teks.',
            'features.*.max' => 'Fitur maksimal 255 karakter.',
            'is_featured.boolean' => 'Status featured harus berupa boolean.',
        ];
    }

    /**
     * Get custom attributes for validator errors.
     */
    public function attributes(): array
    {
        return [
            'title' => 'judul layanan',
            'description' => 'deskripsi layanan',
            'price' => 'harga',
            'duration' => 'durasi pengerjaan',
            'status' => 'status',
            'is_featured' => 'featured',
            'features' => 'fitur',
        ];
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        // Clean up features array - remove empty values
        if ($this->has('features')) {
            $features = $this->features;
            if (is_array($features)) {
                $this->merge([
                    'features' => array_filter($features, function ($feature) {
                        return !empty(trim($feature));
                    })
                ]);
            }
        }

        // Convert is_featured to boolean if it exists
        if ($this->has('is_featured')) {
            $this->merge([
                'is_featured' => (bool) $this->is_featured
            ]);
        }
    }
}