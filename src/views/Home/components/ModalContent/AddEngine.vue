<template>
    <teleport to='#app'>
        <transition name="addSeach">
            <section class="add-engine theme-modal" v-show="state">
                <nav class="add-engine-nav">
                    <div class="add-engine-nav__title">
                        <h3>自定义搜索引擎</h3>
                        <el-icon size="2rem" class="prompt"><i-ep-QuestionFilled /></el-icon>
                        <p class="text">
                            请在您所要添加的搜索引擎上，搜索“test”，并把搜索结果的网址复制到下方方框
                        </p>
                    </div>
                    <el-icon class="close" size="2rem" @click="closeModal"><i-ep-Close /></el-icon>
                </nav>
                <!-- 内容区 -->
                <section class="add-engine-main">
                    <!-- 图标区 -->
                    <section class="add-engine-main--icon">
                        <!-- 标题 -->
                        <h4 class="content-title">引擎图标</h4>
                        <!-- 全部图标选择区 -->
                        <div class="add-engine-main--icon-area">
                            <!-- 单个图标选择区块 -->
                            <div class="area">
                                <!-- 图标区 -->
                                <div class="area-icon">
                                    <jo-load-img class="area-icon-result" :src="searchIcon" alt="搜索引擎" width="5rem"/>
                                </div>
                                <!-- 文字区 -->
                                <p>默认(自动获取)</p>
                            </div>
                        </div>
                    </section>
                    <!-- 填写区 -->
                    <section class="add-engine-main--message">
                        <h4 class="content-title">引擎信息</h4>
                        <input type="text" placeholder="为您的引擎起个名字吧(最长6个字符)" v-model="engineName">
                        <input type="text" placeholder="请填入正确的网址" v-model="engineUrl" @input="spliceUrl">
                    </section>
                </section>
                <jo-btn value="确认" class="confirm-btn" @click="confirmAdd"/>
            </section>
        </transition>
        <jo-mask :state="state" index="10" blur="2rem"></jo-mask>
    </teleport>
</template>

<script setup>
    import { useSearchUrlStore } from '@/stores/searchUrl'
    import { useAddSearchUrl } from '@/hooks/useAddSearchUrl'
    import { Verify } from '@/hooks/useVerify'

    /**
     *  store
     */
    const { addUrl, checkRepeat } = useSearchUrlStore()
    
    /**
     *  模态框控制
     */
    const state = defineModel()  // 模态框显隐变量
    const closeModal = () => {   // 关闭模态框
        state.value = false
        engineName.value = ''
        engineUrl.value = ''
        searchUrl.value = ''
        searchIcon.value = ''
    }

    /**
     *  自定义引擎操作
     */
    const pass = ref(false)                                            // 是否通过校验
    const engineName = ref('')                                         // 自定义引擎名称
    const engineUrl = ref('')                                          // 自定义引擎网址
    const searchUrl = ref('')                                          // 重新拼接好的引擎网址
    const searchIcon = ref('')                                         // 重新拼接好的引擎网址得到的icon网址
    const spliceUrl = () => {                                          // 网址拼接
        const { url, icon } = useAddSearchUrl(engineUrl.value)
        searchUrl.value = url
        searchIcon.value = icon
    }
    const confirmAdd = () => {                                         // 确定添加引擎
        pass.value = false
        // 添加校验
        const rule = new Verify(checkEmpty)
        rule.addRule(checkLength)
            .addRule(checkUrlType)
            .addRule(checkUrlRepeat)
            .addRule(success)
            .end()
        // 开启校验
        rule.exec()
        if (pass.value) {
            // 添加自定义引擎
            addUrl({
                url:  searchUrl.value,
                icon:  searchIcon.value,
                name: engineName.value
            })
            closeModal()
        }
    }
    /**
     * 表单校验函数区
     */
    const checkEmpty = () => {                                        // 检查是否有空值
        if(engineName.value.trim() !== '' && engineUrl.value.trim() !== '') {
            return 'next'
        } else {
            return false
        }
    }
    const checkLength = () => {                                       // 检查名字长度是否相符
        if(engineName.value.trim().length <= 6) {
            return 'next'
        } else {
            return false
        }
        
    }
    const checkUrlType = () => {                                      // 检查是否符合url类型
        try {
            new URL(engineUrl.value)
            return 'next'
        } catch {
            return false
        }
        
    }
    const checkUrlRepeat = () => {                                    // 检查url是否重复
        return checkRepeat(engineUrl.value) ? 'next' : false
    }
    const success = () => {                                           // 所有校验通过后执行的函数
        console.log('pass!!');
        pass.value = true
        return 'next'
    }

    defineOptions({
        name: 'AddEngine'
    })
</script>

<style lang="scss" scoped>
    .add-engine {
        padding: 2rem 3rem 3rem;
        width: 40rem;
        // height: 45rem;
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
                // 提示信息
                .prompt {
                    &:hover+.text {
                        visibility: visible;
                        opacity: 1;
                        transition: all .2s .5s;
                    }
                }
                .text {
                    visibility: hidden;
                    opacity: 0;
                    padding: .3rem 1rem;
                    width: 30rem;
                    border-radius: .5rem;
                    background-color: rgb(174, 146, 255);
                    position: absolute;
                    bottom: 100%;
                    left: 50%;
                    transform: translate(-50%, -.5rem);
                    &::after {
                        content: '';
                        background-color: inherit;
                        width: 1rem;
                        height: 1rem;
                        clip-path: polygon(0 0, 100% 0, 50% 100%, 0 0);
                        border-radius: 0;
                        position: absolute;
                        top: 99%;
                        right: 7.3rem;
                    }
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
            // 图标区
            &--icon {
                // 全部图标选择区
                &-area {
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    // 单个图标选择区块
                    .area {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        // 图标区
                        &-icon {
                            width: 8rem;
                            height: 9rem;
                            border-radius: 1.5rem;
                            border: .2rem solid $primary-color;
                            overflow: hidden;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }
                        // 文字区
                        p {
                            margin-top: .5rem;
                            opacity: .8;
                        }
                    }
                }
            }
            // 填写区
            &--message {
                input {
                    display: block;
                    margin: 0 auto 1.2rem;
                    padding: .5rem 1rem;
                    width: 85%;
                    font-size: 1.5rem;
                    outline: none;
                    border: none;
                    background: transparent;
                    color: inherit;
                    border-bottom: .2rem dotted $primary-color;
                    &::placeholder {
                        opacity: .7;
                    }
                }
            }
            // 统一标题样式
            .content-title {
                font-size: 1.6rem;
                font-weight: 500;
                margin-bottom: 1rem;
            }
        }
        // 确认按钮
        .confirm-btn {
            background: transparent;
            color: inherit;
            &:hover {
                background: $primary-color-dark;
                color: #fff;
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