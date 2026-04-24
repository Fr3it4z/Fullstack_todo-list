import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard = () => {
  const router = inject(Router);
  
  // O segurança vai procurar a pulseira VIP (token) guardada no browser
  const token = localStorage.getItem('token');

  if (token) {
    return true; // Tem pulseira! Pode entrar na rota.
  } else {
    // Não tem pulseira! É bloqueado e atirado de volta para o Login.
    router.navigate(['/login']); 
    return false;
  }
};