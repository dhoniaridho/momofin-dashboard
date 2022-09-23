import { http } from '~/modules/http'
import type { TransactionResponse } from './transaction.interface'

export const getAllTransactions = async (filter: any) => {
  const {
    data: { data: response },
  } = await http.get<TransactionResponse.RootObject>('transactions', {
    params: { ...filter },
  })
  return response
}

export { getUserById } from '../users/users.repository'
