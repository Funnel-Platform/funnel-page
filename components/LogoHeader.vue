<template>
  <div style="background:#00062b;">
    <header class="container p-4">
      <div class="flex justify-between flex-row items-center">
        <a href="/">
          <img
            class="select-none max-w-full sm:max-w-xs lg:max-w-none"
            :class="logoWidth"
            :src="logoSrc"
            :alt="$siteName"
          >
        </a>
        <div class="flex pl-2">
          <div
            v-if="showUsersCountry && Object.keys(usersCountry).length"
            class="flex items-center lg:pr-6"
          >
            <div class="flex items-center text-xs sm:text-sm">
              <p
                v-if="usersCountry.countryName"
                class="p-0 pr-4 text-blue-100 font-medium text-right whitespace-nowrap"
                v-html="$t(`${localeJsonPath}.available-to-traders`, {
                  usersCountry: usersCountry.countryName,
                })"
              />
              <img
                v-if="flag"
                class="w-10"
                :src="flag"
                :alt="`${flag} flag`"
              >
            </div>
          </div>
          <div
            v-if="showLanguageSelector"
            class="hidden lg:flex items-center"
          >

          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const geo = ref(null)

onMounted(async () => {
  const res = await fetch('/api/geo')
  geo.value = await res.json()
})
</script>
