import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { injectFavicon } from './utils/logo.jsx';
import { C } from './utils/content.js';

const Main = () => {
    useEffect(() => {
        injectFavicon(C.p600, 'white');
    }, []);

    return (
        <StrictMode>
            <App />
        </StrictMode>
    );
};

createRoot(document.getElementById('root')).render(<Main />);
