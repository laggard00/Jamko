<template>
    <div class="product-card">
        <div class="top">
            <div class="icons">
            <img v-if="product.icon_url" :src="product.icon_url" :alt="product.name" />  
            <img v-else src="../assets/icons/other.svg" />
            </div>
            <p class="product-name">{{ product.name }}</p>
            <button class="btn-edit" @click="emit('edit', product.id)">✎</button>
            <button class="btn-delete" @click="emit('delete', product.id)">✕</button>
        </div>
        <div class="validity">
            <p class="status-text">{{ statusLabel }}</p>
            <div class="dot" :style="{ backgroundColor: dotColor }"></div>
        </div>
    </div>
</template> 
<script setup>
import { computed } from 'vue'

const emit = defineEmits(['delete', 'edit'])

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})
const statusLabel = computed(() => {
  const expiry = new Date(props.product.purchase_date)
  expiry.setFullYear(expiry.getFullYear() + props.product.warranty_length)
  const formatted = expiry.toLocaleDateString('hr-HR')
  const status = getStatus()
  if (status === 'expired') return `Isteklo ${formatted}`
  if (status === 'soon') return `Ističe uskoro ${formatted}`
  return `Vrijedi do ${formatted}`
})

const dotColor = computed(() => {
    const status = getStatus()
    if (status === 'active') return '#63C582'
    if (status === 'expired') return '#C56363'
    if (status === 'soon') return '#E3EE8F'
  })

function getStatus() {
    const expiry = new Date(props.product.purchase_date)
    expiry.setFullYear(expiry.getFullYear() + props.product.warranty_length)

    const today = new Date()
    const daysLeft = (expiry - today) / (1000 * 60 * 60 * 24)

    if (daysLeft < 0) return 'expired'
    if (daysLeft < 90) return 'soon'
    return 'active'
  }

</script>

<style scoped>
.product-card {
    background-color: #EFE6E6;
    border-radius: 16px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 180px;
    gap: 16px;
}

.top {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;
}

.product-name {
    flex: 1;
    font-weight: 700;
    font-size: 1rem;
    color: #222;
}

.validity {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.status-text {
    font-size: 0.85rem;
    color: #555;
}

.icon-placeholder {
    width: 60px;
    height: 60px;
    min-width: 60px;
    background-color: #ccc;
    border-radius: 10px;
}

.dot {
    width: 22px;
    height: 22px;
    border-radius: 50%;
}

.btn-edit {
    background: none;
    border: none;
    color: #bbb;
    font-size: 1rem;
    cursor: pointer;
    padding: 0;
    margin-left: auto;
    transition: color 0.2s;
}

.btn-edit:hover {
    color: #B10B77;
}

.btn-delete {
    background: none;
    border: none;
    color: #bbb;
    font-size: 0.9rem;
    cursor: pointer;
    padding: 0;
    transition: color 0.2s;
}

.btn-delete:hover {
    color: #C56363;
}
  .icons {
    width: 60px;
    height: 60px;
    min-width: 60px;
  }

  .icons img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
</style>