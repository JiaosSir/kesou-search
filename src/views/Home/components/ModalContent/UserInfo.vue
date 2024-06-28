<template>
    <section class="user-info">
        <h2>用户信息展示</h2>
        <h3>昵称：{{ userInfo.nickName }}</h3>
        <h3>手机号：{{ userInfo.userTel.replace(/(\d{3})(\d{4})(\d{4})/, '$1****$3') }}</h3>
    </section>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'

const { userInfo } = storeToRefs(useUserStore())

</script>

<style lang="scss" scoped>
    .user-info {
        padding: 0 2rem;
        width: 100%;

        h3 {
            text-align: center;
        }
    }
</style>