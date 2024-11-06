import api from '@/services/api'
import type { Expense } from '@/types/expense'

export const fetchExpenses = async (): Promise<Expense[]> => {
  const response = await api.get<Expense[]>('/expenses')

  return response.data
}
