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
                    800: '#1A1640',  // ← add this
                    900: '#0F0D26',  // ← add this
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
                }
            },
            fontFamily: {
                serif: ['Cormorant Garamond', 'Georgia', 'serif'],
                sans: ['DM Sans', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [],
};