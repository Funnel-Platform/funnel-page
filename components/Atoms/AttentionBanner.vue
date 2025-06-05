<template>
  <div
    class="bg-red-600 text-white text-center p-2 !leading-snug"
    v-html="$t(`${localeJsonPath}.label`, { time })"
  />
</template>

<script setup>
const localeJsonPath = 'components.attention-banner'

const interval = ref(null)
const secondsRemaining = ref(597)
const finished = ref(false)

onMounted(() => {
  interval.value = setInterval(() => {
    if (secondsRemaining.value > 0) {
      secondsRemaining.value--
    } else {
      clearInterval(interval.value)
      finished.value = true
    }
  }, 1000)
})

const time = computed(() => {
  const minutes = String(Math.floor((secondsRemaining.value % 3600) / 60)).padStart(2, '0')
  const seconds = String(secondsRemaining.value % 60).padStart(2, '0')
  return `${minutes}:${seconds}`
})
</script>