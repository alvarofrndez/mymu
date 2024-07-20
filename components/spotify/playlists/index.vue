<script setup>
    import { defineProps } from 'vue';

    const {playlists} = defineProps({
        playlists: {
            type: Object,
            required: true
        }
    })

    function startCarrousel(){
        const container_playlists = document.getElementsByClassName('container-carrousel')[0]
        const playlists = document.getElementsByClassName('playlists')[0]
        const items = document.querySelectorAll('.container-playlist')
        const prevBtn = document.getElementsByClassName('prev')[0]
        const nextBtn = document.getElementsByClassName('next')[0]
        let currentIndex = 0
        let last_index = 0
        const playlist_width = 250
        let visibles_playlist = container_playlists.clientWidth / playlist_width


        const updateCarousel = () => {
            playlists.style.transform = `translateX(-${currentIndex * playlist_width}px)`;
        };

        prevBtn.addEventListener('click', function() {
            last_index = currentIndex
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : items.length - visibles_playlist + 1
            updateCarousel();
        });

        nextBtn.addEventListener('click', function() {
            last_index = currentIndex
            currentIndex = (currentIndex < items.length - visibles_playlist) ? currentIndex + 1 : 0;
            updateCarousel();
        });

        updateCarousel();
    }

    // function startCarrousel(){
    //     const playlists = document.getElementsByClassName('playlists')[0];
    //     const items = document.querySelectorAll('.container-playlist');
    //     const prevBtn = document.getElementsByClassName('prev')[0];
    //     const nextBtn = document.getElementsByClassName('next')[0];
    //     let currentIndex = 0;
    //     let last_index = 0
    //     let actual_scroll = 0
    //     let previnterval = null
    //     let nextinterval = null
    //     let left_limit = items.length * 250 *-1
    //     let right_limit = items.length * 250

    //     const updateCarousel = () => {
    //         console.log(actual_scroll)
    //         // playlists.style.transform = `translateX(-${currentIndex * 250}px)`;
    //         playlists.style.transform = `translateX(${actual_scroll}px)`;
    //     };

    //     prevBtn.addEventListener('mouseover', function() {
    //         previnterval = setInterval(() => {
    //             last_index = currentIndex
    //             currentIndex = (currentIndex > 0) ? currentIndex - 1 : items.length - 1;
    //             actual_scroll -= 5
    //             updateCarousel();
    //         }, 10)
    //         if(left_limit < actual_scroll){
    //             actual_scroll -= 5
    //         }else{
    //             actual_scroll = right_limit
    //         }
    //     });

    //     prevBtn.addEventListener('mouseout', function() {
    //         clearInterval(previnterval);
    //     });

    //     nextBtn.addEventListener('mouseover', function() {
    //         nextinterval = setInterval(() => {
    //             last_index = currentIndex
    //             currentIndex = (currentIndex < items.length - 1) ? currentIndex + 1 : 0;
    //             if(right_limit > actual_scroll){
    //                 actual_scroll += 5
    //             }else{
    //                 actual_scroll = 0
    //             }
    //             updateCarousel();
    //         }, 10)
    //     });

    //     nextBtn.addEventListener('mouseout', function() {
    //         clearInterval(nextinterval);
    //     });

    //     updateCarousel();
    // }

    onMounted(() => {
        startCarrousel()
    })
</script>

<template>
    <section class='container-playlists'>
        <h2>Mis Playlists</h2>
        <div class='container-carrousel' v-if="playlists.items[0]">
            <button class="carousel-btn prev">‹</button>
            <ul class='playlists' >
                <Spotify-playlists-detail v-for="playlist in playlists.items" :key="playlist.id" :playlist="playlist"/>
            </ul>
            <button class="carousel-btn next">›</button>
        </div>
        <h3 v-else>No tienes playlists</h3>
    </section>
</template>

<style scoped lang='scss'>
    @import '@/assets/style.scss';

    .container-playlists{
        // size
        width: 100%;

        // display
        @include flex(column, flex-start, flex-start, 3rem);

        .container-carrousel{
            // size
            width: 100%;

            // position
            position: relative;

            // display
            @include flex(row, center, center, 5%);

            padding: 1rem;

            // decoration
            overflow-x: hidden;

            .carousel-btn {
                // position
                position: absolute;
                z-index: 1;
                
                // margin
                padding: 10px;
                
                // border
                background-color: transparent;
                border: none;
                cursor: pointer;
                font-size: $h-f-text-subtitle !important;
            }

            .prev {
                left: 2.5%;
            }

            .next {
                right: 2.5%;
            }

            .playlists{
                // size
                width: 80%;

                // display
                @include flex(row, flex-start, flex-start, 50px);

                // margin
                margin: 0;
                padding: 0;

                // decoration
                list-style: none;
            }
        }
    }
</style>