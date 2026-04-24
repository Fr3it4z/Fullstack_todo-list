import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; 
import { Task } from '../../services/task';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.css']
})
export class TaskList implements OnInit {
  
  tarefas: any[] = [];
  novaTarefa: string = ''; 
  filtroAtual: string = 'todas'; // Pode ser 'todas', 'pendentes' ou 'concluidas'
  linksPaginacao: any = {};

  constructor(
    private taskService: Task, 
    private cdr: ChangeDetectorRef,
    private authService: Auth,
    private router: Router
  ) {}

  ngOnInit() {
    this.carregarTarefas();
  }

  // CARREGAR TAREFAS: Envia o filtro atual para o Serviço
  carregarTarefas(url: string | null = null) {
    this.taskService.getTasks(url, this.filtroAtual).subscribe({
      next: (resposta: any) => {
        this.tarefas = resposta.data; 
        this.linksPaginacao = resposta.links; 
        this.cdr.detectChanges(); 
      },
      error: (erro) => console.error(erro)
    });
  }

  // MUDAR FILTRO: Avisa o Laravel da mudança
  mudarFiltro(novoFiltro: string) {
    this.filtroAtual = novoFiltro;
    this.carregarTarefas(); // Pede a lista de novo ao Laravel com o novo filtro
  }

  // MUDAR PÁGINA
  mudarPagina(url: string | null) {
    if (url) {
      this.carregarTarefas(url);
    }
  }

  // ADICIONAR
  adicionarTarefa() {
    if (!this.novaTarefa.trim()) return;

    this.taskService.createTask(this.novaTarefa).subscribe({
      next: () => {
        this.novaTarefa = ''; 
        this.carregarTarefas(); 
      },
      error: (erro) => console.error(erro)
    });
  }

  // CONCLUIR / DESFAZER
  alternarEstado(tarefa: any) {
    const novoEstado = !tarefa.is_completed; 

    this.taskService.updateTask(tarefa.id, novoEstado).subscribe({
      next: () => {
        this.carregarTarefas(); 
      },
      error: (erro) => console.error(erro)
    });
  }

  // APAGAR
  apagarTarefa(id: number) {
    if (confirm('Tens a certeza que queres apagar esta tarefa?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          this.carregarTarefas(); 
        },
        error: (erro) => console.error(erro)
      });
    }
  }

  // SAIR
  sair() {
    this.authService.logout().subscribe({
      next: () => {
        localStorage.removeItem('token'); 
        this.router.navigate(['/login']); 
      },
      error: (erro) => {
        console.error('Erro ao sair:', erro);
        localStorage.removeItem('token'); 
        this.router.navigate(['/login']);
      }
    });
  }
}