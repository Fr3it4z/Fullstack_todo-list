import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Auth } from '../../services/auth'; // O nosso Estafeta
import { Router } from '@angular/router'; // O GPS do Angular

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule], // 🟢 OBRIGATÓRIO: Liga os Reactive Forms
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  
  // 1. Criamos a "planta" do nosso formulário com regras rígidas
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  // 2. Contratamos o Estafeta (Auth) e o GPS (Router)
  constructor(private authService: Auth, private router: Router) {}

  // 3. A ação que corre quando clicamos no botão "Entrar"
  fazerLogin() {
    // Só tenta enviar se o email e a password estiverem preenchidos corretamente
    if (this.loginForm.valid) {
      
      // Manda o estafeta ao Laravel com os dados do formulário
      this.authService.login(this.loginForm.value).subscribe({
        
        // Se o Laravel disser "200 OK" (Sucesso!)
        next: (resposta: any) => {
          // Guardamos a Pulseira VIP (Token) no bolso secreto do browser (localStorage)
          localStorage.setItem('token', resposta.token);
          
          // O GPS leva-nos para a página de tarefas!
          this.router.navigate(['/tasks']);
        },
        
        // Se o Laravel disser "401 Unauthorized" (Erro!)
        error: (erro) => {
          console.error(erro);
          alert('Email ou password incorretos!');
        }
      });
    }
  }
}