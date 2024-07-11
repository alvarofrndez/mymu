<script setup>
    import { useRoute } from 'vue-router'
    import { useNuxtApp } from '#app'
    import { onMounted, ref } from 'vue'

    const route = useRoute()

    const { $getArtist, $spotifyApi, $spotifyApiFullUrl } = useNuxtApp()
    const artist = ref(null)
    const data_charged = ref(false)

    onMounted(async () => {
        artist.value = await $getArtist(route.params.id)
        await getArtistAlbums().then((answer) => {
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

    function findAlbums(albums){
        let result = albums.find((album) => album.album_type == 'album')

        console.log(result)
        return result
    }

    function findSingles(singles){
        let result = singles.find((single) => single.album_type == 'single')

        console.log(result)
        return result
    }

    function findCompilations(compilations){
        let result = compilations.find((compilation) => compilation.album_type == 'compilation')

        console.log(result)
        return result
    }
</script>

<template>
    <section class='contianer-artist' v-if='data_charged'>
        <!-- 
            artist.followers.total
            artist.name
            artist.images[0].url
            v-for artist.genres
            find artist.albums.items where album_type == album
            find artist.albums.items where album_type == single
        -->
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
        
            <ul class='contianer-albums'>
                <h2>Albums</h2>
                <li class='album' v-for="album of findAlbums(artist.albums.items)" :key='album.id' >
                    {{ album.name }}
                    {{ album.album_type }}
                </li>
            </ul>
            <ul class='contianer-singles'>
                <h2>Singles</h2>
                <li class='single' v-for="single of findSingles(artist.albums.items)" :key='single.id' >
                    {{ single.name }}
                </li>
            </ul>
            <ul class='contianer-compilations'>
                <h2>Compilations</h2>
                <li class='compilation' v-for="compilation of findCompilations(artist.albums.items)" :key='compilation.id'>
                    {{ compilation.name }}
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

            .contianer-albums, .contianer-singles, .contianer-compilations{
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