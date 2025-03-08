/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'light-blue': '#e5f7ff',
                'dark-blue': '#083059',
                'medium-blue': '#179dd9',
                'accent-blue': '#3951aa',
            },
            fontFamily: {
                // Tipografía para titulos:
                heading: ['Raleway'],
                // para párrafos:
                body: ['Poppins'],
                // Para botones:
                button: ['Poppins'],
            },
        },
    },
    plugins: [],
};
