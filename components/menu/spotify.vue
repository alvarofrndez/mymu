<script setup>
    import { useUserStore } from '~/stores/user'

    const user_s = useUserStore()

    let menu_status = ref(true)

    function changeStatusMenu() {
        menu_status.value = !menu_status.value

        if(menu_status.value){
            let section = document.getElementsByClassName("section-container-close")[0]
            let menu = document.getElementsByClassName("menu-global-container-close")[0]
           
            if (section && menu) {
                section.classList.remove("section-container-close")
                menu.classList.remove("menu-global-container-close")

                section.classList.add("section-container-open")
                menu.classList.add("menu-global-container-open")
            }else{
                console.log('no existen')
            }
        }else{
            let section = document.getElementsByClassName("section-container-open")[0]
            let menu = document.getElementsByClassName("menu-global-container-open")[0]

            if (section && menu) {
                section.classList.remove("section-container-open")
                menu.classList.remove("menu-global-container-open")

                section.classList.add("section-container-close")
               menu.classList.add("menu-global-container-close")
            }else{
                console.log('no existen')
            }
        }
    }

</script>

<template>
    <div>
        <div class='icon-menu-container' @click="changeStatusMenu">
            <Icon name="fluent-mdl2:numbered-list-text-mirrored" v-if="!menu_status"/>
            <Icon name="fluent-mdl2:cancel" v-if="menu_status"/>
        </div>
        <nav class='menu-container' v-if="menu_status">
            <div class='app-contianer' title='spotify'>
                <NuxtLink  to='/spotify/home' v-if='user_s.user'>
                    <Icon class='icon' name="grommet-icons:spotify" />
                </NuxtLink>
                <NuxtLink  to='/spotify/home' v-if='user_s.user'>
                    <h2>Spotify</h2>
                </NuxtLink>
            </div>
            <section>
                <h3>Artistas</h3>
                <div class='categories'></div>
            </section>
            <section>
                <h3>Playlists</h3>
                <div class='categories'>
                    <NuxtLink to='/spotify/playlists' v-if='user_s.user'>Todas</NuxtLink>
                    <NuxtLink to='/spotify/playlists' v-if='user_s.user'>Todas</NuxtLink>
                    <NuxtLink to='/spotify/playlists' v-if='user_s.user'>Todas</NuxtLink>
                    <NuxtLink to='/spotify/playlists' v-if='user_s.user'>Todas</NuxtLink>
                </div>
            </section>
            <section>
                <h3>Canciones</h3>
                <div class='categories'></div>
            </section>
            <section>
                <h3>Buscador</h3>
                <div class='categories'></div>
            </section>
            <section>
                <h3>Usuario</h3>
                <div class='categories'>
                    <NuxtLink to='/spotify/profile' v-if='user_s.user'>Perfil</NuxtLink>
                    <NuxtLink to='/spotify/profile' v-if='user_s.user'>Perfil</NuxtLink>
                    <NuxtLink to='/spotify/profile' v-if='user_s.user'>Perfil</NuxtLink>
                </div>
            </section>
        </nav>
    </div>
</template>

<style scoped lang='scss'>
    @import '@/assets/style.scss';

    *{
        color: $h-c-white;
    }

    .icon-menu-container{

        // positon
        position: absolute;
        top: 5%;
        right: 10%;

        // decoration
        cursor: pointer;
    }

    .menu-container{
        // size
        width: 80%;
        height: 80%;

        // display
        @include flex(column, flex-start, space-between, 1.5rem);

        .app-contianer{
            // display
            @include flex(row, center, flex-start, .5rem);

            *{
                color: $h-c-spotify-primary;
            }
        }

        section{

            h3{
                // margin
                margin-left: .5rem !important;

                // decoration
                font-weight: normal;
            }

            .categories{
                // display
                @include flex(column, flex-start, center, 1rem);

                // margin
                margin-left: 1.5rem !important;
                margin-top: 1.5rem !important;
            }
        }
    }

</style>