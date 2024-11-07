import axios, { AxiosError } from 'axios'
import router from './../router'
import { Notify } from 'quasar'
import { JWT_TOKEN } from '@/constants/jwt'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(JWT_TOKEN)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      Notify.create({
        color: 'negative',
        icon: 'warning',
        message: 'Sessão expirada, por favor, faça login novamente',
      })

      router.push({ name: 'login' })
    }

    return Promise.reject(error)
  },
)

export default api
