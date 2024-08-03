<script setup>
    import { defineProps, onMounted } from 'vue'
    import { useNuxtApp } from '#app'
    import { useFloatModalStore } from '@/stores/float-modal'

    const { $getAlbum, $isSaved } = useNuxtApp()
    const float_modal_s = useFloatModalStore()
    const { data } = defineProps(['data'])
    const album = ref({})

    onMounted(async () => {
        await $getAlbum(data.id).then(async (answer) => {
            await $isSaved([data.id], 'albums').then((answer_saved) => {
                album.value = answer
                album.value.saved = answer_saved[0]
                float_modal_s.data_charged = 'visible'
                console.log(album.value)
            })
        })
    })
</script>

<template>
    <article class='container' v-if='album.name'>
        <div class='container-img'>
            <img v-if='album.images[0]' :src='album.images[0].url' :alt='album.name'>
        </div>
        <div class='container-data'>
            <div>
                <span>{{ album.name }}</span>
                <Icon v-if='album.saved' class='icon' name="material-symbols:favorite" />
                <Icon v-else class='icon' name="material-symbols:favorite-outline" />
            </div>
            <span>{{ album.total_tracks }} canciones</span>
        </div>
    </article>
</template>

<style scoped lang='scss'>
    @import '@/assets/style.scss';

    .container{
        // display
        @include flex(column,center, center, .5rem);
        *{
            // decoration
            color: $h-c-white !important;
        }

        &-img{
            // size
            width: 80px;
            height: 80px;

            // decortion
            border-radius: 10px;
            overflow: hidden;

            img{
                // size
                width: 100%;
                height: 100%;
            }
        }

        &-data{
            // display
            @include flex(column, center, center, .3rem);

            div{
                @include flex(row, center, center, .3rem);
            }
        }
    }

</style>