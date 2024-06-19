<script setup>
    import { useUserStore } from '~/stores/user'

    const user_s = useUserStore()

</script>

<template>
    <div>
        <NuxtLink to="/login" v-if="!user_s.user">Login</NuxtLink>
        <NuxtLink to="/home" v-if="user_s.user">Inicio</NuxtLink>
        <NuxtLink to="/profile" v-if="user_s.user">Perfil</NuxtLink>
        <NuxtLink to="/playlists" v-if="user_s.user">Playlists</NuxtLink>
    </div>
</template>