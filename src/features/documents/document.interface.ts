export declare module DocumentResponse {
  interface Signer {
    name: string
    email: string
    sign_status: boolean
    usage: 'EMET' | 'ESGN'
    usage_count: {
      emet: number
      esgn: number
    }
  }
  export interface Datum {
    id: number
    created_at: string
    email: string
    document_name: string
    signer_count: number
    status: string
    signers: Signer[]
  }

  export interface Pagination {
    currentPage: number
    itemCount: number
    itemsPerPage: number
    totalItems: number
    totalPages: number
  }

  export interface Data {
    items: Datum[]
    meta: Pagination
  }

  export interface RootObject {
    code: number
    success: boolean
    data: Data
  }
}

export declare module AuditTrailResponse {
  export interface Datum {
    dateTime: string
    name: string
    ipAddress: string
    description: string
    type: string
  }

  export interface RootObject {
    code: number
    success: boolean
    data: Datum[]
  }
}
