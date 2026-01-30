import { Task } from "../entities/Task";


export interface ITaskRepository {
  create(task: Task): Promise<Task>;
  findById(UserId: string): Promise<Task[]>;
  update(id: string, task: Partial<Task>): Promise<void>;
  delete(id: string): Promise<void>;
}