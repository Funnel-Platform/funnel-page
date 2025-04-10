<template>
  <div class="container text-center py-10">
    <h1>
      Site domain: {{ SITE_DOMAIN }}<br />
      Site name: {{ SITE_NAME }}
    </h1>
    <h2>New Section on all sites</h2>
    <Footer />
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
const SITE_DOMAIN = config.public.siteDomain;
const SITE_NAME = config.public.siteName;

useSeoMeta({
  title: "hi {SITE_DOMAIN} // {SITE_NAME}",
});
</script>
