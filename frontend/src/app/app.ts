import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
// 1. Adicionamos o withInterceptors aqui
import { provideHttpClient, withInterceptors } from '@angular/common/http'; 
// 2. Importamos o nosso carimbador
import { authInterceptor } from './interceptors/auth-interceptor';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // 3. Ligamos o carimbador ao nosso HTTP
    provideHttpClient(withInterceptors([authInterceptor])) 
  ]
};

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // 🟢 OBRIGATÓRIO: Permite usar a "Janela Mágica"
  template: `<router-outlet></router-outlet>`, // A nossa tela em branco para as rotas
})
export class AppComponent { 
  // O nome tem de ser exatamente este para o main.ts o conseguir encontrar
  title = 'frontend';
}