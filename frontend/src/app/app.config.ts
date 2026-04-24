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