import {Request, Response} from "express";
import IReservationsDto from "../dto/reservationsDto";
import { AppDataSource,ReservationsModel } from "../config/data-source";
import { Reservations } from "../entities/Reservations";
import { createReservationService, getAllReservationService, getReservationByIdService, cancelReservationService } from "../services/reservationServices";

export const getAllResrvationsController = async (req: Request, res: Response) => {
    const reservations:Reservations[]= await getAllReservationService();
    res.status(200)
    res.json(reservations);

};
export const getReservationByIdController = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const reservation = await getReservationByIdService(Number(id));
        
        // Verifica si no se encontró la reserva
        if (!reservation) {
            return res.status(404).json({ error: 'No se encontraron reservas' });
        }

        // Si la reserva existe, envía la respuesta con la reserva
        res.status(200).json(reservation);
    } catch (error) {
        console.error('Error retrieving reservation:', error);
        res.status(500).json({ error: 'Error retrieving reservation' });
    }
};


export const createReservationController = async (req: Request, res: Response) => {
    const newReservation: IReservationsDto = req.body;
    console.log(newReservation)
    createReservationService(newReservation)
        .then((reservation: Reservations) => {
            res.status(201).json(reservation);
        })
        .catch((error: any) => {
            console.error('Error creating reservation:', error);
            res.status(400).json({ error: 'Error creating reservation' });
        });
};


export const cancelReservationController = async (req: Request, res: Response) => {
    const {id}=req.params
    const cancelled=await cancelReservationService(Number(id))
    if (cancelled) {
        // Si se canceló correctamente, enviar una respuesta con un mensaje de éxito y los datos de la reserva cancelada
        res.json({ message: "La reserva se ha cancelado correctamente", cancelledReservation: cancelled });
    } else {
        // Si no se pudo cancelar la reserva, enviar una respuesta con un mensaje de error
        res.status(400).json({ error: "No se pudo cancelar la reserva" });
    }
}