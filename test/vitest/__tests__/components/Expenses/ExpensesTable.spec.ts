import ExpensesTable from '@/components/Expenses/ExpensesTable.vue'
import { useExpensesStore } from '@/stores/expenses'
import { createTestingPinia } from '@pinia/testing'
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { describe, expect, it, beforeEach, vi } from 'vitest'
import { getByTestId } from 'test/vitest/__utils__'

installQuasarPlugin()

const createWrapper = () =>
  mount(ExpensesTable, {
    global: {
      plugins: [
        createTestingPinia({
          createSpy: vi.fn,
        }),
      ],
    },
  }) as VueWrapper

describe('ExpensesTable', () => {
  let wrapper: VueWrapper
  let expensesStore: ReturnType<typeof useExpensesStore>

  beforeEach(() => {
    wrapper = createWrapper()
    expensesStore = useExpensesStore()
    expensesStore.expenses = [
      { id: 1, amount: '100', date: '2023-01-01', description: 'Expense 1' },
      { id: 2, amount: '200', date: '2023-01-02', description: 'Expense 2' },
      { id: 3, amount: '300', date: '2023-01-03', description: 'Expense 3' },
    ]
  })

  it('should display expenses when store has data', async () => {
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should emit edit when edit button is clicked', async () => {
    await wrapper.vm.$nextTick()

    const editButton = getByTestId(wrapper, 'edit-button')
    expect(editButton.exists()).toBe(true)

    await editButton.trigger('click')

    expect(wrapper.emitted('edit')).toBeTruthy()
    expect(wrapper.emitted('edit')?.[0]).toEqual([
      { id: 1, amount: '100', date: '2023-01-01', description: 'Expense 1' },
    ])
  })

  it('should emit delete when edit button is clicked', async () => {
    await wrapper.vm.$nextTick()

    const deleteButton = getByTestId(wrapper, 'delete-button')
    expect(deleteButton.exists()).toBe(true)

    await deleteButton.trigger('click')

    expect(wrapper.emitted('delete')).toBeTruthy()
    expect(wrapper.emitted('delete')?.[0]).toEqual([
      { id: 1, amount: '100', date: '2023-01-01', description: 'Expense 1' },
    ])
  })
})

describe('ExpensesTable without expenses', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = createWrapper()
  })

  it('should display no expenses message when store is empty', async () => {
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toContain('Nenhuma despesa encontrada')
    expect(wrapper.html()).toMatchSnapshot()
  })
})
