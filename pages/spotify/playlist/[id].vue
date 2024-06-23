<script setup>
    import { useRoute } from 'vue-router'
    import { useNuxtApp } from '#app'
    import { onMounted, ref } from 'vue'

    const route = useRoute()

    const { $getPlaylist } = useNuxtApp()
    const playlist = ref(null)

    onMounted(async () => {
        playlist.value = await $getPlaylist(route.params.id)
        console.log(playlist.value.tracks.items[0])
    })
</script>

<template>
    <article v-if="playlist">
        <h3>{{ playlist.name }}</h3>
        <p>{{ playlist.href }}</p>

        <img :src="playlist.images[0].url" alt="" v-if="playlist.images && playlist.images[0]">

        <section>
            <h3>Canciones</h3>
            <ul>
                <li v-for="track of playlist.tracks.items">
                    <span>{{ track.track.name }}</span>
                    <audio controls>
                        <source :src="track.track.preview_url">
                        Tu navegador no soporta el audio
                    </audio>
                </li>
            </ul>
        </section>
    </article>
</template>
