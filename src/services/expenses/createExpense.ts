import type { Expense } from '@/types/expense'
import api from '@/services/api'

export const createExpense = async (expense: Omit<Expense, 'id'>) => {
  const response = await api.post('/expenses', expense)

  return response
}
