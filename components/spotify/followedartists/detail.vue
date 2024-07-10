<script setup>
    import { defineProps } from 'vue'
    import { useRouter } from 'vue-router'

    const router = useRouter()
    const {followed_artist} = defineProps({
        followed_artist: {
            type: Object,
            required: true
        }
    })

    function viewArtist(){
        router.push({ name: 'spotify-artist-id', params: { id : followed_artist.id } });
    }
</script>

<template>
    <article class='container-followed-artist' v-if="followed_artist" @click="viewArtist">
        <div class='container-image'>
            <img v-if="followed_artist.images[0]" :src='followed_artist.images[0].url' :alt='followed_artist.name'>
        </div>
        <div class='container-data'>
            <h3>{{ followed_artist.name }}</h3>
        </div>
    </article>
</template>

<style scoped lang='scss'>
    @import '@/assets/style.scss';

    .container-followed-artist{
        width: 200px;
        // display
        @include flex(column, center, center, 1rem);

        // margin
        padding: 1rem;

        // decoration
        cursor: pointer;
        border-radius: 20px;

        .container-image{
            // size
            width: 160px;
            height: 160px;

            // display
            @include flex();

            // decoration
            border-radius: 15px;
            overflow: hidden;

            img{
                // size
                width: 100%;
                height: 100%;
            }
        }

        .container-data{
            // display
            @include flex(column, center, center, .5rem);
        }

        &:hover{
            background-color: $h-c-white-opacity;
        }
    }

</style>