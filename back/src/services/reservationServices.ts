import { FindManyOptions } from "typeorm";
import IReservationsDto from "../dto/reservationsDto";
import { ReservationsModel } from "../config/data-source";
import { Reservations } from "../entities/Reservations";

export const createReservationService = async (reservationDto: IReservationsDto): Promise<Reservations> => {
    try {
        const newReservation = await ReservationsModel.create(reservationDto);
        const result = await ReservationsModel.save(newReservation);
        return result;
    } catch (error) {
        // Manejar cualquier error que ocurra durante el guardado en la base de datos
        console.error('Error al guardar la reserva:', error);
        throw new Error('Error al guardar la reserva en la base de datos');
    }
};
export const getAllReservationService= async ():Promise<Reservations[]>=>{
    const reservations =await ReservationsModel.find()
    return reservations

}
export const getReservationByIdService = async (id: number): Promise<Reservations | null> => {
    const reservation = await ReservationsModel.findOneBy({ id });
    console.log(id, "reservation", reservation);
    return reservation;
}

export const cancelReservationService = async(id:number)=>{
    const reservation=await ReservationsModel.findOneBy({id})
    if(reservation){
        reservation.status="Cancelled"
        console.log(reservation)
        await ReservationsModel.save(reservation)
        return reservation
    }
}

export const getReservationsByUserIdService = async (userId: number): Promise<Reservations[]> => {
    const options: FindManyOptions<Reservations> = {
        where: {
            userId: userId
        }
    };

    const reservations = await ReservationsModel.find(options);
    return reservations;
};