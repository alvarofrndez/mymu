<script setup>
    import { useRoute } from 'vue-router'
    import { useNuxtApp } from '#app'
    import { onMounted, ref } from 'vue'

    const route = useRoute()

    const { $getArtist } = useNuxtApp()
    const artist = ref(null)
    let container = null
    let is_loading = false

    onMounted(async () => {
        // setInfiniteScroll()

        artist.value = await $getArtist(route.params.id)
        console.log(artist.value)
    })

    function setInfiniteScroll(){
        container = document.getElementsByClassName('section-container-open')[0] ? document.getElementsByClassName('section-container-open')[0] : document.getElementsByClassName('section-container-close')[0]
        
        container.addEventListener('scroll', () => {
            if ((container.scrollTop + container.clientHeight) >= container.scrollHeight - 100) {
                if (is_loading)
                    return
                
                is_loading = true

                getMoreTracks()
            }
        });
    }

    function getTotalTime(){
        playlist.value.tracks.items.map((song) => {
            playlist.value.total_time ? playlist.value.total_time += song.track.duration_ms : playlist.value.total_time = song.track.duration_ms
        })
    }

    function convertTime(type, duration = 0){
        if (type == 'playlist'){
            let segundosTotales = Math.floor(playlist.value.total_time / 1000);
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

    function convertDate(unconvert_date){
        const date = new Date(unconvert_date)

        const year = date.getFullYear()
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const day = date.getDate().toString().padStart(2, '0')

        return `${day}-${month}-${year}`
    }
    
    async function getMoreTracks(){
        const { $spotifyApi } = useNuxtApp()
        // let new_tracks = await $spotifyApi(playlist.value.tracks.next)
        // console.log(new_tracks)
        // is_loading = false
    }
</script>

<template>
    <section class='contianer-playlist'>
        <!-- <article class='playlist' v-if="playlist">
            <div class='playlist-info'>
                <div class='container-img' v-if="playlist.images && playlist.images[0]">
                    <img :src="playlist.images[0].url" :alt="playlist.name">
                </div>

                <div class='data'>
                    <h1>{{ playlist.name }}</h1>
                    <p>{{ playlist.followers.total }} seguidores</p>
                    <p v-if='playlist.public'>pública</p>
                    <p v-else>privada</p>
                    <p>{{ playlist.tracks.total }} canciones</p>
                    <p v-if='playlist.total_time'>{{ convertTime('playlist') }}</p>
                </div>
            </div>
        
            <ul class='contianer-songs'>
                <div class='song-header'>
                    <b>nombre</b>
                    <b>añadida el</b>
                    <b>añadida por</b>
                    <b>album</b>
                    <b>duracion</b>
                    <b>play</b>
                </div>
                <li class='song' v-for="track of playlist.tracks.items">
                    <div class='song-name'>
                        <b>{{ track.track.name }}</b>
                        <span class='gray'>{{ track.track.artists[0].name}}</span>
                    </div>
                    <span>{{ convertDate(track.added_at) }}</span>
                    <span>{{ track.added_by.id}}</span>
                    <span v-if="track.track.album.album_type == 'album'">{{ track.track.album.name}}</span>
                    <i v-else class='gray'>sin album</i>
                    <span >{{ convertTime('song', track.track.duration_ms) }}</span>
                    <audio controls>
                        <source :src="track.track.preview_url">
                        Tu navegador no soporta el audio
                    </audio>
                </li>
            </ul>
        </article> -->
    </section>
</template>

<style scoped lang='scss'>
    @import '@/assets/style.scss';

    .contianer-playlist{
        @include displayContainerSpotify();

        // display
        @include flex();

        .playlist{
            // size
            width: 80%;

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
                padding-top: 2rem;
                padding-bottom: 2rem;

                // decoration
                list-style: none;
                background-color: $h-c-white-opacity;
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

                    &>*{
                        // size
                        width: calc(100% / 6);
                    }

                    .song-name{
                        // display
                        @include flex(column, flex-start, flex-start);
                    }

                    .gray{
                        color: $h-c-black-gray;
                    }

                    &:hover{
                        background-color: $h-c-white;
                    }
                }
            }
        }
    }
</style>