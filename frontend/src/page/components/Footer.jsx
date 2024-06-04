import React, {useState} from 'react';
import '../style/footer.css'

const Footer = () => {
    return (
        <div className='footer-container'>
            <div className='find-books-span'>
                    <span className='frame-div-ff'>
                      НАЙДЕМ КНИГИ ПОДХОДЯЩИЕ ТВОЕМУ ВКУСУ
                    </span>
                <div className='frame-div-100'>
                    <div className='frame-div-101'>
                        <span className='try-span'></span>
                    </div>
                    <button className='button-try'>Попробовать</button>
                </div>
            </div>
            <div className='rectangle-div-102'>
                <div className='frame-div-103'>
                    <div className='frame-div-104'>
                        <div className='frame-div-105'>
                            <span className='readland-div'>READLAND</span>
                            <span className='find-books-span-106'>
                            Найдем книги подходящие
                            <br/>
                            твоему вкусу
                          </span>
                        </div>
                        <div className='social-icons-div'>
                            <div className='social-icons-div-107'>
                                <div className='vector-div-108'/>
                            </div>
                            <div className='social-icons-div-109'>
                                <div className='vector-div-10a'/>
                            </div>
                        </div>
                    </div>
                    <div className='frame-div-10b'>
                        <div className='frame-div-10c'>
                            <span className='help-menu-span'>ознакомиться</span>
                            <span className='about-features-works-span'>
                            Правила продажи
                            <br/>
                            <br/>
                            Политика конфиденциальности
                            <br/>
                            <br/>
                            Вопросы и ответы
                          </span>
                        </div>
                        <div className='frame-div-10d'>
                            <span className='help-menu-span-10e'>О магазине</span>
                            <span className='about-features-works-span-10f'>
                            Услуги
                            <br/>
                            <br/>
                            Доставка и оплата
                            <br/>
                            <br/>
                            Бонусная программа  Обратная связь
                          </span>
                        </div>
                    </div>
                </div>
                <div className='line-div'/>
                <div className='frame-div-110'>
                    <div className='badge-div'>
                        <div className='mir-div'>
                            <div className='vector-div-111'/>
                        </div>
                    </div>
                    <div className='badge-div-112'>
                        <div className='visa-div'/>
                    </div>
                    <div className='badge-div-113'>
                        <div className='mastercard-div'/>
                    </div>
                </div>
                <span className='copyright-span'>© 2024, ReadLand</span>
            </div>
        </div>
);
}

export default Footer;