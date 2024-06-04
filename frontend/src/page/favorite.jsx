import React, { useEffect, useState } from 'react';
import BookCard from "./components/BookCard";
import apiClient from "./components/Api";
import Header from "./components/Header";
import './style/favorites.css'

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [isLoginOpen, setLoginOpen] = useState(false);
    const [isRegisterOpen, setRegisterOpen] = useState(false);
    const toggleLoginPopup = () => setLoginOpen(!isLoginOpen);
    const toggleRegisterPopup = () => setRegisterOpen(!isRegisterOpen);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await apiClient.get('/favorites/');
                console.log('Favorites data:', response.data); // Логируем данные
                setFavorites(response.data);
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }
        };

        fetchFavorites();
    }, []);

    if (favorites.length === 0) {
        return <div>Избранных книг пока нет.</div>;
    }

    return (
        <div>
            <Header
                isLoginOpen={isLoginOpen}
                toggleLoginPopup={toggleLoginPopup}
                isRegisterOpen={isRegisterOpen}
                toggleRegisterPopup={toggleRegisterPopup}
            />
            <h2>Избранные книги</h2>
            <div className="book-list">
                {favorites.map(favorite => {
                    const bookId = favorite.book;
                    console.log('Favorite book ID:', bookId);
                    return (
                        <BookCard key={favorite.id} bookId={bookId} />
                    );
                })}
            </div>
        </div>
    );
};

export default Favorites;
