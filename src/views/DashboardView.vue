<script setup>
import FilterBarRow from '../components/FilterBarRow.vue';
import NavBar from '../components/NavBar.vue';
import ProductCard from '../components/ProductCard.vue';
import { ref } from 'vue'

const proizvodi = ref([
  { name: 'Samsung TV 55"', purchaseDate: '2022-12-01', warrantyLength: 5 },
  { name: 'Hladnjak Bosch', purchaseDate: '2022-06-01', warrantyLength: 3 },
  { name: 'Perilica rublja Gorenje', purchaseDate: '2024-01-01', warrantyLength: 2 },
  { name: 'Pixel 9a', purchaseDate: '2025-03-01', warrantyLength: 3 },
])
</script>

<template>
  <div class="page">
    <NavBar></NavBar>
    <FilterBarRow></FilterBarRow>
    <div class="grid">
      <ProductCard v-for="(proizvod, index) in proizvodi" :key="index" :product="proizvod"></ProductCard>
    </div>
  </div>
</template>

<style scoped>
.page {
  padding: 16px;
  min-height: 100vh;
  background-color: #FFF7F7;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 16px;
}
</style>