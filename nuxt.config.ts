// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-09-19",
  devtools: { enabled: true },
  ssr: true,
  nitro: {
    prerender: {
      autoSubfolderIndex: false
    }
  },
  css: ["@/assets/scss/main.scss"],
  runtimeConfig: {
    public: {
      siteName: process.env.NUXT_ENV_SITE_NAME || "Site Name",
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
