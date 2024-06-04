import React, {useState} from 'react';
import { useLocation, Link } from 'react-router-dom';
import './style/recomendationsResults.css'
import Header from "./components/Header";
import RecommendationCard from "./components/recommendationCard";
import BookCard from "./components/BookCard";

const RecommendationsResults = () => {
    const location = useLocation();
    const recommendations = location.state?.recommendations || [];
    const [isLoginOpen, setLoginOpen] = useState(false);
    const [isRegisterOpen, setRegisterOpen] = useState(false);

    const toggleLoginPopup = () => setLoginOpen(!isLoginOpen);
    const toggleRegisterPopup = () => setRegisterOpen(!isRegisterOpen);

    return (
        <div className="recommendations-results">
            <Header
                isLoginOpen={isLoginOpen}
                toggleLoginPopup={toggleLoginPopup}
                isRegisterOpen={isRegisterOpen}
                toggleRegisterPopup={toggleRegisterPopup}
            />
            <div className="recommendations-results-33">
                <span className={"reccomendations-h1"}>Рекомендации</span>
                <Link className={"repeat"} to="/genres-selection">Пройти опрос заново</Link>
                <div className="recommendations-results-34">
                {recommendations.length > 0 ? (
                    recommendations.map((book, index) => (
                        <RecommendationCard key={index} book={book} />
                    ))
                ) : (
                    <p>Нет рекомендаций</p>
                )}
            </div>
            </div>
        </div>
    );
};

export default RecommendationsResults;