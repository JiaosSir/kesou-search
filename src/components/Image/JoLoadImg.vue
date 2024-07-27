<template>
    <img ref="imgTag":src="src" :alt="alt" :onerror="noResult">
</template>

<script setup>
    const imgTag = ref(null) // img对象
    const noResult = () => { // 修改图片为无
        imgTag.value.src = '/no-result.png'
    }
    const props = defineProps(['src', 'alt', 'width'])
    defineOptions({
        name: 'JoLoadImg'
    })
</script>

<style lang="scss" scoped>
    img {
        width: v-bind(width);
    }
</style>