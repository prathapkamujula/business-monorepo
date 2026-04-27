import { motion } from 'framer-motion';
import { steps } from "../utils/content.js";
import { SectionLabel, SectionHeading } from './Common.jsx';

export default function HowItWorks() {
    const icons = ['⚡', '📅', '🏠'];
    
    return (
        <section id="how-it-works" className="px-6 md:px-16 py-16 max-w-7xl mx-auto">
            <div className="text-center mb-12">
                <SectionLabel>Your Journey</SectionLabel>
                <SectionHeading>Simple 3-Step Process</SectionHeading>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {steps.map((s, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.2 }}
                        viewport={{ once: true }}
                        className="group relative p-10 rounded-[2.5rem] bg-white border border-primary-100 hover:border-primary-300 transition-all hover:shadow-2xl hover:shadow-primary-100"
                    >
                        <div className="text-6xl font-serif font-black text-primary-50/50 absolute top-6 right-8 group-hover:text-primary-100 transition-colors">
                            {s.num}
                        </div>
                        <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center text-3xl mb-8 text-primary-500">
                            {icons[i]}
                        </div>
                        <h3 className="font-serif text-2xl font-bold mb-4 text-primary-700">{s.title}</h3>
                        <p className="font-sans text-gray-500 leading-relaxed mb-6">{s.desc}</p>
                        <div className="h-1.5 w-12 rounded-full" style={{ background: s.accent }} />
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
