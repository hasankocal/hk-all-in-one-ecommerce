/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#2D3A18', // Deep Olive (Zeytin Yeşili) - Web style
                    light: '#4A5D2E',
                    dark: '#1A230D',
                },
                secondary: {
                    DEFAULT: '#C4A962', // Gold-Accent (Altın Tınısı)
                    light: '#D4C08A',
                    dark: '#A68B42',
                },
                background: {
                    DEFAULT: '#FFFFFF', // Pure White
                    warm: '#FDFCF7', // Warm Beige (Krem tınısı)
                },
                text: {
                    main: '#2D3A18', // Using Deep Olive for main text
                    muted: '#6B7280', // Gray-500
                }
            },
            borderRadius: {
                'none': '0px',
                'sm': '2px',
                DEFAULT: '0px', // Sharp edges as per Egeye Donus style
                'md': '4px',
                'lg': '8px',
                'xl': '12px',
            }
        },
    },
    plugins: [],
}
