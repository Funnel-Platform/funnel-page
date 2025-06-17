<template>
  <footer
    :class="{
      'bg-[#00041f] py-10 text-xs uppercase text-center tracking-wide': v2,
    }"
  >
    <div class="container py-6">
      <div
        v-if="showLanguageSelector"
        class="lg:hidden items-center w-48 mx-auto pb-5"
      >
        <AtomsLanguageSelector />
      </div>
      <ul
        class="items-center text-center sm:text-left sm:flex text-xs justify-center flex"
      >
        <li v-for="link in links" :key="link.url">
          <NuxtLink
            :to="link.url"
            class="p-1 inline-block"
            :class="{
              'text-white text-opacity-40 hover:underline': v2,
              'text-blue-900': !v2,
            }"
          >
            {{ link.text }}
          </NuxtLink>
        </li>
      </ul>
      <p v-if="showCopyright" class="text-white text-opacity-40 pt-2">
        &copy; {{ new Date().getFullYear() }} {{ siteConfig.siteName }}
      </p>
    </div>
  </footer>
</template>

<script setup>
import { computed } from "vue";

const { t, locale } = useI18n();
const siteConfig = useSiteConfig();

const props = defineProps({
  showLanguageSelector: {
    type: Boolean,
    default: true,
  },
  showCopyright: {
    type: Boolean,
    default: false,
  },
  v2: {
    type: Boolean,
    default: false,
  },
});

const links = computed(() => [
  {
    url: "/",
    text: t("components.footer-links.home"),
  },
  {
    url: `/${locale.value}/privacy`,
    text: t("components.footer-links.privacy-policy"),
  },
  {
    url: `/${locale.value}/cookie`,
    text: t("components.footer-links.cookie-policy"),
  },
  // {
  //   url: `/${this.$i18n.locale}/gdpr`,
  //   text: this.$t('components.footer-links.gdpr'),
  // },
]);
</script>
