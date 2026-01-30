import { Router } from "express";
import { UserController } from "../infrastructure/http/UserController";

const router = Router();

router.post('/', UserController.addUser);

export default router;