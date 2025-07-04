import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import '@/styles/main.scss'
import JoRow from './layout/JoRow.vue'
import JoCol from './layout/JoCol.vue'
import JoNav from './layout/JoNav.vue'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate) // pinia持久化插件

const app = createApp(App)

// 注册全局组件
app.component('JoRow', JoRow)
   .component('JoCol', JoCol)
   .component('JoNav', JoNav)

app.use(pinia).use(router)


app.mount('#app')
