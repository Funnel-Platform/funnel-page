<template>
  <form
    id="form-capture"
    class="bg-cover p-4"
    style="background-image: url(/img/form-body.jpg)"
    @submit.prevent="formSubmit"
  >
    <div v-if="step === 1" class="space-y-4">
      <!-- Generic errors -->
      <div v-if="errors.generic" class="text-red-600 text-sm flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
        </svg>
        <div>{{ errors.generic }}</div>
      </div>

      <!-- First name-->
      <fieldset>
        <MazInput
          type="text"
          v-model="form.first_name"
          id="first_name"
          name="first_name"
          autocomplete="given-name"
          block
          required
          :label="$t(`${localeJsonPath}.first_name`)"
          :hint="errors?.first_name ? errors.first_name[0] : null"
          :error="errors?.first_name ? true : false"
          @keydown="delete errors.first_name"
          @blur="partialCapture()"
        />
      </fieldset>

      <!-- Last name-->
      <fieldset>
        <MazInput
          type="text"
          v-model="form.last_name"
          id="last_name"
          name="last_name"
          autocomplete="family-name"
          block
          required
          :label="$t(`${localeJsonPath}.last_name`)"
          :hint="errors?.last_name ? errors.last_name[0] : null"
          :error="errors?.last_name ? true : false"
          @keydown="delete errors.last_name"
          @blur="partialCapture()"
        />
      </fieldset>

      <!-- Email-->
      <fieldset>
        <MazInput
          type="email"
          v-model="form.email"
          id="email"
          name="email"
          autocomplete="email"
          block
          required
          :label="$t(`${localeJsonPath}.email`)"
          :hint="errors?.email ? errors.email[0] : null"
          :error="errors?.email ? true : false"
          @keydown="delete errors.email"
          @blur="partialCapture()"
        />
      </fieldset>
    </div>
    <!-- End step 1-->

    <!-- Step 2 -->
    <div v-else-if="step === 2">
      <MazPhoneNumberInput
        v-model="form.phone_number"
        v-model:country-code="form.country_code"
        show-code-on-list
        :preferred-countries="[
          'AT',
          'DK',
          'IT',
          'DE',
          'NO',
          'ES',
          'CZ',
          'FR',
          'SE',
          'CH',
          'GB',
          'TH',
          'MY',
          'PT',
          'PL',
        ]"
        @update="handleCountryCodeSelect(form.country_code)"
      />
    </div>
    <!-- End step 2-->

    <MazBtn
      id="form-capture-submit"
      type="submit"
      :class="{ loading: loading }"
      :disabled="loading"
      block
      @click="step === 1 ? partialCapture(true) : null"
    >
      {{
        step === 1
          ? $t(`${localeJsonPath}.button.step-1`)
          : $t(`${localeJsonPath}.button.step-2`)
      }}
    </MazBtn>

    <Pixels placement="pageview" />
  </form>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import dialCodes from "@/data/countryDialCodes.json";

const config = useRuntimeConfig();
const localeJsonPath = "components.form-capture";
const { locale } = useI18n();
const loading = ref(false);
const step = ref(1);
const errors = ref({});
const form = ref({
  first_name: "",
  last_name: "",
  email: "",
  phone_number: "",
  phone_dial_code: "",
  country_code: "",
  domain:
    config.public.siteDomain === "bitindexai.tv"
      ? "bitindexai.com"
      : config.public.siteDomain,
  language_code: locale.value,
});
const partialCaptureProcessing = ref(false);
const route = useRoute();

const apiRegisterUrl = computed(() => config.public.apiRegisterUrl);
const apiPartialLeadUrl = computed(() => config.public.apiPartialLeadUrl);
const hasErrors = computed(() => Object.keys(errors.value).length);

const appendQueryParamsToForm = () => {
  // If `?is_test` exists in URL, use test domain for test fulfilment
  if ("is_test" in route.query) {
    form.value.domain = "test";
  }

  // Append allowable query param's to payload
  const allowed = [
    "aff_id",
    "click_id",
    "s1",
    "s2",
    "s3",
    "t1",
    "t2",
    "t3",
    "campaign_id",
    "campaign_name",
    "net",
  ];
  const queryParams = Object.keys(route.query)
    .filter((key) => allowed.includes(key))
    .reduce((obj, key) => {
      obj[key] = route.query[key];
      return obj;
    }, {});

  form.value = {
    ...form.value,
    ...queryParams,
  };
};

