// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: [
    '@/assets/scss/main.scss'
  ],
  runtimeConfig: {
    public: {
      siteDomain: process.env.SITE_DOMAIN || 'example.com',
      siteName: process.env.SITE_NAME || 'Site Name',
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
