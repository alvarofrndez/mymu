<script setup>
    import { useUserStore } from '~/stores/user'

    const user_s = useUserStore()

</script>

<template>
    <div>
        <NuxtLink to="/" v-if="!user_s.user">Home</NuxtLink>
        <NuxtLink to="/spotify/home" v-if="user_s.user">Inicio</NuxtLink>
        <NuxtLink to="/spotify/profile" v-if="user_s.user">Perfil</NuxtLink>
        <NuxtLink to="/spotify/playlists" v-if="user_s.user">Playlists</NuxtLink>
    </div>
</template>