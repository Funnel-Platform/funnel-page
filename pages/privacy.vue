<template>
  <div>
    <LogoHeader />
    <div class="py-8 bg-neutral-100">
      <div class="container bg-white py-6 shadow-[0_0_15px_rgb(0,0,0,0.12)]">
        <h1 class="text-3xl">
          {{ t(`${localeJsonPath}.title`) }}
        </h1>
        <div
          v-html="
            t(`${localeJsonPath}.content`, {
              siteName,
              siteDomain,
            })
          "
        />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
const { t } = useI18n();
const siteConfig = useSiteConfig();
const siteName = siteConfig.siteName;
const siteDomain = siteConfig.siteDomain;

const localeJsonPath = "pages.privacy";
const { faviconSrc } = useLogo();

useHead({
  title: siteName,
  link: [
    {
      rel: "icon",
      type: "image/x-icon",
      href: faviconSrc(),
    },
  ],
});
</script>
