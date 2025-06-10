<template>
  <div v-if="placement === 'welcome'">
    <client-only>
      <template v-if="pixelHash">
        <iframe
          :src="getLeadPixelSrc()"
          height="1"
          width="1"
          frameborder="0"
          style="background-color: transparent; visibility: hidden"
        />
      </template>
    </client-only>
  </div>
  <div v-else-if="placement === 'pageview'">
    <client-only>
      <template v-if="pixelHash">
        <iframe
          :src="getPageViewPixelSrc()"
          height="1"
          width="1"
          frameborder="0"
          style="background-color: transparent; visibility: hidden"
        />
      </template>
    </client-only>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import networks from "@/data/networks.json";

const config = useRuntimeConfig();
const route = useRoute();

//pixel config
const pixelDomain = ref(null);
const pixelHash = ref(null);

defineProps({
  placement: {
    type: String,
    required: true,
  },
});

const click_id = ref(null);
const aff_id = ref(null);
const s1 = ref(null);
const s2 = ref(null);
const s3 = ref(null);
const email = ref(null);
const net = ref(null);
const host_name = ref(null);

const getQueryString = () => {
  if (process.client) {
    return new URLSearchParams(window.location.search).toString();
  }
  return "";
};

const getLeadPixelSrc = () => {
  return `https://${pixelDomain.value}/px/lead/${
    pixelHash.value
  }?${getQueryString()}`;
};

const getPageViewPixelSrc = () => {
  return `https://${pixelDomain.value}/px/pageview/${
    pixelHash.value
  }?${getQueryString()}`;
};

const pullQueryVars = () => {
  click_id.value = route.query.click_id;
  aff_id.value = route.query.aff_id;
  s1.value = route.query.s1;
  s2.value = route.query.s2;
  s3.value = route.query.s3;
  email.value = route.query.email;
  net.value = route.query.net;
  host_name.value = process.client ? window.location.hostname : null;
};

const setPixelConfig = () => {
  if (!net.value) return;

  const network = networks.find((n) => n.name === net.value);

  //if network is found in networks config file, set pixelDomain & pixelHash
  if (network) {
    pixelDomain.value = network.pixel_domain;

    //set pixelHash value based on network
    if (net.value === "c4") {
      pixelHash.value = config.public.pixelHashC4;
    } else if (net.value === "fx") {
      pixelHash.value = config.public.pixelHashFX;
    }
  }
};

onMounted(() => {
  pullQueryVars();
  setPixelConfig();
});

watch(
  () => route.query,
  (newQuery) => {
    pullQueryVars();
  },
  { deep: true }
);
</script>
