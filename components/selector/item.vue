<script setup>
    import { defineProps } from 'vue'
    import { useRouter } from 'vue-router'

    const router = useRouter()
    const { application } = defineProps({
        application: {
            type: Object,
            required: true
        }
    })

    function navigateTo() {
        router.push(application.url)
    }

</script>

<template>
    <section @click="navigateTo" :class="'selector-item ' + application.name" >
        <h2 >{{ application.name }}</h2>
    </section>
</template>

<style scoped lang='scss'>
    @import '@/assets/style.scss';

    .selector-item{
        // size
        width: calc(70% / 5);
        height: 70%;

        // display
        @include flex();

        // decoration
        cursor: pointer;
        transform: rotate(15deg);
        background-color: $h-c-black;
        transition: all .3s;

        &:hover{
            transform: rotate(15deg) scale(1.1);
            transition: all .3s;
        }
    }

    .spotify, .apple-music, .amazon-music, .soundcloud, .youtube-music{
        &:hover{
            h2{
                color: $h-c-black;
            }
        }
    }

    .spotify{
        h2{
            color: $h-c-spotify-primary;
        }

        &:hover{
            background-color: $h-c-spotify-primary;
        }
    }

    .apple-music{
        h2{
            color: $h-c-apple-primary;
        }

        &:hover{
            background-color: $h-c-apple-primary;
        }
    }

    .amazon-music{
        h2{
            color: $h-c-amazon-primary;
        }

        &:hover{
            background-color: $h-c-amazon-primary;
        }
    }

    .soundcloud{
        h2{
            color: $h-c-soundcloud-primary;
        }

        &:hover{
            background-color: $h-c-soundcloud-primary;
        }
    }

    .youtube-music{
        h2{
            color: $h-c-youtube-primary;
        }

        &:hover{
            background-color: $h-c-youtube-primary;
        }
    }
</style>