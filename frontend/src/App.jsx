import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './page/home';
import LoginPopup from "./page/login";
import Catalog from './page/catalog';
import Subscription from './page/subscription';
import New from './page/new';
import Sale from './page/sale';
import Favorites from "./page/favorite";
import Card from "./page/card";
import Order from "./page/components/order";
import GenresSelection from "./page/components/GenresSelection";
import AuthorsSelection from "./page/components/AuthorsSelection";
import KeywordsInput from "./page/components/KeywordsInput";
import RecommendationsResults from "./page/RecommendationsResults";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPopup />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/subscription" element={<Subscription />} />
                <Route path="/new" element={<New />} />
                <Route path="/sale" element={<Sale />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/card" element={<Card />} />
                <Route path="/order" element={<Order />} />
                <Route path="/genres-selection" element={<GenresSelection />} />
                <Route path="/authors-selection" element={<AuthorsSelection />} />
                <Route path="/keywords-input" element={<KeywordsInput />} />
                <Route path="/recommendations-results" element={<RecommendationsResults />} />
            </Routes>
        </Router>
    );
};

export default App;


