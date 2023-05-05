<template>
  <div :ref="(el) => onTriggerRef(el)">
    <slot name="trigger" />
  </div>
  <div v-show="showBody" ref="bodyRef" class="ani-fullscreen-body">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import anime from 'animejs'

const props = defineProps<{
  visible: boolean
}>()

const triggerRef = ref<HTMLElement>()
const bodyRef = ref<HTMLElement>()
const showBody = ref(false)

let clonedTrigger: HTMLElement

const duration = 1000
const easing = 'easeInOutExpo'

function onTriggerRef(el: any) {
  triggerRef.value = el.children[0] as HTMLElement
}

function getStyle(el: any) {
  return {
    width: el.clientWidth,
    height: el.clientHeight,
    left: el.getBoundingClientRect().left,
    top: el.getBoundingClientRect().top,
  }
}

function getScreenStyle() {
  return {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
    left: 0,
    top: 0,
  }
}

function updateStyle(el: any, style: any) {
  for (const k in style) {
    el.style[k] = style[k] + 'px'
  }
}

function initTrigger() {
  if (!triggerRef.value) return

  clonedTrigger = triggerRef.value.cloneNode(true) as HTMLElement
  clonedTrigger.style.position = 'fixed'
  clonedTrigger.style.transition = 'none'
  clonedTrigger.style.margin = '0'
  document.body.appendChild(clonedTrigger)
}

function scaleTrigger(targets: any) {
  updateStyle(clonedTrigger, targets)
}

function initBody() {
  if (!bodyRef.value) return

  bodyRef.value.style.width = document.body.clientWidth + 'px'
  bodyRef.value.style.height = document.body.clientHeight + 'px'
}

function scaleBody(targets: any) {
  if (!bodyRef.value) return

  const _scaleX = targets.width / document.body.clientWidth
  const _scaleY = targets.height / document.body.clientHeight

  bodyRef.value.style.transform = `scale(${_scaleX}, ${_scaleY})`

  bodyRef.value.style.left = targets.left + 'px'
  bodyRef.value.style.top = targets.top + 'px'
}

watch(
  () => props.visible,
  (nv) => {
    if (nv) {
      let count = 0
      const middle = 20

      const targets = getStyle(triggerRef.value)

      anime({
        targets,
        duration,
        easing,
        ...getScreenStyle(),
        begin: () => {
          initTrigger()
        },
        update: () => {
          count++

          if (count < middle) {
            scaleTrigger(targets)
          }

          if (count === middle) {
            initBody()
            scaleBody(targets)

            document.body.removeChild(clonedTrigger)
            showBody.value = true
          }

          if (count > middle) {
            scaleBody(targets)
          }
        },
      })
    } else {
      let count = 0
      const middle = 40

      const targets = getScreenStyle()

      anime({
        targets,
        duration,
        easing,
        ...getStyle(triggerRef.value),
        update: () => {
          count++

          if (count < middle) {
            scaleBody(targets)
          }

          if (count === middle) {
            showBody.value = false

            initTrigger()
            scaleTrigger(targets)
          }

          if (count > middle) {
            scaleTrigger(targets)
          }
        },
        complete() {
          document.body.removeChild(clonedTrigger)
        },
      })
    }
  }
)
</script>

<style scoped>
.ani-fullscreen-body {
  position: fixed;
  transform-origin: left top;
}
</style>
