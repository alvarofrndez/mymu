<script setup>
    import { onMounted } from 'vue'
    import { useUserStore } from '~/stores/user'
    
    const { $spotifyApi } = useNuxtApp()
    const user_s = useUserStore()

    onMounted(async () => {
        const data = await $spotifyApi('me')
        user_s.user = data
        console.log(user_s.user)
    })
</script>

<template>
    <div v-if="user_s.user">
        <h1>{{ user_s.user.display_name }}</h1>
        <img v-if="user_s.user.images.lenght > 0" :src="user_s.user.images[0].url" alt="Profile Image">
    </div>
</template>
  

  