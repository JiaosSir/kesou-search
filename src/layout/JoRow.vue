<template>
    <div class="grid-row" @getCol="getCol">
        <slot></slot>
    </div>
</template>
<script setup>
    defineOptions({
        name: 'JoRow'
    })
    const getCol = col => {
        console.log(col)
    }
</script>
<style scoped lang="scss">
    .grid-row {
        width: 100%; 
        display: flex;
        align-items: center;
    }
</style>