import { App } from 'vue'
import Layout from './layout/index.vue'

export default function (app: App) {
  app.component('layout', Layout)
}
