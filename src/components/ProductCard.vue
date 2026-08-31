<template>
    <div class="product-card">
        <div class="top">
            <div class="icon-placeholder"></div>
            <p>{{ product.name }}</p>
        </div>
        <div class="validity">
            <p>{{ statusLabel }}</p>
        <div class="dot" :style="{ backgroundColor: dotColor }"></div>        
    </div>
    </div>
</template> 
<script setup>
import { computed } from 'vue'

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
.product-card{
    background-color: #EFE6E6;
    border-radius: 16px;
    padding: 24px;
    display:flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 180px;
}
.top{
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.validity{
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;  
}
.icon-placeholder {
    width: 60px;
    height: 60px;
    background-color: #ccc;
    border-radius: 8px;
  }
.dot{
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: green;
}
</style>