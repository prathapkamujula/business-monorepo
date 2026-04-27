import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Privacy from './pages/Privacy.jsx';
import TermsAndConditions from './pages/TermsAndConditions.jsx';
import Downloads from './pages/Downloads.jsx';
import NotFound from './pages/NotFound.jsx';

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

export default function App() {
    return (
        <Router>
            <ScrollToTop />
            <div className="font-serif min-h-screen bg-primary-50 text-[#2C2C2A] selection:bg-primary-200">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/terms" element={<TermsAndConditions />} />
                    <Route path="/downloads" element={<Downloads />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}
