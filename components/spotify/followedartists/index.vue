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
    <section class='container-followed-artists'>
        <h2>Mis Artistas</h2>
        <ul class='followed-artists' v-if="followed_artists.artists.items[0]">
            <Spotify-followedartists-detail v-for="artist in followed_artists.artists.items" :key="artist.id" :followed_artist="artist"/>
        </ul>
        <h3 v-else>No sigues artistas</h3>
    </section>
</template>

<style scoped lang='scss'>
    @import '@/assets/style.scss';

    .container-followed-artists{
        // size
        width: 95%;

        @include flex(column, flex-start, flex-start, 3rem);

        .followed-artists{
            // size
            width: 100%;

            // display
            @include flex(row, flex-start, flex-start);
            flex-wrap: wrap;

            // margin
            margin: 0;
            padding: 0;

            // decoration
            list-style: none;
        }
    }
</style>