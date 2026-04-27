/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx}'],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#F5F4FE',
                    100: '#EEEDFE',
                    200: '#CECBF6',
                    300: '#AFA9EC',
                    400: '#7F77DD',
                    500: '#534AB7',
                    600: '#3C3489',
                    700: '#26215C',
                    800: '#1A1640', // ← add this
                    900: '#0F0D26', // ← add this
                },
                teal: {
                    50: '#E1F5EE',
                    200: '#5DCAA5',
                    600: '#0F6E56',
                },
                indian: {
                    saffron: '#FF9933',
                    white: '#FFFFFF',
                    green: '#138808',
                    navy: '#000080',
                },
            },
            fontFamily: {
                // Display / headings — Yatra One has strong Devanagari-influenced strokes
                // that feel rooted in Indian typographic heritage
                display: ['Yatra One', 'Baloo 2', 'Georgia', 'serif'],

                // Serif body — Tiro Devanagari Latin is designed for South Asian contexts;
                // elegant for long-form editorial content
                serif: ['Tiro Devanagari Latin', 'Lora', 'Georgia', 'serif'],

                // Sans body — Hind is purpose-built for Indian UIs (great Latin + Devanagari
                // coverage); Poppins as fallback keeps the rounded, friendly feel common
                // in popular Indian apps (PhonePe, Swiggy, etc.)
                sans: ['Hind', 'Poppins', 'DM Sans', 'system-ui', 'sans-serif'],

                // Accent / pull quotes — Rozha One is a high-contrast display serif with
                // strong Devanagari DNA; pairs beautifully with Hind
                accent: ['Rozha One', 'Tiro Devanagari Latin', 'serif'],

                // Mono — unchanged, but Noto Sans Mono has good Indic Unicode support
                mono: ['Noto Sans Mono', 'ui-monospace', 'monospace'],
            },
        },
    },
    plugins: [],
};
