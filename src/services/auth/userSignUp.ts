import type { AxiosResponse } from 'axios'
import api from '../api'

export interface UserSignUpResponse {
  token: string
}

export const userSignUp = async (
  name: string,
  email: string,
  password: string,
): Promise<AxiosResponse<UserSignUpResponse>> => {
  const response = await api.post<UserSignUpResponse>('/auth/signup', { name, email, password })

  return response
}
