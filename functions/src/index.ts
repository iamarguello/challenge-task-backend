import * as functions from 'firebase-functions';
import express from 'express';
import cors from 'cors';
import { authMiddleware } from './infrastructure/http/AuthMiddleware';
import authRouter from './routers/auth.router';
import userRouter from './routers/user.router';
import taskRouter from './routers/task.router';

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

// --- Rutas Públicas ---
app.use('/auth', authRouter);

// Endpoints con autenticación
app.use('/users', userRouter)
app.use('/tasks', authMiddleware, taskRouter)

export const api = functions.https.onRequest(app);