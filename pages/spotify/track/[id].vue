<script setup>
    import { useRoute } from 'vue-router'
    import { useNuxtApp } from '#app'
    import { onMounted, ref } from 'vue'

    const route = useRoute()
    const track = ref({})
    const can_load = ref(false)
    const { $getTrack, $isSaved } = useNuxtApp()

    definePageMeta({
        middleware: [
        'auth'
        ]
    })

    onMounted(async () => {
        await $getTrack(route.params.id).then(async (answer) => {
            await $isSaved([route.params.id], 'tracks').then((answer_saved) => {
                track.value = answer
                track.value.saved = answer_saved[0]
                can_load.value = true
            })
        })
    })

</script>

<template>
    <section class='container-track' v-if='can_load'>
        <div class='container'>
            <SpotifyTracksCard :track='track'/>
        </div>
    </section>
    <LoaderCircle v-else/>
</template>

<style scoped lang='scss'>
    @import '@/assets/style.scss';
    
    .container-track{
        @include displayContainerSpotify();

        align-self: center;

        // size
        height: 100%;

        .container{
            // size
            width: 40%;

            // diplay
            @include flex();
        }
    }
</style>