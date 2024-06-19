<script setup>
    import { defineProps } from 'vue';

    const {followed_artists} = defineProps({
        followed_artists: {
            type: Object,
            required: true
        }
    })
</script>

<template>
    <section>
        <h2>Mis Artistas</h2>
        <ul v-if="followed_artists.artists.items[0]">
            <Followedartist v-for="artist in followed_artists.artists.items" :key="artist.id" :followed_artist="artist"/>
        </ul>
        <h3 v-else>No sigues artistas</h3>
    </section>
</template>