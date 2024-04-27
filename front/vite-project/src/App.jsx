import React from 'react'
import Home from './views/Home/Home'
import Reservas from '../src/views/Reservas/Reservas'
import NavBar from './components/NavBar/NavBar'
import Register from './views/Register/Register.jsx'
import LoginForm from './views/Login/LoginForm.jsx'
import { Route, Routes } from 'react-router-dom';
import "./App.css";
import ReservasForm from './views/ReservasForm/ReservasForm.jsx'
import About from './views/About/About.jsx'
import Contact from './views/Contact/Contact.jsx'


function App() {

  return (
   <>

    <NavBar/>
      <Routes>

        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<LoginForm/>}/>
        <Route path="/reservas" element={<Reservas/>}/>
        <Route path="/Register" element={<Register/>}/>
        <Route path="/ReservasForm" element={<ReservasForm/>}/>
        <Route path="/About" element={<About/>}/>
        <Route path="/Contact" element={<Contact/>}/>
      </Routes>

   </>
  )
}

export default App