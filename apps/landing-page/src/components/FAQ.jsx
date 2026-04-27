import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqs, C } from "../utils/content.js";
import { SectionLabel, SectionHeading } from './Common.jsx';

export default function FAQ() {
    const [open, setOpen] = useState(null);

    return (
        <section id="faq" className="bg-white px-6 md:px-16 py-16">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <SectionLabel>Help Center</SectionLabel>
                    <SectionHeading>Frequently Asked Questions</SectionHeading>
                </div>
                <div className="space-y-2">
                    {faqs.map((f, i) => (
                        <div key={i} className="border border-primary-100 rounded-[1.5rem] overflow-hidden">
                            <button
                                className="w-full text-left flex justify-between items-center p-4 font-serif text-xl font-bold bg-transparent transition-colors hover:bg-primary-50"
                                style={{ color: open === i ? C.p500 : C.p700 }}
                                onClick={() => setOpen(open === i ? null : i)}
                            >
                                {f.q}
                                <motion.span
                                    animate={{ rotate: open === i ? 45 : 0 }}
                                    className="text-3xl font-light text-primary-300"
                                >
                                    +
                                </motion.span>
                            </button>
                            <AnimatePresence>
                                {open === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                    >
                                        <p className="font-sans text-gray-500 p-4 pt-2 leading-relaxed border-t border-primary-50 bg-primary-50/30">
                                            {f.a}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
