import { http } from '~/modules/http'
import type { DocumentResponse, AuditTrailResponse } from './document.interface'
export const getAllDocuments = async (filter: any) => {
  const {
    data: { data: response },
  } = await http.get<DocumentResponse.RootObject>('documents', {
    params: { ...filter },
  })
  return response
}

export const getAuditTrail = async (id: number) => {
  if (!id) return null
  return new Promise<AuditTrailResponse.Datum[]>(async (resolve, reject) => {
    if (!id) reject(null)
    const {
      data: { data },
    } = await http.get<AuditTrailResponse.RootObject>(
      `documents/audit-trail/${id}`
    )
    resolve(data)
  })
}
