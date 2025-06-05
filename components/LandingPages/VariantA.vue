<template>
  <div>
    <AtomsAttentionBanner
      v-if="useAttentionBanner"
      class="text-sm"
    />

    <header class="bg-black p-5 flex justify-between items-center">
      <img
        class="select-none max-w-full sm:max-w-xs lg:max-w-none"
        :class="logoWidth()"
        :src="logoSrc()"
        :alt="siteName"
      >
      <AtomsVariantALogoRight />
    </header>

    <div class="container mx-auto py-10 text-gray-600 font-light">
      <div class="grid sm:grid-cols-2 gap-8 sm:gap-12 md:py-20 lg:p-12 ">
        <div
          id="left-col"
          class="sm:pb-8 sm:pr-8 lg:p-10"
        >
          <h5 class="font-bold text-2xl">
            {{ $t(`${localeJsonPath}.create-account`) }}
          </h5>
          <div
            v-if="alt2 && ! altLayout2"
            class="pt-2"
          >
            <p>
              {{ $t(`${localeJsonPath}.points.p-1`) }}
            </p>
            <p>
              {{ $t(`${localeJsonPath}.points.p-2`) }}
            </p>
            <p>
              {{ $t(`${localeJsonPath}.points.p-3`) }}
            </p>
          </div>
          <ul
            v-else-if="altLayout1"
            class="list-disc ml-4 pt-3 sm:pb-7"
          >
            <li class="pb-1">
              {{ $t(`${localeJsonPath}.points.p-1-alt-1`) }}
            </li>
            <li class="pb-1">
              {{ $t(`${localeJsonPath}.points.p-2-alt-1`) }}
            </li>
            <li class="pb-1">
              {{ $t(`${localeJsonPath}.points.p-3-alt-1`) }}
            </li>
          </ul>
          <ul
            v-else-if="altLayout2"
            class="list-disc ml-4 pt-3 sm:pb-7"
          >
            <li class="pb-1">
              {{ $t(`${localeJsonPath}.points.p-1-alt-2`) }}
            </li>
            <li class="pb-1">
              {{ $t(`${localeJsonPath}.points.p-2-alt-2`) }}
            </li>
            <li class="pb-1">
              {{ $t(`${localeJsonPath}.points.p-3-alt-2`) }}
            </li>
          </ul>
          <ul
            v-else
            class="list-disc ml-4 pt-3 sm:pb-7"
          >
            <li class="pb-1">
              {{ $t(`${localeJsonPath}.points.p-1`) }}
            </li>
            <li class="pb-1">
              {{ $t(`${localeJsonPath}.points.p-2`) }}
            </li>
            <li class="pb-1">
              {{ $t(`${localeJsonPath}.points.p-3`) }}
            </li>
          </ul>
          <div
            v-if="altLayout1 || altLayout2"
            class="pb-2"
          >
            <p class="text-xs text-gray-400 border-b pb-1">
              {{ $t(`${localeJsonPath}.steps`, { step }) }}
            </p>
            <div class="pt-8">
              <FormCapture @step="step=$event" />
            </div>
          </div>
          <div class="text-center hidden sm:block">
            <img
              class="w-28 inline-block mr-14"
              src="/img/landing-pages/variant-a/forbes-verified.png"
              alt="Verified by Forbes"
            >
          </div>
        </div>
        <div class="lg:p-10">
          <div v-if="altLayout1">
            <div class="text-gray-600 font-light">
              <h5 class="font-bold text-2xl text-center">
                {{ $t(`${localeJsonPath}.right_column.title-alt-1`) }}
              </h5>
              <div class="container mx-auto py-10 text-gray-600 text-center font-light">
                {{ $t(`${localeJsonPath}.right_column.sub-title-alt-1`) }}
              </div>
              <div class="flex items-center justify-center">
                <img src="/img/landing-pages/variant-a/carneybust.png">
              </div>
              <br>
              <div class="text-gray-600 text-center p-2 text-sm">
                {{ $t(`${localeJsonPath}.right_column.content-alt-1`, {
                  siteName,
                }) }}
                <br>
              </div>
            </div>
          </div>
          <div v-else-if="altLayout2">
            <div class="text-gray-600 font-light">
              <h5 class="font-bold text-2xl text-center">
                {{ $t(`${localeJsonPath}.right_column.title-alt-2`) }}
              </h5>
              <div class="container mx-auto py-10 text-gray-600 text-center font-light">
                {{ $t(`${localeJsonPath}.right_column.sub-title-alt-2`, {
                  siteName,
                }) }}
              </div>
              <div class="flex items-center justify-center">
                <img src="/img/landing-pages/variant-a/musk-profile2.png">
              </div>
              <br>
              <div class="text-gray-600 text-center p-2 text-sm">
                {{ $t(`${localeJsonPath}.right_column.content-alt-2`, {
                  siteName,
                }) }}
                <br>
              </div>
            </div>
          </div>
          <div v-else>
            <p class="text-xs text-gray-400 border-b pb-1">
              {{ $t(`${localeJsonPath}.steps`, { step }) }}
            </p>
            <div class="pt-8">
              <FormCapture @step="step=$event" />
            </div>
            <div class="flex items-center pt-4 sm:pt-10 justify-center">
              <img
                src="/img/landing-pages/variant-a/norton.png"
                alt="Norton"
              >
              <img
                class="ml-4 w-12"
                src="/img/landing-pages/variant-a/forbes-verified.png"
                alt="Verified by Forbes"
              >
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
const route = useRoute()
const { locale, locales } = useI18n()

const siteConfig = useSiteConfig()
const siteName = siteConfig.siteName
const { logoSrc, logoWidth } = useLogo()

const useAttentionBanner = ref(true)
const step = ref(1)

// Alt 2
const alt2 = computed(() => {
  return 'de' === locale && parseInt(route.query?.alt) === 2
})

// Alt Layout 1
const altLayout1 = computed(() => {
  return route.query.alt === '1' ? true : false
})

// Alt Layout 2
const altLayout2 = computed(() => {
  return route.query.alt === '2' ? true : false
})

const localeJsonPath = computed(() => {
  if (alt2 && !altLayout2) {
    return 'landing-pages.variant-a.alt-2'
  }
  return 'landing-pages.variant-a'
})
</script>

<style scoped lang="scss">
* {
  font-family: "Merriweather", serif;
  @apply leading-7;
}

#left-col {
  box-shadow: none;
  @screen sm {
    box-shadow: rgba(black, 0.5) 23px 0px 25px -35px;
  }
}
:deep(#form-capture) {
  background: none !important;
  @apply p-0;
  label {
    @apply text-gray-600;
  }
  input,
  .vue-tel-input {
    @apply shadow-sm border-gray-300;
  }
  button {
    @apply normal-case text-lg font-medium bg-blue-600 hover:bg-blue-700 mt-4;
  }
}

:deep(footer) {
  a {
    @apply text-gray-500 hover:text-gray-600;
  }
}
</style>