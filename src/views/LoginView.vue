<template>
    <div class="login-page">
      <div class="login-card">
        <img src="../images/logo.png" class="logo-img">
        <div class="input-field">
          <label>Korisnicko ime</label>
          <input type="text" v-model="username"/>
        </div>
          <div class="input-field">
          <label>Zaporka</label>
          <input type="password" v-model="password" @keyup.enter="login"/>
        </div>
        <button class="btn-prijava" @click="login">Prijava</button>
        <p v-if="error" class="error">{{ error }}</p>
        <a class="registracija" @click.prevent="register" href="#">Registracija</a>
      </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../supabase'

const username = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

async function login() {
  error.value = ''
  const { error: err } = await supabase.auth.signInWithPassword({
    email: username.value,
    password: password.value,
  })
  if (err) {
    error.value = err.message
  } else {
    router.push('/dashboard')
  }
}

async function register() {
  error.value = ''
  const { error: err } = await supabase.auth.signUp({
    email: username.value,
    password: password.value,
  })
  if (err) {
    error.value = err.message
  } else {
    router.push('/dashboard')
  }
}
</script>
<style scoped>

.login-page{
  background-color: #FFF7F7;
  min-height: 100vh;
  display:flex;
  justify-content: center;
  align-items:center;
}
.login-card{
   background: #FFF7F7;
   border: 5px solid #B10B77;
   border-radius: 20px;
   width: clamp(280px, 90%, 800px);
   gap: clamp(8px, 2vh, 20px);
   padding: clamp(16px, 4vw, 30px) clamp(20px, 6vw, 100px);
   max-width: 893px;
   height: 100%;
   max-height:589px;
   display: flex;
   flex-direction: column;
   align-items: center;
}
.logo-img{
  width: 60%;
  height: auto;
  margin-bottom: clamp(8px, 2vh, 24px)
}

.input-field{
  display:flex;
  flex-direction: column;
  width:70%;
  gap:7px;
  padding:clamp(6px, 1.5vw, 10px) clamp(8px, 2vw, 14px);
}
.input-field input {
  border: 1.5px solid rgba(95, 92, 92, 0.4); 
  border-radius:5px; 
}

.btn-prijava{
  font-size: clamp(0.8rem, 2vw, 2rem);
  font-weight: 700;
  background-color: #B10B77;
  color:white;
  border: none;
  border-radius: 50px;
  padding: clamp(8px, 2vw, 12px) clamp(20px, 5vw, 40px);
  width: auto;
  display:flex;
  align-content:center;
  justify-content: center;
}

.registracija {
  color: #B10B77;
  font-weight: 700;
  text-decoration: none;
  font-size: clamp(0.8rem, 2vw, 1rem);
  
}

.registracija:hover {
  text-decoration: underline;
}

.error {
  color: red;
  font-size: 0.85rem;
}
</style>