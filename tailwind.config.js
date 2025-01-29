// tailwind.config.js (cambia la extensión de .mjs a .js)
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,jsx,ts,tsx,mdx}",
    "./pages/**/*.{js,jsx,ts,tsx,mdx}",
    "./components/**/*.{js,jsx,ts,tsx,mdx}",
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