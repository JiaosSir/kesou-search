<template>
    <transition>
        <div class="jo-mask" v-show="state"></div>
    </transition>
</template>
<script setup>
    defineProps({
        state: {
            type: Boolean,
            requie: true
        },
        bgColor: {
            type: String,
            default: 'rgba(100, 100, 100, .35)'
        },
        blur: {
            type: String,
            default: '4rem'
        },
        index: {
            type: String,
            default: '10'
        }
    })
    defineOptions({
        name: 'JoMask'
    })
</script>
<style scoped lang="scss">
    .jo-mask {
        float: left;
        position: absolute;
        inset: 0;
        // width: 100vw;
        // height: 100vh;
        // top: 0;
        // left: 0;
        z-index: v-bind(index);
        background: v-bind(bgColor);
        backdrop-filter: blur(v-bind(blur));
    }
    .v-enter-active,
    .v-leave-active {
        transition: .25s;
    }
    .v-enter-from,
    .v-leave-to {
        opacity: 0
    }
    .v-enter-to,
    .v-leave-from {
        opacity: 1
    }
</style>