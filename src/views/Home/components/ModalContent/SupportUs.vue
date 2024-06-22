<template>
    <section class="support">
        <p>我是贫穷的大学生，救救我吧（请理性消费）</p>
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
        margin-bottom: 5rem;
        text-align: center;
        p {
            font-size: 1.8rem;
            margin: 2rem 0;
        }
        img {
            height: 40rem;
        }
    }
</style>