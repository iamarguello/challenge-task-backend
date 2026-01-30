import { ITaskRepository } from "../../domain/repositories/ITaskRepository";

export class DeleteTask {
  constructor(private taskRepository: ITaskRepository) {}
  async execute(id: string) {
    return await this.taskRepository.delete(id);
  }
}