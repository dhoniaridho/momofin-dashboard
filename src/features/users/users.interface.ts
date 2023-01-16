export declare module UsersResponse {
  export interface User {
    id: string
    fullname: string
    email: string
    account_status: string
    certificate_status: string
    created_at: string
  }

  export interface Pagination {
    totalPages: number
    prev: number
    current: number
    next: number
    detail: number[]
  }

  export interface Data {
    items: User[]
    meta: Pagination
  }

  export interface RootObject {
    message: string
    statusCode: boolean
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

export declare module DeleteUser {
  export interface RootObject {
    code: number
    success: boolean
    message: string
  }
}

export declare module ResendEmail {
  export interface RootObject {
    code: number
    success: boolean
    message: string
  }
}

export declare module VerifyResponse {
  export interface RootObject {
    code: number
    success: boolean
    message: string
  }
}
