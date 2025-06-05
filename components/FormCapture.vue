<template>
  <form
    id="form-capture"
    class="bg-cover p-4"
    style="background-image:url(/img/form-body.jpg)"
    @submit.prevent="formSubmit"
  >
    <div v-if="step === 1" class="space-y-4">
      <!-- Generic errors -->
      <!-- @TODO styling, or use Maz-UI? -->
      <div
        v-if="errors.generic"
      >
        {{ errors.generic }}
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

    </div><!-- End step 1-->

    <!-- Step 2 -->
    <div v-else-if="step === 2">
      <MazPhoneNumberInput
        v-model="form.phone_number"
        v-model:country-code="form.phone_dial_code"
        show-code-on-list
        :preferred-countries="['AT', 'DK', 'IT', 'DE', 'NO', 'ES', 'CZ', 'FR', 'SE', 'CH', 'GB', 'TH', 'MY', 'PT', 'PL']"
      />
    </div><!-- End step 2-->

    <MazBtn
      id="form-capture-submit"
      type="submit"
      :class="{'loading': loading}"
      :disabled="loading"
      block
      @click="step === 1 ? partialCapture(true) : null"
    >
      {{ step === 1 ?
        $t(`${localeJsonPath}.button.step-1`) : $t(`${localeJsonPath}.button.step-2`) }}
    </MazBtn>

    <Pixels placement="pageview" />
  </form>
</template>

<script setup>
import { ref, computed } from 'vue'

const localeJsonPath = 'components.form-capture';
const loading = ref(false)
const step = ref(1)
const errors = ref({})
const form = ref({
  first_name: '',
  last_name: '',
  email: '',
  phone_number: '',
  phone_dial_code: '',
})

// partialCapture method
const partialCapture = () => {
  // @TODO
  console.log('Partial capture:', form.value)
}

const formSubmit = () => {
  if (step.value === 1) {
    step.value = 2;
  } else if (step.value === 2) {
    // @TODO...
  }
}
</script>