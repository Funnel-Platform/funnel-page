<template>
  <div>
    <LogoHeader />
    <div class="py-8 bg-neutral-100">
      <div class="container bg-white py-6 shadow-[0_0_15px_rgb(0,0,0,0.12)]">
        <h1 class="text-3xl">
          {{ $t(`${localeJsonPath}.title`) }}
        </h1>
        <div v-html="$t(`${localeJsonPath}.content`, { siteName: siteName })" />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref } from "vue";

const { logoSrc, logoWidth, faviconSrc } = useLogo();
const localeJsonPath = ref("pages.cookie");
const siteConfig = useSiteConfig();
const siteName = siteConfig.siteName;

// Update head metadata
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
