import React, {useEffect, useState} from 'react';
import './style/catalog.css'
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import BookCard from "./components/BookCard";
import Footer from "./components/Footer";
import PagginationNumber from "./components/PagginationNumber";
import axios from "axios";

const defaultGenre = "Художественная литература";

const Catalog = () => {
    const [isLoginOpen, setLoginOpen] = useState(false);
    const [isRegisterOpen, setRegisterOpen] = useState(false);
    const toggleLoginPopup = () => setLoginOpen(!isLoginOpen);
    const toggleRegisterPopup = () => setRegisterOpen(!isRegisterOpen);
    const [books, setBooks] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(null);

    useEffect(() => {
        fetchBooks();
    }, [selectedGenre]);

    const fetchBooks = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/books/${selectedGenre ? '?category=' + selectedGenre : ''}`);
            setBooks(response.data);
        } catch (error) {
            console.error('Failed to fetch books:', error);
        }
    };

    const handleGenreSelect = (genre) => {
        setSelectedGenre(genre);
    };

    return (
        <div className='catalog-container'>
            <Header
                isLoginOpen={isLoginOpen}
                toggleLoginPopup={toggleLoginPopup}
                isRegisterOpen={isRegisterOpen}
                toggleRegisterPopup={toggleRegisterPopup}
            />
            <div className='line-28' />
            <div className='line' />
            <div className='frame-e'>
                <div className='frame-f'>
                    <span className='catalog-10'>Каталог</span>
                </div>
                <span className='text'> </span>
            </div>
            <div className='line-28' />
            <Sidebar onGenreSelect={handleGenreSelect} />
            <div className='frame-33'>
                <span className='literature-genres'>{selectedGenre}</span>
                <span className='literature-genres'>Зарубежная проза</span>
                <div className='frame-34'>
                    {books.map(book => (
                            <BookCard key={book.id} bookId={book.id} />
                        ))}
                </div>
            </div>
            <PagginationNumber/>
            <Footer/>
        </div>
    );
}

export default Catalog;
