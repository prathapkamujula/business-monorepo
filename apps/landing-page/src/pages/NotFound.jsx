import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, AlertCircle } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-[70vh] flex items-center justify-center px-6 py-24 bg-primary-50">
            <div className="max-w-md w-full text-center">
                <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} className="mb-8 flex justify-center">
                    <div className="p-6 bg-white rounded-full shadow-xl shadow-primary-100">
                        <AlertCircle size={64} className="text-primary-500" />
                    </div>
                </motion.div>

                <h1 className="font-serif text-6xl md:text-8xl font-bold text-primary-700 mb-4">404</h1>
                <h2 className="font-serif text-2xl md:text-3xl font-semibold text-primary-900 mb-6">Page Not Found</h2>

                <p className="font-sans text-lg text-primary-900/60 mb-10 leading-relaxed">Oops! The page you are looking for doesn't exist or has been moved.</p>

                <Link to="/">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-2xl font-sans font-bold shadow-lg shadow-primary-200 hover:bg-primary-700 transition-all"
                    >
                        <Home size={20} />
                        Back to Home
                    </motion.button>
                </Link>
            </div>
        </div>
    );
}
