// src/services/taskService.ts
import api from './api';
import { ITask } from '@/models/ITask'; 

const TaskService = {

  /**
   * Busca todas as tarefas associadas a um ID de usuário específico.
   * Este endpoint está protegido por JWT no backend Java.
   */
  getTasksByUserId: async (userId: number): Promise<ITask[]> => {
    try {
      
      const response = await api.get<ITask[]>(`/tasks/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar tarefas para o usuário ${userId}:`, error);
      throw error;
    }
  },


};

export default TaskService;