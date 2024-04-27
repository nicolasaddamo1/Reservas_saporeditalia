import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
    const [showButtons, setShowButtons] = useState(false);

    useEffect(() => {
        // Mostrar los botones después de tres segundos
        const timeoutId = setTimeout(() => {
            setShowButtons(true);
        }, 1500); // 3000 milisegundos = 3 segundos

        // Limpiar el temporizador al desmontar el componente para evitar fugas de memoria
        return () => clearTimeout(timeoutId);
    }, []); // El array vacío [] indica que este efecto se ejecuta solo una vez al montar el componente

    return (
        <div className={styles.home}>
            <h1 id='title'>Bienvenido</h1>
            {showButtons && (
                <>
                        <NavLink className={styles.button} to="/Login">Login</NavLink>
                        <NavLink className={styles.button} to="/Register">Registrarse</NavLink>
                </>
            )}
        </div>
    );
}

export default Home;
