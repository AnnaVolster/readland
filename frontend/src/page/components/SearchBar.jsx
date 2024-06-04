import React, { useState } from 'react';
import apiClient from "./Api";
import '../style/header.css';
import axios from "axios";

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async (event) => {
        event.preventDefault(); // предотвращает перезагрузку страницы при отправке формы

        try {
            const response = await axios.get(`/api/search/?q=${query}`);
            setResults(response.data);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    return (
        <div>
            <form className='frame-7' onSubmit={handleSearch}>
                <div className='frame-8'>
                    <button type="submit" onClick={handleSearch}>
                        <div className="vector-9"></div>
                    </button>
                </div>
                <div className='search' >
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Что вы ищите?"
                    />
                </div>
            </form>
            <div>
                {results.map((book) => (
                    <div key={book.id}>
                        <h3>{book.title}</h3>
                        <p>{book.author}</p>
                        <p>{book.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchBar;
