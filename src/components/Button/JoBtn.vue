<template>
    <button :type="type" :formenctype="formenctype">{{ value }}</button>
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
        },
        width: {
            type: String,
            default: '100%'
        },
        height: {
            type: String,
            default: '4rem'
        },
        type: {
            type: String,
        },
        formenctype: {
            type: String,
        }
    })
</script>

<style lang="scss" scoped>
    button {
        cursor: pointer;
        outline: none;
        border: none;
        width: v-bind(width);
        height: v-bind(height);
        text-align: center;
        transition: .1s linear;
        font-size: 1.5rem;
        border-radius: v-bind(radius);
        background: v-bind(background);
        color: v-bind(color);
        &:active {
            filter: brightness(.8);
        }
    }
</style>