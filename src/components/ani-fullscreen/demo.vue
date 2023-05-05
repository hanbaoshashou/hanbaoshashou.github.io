<template>
  <ani-fullscreen :visible="visible">
    <div class="content" @click="onClose">
      <div style="background-color: #ececec; padding: 20px">
        <a-row :gutter="16">
          <a-col :span="8">
            <a-card title="Card title" :bordered="false">
              <p>card content</p>
            </a-card>
          </a-col>
          <a-col :span="8">
            <a-card title="Card title" :bordered="false">
              <p>card content</p>
            </a-card>
          </a-col>
          <a-col :span="8">
            <a-card title="Card title" :bordered="false">
              <p>card content</p>
            </a-card>
          </a-col>
        </a-row>
      </div>
    </div>

    <template #trigger>
      <a-card hoverable style="width: 240px" @click="onOpen">
        <template #cover>
          <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
        </template>
        <a-card-meta title="Europe Street beat">
          <template #description>www.instagram.com</template>
        </a-card-meta>
      </a-card>
    </template>
  </ani-fullscreen>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AniFullscreen from './index.vue'

const visible = ref(false)

function onOpen() {
  visible.value = true
}

function onClose() {
  visible.value = false
}
</script>

<style lang="less" scoped>
.content {
  background-color: lightblue;
  width: 100%;
  height: 100%;
}

.app-icon {
  display: inline-block;
  width: 50px;
  height: 50px;
  border-radius: 10px;
  background-color: yellow;
}
</style>
