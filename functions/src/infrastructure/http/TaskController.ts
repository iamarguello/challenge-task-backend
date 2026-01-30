import { Request, Response } from 'express';
import { createTaskUseCase, deleteTaskUseCase, getTaskUseCase, updateTaskUseCase } from '../adapters/task.adapter';
import { plainToInstance } from 'class-transformer';
import { TaskCreateDto } from '../../domain/models/task.create';
import { validateOrReject } from 'class-validator';

export class TaskController {

  static async getById(req: Request, res: Response) : Promise<Response> {
    try {
      const userId = req.params.id as string;    
      if(!userId){return res.status(400).json({message: 'UserId es requerido', error: 400 });}
      const tasks = await getTaskUseCase.execute(userId);
      return res.status(200).json(tasks);
    } catch (error) {
      return res.status(500).json({ message: 'Error al obtener tareas', error });
    }
  }

  static async addTask(req: Request, res: Response): Promise<Response> {
    try {      
      const userId = (req as any).user?.id;
      const dto = { ...req.body, userId };
      console.log('dto', dto);
      const dtoTask = plainToInstance(TaskCreateDto, dto);
      
      await validateOrReject(dtoTask, { whitelist: true, forbidNonWhitelisted: true, })
      
      await createTaskUseCase.execute(dtoTask);
      
      return res.status(201).json({ message: 'Tarea creada con éxito' });
    } catch (error) {
      return res.status(400).json({ message: 'Error al crear tarea', error });
    }
  }

  static async updateTask(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id as string;      
      if(!id) return res.status(400).json({ message: 'El ID es requerido'});
      await updateTaskUseCase.execute(id, req.body);
      return res.status(200).json({ message: 'Tarea actualizada' });
    } catch (error) {
      return res.status(400).json({ message: 'Error al actualizar', error });
    }
  }

  static async deleteTask(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id as string;    
      if(!id) return res.status(400).json({ message: 'El ID es requerido'});  
      await deleteTaskUseCase.execute(id);
      return res.status(200).json({ message: 'Tarea eliminada' });
    } catch (error) {
      return res.status(400).json({ message: 'Error al eliminar', error });
    }
  }
}

