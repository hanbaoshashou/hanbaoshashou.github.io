<template>
  <layout>
    <div class="page">
      <div class="md" v-html="html"></div>
    </div>
  </layout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import to from 'await-to-js'
import { marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import hljs from 'highlight.js'
import { useRoute } from '@/util'

import 'highlight.js/styles/github.css'

marked.use(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code: any, lang: any) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext'
      return hljs.highlight(code, { language }).value
    },
  })
)

const html = ref<string>('')

onMounted(() => {
  fetchData()
  changeTitle()
})

async function fetchData() {
  const { query } = useRoute()

  if (!query.path) return

  const [err, data] = await to(fetch(query.path))

  if (err) return

  const text = await data.text()

  html.value = marked.parse(text)
}

function changeTitle() {
  const { query } = useRoute()

  if (!query.title) return

  document.title = query.title
}
</script>

<style lang="less" scoped>
.page {
  width: 100%;

  .md {
    background: white;
    padding: 40px;
  }
}
</style>
