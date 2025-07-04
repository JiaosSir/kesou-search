<template>
    <section class="wallpaper">
        <!-- 更换壁纸区 -->
        <div class="wallpaper-change">
            <!-- 壁纸 -->
            <div class="wallpaper-change-preview">
                <img :src="wallpaper" alt="壁纸预览" v-show="wallpaper.length > 0">
                <div v-show="wallpaper.length == 0" style="height: 28.3rem;"></div>
            </div>
            <!-- 更换壁纸按钮 -->
            <label for="imgChoice" class="wallpaper-change-btn" :class="disableWallpaper?'disabled':''"><el-icon><i-ep-Plus /></el-icon></label>
            <input ref="fileInput" id="imgChoice" type="file" accept=".jpg, .jpeg, .png" v-show="false"
                :disabled="disableWallpaper" @change="choose">
        </div>
        <p style="opacity: .4;margin: .5rem 0;">(图片不上传云端，为保障本地存储空间，会对图片进行压缩，请见谅)</p>
        <!-- 选项栏 -->
        <div class="wallpaper-disable">
            <ul>
                <li v-for="item in list" :key="item.content">
                    <p>{{ item.content }}</p>
                    <jo-switch v-model="item.value" turnOnBgcolor="#7559ff"></jo-switch>
                </li>
            </ul>
        </div>
    </section>
