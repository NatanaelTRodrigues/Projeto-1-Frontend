// src/app/page.tsx
import UserService from '@/services/UserService'; 
import { IUser } from '@/models/IUser'; 

export default async function Home() {
  let users: IUser[] = [];
  let error = null;

  try {

    users = await UserService.getAllUsers();
  } catch (e) {
   
    error = "Erro ao carregar usuários. Certifique-se de que a API Java está rodando e acessível.";
    console.error(e);
  }

  return (
    <main className="flex flex-col min-h-screen items-center p-8 bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">TaskFlow Dashboard</h1>

      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-md mb-6 w-full max-w-lg">
          {error}
        </div>
      )}

      <div className="w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Usuários Registrados (Teste de Conexão)</h2>
        {users.length > 0 ? (
          <ul className="space-y-3">
            {users.map(user => (
              <li key={user.id} className="p-4 bg-white shadow rounded-lg border-l-4 border-blue-500">
                <p className="text-sm text-gray-500">{user.email}</p>
                <p className="text-xs text-gray-400">ID: {user.id}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Nenhum usuário encontrado (ou API não configurada).</p>
        )}
      </div>
    </main>
  );
}