
import { ITaskRepository } from "../../domain/repositories/ITaskRepository";

export class GetTasks {
  constructor(private taskRepository: ITaskRepository) {}
  async execute(userId: string) {
    return await this.taskRepository.findById(userId);
  }
}