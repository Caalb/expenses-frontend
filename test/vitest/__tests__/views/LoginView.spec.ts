import router from '@/router'
import { useAuthStore } from '@/stores/auth'
import LoginView from '@/views/LoginView.vue'
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
vi.mock('uuid')

interface LoginViewInstance extends ComponentPublicInstance {
  onSubmit: () => void
}

const createWrapper = () =>
  mount(LoginView, {
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
  }) as VueWrapper<LoginViewInstance>

describe('HeaderActions', () => {
  let wrapper: VueWrapper<LoginViewInstance>
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

  it('should not submit the login form if the form is invalid', async () => {
    const spy = vi.spyOn(wrapper.vm, 'onSubmit')

    await getByTestId(wrapper, 'login-form').trigger('submit')

    expect(spy).not.toHaveBeenCalled()
  })

  it('should submit the login form', async () => {
    await getByTestId(wrapper, 'email-input').setValue('test@test.com')
    await getByTestId(wrapper, 'password-input').setValue('123456')
    await getByTestId(wrapper, 'login-form').trigger('submit.prevent')

    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    expect(store.handleSignIn).toHaveBeenCalledWith('test@test.com', '123456')
  })
})
