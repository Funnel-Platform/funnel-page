<template>
  <div v-if="placement === 'welcome'">
    <client-only>
      <template v-if="pixelConfig.hash">
        <iframe
          :src="getLeadPixelSrc()"
          height="1"
          width="1"
          frameborder="0"
          style="background-color: transparent; visibility: hidden"
        />
      </template>
    </client-only>
    <template v-if="['kv71'].includes(aff_id)">
      <iframe
        height="1"
        width="1"
        style="display: none"
        :src="`https://ztrk37.com/postback?cid=${s2}`"
        referrerpolicy="no-referrer"
      />
    </template>
    <template v-if="['rj99'].includes(aff_id)">
      <iframe
        height="1"
        width="1"
        style="display: none"
        :src="`https://intelligenteshr.pro/thankyou.php?transaction_id=${click_id}&email=${email}`"
        referrerpolicy="no-referrer"
      />
    </template>
    <template v-if="['my71'].includes(aff_id)">
      <iframe
        height="1"
        width="1"
        style="display: none"
        :src="`https://trackingisforsimps.com/trackthis/gatag.php?transaction_id=${click_id}&gclid=${s2}&acc=${s3}`"
        referrerpolicy="no-referrer"
      />
    </template>
    <template v-if="['yt46'].includes(aff_id)">
      <iframe
        height="1"
        width="1"
        style="display: none"
        :src="`https://buybusinessonline.org/load/gtag.php?transaction_id=${click_id}&gclid=${s2}&acc=${s3}`"
        referrerpolicy="no-referrer"
      />
    </template>
    <template v-if="['sc25'].includes(aff_id)">
      <iframe
        height="1"
        width="1"
        style="display: none"
        :src="`https://diversions.info/ThankYou.php?p1=${s1}&p2=${s2}`"
        referrerpolicy="no-referrer"
      />
    </template>
    <template v-if="['zn36'].includes(aff_id)">
      <iframe
        height="1"
        width="1"
        style="display: none"
        :src="`https://www.facebook.com/tr?id=${s1}&ev=Lead&noscript=1`"
        referrerpolicy="no-referrer"
      />
    </template>
    <template v-if="['dr54'].includes(aff_id)">
      <iframe
        height="1"
        width="1"
        style="display: none"
        :src="`https://www.facebook.com/tr?id=1560190431138831&ev=Lead&noscript=1`"
        referrerpolicy="no-referrer"
      />
      <iframe
        height="1"
        width="1"
        style="display: none"
        :src="`https://www.facebook.com/tr?id=542881717829055&ev=Lead&noscript=1`"
        referrerpolicy="no-referrer"
      />
    </template>
    <template v-if="['km29'].includes(aff_id)">
      <component :is="'script'" src="/js/bing-ads.js?v=2" />
    </template>
    <template v-if="['mw92', 'xf78', 'kx53', 'cw83'].includes(aff_id)">
      <iframe
        :src="`https://www.madetrackinggreatagain.com/track/${s3}`"
        width="1"
        height="1"
        frameBorder="0"
        style="display: none"
      />
      <img
        height="1"
        width="1"
        :src="`https://www.facebook.com/tr?id=${s2}&ev=Lead&noscript=1`"
      />
    </template>
    <template
      v-if="['ej19', 'zq49', 'jj28', 'nz37', 'mj68', 'sm31'].includes(aff_id)"
    >
      <iframe
        :src="`https://neuralntwrk.com/p1.php`"
        width="1"
        height="1"
        frameBorder="0"
        style="display: none"
      />
    </template>
    <template v-if="['ja12'].includes(aff_id)">
      <iframe
        :src="`https://simmerstock.info/px.php`"
        width="1"
        height="1"
        frameBorder="0"
        style="display: none"
      />
      <iframe
        v-if="s1 === 'TM2'"
        :src="`https://holt-cnmedia.com/px.php`"
        width="1"
        height="1"
        frameBorder="0"
        style="display: none"
      />
      <iframe
        v-if="s1 === 'TM3'"
        :src="`https://grifco.org/px.php`"
        width="1"
        height="1"
        frameBorder="0"
        style="display: none"
      />
      <iframe
        v-if="s1 === 'TM4'"
        :src="`https://interlinepace.com/px.php`"
        width="1"
        height="1"
        frameBorder="0"
        style="display: none"
      />
      <iframe
        v-if="s1 === 'TM5'"
        :src="`https://mainwaves.com/px.php`"
        width="1"
        height="1"
        frameBorder="0"
        style="display: none"
      />
      <iframe
        v-if="s1 === 'TM8'"
        :src="`https://highpointpatio.com/px.php`"
        width="1"
        height="1"
        frameBorder="0"
        style="display: none"
      />
      <iframe
        v-if="s1 === 'TM6'"
        :src="`https://sigurdsdatter.com/px.php`"
        width="1"
        height="1"
        frameBorder="0"
        style="display: none"
      />
      <iframe
        v-if="s1 === 'TM9'"
        :src="`https://jillcroft.com/px.php`"
        width="1"
        height="1"
        frameBorder="0"
        style="display: none"
      />
      <iframe
        v-if="s1 === 'TM10'"
        :src="`https://speedmods.de/px.php`"
        width="1"
        height="1"
        frameBorder="0"
        style="display: none"
      />
      <iframe
        v-if="s1 === 'TM11'"
        :src="`https://tagesconnect.de/px.php`"
        width="1"
        height="1"
        frameBorder="0"
        style="display: none"
      />
      <iframe
        v-if="s3"
        :src="`https://hub-meta-56.com/tracking/px.php?id=${s3}&event=purchase`"
        width="1"
        height="1"
        frameBorder="0"
        style="display: none"
      />
    </template>
    <template v-if="['ht13', 'hv58'].includes(aff_id)">
      <iframe
        v-if="s2"
        :src="`https://silverdelight.net/fbpxl.php?id=${s2}`"
        width="1"
        height="1"
        frameBorder="0"
        style="display: none"
      />
    </template>
    <template v-if="['fw32', 'mj75'].includes(aff_id)">
      <iframe
        v-if="s2"
        :src="`https://smartwebacademy.org/tracking/firepixel1.php?id=${s2}`"
        width="1"
        height="1"
        frameBorder="0"
        style="display: none"
      />
    </template>
    <template v-if="['pw89'].includes(aff_id)">
      <iframe
        :src="`https://www.martyrcollective.com/thankyou.html`"
        width="1"
        height="1"
        frameBorder="0"
        style="display: none"
        referrerpolicy="no-referrer"
      />
    </template>
    <template v-if="['wu61', 'qw72'].includes(aff_id)">
      <iframe
        src="https://unifiedprofitstrategies.com/lead.php"
        width="1"
        height="1"
        frameBorder="0"
        style="display: none"
        referrerpolicy="no-referrer"
      />
    </template>
    <template v-if="['gk93', 'ct46', 'zp21'].includes(aff_id)">
      <iframe
        :src="`https://provenstrategies.co/tracking/lead.php?fbclid=${s2}&acc=${s3}`"
        width="1"
        height="1"
        frameBorder="0"
        style="display: none"
        referrerpolicy="no-referrer"
      />
    </template>
    <template v-if="['xm19', 'ay54'].includes(aff_id)">
      <iframe
        :src="`https://trytotrackme.com/tracking/lead.php?fbclid=${s2}&acc=${s3}`"
        width="1"
        height="1"
        frameBorder="0"
        style="display: none"
        referrerpolicy="no-referrer"
      />
    </template>
    <template v-if="['ct34'].includes(aff_id)">
      <iframe
        src="https://www.gutesonnenenergie.net/thankyou.php"
        width="1"
        height="1"
        frameBorder="0"
        style="display: none"
        referrerpolicy="no-referrer"
      />
    </template>
    <template v-if="['dq11'].includes(aff_id)">
      <iframe
        :src="`https://sofreshsoclncln.com/p.ashx?a=3055&e=4521&t=${click_id}&r=${s3}`"
        width="1"
        height="1"
        frameBorder="0"
        style="display: none"
        referrerpolicy="no-referrer"
      />
    </template>
    <template v-if="['zy38'].includes(aff_id)">
      <iframe
        height="1"
        width="1"
        style="display: none"
        :src="`https://www.facebook.com/tr?id=154621341049539&ev=Lead&noscript=1`"
        referrerpolicy="no-referrer"
      />
    </template>
    <template v-if="['yf12'].includes(aff_id)">
      <iframe
        height="1"
        width="1"
        style="display: none"
        :src="`https://www.facebook.com/tr?id=1157686682227490&ev=Purchase&noscript=1&value=100.00&currency=USD`"
        referrerpolicy="no-referrer"
      />
      <iframe
        height="1"
        width="1"
        style="display: none"
        :src="`https://trackingisforsimps.com/prop/lead.php`"
        referrerpolicy="no-referrer"
      />
    </template>
    <template v-if="['nh66'].includes(aff_id)">
      <iframe
        height="1"
        width="1"
        style="display: none"
        :src="`https://trackingisforsimps.com/tomjv/lead.php`"
        referrerpolicy="no-referrer"
      />
    </template>
    <template v-if="['ur36', 'nw45'].includes(aff_id)">
      <iframe
        height="1"
        width="1"
        style="display: none"
        :src="`https://www.madetrackinggreatagain.com/track/${s3}`"
      />
    </template>
  </div>
  <div v-else-if="placement === 'pageview'">
    <client-only>
      <template v-if="pixelConfig.hash">
        <iframe
          :src="getPageViewPixelSrc()"
          height="1"
          width="1"
          frameborder="0"
          style="background-color: transparent; visibility: hidden"
        />
      </template>
    </client-only>
    <template v-if="['wu61', 'qw72'].includes(aff_id)">
      <iframe
        src="https://unifiedprofitstrategies.com/pixel.php"
        width="1"
        height="1"
        frameBorder="0"
        style="display: none"
        referrerpolicy="no-referrer"
      />
    </template>
    <template v-if="['gk93', 'ct46', 'zp21'].includes(aff_id)">
      <iframe
        :src="`https://provenstrategies.co/tracking/pixel.php?fbclid=${s2}&acc=${s3}`"
        width="1"
        height="1"
        frameBorder="0"
        style="display: none"
        referrerpolicy="no-referrer"
      />
    </template>
    <template v-if="['xm19', 'ay54'].includes(aff_id)">
      <iframe
        height="1"
        width="1"
        style="display: none"
        :src="`https://trytotrackme.com/tracking/pixel.php?fbclid=${s2}&acc=${s3}`"
        referrerpolicy="no-referrer"
      />
    </template>
    <template v-if="['zy38'].includes(aff_id)">
      <iframe
        height="1"
        width="1"
        style="display: none"
        :src="`https://www.facebook.com/tr?id=154621341049539&ev=PageView&noscript=1`"
        referrerpolicy="no-referrer"
      />
    </template>
    <template v-if="['yf12'].includes(aff_id)">
      <iframe
        height="1"
        width="1"
        style="display: none"
        :src="`https://www.facebook.com/tr?id=1157686682227490&ev=PageView&noscript=1`"
        referrerpolicy="no-referrer"
      />
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { pixelDomainConfig } from "@/config/pixelConfig";

