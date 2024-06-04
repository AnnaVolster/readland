import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/recomendationsResults.css'
import Header from "./Header";

const genresList = [
    'Художественная литература', 'Научная литература', 'Научная фантастика',
    'Современная литература', 'Поэзия', 'Детективы и триллеры', 'Фэнтези',
    'Историческая литература', 'Зарубежная проза', 'Образование', 'Саморазвитие и самопомощь',
    'Психология', 'Кулинария', 'Религия и духовность', 'Медицина и здоровье', 'Искусство и дизайн',
    'Философия', 'Путеводители и туризм', 'Русская проза', 'Биография и мемуары'
];

const GenresSelection = () => {
    const [selectedGenres, setSelectedGenres] = useState([]);
    const navigate = useNavigate();
    const [isLoginOpen, setLoginOpen] = useState(false);
    const [isRegisterOpen, setRegisterOpen] = useState(false);
    const toggleLoginPopup = () => setLoginOpen(!isLoginOpen);
    const toggleRegisterPopup = () => setRegisterOpen(!isRegisterOpen);

    const handleGenreClick = (genre) => {
        if (selectedGenres.includes(genre)) {
            setSelectedGenres(selectedGenres.filter(g => g !== genre));
        } else if (selectedGenres.length < 5) {
            setSelectedGenres([...selectedGenres, genre]);
        }
    };

    const handleNext = () => {
        navigate('/authors-selection', { state: { genres: selectedGenres } });
    };

    return (
        <div className="genres-selection">
            <Header
                isLoginOpen={isLoginOpen}
                toggleLoginPopup={toggleLoginPopup}
                isRegisterOpen={isRegisterOpen}
                toggleRegisterPopup={toggleRegisterPopup}
            />
            <h1>Выберите любимые жанры (максимум 5)</h1>
            <div className="genres-list">
                {genresList.map(genre => (
                    <div
                        key={genre}
                        className={`genre-item ${selectedGenres.includes(genre) ? 'selected' : ''}`}
                        onClick={() => handleGenreClick(genre)}
                    >
                        {genre}
                    </div>
                ))}
            </div>
            <button onClick={handleNext} disabled={selectedGenres.length === 0} className='recommendations-button'>
                <span>Далее</span>
            </button>
        </div>
    );
};

export default GenresSelection;
