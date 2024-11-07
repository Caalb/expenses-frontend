<template>
  <QHeader
    elevated
    class="bg-white text-black"
  >
    <QToolbar>
      <QBtn
        v-if=isMobile
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="toggleLeftDrawer"
      />

      <QToolbarTitle class="flex items-center">
        <span class="text-primary text-weight-bold">Minhas despesas</span>
      </QToolbarTitle>

      <HeaderActions />
    </QToolbar>
  </QHeader>

  <QDrawer
    v-model="leftDrawerOpen"
    side="left"
    bordered
    class="lt-md"
  >
    <MobileMenu />
  </QDrawer>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { QHeader, QToolbar, QToolbarTitle, QBtn, QDrawer } from 'quasar'
import { useWindowSize } from '@vueuse/core'
import HeaderActions from './HeaderActions.vue'
import MobileMenu from './MobileMenu.vue'

const isMobile = computed(() => useWindowSize().width.value <= 768)
const leftDrawerOpen = ref(false)
const toggleLeftDrawer = () => leftDrawerOpen.value = !leftDrawerOpen.value
</script>
