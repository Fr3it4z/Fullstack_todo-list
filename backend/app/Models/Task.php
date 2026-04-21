<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    // TUDO o que é da Tarefa vive aqui dentro destas chavetas!

    // 1. O Escudo (quais os campos que o Angular pode preencher)
    protected $fillable = [
        'title', 
        'is_completed', 
        'user_id'
    ];

    // 2. A Relação (A tarefa pertence a um utilizador)
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
