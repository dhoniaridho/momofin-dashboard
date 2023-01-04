import { http } from '~/modules/http'
import type {
  TransactionResponse,
  TransactonExport,
} from './transactions.interface'

export const getAllTransactions = async (filter: any) => {
  const {
    data: { data: response },
  } = await http.get<TransactionResponse.RootObject>('transactions', {
    params: { ...filter },
  })
  return response
}

export const exportTransactions = async (filter: any) => {
  return new Promise<TransactonExport.Transaction[]>(
    async (resolve, reject) => {
      try {
        const { data } = await http.get('transactions/export', {
          params: {
            ...filter,
          },
        })
        resolve(data.data)
      } catch (error: any) {
        reject(error.response)
      }
    }
  )
}

export { getUserById } from '../users/users.repository'
