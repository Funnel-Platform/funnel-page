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

