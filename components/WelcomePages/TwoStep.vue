<template>
  <div
    :class="{
      'variant-a': useVariantALandingPage,
    }"
  >
    <LogoHeader v-if="!useVariantALandingPage" :showLanguageSelector="false" />
    <header v-else class="bg-black p-5 flex justify-between items-center">
      <img
        class="select-none max-w-full sm:max-w-xs lg:max-w-none"
        :class="logoWidth()"
        :src="logoSrc()"
        :alt="siteConfig.siteName"
      />
      <LandingPagesVariantALogoRight />
    </header>

    <div class="bg-gray-100 pb-14">
      <div class="container bg-white py-8 sm:py-14 shadow-xl">
        <div class="sm:px-8 lg:w-8/12 mx-auto">
          <div v-if="step === 1" class="sm:pb-64 pb-36 text-center">
            <h1
              class="text-red-700 text-3xl pb-0"
              v-html="
                $t(`${localeJsonPathTwoStep}.step-1.title`, {
                  siteName: siteName,
                })
              "
            />
            <hr class="my-4" />

            <div>
              <p
                class="py-6 font-bold"
                v-html="$t(`${localeJsonPathTwoStep}.step-1.p-1`)"
              />
            </div>

            <button
              class="btn t-button shadow-lg transition max-w-sm btn-green"
              @click="step1ButtonClick()"
            >
              {{ $t(`${localeJsonPathTwoStep}.step-1.button`) }}
            </button>
          </div>

          <div v-else-if="step === 2" class="text-left">
            <h1
              class="text-red-700 text-3xl pb-0"
              v-html="
                $t(`${localeJsonPathTwoStep}.step-2.title`, {
                  siteName: siteName,
                })
              "
            />

            <h4 v-if="aboveFoldCTA" class="text-center pt-6">
              <button
                class="btn t-button shadow-lg transition max-w-sm"
                @click="goToUrl(autoLoginUrl)"
              >
                {{ $t(`${localeJsonPath}.go-to-account`) }}
              </button>
            </h4>

            <hr class="my-4" />
            <h2 class="text-red-700 text-2xl font-bold pt-4 pb-8">
              {{ $t(`${localeJsonPathTwoStep}.step-2.sub-title`) }}
            </h2>
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

            <h4 v-if="!aboveFoldCTA" class="text-center pt-10">
              <button
                class="btn t-button shadow-lg transition max-w-sm"
                @click="goToUrl(autoLoginUrl)"
              >
                {{ $t(`${localeJsonPath}.go-to-account`) }}
              </button>
            </h4>

            <h2 class="font-medium text-2xl pt-10">
              {{ $t(`${localeJsonPath}.self-activation.heading`) }}
            </h2>
            <p v-html="$t(`${localeJsonPath}.self-activation.p-1`)" />
            <p v-html="$t(`${localeJsonPath}.self-activation.p-2`)" />
            <p v-html="$t(`${localeJsonPath}.self-activation.p-3`)" />
            <p
              v-if="$te(`${localeJsonPath}.self-activation.p-4`)"
              class="pb-0"
              v-html="$t(`${localeJsonPath}.self-activation.p-4`)"
            />

            <h4 class="text-center pt-10">
              <button
                class="btn t-button shadow-lg transition max-w-sm"
                @click="goToUrl(autoLoginUrl)"
              >
                {{ $t(`${localeJsonPath}.go-to-account`) }}
              </button>
            </h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
const { logoSrc, logoWidth } = useLogo();

const route = useRoute();
const config = useRuntimeConfig();
const siteConfig = useSiteConfig();
const i18n = useI18n();

const siteName = siteConfig.siteName;

const localeJsonPath = "pages.welcome";
const localeJsonPathTwoStep = "pages.welcome_two_step";
const useVariantALandingPage = ref(false);
const aboveFoldCTA = ref(false);

const autoLoginUrl = computed(() => route.query.url || "");
const step = computed(() => parseInt(route.query.step) || 1);
const apiCompleteLeadUrl = computed(() => config.public.apiCompleteLeadUrl);

watch(
  () => route,
  () => {
    shouldUseVariantALandingPage();
  }
);

onMounted(() => {
  shouldUseVariantALandingPage();

  // Campaign ID 69 uses 'above fold' CTA.
  if (route.query?.campaign_id && parseInt(route.query.campaign_id) === 69) {
    aboveFoldCTA.value = true;
  }
});

const shouldUseVariantALandingPage = () => {
  useVariantALandingPage.value = route.query.variant === "a";
  // TODO once we have the domain to use
  // useVariantALandingPage.value = siteDomain === 'THE_NEW_DOMAIN'
};

const goToUrl = (url) => {
  window.location = url;
};

const step1ButtonClick = () => {
  popUnder();
};

const popUnder = () => {
  // Fetch API to record a 'Complete' lead
  // Do redirects regardless of API success/fail
  fetch(apiCompleteLeadUrl.value, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).finally(() => {
    const params = route.query;

    let redirect = `/${i18n.locale.value}/questions/`;

    // If bypass exists, bypass questions, straight to welcome step 2
    if ("bypass" in params) {
      redirect = `/${i18n.locale.value}/welcome/`;
      params.step = 2;
    }

    // Append all query params to the redirect URL
    redirect =
      redirect +
      "?" +
      Object.keys(params)
        .map((key) => key + "=" + params[key])
        .join("&");

    window.location.href = redirect;
  });
};
</script>

<style scoped lang="scss">
.variant-a {
  * {
    font-family: "Merriweather", serif;
    @apply leading-7;
  }
}
</style>
