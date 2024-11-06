import { defineStore } from 'pinia'
import type { Expense } from '@/types/expense'
import { ref } from 'vue'
import { fetchExpenses as fetchExpensesApi } from '@/services/expenses/fetchExpenses'

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

  return {
    expenses,
    fetchExpenses,
  }
})
