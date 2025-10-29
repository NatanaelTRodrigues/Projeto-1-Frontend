// src/app/(dashboard)/dashboard/page.tsx
import TaskService from '@/services/taskService';
import { ITask } from '@/models/ITask';

const TEST_USER_ID = 1; 

export default async function DashboardPage() {
  let tasks: ITask[] = [];
  let error = null;

  try {
   
    tasks = await TaskService.getTasksByUserId(TEST_USER_ID);

  } catch (e: any) {
    
    if (e.response && e.response.status === 401) {
        error = "Acesso Negado: O token JWT não foi aceito pelo Backend Java.";
    } else {
        error = "Erro ao carregar tarefas. Verifique se o Backend Java está rodando.";
    }
    console.error(e);
  }

  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">🛠️ Seu TaskFlow Dashboard</h1>

      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-md mb-6 w-full max-w-xl">
          **ERRO DE CONEXÃO/SEGURANÇA:** {error}
        </div>
      )}

      <div className="w-full max-w-xl">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Minhas Tarefas (Protegidas)</h2>
        {tasks.length > 0 ? (
          <ul className="space-y-3">
            {tasks.map(task => (
              <li key={task.id} className={`p-4 bg-white shadow rounded-lg border-l-4 ${task.completed ? 'border-green-500' : 'border-red-500'}`}>
                <p className="font-medium text-lg">{task.title}</p>
                <p className="text-sm text-gray-500">Prazo: {task.dueDate || 'Não definido'}</p>
                <span className={`text-xs font-semibold ${task.completed ? 'text-green-600' : 'text-red-600'}`}>
                    {task.completed ? 'Concluída' : 'Pendente'}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Nenhuma tarefa encontrada. Comece a criar uma!</p>
        )}
      </div>
    </main>
  );
}