/**
 * Captures partial form data with rate limiting
 * @param {boolean} bypassRateLimiting - Whether to bypass rate limiting
 */
const partialCapture = async (bypassRateLimiting = false) => {
  // Check rate limiting
  if (partialCaptureProcessing.value && !bypassRateLimiting) {
    if (process.dev || "is_test" in route.query) {
      console.warn(
        "partialCapture() is processing, API not called",
        form.value
      );
    }
    return;
  }

  // Append query params to form
  appendQueryParamsToForm();

  // Set processing flag
  partialCaptureProcessing.value = true;

  try {
    const response = await fetch(apiPartialLeadUrl.value, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form.value),
    });
  } catch (error) {}

  // Dev logging
  if (process.dev || "is_test" in route.query) {
    console.log("partialCapture() OK, API called", form.value);
  }

  // Rate limiting cooldown
  setTimeout(() => {
    partialCaptureProcessing.value = false;
  }, 500);
};

/**
 * Handle country code selection
 */
const handleCountryCodeSelect = (countryCode) => {
  // Find the dial code associated with the selected country code
  const countryObj = dialCodes.find((item) => countryCode in item);
  if (countryObj) {
    form.value.phone_dial_code = countryObj[countryCode];
  }
  partialCapture();
};

/**
 * Email validation
 */
const validateEmail = (email) => {
  return email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

/**
 * Form validation
 */
const validateForm = () => {
  errors.value = {};

  if (step.value === 1) {
    if (form.value.first_name.length < 2) {
      errors.value.first_name = ["Please enter a first name"];
    }
    if (form.value.last_name.length < 2) {
      errors.value.last_name = ["Please enter a last name"];
    }
    if (form.value.email.length < 2 || !validateEmail(form.value.email)) {
      errors.value.email = ["Please enter a valid email"];
    }
  } else if (step.value === 2) {
    if (form.value.phone_number.length < 2) {
      errors.value.phone_number = ["Please enter a phone number"];
    }
  }

  return Object.keys(errors.value).length === 0;
};

/**
 * Redirect user to the next page
 */
const nextPage = (data) => {
  const params = new URLSearchParams(route.query);

  // Default redirect path
  const basePath = `/${locale.value}/welcome/`;

  // Add params from API response
  if (data.autologin_url) params.set("url", data.autologin_url);
  if (data.autologin_action) params.set("action", data.autologin_action);
  if (data.status) params.set("status", data.status);
  if (data.lead_id) params.set("lead_id", data.lead_id);
  if (form.value.email) params.set("email", form.value.email);

  // Construct final URL
  const redirect = `${basePath}?${params.toString()}`;

  // Navigate
  navigateTo(redirect);
};

/**
 * Submitting the form
 */
const formSubmit = async () => {
  validateForm();

  if (hasErrors.value) return false;

  if (step.value === 1) {
    step.value = 2;
  } else if (step.value === 2) {
    loading.value = true;

    // Append any query params to form before POSTing
    appendQueryParamsToForm();

    try {
      const response = await fetch(apiRegisterUrl.value, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form.value),
      });

      const data = await response.json();

      if (!response.ok) {
        throw { response: { data } };
      }

      if (data?.status === "received" || data?.status === "success") {
        await nextPage(data);
      } else {
        errors.value.generic = "An error has occurred, please try again";
        step.value = 1;
      }
    } catch (e) {
      errors.value.generic = "An error has occurred, please try again";
      step.value = 1;

      if (e.response?.data) {
        const formFields = ["first_name", "last_name", "email", "phone_number"];
        if (
          Object.keys(errors.value).filter((e) => formFields.includes(e)).length
        ) {
          errors.value = e.response.data;

          const step2Fields = ["phone_number"];
          if (
            Object.keys(errors.value).filter((e) => step2Fields.includes(e))
              .length
          ) {
            step.value = 2;
          }
        }
      }
    } finally {
      loading.value = false;
    }
  }
};
</script>
