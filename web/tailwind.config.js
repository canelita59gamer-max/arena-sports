/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        negro: '#080808',
        gris1: '#111111',
        gris2: '#191919',
        gris3: '#242424',
        borde: '#2C2C2C',
        texto: '#F0F0F0',
        texto2: '#A0A0A0',
        acento: '#E8FF00',
        acento2: '#B8E000',
        azul: '#1E3A8A',
      },
      fontFamily: {
        display: ['Oswald', 'Impact', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
      },
    },
  },
  plugins: [],
}
