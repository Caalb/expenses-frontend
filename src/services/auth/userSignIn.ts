import type { AxiosResponse } from 'axios'
import api from '../api'

export interface UserSignInResponse {
  token: string
}

export const userSignIn = async (
  email: string,
  password: string,
): Promise<AxiosResponse<UserSignInResponse>> => {
  const response = await api.post<UserSignInResponse>('/auth/signin', { email, password })

  return response
}
