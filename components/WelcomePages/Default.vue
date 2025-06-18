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
          <p>
            {{ $t(`${localeJsonPath}.intro.p-1`) }}
            <span class="text-black bg-yellow-300 p-1">{{
              $t(`${localeJsonPath}.intro.highlight`)
            }}</span>
            {{ $t(`${localeJsonPath}.intro.p-2`) }}
            {{ $t(`${localeJsonPath}.intro.p-3`) }}
          </p>

          <h2 class="font-medium text-2xl pt-10">
            {{ $t(`${localeJsonPath}.phone-call.heading`) }}
          </h2>
          <p v-html="$t(`${localeJsonPath}.phone-call.p-1`)" />
          <p class="pb-0" v-html="$t(`${localeJsonPath}.phone-call.p-2`)" />

          <h4 class="text-center pt-10">
            <t-button
              class="shadow-lg transition max-w-sm"
              @click="goToUrl(autoLoginUrl)"
            >
              {{ $t(`${localeJsonPath}.go-to-account`) }}
            </t-button>
          </h4>

          <h2 class="font-medium text-2xl pt-10">
            {{ $t(`${localeJsonPath}.self-activation.heading`) }}
          </h2>
          <p v-html="$t(`${localeJsonPath}.self-activation.p-1`)" />
          <p v-html="$t(`${localeJsonPath}.self-activation.p-2`)" />
          <p v-html="$t(`${localeJsonPath}.self-activation.p-3`)" />
          <p
            class="pb-0"
            v-html="$t(`${localeJsonPath}.self-activation.p-4`)"
          />

          <h4 class="text-center pt-10">
            <t-button
              class="shadow-lg transition max-w-sm"
              @click="goToUrl(autoLoginUrl)"
            >
              {{ $t(`${localeJsonPath}.go-to-account`) }}
            </t-button>
          </h4>

          <template v-if="shouldShowIframe">
            <h2 class="font-medium text-2xl pt-10">
              {{ $t(`${localeJsonPath}.recommended-broker.heading`) }}
            </h2>
            <p>
              {{ $t(`${localeJsonPath}.recommended-broker.p-1`) }}
              <a
                :href="autoLoginUrl"
                class="text-blue-600 font-semibold underline hover:text-black"
              >
                {{ $t(`${localeJsonPath}.go-to-account`) }}
              </a>
              {{ $t(`${localeJsonPath}.recommended-broker.p-2`) }}
            </p>
            <div class="text-center -mb-20">
              <img class="inline-block w-12" src="/img/arrow.png" />
            </div>
          </template>
        </div>
      </div>
    </div>

    <iframe
      v-if="shouldShowIframe"
      :src="autoLoginUrl"
      width="100%"
      height="600"
      sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
      @load="iframeLoaded"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useSiteConfig } from "@/composables/useSiteConfig";
import { useI18n } from "vue-i18n";

const route = useRoute();
const siteConfig = useSiteConfig();
const { t } = useI18n();

const localeJsonPath = "pages.welcome";
const iframeLoads = ref(0);
const maxIframeLoads = 5;

const shouldShowIframe = computed(
  () => action.value === "automatic" && iframeLoads.value < maxIframeLoads
);

const action = computed(() => route.query.action);
const autoLoginUrl = computed(() => route.query.url);

useHead({
  title: siteConfig.siteName,
});

watch(iframeLoads, () => {
  if (iframeLoads.value >= maxIframeLoads) {
    const newWindow = window.open(
      `/${useI18n().locale.value}/welcome/?url=${autoLoginUrl.value}`,
      "_blank"
    );
    if (
      !newWindow ||
      newWindow.closed ||
      typeof newWindow.closed == "undefined"
    ) {
      // Popup's are blocked, the window didn't open, don't do anything
    } else {
      // Popup's allowed, open broker in background (this window)
      window.location.href = autoLoginUrl.value;
    }
  }
});

const iframeLoaded = () => {
  iframeLoads.value++;
};

const goToUrl = (url) => {
  window.location = url;
};
</script>
