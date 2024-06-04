import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import popularAuthors from './popularAuthors';
import Header from "./Header"; // Импортируем массив популярных авторов

const AuthorsSelection = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedAuthors, setSelectedAuthors] = useState([]);
    const { genres } = location.state || {};
    const [isLoginOpen, setLoginOpen] = useState(false);
    const [isRegisterOpen, setRegisterOpen] = useState(false);
    const toggleLoginPopup = () => setLoginOpen(!isLoginOpen);
    const toggleRegisterPopup = () => setRegisterOpen(!isRegisterOpen);

    const handleAuthorSelection = (author) => {
        if (selectedAuthors.includes(author)) {
            setSelectedAuthors(selectedAuthors.filter((a) => a !== author));
        } else {
            setSelectedAuthors([...selectedAuthors, author]);
        }
    };

    const handleSubmit = () => {
        navigate('/keywords-input', { state: { genres, selectedAuthors } });
    };

    return (
        <div className={'author-container'}>
            <Header
                isLoginOpen={isLoginOpen}
                toggleLoginPopup={toggleLoginPopup}
                isRegisterOpen={isRegisterOpen}
                toggleRegisterPopup={toggleRegisterPopup}
            />
            <h1>Выберите любимых авторов (максимум 5)</h1>
            {genres.map((genre) => (
                <div key={genre}>
                    <h2>{genre}</h2>
                    <ul>
                        {popularAuthors[genre].map((author) => (
                            <li key={author}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedAuthors.includes(author)}
                                        onChange={() => handleAuthorSelection(author)}
                                    />
                                    {author}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
            <button onClick={handleSubmit} disabled={selectedAuthors.length === 0} className='author-button'>
                <span>Далее</span>
            </button>
        </div>
    );
};

export default AuthorsSelection;
