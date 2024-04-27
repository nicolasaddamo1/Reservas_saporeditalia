//GET /turns=> obtener todos los turnos
//GET /turns/:id=> obtener un turno

//POST /turns/schedule=> crear un turno

//PUT /turns/cancel=> actualizar un turno

import {Router} from 'express';
import {getAllResrvationsController, getReservationByIdController, createReservationController,cancelReservationController} from '../controllers/reservationController';
const reservationRouter = Router();

reservationRouter.get("/",getAllResrvationsController);
reservationRouter.get("/:id",getReservationByIdController);
reservationRouter.post("/schedule", createReservationController);
reservationRouter.put("/cancel/:id", cancelReservationController);
export default reservationRouter



