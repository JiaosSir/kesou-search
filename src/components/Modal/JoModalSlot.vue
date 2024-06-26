<template>
    <section class="jo-modal theme-modal" v-show="state">
        <nav class="jo-modal-nav">
            <h3>{{ title }}</h3>
            <el-icon class="close" size="2rem" @click="closeModal"><i-ep-Close /></el-icon>
        </nav>
        <section class="jo-modal-main">
            <slot></slot>
        </section>
    </section>
</template>
<script setup>
    const state = defineModel()
    const closeModal = () => {
        state.value = false
    }
    defineProps({
        title: String
    })
    defineOptions({
        name: 'JoModalSlot'
    })
</script>
<style scoped lang="scss">
    .jo-modal {
        padding: 2rem 3rem;
        min-width: 40rem;
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 10;
        transform: translate(-50%, -50%);
        border-radius: 2rem;
        box-shadow: 0 0 2rem #21212131;

        &-nav {
            margin-bottom: 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            h3 {
                font-size: 2.4rem;
            }
            .close {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 3rem;
                height: 3rem;
                border-radius: .4rem;
                margin-left: auto;
                transition: .2s;
                &:hover {
                    background-color: rgba(199, 199, 199, .5);
                }
            }
        }
        &-main {
            display: flex;
            flex-direction: column;
            align-items: center;
            max-height: 52rem;
            overflow-y: scroll;
            &::-webkit-scrollbar {
                display: none;
            }
        }
    }
</style>