import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './style/popup.css';

const RegisterPopup = ({onClose, onLoginOpen}) => {
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handlePasswordVisibilityToggle = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    useEffect(() => {
        if (email && password1 && password2 && password1 === password2) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    }, [email, password1, password2]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting registration form', {email, password1, password2});

        try {
            const response = await axios.post('http://localhost:8000/api/auth/register/', {
                email,
                password1,
                password2
            });
            console.log('Registration successful', response.data);
            localStorage.setItem('token', response.data.token);
            onClose();
        } catch (error) {
            console.error('Registration error', error);
            setErrorMessage('Ошибка регистрации. Проверьте правильность ввода данных.');
        }
    };

    const handleLoginLinkClick = (e) => {
        e.preventDefault();
        onClose();
        onLoginOpen();
    };

    return (
        <div className="popup">
            <div className="popup-register-content">
                <span onClick={onClose} className="close-button">
                    <button className={"icon-close-button"}/>
                </span>
                <h2 className="popup-title">Регистрация</h2>
                {errorMessage && <p className="error">{errorMessage}</p>}
                <form className={"register-form"} onSubmit={handleSubmit}>
                    <div className='frame-1'>
                        <div className='email'>
                            <div className='frame-2q'>
                                <label className="email-input">Email</label>
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
                                value={password1}
                                onChange={(e) => setPassword1(e.target.value)}
                                required
                            />
                        </div>
                        <div className='confirm-password'>
                            <div className='frame-4q'>
                                <label className="confirm-password-input">Подтвердите пароль</label>
                            </div>
                            <input
                                className="text-field-6"
                                type="password"
                                value={password2}
                                onChange={(e) => setPassword2(e.target.value)}
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
                                    Зарегистрироваться
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='frame-9'>
                        <div className='account-login'>
                            <div className='login-a'>
                                <span className='no-account'>Есть аккаунт? </span>
                                <a href="#" className="register-link" onClick={handleLoginLinkClick}>Войти</a>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPopup;
