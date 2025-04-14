<template>
  <div class="container text-center py-10">
    <h1>Site name: {{ SITE_NAME }}</h1>
    <h2>New Section on all sites</h2>
    <Footer />
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
const SITE_NAME = config.public.siteName;

useSeoMeta({
  title: "{SITE_NAME}",
});
</script>
