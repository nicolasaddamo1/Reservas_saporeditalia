import b from '../../assets/b.jpg';
import a from '../../assets/a.jpg';
import React from 'react';
import styles from './NavBar.module.css';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';
const NavBar=()=>{
    const login = useSelector((state) => state.actualUser.userData.login);
    const dispatch =useDispatch();
    const navigate =useNavigate();
    const handleLogout = ()=>{
        if(window.confirm("¿Seguro que quieres cerrar sesión?")){
            dispatch(setUser({}));
            navigate("/")
        }

        }
    return (
        <nav className={styles.navbarContainer}>
            <div className={styles.logoSection}><img src={a} alt="logo"/></div>
            <div className={styles.linksSection}>
                <span><NavLink to="/">HOME</NavLink></span>
                {
                    login && <span><NavLink to="/Reservas">RESERVAS</NavLink></span>
                }
                {
                    login && <span><NavLink to="/ReservasForm">NUEVA RESERVA</NavLink></span>
                }
                <span><NavLink to="/About">ABOUT</NavLink></span>
                <span><NavLink to="/Contact">CONTACT</NavLink></span>
                {
                    login? <span onClick={handleLogout}>LOGOUT</span>
                    : <span><NavLink to="/login">LOGIN</NavLink></span>
                }
              
            </div>
            <div className={styles.avatarSection}><img src={b} alt="avatar"/></div>
        </nav>
    )
}

export default NavBar