<template>
  <div class="page">
    <NavBar></NavBar>
    <div class="form-card">
      <h2>Novi račun</h2>
      <div class="form-body">
        <div class="fields">
          <div class="field-group">
            <label>Naziv proizvoda</label>
            <input type="text" v-model="form.name" placeholder="iPhone" />
          </div>
          <div class="field-group">
            <label>Kategorija</label>
            <select v-model="form.category">
        <option disabled value="">Odaberite kategoriju</option>
        <option 
        v-for="(value, key) in Kategorija" :key="value" :value="value">
        {{ key }}
      </option>
            </select>
          </div>
          <div class="field-group">
            <label>Datum kupnje</label>
            <input type="date" v-model="form.purchaseDate" />
          </div>
          <div class="field-group">
            <label>Trgovina</label>
            <input v-model="form.store" placeholder="Ime trgovine">
          </div>
          <div class="field-group">
            <label>Trajanje jamstva</label>
            <input type="number" v-model="form.warrantyLength" placeholder="1" min="1" />
          </div>
        </div>
        <div class="upload-area">
          <input type="file" id="file" accept="image/*" @change="handleFile" hidden />
          <label for="file" class="upload-box">
            <img v-if="previewUrl" :src="previewUrl" class="preview-img" />
            <template v-else>
              <span class="upload-icon">↑</span>
              <span>Učitaj fotografiju</span>
            </template>
          </label>
        </div>
        <div class="icons">
          <div v-for="(url, name) in Ikone":key="name"class="icon-cont" :class="{ selected: form.icon_url === url }"@click="form.icon_url = url; console.log(form.icon_url)">
          <img :src="url" :alt="name" />
          <span>{{ name }}</span>
        </div>
        </div>
      </div>
      <p v-if="error" style="color: red; font-size: 0.85rem;">{{ error }}</p>
      <button class="btn-dodaj" @click="handleSubmit">+ Dodaj račun</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../supabase'
import {Ikone} from '../assets/icons/Ikone.js'
import { Kategorija, Statusi } from '../enums/enums.js'
import NavBar from '../components/NavBar.vue'

const router = useRouter()
const selectedFile = ref(null)
const previewUrl = ref('')
const error = ref('')

const form = ref({
  name: '',
  category: '',
  purchaseDate: '',
  store: '',
  warrantyLength: '',
  icon_url: '',
})

function handleFile(event) {
  const file = event.target.files[0]
  if (!file) return
  selectedFile.value = file
  previewUrl.value = URL.createObjectURL(file)
}

async function handleSubmit() {
  error.value = ''

  const { data: userData } = await supabase.auth.getUser()
  const userId = userData.user.id

  let photoUrl = ''

  if (selectedFile.value) {
    const ext = selectedFile.value.name.split('.').pop()
    const fileName = `${userId}/${Date.now()}.${ext}`

    const { error: uploadErr } = await supabase.storage
      .from('receipts')
      .upload(fileName, selectedFile.value)

    if (uploadErr) {
      error.value = uploadErr.message
      return
    }

    const { data } = supabase.storage.from('receipts').getPublicUrl(fileName)
    photoUrl = data.publicUrl
  }

  const { error: insertErr } = await supabase.from('receipts').insert({
    user_id: userId,
    name: form.value.name,
    category: form.value.category,
    purchase_date: form.value.purchaseDate,
    warranty_length: parseInt(form.value.warrantyLength),
    store: form.value.store,
    photo_url: photoUrl,
    icon_url: form.value.icon_url
  })

  if (insertErr) {
    error.value = insertErr.message
    return
  }

  router.push('/dashboard')
}
</script>

<style scoped>
.page {
  padding: 16px;
  min-height: 100vh;
  background-color: #FFF7F7;
}

.form-card {
  border: 5px solid #B10B77;
  border-radius: 20px;
  padding: clamp(16px, 4vw, 40px);
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

h2 {
  color: #B10B77;
  font-weight: 700;
}

.form-body {
  display: flex;
  gap: 32px;
}

.fields {
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field-group label {
  font-size: 0.85rem;
  color: #333;
}

.field-group input,
.field-group select {
  border: 1.5px solid rgba(95, 92, 92, 0.4);
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 0.95rem;
  font-family: 'CenturyGothic', sans-serif;
  outline: none;
}

.field-group input:focus,
.field-group select:focus {
  border-color: #B10B77;
}

.upload-area {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.upload-box {
  width: 100%;
  height: 200px;
  background-color: #e0e0e0;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  cursor: pointer;
  color: #555;
  font-size: 0.95rem;
  transition: background-color 0.2s;
}

.upload-box:hover {
  background-color: #d0d0d0;
}

.upload-icon {
  font-size: 2rem;
  color: #B10B77;
}

.preview-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
}

.btn-dodaj {
  align-self: center;
  border: 3px solid #B10B77;
  border-radius: 50px;
  padding: 10px 32px;
  background: transparent;
  color: #B10B77;
  font-weight: 700;
  font-size: 1rem;
  font-family: 'CenturyGothic', sans-serif;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn-dodaj:hover {
  opacity: 0.7;
}

.icons {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
  }

.icon-cont {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 8px;
    border-radius: 8px;
    cursor: pointer;
    border: 2px solid transparent;
}

.icon-cont img {
    width: 32px;
    height: 32px;
}

.icon-cont span {
    font-size: 0.7rem;
    color: #555;
}

.icon-cont.selected {
    border-color: #B10B77;
}
</style>
