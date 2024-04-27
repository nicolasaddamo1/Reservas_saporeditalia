import axios from 'axios';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; 
import { format } from 'date-fns';
import styles from './Register.module.css';

const Register = () => {
    const [form, setForm] = useState({
        name: "",
        apellido: "",
        nDNI: 0,
        nTel: 0,
        fNacimiento: null,
        email: "",
        username: "",
        password: ""
    });

    const [errors, setErrors] = useState({
        name: "",
        apellido: "",
        nDNI: "",
        nTel: "",
        fNacimiento: "",
        email: "",
        username: "",
        password: ""
    });

    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(form);
        if (!validateForm()) return;
        try {
            const response = await axios.post("http://localhost:3000/users/register", { user: form });
            console.log(response.data);
            alert("Usuario creado exitosamente");
        }  catch (error) {
            console.log(error.message);
            if (error.response || error.response.data || error.response.data.message) {
                const errorMessage = JSON.stringify(error.response.data);
                alert(errorMessage);
            } else {
                alert("Ocurrió un error al procesar la solicitud.");
            }
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setForm({
            ...form,
            [name]: value
        });

        // Validar el campo que se está modificando
        validateField(name, value);
    };

    const handleDateChange = (date) => {
        if (date && !isNaN(date.getTime())) {
            const dateFormatted = format(date, 'yyyy/MM/dd');
            setForm({
                ...form,
                fNacimiento: dateFormatted
            });
        } else {
            console.error('Fecha inválida');
        }
    };

    const validateField = (fieldName, value) => {
        const newErrors = { ...errors };

        // Validar el campo especificado
        switch (fieldName) {
            case "name":
                newErrors.name = value.trim() === "" ? "Debe ingresar un nombre." : "";
                break;
            case "apellido":
                newErrors.apellido = value.trim() === "" ? "Debe ingresar un apellido." : "";
                break;
            case "email":
                if (!value.trim()) {
                    newErrors.email = "Debe ingresar un correo electrónico.";
                } else if (!/\S+@\S+\.\S+/.test(value)) {
                    newErrors.email = "Debe ingresar un correo electrónico válido.";
                } else {
                    newErrors.email = "";
                }
                break;
            case "nDNI":
                newErrors.nDNI = !/^\d+$/.test(value) ? "El DNI debe ser un número." : "";
                break;
            case "nTel":
                newErrors.nTel = !/^\d+$/.test(value) ? "El número de teléfono debe ser un número." : "";
                break;
            case "fNacimiento":
                newErrors.fNacimiento = value ? "" : "Debe seleccionar una fecha de nacimiento.";
                break;
            case "username":
                newErrors.username = value.trim() === "" ? "Debe ingresar un nombre de usuario." : "";
                break;
            case "password":
                if (!value.trim()) {
                    newErrors.password = "Debe ingresar una contraseña.";
                } else if (!/(?=.*[A-Z])/.test(value)) {
                    newErrors.password = "La contraseña debe contener al menos una letra mayúscula.";
                } else if (!/(?=.*\d)/.test(value)) {
                    newErrors.password = "La contraseña debe contener al menos un número.";
                } else if (value.length < 8) {
                    newErrors.password = "La contraseña debe tener al menos 8 caracteres.";
                } else {
                    newErrors.password = "";
                }
                break;
            default:
                break;
        }

        // Actualizar el estado de errores
        setErrors(newErrors);
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = { ...errors };

        // Validar cada campo del formulario
        Object.keys(form).forEach((fieldName) => {
            validateField(fieldName, form[fieldName]);
            if (newErrors[fieldName] !== "") {
                isValid = false;
            }
        });

        // Actualizar el estado de errores
        setErrors(newErrors);
        setSubmitButtonDisabled(!isValid);

        return isValid;
    };

    return (
        <div style={{marginTop:"150px"}}>
            <h1 style={{color: "yellow", textShadow: "3px 3px 3px #000000" }}>Registro</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.lb} htmlFor="name">Nombre: </label>
                <input 
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Nombre"
                    value={form.name}
                    onChange={handleInputChange}
                    style={{margin: "10px",
                            borderRadius: "8px",
                            height: "25px"}}
                />
                {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}

                <label className={styles.lb} htmlFor="apellido">Apellido: </label>
                <input 
                    type="text"
                    name="apellido"
                    id="apellido"
                    placeholder="Apellido"
                    value={form.apellido}
                    onChange={handleInputChange}
                    style={{margin: "10px",
                    borderRadius: "8px",
                    height: "25px"}}
                />
                {errors.apellido && <p style={{ color: "red" }}>{errors.apellido}</p>}
                
                <label className={styles.lb} htmlFor="nDNI">DNI: </label>
                <input 
                    type="string"
                    name="nDNI"
                    id="nDNI"
                    placeholder="Nro DNI"
                    value={form.nDNI}
                    onChange={handleInputChange}
                    style={{margin: "10px",
                    borderRadius: "8px",
                    height: "25px"}}
                />
                {errors.nDNI && <p style={{ color: "red" }}>{errors.nDNI}</p>}
                
                <label className={styles.lb} htmlFor="nTel">Telefono: </label>
                <input 
                    type="number"
                    id="nTel"
                    name="nTel"
                    value={form.nTel}
                    placeholder="Telefono"
                    onChange={handleInputChange}
                    style={{margin: "10px",
                    borderRadius: "8px",
                    height: "25px"}}
                />
                {errors.nTel && <p style={{ color: "red" }}>{errors.nTel}</p>}
                
                <label className={styles.lb} htmlFor="fNacimiento">Nacimiento: </label>
                <DatePicker
                    type="date"
                    name="fNacimiento"
                    id="fNacimiento"
                    selected={form.fNacimiento ? new Date(form.fNacimiento) : null}
                    onChange={handleDateChange}
                    dateFormat="dd/MM/yyyy"
                    calendarClassName={styles.datePicker}
                />
                {errors.fNacimiento && <p style={{ color: "red" }}>{errors.fNacimiento}</p>}

                <label className={styles.lb} htmlFor="email">Email: </label>
                <input 
                    type="text" 
                    placeholder="Email"
                    name="email"
                    id="email"
                    value={form.email}
                    onChange={handleInputChange}
                    style={{margin: "10px",
                    borderRadius: "8px",
                    height: "25px"}}
                />
                {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

                <label className={styles.lb}  htmlFor="username">Nombre de usuario: </label>
                <input 
                    type="text"
                    placeholder="Username"
                    name="username"
                    id="username"
                    value={form.username}
                    onChange={handleInputChange}
                    style={{margin: "10px",
                    borderRadius: "8px",
                    height: "25px"}}
                />
                {errors.username && <p style={{ color: "red" }}>{errors.username}</p>}

                <label className={styles.lb} htmlFor="password">Contraseña: </label>
                <input 
                    type="password"
                    placeholder="Password"
                    id="password"
                    name="password"
                    value={form.password}
                    onChange={handleInputChange}
                    style={{border: "2px solid red",
                    margin: "10px",
                    borderRadius: "8px",
                    height: "25px"}}
                />
                {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}

                <button className={styles.button} type="submit" >Enviar</button>
            </form>
        </div>
    );
}

export default Register;
