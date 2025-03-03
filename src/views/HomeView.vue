<script setup>
import CurrentWeatherCard from '@/components/CurrentWeatherCard.vue'
</script>

<template>
  <div class="grid grid-flow-col grid-cols-2 gap-6 min-h-screen">
    <!-- Section Left -->
    <section class="col-span-2">
      <div class="w-full h-full">
        <CurrentWeatherCard />
      </div>
    </section>

    <!-- Section Right -->
    <section class="col-span-1">
      <div class="w-120 h-full">Section Right</div>
    </section>
  </div>
</template>
<style></style>
