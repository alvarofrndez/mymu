<script setup>
    import { ref } from 'vue'

    const actual_route = ref(undefined)

    function changeRoute(route){
        actual_route.value = route
    }

</script>

<template>
    <nav class='menu'>
        <ul>
            <NuxtLink to='/spotify/home' :class="actual_route == 'home' ? 'active' : ''" @click="() => changeRoute('home')"> Inicio</NuxtLink>
            <NuxtLink to='/spotify/artists' :class="actual_route == 'artists' ? 'active' : ''" @click="() => changeRoute('artists')">Artistas</NuxtLink>
            <NuxtLink to='/spotify/playlists' :class="actual_route == 'playlists' ? 'active' : ''" @click="() => changeRoute('playlists')">Playlists</NuxtLink>
            <NuxtLink to='/spotify/tracks' :class="actual_route == 'tracks' ? 'active' : ''" @click="() => changeRoute('tracks')">Canciones</NuxtLink>
            <NuxtLink to='/spotify/albums' :class="actual_route == 'albums' ? 'active' : ''" @click="() => changeRoute('albums')">Albums</NuxtLink>
            <NuxtLink to='/spotify/profile' :class="actual_route == 'profile' ? 'active' : ''" @click="() => changeRoute('profile')">Perfil</NuxtLink>
        </ul>
        <Icon class='icon' name="fluent-mdl2:cancel" />
    </nav>
</template>

<style scoped lang='scss'>
    @import '@/assets/style.scss';

    .menu{
        // size
        width: calc(100% - 2rem);
        height: 5%;

        // position
        position: sticky;
        top: 0;
        z-index: 100;

        // display
        @include flex(row, center, space-between);

        // margin
        padding-left: 1rem;
        padding-right: 1rem;

        // decoration
        background-color: $h-c-black-light;

        ul{
            width: 95%;
            height: 100%;

            // display
            @include flex(row, flex-end, flex-start, .3rem);

            // margin
            margin: 0;
            padding: 0;

            // decoration
            list-style: none;

            a{
                // size
                width: calc(50% / 6);
                height: 75%;

                // display
                @include flex();

                // decoration
                background-color: transparent;
                border-radius: 5px;
                cursor: pointer;

                // transition
                transition: background-color .2s ease-in;

                &:hover{
                    background-color: $h-c-black;
                }
            }

            .active{
                background-color: $h-c-black;
                font-weight: bold;
            }
        }


        .icon{
            cursor: pointer;
        }
    }
</style>