<template>
  <NuxtPage />
</template>

<script setup>
await useGeo()
const siteConfig = useSiteConfig()

useSeoMeta({
  title: `${siteConfig.siteName}`,
});
</script>
