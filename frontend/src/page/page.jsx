import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Catalog from './catalog';
import Subscription from './subscription';
import New from './new';
import Sale from './sale';
import Home from './home';
import Login from './login';


const Page = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/new" element={<New />} />
            <Route path="/sale" element={<Sale />} />
            <Route path="/sign_in" element={<Login />} />
        </Routes>
    );
}

export default Page;