<template>
  <QLayout view="hHh lpR fFf">
    <AppHeader />

    <QPageContainer>
      <QPage padding>

      </QPage>
    </QPageContainer>
  </QLayout>
</template>

<script setup lang="ts">
import { QLayout, QPageContainer, QPage } from 'quasar'
import AppHeader from '@/components/header/AppHeader.vue'
</script>