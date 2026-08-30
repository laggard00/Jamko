<template>
  <div class="page">
    <NavBar />
    <div class="card">

      <div class="image-con">
        <div class="avatar">
          <img v-if="avatarUrl" :src="avatarUrl" class="avatar-img" />
          <span v-else class="avatar-letter">{{ initials }}</span>
        </div>
        <input type="file" id="avatar-upload" accept="image/*" @change="handleUpload" hidden />
        <label for="avatar-upload" class="btn-upload">Promijeni sliku</label>
        <p v-if="error" class="error">{{ error }}</p>
        <p v-if="success" class="success">Slika uspješno promijenjena!</p>
      </div>

      <div class="info-con">
        <div class="info-row">
          <span class="label">Email</span>
          <span class="value">{{ user?.email }}</span>
        </div>
        <div class="info-row">
          <span class="label">Registriran</span>
          <span class="value">{{ createdAt }}</span>
        </div>
      </div>

      <button class="btn-odjava" @click="logout">Odjava</button>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../supabase'
import NavBar from '../components/NavBar.vue'

const router = useRouter()
const user = ref(null)
const avatarUrl = ref('')
const error = ref('')
const success = ref(false)

const initials = computed(() => user.value?.email?.[0].toUpperCase() ?? '?')

const createdAt = computed(() => {
  if (!user.value?.created_at) return ''
  return new Date(user.value.created_at).toLocaleDateString('hr-HR')
})

onMounted(async () => {
  const { data } = await supabase.auth.getUser()
  user.value = data.user
  avatarUrl.value = data.user?.user_metadata?.avatar_url || ''
})

async function handleUpload(event) {
  error.value = ''
  success.value = false
  const file = event.target.files[0]
  if (!file) return

  const ext = file.name.split('.').pop()
  const fileName = `${user.value.id}.${ext}`

  const { error: uploadErr } = await supabase.storage
    .from('profile-pics')
    .upload(fileName, file, { upsert: true })

  if (uploadErr) {
    error.value = uploadErr.message
    return
  }

  const { data } = supabase.storage.from('profile-pics').getPublicUrl(fileName)
  avatarUrl.value = data.publicUrl

  await supabase.auth.updateUser({ data: { avatar_url: data.publicUrl } })
  success.value = true
}

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

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.error {
  color: red;
  font-size: 0.85rem;
}

.success {
  color: green;
  font-size: 0.85rem;
}
</style>
