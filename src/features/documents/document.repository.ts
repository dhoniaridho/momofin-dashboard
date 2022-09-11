import { http } from '~/modules/http'
import type { DocumentResponse } from './document.interface'
export const getAllDocuments = async (filter: any) => {
  const {
    data: { data: response },
  } = await http.get<DocumentResponse.RootObject>('documents', {
    params: { ...filter },
  })
  return response
}
