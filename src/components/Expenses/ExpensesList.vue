<template>
  <div class="q-pa-md">
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h6">Minhas Despesas</div>
      <QBtn
        color="primary"
        icon="add"
        label="Nova Despesa"
        @click="openCreateModal"
      />
    </div>

    <ExpenseTable
      :expenses="expenses"
      :loading="loading"
      @edit="openEditModal"
      @delete="openDeleteModal"
    />

    <QDialog v-model="showFormModal" @hide="resetForm">
      <QCard style="min-width: 400px">
        <QCardSection class="row items-center q-pb-none">
          <div class="text-h6">{{ isEditing ? 'Editar' : 'Nova' }} Despesa</div>
          <QSpace />
          <QBtn icon="close" flat round dense v-close-popup />
        </QCardSection>

        <QCardSection>
          <ExpenseForm
            :initial-values="formData"
            :is-editing="isEditing"
            :submitting="submitting"
            @submit="onSubmit"
            @cancel="showFormModal = false"
          />
        </QCardSection>
      </QCard>
    </QDialog>

    <DeleteExpenseDialog
      v-model="showDeleteModal"
      :expense="selectedExpense"
      :loading="deleting"
      @confirm="deleteExpense"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { QDialog, QCard, QCardSection, QBtn, QSpace } from 'quasar'
import ExpenseTable from '@/components/Expenses/ExpensesTable.vue'
import ExpenseForm from '@/components/Expenses/ExpenseForm.vue'
import DeleteExpenseDialog from '@/components/Expenses/DeleteExpenseDialog.vue'
import type { Expense, ExpenseFormData } from '@/types/expense'

const $q = useQuasar()

const loading = ref(false)
const submitting = ref(false)
const deleting = ref(false)
const showFormModal = ref(false)
const showDeleteModal = ref(false)
const isEditing = ref(false)
const selectedExpense = ref<Expense | null>(null)
const formData = ref<ExpenseFormData>({
  description: '',
  date: '',
  value: ''
})

const expenses = ref<Expense[]>([
  {
    id: 1,
    description: 'Supermercado',
    date: '2024-03-05',
    value: 256.75
  },
  {
    id: 2,
    description: 'Energia Elétrica',
    date: '2024-03-10',
    value: 189.90
  }
])

const openCreateModal = () => {
  isEditing.value = false
  formData.value = {
    description: '',
    date: '',
    value: ''
  }
  showFormModal.value = true
}

const openEditModal = (expense: Expense) => {
  isEditing.value = true
  selectedExpense.value = expense
  formData.value = {
    description: expense.description,
    date: expense.date,
    value: expense.value.toString()
  }
  showFormModal.value = true
}

const openDeleteModal = (expense: Expense) => {
  selectedExpense.value = expense
  showDeleteModal.value = true
}

const resetForm = () => {
  isEditing.value = false
  selectedExpense.value = null
  formData.value = {
    description: '',
    date: '',
    value: ''
  }
}

const onSubmit = async (values: ExpenseFormData) => {
  try {
    submitting.value = true

    await new Promise(resolve => setTimeout(resolve, 1000))

    if (isEditing.value && selectedExpense.value) {
      const index = expenses.value.findIndex(e => e.id === selectedExpense.value?.id)
      if (index !== -1) {
        expenses.value[index] = {
          ...selectedExpense.value,
          ...values,
          value: Number(values.value)
        }
      }
    } else {
      expenses.value.push({
        id: Math.max(0, ...expenses.value.map(e => e.id)) + 1,
        ...values,
        value: Number(values.value)
      })
    }

    $q.notify({
      type: 'positive',
      message: `Despesa ${isEditing.value ? 'atualizada' : 'criada'} com sucesso!`
    })
    showFormModal.value = false
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: `Erro ao ${isEditing.value ? 'atualizar' : 'criar'} despesa!`
    })
  } finally {
    submitting.value = false
  }
}

const deleteExpense = async () => {
  try {
    deleting.value = true

    await new Promise(resolve => setTimeout(resolve, 1000))

    if (selectedExpense.value) {
      expenses.value = expenses.value.filter(e => e.id !== selectedExpense.value?.id)
    }

    $q.notify({
      type: 'positive',
      message: 'Despesa excluída com sucesso!'
    })
    showDeleteModal.value = false
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: 'Erro ao excluir despesa!'
    })
  } finally {
    deleting.value = false
  }
}
</script>
