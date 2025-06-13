<template>
  <div>
    <LogoHeader />
    <div
      class="py-8 bg-cover"
      style="background-image: linear-gradient(330deg, #081047, #201193)"
    >
      <div class="container bg-white py-6">
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

const { faviconSrc } = useLogo();

const localeJsonPath = "pages.gdpr";

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
