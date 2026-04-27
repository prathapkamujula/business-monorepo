import Hero from '../components/Hero.jsx';
import HowItWorks from '../components/HowItWorks.jsx';
import Services from '../components/Services.jsx';
import DownloadSection from '../components/DownloadSection.jsx';
import Reviews from '../components/Reviews.jsx';
import FAQ from '../components/FAQ.jsx';
import CTA from '../components/CTA.jsx';

export default function Home() {
    return (
        <div className="overflow-x-hidden">
            <Hero />
            <HowItWorks />
            <Services />
            <DownloadSection />
            <Reviews />
            <FAQ />
            <CTA />
        </div>
    );
}