</template>
<script setup>
    import { storeToRefs } from 'pinia'
    import { useThemeStore } from '@/stores/theme'
    import { useSettigsStore } from '@/stores/settings'

    /**
     *  store
     */
    const { changeWallpaper } = useThemeStore()
    const { wallpaper } = storeToRefs(useThemeStore())
    const { disableWallpaper } = storeToRefs(useSettigsStore())

    /**
     *  文件获取
     */
    const fileInput = ref(null)  // input对象
    // 获取图像文件
    const choose = async () => {
        const currentFiles = fileInput.value.files
        for (const file of currentFiles) {
            const compressRes = await compressImg(file, 0.3) // 压缩图片
            if(compressRes.afterSrc) {                       // 若有afterSrc，证明可压缩，否则不可压缩
                changeWallpaper(compressRes.afterSrc)        // 更改壁纸
            }else {
                const reader = new FileReader()              // 创建 FileReader
                reader.readAsDataURL(compressRes.file)
                reader.onload = () => {
                    changeWallpaper(reader.result)           // 更改壁纸
                }
            }
        }
    }

    /**
    * 压缩图片方法
    * @param {file} file 文件
    * @param {Number} quality 图片质量(取值0-1之间默认0.92)
    */
    const compressImg = (file, quality) => {
        var qualitys = 0.52
        console.log(parseInt((file.size / 1024).toFixed(2)))
        if (parseInt((file.size / 1024).toFixed(2)) < 1024) {
            qualitys = 0.85
        }
        if (5 * 1024 < parseInt((file.size / 1024).toFixed(2))) {
            qualitys = 0.92
        }
        if (quality) {
            qualitys = quality
        }
        if (file[0]) {
            return Promise.all(Array.from(file).map(e => this.compressImg(e,
                qualitys))) // 如果是 file 数组返回 Promise 数组
        } else {
            return new Promise((resolve) => {
                console.log(file)
                if ((file.size / 1024).toFixed(2) < 300) {
                    console.log('小于300不可压缩，当前：' + (file.size / 1024).toFixed(2));
                    resolve({
                        file: file
                    })
                } else {
                    const reader = new FileReader() // 创建 FileReader
                    reader.onload = ({
                        target: {
                            result: src
                        }
                    }) => {
                        const image = new Image() // 创建 img 元素
                        image.onload = async () => {
                            const canvas = document.createElement('canvas') // 创建 canvas 元素
                            const context = canvas.getContext('2d')
                            var targetWidth = image.width
                            var targetHeight = image.height
                            var originWidth = image.width
                            var originHeight = image.height
                            if (1 * 1024 <= parseInt((file.size / 1024).toFixed(2)) && parseInt((file.size / 1024).toFixed(2)) <= 10 * 1024) {
                                var maxWidth = 1600
                                var maxHeight = 1600
                                targetWidth = originWidth
                                targetHeight = originHeight
                                // 图片尺寸超过的限制
                                if (originWidth > maxWidth || originHeight > maxHeight) {
                                    if (originWidth / originHeight > maxWidth / maxHeight) {
                                        // 更宽，按照宽度限定尺寸
                                        targetWidth = maxWidth
                                        targetHeight = Math.round(maxWidth * (originHeight / originWidth))
                                    } else {
                                        targetHeight = maxHeight
                                        targetWidth = Math.round(maxHeight * (originWidth / originHeight))
                                    }
                                }
                            }
                            if (10 * 1024 <= parseInt((file.size / 1024).toFixed(2)) && parseInt((file.size / 1024).toFixed(2)) <= 20 * 1024) {
                                maxWidth = 1400
                                maxHeight = 1400
                                targetWidth = originWidth
                                targetHeight = originHeight
                                // 图片尺寸超过的限制
                                if (originWidth > maxWidth || originHeight > maxHeight) {
                                    if (originWidth / originHeight > maxWidth / maxHeight) {
                                        // 更宽，按照宽度限定尺寸
                                        targetWidth = maxWidth
                                        targetHeight = Math.round(maxWidth * (originHeight / originWidth))
                                    } else {
                                        targetHeight = maxHeight
                                        targetWidth = Math.round(maxHeight * (originWidth / originHeight))
                                    }
                                }
                            }
                            canvas.width = targetWidth
                            canvas.height = targetHeight
                            context.clearRect(0, 0, targetWidth, targetHeight)
                            context.drawImage(image, 0, 0, targetWidth, targetHeight) // 绘制 canvas
                            const canvasURL = canvas.toDataURL('image/jpeg', qualitys)
                            const buffer = atob(canvasURL.split(',')[1])
                            let length = buffer.length
                            const bufferArray = new Uint8Array(new ArrayBuffer(length))
                            while (length--) {
                                bufferArray[length] = buffer.charCodeAt(length)
                            }
                            const miniFile = new File([bufferArray], file.name, {
                                type: 'image/jpeg'
                            })
                            console.log({
                                file: miniFile,
                                origin: file,
                                beforeSrc: src,
                                afterSrc: canvasURL,
                                beforeKB: Number((file.size / 1024).toFixed(2)),
                                afterKB: Number((miniFile.size / 1024).toFixed(2)),
                                qualitys: qualitys
                            })
                            resolve({
                                file: miniFile,
                                origin: file,
                                beforeSrc: src,
                                afterSrc: canvasURL,
                                beforeKB: Number((file.size / 1024).toFixed(2)),
                                afterKB: Number((miniFile.size / 1024).toFixed(2))
                            })
                        }
                        image.src = src
                    }
                    reader.readAsDataURL(file)
                }
            })
        }
    }

    /**
     *   选项栏
     */
    const list = ref([
        {
            content: '关闭壁纸',
            value: disableWallpaper
        }
    ])
    defineOptions({
        name: 'Wallpaper'
    })
</script>
<style scoped lang="scss">
.wallpaper {
    width: 100%;
    padding: 0 2rem;
    // 更换壁纸区
    &-change {
        display: flex;
        justify-content: space-between;
        align-items: center;
        &-preview {
            width: 60%;
            // height: 28.3rem;
            height: 30vh;
            border-radius: 1rem;
            border: .5rem solid #dbd4e8;
            background-color: transparent;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
                height: 100%;
            }
        }
        &-btn {
            transition: .2s;
            width: 8rem;
            height: 8rem;
            border-radius: 50%;
            font-size: 4rem;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            background-color: #7559ff;
            cursor: pointer;
        }
        @media only screen and (max-width: 600px) {
            &-btn {
                width: 6rem;
                height: 6rem;
            }
        }
        .disabled {
            filter: saturate(.5) opacity(0.5);
        }
        
    }
    // 选项栏
    &-disable {
        ul {
            list-style: none;
            margin: 4rem 0;
            li {
                font-size: 1.5rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
        }
    }
}
</style>