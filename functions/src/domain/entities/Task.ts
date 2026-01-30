
//Interfaz que corresponde a las tareas 
export interface Task {
  id?: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  userId: string;
}