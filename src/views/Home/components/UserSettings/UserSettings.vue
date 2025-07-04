<template>
    <section class="user-settings">
        <!-- 用户设置 -->
        <div ref="settings" class="user-settings--btn theme-user-settings-hide">
            <!-- 图标 -->
            <el-icon v-show="!isOpen" size="2rem" class="settings-icon" @click="showSettings"><i-ep-Tools /></el-icon>
            <!-- 设置内容 -->
            <section v-show="isOpen" class="settings__content">
                <ul class="settings__content--list">
                    <li v-for="item in settingList" :key="item.item" :class="item?.split" @click="openModal(item.title, item.component)">
                        <img :src="item?.icon" class="item-svg"/>
                        <p>{{ item.item }}</p>
                    </li>
                </ul>
            </section>
        </div>
        <div :class="`login-state theme-user-settings-login-state`" ref="stateDot" @click="showSettings">
            <el-icon v-show="isOpen"><i-ep-Close /></el-icon>
        </div>
    </section>
</template>
<script setup>
    import { markRaw } from 'vue'
    import { useModalStore } from '@/stores/modal.js'
    import SearchEngine from '@/views/Home/components/ModalContent/SearchEngine.vue'
    import SupportUs from '@/views/Home/components/ModalContent/SupportUs.vue'
    import Wallpaper from '@/views/Home/components/ModalContent/Wallpaper.vue'
    import Settings from '@/views/Home/components/ModalContent/Settings.vue'

    /** 
     * store 
    */
    const { changeModalState, setModal } = useModalStore()

    const isOpen = ref(false)                                             // 是否打开设置页
    const settings  = ref(null)                                           // 设置框实例
    const stateDot = ref(null)                                            // 登录状态实例
    const height = computed(() => '18rem')   // 设置框高度

    // 设置界面展示切换
    const showSettings = () => {
        if (!isOpen.value) {
            settings.value.classList.add('show')        // 添加打开动画 ---- 设置
            stateDot.value.classList.add('openState')   // 添加打开动画 ---- 状态点
        }else {
            // 移除动画
            settings.value.classList.remove('show')  
            stateDot.value.classList.remove('openState')
            // 添加关闭动画
            settings.value.classList.add('hide')      // 设置
            stateDot.value.classList.add('closeState') // 状态点

            setTimeout(() => {
                // 移除动画
                settings.value.classList.remove('hide')
                stateDot.value.classList.remove('closeState')
            }, 300)
        }
        // 变更设置打开状态
        isOpen.value = !isOpen.value
    }
    // 设置列表
    const settingList = ref([
        {
            icon: '/wallpaperchange.svg',
            item: '壁纸更换',
            title: '壁纸更换',
            component: markRaw(Wallpaper)
        },
        {
            icon: '/searchengine.svg',
            item: '搜索引擎',
            title: '搜索引擎',
            component: markRaw(SearchEngine)
        },
        {
            icon: '/settings.svg',
            item: '通用设置',
            title: '通用设置',
            component: markRaw(Settings)
        },
        {
            icon: '/help.svg',
            item: '捐赠我们',
            title: '捐赠我们',
            split: 'split-line',
            component: markRaw(SupportUs)
        },
    ])

    const openModal = (title, component) => {
        changeModalState()
        setModal(title, component)
    }
    defineOptions({
        name: 'UserSettings'
    })
