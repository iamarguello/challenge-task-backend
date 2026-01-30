// src/infrastructure/http/UserController.ts
import { Request, Response } from 'express';
import { addUserUseCase, getUserUseCase } from '../adapters/user.adapter';
import jwt, { SignOptions } from 'jsonwebtoken';
import { plainToInstance } from 'class-transformer';
import { UserCreateDto } from '../../domain/models/user.create';
import { validateOrReject } from 'class-validator';

export class UserController {

  static async authUser(req: Request, res: Response) : Promise<Response> {
    try {
      const { email } = req.body ; 
      if (!email) return res.status(400).json({ error: 'Email requerido' });

      const user = await getUserUseCase.execute(email);
      if(!user){
        return res.status(404).json({ message: "Usuario no existe", data: { code: "NOTFOUND" } });
      }
      //Crear token 
      const secret = process.env.PWD_SECRET!;
      const claims = { expiresIn: "1h"} as SignOptions;
      const token = jwt.sign({ email: user?.email, id: user?.id }, secret, claims )

      return res.status(200).json({ message: "Usuario logueado", data: { token: token, user: user } });

    } catch (error) {
      return res.status(500).json({ message: 'Error al buscar usuario', error: error });
    }
  }

  static async addUser(req: Request, res: Response)  : Promise<Response> {
    try {      
      const dtoUser = plainToInstance(UserCreateDto, req.body);
      await validateOrReject(dtoUser, { whitelist: true, forbidNonWhitelisted: true, })
      const newUser = await addUserUseCase.execute(dtoUser);
      
      return res.status(201).json({ message: 'Usuario registrado', data: newUser });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: 'Error al crear usuario', error: error });
    }
  }
}