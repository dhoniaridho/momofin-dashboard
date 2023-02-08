import { http } from '~/modules/http'
import type {
  TransactionResponse,
  TransactonExport,
} from './transactions.interface'

export const getAllTransactions = async (filter: any) => {
  const {
    data: { data: response },
  } = await http.get<TransactionResponse.RootObject>('transactions/econtract', {
    params: { ...filter },
  })
  return response
}

export const getAllMicrositeTransactions = async (filter: any) => {
  const {
    data: { data: response },
  } = await http.get<TransactionResponse.RootObject>('transactions/microsite', {
    params: { ...filter },
  })
  return response
}

export const exportTransactions = async (filter: any) => {
  return new Promise<TransactonExport.Transaction[]>(
    async (resolve, reject) => {
      try {
        const { data } = await http.get('transactions/econtract/export', {
          params: {
            ...filter,
          },
          timeout: 1000000000000,
        })
        resolve(data.data)
      } catch (error: any) {
        reject(error.response)
      }
    }
  )
}

export const exportMicrositeTransactions = async (filter: any) => {
  return new Promise<TransactonExport.Transaction[]>(
    async (resolve, reject) => {
      try {
        const { data } = await http.get('transactions/microsite/export', {
          params: {
            ...filter,
          },
          timeout: 1000000000000,
        })
        resolve(data.data)
      } catch (error: any) {
        reject(error.response)
      }
    }
  )
}

export { getUserById } from '../users/users.repository'
