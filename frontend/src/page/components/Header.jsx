import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import LoginPopup from '../login'; // Убедитесь, что путь к вашему LoginPopup правильный
import RegisterPopup from '../register'; // Убедитесь, что путь к вашему RegisterPopup правильный
import DropdownMenu from '../components/DropdownMenu';
import '../style/header.css';
import {getToken, isLoggedIn, removeToken} from "./auth";
import SearchBar from "./SearchBar";

const Header = ({ isLoginOpen, toggleLoginPopup, isRegisterOpen, toggleRegisterPopup }) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);
    const handleMouseEnter = () => setDropdownOpen(true);
    const handleMouseLeave = () => setDropdownOpen(false);
    const navigate = useNavigate();

    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        // Функция для загрузки данных корзины и обновления количества товаров
        const fetchCartCount = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/cart-items/', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const cartItems = await response.json();
                const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
                setCartCount(totalItems);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartCount();
    }, []);

    const handleLogoClick = () => {
        navigate('/');
    };

    const handleFavoriteClick = () => {
        navigate('/favorites');
    };

    const handleCardClick = () => {
        navigate('/card');
    };

    const handleOrdersClick = () => {
        navigate('/order');
    };

    useEffect(() => {
        const token = getToken();
        if (token) {
            // Можно проверить токен или выполнить любой другой необходимый код
        }
    }, []);

    const handleLogout = () => {
        removeToken();
        window.location.reload();
    };

    return (
        <div className={`container ${isLoginOpen || isRegisterOpen ? 'uninteractive' : ''}`}>
            {!isLoggedIn() && (
                <div className='alert'>
                    <div className='discount-login'>
                        <span className='discount-text'>
                            Войдите и получите скидку 20% на первый заказ.
                        </span>
                        <span className='login' onClick={toggleLoginPopup}>Войти</span>
                    </div>
                </div>
            )}
        <div className='frame-2'>
            <span className='readland' onClick={handleLogoClick}>READLAND</span>
            <ul className={'menu-links'}>
                <li>
                    <Link to="/catalog"
                          onMouseEnter={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}
                          className='frame-4'>
                            <span className='catalog' onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>Каталог</span>
                        <div className={`vector-6 ${isDropdownOpen ? 'rotated' : ''}`} />
                        {isDropdownOpen && <DropdownMenu />}
                    </Link>
                </li>
                <li><Link to="./genres-selection">Рекомендации</Link></li>
                <li><Link to="./new">Новинки</Link></li>
                <li><Link to="/sale">Распродажа</Link></li>
            </ul>
            <SearchBar/>
            {isLoginOpen && <LoginPopup onClose={toggleLoginPopup} onRegisterOpen={toggleRegisterPopup}/>}
            {isRegisterOpen && <RegisterPopup onClose={toggleRegisterPopup} onLoginOpen={toggleLoginPopup}/>}
            <div className='frame-a'>
                <button className='favorite-light' onClick={handleFavoriteClick}>
                </button>
                <button onClick={handleOrdersClick} className='box-alt'>
                </button>
                <button onClick={handleCardClick} className='frame-b'>
                    <div className ='vector-c'/>
                    {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                </button>
                <div className='user'>
                    <div className='ellipse-stroke'/>
                </div>
                {isLoggedIn() && <button onClick={handleLogout} className='sign_out_button'>
                    <div className ='sign-out'/>
                </button>}
            </div>
        </div>
        </div>
    );
};


export default Header;
