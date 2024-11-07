import router from '@/router'
import { useAuthStore } from '@/stores/auth'
import RegisterView from '@/views/RegisterView.vue'
import { createTestingPinia } from '@pinia/testing'
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { Notify } from 'quasar'
import { getByTestId } from 'test/vitest/__utils__'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { ComponentPublicInstance } from 'vue'
import { useRouter } from 'vue-router'
import { Form } from 'vee-validate'

installQuasarPlugin({ plugins: { Notify } })

vi.mock('vue-router')

interface RegisterViewInstance extends ComponentPublicInstance {
  onSubmit: () => void
}

const createWrapper = () =>
  mount(RegisterView, {
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
  }) as VueWrapper<RegisterViewInstance>

describe('HeaderActions', () => {
  let wrapper: VueWrapper<RegisterViewInstance>
  let store: ReturnType<typeof useAuthStore>

  vi.mocked(useRouter).mockReturnValue({
    ...router,
    push: vi.fn(),
  })

  beforeEach(() => {
    wrapper = createWrapper()
    store = useAuthStore()
  })

  it('should match snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should not submit the register form if the form is invalid', async () => {
    const spy = vi.spyOn(wrapper.vm, 'onSubmit')

    await getByTestId(wrapper, 'register-form').trigger('submit')

    expect(spy).not.toHaveBeenCalled()
  })

  it('should submit the register form', async () => {
    await getByTestId(wrapper, 'name-input').setValue('test')
    await getByTestId(wrapper, 'email-input').setValue('test@test.com')
    await getByTestId(wrapper, 'password-input').setValue('123456')
    await getByTestId(wrapper, 'confirmPassword-input').setValue('123456')

    wrapper.findComponent(Form).vm.$emit('submit', {
      name: 'test',
      email: 'test@test.com',
      password: '123456',
      confirmPassword: '123456',
    })

    expect(store.handleSignUp).toHaveBeenCalledWith({
      name: 'test',
      email: 'test@test.com',
      password: '123456',
    })
  })
})
