<template>
  <QCard bordered flat>
    <QTable
      :rows="expenses"
      :columns="columns"
      row-key="id"
      :loading="loading"
      :hide-pagination="true"
      :pagination="{
        rowsPerPage: 0
      }"
    >
      <template #body="props">
        <QTr :props="props">
          <QTd key="description" :props="props">
            {{ props.row.description }}
          </QTd>
          <QTd key="date" :props="props">
            {{ formatDate(props.row.date) }}
          </QTd>

          <QTd key="amount" :props="props">
            {{ formatCurrency(props.row.amount) }}
          </QTd>

          <QTd key="actions" :props="props">
            <div class="row items-center q-gutter-sm justify-end">
              <QBtn
                flat
                round
                color="primary"
                icon="edit"
                size="sm"
                @click="$emit('edit', props.row)"
              >
                <QTooltip>Editar</QTooltip>
              </QBtn>

              <QBtn
                flat
                round
                color="negative"
                icon="delete"
                size="sm"
                @click="$emit('delete', props.row)"
              >
                <QTooltip>Excluir</QTooltip>
              </QBtn>
            </div>
          </QTd>
        </QTr>
      </template>

      <template #no-data>
        <div class="full-width row flex-center q-pa-md text-grey-6">
          Nenhuma despesa encontrada
        </div>
      </template>
    </QTable>
  </QCard>
</template>

<script setup lang="ts">
import { formatDate } from '@/helpers/formatDate'
import { useExpensesStore } from '@/stores/expenses'
import type { Expense } from '@/types/expense'
import { storeToRefs } from 'pinia'
import { QBtn, QCard, QTable, QTd, QTooltip, QTr } from 'quasar'

const expenseStore = useExpensesStore()
const { expenses } = storeToRefs(expenseStore)

defineProps<{
  loading: boolean
}>()

defineEmits<{
  (e: 'edit', expense: Expense): void
  (e: 'delete', expense: Expense): void
}>()

const columns = [
  {
    name: 'description',
    required: true,
    label: 'Descrição',
    align: 'left' as const,
    field: 'description'
  },
  {
    name: 'date',
    required: true,
    label: 'Data',
    align: 'left' as const,
    field: 'date'
  },
  {
    name: 'amount',
    required: true,
    label: 'Valor',
    align: 'left' as const,
    field: 'value'
  },
  {
    name: 'actions',
    required: true,
    label: 'Ações',
    align: 'center' as const,
    field: 'actions',
    headerStyle: 'width: 100px'
  }
]

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}
</script>
