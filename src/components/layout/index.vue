<template>
  <a-layout>
    <a-layout-header class="header">
      <div class="container">
        <a-menu class="menu" v-model:selectedKeys="selectedKeys" mode="horizontal">
          <a-menu-item key="mail" @click="goHome"> 文章 </a-menu-item>
        </a-menu>
        <a-avatar src="/avatar.jpeg" />
      </div>
    </a-layout-header>
    <a-layout-content class="content">
      <slot />

      <div class="gitment" id="container"></div>

      <a-layout-footer class="footer">
        <div class="body">
          <a-tooltip title="Github主页">
            <github-outlined class="icon" @click="goGithub" />
          </a-tooltip>

          <a-tooltip title="联系我">
            <a href="mailto: shenshuaijiassj@gmail.com">
              <mail-outlined class="icon" />
            </a>
          </a-tooltip>
        </div>
      </a-layout-footer>
    </a-layout-content>
  </a-layout>
</template>

<script setup lang="ts">
import { reactive, toRefs, onMounted } from 'vue'
import { GithubOutlined, MailOutlined } from '@ant-design/icons-vue'
import Gitment from 'gitment'

import 'gitment/style/default.css'

const state = reactive({
  selectedKeys: [],
})

onMounted(() => {
  const gitment = new Gitment({
    owner: 'hanbaoshashou',
    repo: 'hanbaoshashou.github.io',
    oauth: {
      client_id: 'a9506f0e3f077d86638c',
      client_secret: 'bf5273a1f06358b86398f538c6e20976e98c9cff',
    },
  })

  gitment.render('container')
})

const { selectedKeys } = toRefs(state)

function goGithub() {
  window.open('https://github.com/hanbaoshashou')
}

function goHome() {
  location.href = '/'
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: center;
  height: 60px;
  background: white;

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 800px;
    height: 60px;

    .menu {
      height: 60px;
      border-bottom: none;
    }
  }
}

.content {
  flex: 1;
  overflow-y: auto;

  .gitment {
    width: 800px;
    margin: 0 auto;
  }
}

.footer {
  display: flex;
  justify-content: center;
  height: 50px;
  padding: 0;
  margin-top: 20px;
  margin-bottom: 150px;

  .body {
    width: 800px;
    height: 50px;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    border-top: 1px solid rgba(0, 0, 0, 0.06);
  }

  .icon {
    cursor: pointer;
    margin-left: 20px;
    font-size: 20px;
    color: #656d76;
  }
}
</style>
