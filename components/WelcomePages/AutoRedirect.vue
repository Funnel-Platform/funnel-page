<template>
  <div class="container mx-auto p-10">
    <h2 class="text-center text-2xl text-slate-700">
      {{ $t(`${localeJsonPath}.title`) }}
    </h2>
    <!-- Loading spinner -->
    <div class="flex justify-center items-center pt-20">
      <div
        class="w-10 h-10 border-b-2 border-slate-500 rounded-full animate-spin"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useRoute, useHead } from "#app";

const route = useRoute();
const siteConfig = useSiteConfig();
const localeJsonPath = "pages.welcome_auto_redirect";
const redirectDelaySeconds = 5;

const autoLoginUrl = computed(() => route.query.url || "");

useHead({
  title: siteConfig.siteName,
});

onMounted(() => {
  setTimeout(() => {
    window.location.href = autoLoginUrl.value;
  }, redirectDelaySeconds * 1000);
});
</script>
