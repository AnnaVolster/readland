import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import apiClient from "./Api";
import Header from "./Header";

    const KeywordsInput = () => {
        const location = useLocation();
        const navigate = useNavigate();
        const [keywords, setKeywords] = useState('');
        const { genres, selectedAuthors } = location.state || {};
        const [isLoginOpen, setLoginOpen] = useState(false);
        const [isRegisterOpen, setRegisterOpen] = useState(false);
        const toggleLoginPopup = () => setLoginOpen(!isLoginOpen);
        const toggleRegisterPopup = () => setRegisterOpen(!isRegisterOpen);

        const handleKeywordsChange = (e) => {
            setKeywords(e.target.value);
        };

        const handleSubmit = async () => {
            try {
                const response = await apiClient.post('/recommendations/', {
                    genres, authors: selectedAuthors, keywords
                });
                console.log('API Response:', response.data); // Логируем ответ API для проверки
                navigate('/recommendations-results', { state: { recommendations: response.data.recommendations } });
            } catch (error) {
                console.error('Ошибка при получении рекомендаций', error);
            }
        };

        return (
            <div className="keywords-input">
                <Header
                    isLoginOpen={isLoginOpen}
                    toggleLoginPopup={toggleLoginPopup}
                    isRegisterOpen={isRegisterOpen}
                    toggleRegisterPopup={toggleRegisterPopup}
                />
                <h1>Введите ключевые слова или сюжет любимых книг</h1>
                <textarea
                    value={keywords}
                    onChange={handleKeywordsChange}
                    placeholder="Опишите ваши предпочтения..."
                />
                <button className={'keywords-button'} onClick={handleSubmit} disabled={!keywords.trim()}>
                    <span>Получить рекомендации</span>
                </button>
            </div>
        );
    };

    export default KeywordsInput;
