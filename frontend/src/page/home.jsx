import React, {useState, useEffect} from 'react';
import './style/home.css';
import './style/popup.css';
import BookCard from "./components/BookCard";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Home() {
    const [isLoginOpen, setLoginOpen] = useState(false);
    const [isRegisterOpen, setRegisterOpen] = useState(false);

    const toggleLoginPopup = () => setLoginOpen(!isLoginOpen);
    const toggleRegisterPopup = () => setRegisterOpen(!isRegisterOpen);

    return (
        <div className={`main-container ${isLoginOpen || isRegisterOpen ? 'uninteractive' : ''}`}>
            <Header
                isLoginOpen={isLoginOpen}
                toggleLoginPopup={toggleLoginPopup}
                isRegisterOpen={isRegisterOpen}
                toggleRegisterPopup={toggleRegisterPopup}
            />
            <div className='rectangle'>
                <div className='image-photoroom'>
                    <div className='vector-e'/>
                </div>
                <span className='find-books'>
              Найдем книги подходящие
              <br/>
              твоему вкусу
            </span>
                <span className='innovative-technology'>
              Инновационная технология искусственного интеллекта откроет мир
              литературы, идеально подходящий вашим предпочтениям!
            </span>
                <div className='vector-f'/>
                <button className='subscribe-button'>
                    <span className='subscribe'>Попробовать</span>
                </button>
                <div className='frame-10'>
                    <div className='frame-11'>
                        <span className='reviews'>200+</span>
                        <span className='reader-reviews'>Отзывов читателей</span>
                    </div>
                    <div className='line-12'/>
                    <div className='frame-12'>
                        <span className='books-stock'>2,000+</span>
                        <span className='books-in-stock'>Книг в наличии</span>
                    </div>
                    <div className='line-13'/>
                    <div className='frame-14'>
                        <span className='happy-customers'>3,000+</span>
                        <span className='happy-buyers'>Счастливых покупателей</span>
                    </div>
                </div>
            </div>
            <span className='new-15'>Новинки</span>
            <div className='frame-16'>
                    <BookCard bookId={'4'}/>
                    <BookCard bookId={'5'}/>
                    <BookCard bookId={'6'}/>
                    <BookCard bookId={'7'}/>
            </div>
            <div className='frame-68'>
                <button className='go-button'>Перейти</button>
            </div>
            <span className='best-offer'>Лучшее предложение</span>
            <div className='frame-69'>
                    <BookCard bookId={'11'}/>
                    <BookCard bookId={'10'}/>
                    <BookCard bookId={'9'}/>
                    <BookCard bookId={'8'}/>
            </div>
            <div className='frame-c6'>
                <button className='button-c7'>Перейти</button>
            </div>
            <div className='frame-c8'>
                <span className='genre-selection'>Выбери своё по жанру</span>
                <div className='frame-c9'>
                    <div className='frame-ca'>
                        <div className='image-traced'/>
                        <span className='genre'>Классика</span>
                    </div>
                    <div className='frame-cb'>
                        <div className='image-traced-cc'/>
                        <span className='genre-cd'>Детективы</span>
                    </div>
                    <div className='frame-ce'>
                        <div className='image-traced-cf'/>
                        <div className='image-traced-d0'/>
                        <span className='genre-d1'>Фантастика</span>
                    </div>
                    <div className='frame-d2'>
                        <div className='image-traced-d3'/>
                        <span className='genre-d4'>Поэзия</span>
                    </div>
                </div>
            </div>
            <span className='happy-customers-d5'>Наши довольные покупатели</span>
            <div className='frame-d6'>
                <div className='frame-d7'>
                    <div className='frame-d8'>
                        <div className='frame-d9'>
                            <div className='frame-da'>
                                <div className='star'/>
                                <div className='star'/>
                                <div className='star'/>
                                <div className='star'/>
                                <div className='star'/>
                            </div>
                            <div className='frame-e0'>
                                <div className='frame-e1'>
                                    <span className='customer-name'>Юлия К.</span>
                                    <div className='frame-e2'>
                                        <div className='vector-e3'/>
                                    </div>
                                </div>
                                <span className='customer-review'>
                  "Посетила в поисках специфических научных трудов и был приятно
                  удивлен широким ассортиментом. Навигация по сайту интуитивно
                  понятна, а процесс покупки прошел гладко и без задержек.”
                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='frame-e4'>
                    <div className='frame-e5'>
                        <div className='frame-e6'>
                            <div className='frame-e7'>
                                <div className='star'/>
                                <div className='star'/>
                                <div className='star'/>
                                <div className='star'/>
                                <div className='star'/>
                            </div>
                            <div className='frame-div'>
                                <div className='frame-div-ec'>
                                    <span className='ivan-name-span'>Иван У.</span>
                                    <div className='frame-div-ed'>
                                        <div className='vector-div'/>
                                    </div>
                                </div>
                                <span className='quote-span'>
                  "Искал подарок другу — любителю фэнтези, и здесь я нашла
                  идеальный вариант! Порадовала система рекомендаций, которая
                  помогла подобрать идеальные варианты.”
                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='frame-div-ee'>
                    <div className='frame-div-ef'>
                        <div className='frame-div-f0'>
                            <div className='frame-div-f1'>
                                <div className='star'/>
                                <div className='star'/>
                                <div className='star'/>
                                <div className='star'/>
                                <div className='star'/>
                            </div>
                            <div className='frame-div-f7'>
                                <div className='frame-div-f8'>
                                    <span className='liliya-name-span'>Лилия Д.</span>
                                    <div className='frame-div-f9'>
                                        <div className='vector-div-fa'/>
                                    </div>
                                </div>
                                <span className='quote-span-fb'>
                  "Я заказываю книги регулярно, и каждый раз остаюсь довольна
                  сервисом. Сайт удобен для поиска, есть все от классики до
                  современных бестселлеров. Приятно удивляет программа
                  рекомендаций.”
                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='rectangle-div'/>
            <div className='frame-div-fc'>
                <div className='group-div'>
                    <span className='detectives-span'>детективы</span>
                </div>
                <div className='classic-span'>
                    <span className='prada-logo-div'>классика</span>
                </div>
                <div className='fantasy-span'>
                    <span className='prada-logo-div-fd'>фэнтези</span>
                </div>
                <div className='non-fiction-span'>
                    <span className='zara-logo-div'>нон-фикшн</span>
                </div>
                <div className='modern-authors-span'>
                    <span className='frame-div-fe'>современные авторы</span>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

