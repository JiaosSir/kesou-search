<template>
    <section class="jo-modal theme-modal">
        <nav class="jo-modal-nav">
            <h3>{{ modalTitle }}</h3>
            <el-icon class="close" size="2rem" @click="closeModal"><i-ep-Close /></el-icon>
        </nav>
        <section class="jo-modal-main">
            <component :is="modalContent"></component>
        </section>
    </section>
</template>
<script setup>
    import { storeToRefs } from 'pinia'
    import { useModalStore } from '@/stores/modal'

    /** 
     * store 
    */
    const { changeModalState } = useModalStore()
    const { modalTitle, modalContent } = storeToRefs(useModalStore())

    const closeModal = () => changeModalState()

    defineProps({
        width: {
            type: String,
            default: '90rem'
        }
    })
    defineOptions({
        name: 'JoModal'
    })
</script>
<style scoped lang="scss">
    .jo-modal {
        padding: 2rem 3rem;
        width: v-bind(width);
        // width: 50vw;
        max-height: 60rem;
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 10;
        transform: translate(-50%, -50%);
        border-radius: 2rem;

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
    }
</style>