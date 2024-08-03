<script setup>
    import { useFloatModalStore } from '@/stores/float-modal'

    const float_modal_s = useFloatModalStore()

</script>

<template>
    <div v-if='float_modal_s.can_show && float_modal_s.is_visible' :class="'modal ' + float_modal_s.data_charged" :style='float_modal_s.modal_styles'>
        <component :is='float_modal_s.modal_component' :data='float_modal_s.modal_props'></component>
    </div>
</template>

<style scoped lang='scss'>
    @import '@/assets/style.scss';

    .modal {
        // size
        width: fit-content;
        height: fit-content;

        // position
        position: absolute;

        // margin
        padding: 15px;

        // decoration
        background: $h-c-black-medium-opacity;
        border-radius: 15px;

    }

    .visible{
        visibility: visible;
    }

    .hidden{
        visibility: hidden;
    }
</style>