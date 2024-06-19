<script setup>
    const { $spotifyAuthUrl } = useNuxtApp()

    function login(){
        window.location.href = $spotifyAuthUrl
    }
</script>

<template>
    <div>
        <button @click="login">Iniciar sesión con Spotify</button>
    </div>
</template>
  
  