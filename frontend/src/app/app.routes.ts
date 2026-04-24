import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { TaskList } from './components/task-list/task-list';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  // 1. Quando o utilizador for para localhost:4200/login
  { path: 'login', component: Login },
  
  // 2. Quando o utilizador for para localhost:4200/register
  { path: 'register', component: Register },
  
  // 3. Quando o utilizador for para localhost:4200/tasks
  { 
    path: 'tasks', 
    component: TaskList,
    // 2. Colocamos o segurança a proteger esta porta! 
    canActivate: [authGuard]
  },
  
  // 4. Se ele entrar na raiz (localhost:4200), redirecionamos para o login
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];