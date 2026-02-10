<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PortfolioRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $rules = [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string|max:100',
            'status' => 'required|in:draft,published',
            'seo_title' => 'nullable|string|max:255',
            'seo_description' => 'nullable|string|max:500',
        ];

        // For create, image is required
        if ($this->isMethod('post')) {
            $rules['image'] = 'required|image|max:2048'; // 2MB max
        } else {
            $rules['image'] = 'nullable|image|max:2048';
        }

        return $rules;
    }
}