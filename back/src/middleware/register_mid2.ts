import { Request, Response, NextFunction } from 'express';
import { UserModel, CredentialsModel } from '../config/data-source';

const register_mid2 = async (req: Request, res: Response, next: NextFunction) => {
    console.log("este es el req.body del mid",req.body.user)
    const {username,email,nDNI}=req.body.user
    
    try {

        // Verificar si ya existe un usuario con el mismo username
        const existingUser = await CredentialsModel.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: 'El nombre de usuario ya está en uso.' });
        }

        // Verificar si ya existe un usuario con el mismo email
        const existingEmailUser = await UserModel.findOne({ where: { email } });
        if (existingEmailUser) {
            return res.status(400).json({ message: 'El email ya está registrado.' });
        }

        // Verificar si ya existe un usuario con el mismo dni
        const existingDNIUser = await UserModel.findOne({ where: { nDNI } });
        if (existingDNIUser) {
            return res.status(400).json({ message: 'El DNI ya está registrado.' });
        }

        // Si no hay usuarios duplicados, continuar al siguiente middleware
        next();
    } catch (error) {
        console.error('Error en el middleware de registro:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export default register_mid2;
