<template>
  <div>
    <LogoHeader :show-users-country="false" />
    <main class="font-light">
      <!-- Splash -->
      <div
        :class="
          'bg-gradient-to-b from-[#00062b] to-indigo-900 text-white ' +
          'pt-10 lg:pt-6 pb-10'
        "
      >
        <section class="container">
          <div class="md:grid grid-cols-3 items-center">
            <div class="col-span-2 max-w-sm md:max-w-none md:w-full mx-auto">
              <h1
                :class="
                  'text-4xl sm:text-5xl lg:text-[4rem] lg:font-extralight pb-8 ' +
                  'text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-pink-400 ' +
                  'lg:max-w-2xl'
                "
                v-html="$t(`${localeJsonPath}.splash.heading`)"
              />
              <ul
                class="text-lg md:text-2xl pb-8 leading-tight tracking-wide lg:font-extralight"
              >
                <li
                  v-for="item in $tm(`${localeJsonPath}.splash.list`)"
                  :key="item"
                  class="pb-2 flex items-center"
                >
                  <i class="pi pi-check text-yellow-500 mr-2" />
                  <span v-html="$rt(item)" />
                </li>
              </ul>
              <a
                :href="ctaLink"
                :class="
                  'bg-yellow-500 hover:bg-yellow-400 text-black rounded px-12 py-3 block ' +
                  'md:inline-block text-center mx-auto drop-shadow-lg font-medium text-lg'
                "
                v-html="$t(`${localeJsonPath}.button`)"
              />
            </div>
            <img
              src="/img/home.v2/hero-img.png"
              class="mt-6 md:mt-0 w-60 md:w-auto mx-auto -mb-16 drop-shadow-lg"
            />
          </div>
        </section>
      </div>

      <!-- Knowledge -->
      <section class="container py-14">
        <div class="md:grid grid-cols-2 gap-6 items-center">
          <div>
            <h2
              class="text-2xl md:text-3xl font-light pb-5"
              v-html="$t(`${localeJsonPath}.knowledge.heading`)"
            />
            <p v-html="$t(`${localeJsonPath}.knowledge.p-1`)" />
          </div>
          <div class="h-60 overflow-hidden relative">
            <div class="absolute inset-0 z-10 bg-transparent select-none" />
            <div class="w-[101.5%] h-full absolute -inset-1">
              <iframe
                scrolling="no"
                allowtransparency="true"
                style="width: 100%; height: 480px"
                referrerpolicy="no-referrer"
                src="https://s.tradingview.com/embed-widget/market-overview/?locale=uk#{%22colorTheme%22%3A%22light%22%2C%20%22dateRange%22%3A%2212M%22%2C%20%22showChart%22%3Afalse%2C%20%22locale%22%3A%22en%22%2C%20%22largeChartUrl%22%3A%22%22%2C%20%22isTransparent%22%3Afalse%2C%20%22showSymbolLogo%22%3Atrue%2C%20%22showFloatingTooltip%22%3Afalse%2C%20%22width%22%3A%22100%25%22%2C%20%22height%22%3A%22100%25%22%2C%20%22tabs%22%3A%5B%20%7B%20%22title%22%3A%22Forex%22%2C%20%22symbols%22%3A%5B%20%7B%20%22s%22%3A%22BITSTAMP%3ABTCUSD%22%20%7D%2C%20%7B%20%22s%22%3A%22BITSTAMP%3AETHUSD%22%20%7D%2C%20%7B%20%22s%22%3A%22BINANCE%3ABTCUSDT%22%20%7D%2C%20%7B%20%22s%22%3A%22BITSTAMP%3AXRPUSD%22%20%7D%20%5D%2C%20%22originalTitle%22%3A%22Forex%22%20%7D%20%5D}"
                frameborder="0"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Track record -->
      <div class="bg-[#00062b] text-white">
        <section class="container py-14 text-center">
          <h2
            class="text-2xl md:text-3xl font-light pb-5"
            v-html="$t(`${localeJsonPath}.track-record.heading`)"
          />
          <p
            class="text-neutral-300"
            v-html="$t(`${localeJsonPath}.track-record.p-1`)"
          />
          <div
            class="md:grid grid-cols-3 gap-6 text-center py-6 w-60 md:w-auto mx-auto"
          >
            <div
              v-for="(item, key) in $tm(
                `${localeJsonPath}.track-record.points`
              )"
              :key="key"
            >
              <img
                class="w-16 mx-auto mb-2"
                :src="`/img/home.v2/${$rt(item?.icon)}.svg`"
              />
              <p class="text-neutral-300" v-html="$rt(item?.text)" />
            </div>
          </div>
          <a
            :href="ctaLink"
            :class="
              'bg-yellow-500 hover:bg-yellow-400 text-black rounded px-12 py-3 block ' +
              'md:inline-block text-center mx-auto drop-shadow-lg font-medium text-lg'
            "
            v-html="$t(`${localeJsonPath}.button`)"
          />
        </section>
      </div>

      <!-- Global footprint -->
      <section class="container py-14 text-center">
        <h2 class="text-2xl md:text-3xl font-light pb-5">Global Footprint</h2>
        <div
          :class="
            'sm:grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 pb-0 md:pb-10 w-60 ' +
            'sm:w-auto mx-auto'
          "
        >
          <div
            v-for="(item, key) in $tm(
              `${localeJsonPath}.global-footprint.points`
            )"
            :key="key"
            class="border border-dashed rounded-md border-neutral-300 mb-12 md:mb-0"
          >
            <div class="-mt-10 bg-white inline-block p-2">
              <img
                class="w-16 mx-auto mb-2"
                :src="`/img/home.v2/${$rt(item?.icon)}.svg`"
              />
            </div>
            <div class="px-6">
              <p class="text-4xl pb-0" v-html="$rt(item?.heading)" />
              <p v-html="$rt(item?.text)" />
            </div>
          </div>
        </div>
        <a
          :href="ctaLink"
          :class="
            'bg-yellow-500 hover:bg-yellow-400 text-black rounded px-12 py-3 block ' +
            'md:inline-block text-center mx-auto drop-shadow-md font-medium text-lg'
          "
          v-html="$t(`${localeJsonPath}.button`)"
        />
      </section>

      <!-- Reinvent -->
      <div class="bg-[#00062b] text-white">
        <section class="container py-14">
          <div class="md:grid grid-cols-2 gap-6 items-center">
            <div class="text-center md:text-left">
              <h2
                class="text-2xl md:text-3xl font-light pb-5"
                v-html="$t(`${localeJsonPath}.reinvent.heading`)"
              />
              <p
                class="text-neutral-300 pb-8"
                v-html="$t(`${localeJsonPath}.reinvent.p-1`)"
              />
              <!-- <a
                :href="ctaLink"
                :class="'bg-yellow-500 hover:bg-yellow-400 text-black rounded px-12 py-3 block ' +
                  'md:inline-block text-center mx-auto drop-shadow-lg font-medium text-lg'"
                v-html="$t(`${localeJsonPath}.button`)"
              /> -->
            </div>
            <img
              class="w-96 mx-auto mt-10 md:mt-0"
              src="/img/home.v2/crypto-trading.png"
            />
          </div>
        </section>
      </div>

      <!-- Truth never lies -->
      <section class="container py-14 text-center">
        <h2
          class="text-2xl md:text-3xl font-light pb-5"
          v-html="$t(`${localeJsonPath}.truth-never-lies.heading`)"
        />
        <p class="text-lg max-w-xl mx-auto">
          <em v-html="$t(`${localeJsonPath}.truth-never-lies.p-1`)" />
        </p>
        <div
          :class="
            'sm:grid grid-cols-2 gap-4 pt-10 pb-0 w-60 ' + 'sm:w-auto mx-auto'
          "
        >
          <div
            v-for="(item, key) in $tm(
              `${localeJsonPath}.truth-never-lies.points`
            )"
            :key="key"
            class="border border-dashed rounded-md border-neutral-300 mb-12 md:h-44"
          >
            <div class="-mt-10 bg-white inline-block p-2">
              <img
                class="w-16 mx-auto mb-2"
                :src="`/img/home.v2/${$rt(item?.icon)}.svg`"
              />
            </div>
            <div class="px-6">
              <p class="text-2xl font-medium" v-html="$rt(item?.heading)" />
              <p class="pb-6" v-html="$rt(item?.text)" />
            </div>
            <a
              :href="ctaLink"
              :class="
                'bg-yellow-500 hover:bg-yellow-400 text-black rounded px-12 py-3 hidden ' +
                'md:inline-block text-center mx-auto drop-shadow-md font-medium text-lg'
              "
              v-html="$t(`${localeJsonPath}.button`)"
            />
          </div>
        </div>
        <a
          :href="ctaLink"
          :class="
            'bg-yellow-500 hover:bg-yellow-400 text-black rounded px-12 py-3 block ' +
            'md:hidden text-center mx-auto drop-shadow-lg font-medium text-lg'
          "
          v-html="$t(`${localeJsonPath}.button`)"
        />
      </section>

      <!-- Time waits -->
      <div class="bg-[#00062b] text-white">
        <section class="container py-14 text-center">
          <h2
            class="text-2xl md:text-3xl font-light pb-5"
            v-html="$t(`${localeJsonPath}.time-waits.heading`)"
          />
          <div
            class="lg:grid grid-cols-5 gap-6 text-center py-6 w-60 md:w-96 lg:w-auto mx-auto"
          >
            <div
              v-for="(item, key) in $tm(`${localeJsonPath}.time-waits.points`)"
              :key="key"
            >
              <img
                class="w-16 mx-auto mb-2"
                :src="`/img/home.v2/${$rt(item?.icon)}.svg`"
              />
              <p
                class="text-white text-lg font-medium pb-2"
                v-html="$rt(item?.heading)"
              />
              <p class="text-neutral-300" v-html="$rt(item?.text)" />
            </div>
          </div>
          <a
            :href="ctaLink"
            :class="
              'bg-yellow-500 hover:bg-yellow-400 text-black rounded px-12 py-3 block ' +
              'md:inline-block text-center mx-auto drop-shadow-lg font-medium text-lg'
            "
            v-html="$t(`${localeJsonPath}.button`)"
          />
        </section>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup>
const { locale, locales } = useI18n();
const siteConfig = useSiteConfig();
const siteName = siteConfig.siteName;
const siteDomain = siteConfig.siteDomain;
const localeJsonPath = "pages.homepage";

// Computed function for ctaLink
const ctaLink = computed(() => {
  let url = null;
  if (siteName === "Quendex") {
    url = "https://trckjn.com/o/j2ghs?lp=74?net=fx";
  }

  if (url) {
    url =
      url +
      `&s1=${siteDomain}` +
      `&s2=${siteName}&s3=community&t1=${locale.value}`;
    return url;
  }

  return `/${locale.value}/register`;
});
</script>
