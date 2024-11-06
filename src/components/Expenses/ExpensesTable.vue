<template>
  <QCard bordered flat>
    <QTable
      :rows="expenses"
      :columns="columns"
      row-key="id"
      :loading="loading"
      :hide-pagination="true"
    >
      <template v-slot:body="props">
        <QTr :props="props">
          <QTd key="description" :props="props">
            {{ props.row.description }}
          </QTd>

          <QTd key="date" :props="props">
            {{ formatDate(props.row.date) }}
          </QTd>

          <QTd key="value" :props="props">
            {{ formatCurrency(props.row.value) }}
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

      <template v-slot:no-data>
        <div class="full-width row flex-center q-pa-md text-grey-6">
          Nenhuma despesa encontrada
        </div>
      </template>
    </QTable>
  </QCard>
</template>

<script setup lang="ts">
import { QCard, QTable, QTr, QTd, QBtn, QTooltip } from 'quasar'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import type { Expense } from '@/types/expense'

defineProps<{
  expenses: Expense[]
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
    name: 'value',
    required: true,
    label: 'Valor',
    align: 'left' as const,
    field: 'value'
  },
  {
    name: 'actions',
    required: true,
    label: 'Ações',
    align: 'right' as const,
    field: 'actions'
  }
]

const formatDate = (date: string) => {
  return format(new Date(date), 'dd/MM/yyyy', { locale: ptBR })
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}
</script>
