<template>
    <button>{{ value }}</button>
</template>

<script setup>
    const props = defineProps({
        value: [String, Number],
        background: {
            type: String,
            default: '#9d94ff'
        },
        radius: {
            type: String,
            default: '.8rem'
        },
        color: {
            type: String,
            default: '#fff'
        }
    })
</script>

<style lang="scss" scoped>
    button {
        cursor: pointer;
        outline: none;
        border: none;
        width: 100%;
        height: 4rem;
        text-align: center;
        transition: .1s linear;
        font-size: 1.5rem;
        border-radius: v-bind(radius);
        background: v-bind(background);
        color: v-bind(color);
    }
</style>