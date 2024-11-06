<template>
  <QHeader elevated class="bg-white text-black">
    <QToolbar>
      <QBtn
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
import { ref } from 'vue'
import { QHeader, QToolbar, QToolbarTitle, QBtn, QDrawer } from 'quasar'
import HeaderActions from './HeaderActions.vue'
import MobileMenu from './MobileMenu.vue'

const leftDrawerOpen = ref(false)
const toggleLeftDrawer = () => leftDrawerOpen.value = !leftDrawerOpen.value
</script>