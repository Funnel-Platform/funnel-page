<template>
  <div class="bg-neutral-100 min-h-screen">
    <LogoHeader />
    <main class="py-6 lg:py-14 px-6">
      <div
        class="container max-w-xl bg-white py-6 shadow-[0_0_15px_rgb(0,0,0,0.12)]"
      >
        <FormCapture />
      </div>
    </main>
  </div>
</template>

<script setup>
const { faviconSrc } = useLogo();
const siteConfig = useSiteConfig();
const siteName = siteConfig.siteName;

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

<style scoped lang="scss">
:deep(#form-capture) {
  background: none !important;
  @apply max-w-xl p-0 h-auto;

  .m-phone-number-input,
  .m-input.m-phone-input,
  .m-phone-number-input .m-input-wrapper {
    width: 100% !important;
  }
  .m-btn {
    @apply mt-4;
  }
}
</style>
