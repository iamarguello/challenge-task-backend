
import { CreateTask } from "../../application/tasks/CreateTask";
import { DeleteTask } from "../../application/tasks/DeleteTask";
import { GetTasks } from "../../application/tasks/GetTasks";
import { UpdateTask } from "../../application/tasks/UpdateTask";
import { FirestoreTaskRepository } from "../persistence/FirestoreTaskRepository";

const taskRepository = new FirestoreTaskRepository();

export const createTaskUseCase = new CreateTask(taskRepository);
export const updateTaskUseCase = new UpdateTask(taskRepository);
export const deleteTaskUseCase = new DeleteTask(taskRepository);
export const getTaskUseCase = new GetTasks(taskRepository);
