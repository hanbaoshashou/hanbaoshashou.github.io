<template>
  <layout>
    <div class="page-list">
      <a-list
        class="list"
        item-layout="vertical"
        size="large"
        :pagination="pagination"
        :data-source="listData"
      >
        <template #renderItem="{ item }">
          <a-list-item>
            <a-list-item-meta :description="formateDate(item.date)">
              <template #title>
                <a @click="goPost(item)">{{ item.title }}</a>
              </template>
            </a-list-item-meta>
            {{ item.desc }}
          </a-list-item>
        </template>
      </a-list>
    </div>
  </layout>
</template>

<script lang="ts" setup>
import { reactive, toRefs, onMounted } from 'vue'
import to from 'await-to-js'
import dayjs from 'dayjs'
import qs from 'querystring-es3'
import _ from 'lodash'

const state = reactive({
  listData: [],
})

onMounted(async () => {
  const [err, data] = await to(fetch('/list.json'))

  if (err) return

  const list = await data.json()

  state.listData = _.sortBy(list, 'date').reverse() as any
})

const pagination = {
  onChange: (page: number) => {
    console.log(page)
  },
  pageSize: 10,
}

function goPost(item: any) {
  const query = qs.stringify({
    path: item.path,
    title: item.title,
  })

  location.href = '/post/?' + query
}

function formateDate(date: string) {
  return dayjs(date).format('YYYY年MM月DD日')
}

const { listData } = toRefs(state)
</script>

<style lang="less" scoped>
.page-list {
  .list {
    background-color: white;
    padding: 20px;
  }
}
</style>
