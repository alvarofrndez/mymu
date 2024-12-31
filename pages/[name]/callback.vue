<script setup>
    import { useRouter, useRoute } from 'vue-router'

    definePageMeta({
        layout: 'callback'
    })

    const router = useRouter()
    const route = useRoute()
    const { $getSpotifyToken } = useNuxtApp()

    onMounted(async () => {
        switch (route.params.name){
            case 'spotify':
                authenticateSpotify()
                break
        }
    })

    async function authenticateSpotify(){
        const code = route.query.code
        if (code) {
            await $getSpotifyToken(code)
            router.push('/spotify/profile')
        }
    }
</script>

<template>
    <div>
        Autenticando...
    </div>
</template>

