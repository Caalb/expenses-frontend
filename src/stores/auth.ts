import { JWT_TOKEN } from '@/constants/jwt'
import { userSignUp } from '@/services/auth/userSignUp'
import type { AxiosResponse } from 'axios'
import { defineStore } from 'pinia'
import { userSignIn } from '../services/auth/userSignIn'

export const useAuthStore = defineStore('auth', () => {
  const handleSignIn = async (
    email: string,
    password: string,
  ): Promise<AxiosResponse | unknown> => {
    try {
      const response = await userSignIn(email, password)
      const { token } = response.data

      localStorage.setItem(JWT_TOKEN, token)
      return response
    } catch (error: unknown) {
      return error
    }
  }

  const handleSignUp = async (data: Record<string, string>): Promise<AxiosResponse | unknown> => {
    try {
      const response = await userSignUp(data.name, data.email, data.password)
      const { token } = response.data

      localStorage.setItem(JWT_TOKEN, token)
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
