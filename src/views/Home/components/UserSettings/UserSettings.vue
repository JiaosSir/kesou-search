<template>
    <section class="user-settings">
        <!-- 用户设置 -->
        <div ref="settings" class="user-settings--btn theme-user-settings-hide">
            <!-- 图标 -->
            <el-icon v-show="!isOpen" size="2rem" class="settings-icon" @click="showSettings"><i-ep-UserFilled /></el-icon>
            <!-- 设置内容 -->
            <section v-show="isOpen" class="settings__content">
                <h2>{{ loginState ? userInfo.nickName : "欢迎" }}</h2>
                <ul class="settings__content--list">
                    <li v-for="item in settingList" :key="item.item" :class="item?.split" @click="openModal(item.title, item.component)">
                        <i v-html="item?.icon" class="item-svg"></i>
                        <p>{{ item.item }}</p>
                    </li>
                </ul>
            </section>
        </div>
        <!-- 登录状态 -->
        <div :class="`${loginState?'':'no-login'} login-state theme-user-settings-login-state`" ref="stateDot" @click="showSettings">
            <el-icon v-show="isOpen"><i-ep-Close /></el-icon>
        </div>
    </section>
</template>
<script setup>
    import { storeToRefs } from 'pinia'
    import { markRaw } from 'vue'
    import { useModalStore } from '@/stores/modal.js'
    import { useUserStore } from '@/stores/user'
    import OutLogin from '@/views/Home/components/ModalContent/OutLogin.vue'
    import ToLogin from '@/views/Home/components/ModalContent/ToLogin.vue'
    import SearchEngine from '@/views/Home/components/ModalContent/SearchEngine.vue'
    import SupportUs from '@/views/Home/components/ModalContent/SupportUs.vue'
    import Wallpaper from '@/views/Home/components/ModalContent/Wallpaper.vue'
    import SpaceSetting from '@/views/Home/components/ModalContent/SpaceSetting.vue'
    import UserInfo from '@/views/Home/components/ModalContent/UserInfo.vue'

    /** 
     * store 
    */
    const { loginState, userInfo } = storeToRefs(useUserStore())
    const { changeModalState, setModal } = useModalStore()

    const isOpen = ref(false)                                             // 是否打开设置页
    const settings  = ref(null)                                           // 设置框实例
    const stateDot = ref(null)                                            // 登录状态实例
    const height = computed(() => loginState.value ? '35rem' : '28rem')   // 设置框高度

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
            icon: `<svg t="1718697599074" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6762" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M373.248 476.16a102.4 102.4 0 0 0 102.4-102.4V102.4a102.4 102.4 0 0 0-102.4-102.4H102.4a102.4 102.4 0 0 0-102.4 102.4v271.36a102.4 102.4 0 0 0 102.4 102.4h270.848zM102.4 342.9376V133.188267a31.675733 31.675733 0 0 1 31.6416-31.6416h208.554667a31.675733 31.675733 0 0 1 31.675733 31.6416v209.749333a31.675733 31.675733 0 0 1-31.675733 31.675733H133.256533A31.6416 31.6416 0 0 1 102.4 342.9376z m819.2 208.4864h-266.24a102.4 102.4 0 0 0-102.4 102.4V921.6a102.4 102.4 0 0 0 102.4 102.4H921.6a102.4 102.4 0 0 0 102.4-102.4v-266.24a102.4 102.4 0 0 0-102.4-103.936z m3.9936 340.548267a32.256 32.256 0 0 1-32.256 32.256h-209.749333a32.256 32.256 0 0 1-32.256-31.061334v-209.7152a32.256 32.256 0 0 1 32.256-32.290133h209.749333a32.256 32.256 0 0 1 32.256 32.290133v208.520534z m-455.0656 12.219733A276.48 276.48 0 0 1 194.56 631.808l51.2 44.032c5.461333 4.608 12.322133 7.168 19.456 7.168a30.72 30.72 0 0 0 19.456-54.272l-102.4-83.968a30.208 30.208 0 0 0-38.4 0l-102.4 83.456a30.958933 30.958933 0 0 0 38.912 48.128l51.2-41.472a337.92 337.92 0 0 0 337.408 330.752 30.72 30.72 0 1 0 0-61.44h1.536zM802.816 256a276.48 276.48 0 0 1 38.912 137.728L787.968 348.16a30.72 30.72 0 1 0-39.424 47.104l102.4 83.968c5.461333 4.437333 12.356267 6.826667 19.456 6.656a30.72 30.72 0 0 0 19.456-6.656l102.4-83.456a30.72 30.72 0 0 0 4.608-43.52 30.208 30.208 0 0 0-43.008-4.608l-51.2 41.472a332.731733 332.731733 0 0 0-47.104-165.888A339.456 339.456 0 0 0 563.2 58.368a30.72 30.72 0 0 0 0 61.44 275.456 275.456 0 0 1 239.616 136.192z" p-id="6763"></path></svg>`,
            item: '壁纸更换',
            title: '壁纸更换',
            split: 'split-line',
            component: markRaw(Wallpaper)
        },
        {
            icon: '<svg t="1718698121121" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16462" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M713.8 927H550.9c-19.9 0-36-16.1-36-36v-60.3c0-34.4-28-62.3-62.3-62.3-34.4 0-62.3 28-62.3 62.3V891c0 19.9-16.1 36-36 36H191c-51.4 0-93.2-41.8-93.2-93.2V670.1c0-19.9 16.1-36 36-36h60.8c34.4 0 62.3-28 62.3-62.3 0-34.4-28-62.3-62.3-62.3h-60.8c-19.9 0-36-16.1-36-36V311c0-51.4 41.8-93.2 93.2-93.2h135.3v-25.9c0-70 56.9-126.9 126.9-126.9S580 122 580 191.9v25.9h133.8c51.4 0 93.2 41.8 93.2 93.2v133.9h34c3.5 0 6.8 0.5 10 1.4 28.7 4.3 55.1 18.3 74.9 40 21.4 23.4 33.2 53.8 33.2 85.5 0 31.7-11.8 62.1-33.2 85.5-21.2 23.3-50.1 37.7-81.4 40.8-7.6 0.7-15.2 0.8-22.8 0.2H807v135.6c0 51.3-41.8 93.1-93.2 93.1z m-126.9-72h126.9c11.7 0 21.2-9.5 21.2-21.2V662.2c0-19.9 16.1-36 36-36h52.3c1.2 0 2.3 0.1 3.5 0.2 3.6 0.4 7.2 0.4 10.8 0 28.2-2.7 49.5-26.2 49.5-54.6s-21.3-51.9-49.5-54.6l-2.1-0.3H771c-19.9 0-36-16.1-36-36V311c0-11.7-9.5-21.2-21.2-21.2H544c-19.9 0-36-16.1-36-36v-61.9c0-30.3-24.6-54.9-54.9-54.9-30.3 0-54.9 24.6-54.9 54.9v61.9c0 19.9-16.1 36-36 36H191c-11.7 0-21.2 9.5-21.2 21.2v126.4h24.8c74.1 0 134.3 60.3 134.3 134.3S268.6 706 194.6 706h-24.8v127.7c0 11.7 9.5 21.2 21.2 21.2h127.2v-24.3c0-74.1 60.3-134.3 134.3-134.3s134.3 60.3 134.3 134.3V855z" p-id="16463"></path></svg>',
            item: '搜索引擎',
            title: '搜索引擎',
            component: markRaw(SearchEngine)
        },
        {
            icon: `<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><g><title>background</title><rect fill="#ffffff00" id="canvas_background" height="22" width="22" y="-1" x="-1"/><g display="none" overflow="visible" y="0" x="0" height="100%" width="100%" id="canvasGrid"><rect fill="url(#gridpattern)" stroke-width="0" y="0" x="0" height="100%" width="100%"/></g></g><g><title>Layer 1</title><rect stroke-width="1.5" transform="rotate(-6 7.551486968994137,8.723778724670405) " stroke="#cccccc" rx="2" id="svg_1" height="14.462242" width="9.977116" y="1.492658" x="2.562928" fill-opacity="0" fill="#0fffff"/><rect stroke-width="1.5" transform="rotate(-6 13.226543426513679,11.515541076660165) " stroke="#ffffff" rx="2" id="svg_3" height="14.462242" width="9.977116" y="4.28442" x="8.237985" fill-opacity="0" fill="#0fffff"/></g></svg>`,
            item: '空间设置',
            title: '空间设置',
            component: markRaw(SpaceSetting)
        },
        {
            icon: '<svg t="1718698014038" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11749" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M557.40416 624.80384c-1.76128-0.8192-177.5616-114.33984-240.72192-230.42048a145.85856 145.85856 0 0 1-24.33024-80.83456c0-82.59584 68.54656-149.7088 152.86272-149.7088 60.0064 0 105.472 48.04608 127.1808 72.37632C595.39456 210.2272 639.09888 163.84 699.51488 163.84c84.33664 0 152.84224 67.11296 152.84224 149.7088 0 28.24192-8.64256 56.09472-24.82176 80.83456-58.65472 105.0624-210.98496 210.1248-240.76288 230.01088l-0.94208 0.4096a26.05056 26.05056 0 0 1-14.4384 4.44416c-4.5056 0-9.46176-1.76128-13.98784-4.44416z m104.93952 71.8848l3.56352 7.3728s6.81984 45.48608-87.87968 39.3216c-94.67904-6.144-149.7088-32.3584-174.6944-47.63648-24.96512-15.27808-64.55296 25.3952-24.96512 48.27136 39.56736 22.85568 216.4736 99.00032 289.19808 43.15136 70.12352-53.80096 72.74496-97.9968 50.60608-125.66528-0.75776-0.88064-1.55648-1.67936-2.56-1.90464 8.31488-7.5776 16.42496-15.36 24.35072-23.3472 9.46176-9.68704 31.58016-31.744 60.0064-31.744 9.46176 0 19.3536 2.6624 28.83584 7.92576 28.42624 16.384 39.26016 49.47968 25.25184 75.776-0.4096 1.35168-1.37216 2.17088-1.78176 3.09248 0 0.53248-0.4096 0.53248-0.4096 0.9216l-4.52608 5.79584c-83.37408 104.12032-114.52416 147.84512-125.80864 165.9904-9.48224 15.4624-35.98336 37.10976-60.8256 37.10976H445.19424c-9.89184 0-19.90656-2.68288-28.42624-7.12704h-0.4096l-0.96256-0.9216c-20.72576-12.77952-86.528-50.70848-113.99168-59.5968-13.59872-3.8912-76.63616-6.59456-127.5904-6.59456C145.8176 826.88 122.88 804.41344 122.88 777.0112V660.8896c0-27.42272 22.9376-49.90976 50.95424-49.90976 21.56544 0 40.09984-5.65248 59.47392-11.42784l2.21184-0.9216c22.1184-6.61504 42.41408-12.3904 65.37216-12.3904 81.57184 0 114.52416 23.40864 156.42624 52.59264l2.21184 1.76128a544.44032 544.44032 0 0 0 49.5616 32.6656c17.6128 10.62912 92.8768 18.96448 140.22656 21.66784 4.79232 0.28672 9.09312 0.88064 13.02528 1.76128z" p-id="11750"></path></svg>',
            item: '捐赠我们',
            title: '捐赠我们',
            split: 'split-line',
            component: markRaw(SupportUs)
        },
        {
            icon: '<svg t="1718698066197" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14504" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M0 281.6c0-113.1008 96.3328-204.8 215.6032-204.8h592.7936C927.488 76.8 1024 168.704 1024 281.6c0 113.1008-96.3328 204.8-215.6032 204.8H215.6032C96.512 486.4 0 394.496 0 281.6z m51.2 0c0 84.096 73.1136 153.6 164.4032 153.6h592.7936C899.8912 435.2 972.8 365.9008 972.8 281.6c0-84.096-73.1136-153.6-164.4032-153.6H215.6032C124.1088 128 51.2 197.2992 51.2 281.6zM0 742.4c0-113.1008 96.3328-204.8 215.6032-204.8h592.7936C927.488 537.6 1024 629.504 1024 742.4c0 113.1008-96.3328 204.8-215.6032 204.8H215.6032C96.512 947.2 0 855.296 0 742.4z m51.2 0c0 84.096 73.1136 153.6 164.4032 153.6h592.7936C899.8912 896 972.8 826.7008 972.8 742.4c0-84.096-73.1136-153.6-164.4032-153.6H215.6032C124.1088 588.8 51.2 658.0992 51.2 742.4z m768 102.4a102.4 102.4 0 1 0 0-204.8 102.4 102.4 0 0 0 0 204.8zM217.6 384a102.4 102.4 0 1 0 0-204.8 102.4 102.4 0 0 0 0 204.8z" fill="#ffffff" p-id="14505"></path></svg>',
            item: computed(() => loginState.value ? '退出登录':'前往登录'),
            title: computed(() => loginState.value ? '退出登录':'登录'),
            component: computed(() => loginState.value ? markRaw(OutLogin):markRaw(ToLogin))
        },
    ])
    const listLen = settingList.value.length

    const openModal = (title, component) => {
        changeModalState()
        setModal(title, component)
    }

    // 监视登录状态变化
    watch(
        loginState,
        () => {
            if(loginState.value) {
                settingList.value.unshift({
                    item: '个人中心', 
                    title: '个人中心',
                    icon: '<svg t="1718698768090" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="62623" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M847.616 192H144.384A79.36 79.36 0 0 0 64 272.384v502.336c0 45.184 35.2 80.32 80.384 80.32h703.232a79.36 79.36 0 0 0 80.384-80.32v-502.4A79.36 79.36 0 0 0 847.616 192z m20.096 582.72a21.632 21.632 0 0 1-20.096 20.096H144.384a21.632 21.632 0 0 1-20.096-20.096v-502.4c0-9.984 10.048-20.032 20.096-20.032h703.232c10.048 0 20.096 10.048 20.096 20.096v502.336zM732.16 493.376H611.52a32.384 32.384 0 0 0-30.08 30.144c0 15.104 15.04 30.144 30.08 30.144h120.576c15.04 0 30.08-15.04 30.08-30.08 0-15.104-9.984-30.208-30.08-30.208z m0-150.656H636.672a32.384 32.384 0 0 0-30.144 30.08c0 15.104 15.04 30.208 30.08 30.208h95.488c15.04 0 30.08-15.104 30.08-30.144 0-15.104-9.984-30.144-30.08-30.144z m-271.232 200.96c25.088-25.152 40.128-55.296 40.128-95.488 0-70.336-60.224-130.56-130.56-130.56-70.336 0-130.56 60.224-130.56 130.56 0 35.2 15.04 70.336 40.128 95.424-55.232 30.144-90.432 90.432-90.432 155.712 0 15.104 15.104 30.144 30.144 30.144 15.104 0 30.144-15.04 30.144-30.08 0-65.344 55.232-120.576 120.576-120.576 65.28 0 120.576 55.232 120.576 120.512 0 15.104 15.04 30.144 30.08 30.144 15.104 0 30.144-15.04 30.144-30.08 0-65.344-35.136-125.632-90.368-155.776zM300.096 448.128c0-40.192 30.08-70.336 70.336-70.336 40.192 0 70.336 30.144 70.336 70.336s-30.144 70.336-70.4 70.336c-40.128 0-70.272-30.144-70.272-70.4z m432 195.904H636.672a32.384 32.384 0 0 0-30.144 30.08c0 15.104 15.04 30.208 30.08 30.208h95.488c15.04 0 30.08-15.104 30.08-30.144 0-15.104-9.984-30.144-30.08-30.144z" p-id="62624"></path></svg>',
                    component: UserInfo
                })
            } else {
                if (settingList.value.length > listLen) {
                    settingList.value.shift()
                }
            }
        },
        {
            immediate: true
        }
    )
    defineOptions({
        name: 'UserSettings'
    })
</script>
<style scoped lang="scss">
    .user-settings {
        position: relative;
        z-index: 10;
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
                justify-content: space-between;

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
        animation: showBlock .4s forwards;
    }
    .hide {
        animation: hideBlock .3s;
    }
    .openState {
        animation: openState .4s forwards;
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
    // 设置
    @keyframes showBlock {
        0% {
            width: 2.7rem;
            height: 2.7rem;
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

    // 状态点
    @keyframes openState {
        // 0% {
            
        // }
        100%{
            transform: translate(-500%, 3.5rem) scale(1.5);
        }
    }
    @keyframes closeState {
        100% {
        }
        0%{
            transform: translate(-500%, 3.5rem) scale(1.5);
        }
    }
</style>