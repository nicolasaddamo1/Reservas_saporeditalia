import React from 'react';
import Login from './Login.jsx';
import styles from './Login.module.css';
const LoginForm = () => {
    return (
        <div className={styles.loginContainer}>
            <Login />
        </div>
    );
};

export default LoginForm;
