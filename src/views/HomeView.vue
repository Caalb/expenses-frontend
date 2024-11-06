<template>
  <QLayout view="hHh lpR fFf">
    <AppHeader />

    <QPageContainer>
      <QPage padding>
        <ExpensesList />
      </QPage>
    </QPageContainer>
  </QLayout>
</template>

<script setup lang="ts">
import { QLayout, QPageContainer, QPage } from 'quasar'
import AppHeader from '@/components/Header/AppHeader.vue'
import ExpensesList from '@/components/Expenses/ExpensesList.vue';
</script>
