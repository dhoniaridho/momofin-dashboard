export declare module DocumentResponse {
  export interface Datum {
    id: number
    created_at: Date
    email: string
    document_name: string
    signer_count: number
    status: string
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
