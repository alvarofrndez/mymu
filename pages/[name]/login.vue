<script setup>
    import { useRoute } from 'vue-router'
    import { onMounted, ref } from 'vue'

    definePageMeta({
        layout: 'login',
        middleware: [
            'login'
        ]
    })

    const route = useRoute()
    let type = ref(undefined)

    onMounted(async () => {
        type.value = route.params.name
    })
</script>

<template>
    <Login-spotify v-if="type == 'spotify'"/>
    <!-- <Login-apple-music v-if="type == 'apple-music'"/>
    <Login-amazon-music v-if="type == 'amazon-music'"/>
    <Login-soundcloud v-if="type == 'soundcloud'"/>
    <Login-youtube-music v-if="type == 'youtube-music'"/> -->
</template>
  
  