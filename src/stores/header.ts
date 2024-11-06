import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useHeaderStore = defineStore('header', () => {
  const activeSubmenu = ref<string | null>(null)

  const setActiveSubmenu = (submenu: string) => {
    activeSubmenu.value = activeSubmenu.value === submenu ? null : submenu
  }

  const clearSubmenu = () => {
    activeSubmenu.value = null
  }

  return {
    activeSubmenu,
    setActiveSubmenu,
    clearSubmenu,
  }
})
