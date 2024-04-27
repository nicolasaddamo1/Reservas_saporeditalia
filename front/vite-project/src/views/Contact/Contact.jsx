import React from "react";
import style from "./Contact.module.css";
function Contact() {
    return (
        <div style={{marginTop:"10px",
        backgroundColor:"rgba(101, 67, 33, 0.77)",
        borderRadius:"10px",
        boxShadow:"3px 3px 4px rgba(0, 0, 0, 0.75)",
        textShadow:"2px 2px 1px black",
        border:"1px dashed brown"}}>
            <h1 className={style.h1}>Datos de contacto</h1>
        <div className={style.e}>
            <h4  className={style.card}>Desarrollador: Addamo Nicolas Matias</h4>
            <h4  className={style.card}>Tel de contacto: +54 9 11 1234-5678</h4>
            <h4  className={style.card}>Mail: Addamonicolas@dev.com</h4>
            <br />
        </div>
        <br />
        </div>

        
    );
    }

export default Contact;