</script>
<style scoped lang="scss">
    .user-settings {
        position: relative;
        min-width: 2.7rem;
        height: 2.7rem;
        &:hover {
            .user-settings__open {
                transform: translate(.2rem, .1rem);
            }
            .login-state {
                transform: translateX(-.2rem) scale(1.2)
            }
        }
        // 用户设置按钮
        &--btn {
            position: absolute;
            top: 0;
            right: 0;
            width: 2.7rem;
            height: 2.7rem;
            border-radius: 50%;
            overflow: hidden;
            transform-origin: center top;
            transition: .2s;

            // 人像图标
            .settings-icon {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
            // 设置的内容
            .settings__content {
                padding: 1rem;
                height: 100%;
                text-align: center;
                display: flex;
                flex-direction: column;
                justify-content: center;

                h2 {
                    align-self: center;
                    height: 10%;
                    font-size: 1.8rem;
                    font-weight: 500;
                    margin-top: .5rem;
                    margin-left: .5rem;
                    margin-bottom: .4rem;
                    max-width: 10.5rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                // 设置项
                &--list {
                    height: 90%;
                    list-style: none;
                    font-size: 1.5rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    border-radius: 1rem;


                    li {
                        padding: .6rem 0;
                        border-radius: .5rem;
                        cursor: pointer;
                        display: flex;
                        align-items: center;

                        &:hover {
                            background: rgb(70, 59, 201);
                        }
                        // svg
                        .item-svg {
                            width: 2rem;
                            height: 2rem;
                            fill: #ffffff;
                            display: flex;
                            align-items: center;
                            margin: 0 1.4rem 0 1rem;
                        }
                        p {
                            white-space: nowrap;
                        }
                    }
                }
            }
        }
        
        // 已登录状态
        .login-state {
            color: #6c11ff;
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            right: -.3rem;
            bottom: -.2rem;
            width: 1.1rem;
            height: 1.1rem;
            border-radius: 50%;
            transition: .2s;
        }
        // 未登录
        .no-login {
            filter:saturate(.2) brightness(1.2);/*饱和度 亮度*/
        }
    }

    /**
     *   动画区
     */
    .show {
        animation: showBlock .3s forwards;
    }
    .hide {
        animation: hideBlock .3s;
    }
    .openState {
        animation: openState .3s forwards;
        &>i {
            opacity: .4;
            transition: .2s
        }
        &:hover {
            filter: brightness(1.2);
            &>i {
                opacity: 1;
                transform: scale(.8);
            }
        }
    }
    .closeState {
        animation: closeState .3s;
    }
    @media only screen and (max-width: 992px) {
        .show {
            animation: showBlockSmall .3s forwards;
        }
        .hide {
            animation: hideBlockSmall .3s;
        }
        .openState {
            animation: openStateSmall .3s forwards;
        }
        .closeState {
            animation: closeStateSmall .3s;
        }
    } 
    // 设置
    @keyframes showBlock {
        0% {
            border-radius: 50%;
            border-radius: 2rem;
        }
        60% {
            width: 14rem;
        }
        100%{
            transform: translate(-25%, 4rem);
            width: 15rem;
            height: v-bind(height);
            border-radius: 1.5rem;
        }
    }
    @keyframes hideBlock {
        100% {
            width: 2.7rem;
            height: 2.7rem;
            border-radius: 50%;
            top: 0;
            right: 0;
            border-radius: 2rem;
        }
        60% {
            width: 4.7rem;
        }
        0%{
            transform: translate(-25%, 4rem);
            width: 15rem;
            height: v-bind(height);
            border-radius: 1.5rem;
        }
    }
    @keyframes showBlockSmall {
        0% {
            border-radius: 50%;
            border-radius: 2rem;
        }
        100%{
            width: 15rem;
            height: v-bind(height);
            border-radius: 1.5rem;
        }
    }
    @keyframes hideBlockSmall {
        100% {
            width: 2.7rem;
            height: 2.7rem;
            border-radius: 50%;
            top: 0;
            right: 0;
            border-radius: 2rem;
        }
        0%{
            width: 15rem;
            height: v-bind(height);
            border-radius: 1.5rem;
        }
    }
    // 状态点
    @keyframes openState {
        // 0% {
            
        // }
        100%{
            transform: translate(-5.3rem, 3rem) scale(1.5);
        }
    }
    @keyframes closeState {
        100% {
        }
        0%{
            transform: translate(-5.3rem, 3rem) scale(1.5);
        }
    }
    @keyframes openStateSmall {
        // 0% {
            
        // }
        100%{
            transform: translate(-1.5rem, -1rem) scale(1.5);
        }
    }
    @keyframes closeStateSmall {
        100% {
        }
        0%{
            transform: translate(-1.5rem, -1rem) scale(1.5);
        }
    }
</style>