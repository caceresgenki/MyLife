/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",  // Si usas la carpeta src
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: '#2F3B35',
        copper: '#B87B4B',
        cream: '#F5F4F2',
        dark: '#1A1A1A',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)'],
        sans: ['var(--font-inter)'],
        script: ['var(--font-dancing)'],
      },
    },
  },
  plugins: [],
}