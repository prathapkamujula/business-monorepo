import { WebsiteLogo } from '../utils/logo.jsx';
import { navLinks, footerData } from "../utils/content.js";
import { WaIcon } from './Common.jsx';

export default function Footer() {
    return (
        <footer className="bg-primary-900 px-6 md:px-16 py-16 text-white">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                <div className="col-span-1 md:col-span-2">
                    <div className="flex items-center gap-2 mb-6">
                        <WebsiteLogo size={32} color="white" />
                        <span className="font-serif text-xl font-bold text-white">Home Hero</span>
                    </div>
                    <p className="font-sans text-primary-100/80 max-w-sm leading-relaxed">
                        {footerData.description}
                    </p>
                </div>
                <div>
                    <h5 className="font-serif text-lg font-bold mb-6 text-white">Quick Links</h5>
                    <ul className="space-y-4 font-sans text-primary-100/70">
                        {navLinks.map(l => (
                            <li key={l.name}><a href={l.href} className="hover:text-white transition-colors">{l.name}</a></li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h5 className="font-serif text-lg font-bold mb-6 text-white">Contact</h5>
                    <ul className="space-y-4 font-sans text-primary-100/70">
                        <li className="flex items-center gap-3 text-green-400 font-semibold">
                            <WaIcon size={18} /> {footerData.contact.phone}
                        </li>
                        <li className="text-primary-100/80">{footerData.contact.address}</li>
                        <li className="text-primary-100/80">{footerData.contact.country}</li>
                    </ul>
                </div>
            </div>
            <div className="max-w-7xl mx-auto pt-8 border-t border-primary-800/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-primary-200/50 font-sans text-sm">
                <span className="text-center sm:text-left">{footerData.copyright}</span>
                <div className="flex gap-8">
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
}
