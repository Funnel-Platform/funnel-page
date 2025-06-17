<template>
  <ClientOnly>
    <LandingPages-VariantA
      v-if="useVariantA()"
    />
    <LandingPages-Default
      v-else
    />
  </ClientOnly>
</template>

<script setup>
const route = useRoute();

const useVariantA = () => {
  return route.query.variant === 'a';
};
</script>