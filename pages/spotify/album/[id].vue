<script setup>
    import { useRoute, useRouter } from 'vue-router'
    import { useNuxtApp } from '#app'
    import { onMounted, ref } from 'vue'
    import { useFloatModalStore } from '@/stores/float-modal'

    const route = useRoute()
    const router = useRouter()
    const float_modal_s = useFloatModalStore()

    const { $getAlbum, $isSaved, $save, $unsave } = useNuxtApp()
    const album = ref(null)
    const data_charged = ref(false)

    definePageMeta({
        middleware: [
        'auth'
        ]
    })

    onMounted(async () => {
        setInfiniteScroll()

        await $getAlbum(route.params.id).then(async (answer) => {
            await $isSaved([route.params.id], 'albums').then((answer_saved) => {
                album.value = answer
                album.value.saved = answer_saved[0]
                data_charged.value = true
                getTotalTime()
                console.log(album.value)
            })
        })
    })

    function setInfiniteScroll(){

    }

    function getTotalTime(){
        album.value.tracks.items.map((song) => {
            album.value.total_time ? album.value.total_time += song.duration_ms : album.value.total_time = song.duration_ms
        })
    }

    function convertTime(type, duration = 0){
        if (type == 'album'){
            let segundosTotales = Math.floor(album.value.total_time / 1000);
            let horas = Math.floor(segundosTotales / 3600);
            let minutos = Math.floor((segundosTotales % 3600) / 60);
            let segundos = segundosTotales % 3600 % 60;

            if(horas == 1)
                return `Duración: ${horas} hora, ${minutos} minutos, ${segundos} segundos`
            else{
                return `Duración: ${horas} horas, ${minutos} minutos, ${segundos} segundos`
            }
        }else if (type == 'song'){
            let segundosTotales = Math.floor(duration / 1000);
            let minutos = Math.floor((segundosTotales % 3600) / 60);
            let segundos = segundosTotales % 3600 % 60;

            if(minutos == 1)
                return `${minutos} minuto, ${segundos} segundos`
            else{
                return `${minutos} minutos, ${segundos} segundos`
            }
        }
    }

    async function saveAlbum(id) {
        const response = await $save(id, 'albums')
        
        if(response)
            album.value.saved = true
    }
    
    async function unsaveAlbum(id) {
        const response = await $unsave(id, 'albums')

        if(response)
            album.value.saved = false
    }

    function goTo(e, url) {
        float_modal_s.hide()
        e.stopPropagation()
        router.push(url)
    }
</script>

<template>
    <section class='contianer-album' v-if="data_charged">
        <article class='album' v-if="album">
            <div class='album-info'>
                <div class='container-img' v-if="album.images && album.images[0]">
                    <img :src="album.images[0].url" :alt="album.name">
                </div>

                <div class='data'>
                    <h1>{{ album.name }}</h1>
                    <Icon v-if='album.saved' @click='unsaveAlbum(album.id)' class='icon' name="material-symbols:favorite" />
                    <Icon v-else @click='saveAlbum(album.id)' class='icon' name="material-symbols:favorite-outline" />
                    <div>
                        <span v-for="artist of album.artists">{{ artist.name }}</span>
                    </div>
                    <p>{{ album.tracks.total }} canciones</p>
                    <p>{{ album.release_date.slice(0,4) }}</p>
                    <p v-if='album.total_time'>{{ convertTime('album') }}</p>
                </div>
            </div>
        
            <ul class='contianer-songs'>
                <li class='song' v-for="track of album.tracks.items" @click='(e) => goTo(e, `/spotify/track/${track.id}`)'>
                    <div class='song-name'>
                        <b>{{ track.name }}</b>
                        <span class='gray'
                            @mouseover='(e) => float_modal_s.show(e, track.artists[0])' 
                            @mouseleave='float_modal_s.hide()'
                            @click='(e) => goTo(e, `/spotify/artist/${track.artists[0].id}`)'>
                            {{ track.artists[0].name}}
                        </span>
                    </div>
                    <span >{{ convertTime('song', track.duration_ms) }}</span>
                    <audio controls>
                        <source :src="track.preview_url">
                        Tu navegador no soporta el audio
                    </audio>
                </li>
            </ul>
        </article>
    </section>
    <LoaderCircle v-else/>
</template>

<style scoped lang='scss'>
    @import '@/assets/style.scss';

    .contianer-album{
        @include displayContainerSpotify();

        // display
        @include flex();

        .album{
            // size
            width: 90%;

            // display
            @include flex(column, flex-start, flex-start, 2rem);

            &-info{
                // display
                @include flex(row, flex-start, space-between, 2rem);

                .container-img{
                    // size
                    width: 250px;
                    height: 250px;

                    // display
                    @include flex();

                    // decoration
                    overflow: hidden;
                    border-radius: 15px;

                    img{
                        // size
                        width: 100%;
                        height: 100%;
                    }
                }

                .data{
                    // display
                    @include flex(column, flex-start, flex-start, 1rem);
                }
            }

            .contianer-songs{
                // size
                width: 100%;

                // display
                @include flex(column, space-around, space-around, 1.5rem);

                // margin
                margin: 0;
                padding-left: 0;
                padding-top: 2rem;
                padding-bottom: 2rem;

                // decoration
                list-style: none;
                border-radius: 15px;

                .song-header{
                    // size
                    width: calc(100% - 2rem);

                    // display
                    @include flex(row, center, flex-start);

                    // margin
                    padding: .5rem;

                    *{
                        // size
                        width: calc(100% / 6);

                        // decoration
                        font-size: $h-f-text-medium !important;
                    }
                }

                .song{
                    // size
                    width: calc(100% - 2rem);

                    // display
                    @include flex(row, center, flex-start);

                    // margin
                    padding: .5rem;

                    // decoration
                    border-radius: 10px;
                    cursor: pointer;

                    &>*{
                        // size
                        width: calc(100% / 3);
                    }

                    .song-name{
                        // display
                        @include flex(column, flex-start, flex-start);
                    }

                    .gray{
                        color: $h-c-black-gray;
                    }

                    &:hover{
                        background-color: $h-c-black-opacity;
                    }
                }
            }
        }
    }
</style>