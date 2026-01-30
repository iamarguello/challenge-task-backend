import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No se proporcionó un token de autenticación' });
  }

  const [ , token ] = header.split(' ');
  try {

    const decodedToken = await jwt.verify(token, process.env.PWD_SECRET!) as JwtPayload;
    if(!decodedToken || !decodedToken.id || !decodedToken.email)
      return res.status(403).json({ error: "Token no válido" });

    (req as any).user = decodedToken;
    
    return next();
  } catch (error) {
    return res.status(403).json({ error: 'Token inválido o expirado' });
  }
};