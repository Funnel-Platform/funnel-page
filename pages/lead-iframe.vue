<template>
  <div>
    <div v-if="loading">
      <p class="text-center text-gray-500 text-sm">Loading...</p>
    </div>
    <div v-else-if="!allowed">
      <p class="text-center text-gray-500 text-sm">
        Not allowed on this domain
      </p>
    </div>
    <FormCapture v-else @step="step = $event" />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import { useRouter, useRoute } from "vue-router";

const step = ref(1);
const loading = ref(true);
const allowed = ref(false);

const allowedParents = [
  "https://decompensa.com",
  "https://lighthearted-sundae-4c7be8.netlify.app",
  "https://bebbstudios.com",
];

let resizeObserver;
let unregisterRouteHook;

const sendHeight = () => {
  const height = document.documentElement.scrollHeight;
  window.parent.postMessage({ type: "setHeight", height }, "*");
};

const initIframeCommunication = () => {
  nextTick(() => {
    sendHeight();

    // Resize observer for dynamic height adjustment
    resizeObserver = new ResizeObserver(sendHeight);
    resizeObserver.observe(document.body);

    // Hook into router changes
    const router = useRouter();
    unregisterRouteHook = router.afterEach(() => {
      nextTick(() => {
        sendHeight();
        window.parent.postMessage(
          {
            type: "navigateParent",
            url: window.location.href,
          },
          "*"
        );
      });
    });
  });
};

onMounted(() => {
  const referrer = document.referrer;
  const isValid = allowedParents.some((domain) => referrer.startsWith(domain));
  loading.value = false;

  if (!isValid) return;

  allowed.value = true;
  initIframeCommunication();
});

onBeforeUnmount(() => {
  if (resizeObserver) resizeObserver.disconnect();
  if (unregisterRouteHook) unregisterRouteHook();
});

// Watch route manually to re-trigger postMessage on navigation
const route = useRoute();
watch(
  () => route.fullPath,
  () => {
    nextTick(() => {
      sendHeight();
      window.parent.postMessage(
        {
          type: "navigateParent",
          url: window.location.href,
        },
        "*"
      );
    });
  }
);
</script>

<style scoped lang="scss">
::v-deep #form-capture {
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
</style>
