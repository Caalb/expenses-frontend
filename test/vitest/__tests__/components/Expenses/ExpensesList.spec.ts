import ExpensesList from '@/components/Expenses/ExpensesList.vue'
import { createTestingPinia } from '@pinia/testing'
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useExpensesStore } from '@/stores/expenses'
import router from '@/router'

installQuasarPlugin()

vi.mock('vue-router')

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
  let wrapper: VueWrapper
  let store: ReturnType<typeof useAuthStore>
  let expensesStore: ReturnType<typeof useExpensesStore>

  vi.mocked(useRouter).mockReturnValue({
    ...router,
    push: vi.fn(),
  })

  beforeEach(() => {
    wrapper = createWrapper()
    store = useAuthStore()
    expensesStore = useExpensesStore()
  })

  it('should match snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should call fetchExpenses', async () => {
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    expect(expensesStore.fetchExpenses).toHaveBeenCalled()
  })
})
