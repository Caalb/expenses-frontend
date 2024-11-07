import ExpensesList from '@/components/Expenses/ExpensesList.vue'
import router from '@/router'
import { useExpensesStore } from '@/stores/expenses'
import { createTestingPinia } from '@pinia/testing'
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { Notify } from 'quasar'
import { getByTestId } from 'test/vitest/__utils__'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { ComponentPublicInstance } from 'vue'
import { useRouter } from 'vue-router'

installQuasarPlugin({ plugins: { Notify } })

vi.mock('vue-router')

type ExpensesListInstance = ComponentPublicInstance<typeof ExpensesList>

const createWrapper = () =>
  mount(ExpensesList, {
    global: {
      plugins: [
        createTestingPinia({
          createSpy: vi.fn,
        }),
      ],
      mocks: {
        $router: {
          push: vi.fn(),
        },
      },
    },
  }) as VueWrapper

describe('ExpensesList', () => {
  let wrapper: VueWrapper<ExpensesListInstance>
  let expensesStore: ReturnType<typeof useExpensesStore>

  vi.mocked(useRouter).mockReturnValue({
    ...router,
    push: vi.fn(),
  })

  beforeEach(() => {
    wrapper = createWrapper()
    expensesStore = useExpensesStore()
  })

  it('should match snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should call fetchExpenses on mount', async () => {
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    expect(expensesStore.fetchExpenses).toHaveBeenCalled()
  })

  it('should open the create modal when "Nova Despesa" button is clicked', async () => {
    const createButton = getByTestId(wrapper, 'add-button')
    await createButton.trigger('click')

    expect(wrapper.vm.showFormModal).toBe(true)
    expect(wrapper.vm.isEditing).toBe(false)
  })

  it('should open the edit modal with the correct data', async () => {
    const expense = { id: 1, description: 'Teste', date: '2024-11-07', amount: 100 }
    wrapper.vm.openEditModal(expense)

    expect(wrapper.vm.showFormModal).toBe(true)
    expect(wrapper.vm.isEditing).toBe(true)
    expect(wrapper.vm.formData.description).toBe(expense.description)
    expect(wrapper.vm.formData.date).toBe(expense.date)
    expect(wrapper.vm.formData.amount).toBe(expense.amount.toString())
  })

  it('should open the delete modal with the selected expense', async () => {
    const expense = { id: 1, description: 'Teste', date: '2024-11-07', amount: 100 }
    wrapper.vm.openDeleteModal(expense)

    expect(wrapper.vm.showDeleteModal).toBe(true)
    expect(wrapper.vm.selectedExpense).toEqual(expense)
  })

  it('should call handleDeleteExpense when confirming deletion', async () => {
    wrapper.vm.showDeleteModal = true
    const spyDelete = vi.spyOn(wrapper.vm, 'handleDeleteExpense')
    await wrapper.vm.handleDeleteExpense()

    expect(spyDelete).toHaveBeenCalled()
  })
})
