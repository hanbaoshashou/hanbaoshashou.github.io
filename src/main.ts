import { createApp } from 'vue'
import AntD from 'ant-design-vue'
import App from './App.vue'
import router from './router'
import cmps from './components'

import './style/index.less'
import 'ant-design-vue/dist/antd.css'

const app = createApp(App)

app.use(router).use(AntD).use(cmps).mount('#app')
