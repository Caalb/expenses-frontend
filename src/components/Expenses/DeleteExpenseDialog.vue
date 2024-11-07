<template>
  <QDialog v-model="localModelValue">
    <QCard>
      <QCardSection class="row items-center">
        <QIcon
          name="warning"
          color="warning"
          size="24px"
          class="q-mr-sm"
        />
        <span class="text-h6">Confirmar Exclusão</span>
      </QCardSection>

      <QCardSection>
        Tem certeza que deseja excluir esta despesa?
        <div class="text-grey-8 q-mt-sm">
          {{ expense?.description }} - {{ formatCurrency(Number(expense?.amount)) }}
        </div>
      </QCardSection>

      <QCardActions align="right">
        <QBtn
          flat
          label="Cancelar"
          color="grey-6"
          @click="$emit('update:modelValue', false)"
        />
        <QBtn
          flat
          label="Excluir"
          color="negative"
          @click="$emit('confirm')"
          :loading="loading"
        />
      </QCardActions>
    </QCard>
  </QDialog>
</template>

<script setup lang="ts">
import { QDialog, QCard, QCardSection, QCardActions, QBtn, QIcon } from 'quasar'
import type { Expense } from '@/types/expense'
import { ref, watch } from 'vue'

const props = defineProps<{
  modelValue: boolean
  expense: Expense | null
  loading: boolean
}>()

const localModelValue = ref(props.modelValue)

watch(() => props.modelValue, (newValue) => {
  localModelValue.value = newValue
})

watch(localModelValue, (newValue) => {
  emit('update:modelValue', newValue)
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'confirm'): void
}>()

const formatCurrency = (value?: number) => {
  if (!value) return ''
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}
</script>
