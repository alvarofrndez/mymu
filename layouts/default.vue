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
    const max = ref(false)

    function resizeWidth() {
        max.value = !max.value
    }

</script>

<template>

    <div :class="'global-container ' + type">
        <main :class="max ? 'max' : 'min'">
            <Menu-spotify v-if="type == 'spotify'" @resizeWidth="resizeWidth"/>
            <div class='top'></div>
            <section>
                <slot></slot>
            </section>
            <div class='bot'></div>
        </main>
        <Modal-float/>
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
            // decoration
            background-color: $h-c-black-opacity-light;
            overflow-y: scroll;
            animation: open-section 1s ease-in-out;

            @keyframes open-section {
                from{
                    height: 0;
                }
                to{
                    height:85%;
                }
            }

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

        .max{
            // size
            width: 100%;
            height: 100%;

            // decoration
            border-radius: 0;
            box-shadow: none;

            // animation
            animation: resize-width-max 1s ease-in-out;

            @keyframes resize-width-max {
                from{
                    width: 80%;
                    height:85%;
                }
                to{
                    width: 100%;
                    height: 100%;
                }
            }
        }

        .min{
            // size
            width: 80%;
            height: 85%;

            // decoration
            border-radius: 10px;
            box-shadow: 0px 0px 38px 0px $h-c-black;

            // animation
            animation: resize-width-min 1s ease-in-out;

            @keyframes resize-width-min {
                from{
                    width: 100%;
                    height: 100%;
                }
                to{
                    width: 80%;
                    height:85%;
                }
            }
        }
    }

    .spotify{
        // decoration
        background: $h-c-spotify-primary-07;
        background: linear-gradient(0deg, $h-c-spotify-primary-07 0%, $h-c-spotify-primary 50%);
    }
</style>