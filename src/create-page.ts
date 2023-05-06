import { createApp } from 'vue'
import AntD from 'ant-design-vue'
import cmps from './components'

import './style/index.less'
import 'ant-design-vue/dist/antd.css'

export function createPage(Page: any) {
  const app = createApp(Page)

  app.use(AntD).use(cmps).mount('#app')
}
