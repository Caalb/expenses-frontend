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
      :expenses
      :loading
      @edit="openEditModal"
      @delete="openDeleteModal"
    />

    <QDialog v-model="showFormModal" @hide="resetForm">
      <QCard style="min-width: 400px">
        <QCardSection class="row items-center q-pb-none">
          <div class="text-h6">{{ isEditing ? 'Editar' : 'Nova' }} Despesa</div>
          <QSpace />

          <QBtn icon="close" flat round dense @click="showFormModal = false" />
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
      @confirm="handleDeleteExpense"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, type Ref} from 'vue'
import { useQuasar } from 'quasar'
import { QDialog, QCard, QCardSection, QBtn, QSpace } from 'quasar'
import ExpenseTable from '@/components/Expenses/ExpensesTable.vue'
import ExpenseForm from '@/components/Expenses/ExpenseForm.vue'
import DeleteExpenseDialog from '@/components/Expenses/DeleteExpenseDialog.vue'
import type { Expense, ExpenseFormData } from '@/types/expense'
import { useExpensesStore } from '@/stores/expenses'
import { errorHandler } from '@/helpers/errorHandler'
import type { AxiosError, AxiosResponse } from 'axios'

const $q = useQuasar()
const { expenses, fetchExpenses, createExpense, updateExpense, deleteExpense} = useExpensesStore()

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
  amount: 0
})


const openCreateModal = () => {
  isEditing.value = false
  formData.value = {
    description: '',
    date: '',
    amount: 0
  }

  showFormModal.value = true
}

const openEditModal = (expense: Expense) => {
  isEditing.value = true
  selectedExpense.value = expense
  formData.value = {
    description: expense.description,
    date: expense.date,
    amount: expense.amount
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
    amount: 0
  }
}

type ExpenseOperation = (values?: ExpenseFormData) => Promise<AxiosResponse>

const handleExpenseOperation = async ({
  operation,
  successMessage,
  errorMessage,
  values,
  modalRef,
}: {
  operation: ExpenseOperation
  successMessage: string
  errorMessage: string
  values?: ExpenseFormData
  modalRef: Ref<boolean>
}) => {
  const response = await operation(values) as AxiosResponse | AxiosError

  if (response && ~~((response.status ?? 0) / 100) === 2) {
    $q.notify({
      color: 'positive',
      message: successMessage,
      icon: 'check',
    })

    modalRef.value = false
    resetForm()
    return
  }

  errorHandler(response, errorMessage, $q)
}

const handleUpdateExpense = (values: ExpenseFormData) =>
  handleExpenseOperation({
    operation: () => updateExpense(selectedExpense.value?.id as number, values) as Promise<AxiosResponse>,
    successMessage: 'Despesa atualizada com sucesso!',
    errorMessage: 'Falha ao atualizar despesa',
    values,
    modalRef: showFormModal
  })

const handleDeleteExpense = () =>
  handleExpenseOperation({
    operation: () => deleteExpense(selectedExpense.value?.id as number) as Promise<AxiosResponse>,
    successMessage: 'Despesa excluída com sucesso!',
    errorMessage: 'Falha ao excluir despesa',
    modalRef: showDeleteModal
  })

const handleCreateExpense = (values: ExpenseFormData) =>
  handleExpenseOperation({
    operation: () => createExpense(values) as Promise<AxiosResponse>,
    successMessage: 'Despesa criada com sucesso!',
    errorMessage: 'Falha ao criar despesa',
    values,
    modalRef: showFormModal
  })


const onSubmit = async (values: ExpenseFormData) => {
    submitting.value = true

    if(isEditing.value) {
      return handleUpdateExpense(values)
    }

    handleCreateExpense(values)

    submitting.value = false;
}

onMounted(async () => {
  loading.value = true
  await fetchExpenses()
  loading.value = false
})
</script>
