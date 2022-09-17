import { http } from '~/modules/http'
import type { UserDetailResponse, UsersResponse } from './users.interface'

/**
 * Get all users from resource
 */
export const getAllUsers = async (filter: any) => {
  const {
    data: { data: response },
  } = await http.get<UsersResponse.RootObject>('/users', {
    params: { ...filter },
  })
  return response
}

/**
 * Get user detail by id
 */
export const getUserById = async (id: string) => {
  const {
    data: { data: response },
  } = await http.get<UserDetailResponse.RootObject>(`users/${id}`)
  return response
}

/**
 * Delete user by id
 */
export const deleteUserById = async (id: string) => {
  const {
    data: { data: response },
  } = await http.delete<UsersResponse.RootObject>(`users/${id}`)
  return response
}

/**
 * Verify user by id
 */
export const verifyUserById = async (id: string) => {
  const {
    data: { data: response },
  } = await http.post('users/verify', {
    user_id: id,
  })
  return response
}

/**
 * Resend email verification user by id
 */
export const resendEmailVerification = async (id: string) => {
  const {
    data: { data: response },
  } = await http.post('users/send_email_verification', {
    user_id: id,
  })
  return response
}
