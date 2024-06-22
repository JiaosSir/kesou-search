<template>
    <teleport to='#app'>
        <transition name="addSeach">
            <section class="add-engine theme-modal" v-show="state">
                <nav class="add-engine-nav">
                    <h3>自定义搜索引擎</h3>
                    <el-icon class="close" size="2rem" @click="closeModal"><i-ep-Close /></el-icon>
                </nav>
            </section>
        </transition>
        <jo-mask :state="state" index="10" blur="2rem"></jo-mask>
    </teleport>
    
</template>

<script setup>
    import { useAddSearchUrl } from '@/hooks/useAddSearchUrl'

    const state = defineModel()
    const closeModal = () => {
        state.value = false
    }

    defineOptions({
        name: 'AddEngine'
    })
</script>

<style lang="scss" scoped>
    .add-engine {
        padding: 2rem 3rem;
        width: 40rem;
        height: 50rem;
        position: absolute;
        z-index: 11;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 2rem;

        &-nav {
            margin-bottom: 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            h3 {
                font-size: 2rem;
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
    .addSeach-enter-active,
    .addSeach-leave-active {
        transition: .1s;
    }
    .addSeach-enter-from,
    .addSeach-leave-to {
        opacity: 0
    }
    .addSeach-enter-to,
    .addSeach-leave-from {
        opacity: 1
    }
</style>