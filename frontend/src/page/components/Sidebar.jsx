import React from 'react';
import '../style/sidebar.css';

const genres = [
    "Художественная литература",
    "Научная литература",
    "Научная фантастика",
    "Современная литература",
    "Русская проза",
    "Зарубежная проза",
    "Фэнтези",
    "Детективы и триллеры",
    "Поэзия",
    "Документальная литература",
    "Биография и мемуары",
    "Историческая литература",
    "Философия",
    "Психология",
    "Саморазвитие и самопомощь",
    "Кулинария",
    "Путеводители и туризм",
    "Медицина и здоровье",
    "Искусство и дизайн",
    "Образование",
    "Религия и духовность"
];

const Sidebar = ({ onGenreSelect, selectedGenre }) => {
    return (

        <div className="sidebar">
            <div className="sidebar-title">Жанры</div>
            <div className='line-sidebar' />
            <div className={'frame-2d'}>
                <button className='frame-2e'>
                    <div className='frame-2f'>
                        <div className='frame-30'>
                            <div className='vector-31' />
                        </div>
                        <input type="text" placeholder="Найдите жанр" className="sidebar-search"/>
                    </div>
                </button>
                <ul className='sidebar-list'>
                    {genres.map((genre, index) => (
                        <li className="sidebar-item"
                            key={index}
                            onClick={() => onGenreSelect(genre)}
                        >
                            {genre}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;