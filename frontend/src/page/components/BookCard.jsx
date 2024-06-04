import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/bookcard.css'; // Добавьте стили для карточки товара
import apiClient from './api';

const BookCard = ({ bookId }) => {
    const [book, setBook] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);

    const getFullImageUrl = (path) => {
        return `http://localhost:8000${path}`;
    };

    useEffect(() => {
        console.log('Fetching book with ID:', bookId); // Логируем bookId
        const fetchBook = async () => {
            console.log('Fetching book with ID:', bookId); // Логируем bookId
            try {
                const response = await apiClient.get(`/book/${bookId}/`);
                setBook(response.data);
            } catch (error) {
                console.error('Error fetching book data:', error);
            }
        };

        fetchBook();
    }, [bookId]);

    const handleFavoriteClick = async () => {
        if (!localStorage.getItem('token')) {
            alert('Please log in to add to favorites.');
            return;
        }

        try {
            const response = await apiClient.post(`/favorites/${bookId}/add_to_favorites/`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.status === 200) {
                setIsFavorite(true);
            }
        } catch (error) {
            console.error('Error adding to favorites:', error);
        }
        try {
            if (isFavorite) {
                await apiClient.post(`/favorites/${bookId}/remove_from_favorites/`);
            } else {
                await apiClient.post(`/favorites/${bookId}/add_to_favorites/`);
            }
            setIsFavorite(!isFavorite);
        } catch (error) {
            console.error('Error updating favorite status:', error);
        }
    };

    if (!book) {
        return <div>Loading...</div>;
    }

    const addToCart = async (bookId) => {
        try {
            const response = await apiClient.post('/cart-items/', {
                book: bookId,
                quantity: 1 // укажите необходимое количество
            });
            if (response.status === 200) {
                console.log('Book added to cart');
            }
        } catch (error) {
            console.error('Error adding book to cart:', error);
        }
    };

    return (
        <div className="book-card">
            <div className={`image-1`}>
                <img src={getFullImageUrl(book.cover_image)} alt={book.title} className="book-image" />
            </div>
            <div className='frame-19'>
                <div className='price'>
                    <div className="book-price">{book.price ? `${book.price} ₽` : 'Цена не указана'}</div>
                </div>
            </div>
            <span className="book-title">{book.title}</span>
            <span className="book-author">{book.author}</span>
            <div className='frame-1a'>
                <div className='frame-1b'>
                    {Array(Math.floor(book.rating)).fill().map((_, i) => (
                        <span key={i} className="star"></span>
                    ))}
                    {book.rating % 1 ? <span className="star-half"></span> : null}
                </div>
                <div className='rating'>
                    <span className="rating-text">{book.rating ? `${book.rating}/5` : 'Нет рейтинга'}</span>
                </div>
            </div>
            <div className='frame-20'>
                <div className='frame-21'>
                    <button className="buy" onClick={() => addToCart(bookId)}>Купить</button>
                </div>
                <button
                    className={`favorite-light ${isFavorite ? 'favorite-light-active' : ''}`}
                    onClick={handleFavoriteClick}
                >
                </button>
            </div>
        </div>
    );
};

export default BookCard;
