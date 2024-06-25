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
        router.push({ name: 'spotify-playlist-id', params: { id : playlist.id } });
    }
</script>

<template>
    <article class='container-playlist' v-if="playlist" @click="viewPlaylist">
        <div class='container-data'>
            <h3>{{ playlist.name }}</h3>
            <p>{{ playlist.tracks.total }} canciones</p>
        </div>

        <img class='image' :src="playlist.images[0].url" :alt="playlist.name" v-if="playlist.images && playlist.images[0]">
        <div class="gradient-overlay"></div>
    </article>
</template>

<style scoped lang='scss'>
    @import '@/assets/style.scss';

    .container-playlist{
        // size
        min-width: 200px;
        height: 200px;

        // position
        position: relative;

        // display
        @include flex(column, flex-start, flex-end);

        // decoration
        border-radius: 10px;
        cursor: pointer;
        
        .container-data{
            // size
            width: 100%;

            // position
            position: relative;
            bottom: .5rem;
            z-index: 1000;
            align-self: center;

            // display
            @include flex(column, center, center, .5rem);
        
            // decoration
            overflow: hidden;
            color: $h-c-white;
            background: linear-gradient(to top, $h-c-black-opacity, rgba(0, 0, 0, 0));
            border-radius: 10px;

            *{
                width: 90%;
                overflow: hidden;
            }
        }

        .image, .gradient-overlay{
            // size
            width: 100%;
            height: 100%;

            // position
            position: absolute;
            top: 0;
        
            // decoration
            border-radius: 10px;

        }

        .gradient-overlay {
            background: linear-gradient(to top, $h-c-black-opacity, transparent);
            pointer-events: none;
        }
    }

</style>