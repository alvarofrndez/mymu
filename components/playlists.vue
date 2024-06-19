<script setup>
    import { defineProps } from 'vue';

    const {playlists} = defineProps({
        playlists: {
            type: Object,
            required: true
        }
    })

</script>

<template>
    <div>
        <h2>Mis Playlists</h2>
        <ul v-if="playlists.items[0]">
            <Playlist v-for="playlist in playlists.items" :key="playlist.id" :playlist="playlist"/>
        </ul>
        <h3 v-else>No tienes playlists</h3>
    </div>
</template>