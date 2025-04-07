<template>
  <div class="container text-center py-10">
    <h1>
      Site domain: {{ $msr('{SITE_DOMAIN}') }}<br>
      Site name: {{ $msr('{SITE_NAME}') }}
    </h1>
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'hi {SITE_DOMAIN} // {SITE_NAME}',
})
</script>