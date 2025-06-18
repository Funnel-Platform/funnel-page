/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  safelist: [
    'w-20',
    'w-32',
    'max-w-80',
    'max-h-14',
    'max-w-52',
    'max-h-8',
    'md:max-w-72',
    'md:max-h-12',
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1140px',
    },
  },
  plugins: [],
}