const route = useRoute();
const siteConfig = useSiteConfig();

const props = defineProps({
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

const pixelConfig = computed(() => {
  const siteDomain = siteConfig.siteDomain;
  if (siteDomain && pixelDomainConfig[siteDomain]) {
    if (Array.isArray(pixelDomainConfig[siteDomain])) {
      return (
        pixelDomainConfig[siteDomain]
          .map((config) => {
            if (config.net && config.net === net.value) {
              return config;
            }
            return null;
          })
          .filter((config) => config !== null)[0] ||
        pixelDomainConfig[siteDomain][0]
      );
    }
    return pixelDomainConfig[siteDomain];
  }
  return {};
});

const getQueryString = () => {
  if (process.client) {
    return new URLSearchParams(window.location.search).toString();
  }
  return "";
};

const getLeadPixelSrc = () => {
  return `https://${pixelConfig.value.domain}/px/lead/${
    pixelConfig.value.hash
  }?${getQueryString()}`;
};

const getPageViewPixelSrc = () => {
  return `https://${pixelConfig.value.domain}/px/pageview/${
    pixelConfig.value.hash
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
  host_name.value = window.location.hostname;
};

const atLoadEvents = () => {
  pullQueryVars();
};

watch(
  () => route,
  () => {
    atLoadEvents();
  },
  { deep: true }
);

onMounted(() => {
  atLoadEvents();
});
</script>
