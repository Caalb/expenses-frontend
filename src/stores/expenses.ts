import { createExpense as createExpenseApi } from '@/services/expenses/createExpense'
import { fetchExpenses as fetchExpensesApi } from '@/services/expenses/fetchExpenses'
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

  return {
    expenses,
    fetchExpenses,
    createExpense,
  }
})
