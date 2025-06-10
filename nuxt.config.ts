import Aura from "@primeuix/themes/aura";

/**
 * Import available languages from external file
 */
import languages from "./public/data/languages.json";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-09-19",
  devtools: { enabled: true },
  ssr: true,

  nitro: {
    preset: "static",
    prerender: {
      crawlLinks: true,
      autoSubfolderIndex: false,
    },
  },

  app: {
    head: {
      title: process.env.NUXT_ENV_SITE_NAME,
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { hid: "description", name: "description", content: "" },
        { name: "format-detection", content: "telephone=no" },
      ],
      link: [
        {
          hid: "favicon",
          rel: "icon",
          type: "image/x-icon",
          href: "/favicon.ico",
        },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
          crossorigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700;900&display=swap",
        },
      ],
    },
  },

  css: ["@/assets/scss/main.scss"],

  runtimeConfig: {
    public: {
      siteName: process.env.NUXT_ENV_SITE_NAME || "Site Name",
      siteDomain: process.env.NUXT_ENV_SITE_DOMAIN || "Site Name",
      apiCompleteLeadUrl:
        process.env.NUXT_ENV_API_COMPLETE_LEAD_URL ||
        "https://register-api.net/api/complete",
      apiRegisterUrl:
        process.env.NUXT_ENV_API_REGISTER_URL ||
        "https://register-api.net/api/register",
      apiPartialLeadUrl:
        process.env.NUXT_ENV_API_PARTIAL_LEAD_URL ||
        "https://register-api.net/api/partial",
      nodeEnv: process.env.NODE_ENV || "development",
      //add this NUXT_ENV_PIXEL_HASH_C4 below
      pixelHashC4: process.env.NUXT_ENV_PIXEL_HASH_C4 || "",
      pixelHashFX: process.env.NUXT_ENV_PIXEL_HASH_FX || "",
    },
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: ["@nuxtjs/i18n", "@vesp/nuxt-fontawesome", "maz-ui/nuxt"],

  i18n: {
    locales: languages,
    defaultLocale: "en",
    strategy: "prefix",
    compilation: {
      strictMessage: false,
    },
    // vueI18n: {
    //   fallbackLocale: 'en',
    //   messages: getLanguageFiles(),
    // },
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
      fallbackLocale: "en",
    },
  },
});
