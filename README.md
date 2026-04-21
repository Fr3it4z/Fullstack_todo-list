# 📝 Task Manager Pro - Full-Stack SPA

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![MariaDB](https://img.shields.io/badge/MariaDB-003545?style=for-the-badge&logo=mariadb&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

Uma Single Page Application (SPA) completa e segura para gestão de tarefas. Este projeto adota uma arquitetura *headless*, separando totalmente as responsabilidades entre o Frontend (Angular) e a API RESTful (Laravel).

## ✨ Funcionalidades

* **Autenticação Segura:** Registo, Login e Logout protegidos por tokens através do Laravel Sanctum.
* **Rotas Protegidas:** Implementação de `AuthGuards` no Angular para bloquear acessos não autorizados.
* **Sincronização Contínua:** `HttpInterceptors` configurados para anexar automaticamente o *Bearer Token* em cada pedido.
* **CRUD Completo:** Criação, Leitura, Atualização de Estado (Pendente/Concluída) e Eliminação de tarefas.
* **Alta Performance (Server-Side):**
  * Filtros de estado aplicados diretamente nas *queries* da base de dados.
  * Paginação de resultados gerida pelo *backend*, garantindo estabilidade independentemente do volume de dados.

---

## 🛠️ Stack Tecnológico

**Frontend**
* Angular (Componentes Standalone, Control Flow `@for`/`@if`)
* TypeScript
* HTML5 & CSS3 (Design Responsivo)

**Backend & Infraestrutura**
* PHP 8.x
* Laravel Framework
* MariaDB / MySQL
* Laravel Sanctum (Autenticação)

---

## 🚀 Como Executar Localmente

### Pré-requisitos
Certifica-te de que tens instalado na tua máquina:
* [Node.js](https://nodejs.org/) (para o Angular)
* [PHP](https://www.php.net/) e [Composer](https://getcomposer.org/) (para o Laravel)
* Servidor de Base de Dados (MySQL / MariaDB via XAMPP, Laragon, ou nativo)

### 1. Configurar o Backend (API Laravel)

Abre o terminal, navega até à pasta do backend e executa:


# 1. Instalar dependências do PHP
composer install

# 2. Criar o ficheiro de ambiente
cp .env.example .env

# 3. Gerar a chave de segurança da aplicação
php artisan key:generate

Abre o ficheiro .env na pasta do backend e configura a ligação à tua base de dados:
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nome_da_tua_bd
DB_USERNAME=teu_utilizador
DB_PASSWORD=tua_senha

Finalizar o Backend:
# 4. Criar as tabelas na base de dados
php artisan migrate

# 5. Iniciar o servidor local (A API ficará a correr em [http://127.0.0.1:8000](http://127.0.0.1:8000))
php artisan serve

### 2. Configurar o Frontend (Angular)

Abre um novo terminal (mantém o backend a correr no outro), navega até à pasta do frontend e executa:

# 1. Instalar as dependências do Node
npm install

# 2. Iniciar o servidor de desenvolvimento
ng serve

Acede a http://localhost:4200 no teu browser. A aplicação está pronta a usar!

Resumo da API REST

A comunicação entre sistemas é feita em formato application/json através dos seguintes endpoints principais:

Método,Endpoint,Descrição,Proteção
POST,/api/register,Registo de novo utilizador,Pública
POST,/api/login,Autenticação e geração de Token,Pública
POST,/api/logout,Destruição do Token de sessão,Sanctum
GET,/api/tasks,Lista as tarefas (aceita ?is_completed= e ?page=),Sanctum
POST,/api/tasks,Cria uma nova tarefa,Sanctum
PUT,/api/tasks/{id},Atualiza o estado da tarefa,Sanctum
DELETE,/api/tasks/{id},Remove a tarefa permanentemente,Sanctum

Autor

Desenvolvido por Afonso Freitas.

    GitHub: @fr3it4z