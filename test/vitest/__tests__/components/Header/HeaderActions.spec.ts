import HeaderActions from '@/components/Header/HeaderActions.vue'
import router from '@/router'
import { createTestingPinia } from '@pinia/testing'
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { Notify } from 'quasar'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { ComponentPublicInstance } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

interface HeaderActionsInstance extends ComponentPublicInstance {
  userLogout: () => void
}

installQuasarPlugin({ plugins: { Notify } })

vi.mock('vue-router')

const createWrapper = () =>
  mount(HeaderActions, {
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
  }) as VueWrapper<HeaderActionsInstance>

describe('HeaderActions', () => {
  let wrapper: VueWrapper<HeaderActionsInstance>
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
    const wrapper = createWrapper()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should display the user profile avatar', () => {
    expect(wrapper.find('img').attributes('src')).toBe(
      'https://e1.pngegg.com/pngimages/896/660/png-clipart-pikachu-bymika-pikachu-illustration-thumbnail.png',
    )
  })

  it('should call userLogout', async () => {
    const spy = vi.spyOn(wrapper.vm.$q, 'notify')
    wrapper.vm.userLogout()

    expect(useRouter().push).toHaveBeenCalledWith({ name: 'login' })
    expect(spy).toHaveBeenCalled()
    expect(store.handleLogout).toHaveBeenCalled()
  })
})
