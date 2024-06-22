<template>
    <div class="jo-switch" @click="changeState">
        <div class="jo-switch-btn">
            <slot name="btnIcon"></slot>
        </div>
        <slot name="bgIcon"></slot>
    </div>
</template>
<script setup>
    // 开关状态
    const switchState = defineModel()
    const props = defineProps({
        size: {                // 按钮大小
            type: String,
            default: '3.8rem'
        },
        turnOnBgcolor: {       // 开启状态背景颜色
            type: String,
            default: '#9d94ff'
        },
        turnOffBgcolor: {      // 关闭状态背景颜色
            type: String,
            default: '#dbdbdb'
        },
        turnOnBorderColor: {   // 开启状态按钮边框颜色
            type: String,
        },
        turnOffBorderColor: {  // 关闭状态按钮边框颜色
            type: String,
        },
        turnOnBtnColor: {      // 开启状态按钮颜色
            type: String,
        },
        turnOffBtnColor: {     // 关闭状态按钮颜色
            type: String,
        }
    })
    // 按钮宽高
    const btnSize = computed(() => {
        const regNum = /\d+(\.\d+)?/g
        const regUnit = /[^\d\.]/g
        const w = +props.size.match(regNum)[0]
        const h = w * (2 / 4.5)                         // 宽高比 2: 4.5 
        return h + props.size.match(regUnit).join('')
    })
    // 按钮背景颜色
    const currentBgcolor = computed(() => switchState.value ? props.turnOnBgcolor : props.turnOffBgcolor)
    // 按钮边框颜色
    const currentBordercolor = computed(() => switchComputed(props.turnOnBorderColor, props.turnOffBorderColor, currentBgcolor.value))
    // 按钮颜色
    const currentBtncolor = computed(() => switchComputed(props.turnOnBtnColor, props.turnOffBtnColor, '#fff'))
    // 按钮位置
    const currentX = computed(() => switchState.value ? 'translateX(125%)' : 'translateX(0)')
    // 背景上图标位置
    const bgIconX = computed(() => !switchState.value ? 'translateX(105%)' : 'translateX(0)')
    // 改变开关状态
    const changeState = () => {
        if(typeof switchState.value === 'undefined') {
            return false
        }
        switchState.value = !switchState.value
    }
    // 按钮切换检测函数（用于改变样式）
    const switchComputed = (on, off, defaultColor) => {
        if (typeof on === 'undefined' && typeof off === 'undefined'){         // 开/关状态都未传入props，则两个状态都应用默认颜色（defaultColor）
            return defaultColor
        } else if(typeof on !== 'undefined' && typeof off !== 'undefined') {  // 开/关状态都传入props，则开 应用on，关 应用off
            return switchState.value ? on : off
        } else if(typeof on !== 'undefined'){                                 // 开 状态传入props，则开 应用on，关 应用defaultColor
            return switchState.value ? on : defaultColor
        } else if(typeof off !== 'undefined') {                               // 关 状态传入props，则开 应用defaultColor，关 应用off
            return switchState.value ? defaultColor : off
        }
    }

    defineOptions({
        name: 'JoSwitch'
    })
</script>
<style scoped lang="scss">
    .jo-switch {
        position: relative;
        z-index: 1;
        width: v-bind(size);
        background: v-bind(currentBgcolor);
        box-sizing: content-box;
        border: .2rem solid v-bind(currentBordercolor);
        border-radius: 10rem;
        transition: .2s;
        cursor: pointer;

        &-btn {
            position: relative;
            width: v-bind(btnSize);
            height: v-bind(btnSize);
            background: v-bind(currentBtncolor);
            border-radius: 50%;
            transition: inherit;
            transform: v-bind(currentX);
        }

        :slotted(.btnIcon) {
            padding: .2rem;
            position: absolute;
            z-index: 1;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            transition: .2s;
        }

        :slotted(.bgIcon) {
            padding: .2rem;
            position: absolute;
            z-index: -1;
            top: 50%;
            transform: translateY(-50%) v-bind(bgIconX);
            transition: .2s;
        }
    }
</style>