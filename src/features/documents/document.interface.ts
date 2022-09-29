export declare module DocumentResponse {
  interface Signer {
    name: string
    email: string
  }
  export interface Datum {
    id: number
    created_at: Date
    email: string
    document_name: string
    signer_count: number
    status: string
    signer: Signer[]
  }

  export interface Pagination {
    total_data: number
    total_page: number
    total_display: number
    first_page: boolean
    last_page: boolean
    prev: number
    current: number
    next: number
    detail: number[]
  }

  export interface Data {
    data: Datum[]
    pagination: Pagination
  }

  export interface RootObject {
    code: number
    success: boolean
    data: Data
  }
}

export declare module AuditTrailResponse {
  export interface Datum {
    datetime: string
    name: string
    ip_address: string
    description: string
    type: string
  }

  export interface RootObject {
    code: number
    success: boolean
    data: Datum[]
  }
}
