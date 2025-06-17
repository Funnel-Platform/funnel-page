<template>
  <MazSelect
    v-model="selectedLanguage"
    :options="languages"
    optionLabelKey="text"
    optionValueKey="code"
    optionInputValueKey="text"
    class="w-full md:w-56"
    @input="handleLanguageChange()"
  />
</template>

<script setup>
const { locale, locales } = useI18n()
import { ref } from 'vue'
import languages from './public/data/languages.json';

const showLanguageSelector = ref(true);
const selectedLanguage = ref(locale.value);

const handleLanguageChange = () => {
  const lang = selectedLanguage.value;

  let newPath = `/${lang}/`; // New language prefix
  newPath += window.location.pathname.substr(3); // Remove the first 3 characters (the current language prefix)
  newPath += window.location.search; // Append the current search parameters
  newPath = newPath.replace(/\/\//g, '/'); // If newPath contains // replace it with /

  window.location.href = newPath;
};
</script>