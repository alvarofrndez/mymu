<script setup>
    import { useFloatModalStore } from '@/stores/float-modal'

    const float_modal_s = useFloatModalStore()

</script>

<template>
    <div v-if='float_modal_s.can_show && float_modal_s.is_visible' class='modal' :style='float_modal_s.modal_styles'>
        <slot></slot>
    </div>
</template>

<style scoped lang='scss'>
    .modal {
        width: 200px;
        height: 200px;
        background: white;
        border: 1px solid #ccc;
        padding: 10px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
</style>