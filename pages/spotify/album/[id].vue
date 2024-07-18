<script setup>
    import { useRoute } from 'vue-router'
    import { useNuxtApp } from '#app'
    import { onMounted, ref } from 'vue'

    const route = useRoute()

    const { $getAlbum } = useNuxtApp()
    const album = ref(null)
    let container = null
    let is_loading = false
    const data_charged = ref(false)

    definePageMeta({
        middleware: [
        'auth'
        ]
    })

    onMounted(async () => {
        setInfiniteScroll()

        await $getAlbum(route.params.id).then((answer) => {
            console.log(answer)
            album.value = answer
            data_charged.value = true
            getTotalTime()
        })
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
    <section class='contianer-album' v-if="data_charged">
        <article class='album' v-if="album">
            <div class='album-info'>
                <div class='container-img' v-if="album.images && album.images[0]">
                    <img :src="album.images[0].url" :alt="album.name">
                </div>

                <div class='data'>
                    <h1>{{ album.name }}</h1>
                    <!-- <p>{{ album.followers.total }} seguidores</p> -->
                    <!-- <p v-if='album.public'>pública</p> -->
                    <!-- <p v-else>privada</p> -->
                    <div>
                        <span v-for="artist of album.artists">{{ artist.name }}</span>
                    </div>
                    <p>{{ album.tracks.total }} canciones</p>
                    <p>{{ album.release_date.slice(0,4) }}</p>
                    <p v-if='album.total_time'>{{ convertTime('album') }}</p>
                </div>
            </div>
        
            <ul class='contianer-songs'>
                <li class='song' v-for="track of album.tracks.items">
                    <div class='song-name'>
                        <b>{{ track.name }}</b>
                        <span class='gray'>{{ track.artists[0].name}}</span>
                    </div>
                    <!-- <span>{{ track.added_by.id}}</span>
                    <span v-if="track.album.album_type == 'album'">{{ track.album.name}}</span>
                    <i v-else class='gray'>sin album</i>
                    <span >{{ convertTime('song', track.duration_ms) }}</span>
                    <audio controls>
                        <source :src="track.preview_url">
                        Tu navegador no soporta el audio
                    </audio> -->
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