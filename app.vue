<template>
  <div class="container text-center py-10">
    <h1>
<<<<<<< HEAD
      Specific change on site3 - Site domain: {{ SITE_DOMAIN }}<br />
=======
      Anada change that might break things - Site domain: {{ SITE_DOMAIN
      }}<br />
>>>>>>> origin/main
      Site name: {{ SITE_NAME }}
    </h1>
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
