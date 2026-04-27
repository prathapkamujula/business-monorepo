import React from 'react';
import { motion } from 'framer-motion';
import { Apple, Smartphone } from 'lucide-react';
import android2 from '../assets/appCaptures/android1.png'

export default function DownloadSection() {
    return (
        <section id="download" className="bg-primary-50 px-6 md:px-16 py-16 overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex-1 text-center md:text-left"
                >
                    <h2 className="font-serif text-4xl md:text-5xl font-light tracking-tight leading-tight text-primary-700 mb-6">
                        Get the app for a <br />
                        <span className="italic font-normal text-primary-400">seamless experience</span>
                    </h2>
                    <p className="font-sans text-lg text-gray-600 mb-10 max-w-lg mx-auto md:mx-0 leading-relaxed">
                        Book services, track professionals, and manage your Home Hero bookings all from your pocket. 
                    </p>
                    
                    <div className="flex flex-wrap justify-center md:justify-start gap-4">
                        <motion.a
                            whileHover={{ y: -4 }}
                            whileTap={{ scale: 0.98 }}
                            href="#"
                            className="flex items-center gap-4 bg-primary-700 text-white px-7 py-4 rounded-2xl transition-all hover:bg-primary-800 shadow-lg shadow-primary-200"
                        >
                            <Apple size={28} />
                            <div className="text-left">
                                <p className="text-[10px] uppercase font-sans font-bold tracking-wider opacity-80 leading-none">Download on</p>
                                <p className="text-lg font-sans font-bold leading-none mt-1">App Store</p>
                            </div>
                        </motion.a>
                        
                        <motion.a
                            whileHover={{ y: -4 }}
                            whileTap={{ scale: 0.98 }}
                            href="#"
                            className="flex items-center gap-4 bg-primary-700 text-white px-7 py-4 rounded-2xl transition-all hover:bg-primary-800 shadow-lg shadow-primary-200"
                        >
                            <Smartphone size={28} />
                            <div className="text-left">
                                <p className="text-[10px] uppercase font-sans font-bold tracking-wider opacity-80 leading-none">Get it on</p>
                                <p className="text-lg font-sans font-bold leading-none mt-1">Google Play</p>
                            </div>
                        </motion.a>
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex-1 relative"
                >
                    <div className="relative z-10 w-[280px] md:w-[320px] mx-auto aspect-[9/19] bg-gray-900 rounded-[3rem] border-[8px] border-gray-800 shadow-2xl overflow-hidden">
                        <img 
                            src={android2}
                            alt="App Screenshot" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {/* Decorative blobs */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-200 rounded-full blur-3xl opacity-50 -z-0" />
                    <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-teal-100 rounded-full blur-3xl opacity-50 -z-0" />
                </motion.div>
            </div>
        </section>
    );
}
