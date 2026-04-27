import { motion } from 'framer-motion';

export const WaIcon = ({ size = 20 }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-message-circle"
    >
        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
);

export const SectionLabel = ({ children }) => (
    <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-sans text-[10px] font-bold uppercase tracking-[0.25em] mb-3 text-primary-400"
    >
        {children}
    </motion.p>
);

export const SectionHeading = ({ children }) => (
    <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-serif text-3xl md:text-4xl font-light tracking-tight leading-tight text-primary-700 mb-6"
    >
        {children}
    </motion.h2>
);
