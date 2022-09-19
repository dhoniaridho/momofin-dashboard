export declare module UsersResponse {
  export interface User {
    id: string
    fullname: string
    email: string
    account_status: string
    certificate_status: string
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
    user: User[]
    pagination: Pagination
  }

  export interface RootObject {
    code: number
    success: boolean
    data: Data
  }
}

export declare module UserDetailResponse {
  export interface Profile {
    id: string
    fullname: string
    email: string
    account_status: string
    certificate_status: string
    phone_number: string
    certificate_issued_at: string
    certificate_expired_at: string
  }

  export interface Document {
    processing: number
    completed: number
  }

  export interface Topup {
    count: number
    amount: number
  }

  export interface Balance {
    esgn: number
    emet: number
  }

  export interface Data {
    profile: Profile
    document: Document
    topup: Topup
    balance: Balance
  }

  export interface RootObject {
    code: number
    success: boolean
    data: Data
  }
}
