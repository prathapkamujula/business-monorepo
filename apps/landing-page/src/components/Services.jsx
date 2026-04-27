import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { services } from "../utils/content.js";
import { SectionLabel, SectionHeading } from './Common.jsx';

export default function Services() {
    return (
        <section id="services" className="bg-white px-6 md:px-16 py-16 border-y border-primary-50">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <SectionLabel>Expert Solutions</SectionLabel>
                        <SectionHeading>Services for Every Need</SectionHeading>
                    </div>
                    <p className="font-sans text-gray-500 max-w-md mb-6">
                        From your living room to your kitchen, we ensure every corner of your Indian home is perfectly maintained.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((s, i) => (
                        <motion.div
                            key={i}
                            whileHover={s.live ? { y: -8 } : {}}
                            className={`group flex items-center justify-between p-8 rounded-[2rem] border transition-all
                                ${s.live 
                                    ? 'bg-primary-50 border-primary-100 hover:bg-white hover:shadow-xl hover:shadow-primary-100 cursor-pointer' 
                                    : 'bg-gray-50 border-gray-100 opacity-60 cursor-not-allowed'}`}
                        >
                            <div className="flex items-center gap-6">
                                <span className="text-4xl filter grayscale group-hover:grayscale-0 transition-all">
                                    {s.icon}
                                </span>
                                <div>
                                    <h4 className="font-serif text-xl font-bold text-primary-700">{s.name}</h4>
                                    <p className="font-sans text-xs text-gray-400 mt-1 uppercase tracking-widest font-bold">
                                        {s.live ? 'Book Now' : 'Stay Tuned'}
                                    </p>
                                </div>
                            </div>
                            {s.live ? (
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary-500 shadow-sm">
                                    <ArrowRight size={20} />
                                </div>
                            ) : (
                                <span className="text-xs font-bold text-gray-400">Soon</span>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
