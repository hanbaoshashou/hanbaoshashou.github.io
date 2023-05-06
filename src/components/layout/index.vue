<template>
  <a-layout>
    <a-layout-header class="header">
      <a-menu class="menu" v-model:selectedKeys="selectedKeys" mode="horizontal">
        <a-menu-item key="mail"> 文章 </a-menu-item>
        <a-menu-item key="app"> 问答 </a-menu-item>
      </a-menu>
      <a-avatar src="/avatar.jpeg" />
    </a-layout-header>
    <a-layout-content class="content">
      <slot />

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
import { reactive, toRefs } from 'vue'
import { GithubOutlined, MailOutlined } from '@ant-design/icons-vue'

const state = reactive({
  selectedKeys: [],
})

const { selectedKeys } = toRefs(state)

function goGithub() {
  window.open('https://github.com/hanbaoshashou')
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  background: white;
  padding: 0 20vw;

  .menu {
    height: 60px;
    border-bottom: none;
  }
}

.content {
  flex: 1;
  overflow-y: auto;
}

.footer {
  display: flex;
  justify-content: center;
  height: 50px;
  padding: 0;
  margin-bottom: 150px;

  .body {
    width: 60vw;
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
