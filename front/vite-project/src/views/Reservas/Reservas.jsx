import React, { useEffect, useState } from "react";
import ReservasCard from "./ReservasCard";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios"
import { setReservasUser } from "../../redux/userSlice";

const GETUSERBYID_URL="http://localhost:3000/users/"
function Reservas() {
    const activeUser = useSelector(state => state.actualUser?.userData?.user?.id);
    const reservas = useSelector(state => state.actualUser?.reservasUser);




    const dispatch = useDispatch();
    useEffect(() => {
        axios
        .get (GETUSERBYID_URL+activeUser)
        .then(response => response.data.reservations)
        .then(reservations=> dispatch(setReservasUser(reservations)))
        .catch((error) => console.log(error))
    }, [activeUser, dispatch])
    const CANCEL_URL="http://localhost:3000/reservations/cancel/"
    const handleCancelReservation=(reservaId)=>{
        axios
        .put (CANCEL_URL+reservaId)
        .then(response => response.data)
        .then(data=> 
            axios
            .get (GETUSERBYID_URL+activeUser)
            .then(response => response.data.reservations)
            .then(reservations=> dispatch(setReservasUser(reservations)))
            .catch((error) => console.log(error)))
        .catch((error) => console.log(error))
}

    return (
            <div style={{
                backgroundColor: "rgba(101, 67, 33, 0.57)", // Color de fondo oscuro
                color: "rgb(237, 216, 80)",
                padding: "20px",
                margin: "10px",
                marginTop: "117px",
                borderRadius: "15px",
                border: "1px dashed brown"
            }}>


            <h1 style={{color: "yellow", textShadow: "3px 3px 3px #000000" }}>Reservas</h1>
            <h3 style={{color: "yellow", textShadow: "3px 3px 3px #000000"}}>Estos son las reservas del usuario</h3>
            <div >
                {reservas.length
                ?
                reservas.map((reserva) => {
                    return <ReservasCard key={reserva.id} {...reserva} handleCancelReservation={handleCancelReservation}/>;
                    
                    
                })
                : <p>No hay reservas</p>
            
            }
            </div>

        </div>
    );
}

export default Reservas;
