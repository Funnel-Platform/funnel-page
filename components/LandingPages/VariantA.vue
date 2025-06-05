<template>
  <div>
    <LogoHeader />
    <h1>Variant A</h1>
    <ClientOnly>
      <div v-if="geo">
        <p>Your IP: {{ geo.ip }}</p>
        <p>Your Country: {{ geo.country }}</p>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup>
let geo = ref(null)

if (process.client) {
  geo = await useGeo()
}
</script>