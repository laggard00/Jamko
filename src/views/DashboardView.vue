<script setup>
import FilterBarRow from '../components/FilterBarRow.vue';
import NavBar from '../components/NavBar.vue';
import ProductCard from '../components/ProductCard.vue';
import { ref, onMounted } from 'vue'
import { supabase } from '../supabase'

const proizvodi = ref([])

onMounted(async () => {
  const { data, error } = await supabase
    .from('receipts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching recipets', error.message)
    return
  }

  proizvodi.value = data
})
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