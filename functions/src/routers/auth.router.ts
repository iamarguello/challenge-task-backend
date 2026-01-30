import { Router } from "express";
import { UserController } from "../infrastructure/http/UserController";

const router = Router();

router.post('/login', UserController.authUser);

export default router;