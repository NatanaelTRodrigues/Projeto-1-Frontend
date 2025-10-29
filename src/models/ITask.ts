// src/models/ITask.ts
export interface ITask {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  dueDate?: string; 
  userId: number;
  
}