<script setup>
    import { useRoute } from 'vue-router'
    import { onMounted, ref } from 'vue'

    const route = useRoute()
    let type = ref(undefined)

    onMounted(async () => {
        type.value = route.path.split('/')[1]
    })

</script>

<template>
    <main class='container'>
        <Menu-spotify class='menu-global-container-open' v-if="type == 'spotify'"/>
        <section class='section-container-open'>
            <slot></slot>
        </section>
    </main>
</template>

<style scoped lang='scss'>
    @import '@/assets/style.scss';

    .container{
        // size
        width: 100%;
        height: 100%;

        // display
        @include flex(row, center, flex-start);

        // decoration
        background-color: $h-c-black-opacity;

        .menu-global-container-open, .menu-global-container-close{
            // size
            width: 15%;
            height: 100%;

            // position
            position: relative;

            // display
            @include flex(column, center, space-evenly);

            transition: width .5s;
        }

        .menu-global-container-close{
            // size
            width: 1%;
            height: 1%;
            
            // position
            position: absolute;
            top: 1%;
            left: 1%;
            z-index: 100;

            background-color: transparent;
            
            *{
                color: $h-c-black;
            }
        }

        .section-container-open, .section-container-close{
            // size
            width: 85%;
            height: 100%;

            // position
            z-index: 10;

            // display
            @include flex();

            // decoration
            border-top-left-radius: 20px;
            border-bottom-left-radius: 20px;
            background-color: $h-c-white;

        }

        .section-container-open{
            animation: changewidhtopen .5s;

            @keyframes changewidhtopen {
                0%{
                    width: 100%;
                }
                70%{
                    width: 90%;
                }
                100%{
                    width: 85%;
                }
            }
        }

        .section-container-close{
            // size
            width: 100%;

            border-radius: 0;
        }
    }

</style>