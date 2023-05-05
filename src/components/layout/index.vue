<template>
  <a-layout>
    <a-layout-header class="header">Header</a-layout-header>
    <a-layout-content class="content">
      <slot />
    </a-layout-content>
  </a-layout>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.header {
  height: 60px;
  background: white;
}
</style>
