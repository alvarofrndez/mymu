<script setup>
    import { useRoute } from 'vue-router'
    import { onMounted, ref } from 'vue'

    const route = useRoute()
    let type = ref(undefined)

    onMounted(async () => {
        type.value = route.path.split('/')[1]
    })

    definePageMeta({
        layout: [
        'main'
        ]
    })

</script>

<template>

    <div :class="'global-container ' + type">
        <main>
            <Menu-spotify v-if="type == 'spotify'"/>
            <div class='top'></div>
            <section>
                <slot></slot>
            </section>
            <div class='bot'></div>
        </main>
    </div>

</template>

<style scoped lang='scss'>
    @import '@/assets/style.scss';


    .global-container{
        // size
        width: 100%;
        height: 100%;

        // position
        position: relative;

        // display
        @include flex();


        main{
            // size
            width:80%;
            height:85%;

            // decoration
            background-color: #171717ca;
            border-radius: 10px;
            box-shadow: 0px 0px 38px 0px $h-c-black;
            overflow-y: scroll;

            &::-webkit-scrollbar {
                width: 0px; 
            }

            *{
                color: $h-c-white !important;
            }

            div{
                width: 100%;
                height: 1rem;
                background-color: transparent;
                z-index: 100;
            }

            .top{
                position: sticky;
                top: 5%;
            }

            .bot{
                position: sticky;
                bottom: 0;
            }

            section{
                // size
                width: calc(100% - 4rem);
                min-height: calc(95% - 2rem); 

                // display
                @include flex(row, flex-start, center);

                // decoration
                overflow: hidden;
                transform: translateX(2rem);
            }
        }
    }

    .spotify{
        // decoration
        background: $h-c-spotify-primary-07;
        background: linear-gradient(0deg, $h-c-spotify-primary-07 0%, $h-c-spotify-primary 50%);
    }
</style>