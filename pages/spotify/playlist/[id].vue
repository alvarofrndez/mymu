<script setup>
    import { useRoute } from 'vue-router'
    import { useNuxtApp } from '#app'
    import { onMounted, ref } from 'vue'

    const route = useRoute()

    const { $getPlaylist } = useNuxtApp()
    const playlist = ref(null)

    onMounted(async () => {
        playlist.value = await $getPlaylist(route.params.id)
        console.log(playlist.value.tracks.items[0])
        getTotalTime()
    })

    function getTotalTime(){
        playlist.value.tracks.items.map((song) => {
            playlist.value.total_time ? playlist.value.total_time += song.track.duration_ms : playlist.value.total_time = song.track.duration_ms
        })
    }

    function convertTime(){
        let segundosTotales = Math.floor(playlist.value.total_time / 1000);
        let horas = Math.floor(segundosTotales / 3600);
        let minutos = Math.floor((segundosTotales % 3600) / 60);
        let segundos = segundosTotales % 3600 % 60;

        if(horas == 1)
            return `Duración: ${horas} hora, ${minutos} minutos, ${segundos} segundos`
        else{
            return `Duración: ${horas} horas, ${minutos} minutos, ${segundos} segundos`
        }
    }
</script>

<template>
    <section class='contianer-playlist'>
        <article class='playlist' v-if="playlist">
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
                    <p v-if='playlist.total_time'>{{ convertTime() }}</p>
                </div>
            </div>
        
            <ul class='contianer-songs'>
                <div class='song'>
                    <span>nombre</span>
                    <span>añadida el</span>
                    <span>añadida por</span>
                    <span>album</span>
                    <span>duracion</span>
                </div>
                <li class='song' v-for="track of playlist.tracks.items">
                    <div class='song-name'>
                        <span>{{ track.track.name }}</span>
                        <span>{{ track.track.artists[0].name}}</span>
                    </div>
                    <span>{{ track.added_at }}</span>
                    <span>{{ track.added_by.id}}</span>
                    <span v-if="track.track.album.album_type == 'album'">{{ track.track.album.name}}</span>
                    <span >{{ track.track.duration_ms}}</span>
                    <audio controls>
                        <source :src="track.track.preview_url">
                        Tu navegador no soporta el audio
                    </audio>
                </li>
            </ul>
        </article>
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
                @include flex(column, flex-start, flex-start, 1.5rem);

                // margin
                margin: 0;
                padding: 2rem;

                // decoration
                list-style: none;
                background-color: $h-c-white-opacity;
                transform: translateX(-2rem);
                border-radius: 15px;

                .song{
                    // display
                    @include flex(row, center, flex-start, 2.5rem);

                    .song-name{
                        // display
                        @include flex(column, flex-start, flex-start);
                    }
                }
            }
        }
    }
</style>