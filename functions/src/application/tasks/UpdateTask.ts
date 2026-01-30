import { Task } from "../../domain/entities/Task";
import { ITaskRepository } from "../../domain/repositories/ITaskRepository";

export class UpdateTask {
  constructor(private taskRepository: ITaskRepository) {}
  async execute(id: string, data: Partial<Task>) {
    return await this.taskRepository.update(id, data);
  }
}