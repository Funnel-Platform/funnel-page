<template>
  <NuxtPage />
</template>

<script setup>
await useGeo()
const siteName = useSiteName()

useSeoMeta({
  title: `${siteName}`,
});
</script>
