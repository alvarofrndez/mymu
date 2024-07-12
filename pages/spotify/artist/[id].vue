<script setup>
    import { useRoute } from 'vue-router'
    import { useNuxtApp } from '#app'
    import { onMounted, ref } from 'vue'

    const route = useRoute()

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

        console.log(result)

        return result
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
                <li class='album' v-for="album of filterAlbum(artist.albums.items, album_type.type)" :key='album.id' >
                    <span>{{ album.name }}</span>
                    <span>{{ album.release_date }}</span>
                    <span v-if="album.album_type != 'single'">{{ album.release_date }}</span>
                    <div class='container-artist' v-if="album.artists.length > 1">
                        <span v-for="artist of album.artists">{{ artist.name }}</span>
                    </div>
                    <div class='container-img' v-if="album.images && album.images[0]">
                        <img :src="album.images[0].url" alt="">
                    </div>
                    
                </li>
            </ul>
        </article>
    </section>
    <section v-else>
        cargando...
    </section>
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
                @include flex(column, space-around, space-around, 1.5rem);

                // margin
                margin: 0;
                padding-top: 2rem;
                padding-bottom: 2rem;

                // decoration
                list-style: none;
                background-color: $h-c-white-opacity;
                border-radius: 15px;
            }
        }
    }
</style>