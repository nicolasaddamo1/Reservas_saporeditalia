import { useState } from 'react'
import axios from 'axios'
import {validateLogin} from '../../Helpers/validateLogin'
import styles from  './Login.module.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from '../../redux/userSlice'

const Login = () => {
    const dispatch=useDispatch();
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        username: "",
        password: ""
    })

 const [errors, setErrors] = useState({
     username: "username is required",
     password: "password is required"})
 console.log(errors)
 const handleInputChange = (event) => {
     const {name, value} = event.target// guardamos en name el name del input y en value el value del input
     setUserData({
         ...userData,
         [name]: value});
    setErrors(validateLogin(userData));//validamos los errores
}
const handeleOnSubmit = (event) => {
    
    event.preventDefault();
    console.log(userData)
    
        axios.post("http://localhost:3000/users/login", userData)
        .then(response=>response.data)
        .then(data=>{
            dispatch(setUser(data));
            alert("usuario logeado exitosamente");
            navigate("/")
        })
        
    .catch((error)=> alert("Acceso denegado", error?.response?.data?.message))  

};
return (
    <form onSubmit={handeleOnSubmit} className={styles.form} >
        <h2>Login</h2>
        <div>
            <label>Username:  </label>
            <input 
            type="text" 
            name='username'
            id='username'
            placeholder='Username'
            value={userData.username}//bindeamos el state con el input
            onChange={handleInputChange}//bindeamos el state con el input
            className={styles.input}
            />
            {errors.username && <p>{errors.username}</p>}
        </div>
        <div>
            <label >Password:  </label>
            <input type="password"
            name='password'
            id='password'
            placeholder='Password'
            value={userData.password}
            onChange={handleInputChange}
            className={styles.input}
             />
            {errors.password && <p>{errors.password}</p>}
        </div>
        <button className={styles.button} type='submit'>Login</button>
    </form>
)





}
export default Login