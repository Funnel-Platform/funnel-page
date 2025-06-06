<template>
  <!-- @TODO update to Maz-UI -->
  <Select
    v-model="selectedLanguage"
    :options="languages"
    optionLabel="text"
    optionValue="code"
    class="w-full md:w-56"
    @change="(e) => handleLanguageChange(e.value)"
  />
</template>

<script setup>
const { locale, locales } = useI18n()
import { ref } from 'vue'
import languages from './public/data/languages.json';

const showLanguageSelector = ref(true);
const selectedLanguage = ref(locale.value);

const handleLanguageChange = (lang) => {
  selectedLanguage.value = lang;

  let newPath = `/${lang}/`; // New language prefix
  newPath += window.location.pathname.substr(3); // Remove the first 3 characters (the current language prefix)
  newPath += window.location.search; // Append the current search parameters

  window.location.href = newPath;
};
</script>