import { defineStore } from 'pinia'

/**
 *  用户数据管理（需持久化管理）
 */
export const useUserStore = defineStore('user', () => {
    /**
     *  token
     */
    const token = ref('')                       // token
    const setToken = str => token.value = str   // 设置token
    const removeToken = () => {
        token.value = ''
        userInfo.value = {}
    }

    /**
     *  用户信息
     */
    const loginState = computed(() => token.value.length !== 0)   // 登录状态（根据token判断）
    const userInfo = ref({})                                      // 用户基本数据
    const setUserInfo = obj => userInfo.value = obj               // 设置用户数据

    return { token, setToken, removeToken, loginState, userInfo, setUserInfo }
}, {
    persist: true
})
