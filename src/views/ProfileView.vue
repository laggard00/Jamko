<template>
  <div class="page">
    <NavBar />
    <div class="card">

      <div class="image-con">
        <div class="avatar">
          <span class="avatar-letter">I</span>
        </div>
        <label class="btn-upload">Promijeni sliku</label>
      </div>

      <div class="info-con">
        <div class="info-row">
          <span class="label">Email</span>
          <span class="value">ivan@gmail.com</span>
        </div>
        <div class="info-row">
          <span class="label">Registriran</span>
          <span class="value">01.01.2025</span>
        </div>
      </div>

      <button class="btn-odjava">Odjava</button>

    </div>
  </div>
</template>

<script setup>
import NavBar from '../components/NavBar.vue'
</script>

<style scoped>
.page {
  padding: 16px;
  min-height: 100vh;
  background-color: #FFF7F7;
}

.card {
  border: 5px solid #B10B77;
  border-radius: 20px;
  padding: clamp(24px, 4vw, 48px);
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  background:transparent;
}

.image-con {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 4px solid #B10B77;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #EFE6E6;
}

.avatar-letter {
  font-size: 2.5rem;
  font-weight: 700;
  color: #B10B77;
}

.btn-upload {
  border: 3px solid #B10B77;
  border-radius: 50px;
  padding: 8px 24px;
  color: #B10B77;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn-upload:hover {
  opacity: 0.7;
}

.info-con {
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1.5px solid rgba(95, 92, 92, 0.2);
  padding-bottom: 12px;
}

.label {
  font-weight: 700;
  color: #B10B77;
}

.value {
  color: #333;
}

.btn-odjava {
  border: 3px solid #B10B77;
  border-radius: 50px;
  padding: 10px 40px;
  background: transparent;
  color: #B10B77;
  font-weight: 700;
  font-size: 1rem;
  font-family: 'CenturyGothic', sans-serif;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn-odjava:hover {
  opacity: 0.7;
}
</style>
