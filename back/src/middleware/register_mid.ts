import { Request, Response, NextFunction } from 'express';

export const validateUserMiddleware = async (req: Request, res: Response, next: NextFunction)=> {
    const { name, apellido, nDNI, nTel, fNacimiento, email, password, username } = await req.body.user;
    console.log("aaa",req.body.user);
    if (!name || !apellido || !nDNI || !nTel || !fNacimiento || !email || !password || !username) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    // Aquí podrías agregar más validaciones según tus requisitos, por ejemplo, verificar el formato del correo electrónico, etc.
    next();
}