<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    //Função para registar
    public function register(Request $request)
    {
        //Validar os Campos todos os campos
        $validcamps = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:6' 
        ]);

        //Cria o utilizador e faz o hash da password
        $user = User::create([
            'name' => $validcamps['name'],
            'email' => $validcamps['email'],
            'password' => Hash::make($validcamps['password'])
        ]);

        //Cria o token para o user
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Conta criada com sucesso!',
            'token' => $token
        ],201);
    }

public function Login(Request $request)
    {
        $validcamps = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string'
        ]);

        $utilizador = User::where('email', $validcamps['email'])->first();

        // 🔴 CORRIGIDO: Agora usa $validcamps['password']
        if (!$utilizador || !Hash::check($validcamps['password'], $utilizador->password)) {
            return response()->json(['message' => 'Credenciais incorretas'], 401);
        }

        // Se tudo estiver bem, gera um novo Token
        $token = $utilizador->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login efetuado com sucesso!',
            'token' => $token
        ]);
    }
    // 3. FAZER LOGOUT
    public function logout(Request $request)
    {
        // Vai buscar o Token que está a ser usado neste momento e apaga-o da base de dados!
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logout efetuado com sucesso. Volte sempre!'
        ]);
    }
}
