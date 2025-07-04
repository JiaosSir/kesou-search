<template>
    <section class="user-settings">
        <!-- 用户设置 -->
        <div ref="settings" class="user-settings--btn theme-user-settings-hide">
            <!-- 图标 -->
            <el-icon v-show="!isOpen" size="2rem" class="settings-icon" @click="showSettings"><i-ep-Tools /></el-icon>
            <!-- 设置内容 -->
            <section v-show="isOpen" class="settings__content">
                <!-- <h2>{{ loginState ? userInfo.nickName : "欢迎" }}</h2> -->
                <!-- <h2>{{ "欢迎" }}</h2> -->
                <ul class="settings__content--list">
                    <li v-for="item in settingList" :key="item.item" :class="item?.split" @click="openModal(item.title, item.component)">
                        <img :src="item?.icon" class="item-svg"/>
                        <p>{{ item.item }}</p>
                    </li>
                </ul>
            </section>
        </div>
        <!-- 登录状态 -->
        <!-- <div :class="`${loginState?'':'no-login'} login-state theme-user-settings-login-state`" ref="stateDot" @click="showSettings">
            <el-icon v-show="isOpen"><i-ep-Close /></el-icon>
        </div> -->
        <div :class="`login-state theme-user-settings-login-state`" ref="stateDot" @click="showSettings">
            <el-icon v-show="isOpen"><i-ep-Close /></el-icon>
        </div>
    </section>
