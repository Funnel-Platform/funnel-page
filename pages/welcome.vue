<template>
  <div class="bg-gray-100 h-screen">
    <transition name="fade">
      <div v-show="displayPage">
        <!-- The received/after hours welcome page-->
        <WelcomePages-Received v-if="useReceivedWelcomePage" />

        <!-- The two-step welcome page-->
        <WelcomePages-TwoStep v-else />

        <!-- The default welcome page-->
        <WelcomePages-Default v-if="false" />
      </div>
    </transition>

    <!-- Fire pixels for all pages -->
    <!-- <Pixels placement="welcome" /> -->
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";

const route = useRoute();
const displayPage = ref(false);
const useReceivedWelcomePage = ref(false);
const siteConfig = useSiteConfig();
const { faviconSrc } = useLogo();

useHead({
  title: siteConfig.siteName,
  link: [
    {
      hid: "favicon",
      rel: "icon",
      type: "image/x-icon",
      href: faviconSrc,
    },
  ],
});

const atLoadEvents = () => {
  shouldUseReceivedWelcomePage();
};

const shouldUseReceivedWelcomePage = () => {
  useReceivedWelcomePage.value = route.query.status === "received";
};

watch(
  () => route.query,
  () => {
    atLoadEvents();
  }
);

onMounted(() => {
  atLoadEvents();
  setTimeout(() => {
    displayPage.value = true;
  }, 50);
});
</script>
