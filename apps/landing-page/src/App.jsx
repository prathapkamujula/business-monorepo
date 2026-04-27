import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import Services from './components/Services.jsx';
import DownloadSection from './components/DownloadSection.jsx';
import Reviews from './components/Reviews.jsx';
import FAQ from './components/FAQ.jsx';
import CTA from './components/CTA.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
    return (
        <div className="font-serif min-h-screen bg-primary-50 text-[#2C2C2A] selection:bg-primary-200">
            <Navbar />
            <div className="overflow-x-hidden">
                <Hero />
                <HowItWorks />
                <Services />
                <DownloadSection />
                <Reviews />
                <FAQ />
                <CTA />
                <Footer />
            </div>
        </div>
    );
}
