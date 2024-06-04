import React, {useEffect, useState} from 'react';
import '../style/order.css';
import Header from "./Header";
import Footer from "./Footer";
import apiClient from "./Api";

const Order = () => {
    const [isLoginOpen, setLoginOpen] = useState(false);
    const [isRegisterOpen, setRegisterOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [address, setAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

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

    const calculateTotal = () => {
        const subtotal = cartItems.reduce((total, item) => total + item.book.price * item.quantity, 0);
        const discount = subtotal * 0.2;
        const delivery = 150;
        const total = subtotal - discount + delivery;
        return { subtotal, discount, delivery, total };
    };

    const { subtotal, discount, delivery, total } = calculateTotal();

    const handleOrderSubmit = async () => {
        const orderData = {
            items: cartItems.map(item => ({
                book: item.book.id,
                quantity: item.quantity
            })),
            address,
            postal_code: postalCode,
            full_name: fullName,
            phone_number: phoneNumber
        };

        try {
            const response = await apiClient.post('/orders/', orderData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.status === 201) {
                alert('Order placed successfully!');
                // Clear the cart and form
                setCartItems([]);
                setAddress('');
                setPostalCode('');
                setFullName('');
                setPhoneNumber('');
            }
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Failed to place order. Please try again.');
        }
    };

    return (
        <div className='order-container'>
            <Header
                isLoginOpen={isLoginOpen}
                toggleLoginPopup={toggleLoginPopup}
                isRegisterOpen={isRegisterOpen}
                toggleRegisterPopup={toggleRegisterPopup}
            />
            <div className='line' />
            <div className='navigation-container'>
                <div className='navigation'>
                    <span className='navigation_main-page'>Главная</span>
                    <div className='side arrow' />
                </div>
                <div className='navigation'>
                <span className='navigation_cart'>Корзина</span>
                    <div className='side arrow' />
                </div>
            </div>
            <span className='order-h'>Оформление заказа</span>
            <div className='order-item-container'>
                <div className='order-card-info'>
                    <span className='tovar'>{cartItems.length} товар(ов)</span>
                    <span className='bullet'>•</span>
                    <span className='kg'>{(cartItems.length * 0.4).toFixed(2)} кг</span>
                </div>
                <span className='order-total'>Итог</span>
                <div className='order-total-sum-container'>
                    <div className='order-total-items'>
                        <span className='order-items'>Товары</span>
                        <span className='rub'>{subtotal.toFixed()} ₽</span>
                    </div>
                    <div className='order-discount-container'>
                        <span className='order-discount-text'>Скидка (-20%)</span>
                        <span className='order-discount-sum-text'>-{discount.toFixed(0)} ₽</span>
                    </div>
                    <div className='order-delivery-container'>
                        <span className='order-delivery-text'>Доставка</span>
                        <span className='order-delivery-sum-text'>{delivery.toFixed()} ₽</span>
                    </div>
                    <div className='line-q6' />
                    <div className='total-itog'>
                        <span className='total-itog-h'>Итог</span>
                        <div className='total-itog-sum'>
                            <span className='total-itog-sum-text'>{total.toFixed(0)} </span>
                            <span className='total-itog-currency'>₽</span>
                        </div>
                    </div>
                </div>
                <button className='order-button-buy' onClick={handleOrderSubmit}>
                    <span className='order-button-buy-text'>Оплатить заказ</span>
                    <div className='order-button-buy-img' />
                </button>
            </div>
            <div className='order-total-input-container'>
                <span className='order-total-h'>Доставка</span>
                <div className='order-total-input'>
                    <div className='order-total-delivery-container'>
                        <div className='order-total-delivery-h'>
                            <span className='order-total-delivery-text'>Адрес почтового отделения</span>
                        </div>
                        <input
                            type='text'
                            className='order-total-delivery-address-container'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder='Улица Фрунзе, 38, Таганрог, Ростовская область'
                        />
                        <span className='order-total-delivery-address-h'></span>
                    </div>
                    <div className='order-total-delivery-index-container'>
                        <div className='order-total-delivery-index'>
                            <span className='order-total-delivery-index-h'>Индекс</span>
                        </div>
                        <input
                            type='text'
                            className='order-total-delivery-index-text-container'
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            placeholder='302244'
                        />
                        <span className='order-error-message-span'> </span>
                    </div>
                </div>
            </div>
            <div className='order-userinfo-container'>
                <span className='order-userinfo-h'>Данные получателя</span>
                <div className='order-userinfo-h-container'>
                    <div className='order-userinfo-email-container'>
                        <div className='order-userinfo-email-h'>
                            <span className='order-userinfo-email-text'>ФИО</span>
                        </div>
                        <input
                            type='text'
                            className='order-userinfo-number-container'
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder='Иванов Иван Иванович'
                        />
                    </div>
                    <div className='order-userinfo-number-h-container'>
                        <div className='order-userinfo-number-h-container'>
                            <span className='order-userinfo-number-text'>Номер телефона</span>
                        </div>
                        <input
                            type='text'
                            className='order-userinfo-number-input'
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder='+7 (999) 123-45-67'
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Order;
