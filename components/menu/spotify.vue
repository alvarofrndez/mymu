<script setup>
    import { ref } from 'vue'
    import { useFloatModalStore } from '@/stores/float-modal'

    const actual_route = ref(undefined)
    const float_modal_s = useFloatModalStore()
    const emit = defineEmits(['resizeWidth'])
    const max = ref(false)

    function changeRoute(route){
        actual_route.value = route
    }
    
    function changeFloatModal(){
        float_modal_s.can_show = !float_modal_s.can_show
    }

    function resizeWidth(){
        max.value = !max.value
        emit('resizeWidth')
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
        <div class='modal'>
            <span>modal flotante</span>
            <Icon v-if='float_modal_s.can_show' @click='changeFloatModal' class='icon' name="material-symbols:toggle-on" />
            <Icon v-else @click='changeFloatModal' class='icon' name="material-symbols:toggle-off-outline" />
        </div>
        <Icon @click='resizeWidth' class='icon' :name="max ? 'gg:compress-right' : 'gg:expand'" />
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
            width: 85%;
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
                width: calc(60% / 6);
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

        .modal{
            width: max-content;
            
            // display
            @include flex(row, center, center, .3rem);
        }
    }
</style>