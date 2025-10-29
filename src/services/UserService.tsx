import api from './api';
import { IUser } from '../models/IUser';

const UserService = {

  getAllUsers: async (): Promise<IUser[]> => {
    try {
      
      const response = await api.get<IUser[]>('/users');
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar todos os usuários:", error);
      throw error; 
    }
  },

  
  getUserById: async (id: number): Promise<IUser> => {
    const response = await api.get<IUser>(`/users/${id}`);
    return response.data;
  },
};

export default UserService;