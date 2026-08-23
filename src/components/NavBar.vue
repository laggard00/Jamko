<template>
    <div class="nav-container">
        <img src="../images/logo.png" class="logo-img">
        <div class="navs">
            <RouterLink to="/dashboard">Moji računi</RouterLink>
            <RouterLink to="/profile">Profil</RouterLink>
            <RouterLink to="/odjava">Odjava</RouterLink>
        </div>
    </div>
</template>

<style scoped>

.nav-container{
    display:flex;
    width:100%;
    justify-content: space-between;
    align-items: center;
    background-color: transparent;
    border: 5px solid #B10B77;
    border-radius: 24px;
}
.logo-img{
  width: auto;
  height: 50px;
  margin: 6px 16px;
}
.navs{
    display:flex;
    align-items: center;
    gap: 24px;
    padding-right: clamp(16px, 3vw, 32px);
}
 .navs a {
    color: #B10B77;
    font-size: 1rem;
    text-decoration: none;
    font-weight: 600;
  }
</style>