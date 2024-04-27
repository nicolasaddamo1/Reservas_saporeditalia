import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import style from "./ReservasForm.module.css";

const POST_URL = "http://localhost:3000/reservations/schedule";

export default function ReservasForm() {
    const initialState = {
        date:"",
        time:"",
        status:"Active"
    }


const [reserva, setReserva] = useState(initialState);
const [errors, setErrors] = useState({date:"debe ingresar una fecha", time:"debe ingresar una hora"});

const validateReserva=({
    date,
    time
})=>{
    const errors = {};

        // Obtener la fecha y hora actuales
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1; // Se agrega 1 porque los meses en JavaScript van de 0 a 11
        const currentDay = currentDate.getDate();
        const currentHour = currentDate.getHours();
        const currentMinute = currentDate.getMinutes();
    
        // Convertir la fecha y hora ingresadas a objetos Date
        const selectedDate = new Date(date);
        const selectedTime = new Date(time);
    
        // Comparar la fecha y hora ingresadas con la fecha y hora actuales
        if (selectedDate.getFullYear() < currentYear ||
            (selectedDate.getFullYear() === currentYear && selectedDate.getMonth() + 1 < currentMonth) ||
            (selectedDate.getFullYear() === currentYear && selectedDate.getMonth() + 1 === currentMonth && selectedDate.getDate() < currentDay) ||
            (selectedDate.getFullYear() === currentYear && selectedDate.getMonth() + 1 === currentMonth && selectedDate.getDate() === currentDay && selectedTime.getHours() < currentHour) ||
            (selectedDate.getFullYear() === currentYear && selectedDate.getMonth() + 1 === currentMonth && selectedDate.getDate() === currentDay && selectedTime.getHours() === currentHour && selectedTime.getMinutes() <= currentMinute)) {
            errors.date = "La fecha y hora deben ser posteriores al momento actual";
        }
        


    if (!date) errors.date = "debe ingresar una fecha";
    if (!time) errors.time = "debe ingresar una hora";
    return errors;
};

const userId = useSelector(state => state.actualUser?.userData?.user?.id);
const navigate = useNavigate();
const handleSubmit = (event) => {
    event.preventDefault()

        const newReserva = {
            date:reserva.date,
            time:reserva.time,
            status:reserva.status,
            userId:userId
        }



    axios
    .post(POST_URL, newReserva)
    .then(({data})=>data)
    .then((reservaInDB)=>{
        alert("Reserva creada exitosamente");
        setReserva(initialState);
        navigate("/reservas");  
    })
    .catch((error)=> alert("Error al crear la reserva ", error.message))
}
const handleInputChange = (event) => {
    const {name, value} = event.target
    setReserva({
        ...reserva,
        [name]:value
    })
    setErrors(validateReserva({
        ...reserva,
        [name]:value
    }))
}

const formData = [
    {
        label:"Fecha: ",
        name:"date",
        type:"date",
        placeholder:"Fecha de la reserva"
    },
    {
        label:"Hora: ",
        name:"time",
        type:"time",
        placeholder:"Hora de la reserva"
    },
    {
        
        label:"Estado",
        name:"status",
        type:"text",
        placeholder:"Estado de la reserva",
    }

];

return (
    <div>
        <h1 style={{color: "yellow", textShadow: "3px 3px 3px #000000" }}>Crear Reserva</h1>
        <hr style={{border: "1px solid yellow", boxShadow: "3px 3px 3px #000000"}}/>
        <form  className = {style.card} onSubmit={handleSubmit}>
            {formData.map(({label, name, type, placeholder}) => (
                <div key={name}>
                    <label htmlFor={name}>{label}</label>
                    <input
                        style={{borderRadius:"10px", height:"40px"}}
                        type={type}
                        name={name}
                        placeholder={placeholder}
                        value={reserva[name]}
                        onChange={handleInputChange}
                        readOnly={name === "status"}
                        
                    />
                    <p style={{color:"red"}}>{errors[name]}</p>
                </div>
            ))}
            <button type="submit" disabled={Object.keys(reserva).some((e)=>!reserva[e])}>Crear Reserva</button>
        </form>
    </div>
)}