<template>
  <NuxtPage />
</template>

<script setup>
const config = useRuntimeConfig();
const SITE_NAME = config.public.siteName;

useSeoMeta({
  title: `{SITE_NAME}`,
});
</script>
