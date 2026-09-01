<script setup>
import FilterBarRow from '../components/FilterBarRow.vue';
import NavBar from '../components/NavBar.vue';
import ProductCard from '../components/ProductCard.vue';
import { ref, computed, onMounted } from 'vue'
import { supabase } from '../supabase'

const proizvodi = ref([])
const activeFilters = ref({ category: '', status: '' })

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

function getStatus(product) {
  const expiry = new Date(product.purchase_date)
  expiry.setFullYear(expiry.getFullYear() + product.warranty_length)
  const daysLeft = (expiry - new Date()) / (1000 * 60 * 60 * 24)
  if (daysLeft < 0) return 'expired'
  if (daysLeft < 90) return 'soon'
  return 'active'
}

const filteredProizvodi = computed(() => {
  return proizvodi.value.filter(p => {
    const categoryMatch = !activeFilters.value.category || p.category === activeFilters.value.category
    const statusMatch = !activeFilters.value.status || getStatus(p) === activeFilters.value.status
    return categoryMatch && statusMatch
  })
})

function handleFilter(filters) {
  activeFilters.value = filters
}
</script>

<template>
  <div class="page">
    <NavBar></NavBar>
    <FilterBarRow @filter="handleFilter"></FilterBarRow>
    <div class="grid">
      <ProductCard v-for="proizvod in filteredProizvodi" :key="proizvod.id" :product="proizvod"></ProductCard>
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