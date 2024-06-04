import React from 'react';
import '../style/bookcard.css'; // Добавьте стили для карточки товара

const RecommendationBookCard = ({ book }) => {
    const getFullImageUrl = (path) => {
        return `http://localhost:8000${path}`;
    };

    return (
        <div className="book-card">
            <div className='image-1'>
                <img src={getFullImageUrl(book.cover_image)} alt={book.title} className="book-image" />
            </div>
            <div className='frame-19'>
                <div className='price'>
                    <div className="book-price">{book.price ? `${book.price} ₽` : 'Цена не указана'}</div>
                </div>
            </div>
            <span className="book-title">{book.title}</span>
            <span className="book-author">{book.author || 'Автор не указан'}</span>
            <div className='frame-1a'>
                <div className='frame-1b'>
                    {Array(Math.floor(book.rating || 0)).fill().map((_, i) => (
                        <span key={i} className="star"></span>
                    ))}
                    {book.rating && book.rating % 1 ? <span className="star-half"></span> : null}
                </div>
                <div className='rating'>
                    <span className="rating-text">{book.rating ? `${book.rating}/5` : ' '}</span>
                </div>
            </div>
            <div className='frame-20'>
                <div className='frame-21'>
                    <button className="buy" onClick={() => alert('Купить функционал недоступен')}>Купить</button>
                </div>
                <button className="favorite-light" onClick={() => alert('Функционал избранного недоступен')}>
                </button>
            </div>
        </div>
    );
};

export default RecommendationBookCard;
