import { AxiosError } from 'axios'
import { type QNotifyCreateOptions } from 'quasar'

interface Notifier {
  notify: (options: QNotifyCreateOptions) => void
}

const getErrorMessage = (error: unknown, defaultMessage: string): string => {
  if (error instanceof AxiosError) {
    return error.response?.data?.message || defaultMessage
  }

  if (error instanceof Error) {
    return error.message || defaultMessage
  }

  return defaultMessage
}

export const errorHandler = (
  error: unknown,
  defaultMessage: string = 'Ocorreu um erro inesperado',
  notifier: Notifier,
  logError: (error: unknown) => void = console.error,
) => {
  const message = getErrorMessage(error, defaultMessage)

  notifier.notify({
    color: 'negative',
    message,
    icon: 'error',
  })

  logError(error)
}
