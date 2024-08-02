<script setup>
    import { useRoute, useRouter } from 'vue-router'
    import { useNuxtApp } from '#app'
    import { onMounted, ref } from 'vue'

    const route = useRoute()
    const router = useRouter()

    const { $getPlaylist, $isPlaylistSaved, $savePlaylist, $unsavePlaylist } = useNuxtApp()
    const playlist = ref(null)
    const data_charged = ref(false)

    definePageMeta({
        middleware: [
        'auth'
        ]
    })

    onMounted( () => {
        setInfiniteScroll()
        getPlaylist()
    })
    
    async function getPlaylist(){
        await $getPlaylist(route.params.id).then(async (answer) => {
            if(answer){
                await $isPlaylistSaved(route.params.id).then((answer_saved) => {
                    playlist.value = answer
                    data_charged.value = true
                    playlist.value.saved = answer_saved[0]
                    getTotalTime()
                })
            }else{
                getPlaylist()
            }
        })
    }

    function setInfiniteScroll(){
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

    async function savePlaylist(id) {
        const response = await $savePlaylist(id)
        
        if(response)
            playlist.value.saved = true
    }
    
    async function unsavePlaylist(id) {
        const response = await $unsavePlaylist(id)

        if(response)
            playlist.value.saved = false
    }

    function goToTrack(track){
        router.push(`/spotify/track/${track.id}`)
    }
</script>

<template>
    <section class='contianer-playlist' v-if="playlist">
        <article class='playlist' >
            <div class='playlist-info'>
                <div class='container-img' v-if="playlist.images && playlist.images[0]">
                    <img :src="playlist.images[0].url" :alt="playlist.name">
                </div>

                <div class='data'>
                    <h1>{{ playlist.name }}</h1>
                    <p>Creada por {{ playlist.owner.display_name }}</p>
                    <p>{{ playlist.followers.total }} seguidores</p>
                    <Icon v-if='playlist.saved' @click='unsavePlaylist(playlist.id)' class='icon' name="material-symbols:favorite" />
                    <Icon v-else @click='savePlaylist(playlist.id)' class='icon' name="material-symbols:favorite-outline" />
                    <p v-if='playlist.public'>pública</p>
                    <p v-else>privada</p>
                    <p>{{ playlist.tracks.total }} canciones</p>
                    <p v-if='playlist.total_time'>{{ convertTime('playlist') }}</p>
                </div>
            </div>
        
            <ul class='contianer-songs'>
                <div class='song-header'>
                    <b>Nombre</b>
                    <b>Añadida el</b>
                    <b>Añadida por</b>
                    <b>Album</b>
                    <b>Duracion</b>
                    <b>Play</b>
                </div>
                <li class='song' v-for="track of playlist.tracks.items" @click='() => goToTrack(track.track)'>
                    <div class='song-name' >
                        <b>{{ track.track.name }}</b>
                        <span class='gray'>{{ track.track.artists[0].name}}</span>
                    </div>
                    <span>{{ convertDate(track.added_at) }}</span>
                    <span>{{ track.added_by.id ? track.added_by.id : 'spotify'}}</span>
                    <span v-if="track.track.album.album_type == 'album'">{{ track.track.album.name}}</span>
                    <i v-else class='gray'>sin album</i>
                    <span >{{ convertTime('song', track.track.duration_ms) }}</span>
                    <audio controls>
                        <source :src="track.track.preview_url">
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

    .contianer-playlist{
        @include displayContainerSpotify();

        // display
        @include flex();

        .playlist{
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

                    .icon{
                        // decoration
                        cursor: pointer;
                    }
                }
            }

            .contianer-songs{
                // size
                width: calc(100% - 1rem);

                // display
                @include flex(column, flex-start, space-around, 1.5rem);

                // margin
                margin: 0;
                padding-left: .5rem;
                padding-top: 2rem;
                padding-bottom: 2rem;

                // decoration
                list-style: none;
                border-radius: 15px;

                .song-header{
                    // size
                    width: calc(100% - 2rem);

                    // display
                    @include flex(row, center, space-between, 1.5rem);

                    // margin
                    padding: .5rem;

                    *{
                        // size
                        width: calc(100% / 6  - 1.5rem);

                        // decoration
                        font-size: $h-f-text-medium !important;
                    }
                }

                .song{
                    // size
                    width: calc(100% - 2rem);

                    // display
                    @include flex(row, center, space-between, 1.5rem);

                    // margin
                    padding: .5rem;

                    // decoration
                    border-radius: 10px;
                    cursor: pointer;

                    &>*{
                        // size
                        width: calc(100% / 6 - 1.5rem);
                        overflow: hidden;
                    }

                    &:hover{
                        background-color: $h-c-black-opacity;
                    }

                    .song-name{
                        // display
                        @include flex(column, flex-start, flex-start);
                    }

                    .gray{
                        color: $h-c-black-gray;
                    }
                }
            }
        }
    }
</style>