import api from '@/services/api'

export const deleteExpense = async (id: number) => {
  const response = await api.delete(`/expenses/${id}`)

  return response
}
