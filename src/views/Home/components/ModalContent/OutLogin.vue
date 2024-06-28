<template>
    <section class="out-login">
        <p class="txt txt-one">为爱发电</p>
        <p class="txt txt-two">唯有爱与信任不可辜负</p>
        <jo-btn 
            value="退出"
            radius=".5rem"
            background="#766aff"
            @click="outLogin"
        >
        </jo-btn>
        <button class="cancal-btn" @click="changeModalState">取消</button>
    </section>
</template>
<script setup>
import { useModalStore } from '@/stores/modal'
import { useUserStore } from "@/stores/user"
import { setTokenHeader } from '@/utils/request'
import { storeToRefs } from 'pinia'
const { changeModalState } = useModalStore()
const { removeToken } = useUserStore()
const { loginState } = storeToRefs(useUserStore())

// 退出登录
const outLogin = () => {
    removeToken()     // 删除token
    setTokenHeader()  // 重置请求头：token
    changeModalState()
    console.log(loginState.value);
}

defineOptions({
    name: 'OutLogin'
})
</script>
<style scoped lang="scss">
.out-login {
    padding: 0 2rem;
    width: 40rem;
    color: #766aff;
    display: flex;
    flex-direction: column;
    align-items: center;

    .txt {
        font-family: monospace;
        font-size: 1.8rem;
        &-one {
            margin: 1rem 0 .2rem;
        }
        &-two {
            margin-bottom: 3rem;
        }
    }
    .cancal-btn {
        cursor: pointer;
        outline: none;
        border: none;
        color: inherit;
        margin: 1rem 0;
        width: 100%;
        height: 4rem;
        text-align: center;
        transition: .1s linear;
        font-size: 1.5rem;
        border-radius: .5rem;
        background: transparent;
        transition: .3s;
        &:active {
            filter: brightness(.8);
        }
        &:hover {
            background: #bcb9ff;
            color: #fefdff;
        }
    }
}
</style>