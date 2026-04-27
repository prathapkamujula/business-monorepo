import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { WebsiteLogo } from '../utils/logo.jsx';
import { WA_URL, C, navLinks } from '../utils/content.js';
import { WaIcon } from './Common.jsx';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    const isHome = location.pathname === '/';

    const renderLink = (l, mobile = false) => {
        const className = mobile
            ? 'font-sans text-lg font-medium text-gray-700'
            : 'font-sans text-sm font-medium tracking-wide text-gray-600 hover:text-primary-600 transition-colors';

        if (isHome) {
            return (
                <a key={l.name} href={l.href} className={className} onClick={() => mobile && setMenuOpen(false)}>
                    {l.name}
                </a>
            );
        } else {
            return (
                <Link key={l.name} to={`/${l.href}`} className={className} onClick={() => mobile && setMenuOpen(false)}>
                    {l.name}
                </Link>
            );
        }
    };

    return (
        <nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-16 py-3 bg-primary-50/90 backdrop-blur-md border-b border-primary-100">
            <Link to="/" className="flex items-center gap-2">
                <WebsiteLogo size={16} color={C.p600} />
                <span className="font-serif text-xl font-bold tracking-tight text-primary-700">
                    Home <span className="text-primary-400 italic">Hero</span>
                </span>
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-10">{navLinks.map((l) => renderLink(l))}</div>

            <div className="hidden md:flex items-center gap-4">
                <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={WA_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 font-sans text-sm font-semibold rounded-full px-6 py-2.5 bg-[#25D366] text-white shadow-lg shadow-green-200 hover:shadow-green-300 transition-all"
                >
                    <WaIcon size={18} /> Chat with us
                </motion.a>
            </div>

            {/* Hamburger */}
            <button className="md:hidden p-2 text-primary-700" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Mobile menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="absolute top-full left-0 right-0 bg-white border-b border-primary-100 overflow-hidden md:hidden"
                    >
                        <div className="flex flex-col p-6 gap-4">
                            {navLinks.map((l) => renderLink(l, true))}
                            <hr className="border-primary-50" />
                            <a
                                href={WA_URL}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-center gap-2 font-sans font-semibold rounded-xl py-4 bg-[#25D366] text-white"
                            >
                                <WaIcon size={20} /> Book via WhatsApp
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
