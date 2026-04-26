export const C = {
    p50: '#F5F4FE',
    p100: '#EEEDFE',
    p200: '#CECBF6',
    p300: '#AFA9EC',
    p400: '#7F77DD',
    p500: '#534AB7',
    p600: '#3C3489',
    p700: '#26215C',
    t50: '#E1F5EE',
    t200: '#5DCAA5',
    t600: '#0F6E56',
};


export const WA_NUMBER = '919490599600';
export const WA_MESSAGE = encodeURIComponent("Hi! I'd like to book a home service.");
export const WA_MESSAGE_PRO = encodeURIComponent("Hi! I'd like to become a partner with your company.");
export const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;
export const WA_URL_PRO = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE_PRO}`;

export const services = [
    { name: 'Cleaning', icon: '✦', live: true },
    { name: 'Plumbing', icon: '◈', live: true },
    { name: 'Electrical', icon: '⬡', live: true },
    { name: 'Painting', icon: '◉', live: false },
    { name: 'Carpentry', icon: '◧', live: false },
    { name: 'Appliance Repair', icon: '⊛', live: false },
];

export const steps = [
    {
        num: '01',
        title: 'Choose Service',
        desc: 'Browse our verified professionals and pick the service you need.',
        accent: C.p200,
    },
    {
        num: '02',
        title: 'Book a Schedule',
        desc: 'Pick a date and time that works for you — flexible and easy.',
        accent: C.t200,
    },
    {
        num: '03',
        title: 'Get It Done',
        desc: 'A vetted professional arrives at your door, ready to work.',
        accent: C.p400,
    },
];

export const reviews = [
    {
        name: 'Lakshmi P.',
        role: 'Homeowner',
        text: 'Booking process was very smooth and the cleaner did excellent work. Very happy with the service.',
    },
    {
        name: 'Ramesh K.',
        role: 'Landlord',
        text: 'The electrician came on time and completed the work very quickly. Very professional service.',
    },
    {
        name: 'Sravani M.',
        role: 'Tenant',
        text: 'The plumber was very skilled and fixed the problem within one hour. Really satisfied.',
    },
    {
        name: 'Praveen R.',
        role: 'Manager',
        text: 'Service was reliable, quick, and charges were reasonable. Exactly what we needed.',
    },
];

export const faqs = [
    {
        q: 'How do I book a service?',
        a: "Simply tap the WhatsApp button and message us — we'll get you booked within minutes.",
    },
    {
        q: 'Are professionals verified?',
        a: 'Yes. Every professional undergoes a thorough background check and skills assessment before joining.',
    },
    {
        q: 'What areas do you cover?',
        a: 'We currently serve the greater Nellore area with plans to expand.',
    },
    {
        q: 'Can I reschedule a booking?',
        a: "Absolutely. Message us at any time and we'll adjust your appointment.",
    },
];