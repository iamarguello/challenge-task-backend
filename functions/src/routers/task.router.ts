import { Router } from "express";
import { TaskController } from "../infrastructure/http/TaskController";

const router = Router();

router.get('/:id', TaskController.getById);
router.post('/', TaskController.addTask);
router.put('/:id', TaskController.updateTask);
router.delete('/:id', TaskController.deleteTask);

export default router;