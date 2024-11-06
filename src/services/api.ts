import { JWT_TOKEN } from '@/constants/jwt'
import axios, { AxiosError } from 'axios'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

const api = axios.create({
  baseURL: 'http://localhost:3000',
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
      const router = useRouter()
      console.log(error)

      console.log(router.push({ name: 'login' }))
      router.push({ name: 'login' })
    }

    return Promise.reject(error)
  },
)

export default api
