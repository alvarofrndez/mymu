<script setup>
</script>

<template>
    <nav class='menu'>
        <NuxtLink to='/spotify/home' > Home</NuxtLink>
        <NuxtLink to='/spotify/artists' >Artistas</NuxtLink>
        <NuxtLink to='/spotify/playlists' >Playlists</NuxtLink>
        <NuxtLink to='/spotify/tracks' >Canciones</NuxtLink>
        <NuxtLink to='/spotify/albums' >Albums</NuxtLink>
        <NuxtLink to='/spotify/profile' >Perfil</NuxtLink>
    </nav>
</template>

<style scoped lang='scss'>
    @import '@/assets/style.scss';

    .menu{
        // size
        width: 100%;
        height: 5%;

        // position
        position: sticky;
        top: 0;
        z-index: 100;

        // display
        @include flex(row, flex-end, flex-start, .3rem);

        // margin
        padding-left: 2rem;
        padding-right: 2rem;

        // decoration
        list-style: none;
        background-color: #171717;
        cursor: pointer;

        a{
            // size
            width: calc(50% / 6);
            height: 80%;

            // display
            @include flex();

            // decoration
            background-color: #000;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
        }
    }

</style>