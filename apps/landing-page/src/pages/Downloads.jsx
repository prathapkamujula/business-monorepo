import { useState } from 'react';
import { ChevronDown, ChevronUp, Apple, Smartphone } from 'lucide-react';

const Collapsible = ({ title, icon: Icon, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border border-primary-100 rounded-xl overflow-hidden mb-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 bg-white hover:bg-primary-50/30 transition-colors"
            >
                <div className="flex items-center gap-4">
                    <div className="p-2 bg-primary-50 rounded-lg text-primary-600">
                        <Icon size={24} />
                    </div>
                    <span className="text-xl font-serif font-semibold">{title}</span>
                </div>
                {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {isOpen && (
                <div className="p-6 bg-white border-t border-primary-50">
                    {children}
                </div>
            )}
        </div>
    );
};

export default function Downloads() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-24 min-h-screen">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Download Home Hero</h1>
                <p className="text-xl font-sans text-primary-900/60">Get the best home services at your fingertips.</p>
            </div>

            <Collapsible title="iOS App" icon={Apple} defaultOpen={true}>
                <div className="space-y-4 font-sans text-primary-900/80">
                    <p>Available on the Apple App Store for iPhone and iPad.</p>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Requires iOS 14.0 or later</li>
                        <li>Regular updates with new features</li>
                        <li>Secure Apple Pay integration</li>
                    </ul>
                    <button className="mt-4 px-8 py-3 bg-black text-white rounded-full font-semibold flex items-center gap-2 hover:bg-gray-800 transition-colors">
                        <Apple size={20} fill="currentColor" /> App Store
                    </button>
                </div>
            </Collapsible>

            <Collapsible title="Android App" icon={Smartphone}>
                <div className="space-y-4 font-sans text-primary-900/80">
                    <p>Available on the Google Play Store for all Android devices.</p>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Requires Android 8.0 or later</li>
                        <li>Lightweight and fast performance</li>
                        <li>Real-time push notifications</li>
                    </ul>
                    <button className="mt-4 px-8 py-3 bg-[#3DDC84] text-black rounded-full font-semibold flex items-center gap-2 hover:bg-[#32b36c] transition-colors">
                        <Smartphone size={20} /> Google Play
                    </button>
                </div>
            </Collapsible>
        </div>
    );
}
