import { mount, VueWrapper } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'
import { getByTestId } from 'test/vitest/__utils__'
import { describe, expect, it, beforeEach, vi } from 'vitest'
import ExpenseForm from '@/components/Expenses/ExpenseForm.vue'
import { Form } from 'vee-validate'

installQuasarPlugin()

const createWrapper = () =>
  mount(ExpenseForm, {
    global: {
      plugins: [
        createTestingPinia({
          createSpy: vi.fn,
        }),
      ],
    },
    props: {
      initialValues: {
        id: 1,
        amount: '100',
        date: '2023-01-01',
        description: 'Expense 1',
      },
      isEditing: false,
      submitting: false,
    },
  }) as VueWrapper

describe('ExpenseForm', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = createWrapper()
  })

  it('should match snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should emit cancel when cancel button is clicked', async () => {
    await wrapper.vm.$nextTick()

    const cancelButton = getByTestId(wrapper, 'cancel-button')
    expect(cancelButton.exists()).toBe(true)

    await cancelButton.trigger('click')

    expect(wrapper.emitted('cancel')).toBeTruthy()
  })

  it('should emit submit when submit button is clicked and valid form', async () => {
    const submitButton = getByTestId(wrapper, 'submit-button')
    expect(submitButton.exists()).toBe(true)

    await getByTestId(wrapper, 'amount-input').setValue('100')
    await getByTestId(wrapper, 'date-input').setValue('2023-01-01')
    await getByTestId(wrapper, 'description-input').setValue('Expense 1')

    wrapper.findComponent(Form).vm.$emit('submit', {
      amount: '100',
      date: '2023-01-01',
      description: 'Expense 1',
    })

    expect(wrapper.emitted('submit')).toBeTruthy()
    expect(wrapper.emitted('submit')?.[0]).toEqual([
      {
        amount: '100',
        date: '2023-01-01',
        description: 'Expense 1',
      },
    ])
  })
})
