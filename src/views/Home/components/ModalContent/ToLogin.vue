<template>
    <!-- 登录盒子 -->
    <section :class="`login-box`">
        <form name="loginForm" @submit.prevent="toLogin">
            <p class="remind">手机号</p>
            <input class="input" type="text" v-model="phoneL">
            <p class="remind">密码
                <span class="remind-eye" @click="loginPasswordVisibility = !loginPasswordVisibility">
                    <el-icon v-show="!loginPasswordVisibility"><i-ep-Hide /></el-icon>
                    <el-icon v-show="loginPasswordVisibility"><i-ep-View /></el-icon>
                </span>
            </p>
            <input class="input" :type="!loginPasswordVisibility ? 'password' : 'text'" autocomplete="off"
                v-model="passwordL">
            <div class="noticy">
                <p class="toggle" style="visibility: hidden;">
                    <span>忘记密码</span>
                </p>
                <p class="toggle">没有账号？<span @click="showRegister">去注册</span></p>
            </div>
            <jo-btn value="登录" height="5rem" class="btn login-btn" />
        </form>
    </section>
    <!-- 注册盒子 -->
    <transition name="register">
        <jo-modal-slot title="注册" v-model="registerShow" class="register-modal">
            <template #default>
                <section class="register-box">
                    <form name="registerForm" @submit.prevent="toRegister">
                        <p class="remind">用户昵称</p>
                        <input class="input reg-input" type="text" v-model="nickNameR" placeholder="长度不超过6位">
                        <p class="remind">手机号</p>
                        <input class="input reg-input" type="text" v-model="phoneR">
                        <p class="remind">密码</p>
                        <input class="input reg-input" type="password" autocomplete="off" v-model="passwordR"
                            placeholder="长度6~16，使用英文、数字或!@#$%&-+.?">
                        <p class="remind">确认密码</p>
                        <input class="input reg-input" type="password" autocomplete="off" v-model="passwordAgainR">
                        <div class="noticy">
                            <p class="toggle">
                                <span class="reg-span" @click="closeRegister">← 返回</span>
                            </p>
                        </div>
                        <jo-btn value="注册" height="5rem" class="btn register-btn" />
                    </form>
                </section>
            </template>
        </jo-modal-slot>
    </transition>
</template>
<script setup>
import { setTokenHeader } from '@/utils/request'
import { useModalStore } from '@/stores/modal'
import { Verify } from '@/hooks/useVerify'
import { login, register, getUserInfo } from '@/api/user'
import { useUserStore } from "@/stores/user"

const { changeModalState } = useModalStore()
const { setToken, setUserInfo } = useUserStore()

/**
 *  盒子
 */
const registerShow = ref(false)                  // 注册框显现变量
const loginPasswordVisibility = ref(false)       // 登录密码显现变量
const loginPass = ref(false)                     // 登录校验是否通过
const registerPass = ref(false)                  // 注册校验是否通过
const showRegister = () => {                     // 打开注册框
    registerShow.value = true
}
const closeRegister = () => {                    // 关闭注册框
    registerShow.value = false
}

/**
 *  表单验证
 */
