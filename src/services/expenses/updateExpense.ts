import type { Expense } from '@/types/expense'
import api from '@/services/api'

export const updateExpense = async (id: number, expense: Omit<Expense, 'id'>) => {
  const response = await api.put(`/expenses/${id}`, expense)

  return response
}
