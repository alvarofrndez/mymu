<script setup>
    import { useRoute } from 'vue-router'
    import { useNuxtApp } from '#app'
    import { onMounted, ref } from 'vue'

    const route = useRoute()
    const track = ref({})
    const { $getTrack, $isTrackSaved } = useNuxtApp()

    definePageMeta({
        middleware: [
        'auth'
        ]
    })

    onMounted(async () => {
        await $getTrack(route.params.id).then(async (answer) => {
            await $isTrackSaved([route.params.id]).then((answer_saved) => {
                track.value = answer
                track.value.saved = answer_saved[0]
            })
        })
    })

</script>

<template>
    <section class='container-track'>
        <div class='container'>
            <SpotifyTracksCard :track='track'/>
        </div>
    </section>
</template>

<style scoped lang='scss'>
    @import '@/assets/style.scss';

    
    .container-track{
        @include displayContainerSpotify();

        .container{
            // size
            width: 40%;

            // diplay
            @include flex();
        }
    }
</style>