<template>
  <div style="background:#00062b;">
    <header class="container p-4">
      <div class="flex justify-between flex-row items-center">
        <a href="/">
          <img
            class="select-none max-w-full sm:max-w-xs lg:max-w-none"
            :class="logoWidth()"
            :src="logoSrc()"
            :alt="siteName"
          >
        </a>
        <div class="flex pl-2">
          <ClientOnly>
            <div
              v-if="showUsersCountry && geo"
              class="flex items-center lg:pr-6"
            >
              <div class="flex items-center text-xs sm:text-sm">
                <p
                  v-if="geo.country"
                  class="p-0 pr-4 text-blue-100 font-medium text-right whitespace-nowrap"
                  v-html="$t(`${localeJsonPath}.available-to-traders`, {
                    usersCountry: geo.countryName,
                  })"
                />
                <img
                  v-if="geo.flags.includes(geo.country.toLowerCase())"
                  class="w-10"
                  :src="`/img/flags/${geo.country.toLowerCase()}.svg`"
                  :alt="`${geo.country} flag`"
                >
              </div>
            </div>
          </ClientOnly>
          <div
            v-if="showLanguageSelector"
            class="hidden lg:flex items-center"
          >
            <div class="card flex justify-center">
              <AtomsLanguageSelector />
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const siteName = useSiteName()
const { logoSrc, logoWidth } = useLogo()

const showLanguageSelector = ref(true)
const showUsersCountry = ref(true)

let geo = ref(null)
let flag = ref(null)
if (process.client) {
  geo = await useGeo()
}

const localeJsonPath = 'components.logo-header'
</script>
