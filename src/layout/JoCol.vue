<template>
    <section class="grid-col">
        <slot></slot>
    </section>
</template>
<script setup>
    defineOptions({
        name: 'JoCol'
    })
    const props = defineProps({
        col: {
            type: [String, Number],
            require: true
        }
    })
</script>
<style scoped lang="scss">
    .grid-col {
        float: left;
        width: calc((100% / 12) * v-bind(col));
        height: 100%;
    }
</style>