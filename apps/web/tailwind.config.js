/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                "primary": "#9cec13",
                "background-light": "#f7f8f6",
                "deep-olive": "#2d3a18",
                "warm-beige": "#f2eee3",
                "gold-accent": "#d4af37",
            },
            fontFamily: {
                "display": ["var(--font-work-sans)", "sans-serif"],
                "sans": ["var(--font-work-sans)", "sans-serif"],
            },
            borderRadius: {
                "full": "9999px",
            },
        },
    },
    plugins: [],
};
