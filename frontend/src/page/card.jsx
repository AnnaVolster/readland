import React, { useState, useEffect } from 'react';
import Header from "./components/Header";
import Footer from "./components/Footer";
import axios from 'axios';
import './style/card.css';
import apiClient from "./components/Api";
import {useNavigate} from "react-router-dom";
import {isLoggedIn} from "./components/auth";

const Card = () => {
    const [isLoginOpen, setLoginOpen] = useState(false);
    const [isRegisterOpen, setRegisterOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    const toggleLoginPopup = () => setLoginOpen(!isLoginOpen);
    const toggleRegisterPopup = () => setRegisterOpen(!isRegisterOpen);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await apiClient.get('/cart-items/', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                const itemsWithBookData = await Promise.all(
                    response.data.map(async item => {
                        const bookResponse = await apiClient.get(`/books/${item.book}/`);
                        return { ...item, book: bookResponse.data };
                    })
                );

                setCartItems(itemsWithBookData);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems();
    }, []);

    const updateCartItemQuantity = async (id, quantity) => {
        try {
            const response = await axios.patch(`http://localhost:8000/api/cart-items/${id}/`, { quantity }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.status === 200) {
                setCartItems(prevItems =>
                    prevItems.map(item => item.id === id ? { ...item, quantity } : item)
                );
            }
        } catch (error) {
            console.error('Error updating cart item quantity:', error);
        }
    };

    const removeCartItem = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/cart-items/${id}/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.status === 204) {
                setCartItems(prevItems => prevItems.filter(item => item.id !== id));
            }
        } catch (error) {
            console.error('Error removing cart item:', error);
        }
    };

    const handleOrdersClick = () => {
        navigate('/order');
    };
    const calculateTotal = () => {
        const subtotal = cartItems.reduce((total, item) => total + item.book.price * item.quantity, 0);
        const discount = subtotal * 0.2;
        const delivery = 150;
        const total = subtotal - discount + delivery;
        return { subtotal, discount, delivery, total };
    };

    const { subtotal, discount, delivery, total } = calculateTotal();

    return (
        <div className='card-container'>
            <Header
                isLoginOpen={isLoginOpen}
                toggleLoginPopup={toggleLoginPopup}
                isRegisterOpen={isRegisterOpen}
                toggleRegisterPopup={toggleRegisterPopup}
            />
            <div className='lineq' />
            <div className='navigation-container'>
                <div className='navigation'>
                    <span className='navigation_main-page'>Главная</span>
                    <div className='side arrow' />
                </div>
            </div>
            <span className='cart-h'>Корзина</span>
            <div className='cart-flex'>
                <div className='cartlist-container'>
                    {cartItems.map(item => (
                        <div key={item.id} className='cartlist'>
                            <div className='cart-book-image'>
                                <img src={item.book.cover_image} alt={item.book.title} className='image-book-cart' />
                            </div>
                            <div className='book-info-container'>
                                <div className='book-info'>
                                    <div className='book-info-title'>
                                        <span className='small-women'>{item.book.title}</span>
                                        <div className='author-title'>
                                            <span className='louisa-may-alcott'>{item.book.author}</span>
                                        </div>
                                    </div>
                                    <div className='cart-price'>
                                        <span className='price-count'>{item.book.price} </span>
                                        <span className='currency'>₽</span>
                                    </div>
                                </div>
                                <div className='book-info-icon-container'>
                                    <div className='delete-icon-info' onClick={() => removeCartItem(item.id)}>
                                        <div className='icon-delete' />
                                    </div>
                                    <button className='count-items-info'>
                                        <div className='minus-icon-info' onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}>
                                            <div className='icon-minus' />
                                        </div>
                                        <span className='count-items'>{item.quantity}</span>
                                        <div className='plus-icon-info' onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}>
                                            <div className='icon-plus' />
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='total-container'>
                    <span className='total-h'>Итог</span>
                    <div className='total-info'>
                        <div className='items-container'>
                            <span className='span-products'>Товары</span>
                            <span className='span-currency'>{subtotal} ₽</span>
                        </div>
                        <div className='discount-container'>
                            <span className='span-discount'>Скидка (-20%)</span>
                            <span className='span-negative-ruble'>-{discount.toFixed(0)} ₽</span>
                        </div>
                        <div className='delivery-container'>
                            <span className='span-delivery'>Доставка</span>
                            <span className='span-currency-delivery'>{delivery} ₽</span>
                        </div>
                        <div className='div-lineq' />
                        <div className='total-sum-container'>
                            <span className='total-sum-title'>Итог</span>
                            <div className='total-sum-info'>
                                <span className='span-total-sum'>{total.toFixed(0)} </span>
                                <span className='span-total-currency'>₽</span>
                            </div>
                        </div>
                    </div>
                    <div className='promocode-container'>
                        <div className='promocode-input'>
                            <div className='promocode-icon'>
                                <div className='promocode' />
                            </div>
                            <span className='span-promocode'>Промокод</span>
                        </div>
                        <button className='promocode-button'>
                            <span className='promocode-span-apply'>Применить</span>
                        </button>
                    </div>
                    {isLoggedIn() && <button onClick={handleOrdersClick} className='result-button-container'>
                        <span className='result-h'>Перейти к оформлению</span>
                        <div className='result-icon' />
                    </button>}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Card;
