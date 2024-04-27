import React from "react";
import style from "./rc.module.css";
const ReservasCard = ({ id, userId, date, time, status, handleCancelReservation }) => {
    const handleClick = () => {
        if(window.confirm("¿Seguro que desea cancelar esta reserva?")){
            handleCancelReservation(id);
        }

    }
    return (
        <div style={{marginTop:"10px"}}>
        <div className={style.card} key={id}>
            <h4  className={style.card}>Usuario: {userId}</h4>
            <h4  className={style.card}>Fecha: {date}</h4>
            <h4  className={style.card}>Hora: {time}</h4>
            <h4  className={style.card}>{status}</h4>
            <button disabled={status === "Canceled"} onClick={handleClick}>Cancelar</button>
            <br />
        </div>
        <br />
        </div>

        
    );
};

export default ReservasCard;
