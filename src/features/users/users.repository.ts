import { http } from '~/modules/http'
import type {
  DeleteUser,
  ResendEmail,
  UserDetailResponse,
  UsersResponse,
  VerifyResponse,
} from './users.interface'

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
  const { data } = await http.delete<DeleteUser.RootObject>(`users/${id}`)
  return data
}

/**
 * Verify user by id
 */
export const verifyUserById = async (id: string) => {
  const { data: response } = await http.post<VerifyResponse.RootObject>(
    'users/verify',
    {
      user_id: id,
    }
  )
  return response
}

/**
 * Resend email verification user by id
 */
export const resendEmailVerification = async (id: string) => {
  const { data: response } = await http.post<ResendEmail.RootObject>(
    'users/send_email_verification',
    {
      user_id: id,
    }
  )
  return response
}

/**
 * Export data user then download
 */
export const exportUsersToFile = async () => {
  const { data: response } = await http.get('users/download', {
    responseType: 'blob',
  })
  const url = URL.createObjectURL(response)
  const a = document.createElement<'a'>('a')
  a.download = `Export-users-${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
  a.href = url
  a.click()
  URL.revokeObjectURL(url)
  return url
}
