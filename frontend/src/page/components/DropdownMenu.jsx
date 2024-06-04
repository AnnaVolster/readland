import React from 'react';
import { Link } from 'react-router-dom';
import '../style/dropdownMenu.css';

const DropdownMenu = () => {
    return (
        <div className="dropdown-menu">
            <Link to="/catalog/fiction" className="dropdown-item">Художественная литература</Link>
            <Link to="/catalog/scientific" className="dropdown-item">Научная литература</Link>
            <Link to="/catalog/science-fiction" className="dropdown-item">Научная фантастика</Link>
            <Link to="/catalog/modern-literature" className="dropdown-item">Современная литература</Link>
            <Link to="/catalog/russian-prose" className="dropdown-item">Русская проза</Link>
            <Link to="/catalog" className="dropdown-item">Зарубежная проза</Link>
            <Link to="/catalog/fantasy" className="dropdown-item">Фэнтези</Link>
            <Link to="/catalog/detectives-thrillers" className="dropdown-item">Детективы и триллеры</Link>
            <Link to="/catalog/poetry" className="dropdown-item">Поэзия</Link>
            <Link to="/catalog/non-fiction" className="dropdown-item">Документальная литература</Link>
            <Link to="/catalog/biography-memoirs" className="dropdown-item">Биография и мемуары</Link>
            <Link to="/catalog/historical" className="dropdown-item">Историческая литература</Link>
            <Link to="/catalog/philosophy" className="dropdown-item">Философия</Link>
            <Link to="/catalog/psychology" className="dropdown-item">Психология</Link>
            <Link to="/catalog/self-development" className="dropdown-item">Саморазвитие и самопомощь</Link>
            <Link to="/catalog/cooking" className="dropdown-item">Кулинария</Link>
            <Link to="/catalog/travel-guides" className="dropdown-item">Путеводители и туризм</Link>
            <Link to="/catalog/medicine-health" className="dropdown-item">Медицина и здоровье</Link>
            <Link to="/catalog/art-design" className="dropdown-item">Искусство и дизайн</Link>
            <Link to="/catalog/education" className="dropdown-item">Образование</Link>
            <Link to="/catalog/religion-spirituality" className="dropdown-item">Религия и духовность</Link>
        </div>
    );
};

export default DropdownMenu;
