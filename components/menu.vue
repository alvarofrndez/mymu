<script setup>
    import { useUserStore } from '~/stores/user'

    const user_s = useUserStore()

</script>

<template>
    <div>
        <NuxtLink to="/">Inicio</NuxtLink>
        <NuxtLink to="/login">Login</NuxtLink>
        <NuxtLink to="/profile" v-if="user_s.user">Perfil</NuxtLink>
        <NuxtLink to="/playlists" v-if="user_s.user">Playlists</NuxtLink>
    </div>
</template>