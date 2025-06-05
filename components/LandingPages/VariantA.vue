<template>
  <div>
    <h1>Variant A</h1>
    <div v-if="geo">
      <p>Your IP: {{ geo.ip }}</p>
      <p>Your Country: {{ geo.country }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const geo = ref(null)

onMounted(async () => {
  const res = await fetch('/geo')
  geo.value = await res.json()
})
</script>