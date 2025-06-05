const fs = require('fs')

/**
 * Import available languages from external file
 */
import { languages } from './data/languages';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-09-19",
  devtools: { enabled: true },
  ssr: true,

  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: true,
      autoSubfolderIndex: false,
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

  modules: [
    "@nuxtjs/i18n",
    '@vesp/nuxt-fontawesome',
  ],


  i18n: {
    locales: languages,
    defaultLocale: 'en',
    strategy: 'prefix',
    compilation: {
      strictMessage: false,
    },
    // vueI18n: {
    //   fallbackLocale: 'en',
    //   messages: getLanguageFiles(),
    // },
    detectBrowserLanguage: {
      useCookie: false,
    },
  },
});