</template>
<script setup>
    // import { storeToRefs } from 'pinia'
    import { markRaw } from 'vue'
    import { useModalStore } from '@/stores/modal.js'
    // import { useUserStore } from '@/stores/user'
    // import OutLogin from '@/views/Home/components/ModalContent/OutLogin.vue'
    // import ToLogin from '@/views/Home/components/ModalContent/ToLogin.vue'
    import SearchEngine from '@/views/Home/components/ModalContent/SearchEngine.vue'
    import SupportUs from '@/views/Home/components/ModalContent/SupportUs.vue'
    import Wallpaper from '@/views/Home/components/ModalContent/Wallpaper.vue'
    // import SpaceSetting from '@/views/Home/components/ModalContent/SpaceSetting.vue'
    // import UserInfo from '@/views/Home/components/ModalContent/UserInfo.vue'

    /** 
     * store 
    */
    // const { loginState, userInfo } = storeToRefs(useUserStore())
    const { changeModalState, setModal } = useModalStore()

    const isOpen = ref(false)                                             // 是否打开设置页
    const settings  = ref(null)                                           // 设置框实例
    const stateDot = ref(null)                                            // 登录状态实例
    const height = computed(() => '18rem')   // 设置框高度
    // const height = computed(() => loginState.value ? '35rem' : '28rem')   // 设置框高度

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
    // 设置列表wallpaperchange.svg
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
        // {
        //     icon: `<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><g><title>background</title><rect fill="#ffffff00" id="canvas_background" height="22" width="22" y="-1" x="-1"/><g display="none" overflow="visible" y="0" x="0" height="100%" width="100%" id="canvasGrid"><rect fill="url(#gridpattern)" stroke-width="0" y="0" x="0" height="100%" width="100%"/></g></g><g><title>Layer 1</title><rect stroke-width="1.5" transform="rotate(-6 7.551486968994137,8.723778724670405) " stroke="#cccccc" rx="2" id="svg_1" height="14.462242" width="9.977116" y="1.492658" x="2.562928" fill-opacity="0" fill="#0fffff"/><rect stroke-width="1.5" transform="rotate(-6 13.226543426513679,11.515541076660165) " stroke="#ffffff" rx="2" id="svg_3" height="14.462242" width="9.977116" y="4.28442" x="8.237985" fill-opacity="0" fill="#0fffff"/></g></svg>`,
        //     item: '空间设置',
        //     title: '空间设置',
        //     component: markRaw(SpaceSetting)
        // },
        {
            icon: '/help.svg',
            item: '捐赠我们',
            title: '捐赠我们',
            split: 'split-line',
            component: markRaw(SupportUs)
        },
        // {
        //     icon: '<svg t="1718698066197" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14504" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M0 281.6c0-113.1008 96.3328-204.8 215.6032-204.8h592.7936C927.488 76.8 1024 168.704 1024 281.6c0 113.1008-96.3328 204.8-215.6032 204.8H215.6032C96.512 486.4 0 394.496 0 281.6z m51.2 0c0 84.096 73.1136 153.6 164.4032 153.6h592.7936C899.8912 435.2 972.8 365.9008 972.8 281.6c0-84.096-73.1136-153.6-164.4032-153.6H215.6032C124.1088 128 51.2 197.2992 51.2 281.6zM0 742.4c0-113.1008 96.3328-204.8 215.6032-204.8h592.7936C927.488 537.6 1024 629.504 1024 742.4c0 113.1008-96.3328 204.8-215.6032 204.8H215.6032C96.512 947.2 0 855.296 0 742.4z m51.2 0c0 84.096 73.1136 153.6 164.4032 153.6h592.7936C899.8912 896 972.8 826.7008 972.8 742.4c0-84.096-73.1136-153.6-164.4032-153.6H215.6032C124.1088 588.8 51.2 658.0992 51.2 742.4z m768 102.4a102.4 102.4 0 1 0 0-204.8 102.4 102.4 0 0 0 0 204.8zM217.6 384a102.4 102.4 0 1 0 0-204.8 102.4 102.4 0 0 0 0 204.8z" fill="#ffffff" p-id="14505"></path></svg>',
        //     item: computed(() => loginState.value ? '退出登录':'前往登录'),
        //     title: computed(() => loginState.value ? '退出登录':'登录'),
        //     component: computed(() => loginState.value ? markRaw(OutLogin):markRaw(ToLogin))
        // },
    ])
    // const listLen = settingList.value.length

    const openModal = (title, component) => {
        changeModalState()
        setModal(title, component)
    }

    // 监视登录状态变化
    // watch(
    //     loginState,
    //     () => {
    //         if(loginState.value) {
    //             settingList.value.unshift({
    //                 item: '个人中心', 
    //                 title: '个人中心',
    //                 icon: '<svg t="1718698768090" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="62623" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M847.616 192H144.384A79.36 79.36 0 0 0 64 272.384v502.336c0 45.184 35.2 80.32 80.384 80.32h703.232a79.36 79.36 0 0 0 80.384-80.32v-502.4A79.36 79.36 0 0 0 847.616 192z m20.096 582.72a21.632 21.632 0 0 1-20.096 20.096H144.384a21.632 21.632 0 0 1-20.096-20.096v-502.4c0-9.984 10.048-20.032 20.096-20.032h703.232c10.048 0 20.096 10.048 20.096 20.096v502.336zM732.16 493.376H611.52a32.384 32.384 0 0 0-30.08 30.144c0 15.104 15.04 30.144 30.08 30.144h120.576c15.04 0 30.08-15.04 30.08-30.08 0-15.104-9.984-30.208-30.08-30.208z m0-150.656H636.672a32.384 32.384 0 0 0-30.144 30.08c0 15.104 15.04 30.208 30.08 30.208h95.488c15.04 0 30.08-15.104 30.08-30.144 0-15.104-9.984-30.144-30.08-30.144z m-271.232 200.96c25.088-25.152 40.128-55.296 40.128-95.488 0-70.336-60.224-130.56-130.56-130.56-70.336 0-130.56 60.224-130.56 130.56 0 35.2 15.04 70.336 40.128 95.424-55.232 30.144-90.432 90.432-90.432 155.712 0 15.104 15.104 30.144 30.144 30.144 15.104 0 30.144-15.04 30.144-30.08 0-65.344 55.232-120.576 120.576-120.576 65.28 0 120.576 55.232 120.576 120.512 0 15.104 15.04 30.144 30.08 30.144 15.104 0 30.144-15.04 30.144-30.08 0-65.344-35.136-125.632-90.368-155.776zM300.096 448.128c0-40.192 30.08-70.336 70.336-70.336 40.192 0 70.336 30.144 70.336 70.336s-30.144 70.336-70.4 70.336c-40.128 0-70.272-30.144-70.272-70.4z m432 195.904H636.672a32.384 32.384 0 0 0-30.144 30.08c0 15.104 15.04 30.208 30.08 30.208h95.488c15.04 0 30.08-15.104 30.08-30.144 0-15.104-9.984-30.144-30.08-30.144z" p-id="62624"></path></svg>',
    //                 component: UserInfo
    //             })
    //         } else {
    //             if (settingList.value.length > listLen) {
    //                 settingList.value.shift()
    //             }
    //         }
    //     },
    //     {
    //         immediate: true
    //     }
    // )
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
            transform: translate(-5.2rem, 3rem) scale(1.5);
        }
    }
    @keyframes closeState {
        100% {
        }
        0%{
            transform: translate(-5.2rem, 3rem) scale(1.5);
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