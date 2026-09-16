<template>
  <div class="page">
    <NavBar></NavBar>
    <div class="form-card">
      <h2>{{ editId ? 'Uredi račun' : 'Novi račun' }}</h2>
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
            <label>Trajanje jamstva (mjeseci)</label>
            <input type="number" v-model="form.warrantyLength" placeholder="12" min="1" />
          </div>
        </div>
        <div class="upload-area">
          <input type="file" id="file" accept="image/*" @change="handleFile" hidden />
          <div class="upload-box">
            <img v-if="previewUrl" :src="previewUrl" class="preview-img" />
            <label v-else for="file" class="upload-placeholder">
              <span class="upload-icon">↑</span>
              <span>Učitaj fotografiju</span>
            </label>
            <a v-if="previewUrl" :href="previewUrl" target="_blank" class="btn-open">Otvori sliku</a>
          </div>
        </div>
        <div class="icons">
          <div v-for="(url, name) in Ikone":key="name"class="icon-cont" :class="{ selected: form.icon_url === url }"@click="form.icon_url = url; console.log(form.icon_url)">
          <img :src="url" :alt="name" />
          <span>{{ name }}</span>
        </div>
        </div>
      </div>
      <p v-if="error" style="color: red; font-size: 0.85rem;">{{ error }}</p>
      <button class="btn-dodaj" @click="handleSubmit">{{ editId ? 'Spremi izmjene' : '+ Dodaj račun' }}</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { supabase } from '../supabase'
import {Ikone} from '../assets/icons/Ikone.js'
import { Kategorija, Statusi } from '../enums/enums.js'
import NavBar from '../components/NavBar.vue'

const router = useRouter()
const route = useRoute()
const editId = ref(null)
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

onMounted(async () => {
  if (route.query.id) {
    editId.value = route.query.id
    const { data } = await supabase.from('receipts').select('*').eq('id', editId.value).single()
    if (data) {
      form.value.name = data.name
      form.value.category = data.category
      form.value.purchaseDate = data.purchase_date
      form.value.store = data.store
      form.value.warrantyLength = data.warranty_length
      form.value.icon_url = data.icon_url
      if (data.photo_url) {
        const { data: signed } = await supabase.storage.from('receipts').createSignedUrl(data.photo_url, 3600)
        previewUrl.value = signed?.signedUrl || ''
      }
    }
  }
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

    photoUrl = fileName
  }

  const payload = {
    name: form.value.name,
    category: form.value.category,
    purchase_date: form.value.purchaseDate,
    warranty_length: parseInt(form.value.warrantyLength),
    store: form.value.store,
    icon_url: form.value.icon_url,
    ...(photoUrl && { photo_url: photoUrl }),
  }

  let submitErr
  if (editId.value) {
    const { error: updateErr } = await supabase.from('receipts').update(payload).eq('id', editId.value)
    submitErr = updateErr
  } else {
    const { error: insertErr } = await supabase.from('receipts').insert({ ...payload, user_id: userId, photo_url: photoUrl })
    submitErr = insertErr
  }

  if (submitErr) {
    error.value = submitErr.message
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
  border-radius: 16px;
  background-color: #e0e0e0;
  position: relative;
  overflow: hidden;
}

.upload-placeholder {
  width: 100%;
  height: 100%;
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

.upload-placeholder:hover {
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
  display: block;
}

.btn-open {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.55);
  color: white;
  border-radius: 20px;
  padding: 4px 12px;
  font-size: 0.75rem;
  text-decoration: none;
  font-family: 'CenturyGothic', sans-serif;
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
