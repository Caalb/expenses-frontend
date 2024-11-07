import { createExpense as createExpenseApi } from '@/services/expenses/createExpense'
import { fetchExpenses as fetchExpensesApi } from '@/services/expenses/fetchExpenses'
import { deleteExpense as deleteExpenseApi } from '@/services/expenses/deleteExpense'
import { updateExpense as updateExpenseApi } from '@/services/expenses/updateExpense'

import type { Expense } from '@/types/expense'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useExpensesStore = defineStore('expenses', () => {
  const expenses = ref<Expense[]>([])

  const fetchExpenses = async () => {
    try {
      const response = await fetchExpensesApi()

      expenses.value = response

      return response
    } catch (error) {
      return error
    }
  }

  const createExpense = async (expense: Omit<Expense, 'id'>) => {
    try {
      const response = await createExpenseApi(expense)
      expenses.value = [response.data, ...expenses.value]

      return response
    } catch (error) {
      return error
    }
  }

  const updateExpense = async (id: number, expense: Omit<Expense, 'id'>) => {
    try {
      const response = await updateExpenseApi(id, expense)
      expenses.value = expenses.value.map((e) => (e.id === id ? response.data : e))

      return response
    } catch (error) {
      return error
    }
  }

  const deleteExpense = async (id: number) => {
    try {
      const response = await deleteExpenseApi(id)
      expenses.value = expenses.value.filter((e) => e.id !== id)

      return response
    } catch (error) {
      return error
    }
  }

  return {
    expenses,
    fetchExpenses,
    createExpense,
    updateExpense,
    deleteExpense,
  }
})
