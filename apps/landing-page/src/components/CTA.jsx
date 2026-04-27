import { motion } from 'framer-motion';
import { WA_URL } from '../utils/content.js';
import { WaIcon, SectionLabel } from './Common.jsx';

export default function CTA() {
    return (
        <section className="px-6 py-16">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-6xl mx-auto rounded-[3rem] bg-primary-700 p-12 md:p-16 text-center relative overflow-hidden shadow-3xl"
            >
                {/* Indian Patterns/Accents */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/30 rounded-full blur-3xl -mr-32 -mt-32" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl -ml-32 -mb-32" />

                <div className="relative z-10 max-w-2xl mx-auto">
                    <SectionLabel>Get Started</SectionLabel>
                    <h2 className="font-serif text-3xl md:text-5xl font-light leading-tight tracking-tight mb-6 text-white">
                        Your home deserves <br />
                        <span className="italic font-normal text-primary-200">exceptional care.</span>
                    </h2>
                    <p className="font-sans text-lg text-primary-200/80 mb-10">Join thousands of families across India who trust Home Hero for their daily home needs.</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href={WA_URL}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center gap-3 font-sans font-bold text-lg rounded-2xl px-10 py-5 bg-[#25D366] text-white shadow-2xl shadow-green-900/40"
                        >
                            <WaIcon size={24} /> Book via WhatsApp
                        </motion.a>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
