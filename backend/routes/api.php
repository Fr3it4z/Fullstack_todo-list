<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\AuthController;

// ROTAS PÚBLICAS (A porta da rua, qualquer pessoa pode aceder)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// ROTAS PRIVADAS (A zona VIP, protegida pelo segurança Sanctum)
Route::middleware('auth:sanctum')->group(function () {
    
    // Todas as tuas rotas de tarefas exigem Token a partir de agora!
    Route::apiResource('tasks', TaskController::class);

    Route::post('/logout', [AuthController::class, 'logout']);
    
});