const phoneL = ref('')                           // 手机号---登录
const passwordL = ref('')                        // 密码---登录
const nickNameR = ref('')                        // 昵称---注册
const phoneR = ref('')                           // 手机号---注册
const passwordR = ref('')                        // 密码---注册
const passwordAgainR = ref('')                   // 确认密码---注册
// 校验函数区
const checkPassword = () => {                    // 检查密码格式
    const reg = /^[a-zA-Z0-9!@#$%&-+.?]{6,16}$/
    if (reg.test(passwordR.value.trim())) {
        return 'next'
    } else {
        ElMessage.error('密码不符规范，请重新设置')
        return false
    }
}
const checkPhoneFormatL = () => {               // 检查手机号码格式 --- 登录
    const reg = /^1[3-9]\d{9}$/
    if (reg.test(phoneL.value.trim())) {
        return 'next'
    } else {
        ElMessage.error('手机号码格式错误')
        return false
    }
}
const checkPhoneFormatR = () => {               // 检查手机号码格式 --- 注册
    const reg = /^1[3-9]\d{9}$/
    if (reg.test(phoneR.value.trim())) {
        return 'next'
    } else {
        ElMessage.error('手机号码格式错误')
        return false
    }
}
const checkEmptyL = () => {                      // 检查是否为空 --- 登录
    if (phoneL.value.trim() && passwordL.value.trim()) {
        return 'next'
    } else {
        ElMessage.error('输入不能为空')
        return false
    }
}
const checkEmptyR = () => {                      // 检查是否为空 --- 注册
    if (nickNameR.value.trim() && phoneR.value.trim() && passwordR.value.trim() && passwordAgainR.value.trim()) {
        return 'next'
    } else {
        ElMessage.error('输入不能为空')
        return false
    }
}
const checkNickNameR = () => {                   // 检查昵称格式
    let num = 0
    const reg = /[\u4e00-\u9fa5]/                // 中文匹配
    nickNameR.value.trim().split('').forEach(v => {
        reg.test(v) ? num += 2 : num++           // 中文占2字符，其它占1字符
    })
    if (num <= 12) {
        return 'next'
    } else {
        ElMessage.error('名称长度不符')
        return false
    }
}
const checkSecondPasswordR = () => {             // 检查二次密码
    if (passwordR.value.trim() === passwordAgainR.value.trim()) {
        return 'next'
    } else {
        ElMessage.error('两次密码输入不一致')
        return false
    }
}
const successL = () => {                         // 通过校验 --- 登录
    loginPass.value = true
    return 'next'
}
const successR = () => {                         // 通过校验 --- 注册
    registerPass.value = true
    return 'next'
}
// 登录校验
const toLogin = () => {
    loginPass.value = false
    const rule = new Verify(checkEmptyL)
    rule.addRule(checkPhoneFormatL)
        .addRule(successL)
        .end()
    rule.exec()
    if (!loginPass.value) return false
    else {
        login(phoneL.value.trim(), passwordL.value.trim()).then(res => {
            const data = res.data
            console.log(data);
            if (data.code === 1) {
                ElMessage.success('登录成功')
                setToken(data.data.token)      // 设置token
                setTokenHeader()               // 设置请求头
                getUserInfo().then(res => {    // 发送获取用户数据请求
                    setUserInfo(res.data.data.userInfo)
                })
                changeModalState()
            } else {
                ElMessage.error(data.message)
            }
        }).catch(err => {
            console.log(new Error(err))
        })
    }
}
// 注册校验
const toRegister = () => {
    registerPass.value = false
    const rule = new Verify(checkEmptyR)
    rule.addRule(checkNickNameR)
        .addRule(checkPhoneFormatR)
        .addRule(checkPassword)
        .addRule(checkSecondPasswordR)
        .addRule(successR)
        .end()
    rule.exec()
    if (!registerPass.value) return false
    else {
        register(nickNameR.value.trim(), phoneR.value.trim(), passwordAgainR.value.trim()).then(res => {
            ElMessage.success('注册成功')
            closeRegister()
        }).catch(err => {
            console.log(new Error(err))
        })
    }
}


defineOptions({
    name: 'ToLogin'
})
</script>
<style scoped lang="scss">
$log-color: #8652f5;
$reg-color: #5268f5;

// 盒子
.login-box {
    width: 40rem;
    padding: 0 2rem;
    margin: 0 auto;
    transition: .2s;
}

.register-modal {
    .register-box {
        width: 40rem;
        padding: 0 2rem;
    }
}


// 输入框标题
.remind {
    font-size: 1.4rem;
    display: flex;
    align-items: center;

    &-eye {
        margin-left: .8rem;
        font-size: 1.6rem;
        display: flex;
        align-items: center;
    }
}

.noticy {
    display: flex;
    justify-content: space-between;
    margin: 1rem 0;

    .toggle {
        font-size: 1.3rem;

        span {
            color: $log-color;
            font-size: 1.3rem;
            cursor: pointer;
        }

        .reg-span {
            color: $reg-color;
        }
    }
}


// 输入框
.input {
    font-size: 1.5rem;
    color: inherit;
    width: 100%;
    height: 4.5rem;
    padding: 1rem;
    margin-bottom: 1rem;
    background-color: transparent;
    border: .2rem solid #8e5aff7c;
    border-radius: .5rem;
    outline: none;

    &::placeholder {
        color: inherit;
        opacity: .3;
    }

    &:focus {
        background-color: #8e5aff26;
    }
}

.reg-input {
    border: .2rem solid #5268f57c;

    &:focus {
        background-color: #5268f526;
    }
}


// 按钮
.btn {
    margin-bottom: 1rem;
}

.login-btn {
    background: $log-color;
}

.register-btn {
    background: $reg-color;
}

// 动画
.register-enter-active {
    animation: showRes .2s;
}

.register-leave-active {
    animation: showRes .2s reverse
}

@keyframes hideLog {
    0% {}

    100% {
        transform: rotateZ(-10deg) translate(-9rem, 0);
    }
}

@keyframes showRes {
    0% {
        transform-origin: bottom right;
        transform: rotateZ(10deg) translate(-50%, -50%);
        opacity: 0;
    }

    100% {
        transform-origin: bottom right;
        transform: rotateZ(0) translate(-50%, -50%);
        opacity: 1;
    }
}
</style>