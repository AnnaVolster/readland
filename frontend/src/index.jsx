import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './page/style/index.css'

const container = document.getElementById('app');
const root = ReactDOM.createRoot(container);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);