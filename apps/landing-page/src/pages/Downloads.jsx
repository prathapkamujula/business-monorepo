import { useState } from 'react';
import { Apple, ChevronDown, ChevronUp, Smartphone } from 'lucide-react';

// ─── DATA ────────────────────────────────────────────────────────────────────
// Add/remove entries here — the component updates automatically.
// The first item with tag: "latest" gets highlighted styling.

const IOS_VERSIONS = [];

const ANDROID_VERSIONS = [
    {
        version: '3.2.0',
        date: '2025-04-10',
        notes: 'Material You redesign, push notification improvements',
        tag: 'latest',
        link: 'https://play.google.com/store/your-app',
    },
    {
        version: '3.1.8',
        date: '2025-03-03',
        notes: 'Crash fixes on Android 14',
        tag: 'stable',
        link: 'https://play.google.com/store/your-app',
    },
    {
        version: '3.1.5',
        date: '2025-01-28',
        notes: 'Performance improvements for older devices',
        tag: 'stable',
        link: 'https://play.google.com/store/your-app',
    },
];

// ─── SUB-COMPONENTS ──────────────────────────────────────────────────────────

const TAG_STYLES = {
    latest: 'bg-green-100 text-green-800',
    beta: 'bg-orange-100 text-orange-800',
    stable: 'bg-gray-100 text-gray-600',
};

const VersionCard = ({ v, isLatest, buttonClass, buttonLabel, buttonIcon: ButtonIcon }) => (
    <>
        <div
            className={`flex items-center justify-between border rounded-xl p-4 gap-4 transition-shadow hover:shadow-sm
    ${isLatest ? 'border-green-200 bg-green-50/40' : 'border-primary-100 bg-primary-50/10'}`}
        >
            <div>
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-sm font-semibold">v{v.version}</span>
                    <span className={`text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${TAG_STYLES[v.tag] ?? TAG_STYLES.stable}`}>{v.tag}</span>
                    <span className="text-xs text-primary-900/50">
                        {new Date(v.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                        })}
                    </span>
                </div>
                <p className="text-sm text-primary-900/60 mt-1">{v.notes}</p>
            </div>

            {v.link ? (
                <a href={v.link} className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-opacity hover:opacity-80 ${buttonClass}`}>
                    <ButtonIcon size={16} />
                    {buttonLabel}
                </a>
            ) : (
                <span className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-primary-900/40 border border-dashed border-primary-200 whitespace-nowrap">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-300 animate-pulse" />
                    Coming soon
                </span>
            )}
        </div>
    </>
);

const Collapsible = ({ title, icon: Icon, children, requirement, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
        <div className="border border-primary-100 rounded-xl overflow-hidden mb-4">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between p-6 bg-white hover:bg-primary-50/30 transition-colors">
                <div className="flex items-center gap-4">
                    <div className="p-2 bg-primary-50 rounded-lg text-primary-600">
                        <Icon size={24} />
                    </div>
                    <span className="text-xl font-serif font-semibold">{title}</span>
                </div>
                {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {isOpen && (
                <div className="p-6 bg-white border-t border-primary-50 space-y-3">
                    {children}
                    {requirement && <p className="text-xs text-primary-900/40 pt-2 border-t border-primary-50">{requirement}</p>}
                </div>
            )}
        </div>
    );
};

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function Downloads() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-24 min-h-screen">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Download Home Hero</h1>
                <p className="text-xl font-sans text-primary-900/60">Get the best home services at your fingertips.</p>
            </div>

            <Collapsible title="iOS App" icon={Apple} requirement="Requires iOS 14.0 or later" defaultOpen>
                {IOS_VERSIONS.map((v, i) => (
                    <VersionCard key={v.version} v={v} isLatest={i === 0 && v.tag === 'latest'} buttonClass="bg-black text-white" buttonLabel="Download" buttonIcon={Apple} />
                ))}
            </Collapsible>

            <Collapsible title="Android App" icon={Smartphone} requirement="Requires Android 8.0 or later">
                {ANDROID_VERSIONS.map((v, i) => (
                    <VersionCard
                        key={v.version}
                        v={v}
                        isLatest={i === 0 && v.tag === 'latest'}
                        buttonClass="bg-[#3DDC84] text-black"
                        buttonLabel="Download"
                        buttonIcon={Smartphone}
                    />
                ))}
            </Collapsible>
        </div>
    );
}
