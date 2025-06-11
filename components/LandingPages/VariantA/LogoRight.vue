<template>
  <img
    v-if="show"
    class="select-none max-w-full sm:max-w-xs lg:max-w-none"
    :class="classes"
    :src="src"
    :alt="alt"
  />
</template>

<script setup>
const route = useRoute();
const config = useRuntimeConfig();

const logos = {
  guardian: {
    src: "/img/the-guardian.png",
    alt: "The Guardian logo",
    classes: "w-28",
  },
  bbc: {
    src: "/img/bbc.png",
    alt: "BBC logo",
    classes: "w-24",
  },
  nos: {
    src: "/img/nos.png",
    alt: "NOS logo",
    classes: "w-20",
  },
  btdk: {
    src: "/img/bt-dk.png",
    alt: "BT Nyheder",
    classes: "w-24",
  },
  nrk: {
    src: "/img/nrk.png",
    alt: "NRK.no",
    classes: "w-16",
  },
  dagens: {
    src: "/img/dagens.png",
    alt: "Dagens Nyheter",
    classes: "w-44",
  },
  news7: {
    src: "/img/7news-logo.png",
    alt: "7 News logo",
    classes: "w-28",
  },
  news9: {
    src: "/img/9news.png",
    alt: "7 News logo",
    classes: "w-40",
  },
  thestar: {
    src: "/img/thestar-logo.svg",
    alt: "The Star",
    classes: "w-40",
  },
  tagesschau: {
    src: "/img/tagesschau-logo.png?1",
    alt: "Tagesschau",
    classes: "w-9",
  },
  srfnews: {
    src: "/img/srf-news.png",
    alt: "SRF News",
    classes: "w-14",
  },
  abcnewsau: {
    src: "/img/abc-news-au.png",
    alt: "ABC News Australia",
    classes: "w-28",
  },
  lavanguardia: {
    src: "/img/la-vanguardia.png",
    alt: "La Vanguardia",
    classes: "w-44",
  },
  kronenzeitung: {
    src: "/img/kronen-zeitung.png",
    alt: "Kronen Zeitung",
    classes: "w-16",
  },
  wyborcza: {
    src: "/img/wyborcza.png",
    alt: "Wyborcza.pl",
    classes: "w-40",
  },
  elmundo: {
    src: "/img/elmundo.png",
    alt: "Elmundo",
    classes: "w-40",
  },
  idnes: {
    src: "/img/idnes.png",
    alt: "IDNES",
    classes: "w-40",
  },
  novinky: {
    src: "/img/novinky.png",
    alt: "Novinky",
    classes: "w-40",
  },
  rai: {
    src: "/img/rai-news-24.png",
    alt: "Rai News 24",
    classes: "w-40",
  },
  "der-spiegel": {
    src: "/img/der-spiegel.png",
    alt: "Der Spiegel",
    classes: "w-40",
  },
  "vrt-nws": {
    src: "/img/vrt-nws.png",
    alt: "VRT Nws",
    classes: "w-40",
  },
  elpais: {
    src: "/img/elpais.png",
    alt: "ElPais",
    classes: "w-28",
  },
  ad: {
    src: "/img/ad.jpg",
    alt: "AD",
    classes: "w-16",
  },
  newsau: {
    src: "/img/news-au.jpg",
    alt: "News Australia",
    classes: "w-28",
  },
};

const src = ref("/img/forbes.svg");
const alt = ref("Forbes logo");
const classes = ref("w-20");

const show = computed(() => {
  if (route.query.rlogo) {
    return parseInt(route.query.rlogo);
  }
  if (config.public.siteDomain === "bitcodeai.com") {
    return true;
  }
  return false;
});

onMounted(() => {
  const logoInQuery = Object.keys(route.query).filter((v) =>
    Object.keys(logos).includes(v)
  );

  if (logoInQuery.length > 0) {
    const logo = logos[logoInQuery];
    src.value = logo.src;
    alt.value = logo.alt;
    classes.value = logo.classes;
  }
});
</script>
