<template>
  <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router'
</script>

<style>
@font-face {
  font-family: 'CenturyGothic';
  src: url('@/assets/fonts/centurygothic.ttf') format('truetype');
  font-weight: 400;
}

@font-face {
  font-family: 'CenturyGothic';
  src: url('@/assets/fonts/centurygothic_bold.ttf') format('truetype');
  font-weight: 700;
}

* {
  font-family: 'CenturyGothic', sans-serif;
}
</style>
