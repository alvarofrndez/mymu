<script setup>
    const { $spotifyAuthUrl } = useNuxtApp()

    definePageMeta({
        layout: 'login'
    })

    function login(){
        window.location.href = $spotifyAuthUrl
    }
</script>

<template>
    <div>
        <button @click="login">Iniciar sesión con Spotify</button>
    </div>
</template>