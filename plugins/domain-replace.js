/**
 * @local This plugin is used to replace __DOMAIN__ placeholders in the title and content
 * for local development purposes only. You can adjust your .env file to set different values.
 *
 * @production the `Lambda@Edge.js` function is used within AWS CloudFront to replace these placeholders.
 */
export default defineNuxtPlugin((nuxtApp) => {
  // Get variables from local .env file.
  const config = useRuntimeConfig();
  const siteDomain = config.public.siteDomain;
  const siteName = config.public.siteName;

  if (import.meta.dev) {
    // Perform replacements for page <title> tags.
    const setDynamicTitle = () => {
      if (typeof window !== 'undefined') {
        let title = document.title
        title = title.replace(/{SITE_DOMAIN}/g, siteDomain);
        title = title.replace(/{SITE_NAME}/g, siteName);
        useHead({
          title,
        });
      }
    };

    setTimeout(() => {
      setDynamicTitle();
    }, 250);

    // `msr` stands for "Multi Site Replacements"
    // Perform replacements for page content, utilizing global $msr() function.
    nuxtApp.provide('msr', (content) => {
      return content
        .replace(/{SITE_DOMAIN}/g, siteDomain)
        .replace(/{SITE_NAME}/g, siteName);
    });
  }
});