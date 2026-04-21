<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreTaskRequest extends FormRequest
{

 // 1. Autorização (Vamos deixar a true por agora, tratamos da segurança mais tarde)
    public function authorize(): bool
    {
        return true; 
    }

    // 2. As Regras de Ouro
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'is_completed' => 'boolean',
        ];
    }
}
