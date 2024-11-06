<template>
  <QLayout>
    <QPageContainer>
      <router-view />
    </QPageContainer>
  </QLayout>
</template>

<script setup lang="ts">
  import { QLayout, QPageContainer } from 'quasar';
</script>
