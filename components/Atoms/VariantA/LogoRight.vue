<template>
  <img
    v-if="show"
    class="select-none max-w-full sm:max-w-xs lg:max-w-none"
    :class="classes"
    :src="src"
    :alt="alt"
  >
</template>

<script setup>
import { ref } from 'vue'
const route = useRoute()

const show = computed(() => {
  if (route.query?.rlogo) {
    return parseInt(route.query.rlogo)
  }
  return false
})

const classes = ref('')
const src = ref('')
const alt = ref('')

const logos = {
  guardian: {
    src: '/img/landing-pages/variant-a/logo-right/the-guardian.png',
    alt: 'The Guardian logo',
    classes: 'w-28',
  },
  bbc: {
    src: '/img/landing-pages/variant-a/logo-right/bbc.png',
    alt: 'BBC logo',
    classes: 'w-24',
  },
  nos: {
    src: '/img/landing-pages/variant-a/logo-right/nos.png',
    alt: 'NOS logo',
    classes: 'w-20',
  },
  btdk: {
    src: '/img/landing-pages/variant-a/logo-right/bt-dk.png',
    alt: 'BT Nyheder',
    classes: 'w-24',
  },
  nrk: {
    src: '/img/landing-pages/variant-a/logo-right/nrk.png',
    alt: 'NRK.no',
    classes: 'w-16',
  },
  dagens: {
    src: '/img/landing-pages/variant-a/logo-right/dagens.png',
    alt: 'Dagens Nyheter',
    classes: 'w-44',
  },
  news7: {
    src: '/img/landing-pages/variant-a/logo-right/7news-logo.png',
    alt: '7 News logo',
    classes: 'w-28',
  },
  news9: {
    src: '/img/landing-pages/variant-a/logo-right/9news.png',
    alt: '7 News logo',
    classes: 'w-40',
  },
  thestar: {
    src: '/img/landing-pages/variant-a/logo-right/thestar-logo.svg',
    alt: 'The Star',
    classes: 'w-40',
  },
  tagesschau: {
    src: '/img/landing-pages/variant-a/logo-right/tagesschau-logo.png?1',
    alt: 'Tagesschau',
    classes: 'w-9',
  },
  srfnews: {
    src: '/img/landing-pages/variant-a/logo-right/srf-news.png',
    alt: 'SRF News',
    classes: 'w-14',
  },
  abcnewsau: {
    src: '/img/landing-pages/variant-a/logo-right/abc-news-au.png',
    alt: 'ABC News Australia',
    classes: 'w-28',
  },
  lavanguardia: {
    src: '/img/landing-pages/variant-a/logo-right/la-vanguardia.png',
    alt: 'La Vanguardia',
    classes: 'w-44',
  },
  kronenzeitung: {
    src: '/img/landing-pages/variant-a/logo-right/kronen-zeitung.png',
    alt: 'Kronen Zeitung',
    classes: 'w-16',
  },
  wyborcza: {
    src: '/img/landing-pages/variant-a/logo-right/wyborcza.png',
    alt: 'Wyborcza.pl',
    classes: 'w-40',
  },
  elmundo: {
    src: '/img/landing-pages/variant-a/logo-right/elmundo.png',
    alt: 'Elmundo',
    classes: 'w-40',
  },
  idnes: {
    src: '/img/landing-pages/variant-a/logo-right/idnes.png',
    alt: 'IDNES',
    classes: 'w-40',
  },
  novinky: {
    src: '/img/landing-pages/variant-a/logo-right/novinky.png',
    alt: 'Novinky',
    classes: 'w-40',
  },
  rai: {
    src: '/img/landing-pages/variant-a/logo-right/rai-news-24.png',
    alt: 'Rai News 24',
    classes: 'w-40',
  },
  'der-spiegel': {
    src: '/img/landing-pages/variant-a/logo-right/der-spiegel.png',
    alt: 'Der Spiegel',
    classes: 'w-40',
  },
  'vrt-nws': {
    src: '/img/landing-pages/variant-a/logo-right/vrt-nws.png',
    alt: 'VRT Nws',
    classes: 'w-40',
  },
  elpais: {
    src: '/img/landing-pages/variant-a/logo-right/elpais.png',
    alt: 'ElPais',
    classes: 'w-28',
  },
  ad: {
    src: '/img/landing-pages/variant-a/logo-right/ad.jpg',
    alt: 'AD',
    classes: 'w-16',
  },
  newsau: {
    src: '/img/landing-pages/variant-a/logo-right/news-au.jpg',
    alt: 'News Australia',
    classes: 'w-28',
  },
};

onMounted(() => {
  // Does the query parameters include any keys that match our `logos` dataset?
  const logoInQuery = Object.keys(route.query)
    .filter(v => Object.keys(logos).includes(v))

  if (logoInQuery.length > 0) {
    const logo = logos[logoInQuery]
    src.value = logo.src
    alt.value = logo.alt
    classes.value = logo.classes
  }
})


</script>