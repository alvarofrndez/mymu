<script setup>
    import { defineProps, onMounted } from 'vue'
    import { useNuxtApp } from '#app'
    import { useFloatModalStore } from '@/stores/float-modal'

    const { $getArtist, $isArtistOrUserSaved } = useNuxtApp()
    const float_modal_s = useFloatModalStore()
    const { data } = defineProps(['data'])
    const artist = ref({})

    onMounted(async () => {
        await $getArtist(data.id).then(async (answer) => {
            await $isArtistOrUserSaved([data.id], 'artist').then((answer_saved) => {
                artist.value = answer
                artist.value.saved = answer_saved[0]
                float_modal_s.data_charged = 'visible'
            })
        })
    })
</script>

<template>
    <article class='container' v-if='artist.name'>
        <div class='container-img'>
            <img v-if='artist.images[0]' :src='artist.images[0].url' :alt='artist.name'>
        </div>
        <div class='container-data'>
            <div>
                <span>{{ artist.name }}</span>
                <Icon v-if='artist.saved' class='icon' name="material-symbols:favorite" />
                <Icon v-else class='icon' name="material-symbols:favorite-outline" />
            </div>
            <span>{{ artist.followers.total }} seguidores</span>
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