<template>
  <form
    id="form-capture"
    class="bg-cover p-4"
    style="background-image:url(/img/form-body.jpg)"
    @submit.prevent="formSubmit"
  >
    <div v-if="step === 1" class="space-y-4">
      <!-- Generic errors -->
      <Message
        v-if="errors.generic"
        severity="error"
        size="small"
        variant="simple"
      >
        {{ errors.generic }}
      </Message>

      <!-- First name-->
      <fieldset>
        <FloatLabel variant="in">
          <InputText
            type="text"
            v-model="form.first_name"
            id="first_name"
            name="first_name"
            autocomplete="given-name"
            class="w-full"
            required
            @keydown="delete errors.first_name"
            @blur="partialCapture()"
          />
          <label for="first_name">
            {{ $t(`${localeJsonPath}.first_name`) }}
          </label>
        </FloatLabel>
        <Message
          v-if="errors.first_name"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ errors.first_name[0] }}
        </Message>
      </fieldset>

      <!-- Last name-->
      <fieldset>
        <FloatLabel variant="in">
          <InputText
            type="text"
            v-model="form.last_name"
            id="last_name"
            name="last_name"
            autocomplete="family-name"
            class="w-full"
            required
            @keydown="delete errors.last_name"
            @blur="partialCapture()"
          />
          <label for="last_name">
            {{ $t(`${localeJsonPath}.last_name`) }}
          </label>
        </FloatLabel>
        <Message
          v-if="errors.last_name"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ errors.last_name[0] }}
        </Message>
      </fieldset>

      <!-- Email-->
      <fieldset>
        <FloatLabel variant="in">
          <InputText
            type="email"
            v-model="form.email"
            id="email"
            name="email"
            autocomplete="email"
            class="w-full"
            required
            @keydown="delete errors.email"
            @blur="partialCapture()"
          />
          <label for="email">
            {{ $t(`${localeJsonPath}.email`) }}
          </label>
        </FloatLabel>
        <Message
          v-if="errors.email"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ errors.email[0] }}
        </Message>
      </fieldset>

    </div><!-- End step 1-->

    <Button
      type="submit"
      severity="primary"
      class="w-full"
      :class="{'loading': loading}"
      :disabled="loading"
      :label="step === 1 ?
        $t(`${localeJsonPath}.button.step-1`) : $t(`${localeJsonPath}.button.step-2`)"
      @click="step === 1 ? partialCapture(true) : null"
      />

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
})

// partialCapture method
const partialCapture = () => {
  // @TODO
  console.log('Partial capture:', form.value)
}
</script>