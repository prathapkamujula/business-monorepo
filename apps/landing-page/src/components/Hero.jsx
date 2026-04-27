import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { WA_URL, WA_URL_PRO, heroStats } from "../utils/content.js";
import { WaIcon } from './Common.jsx';
import service1 from "../assets/services/service1.png"
import service2 from "../assets/services/service2.png";
import service3 from "../assets/services/service3.png";

// content.js additions
const heroImages = [
    {
        id: "service1",
        src: service1,
        alt: "Home Service 1",
    },
    {
        id: "service2",
        src: service2,
        alt: "Home Service 2",
    },
    {
        id: "service3",
        src: service3,
        alt: "Home Service 3",
    },
];

export default function Hero() {
    return (
        <section className="relative px-6 md:px-16 pt-12 md:pt-24 pb-20 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Left content */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-3 rounded-full px-5 py-2 mb-8 bg-primary-100 border border-primary-200">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="font-sans text-xs font-bold uppercase tracking-widest text-primary-700">
                            Trusted by 5000+ Indians
                        </span>
                    </div>

                    <h1 className="font-serif font-light leading-[1.1] tracking-tight mb-6 text-5xl md:text-6xl text-primary-700">
                        India's Most Trusted <br />
                        <span className="italic font-normal text-primary-400">Home Care Experts.</span>
                    </h1>

                    <p className="font-sans text-lg leading-relaxed text-gray-600 mb-8 max-w-lg">
                        Professional cleaning, plumbing, and electrical services tailored for the Indian home. 
                        Verified experts, transparent pricing, and instant booking.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mb-12">
                        <motion.a
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            href={WA_URL}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center gap-3 font-sans font-bold text-base rounded-2xl px-8 py-5 bg-[#25D366] text-white shadow-xl shadow-green-200"
                        >
                            <WaIcon size={24} /> Book Now on WhatsApp
                        </motion.a>
                        <motion.a
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            href={WA_URL_PRO}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center font-sans font-semibold text-base rounded-2xl px-8 py-5 border-2 border-primary-200 text-primary-700 hover:bg-primary-100 transition-colors"
                        >
                            Become a Partner
                        </motion.a>
                    </div>

                    <div className="grid grid-cols-3 gap-8 pt-10 border-t border-primary-100">
                        {heroStats.map((stat) => (
                            <div key={stat.label}>
                                <div className="font-serif text-3xl font-bold text-primary-700">{stat.value}</div>
                                <div className="font-sans text-xs font-medium text-gray-400 uppercase tracking-wider mt-1">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Right Content - Indian Lifestyle Images */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="relative grid grid-cols-2 gap-4"
                >
                    <div className="space-y-4">
                        <motion.div 
                            whileHover={{ y: -10 }}
                            className="rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white"
                        >
                            <img src={heroImages[0].src} alt={heroImages[0].alt} className="w-full h-64 object-cover" />
                        </motion.div>
                        <motion.div 
                            whileHover={{ y: -10 }}
                            className="rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white aspect-square"
                        >
                            <img src={heroImages[1].src} alt={heroImages[1].alt} className="w-full h-full object-cover" />
                        </motion.div>
                    </div>
                    <div className="pt-12 space-y-4">
                        <motion.div 
                            whileHover={{ y: -10 }}
                            className="rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white aspect-square"
                        >
                            <img src={heroImages[2].src} alt={heroImages[2].alt} className="w-full h-full object-cover" />
                        </motion.div>
                        <div className="p-8 rounded-[2rem] bg-teal-50 border-2 border-teal-100">
                            <div className="flex gap-1 mb-4 text-teal-600">
                                {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                            </div>
                            <p className="font-serif text-lg italic text-teal-800">"The cleaning was exceptional, handled with traditional Indian care."</p>
                            <p className="mt-4 font-sans text-sm font-bold text-teal-600">— Ananya S.</p>
                        </div>
                    </div>
                    
                    {/* Decorative elements */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-indian-saffron/10 rounded-full blur-3xl -z-10" />
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indian-green/10 rounded-full blur-3xl -z-10" />
                </motion.div>
            </div>
        </section>
    );
}
