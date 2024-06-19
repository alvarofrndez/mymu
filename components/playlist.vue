<script setup>
    import { defineProps } from 'vue'
    import { useRouter } from 'vue-router'

    const {playlist} = defineProps({
        playlist: {
            type: Object,
            required: true
        }
    })
    const router = useRouter()

    function viewPlaylist(){
        router.push({ name: 'playlist-id', params: { id : playlist.id } });
    }
</script>

<template>
    <article v-if="playlist" @click="viewPlaylist">
        <h3>{{ playlist.name }}</h3>
        <p>{{ playlist.href }}</p>

        <img :src="playlist.images[0].url" alt="" v-if="playlist.images && playlist.images[0]">
    </article>
</template>