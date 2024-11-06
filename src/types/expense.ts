export interface Expense {
  id: number
  description: string
  date: string
  value: number
}

export interface ExpenseFormData {
  description: string
  date: string
  value: string
}
