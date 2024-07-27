<template>
    <section class="support">
        <p>帮帮孩子吧！服务器真的很贵（请理性消费）</p>
        <img src="/support.jpg" alt="">
    </section> 
</template>
<script setup>

    defineOptions({
        name: 'SupportUs'
    })
</script>
<style scoped lang="scss">
    .support {
        width: 50vw;
        margin-bottom: 5rem;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        p {
            font-size: 1.8rem;
            margin: 2rem 0;
        }
        img {
            height: 40rem;
        }
    }
</style>