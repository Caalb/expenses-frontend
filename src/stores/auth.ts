import { defineStore } from 'pinia'
import { userSignIn } from '../services/auth/userSignIn'
import type { AxiosResponse } from 'axios'
import { userSignUp } from '@/services/auth/userSignUp'

export const useAuthStore = defineStore('auth', () => {
  const handleSignIn = async (
    email: string,
    password: string,
  ): Promise<AxiosResponse | unknown> => {
    try {
      const response = await userSignIn(email, password)
      const { token } = response.data

      localStorage.setItem('token', token)
      return response
    } catch (error: unknown) {
      return error
    }
  }

  const handleSignUp = async (data: Record<string, string>): Promise<AxiosResponse | unknown> => {
    try {
      const response = await userSignUp(data.name, data.email, data.password)
      const { token } = response.data

      localStorage.setItem('token', token)
      return response
    } catch (error: unknown) {
      return error
    }
  }

  return {
    handleSignIn,
    handleSignUp,
  }
})
