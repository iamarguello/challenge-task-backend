import { Task } from '../../domain/entities/Task';
import { TaskCreateDto } from '../../domain/models/task.create';
import { ITaskRepository } from '../../domain/repositories/ITaskRepository';

export class CreateTask {

  constructor(private taskRepository: ITaskRepository) {}

  async execute(taskData: TaskCreateDto): Promise<Task> {

    if (!taskData.title || taskData.title.length < 3) {
      throw new Error('El título de la tarea es demasiado corto.');
    }
    if (!taskData.description || taskData.description.length < 5) {
      throw new Error('La descripción de la tarea es demasiado corto.');
    }

    const newTask: Task = {
      ...taskData,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    return await this.taskRepository.create(newTask);
  }
}