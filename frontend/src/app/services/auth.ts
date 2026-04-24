import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Auth { // Mantemos o nome mais curto aqui!
  
  // A morada do teu Laravel
  private apiUrl = 'http://127.0.0.1:8000/api';

  // Injetamos o HttpClient no construtor para o podermos usar
  constructor(private http: HttpClient) { }

  // A função que o nosso formulário vai chamar
  login(dadosLogin: any) {
    return this.http.post(`${this.apiUrl}/login`, dadosLogin);
  }
  logout() {
    // O teu interceptor já vai colar o token automaticamente neste pedido!
    return this.http.post('http://127.0.0.1:8000/api/logout', {});
  }
}