<template>
  <a-layout>
    <a-layout-header class="header">
      <div class="header-body">
        <a-menu class="menu" v-model:selectedKeys="selectedKeys" mode="horizontal">
          <a-menu-item key="mail" @click="goHome"> 文章 </a-menu-item>
        </a-menu>
        <a-avatar src="/avatar.jpeg" />
      </div>
    </a-layout-header>
    <a-layout-content class="content">
      <div class="content-body">
        <slot />

        <div id="gittalk"></div>

        <a-layout-footer class="footer">
          <div class="footer-body">
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
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script setup lang="ts">
import { reactive, toRefs, onMounted } from 'vue'
import { GithubOutlined, MailOutlined } from '@ant-design/icons-vue'
import Gitalk from 'gitalk'
import { initAnalysis } from '@/util'
import md5 from 'blueimp-md5'
import 'gitalk/dist/gitalk.css'

const state = reactive({
  selectedKeys: [],
})

onMounted(() => {
  const gitalk = new Gitalk({
    id: md5(location.pathname + location.search),
    owner: 'hanbaoshashou',
    repo: 'hanbaoshashou.github.io',
    admin: ['hanbaoshashou'],
    clientID: 'a9506f0e3f077d86638c',
    clientSecret: 'bf5273a1f06358b86398f538c6e20976e98c9cff',
  })

  gitalk.render('gittalk')

  initAnalysis()
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
.auto-width {
  width: 100%;
  max-width: 800px;
}

.header {
  display: flex;
  justify-content: center;
  height: 60px;
  background: white;
  padding: 0;

  .header-body {
    .auto-width;
    padding-left: 0;
    padding-right: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
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
  width: 100vw;

  .content-body {
    .auto-width;
    margin: 0 auto;
    padding: 20px 10px 100px 10px;
  }
}

.footer {
  display: flex;
  flex-direction: row-reverse;
  height: 50px;
  padding: 0;
  margin-top: 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);

  .footer-body {
    height: 50px;
    display: flex;
    align-items: center;
    .icon {
      cursor: pointer;
      margin-left: 20px;
      font-size: 20px;
      color: #656d76;
    }
  }
}
</style>
