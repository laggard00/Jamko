<template>
  <div class="filter-bar">
    <div class="filters">
      <select class="filter-select">
        <option value="">Kategorija</option>
        <option value="elektronika">Elektronika</option>
        <option value="kucanski">Kućanski aparati</option>
        <option value="mobitel">Mobitel</option>
      </select>
      <select class="filter-select">
        <option value="">Status</option>
        <option value="active">Aktivno</option>
        <option value="soon">Ističe uskoro</option>
        <option value="expired">Isteklo</option>
      </select>
    </div>
    <RouterLink to="/add-receipt" class="btn-dodaj">+ Dodaj račun</RouterLink>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.filter-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top:16px;
}

.filters {
  display: flex;
  gap: 12px;
  border: 5px solid #B10B77;
  border-radius: 50px;
  padding: 8px 16px;
}

.filter-select {
  border: none;
  outline: none;
  background: transparent;
  color: #333;
  font-size: 1rem;
  font-family: 'CenturyGothic', sans-serif;
  cursor: pointer;
  padding: 4px 8px;
}

.btn-dodaj {
  border: 5px solid #B10B77;
  border-radius: 50px;
  padding: 10px 24px;
  color: #B10B77;
  font-weight: 700;
  font-size: 1rem;
  text-decoration: none;
  white-space: nowrap;
  transition: opacity 0.2s;
}

.btn-dodaj:hover {
  opacity: 0.7;
}
</style>
