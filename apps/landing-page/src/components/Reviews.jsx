import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { reviews } from '../utils/content.js';
import { SectionLabel, SectionHeading } from './Common.jsx';

export default function Reviews() {
    return (
        <section id="reviews" className="px-6 md:px-16 py-16 max-w-7xl mx-auto">
            <div className="text-center mb-12">
                <SectionLabel>Hear from India</SectionLabel>
                <SectionHeading>What Our Customers Say</SectionHeading>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {reviews.map((r, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="p-10 rounded-[2.5rem] bg-white border border-primary-100 shadow-sm relative"
                    >
                        <div className="flex gap-1 mb-6 text-indian-saffron">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <Star key={s} size={18} fill="currentColor" strokeWidth={0} />
                            ))}
                        </div>
                        <p className="font-serif text-2xl italic leading-relaxed text-primary-700 mb-10">"{r.text}"</p>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center font-sans text-lg font-bold text-primary-700">{r.name[0]}</div>
                            <div>
                                <div className="font-sans font-bold text-primary-900">{r.name}</div>
                                <div className="font-sans text-xs text-primary-400 uppercase tracking-widest font-bold mt-0.5">{r.role}</div>
                            </div>
                        </div>
                        <div className="absolute top-10 right-10 text-primary-50/50">
                            <svg width="40" height="30" viewBox="0 0 40 30" fill="currentColor">
                                <path d="M0 30h12l8-15V0H0v30zm20 0h12l8-15V0H20v30z" />
                            </svg>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
