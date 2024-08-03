<script setup>
    import { defineProps } from 'vue'
    import { useRouter } from 'vue-router'
    import { useFloatModalStore } from '@/stores/float-modal'

    const router = useRouter()
    const float_modal_s = useFloatModalStore()

    const { track } = defineProps({
        track: {
            type: Object,
            required: true
        }
    })
    const { $save, $unsave } = useNuxtApp()

    function convertTime(duration){
        let segundosTotales = Math.floor(duration / 1000);
        let minutos = Math.floor((segundosTotales % 3600) / 60);
        let segundos = segundosTotales % 3600 % 60;

        if(minutos == 1)
            return `${minutos} minuto, ${segundos} segundos`
        else{
            return `${minutos} minutos, ${segundos} segundos`
        }
    }

    function convertDate(unconvert_date){
        const date = new Date(unconvert_date)
        
        const year = date.getFullYear()
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const day = date.getDate().toString().padStart(2, '0')

        return `${day}-${month}-${year}`
    }

    async function saveTrack(id) {
        const response = await $save(id, 'tracks')
        
        if(response)
            track.saved = true
    }
    
    async function unsaveTrack(id) {
        const response = await $unsave(id, 'tracks')

        if(response)
            track.saved = false
    }

    function goTo(e, url) {
        float_modal_s.hide()
        e.stopPropagation()
        router.push(url)
    }

</script>

<template>
    <article class='track' v-if='track.name'>
        <div class='container-img' v-if='track.album.images[0]'>
            <img :src='track.album.images[0].url' :alt='track.name'>
        </div>
        <span v-else>
            sin imagen
        </span>
        <div class='container-data'>
            <div class='song-header' >
                <b>{{ track.name }}</b>
                <div>
                    <span class='container-artists' v-for="artist of track.artists">
                        <span
                            @mouseover='(e) => float_modal_s.show(e, artist)' 
                            @mouseleave='float_modal_s.hide()'
                            @click='(e) => goTo(e, `/spotify/artist/${artist.id}`)'>
                            {{ artist.name }}
                        </span>
                        <span v-if="track.artists.indexOf(artist) < track.artists.length - 1"> · </span> 
                    </span>
                </div>
            </div>
            <Icon v-if='track.saved' @click='unsaveTrack(track.id)' class='icon' name="material-symbols:favorite" />
            <Icon v-else @click='saveTrack(track.id)' class='icon' name="material-symbols:favorite-outline" />
            <span >{{ convertDate(track.album.release_date) }}</span>
            <span 
                v-if="track.album.album_type == 'album'"
                class='album'
                @mouseover='(e) => float_modal_s.show(e, track.album)' 
                @mouseleave='float_modal_s.hide()'
                @click='(e) => goTo(e, `/spotify/album/${track.album.id}`)'>
                {{ track.album.name }}
            </span>
            <span >{{ convertTime(track.duration_ms) }}</span>
            <audio controls>
                <source :src="track.preview_url">
                Tu navegador no soporta el audio
            </audio>
        </div>
    </article>
    <LoaderCircle v-else/>
</template>

<style scoped lang='scss'>
    @import '@/assets/style.scss';

    .track{
        // size
        width: fit-content;

        // display
        @include flex(row, flex-start, center, 1.5rem);

        // margin
        padding: 2rem;

        // decoration
        background-color: $h-c-black-opacity;
        border-radius: 10px;

        .container-img{
            // size
            width: 250px;
            height: 250px;

            // display
            @include flex();

            // decoration
            overflow: hidden;
            border-radius: 10px;

            img{
                // size
                width: 100%;
                height: 100%;
            }
        }

        .container-data{
            // size
            width: calc(100% - 250px - 1.5rem);

            // display
            @include flex(column, flex-start, center, 1rem);

            .song-header{
                // display
                @include flex(column, flex-start, center, .5rem);

                div{
                    .container-artists{
                        *{
                            // decoration
                            cursor: pointer;
                        }
                    }
                }
            }

            .album{
                // decoration
                cursor: pointer;
            }
        }
    }

</style>