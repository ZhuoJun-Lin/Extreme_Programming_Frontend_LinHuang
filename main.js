import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import '@/assets/global.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

//-----------------------------------------------------------
// import axios from "axios";
//
// function getServerConfig() {
//     return new Promise((resolve, reject) => {
//         axios.get('/config.json').then(res => {
//             app.config.globalProperties.$config = res.data;
//             resolve();
//         }).catch(error => {
//             console.log(error);
//             reject()
//         })
//     })
// }
//
// async function init() {
//     await getServerConfig()
// }
// const app = createApp(App)
// app.use(init)
// export const globals = app.config.globalProperties

//-----------------------------------------------------------



 const app = createApp(App)

app.use(router)
app.use(ElementPlus, {
    locale: zhCn,
})

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
// app.config.globalProperties.$baseUrl = import.meta.env.VUE_APP_BASEURL
app.config.globalProperties.$baseUrl = import.meta.env.VITE_APP_BASEURL
app.mount('#app')
