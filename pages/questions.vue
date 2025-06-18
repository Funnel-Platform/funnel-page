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
        :alt="config.public.siteName"
      />
      <LandingPagesVariantALogoRight />
    </header>

    <div class="bg-gray-100 pb-14">
      <div class="container bg-white py-8 sm:py-14 shadow-xl">
        <div class="sm:px-8 lg:w-8/12 mx-auto">
          <div class="sm:pb-64 pb-36">
            <h1
              class="text-red-700 text-3xl pb-0 text-center"
              v-html="$t(`${localeJsonPath}.title`)"
            />
            <hr class="my-4" />
            <div v-if="question === 1" class="pb-2">
              <p class="pt-6 text-center text-lg font-bold">
                <span
                  class="text-black bg-yellow-300 p-1"
                  v-html="$t(`${localeJsonPath}.intro.p-1`)"
                />
              </p>
              <p
                class="text-center"
                v-html="$t(`${localeJsonPath}.intro.p-2`)"
              />
            </div>
            <div v-else class="pt-4" />

            <!-- Progress bar -->
            <div class="w-full bg-gray-200 h-1 rounded">
              <div
                class="bg-blue-500 h-1 transition-all duration-500 rounded-l"
                :style="{ width: `${progress}%` }"
              />
            </div>
            <form @submit.prevent="formSubmit">
              <fieldset v-if="question === 1" class="pt-8">
                <label for="gender" class="font-bold text-lg">
                  {{ $t(`${localeJsonPath}.form.question-1.label`) }}
                </label>

                <!-- Gender -->
                <MazRadioButtons
                  id="gender"
                  name="gender"
                  class="pt-2 max-w-sm"
                  v-model="form.gender"
                  :options="genders"
                  orientation="col | row"
                  :disabled="loading"
                  @update:model-value="questionAnswered(1)"
                />
              </fieldset>

              <fieldset v-else-if="question === 2" class="pt-6">
                <label for="age" class="font-bold text-lg">
                  {{ $t(`${localeJsonPath}.form.question-2.label`) }}
                </label>

                <!-- Age -->
                <MazRadioButtons
                  id="age"
                  name="age"
                  class="pt-2 max-w-sm"
                  v-model="form.age"
                  :options="ages"
                  orientation="row"
                  :disabled="loading"
                  @update:model-value="questionAnswered(2)"
                />
              </fieldset>

              <fieldset v-else-if="question === 3" class="pt-6">
                <label for="age" class="font-bold text-lg">
                  {{ $t(`${localeJsonPath}.form.question-3.label`) }}
                </label>
                <p v-html="$t(`${localeJsonPath}.form.question-3.p-1`)" />
                <p v-html="$t(`${localeJsonPath}.form.question-3.p-2`)" />
                <p
                  class="font-bold"
                  v-html="$t(`${localeJsonPath}.form.question-3.p-3`)"
                />

                <!-- Investment -->
                <MazRadioButtons
                  id="investment"
                  name="investment"
                  class="pt-2 max-w-sm"
                  v-model="form.investment"
                  :options="investment"
                  orientation="col | row"
                  :disabled="loading"
                  @update:model-value="questionAnswered(3)"
                />
              </fieldset>

              <!-- Loading spinner -->
              <div
                v-if="loading"
                class="mt-6 absolute w-6 h-6 border-b-2 border-slate-500 rounded-full animate-spin"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";

const route = useRoute();
const config = useRuntimeConfig();
const { logoSrc, logoWidth } = useLogo();

const usersCountry = ref({});

let geo = ref(null);
if (process.client) {
  geo = await useGeo();
}

const localeJsonPath = ref("pages.questions");
const useVariantALandingPage = ref(false);
const question = ref(1);
const loading = ref(false);
const errors = ref({});
const form = ref({
  gender: "",
  age: "",
  investment: "",
});

const { t, locale } = useI18n();

const genders = [
  {
    value: "gender:male",
    label: t("pages.questions.form.question-1.genders.male"),
  },
  {
    value: "gender:female",
    label: t("pages.questions.form.question-1.genders.female"),
  },
  {
    value: "gender:prefer not to say",
    label: t("pages.questions.form.question-1.genders.prefer-not-to-say"),
  },
];

const ages = [
  { value: "age:18-20", label: "18-20" },
  { value: "age:21-30", label: "21-30" },
  { value: "age:31-35", label: "31-35" },
  { value: "age:36-40", label: "36-40" },
  { value: "age:41-45", label: "41-45" },
  { value: "age:46-50", label: "46-50" },
  { value: "age:51-60", label: "51-60" },
  { value: "age:60+", label: "60+" },
];

const investment = ref([
  { value: "investment:250-500 EUR", label: "250 - 500 EUR" },
  { value: "investment:500-1,000 EUR", label: "500 - 1,000 EUR" },
  { value: "investment:1,000+ EUR", label: "1,000+ EUR" },
]);

const progress = computed(() => {
  return (question.value / 4) * 100;
});

const apiUpdateUrl = computed(() => {
  return config.public.apiUpdateLeadUrl;
});

watch(usersCountry, () => {
  localizeInvestmentValues();
});

onMounted(() => {
  shouldUseVariantALandingPage();
  if (geo.value) {
    usersCountry.value = geo.value.country;
  }
});

const shouldUseVariantALandingPage = () => {
  useVariantALandingPage.value = route.query.variant === "a";
};

const localizeInvestmentValues = () => {
  if (["AU"].includes(usersCountry.value.country)) {
    investment.value = [
      { value: "investment:450-1000 AUD", label: "$450 - $1000 AUD" },
      { value: "investment:1000-2000 AUD", label: "$1000 - $2000 AUD" },
      { value: "investment:2000+ AUD", label: "$2000+ AUD" },
    ];
  }
};

const questionAnswered = async (questionNum) => {
  await formSubmit();
  question.value = questionNum + 1;
  if (questionNum === 3) {
    nextPage();
  }
};

const validateForm = () => {
  errors.value = {};
};

const formSubmit = async () => {
  validateForm();

  if (Object.keys(errors.value).length > 0) {
    return false;
  }

  loading.value = true;

  const payload = {
    lead_id: route.query.lead_id,
    t1: form.value.gender,
    t2: form.value.age,
    t3: form.value.investment,
    domain: config.public.siteDomain,
    ...(route.query.campaign_id && { campaign_id: route.query.campaign_id }),
    ...(route.query.aff_id && { aff_id: route.query.aff_id }),
    ...(route.query.net && { net: route.query.net }),
  };

  if (!payload.lead_id) {
    loading.value = false;
    return;
  }

  try {
    await fetch(apiUpdateUrl.value, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
};

const nextPage = () => {
  const params = { ...route.query, step: 2 };
  const redirect = `/${locale.value}/welcome/?${new URLSearchParams(params)}`;
  window.location.href = redirect;
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
