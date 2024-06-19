<script setup>
    import { useRouter, useRoute } from 'vue-router'

    const router = useRouter()
    const route = useRoute()
    const { $getSpotifyToken } = useNuxtApp()

    onMounted(async () => {
        const code = route.query.code
        if (code) {
            await $getSpotifyToken(code)
            router.push('/profile')
        }
    })
</script>

<template>
    <div>
        Autenticando...
    </div>
</template>
  
