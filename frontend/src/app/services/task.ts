import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Task {
  private apiUrl = 'http://127.0.0.1:8000/api/tasks';

  constructor(private http: HttpClient) {}

  // LER (Agora prepara o filtro para enviar ao Laravel)
// Atualiza esta função no teu task.ts
  getTasks(url: string | null = null, filtro: string = 'todas') {
    // Se a paginação nos deu um URL (ex: página 2), usamos esse diretamente
    if (url) return this.http.get(url);

    // Se for um pedido novo, verificamos o filtro e criamos os parâmetros
    let params = '';
    if (filtro === 'pendentes') params = '?is_completed=0';
    if (filtro === 'concluidas') params = '?is_completed=1';

    return this.http.get(`${this.apiUrl}${params}`);
  }

  // CRIAR
  createTask(title: string) {
    return this.http.post(this.apiUrl, { title: title });
  }

  // ATUALIZAR
  updateTask(id: number, is_completed: boolean) {
    return this.http.put(`${this.apiUrl}/${id}`, { is_completed: is_completed });
  }

  // APAGAR
  deleteTask(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}