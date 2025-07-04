<template>
    <teleport to='#app'>
        <transition name="del">
            <section class="del-engine theme-modal" v-if="state">
                <nav class="del-engine-nav">
                    <div class="del-engine-nav__title">
                        <h3>{{ title }}</h3>
                    </div>
                    <el-icon class="close" size="2rem" @click="closeModal"><i-ep-Close /></el-icon>
                </nav>
                <!-- 内容区 -->
                <section class="del-engine-main">
                    <p>{{ message }}</p>
                </section>
                <jo-btn value="确认" class="confirm-btn" @click="delEngine"/>
                <jo-btn value="取消" class="cancel-btn" @click="closeModal"/>
            </section>
        </transition>
        <jo-mask :state="state" index="10" blur="2rem"></jo-mask>
    </teleport>
</template>

<script setup>
    /**
     *  模态框控制
     */
    const state = defineModel()  // 模态框显隐变量
    const closeModal = () => {   // 关闭模态框
        state.value = false
        emit('cancel')
    }
    const delEngine = () => {    // 确认事件
        state.value = false
        emit('confirm')
    }
    
    const emit = defineEmits(['confirm', 'cancel'])
    defineProps(['title', 'message'])
    defineOptions({
        name: 'MessageConfirm'
    })
</script>

<style lang="scss" scoped>
    .del-engine {
        padding: 2rem 3rem 3rem;
        width: 40rem;
        position: absolute;
        z-index: 11;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 2rem;
        // 导航栏
        &-nav {
            margin-bottom: 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;

            &__title {
                display: flex;
                align-items: center;
                position: relative;
                h3 {
                    font-size: 2rem;
                    margin-right: .5rem;
                }
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
        // 内容区
        &-main {
            padding: 0 1rem;
            margin-bottom: 3rem;
            p {
                font-size: 1.6rem;
            }
        }
        // 确认按钮
        .confirm-btn {
            margin-bottom: .5rem;
            background: transparent;
            color: #fff;
            background: $primary-color;
            &:hover {
                background: $primary-color-dark;
            }
        }
        // 确认按钮
        .cancel-btn {
            background: transparent;
            color: inherit;
            &:hover {
                background: $primary-color-light;
                color: #fff;
            }
        }
    }
    @media only screen and (max-width: 600px) {
        .del-engine {
            width: 30rem;
            &-nav__title>.text {
                width: 30rem;
                left: 80%;
            }
        }
    }
    .del-enter-active,
    .del-leave-active {
        transition: .1s;
    }
    .del-enter-from,
    .del-leave-to {
        opacity: 0
    }
    .del-enter-to,
    .del-leave-from {
        opacity: 1
    }
</style>