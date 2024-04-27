import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../config/data-source';

// Define una interfaz que extienda el tipo Request de Express y agregue la propiedad user
interface CustomRequest extends Request {
    user?: any; // Podrías cambiar 'any' por el tipo adecuado para tu usuario si lo conoces
}

export const validateOneUser = async (req: CustomRequest, res: Response, next: NextFunction)=> {
    const { id } = req.params;

    try {
        const userId = parseInt(id, 10); // Convierte id de string a number
        const user = await UserModel.findOneBy({ id: userId });

        if (user) {
            req.user = user; // Almacena el usuario encontrado en la propiedad user del objeto req
            next();
        } else {
            return res.status(404).send('Usuario no encontrado');
        }
    } catch (error) {
        return res.status(500).send('Error interno del servidor');
    }
}
