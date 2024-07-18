<script setup>
    import { useRoute, useRouter } from 'vue-router'
    import { useNuxtApp } from '#app'
    import { onMounted, ref } from 'vue'

    const route = useRoute()
    const router = useRouter()

    const { $getArtist, $spotifyApi, $spotifyApiFullUrl } = useNuxtApp()
    const artist = ref(null)
    const data_charged = ref(false)
    const albums_types = [
        {
            title: 'Albums',
            type: 'album'
        },
        {
            title: 'Singles',
            type: 'single'
        },
        {
            title: 'Compilations',
            type: 'compilation'
        }
    ]

    definePageMeta({
        middleware: [
        'auth'
        ]
    })

    onMounted(async () => {
        artist.value = await $getArtist(route.params.id)
        await getArtistAlbums().then(() => {
            data_charged.value = true
        })
    })

    async function getArtistAlbums(){
        await $spotifyApi(`artists/${artist.value.id}/albums`).then( async (data) => {
            artist.value.albums = data
            
            if(artist.value.albums.next)
                return await getMoreAlbums(artist.value.albums.next)
        })
    }

    async function getMoreAlbums(url){
        $spotifyApiFullUrl(url).then(async (new_albums) => {
            artist.value.albums.items = [...artist.value.albums.items, ...new_albums.items]
            artist.value.albums.next = new_albums.next

            if(new_albums.next)
                return await getMoreAlbums(new_albums.next)
            else
                return true
        })
    }

    function filterAlbum(albums, type){
        let result = []

        albums.map((album) => {
            if(album.album_type == type)
                result.push(album)
        })

        return result
    }

    function goTo(album){
        switch(album.album_type){
            case 'album':
                router.push(`/spotify/album/${album.id}`)
                break
            case 'single':
                router.push(`/spotify/track/${album.id}`)
                break
            case 'compilation':
                router.push(`/spotify/playlist/${album.id}`)
        }
    }
</script>

<template>
    <section class='contianer-artist' v-if='data_charged'>
        <article class='artist' v-if="artist">
            <div class='artist-info'>
                <div class='container-img' v-if="artist.images && artist.images[0]">
                    <img :src="artist.images[0].url" :alt="artist.name">
                </div>

                <div class='data'>
                    <h1>{{ artist.name }}</h1>
                    <p>{{ artist.followers.total }} seguidores</p>
                    <div>
                        <p v-for='genre of artist.genres' :key='genre'>{{ genre }}</p>
                    </div>
                </div>
            </div>

            <ul v-for="album_type of albums_types" :key="album_type.type" :class="'contianer-' + album_type.type">
                <h2>{{ album_type.title }}</h2>
                <div>
                    <li class='album' v-for="album of filterAlbum(artist.albums.items, album_type.type)" :key='album.id' @click="() => goTo(album)">
                        <div class='container-img' v-if="album.images && album.images[1]">
                            <img :src="album.images[1].url" :alt="album.name">
                        </div>
                        <b>{{ album.name }}</b>
                        <div class='date'>
                            <span>{{ album.release_date.slice(0, 4) }}</span>
                            <span v-if="album.album_type != 'single'"> - </span>
                            <span v-if="album.album_type != 'single'">{{ album.total_tracks }} canciones</span>
                        </div>
                        <div class='container-artist' v-if="album.artists.length > 1">
                            <span v-for="artist of album.artists">
                                {{ artist.name }}
                                <span v-if="album.artists.length - 1 != album.artists.indexOf(artist)"> - </span>
                            </span>
                        </div>
                    </li>
                </div>
            </ul>
        </article>
    </section>
    <LoaderCircle v-else/>
</template>

<style scoped lang='scss'>
    @import '@/assets/style.scss';

    .contianer-artist{
        @include displayContainerSpotify();

        // display
        @include flex();

        .artist{
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

            .contianer-album, .contianer-single, .contianer-compilation{
                // size
                width: 100%;

                // display
                @include flex(column, flex-start, flex-start, 2.5rem);

                // margin
                margin: 0;
                padding: 2rem;

                // decoration
                list-style: none;
                background-color: $h-c-white-opacity;
                border-radius: 15px;

                &>div{
                    // display
                    @include flex(row, flex-start, flex-start, 1.5rem);
                    flex-wrap: wrap;

                    li{
                        // size
                        max-width: 200px;

                        // display
                        @include flex(column, flex-start, flex-start, .5rem);

                        // margin
                        padding: 1rem;

                        // decoration
                        cursor: pointer;
                        border-radius: 15px;

                        .container-img{
                            // size
                            width: 200px;
                            height: 200px;

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

                        .date{
                            @include flex(row, flex-start, flex-start, .5rem);
                        }

                        &:hover{
                            background-color: $h-c-white;
                        }
                    }
                }
            }
        }
    }
</style>