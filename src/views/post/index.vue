<template>
  <div v-html="html"></div>
</template>

<script setup lang="ts">
import { markdown } from 'markdown'

const html = markdown.toHTML(`
  ### title 1

  Hello *World*!
`)
</script>

<style scoped></style>
