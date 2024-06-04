import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style/popup.css';
import {setToken} from "./components/auth";
import {useNavigate} from "react-router-dom";

const LoginPopup = ({ onClose, onRegisterOpen }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (email && password) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    }, [email, password]);

    const handlePasswordVisibilityToggle = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };


    const handleNavigation = () => {
        onClose();
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/token/', {
                email,
                password,
            });
            setToken(response.data.access, response.data.refresh);
            history.push('/home');
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    const handleRegisterLinkClick = (e) => {
        e.preventDefault();
        onClose();
        onRegisterOpen();
    };

    return (
        <div className="popup">
            <div className="popup-login-content">
                <span onClick={onClose} className="close-button">
                    <button className={"icon-close-button"} />
                </span>
                <h2 className="popup-title">Вход</h2>
                {errorMessage && <p className="error">{errorMessage}</p>}
                <form className={"login-form"} onSubmit={handleSubmit}>
                    <div className='frame-1'>
                        <div className='email'>
                            <div className='frame-2q'>
                                <label className="login-input">Логин или email</label>
                            </div>
                            <input
                                className="text-field"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className='password'>
                            <div className='frame-4q'>
                                <span className="password-input">Пароль</span>
                                <div className='password-hide' onClick={handlePasswordVisibilityToggle}>
                                    <span className='text-hide'>{isPasswordVisible ? 'Скрыть' : 'Показать'}</span>
                                    <div className={`icon-hide ${isPasswordVisible ? 'icon-hidden' : 'icon-visible'}`} />
                                </div>
                            </div>
                            <input
                                className="text-field-6"
                                type={isPasswordVisible ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className='frame-7q'>
                            <div className={`button ${isFormValid ? 'active' : ''}`}>
                                <button
                                    type="submit"
                                    className="sign-up"
                                    disabled={!isFormValid}
                                >
                                    Войти
                                </button>
                            </div>
                            <div className='frame-8q'>
                                <div className='have-an-account'>
                                    <a href="#" className="forgot-password">Забыли пароль?</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='frame-9'>
                        <div className='account-login'>
                            <div className='login-a'>
                                <span className='no-account'>Нет аккаунта? </span>
                                <a href="#" className="register-link" onClick={handleRegisterLinkClick}>Зарегистрироваться</a>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPopup;
