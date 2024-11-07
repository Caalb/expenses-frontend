import { VueWrapper } from '@vue/test-utils'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getByTestId = (wrapper: VueWrapper<any>, testId: string) => {
  return wrapper.find(`[data-testid="${testId}"]`)
}
