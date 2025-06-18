<template>
  <div>
    <LogoHeader :showLanguageSelector="false" />

    <div class="bg-gray-100 pb-14">
      <div class="container bg-white py-8 sm:py-14 shadow-xl">
        <div class="sm:px-8 lg:w-8/12 mx-auto">
          <h1 class="text-red-700 text-3xl pb-0">
            {{
              $t(`${localeJsonPath}.title`, { siteName: siteConfig.siteName })
            }}
          </h1>
          <hr class="my-4" />
          <h2 class="text-red-700 text-2xl font-bold pt-3 pb-10">
            {{ $t(`${localeJsonPath}.sub-title`) }}
          </h2>
          <h2 class="font-bold text-lg">
            {{ $t(`${localeJsonPath}.heading`) }}
          </h2>
          <p v-html="$t(`${localeJsonPath}.p-1`)" />
          <p v-html="$t(`${localeJsonPath}.p-2`)" />
          <p v-html="$t(`${localeJsonPath}.p-3`)" />
          <p v-html="$t(`${localeJsonPath}.p-4`)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const localeJsonPath = "pages.welcome_received";
const siteConfig = useSiteConfig();

useHead({
  title: siteConfig.siteName,
});
</script>
