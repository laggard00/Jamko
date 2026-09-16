<script setup>
import FilterBarRow from '../components/FilterBarRow.vue';
import NavBar from '../components/NavBar.vue';
import ProductCard from '../components/ProductCard.vue';
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../supabase'
import { Statusi } from '../enums/enums.js';

const router = useRouter()

const proizvodi = ref([])
const activeFilters = ref({ category: '', status: '' })
const showModal = ref(false)
const pendingDeleteId = ref(null)

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
  expiry.setMonth(expiry.getMonth() + product.warranty_length)
  const daysLeft = (expiry - new Date()) / (1000 * 60 * 60 * 24)
  if (daysLeft < 0) return Statusi.Istekao
  if (daysLeft < 90) return Statusi['Uskoro ističe']
  return Statusi.Aktivan;
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

function handleEdit(id) {
  router.push({ name: 'add-receipt', query: { id } })
}

function confirmDelete(id) {
  pendingDeleteId.value = id
  showModal.value = true
}

async function deleteConfirmed() {
  const { error } = await supabase.from('receipts').delete().eq('id', pendingDeleteId.value)
  if (error) {
    console.error('Error deleting receipt:', error.message)
    return
  }
  proizvodi.value = proizvodi.value.filter(p => p.id !== pendingDeleteId.value)
  showModal.value = false
  pendingDeleteId.value = null
}
</script>

<template>
  <div class="page">
    <NavBar></NavBar>
    <FilterBarRow @filter="handleFilter"></FilterBarRow>
    <div class="grid">
      <ProductCard v-for="proizvod in filteredProizvodi" :key="proizvod.id" :product="proizvod" @delete="confirmDelete" @edit="handleEdit"></ProductCard>
    </div>
    <div v-if="filteredProizvodi.length === 0" class="empty-state">
      <p>Nema pronađenih računa.</p>
    </div>

    <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
      <div class="modal">
        <p>Jeste li sigurni da želite obrisati ovaj račun?</p>
        <div class="modal-btns">
          <button class="btn-cancel" @click="showModal = false">Odustani</button>
          <button class="btn-confirm" @click="deleteConfirmed">Obriši</button>
        </div>
      </div>
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

.empty-state {
  text-align: center;
  color: #aaa;
  font-size: 1rem;
  margin-top: 48px;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.modal {
  background: #FFF7F7;
  border: 3px solid #B10B77;
  border-radius: 16px;
  padding: 32px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  font-weight: 600;
  color: #333;
}

.modal-btns {
  display: flex;
  gap: 16px;
}

.btn-cancel {
  border: 3px solid #B10B77;
  border-radius: 50px;
  padding: 8px 24px;
  background: transparent;
  color: #B10B77;
  font-weight: 700;
  font-family: 'CenturyGothic', sans-serif;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn-cancel:hover {
  opacity: 0.7;
}

.btn-confirm {
  border: 3px solid #C56363;
  border-radius: 50px;
  padding: 8px 24px;
  background: #C56363;
  color: white;
  font-weight: 700;
  font-family: 'CenturyGothic', sans-serif;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn-confirm:hover {
  opacity: 0.8;
}
</style>