<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskResource;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    // LER (Lista todas as tarefas filtradas e paginadas)
    public function index(Request $request)
    {
        $query = $request->user()->tasks();

        // O Laravel tem de verificar se o Angular enviou o '?is_completed=0'
        if ($request->has('is_completed')) {
            $query->where('is_completed', $request->boolean('is_completed'));
        }

        $tarefas = $query->paginate(5)->withQueryString();
        
        return TaskResource::collection($tarefas);
    }

    // CRIAR
    public function store(StoreTaskRequest $request)
    {
        $tarefa = $request->user()->tasks()->create($request->validated());
        return response()->json(new TaskResource($tarefa), 201);
    }

    // ATUALIZAR
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $task->update($request->validated());
        return new TaskResource($task);
    }

    // APAGAR
    public function destroy(Task $task)
    {
        $task->delete();
        return response()->json(null, 204);
    }
}