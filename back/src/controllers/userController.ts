import { Request, Response } from "express";
import {User} from "../entities/User";
import {createUserService,getUserService,getUserByIdService} from "../services/userServices"
import { ReservationsModel } from "../config/data-source";
import { Reservations } from "../entities/Reservations";
import { getReservationsByUserIdService } from "../services/reservationServices";
export interface CredentialAndUser { // aca tengo 
    username: string;
    password: string;
    user: User;
}
export const createUserController = async (req: Request, res: Response) => {
const {name,apellido,nDNI,nTel,fNacimiento,email, username, password}=req.body.user
console.log ("este es el req.body del controller", req.body)

try {
    const newUser: User = await createUserService({ name, apellido, nDNI, nTel, fNacimiento, email, username, password });
    res.status(201).json(newUser);
} catch (error) {
    console.error('Error al crear usuario:', (error as Error).message);
    res.status(400).json({ error: (error as Error).message }); // Enviar el mensaje de error al cliente
}
}
export const getAllUsersController = async (req: Request, res: Response) => {
    const users:User[] = await getUserService();
    res.status(200)
    .json(users);

}
export const getUserController = async (req: Request, res: Response) => {
    const users:User[]= await getUserService();
    res.status(200)
    .json(users);
}
export const getUserbyIdController = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const user: User | null = await getUserByIdService(Number(id));
        
        if (!user) {
            res.status(404).json({ error: 'Usuario no encontrado' });
            return;
        }

        let reservations: Reservations[] = [];
        reservations = await getReservationsByUserIdService(user.id);

        res.status(200).json({ user, reservations });
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        res.status(500).json({ error: 'Error al obtener usuario' });
    }
};

export const updateUserController = async (req: Request, res: Response) => {res.send("actualizar un usuario")}
export const deleteUserController = async (req: Request, res: Response) => {res.send("borrar un usuario")}

